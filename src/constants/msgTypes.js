const MSG_TYPES = Object.freeze({
    LOGGED_IN: 'Successfully logged in',
    DELETED: 'Resource deleted successfully',
    UPDATED: 'Resource updated successfully',
    CREATED: 'Resource created successfully',
    FETCHED: 'Resource fetched successfully',
    NOT_FOUND: 'Not found',
    ACCESS_DENIED: 'Access denied.',
    SESSION_EXPIRED: 'Access denied. Your session has expired',
    INCORRECT_PASSWORD: 'Incorrect password'
  });
  
  module.exports = {
    MSG_TYPES,
  };
  