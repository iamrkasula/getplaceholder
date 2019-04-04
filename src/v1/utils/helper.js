exports.apiResponse = function(
	status,
	message = null,
	errors = null,
	data = null
) {
	return {
		status: status,
		message: message,
		errors: errors,
		data: data
	};
};

exports.apiResponseWithPagination = function(
	status,
	message = null,
	errors = null,
	data = null,
	pagination = null
) {
	return {
		status: status,
		message: message,
		errors: errors,
		data: data,
		pagination: pagination
	};
};

Object.prototype.isEmpty = function() {
	for (var key in this) {
		if (this.hasOwnProperty(key)) return false;
	}
	return true;
};
