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

  return attendance.map(
    (row) => ({
      date:
        row.attendance_date
          .toISOString()
          .split("T")[0],

      status:
        row.status || "present",
    })
  );
}