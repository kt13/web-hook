module.exports = {
    PORT: process.env.PORT || 8080,
    CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
    DATABASE_URL:
     'mongodb://dev:yesmedev1@ds125001.mlab.com:25001/web-hook',
    // TEST_DATABASE_URL:
    //     process.env.TEST_DATABASE_URL ||
    //     'mongodb://localhost/thinkful-backend-test'
};
