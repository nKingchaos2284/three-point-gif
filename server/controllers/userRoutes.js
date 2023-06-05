const jwt = require('jsonwebtoken');
const router = require("express").Router();
const { User } = require("../models");

// creating a new user
router.post("/signup", async (req, res) => {
  try {
    const userData = await User.create(req.body);
    console.log(userData);
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    if (password !== user.password) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ user_id: user.id }, 'secret_octopus');
    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.logged_in = true;

      res.json({ user, token, message: 'You are now logged in!' });
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});


// log out
router.get("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.render("SignInPage");
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
