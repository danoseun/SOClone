export const messages = {
    welcome: 'Welcome to Stackoverflow',
    notFound: 'Wrong request. Route does not exist',
    serverError: 'Internal server error',
    redisConnected: 'redis client connected',
    redisConnectionError: 'there was an error connecting to redis client',
    connectedToDatabase: 'connected to database',
    failedToConnect: 'failed to connect to database',
    notfound: 'not found',
    unAuthorized: 'Authentication failed',
    noToken: 'No token spplied',
    tokenError: 'Invalid token provided',
    IncorrectLoginDetails: 'Email or Password is incorrect',
    userAuthorized: 'You are now logged in',
    unAuthorizedRoute: 'You do not have permission to this route',
    loggedIn: 'succesfully logged in',
    created: 'created successfully',
    usedEmail: (email) => `User with this email (${email}) already exist.`,
  };
  
  