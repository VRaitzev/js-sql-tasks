import postgres from "postgres";

const config = {
  host: "127.0.0.1",
  user: "postgres",
  password: "",
  port: 5432,
};

const sql = postgres(config);

export default async (book) => {
  const { title, author } = book;

  const res = await sql`
    INSERT INTO books (title, author)
    VALUES (${title}, ${author})
    RETURNING id
  `;

  return res[0].id;
};
