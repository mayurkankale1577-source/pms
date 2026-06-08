import db from "@/lib/db";

function formatTime(value) {
  if (!value) return null;

  return new Date(value).toLocaleTimeString(
    "en-IN",
    {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }
  );
}

export async function getDashboardData(userId) {
  const [attendanceRows] =
    await db.query(
      `
      SELECT *
      FROM attendance
      WHERE user_id = ?
      AND attendance_date = CURDATE()
      LIMIT 1
      `,
      [userId]
    );

  const [leaveRows] =
    await db.query(
      `
      SELECT *
      FROM leave_balance
      WHERE user_id = ?
      LIMIT 1
      `,
      [userId]
    );

  const attendance =
    attendanceRows[0] || null;

  const leaveBalance =
    leaveRows[0] || {};

  if (attendance) {
    attendance.mark_in =
      formatTime(attendance.mark_in);

    attendance.mark_out =
      formatTime(attendance.mark_out);
  }

  return {
    attendance,

    casual: Number(
      leaveBalance.casual_leave_remaining ??
      leaveBalance.casual_leave ??
      0
    ),

    earned: Number(
      leaveBalance.earned_leave_remaining ??
      leaveBalance.earned_leave ??
      0
    ),
  };
}

export async function markIn(
  userId,
  latitude,
  longitude,
  city
) {
  const [existing] =
    await db.query(
      `
      SELECT id
      FROM attendance
      WHERE user_id = ?
      AND attendance_date = CURDATE()
      LIMIT 1
      `,
      [userId]
    );

  if (existing.length > 0) {
    throw new Error(
      "Already checked in today"
    );
  }

  await db.query(
    `
    INSERT INTO attendance
    (
      user_id,
      attendance_date,
      mark_in,
      city,
      latitude,
      longitude,
      status
    )
    VALUES
    (
      ?,
      CURDATE(),
      NOW(),
      ?,
      ?,
      ?,
      'present'
    )
    `,
    [
      userId,
      city,
      latitude,
      longitude,
    ]
  );

  return true;
}

export async function markOut(
  userId
) {
  const now = new Date();

  if (now.getHours() < 13) {
    throw new Error(
      "Mark out allowed after 1 PM"
    );
  }

  await db.query(
    `
    UPDATE attendance
    SET mark_out = NOW()
    WHERE user_id = ?
    AND attendance_date = CURDATE()
    `,
    [userId]
  );

  return true;
}