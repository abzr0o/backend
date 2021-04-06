import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new pg.Pool({
	user: process.env.USERDB,
	password: process.env.PASSDB,
	host: process.env.HOST,
	port: (process.env as any).DBPORT,
	database: process.env.DB,
	ssl: { rejectUnauthorized: false },
});

export default pool;
