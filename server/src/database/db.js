import mysql from "mysql2/promise";
import "dotenv/config";

// Pool de conexões: o mysql2 reaproveita conexões em vez de abrir uma por consulta
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  charset: "utf8mb4",
});

export default pool;
