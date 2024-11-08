import postgres from "postgres";

const config = {
  host: "127.0.0.1",
  user: "postgres",
  password: "",
  port: 5432,
};

// BEGIN (write your solution here)
const sql = postgres(config)

async function solution() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS articles (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255),
        description VARCHAR(255)
      );
    `;

    await sql`
      INSERT INTO articles (title, description)
      VALUES ('Пицца', 'Лучшее блюдо в мире');
    `;

    console.log("Таблица создана и запись добавлена.");
  } catch (err) {
    console.error("Ошибка при работе с базой данных:", err);
  } finally {
    await sql.end();
  }
}

export default solution;
// END
