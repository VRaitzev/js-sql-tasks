import postgres from "postgres";

const config = {
  host: "127.0.0.1",
  user: "postgres",
  password: "",
  port: 5432,
};

const sql = postgres(config);

export default async function solution(client, { username, phone }, roomNumber, price) {

  const transaction = await sql.begin();

  try {
    const userRes = await transaction`
      INSERT INTO users (username, phone)
      VALUES (${username}, ${phone})
      RETURNING id
    `;
    const userId = userRes[0].id;

    const roomRes = await transaction`
      SELECT id, status FROM rooms WHERE room_number = ${roomNumber}
    `;
    const room = roomRes[0];
    
    if (room.status !== "free") {
      throw new Error("Комната уже забронирована");
    }

    await transaction`
      INSERT INTO orders (user_id, room_id, price)
      VALUES (${userId}, ${room.id}, ${price})
    `;

    await transaction`
      UPDATE rooms
      SET status = 'reserved'
      WHERE id = ${room.id}
    `;

    await transaction.commit();

    return { userId, roomId: room.id };
  } catch (error) {
    await transaction.rollback();
    throw error;  
  }
}
