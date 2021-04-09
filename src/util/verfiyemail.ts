import nodemailer from "nodemailer";
import smtp from "nodemailer-smtp-transport";
import fs from "fs";
import handlebars from "handlebars";

const readHTML = (path: string, cb: any) => {
	fs.readFile(path, { encoding: "utf-8" }, (err, html) => {
		if (err) {
			cb(err);
		} else {
			cb(null, html);
		}
	});
};

let transporter = nodemailer.createTransport(
	smtp({
		host: process.env.HOSTMAIL,
		port: 587,
		secure: false,
		auth: {
			user: process.env.MSGUSER,
			pass: process.env.MSGPASS,
		},
	})
);

const emailVerfiy = (
	email: string,
	username: string,
	token: string,
	callback: any
) => {
	readHTML(__dirname + "/html/index.html", (err: any, html: any) => {
		console.log(token);
		if (err) {
			callback(false);
		}
		const templet = handlebars.compile(html);
		const replace = { username, token };
		const htmlSEND = templet(replace);
		try {
			transporter.sendMail({
				from: "begoo@mty.email",
				to: `${email}`,
				subject: "verify your account",
				text: "verify your account",
				html: htmlSEND,
			});
			callback(true);
		} catch (err) {
			callback(false);
		}
	});
};

export default emailVerfiy;
