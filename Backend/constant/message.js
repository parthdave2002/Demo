const AUTH_SUCCESS_MESSAGES = {
    LOGIN_SUCCESS: 'Logged in successfully',
    LOGOUT_SUCCESS: 'Logged out successfully',
    PROFILE_FETCH_SUCCESS: 'Profile details fetched successfully',
    UPDATE_PROFILE_SUCCESS: 'Profile updated successfully',
    REGISTER_SUCCESS: 'Registered successfully',
    BLOCK_USER_ACCOUNT :"Your Account has been blocked. Please contact admin!",
    PASSWORD_NOT_MATCH : "Password not matched!",
    PASSWORD_UPDATED_SUCCESS : "Password updated successfully",
    RESET_PASSWORD_LINK_SUCCESS : "Reset password link has been sent to your email",
    LINK_EXPIRED : "Link has expired",
    PERMISSION_GET_SUCCESSFULLY : "Permission data get successfully",
};

const USER_MESSAGES = {
    USER_NOT_FOUND: 'User not found!',
    USER_EXIST: 'User Exist!',
    USER_ALREADY_EXISTING: 'User already exists',
    USER_CREATED_SUCCESS: 'User created successfully',
    USER_UPDATED_SUCCESS: 'User updated successfully',
    USER_DELETED_SUCCESS: 'User deleted successfully',
    USER_GET_SUCCESS: 'User data get successfully',
}

const ROLE_MESSAGES = {
    ROLE_NOT_FOUND: 'Role not found!',
    ROLE_EXIST: 'Role Exist!',
    ROLE_ALREADY_EXISTING: 'Role already exists',
    ROLE_CREATED_SUCCESS: 'Role created successfully',
    ROLE_UPDATED_SUCCESS: 'Role updated successfully',
    ROLE_DELETED_SUCCESS: 'Role deleted successfully',
    ROLE_GET_SUCCESS: 'Role data get successfully',
}

const CUSTOMER_MESSAGES = {
    CUSTOMER_NOT_FOUND: 'Customer not found!',
    CUSTOMER_EXIST: 'Customer Exist!',
    CUSTOMER_ALREADY_EXISTING: 'Customer already exists',
    CUSTOMER_CREATED_SUCCESS: 'Customer created successfully',
    CUSTOMER_UPDATED_SUCCESS: 'Customer updated successfully',
    CUSTOMER_DELETED_SUCCESS: 'Customer deleted successfully',
    CUSTOMER_GET_SUCCESS: 'Customer data get successfully',
}

const CMS_MESSAGES = {
    CMS_NOT_FOUND: 'CMS id not found!',
    CMS_EXIST: 'CMS Exist!',
    CMS_ALREADY_EXISTING: 'CMS already exists',
    CMS_CREATED_SUCCESS: 'CMS created successfully',
    CMS_UPDATED_SUCCESS: 'CMS updated successfully',
    CMS_DELETED_SUCCESS: 'CMS deleted successfully',
    CMS_GET_SUCCESS: 'CMS data get successfully',
}

module.exports = { 
    USER_MESSAGES,
    ROLE_MESSAGES,
    AUTH_SUCCESS_MESSAGES,
    CMS_MESSAGES,
    CUSTOMER_MESSAGES
}