import db from "@/lib/db";

export async function getCalendarData(
  userId
) {
  const [attendance] =
    await db.query(
      `
      SELECT
        attendance_date,
        status
      FROM attendance
      WHERE user_id = ?
      `,
      [userId]
    );

  const [leaves] =
    await db.query(
      `
      SELECT
        from_date,
        to_date,
        status
      FROM leave_requests
      WHERE user_id = ?
      AND status = 'Approved'
      `,
      [userId]
    );

  return {
    attendance,
    leaves,
  };
}