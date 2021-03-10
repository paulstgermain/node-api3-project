const User = require('../users/users-model');

function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log(
    `[${new Date().toISOString()}] ${req.method} to '${req.path}' from ${req.get('Origin')}`
  );

  next();
}

async function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  const id = req.params.id;

  const user = await User.getById(id);

  try {
    if (!user) {
      res.status(404).json({ message: "user not found" })
    } else {
      req.user = user;
      next();
    }

  } catch (err) {
      next(err);
  }

}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  const newUser = req.body;
  const name = req.body.name;

  if (!newUser) {
    res.status(400).json({ message: "missing user data" })
  } else if (!name) {
    res.status(400).json({ message: "missing required name field" })
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  const newPost = req.body;
  const text = req.body.text;

  if (!newPost || !newPost.user_id) {
    res.status(400).json({ message: "missing post data" })
  } else if (!text) {
    res.status(400).json({ message: "missing required text field" })
  } else {
    next();
  }
}

// do not forget to expose these functions to other modules

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}