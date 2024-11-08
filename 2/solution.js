import postgres from "postgres";

const config = {
  host: "127.0.0.1",
  user: "postgres",
  password: "",
  port: 5432,
};

// BEGIN (write your solution here)
const sql = postgres(config);

export default async function solution(articles) {
  const result = [];

  for (const article of articles) {
    const { title, description } = article;
    const res = await sql`
      INSERT INTO articles (title, description)
      VALUES (${title}, ${description})
      RETURNING id
    `;
    result.push(res[0].id); 
  }

  return result; 
}
// END
