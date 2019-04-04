const { body } = require("express-validator/check");

exports.validate = method => {
	switch (method) {
		case "user_create_post": {
			return [
				body("email", "Invalid email")
					.exists()
					.isEmail()
			];
		}
	}
};
