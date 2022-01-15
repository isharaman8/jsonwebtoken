const CustomAPIError = require("../errors/custom-error");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
	try {
		const { username, password } = req.body;

		if (!username || !password) {
			throw new CustomAPIError("Please provide username and password", 400);
		}

		const _id = new Date();
		const id = _id.getDate();

		const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
			expiresIn: "30d",
		});

		return res.send({ msg: "user created", token });
	} catch (err) {
		console.log(err);
		return res.status(500).send({ message: err.message });
	}
};

const dashboard = async (req, res) => {
	try {
		console.log(req.user);

		const luckyNumber = Math.floor(Math.random() * 100);
		res
			.status(200)
			.json({ msg: `Hello ${req.user.username}`, secret: luckyNumber });
	} catch (err) {
		console.log(err.message);
		res.status(400).send({ error: err.message });
	}
};

module.exports = {
	dashboard,
	login,
};
