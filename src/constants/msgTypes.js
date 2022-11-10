const MSG_TYPES = Object.freeze({
    LOGGED_IN: 'Successfully logged in',
    DELETED: 'Resource deleted successfully',
    UPDATED: 'Resource updated successfully',
    CREATED: 'Resource created successfully',
    FETCHED: 'Resource fetched successfully',
    NOT_FOUND: 'Not found',
    ACCESS_DENIED: 'Access denied.',
    SESSION_EXPIRED: 'Access denied. Your session has expired',
    SERVER_ERROR: 'Server error!',
    ACCOUNT_DELETED: 'Account no longer exists!',
    NOT_ALLOWED: 'This operation is not allowed',
    NOT_AUTHORIZED: 'You are not authorized to perform this operation',
    INCORRECT_PASSWORD: 'Incorrect password'
  });
  
  module.exports = {
    MSG_TYPES,
  };
  