
const sendResponse = async (res, status, data, success, message) => {
    let response = {
        status,
        success,
        message,
    };
    if (data) response.data = data;
    if (!status) response.errors = [{ msg: message }];
    return res.status(status).json(response);
};

module.exports = { sendResponse };