import { pool } from "../db";

const vaild = async (username: String) => {
	const query = await pool.query(
		"select username from users where username = $1",
		[username]
	);

	if (query.rowCount > 0) {
		return true;
	} else {
		return false;
	}
};

export default vaild;
