import { pool } from "../db";

const vaild = async (email: String) => {
	const query = await pool.query("select email from users where email = $1", [
		email,
	]);

	if (query.rowCount > 0) {
		return true;
	} else {
		return false;
	}
};

export default vaild;
