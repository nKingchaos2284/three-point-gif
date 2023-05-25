const router = require('express').Router();
const { User } = require('../../models');

// creating a new user
router.post('/signup', async (req, res) => {
    try {
        const userData = await User.create(req.body);
        console.log(userData)
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        console.error(err)
        res.status(400).json(err);
    }
});