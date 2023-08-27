const express = require('express');
const apiRouter = express.Router();
const User = require('./db/User');

const cookieParser = require('cookie-parser');
apiRouter.use(cookieParser());

apiRouter.use(express.json());

const { TokenMiddleware, generateToken, removeToken } = require('../middleware/TokenMiddleware');

apiRouter.post('/login', (req, res) => {
    if (req.body.username && req.body.password) {
        User.getUser(req.body.username, req.body.password).then(user => {
            let result = {
                user: user
            }
            generateToken(req, res, user);

            res.json(result);
        }).catch(err => {
            res.status(400).json({ error: err });
        });
    } else {
        res.status(401).json({ error: 'Not authenticated' });
    }
});

apiRouter.post('/logout', TokenMiddleware, (req, res) => {
    removeSession(req, res);
    res.json({ success: true });
});

apiRouter.get('/users/current', TokenMiddleware, (req, res) => {
    res.json(req.user);
});
module.exports = apiRouter;