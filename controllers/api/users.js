const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../../models/user')

module.exports = {
  create,
  login,
  update,
  getOne
};

async function create(req, res) {
  try {
    // Add the user to the db
    const user = await User.create(req.body);
    console.log(user)
    // token will be a string
    const token = createJWT(user);
    // Yes, we can serialize a string
    console.log(token)
    res.json(token);
  } catch (err) {
    // Probably a dup email
    res.status(400).json(err);
  }
}

async function login(req, res) {
  try {
    // Find the user by their email address
    const user = await User.findOne({email: req.body.email});
    console.log(user)
    if (!user) throw new Error();
    // Check if the password matches
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new Error();
    res.json( createJWT(user) );
  } catch {
    res.status(400).json('Bad credentials');
  }
}

async function update(req, res) {
  try {
    const user = await User.findOneAndUpdate({_id: req.params.userId}, {
      rank: req.body.rank,
      wpm: req.body.wpm,
      accuracy: req.body.accuracy,
      points: req.body.points
    })
    console.log(user)
    if (!user) {
      return res.statue(404).json({error: "No user found"});
    }
    await user.save();
    res.sendStatus(200);
  } catch (err) {
    res.status(400).json(err)
  }
}

async function getOne(req, res) {
  try {
    console.log(req.params)
    const user = await User.findById(req.params.id);
    console.log(user)
    res.json(user)
  } catch(err) {
    res.status(400).json(err)
  }
}


/* Helper Functions */

function createJWT(user) {
  console.log(user)
  return jwt.sign(
    // data payload
    { user },
    process.env.SECRET,
    { expiresIn: '24h' }
  );
}