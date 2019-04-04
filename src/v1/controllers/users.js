const { validationResult } = require("express-validator/check");
const { apiResponse, apiResponseWithPagination } = require("../utils/helper");
const jsonData = require("../data.json");

exports.users_list_get = function(req, res) {
	const users = jsonData.users;
	if (req.params.isEmpty) {
		return res.status(200).send(apiResponse(200, null, null, users));
	}
	const page = parseInt(req.query.page, 10) || 1;
	const limit = parseInt(req.query.size, 10) || 3; // 3 default limit
	const offset = (page - 1) * limit;
	const paginatedUsers = users.slice(offset, offset + limit);
	const pagination = {
		page: page,
		limit: limit,
		count: users.length,
		pages: Math.ceil(users.length / limit)
	};
	res
		.status(200)
		.send(
			apiResponseWithPagination(200, null, null, paginatedUsers, pagination)
		);
};

exports.user_detail_post = function(req, res) {
	const id = parseInt(req.params.id);
	if (0 < id && id < jsonData.users.length + 1) {
		return res
			.status(200)
			.send(apiResponse(200, null, null, [jsonData.users[id - 1]]));
	}
	return res
		.status(404)
		.send(apiResponse(404, "User does not exist", null, null));
};

exports.user_create_post = function(req, res) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).send(apiResponse(400, null, errors.array(), null));
	}
	const id = Math.ceil(Math.random() * 9);
	var user = jsonData.users[id];
	user.email = req.body.email;
	user.createdAt = new Date().getTime();
	return res
		.status(201)
		.send(apiResponse(201, "The User was created successfully", null, [user]));
};

exports.user_update_patch = function(req, res) {
	const id = parseInt(req.params.id);
	if (0 < id && id < jsonData.users.length + 1) {
		var user = jsonData.users[id - 1];
		user.updatedAt = new Date().getTime();
		return res.status(200).send(apiResponse(200, null, null, user));
	}
	return res
		.status(404)
		.send(apiResponse(404, "User does not exist", null, null));
};

exports.user_drop_delete = function(req, res) {
	const id = parseInt(req.params.id);
	if (0 < id && id < jsonData.users.length + 1) {
		return res.status(204).send({});
	}
	return res
		.status(404)
		.send(apiResponse(404, "User does not exist", null, null));
};
