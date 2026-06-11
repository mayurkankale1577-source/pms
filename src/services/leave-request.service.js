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
      casual,
      earned
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
      (?, ?, ?, ?, ?, ?, ?, 'Pending')
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
  approverId
) {
  const [rows] = await db.query(
    `
    SELECT
      lr.*,
      u.name
    FROM leave_requests lr
    INNER JOIN users u
      ON lr.user_id = u.id
    WHERE lr.approver_id = ?
    ORDER BY lr.created_at DESC
    `,
    [approverId]
  );

  return rows;
}

/*
|--------------------------------------------------------------------------
| ALL REQUESTS
|--------------------------------------------------------------------------
*/
export async function getAllLeaveRequests() {
  const [rows] = await db.query(
    `
    SELECT
      lr.*,
      u.name,
      a.name AS approver_name
    FROM leave_requests lr

    INNER JOIN users u
      ON lr.user_id = u.id

    LEFT JOIN users a
      ON lr.approver_id = a.id

    ORDER BY lr.created_at DESC
    `
  );

  return rows;
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
  await db.query(
    `
    UPDATE leave_requests
    SET
      status = 'Approved',
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
      status = 'Rejected',
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