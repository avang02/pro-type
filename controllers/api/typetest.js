const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const TypeTest = require('../../models/typetest');
const User = require('../../models/user');

module.exports = {
  create,
  getAllTest,
  getTypeTest,
  deleteTypeTest,
};

async function create(req, res) {
    console.log(req.body)
    try {
        const typetest = await TypeTest.create({
            user: req.body.user,
            quote: req.body.quote,
            wordcount: req.body.wordcount,
            charcount: req.body.charcount,
            wpm: req.body.wpm,
            accuracy: req.body.accuracy,
            points: req.body.points
        });
        console.log(typetest)
        await typetest.save();
        res.status(201).send("Typetest created successfully.");
    } catch (err) {
        res.status(400).json(err);
    }
}

async function getAllTest(req, res) {
    try {
        const user = await User.findById(req.params.userId)
        const typetests = await TypeTest.find({user: user}).sort({createdAt: -1});
        res.json(typetests)
    } catch (err) {
        res.status(400).json(err);
    }
}

async function getTypeTest(req, res) {
    const {id} = req.params
    try {
        const typetest = await TypeTest.findById(id);
        if(!typetest) {
            return res.status(404).json({error: 'No type test found'});
        }
        res.json(typetest);
    } catch (err) {
        res.status(400).json(err);
    }
}

async function deleteTypeTest(req, res) {
    
    try {
        const typetest = await TypeTest.findByIdAndDelete(req.params.id)
        if(!typetest) {
            return res.status(404).json({error: 'No type test found'});
        }
        res.json(typetest)
    } catch (err) {
        res.status(400).json(err);
    }
}

/* Helper function */
