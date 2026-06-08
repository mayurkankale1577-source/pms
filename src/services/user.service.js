import db from "@/lib/db";
import bcrypt from "bcryptjs";

/*
|--------------------------------------------------------------------------
| CREATE USER
|--------------------------------------------------------------------------
| Called when Admin creates a new user.
|
| Flow:
| Add User Form
|      ↓
| POST /api/users
|      ↓
| createUser()
|      ↓
| INSERT INTO users
|
| Responsibilities:
| - Check email already exists or not
| - Hash password
| - Insert user into database
|--------------------------------------------------------------------------
*/
export async function createUser(data) {

  const {
    name,
    email,
    password,
    role,
    user_type,
    functional_role,
    employee_code,
    designation,
    joining_date,
  } = data;

  const [existingUser] = await db.query(
    "SELECT id FROM users WHERE email = ?",
    [email]
  );

  if (existingUser.length > 0) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(
    password,
    10
  );

  const [result] = await db.query(
    `
      INSERT INTO users
      (
        name,
        email,
        password,
        role,

        user_type,
        functional_role,
        employee_code,
        designation,
        joining_date
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      name,
      email,
      hashedPassword,
      role,

      user_type,
      functional_role,
      employee_code,
      designation,
      joining_date,
    ]
  );

  return {
    id: result.insertId,
    message: "User created successfully",
  };
}

/*
|--------------------------------------------------------------------------
| GET USER BY EMAIL
|--------------------------------------------------------------------------
| Used after login and while fetching current user.
|
| Flow:
| JWT Token
|      ↓
| getCurrentUser()
|      ↓
| decoded.email
|      ↓
| getUserByEmail()
|
| Returns complete user information.
|--------------------------------------------------------------------------
*/
export async function getUserByEmail(email) {
  const [rows] = await db.query(
    `
      SELECT
        id,
        name,
        email,
        password,
        role,

        phone,
        secondary_phone,

        employee_code,
        designation,
        user_type,
        functional_role,
        joining_date,

        address,
        city,
        state,
        country,
        pincode,

        created_at
      FROM users
      WHERE email = ?
    `,
    [email]
  );

  return rows[0] || null;
}

/*
|--------------------------------------------------------------------------
| GET ALL USERS
|--------------------------------------------------------------------------
| Used in:
| Dashboard -> Users Page
|
| Flow:
| Users Page
|      ↓
| GET /api/users
|      ↓
| getAllUsers()
|      ↓
| SELECT users
|--------------------------------------------------------------------------
*/
export async function getAllUsers() {
  const [rows] = await db.query(`
    SELECT
      id,
      name,
      email,
      role,
      created_at
    FROM users
    ORDER BY id DESC
  `);

  return rows;
}

/*
|--------------------------------------------------------------------------
| UPDATE PROFILE
|--------------------------------------------------------------------------
| Used when user updates profile.
|
| Flow:
| Profile Form
|      ↓
| PUT /api/profile
|      ↓
| updateProfile()
|      ↓
| UPDATE users
|
| Updates:
| - Phone Numbers
| - Address
| - Employee Details
|--------------------------------------------------------------------------
*/
export async function updateProfile(
  userId,
  data
) {
  await db.query(
    `
      UPDATE users
      SET
        name = ?,
        phone = ?,
        secondary_phone = ?,

        employee_code = ?,
        designation = ?,
        user_type = ?,
        functional_role = ?,
        joining_date = ?,

        address = ?,
        city = ?,
        state = ?,
        country = ?,
        pincode = ?

      WHERE id = ?
    `,
    [
      data.name,
      data.phone,
      data.secondary_phone,

      data.employee_code,
      data.designation,
      data.user_type,
      data.functional_role,
      data.joining_date,

      data.address,
      data.city,
      data.state,
      data.country,
      data.pincode,

      userId,
    ]
  );

  return true;
}

/*
|--------------------------------------------------------------------------
| CHANGE PASSWORD
|--------------------------------------------------------------------------
| Used in:
| Dashboard -> Change Password
|
| Flow:
| Change Password Form
|      ↓
| PUT /api/change-password
|      ↓
| changePassword()
|
| Steps:
| 1. Get current hashed password from DB
| 2. Compare entered password
| 3. Hash new password
| 4. Update database
|--------------------------------------------------------------------------
*/
export async function changePassword(
  userId,
  currentPassword,
  newPassword
) {
  const [rows] = await db.query(
    "SELECT password FROM users WHERE id = ?",
    [userId]
  );

  const user = rows[0];

  const isMatch = await bcrypt.compare(
    currentPassword,
    user.password
  );

  if (!isMatch) {
    throw new Error(
      "Current password is incorrect"
    );
  }

  const hashedPassword =
    await bcrypt.hash(
      newPassword,
      10
    );

  await db.query(
    `
      UPDATE users
      SET password = ?
      WHERE id = ?
    `,
    [hashedPassword, userId]
  );

  return true;
}