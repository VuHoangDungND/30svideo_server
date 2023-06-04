const homeRouter = require('./home');
const searchRouter = require('./search');
const userRouter = require('./user');
const authRouter = require('./auth');

function route(app) {
    app.use('/api/auth', authRouter);
    app.use('/api/user', userRouter);
    app.use('/api/search', searchRouter);
    app.use('/api', homeRouter);
}

module.exports = route;
