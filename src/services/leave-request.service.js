import db from "@/lib/db";

/*
|--------------------------------------------------------------------------
| GET LEAVE BALANCE
|--------------------------------------------------------------------------
*/
export async function getLeaveBalance(
  userId
) {
  const [rows] = await db.query(
    `
    SELECT
      casual_leave,
      earned_leave
    FROM leave_balance
    WHERE user_id = ?
    `,
    [userId]
  );

  return rows[0] || null;
}

/*
|--------------------------------------------------------------------------
| MY LEAVE REQUESTS
|--------------------------------------------------------------------------
*/
export async function getLeaveRequests(
  userId
) {
  const [rows] = await db.query(
    `
    SELECT *
    FROM leave_requests
    WHERE user_id = ?
    ORDER BY created_at DESC
    `,
    [userId]
  );

  return rows;
}

/*
|--------------------------------------------------------------------------
| CREATE LEAVE REQUEST
|--------------------------------------------------------------------------
*/
export async function createLeaveRequest(
  data
) {
  const {
    userId,
    leaveType,
    startDate,
    endDate,
    totalDays,
    reason,
  } = data;

  const [userRows] =
    await db.query(
      `
      SELECT
        reporting_manager_id
      FROM users
      WHERE id = ?
      `,
      [userId]
    );

  const approverId =
    userRows[0]
      ?.reporting_manager_id ||
    null;

  const [result] =
    await db.query(
      `
      INSERT INTO leave_requests
      (
        user_id,
        approver_id,
        leave_type,
        start_date,
        end_date,
        total_days,
        reason,
        status
      )
      VALUES
      (?, ?, ?, ?, ?, ?, ?, 'pending')
      `,
      [
        userId,
        approverId,
        leaveType,
        startDate,
        endDate,
        totalDays,
        reason,
      ]
    );

  return result.insertId;
}

/*
|--------------------------------------------------------------------------
| TEAM LEADER REQUESTS
|--------------------------------------------------------------------------
*/
export async function getTeamLeaveRequests(
  teamLeaderId,
  page = 1,
  limit = 10
) {
  const offset =
    (page - 1) * limit;

  const [requests] = await db.query(
    `
    SELECT
      lr.*,
      u.name AS employee_name
    FROM leave_requests lr
    INNER JOIN users u
      ON lr.user_id = u.id
    WHERE
      u.reporting_manager_id = ?
    ORDER BY lr.created_at DESC
    LIMIT ? OFFSET ?
    `,
    [
      teamLeaderId,
      limit,
      offset,
    ]
  );

  const [countRows] =
    await db.query(
      `
      SELECT COUNT(*) AS total
      FROM leave_requests lr
      INNER JOIN users u
        ON lr.user_id = u.id
      WHERE
        u.reporting_manager_id = ?
      `,
      [teamLeaderId]
    );

  return {
    requests,
    total:
      countRows[0].total,
  };
}

/*
|--------------------------------------------------------------------------
| ALL REQUESTS
|--------------------------------------------------------------------------
*/
export async function getAllLeaveRequests(
  page = 1,
  limit = 10
) {
  const offset =
    (page - 1) * limit;

  const [requests] =
    await db.query(
      `
      SELECT
        lr.*,
        u.name AS employee_name,
        a.name AS approver_name
      FROM leave_requests lr
      LEFT JOIN users u
        ON lr.user_id = u.id
      LEFT JOIN users a
        ON lr.approved_by = a.id
      ORDER BY lr.created_at DESC
      LIMIT ? OFFSET ?
      `,
      [limit, offset]
    );

  const [countRows] =
    await db.query(`
      SELECT COUNT(*) AS total
      FROM leave_requests
    `);

  return {
    requests,
    total:
      countRows[0].total,
  };
}

/*
|--------------------------------------------------------------------------
| APPROVE REQUEST
|--------------------------------------------------------------------------
*/
export async function approveLeaveRequest(
  requestId,
  approvedBy
) {

  const [result] =
    await db.query(
      `
      UPDATE leave_requests
      SET
        status = 'approved',
        approved_by = ?,
        approved_at = NOW()
      WHERE id = ?
      `,
      [
        approvedBy,
        requestId,
      ]
    );

  console.log(
    "APPROVE RESULT",
    result
  );

  return result;
}

/*
|--------------------------------------------------------------------------
| REJECT REQUEST
|--------------------------------------------------------------------------
*/
export async function rejectLeaveRequest(
  requestId,
  approvedBy
) {
  await db.query(
    `
    UPDATE leave_requests
    SET
      status = 'rejected',
      approved_by = ?,
      approved_at = NOW()
    WHERE id = ?
    `,
    [
      approvedBy,
      requestId,
    ]
  );

  return true;
}



