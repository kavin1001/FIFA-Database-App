const { Router } = require("express");
const usersRouter = Router();
var crypto = require('crypto');
var userModel = require('../models/user.model')

// check for user session on every request to friend route
usersRouter.use((req,res,next) => {
    if (!req.session.user) {
        next();
    } else {
        res.status(403);
    }
})

usersRouter.get("/login", async (req, res) => {
    // retrieve user / pass
    // check user exists 
    // hash pass and see if it matches
    // return session
    const user_session = req.session.user;
    const { username, password } = req.query;
    var user = await userModel.getUser(username);
    if (!user) {
        res.status(404).json({message: "User Not Found"});
        return
    } else {
        var hash = crypto.pbkdf2Sync(password, user.salt, 1000, 64, `sha512`).toString(`hex`);
        if (user.hash_pw === hash) {
            req.session.user = {username: user.username }; // TODO: check if works
            // req.session.save();
            console.log("session", req.session);
            user = await userModel.updateLogin(username, Date.now().toString());
            res.status(200).send({message: "user found", user: user});
            // res.status(200).json({message: "user found", user: user});
        } else {
            res.status(400).json({message: "Incorrect Password"});
        }
    }
});

usersRouter.get("/logout", async(req, res) => {
    // logout code
    // delete session
    const user_session = req.session.user;
    const { username } = req.query; 
    const user = await userModel.updateLogin(username, "0") // set login status to 0 -> user is logged out!
    res.status(200).json({user: user });
});


usersRouter.post("/create", async (req, res) => {
    // account data: username, pass, email, first, last, affiliation, birthday, interests (list)
    // PASSWORD SHOULD BE HASHED (should be cleaned before arriving to BE)
    // check if username already exists. throw 409 "conflict" if so 
    const { username, password, email, first, last, affiliation, birth, interests } = req.body;

    const user_exists = await userModel.getUser(username);
    if (user_exists) {
        res.status(409).json({message: "username exists"});
        return;
    }

    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);

    const user = {
        username: username,
        salt: salt,
        hash_pw: hash,
        email: email,
        first: first,
        last: last,
        affiliation: affiliation,
        birth: birth,
        interests: interests,
        numPosts: 0,
        last_login: Date.now().toString(),
        chats: [],
    }
    const result = await userModel.createUser(user);
    if (result) {
        res.status(200).json({user: user});
    } else {
        res.status(400);
    }
});

// retrieves all the users from the database
// used for searching
usersRouter.get("/getAllUsers", async (req, res) => {
    const user_session = req.session.user;
    const allUsers = await userModel.getAllUser();
    res.status(200).json({users:allUsers});
});

// retrieves user info minus password from the database
usersRouter.get("/getUser", async (req, res) => {
    const user_session = req.session.user;
    const { username } = req.query;
    const user = await userModel.getUser(username);
    delete user.hash_pw
    delete user.salt 
    if (!user) {
        res.status(404).json({message: "user not found"})
    } else {
        res.status(200).json({user : user})
    }
});

// update affiliation
usersRouter.post("/updateAffiliation", async (req, res) => {
    const user_session = req.session.user;
    const { username, affiliation } = req.body;
    const response = await userModel.updateAffiliation(username, affiliation);
    if (!response) {
        res.status(404).json({success: false})
    } else {
        res.status(200).json({success: true})
    }
});

// update email
usersRouter.post("/updateEmail", async (req, res) => {
    const user_session = req.session.user;
    const { username, email } = req.body;
    const response = await userModel.updateEmail(username, email);
    if (!response) {
        res.status(404).json({success: false})
    } else {
        res.status(200).json({success: true})
    }
});

// update password
usersRouter.post("/updatePassword", async (req, res) => {
    const user_session = req.session.user;
    const { username, password } = req.body;

    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
    const response = await userModel.updatePassword(username, hash, salt);

    if (!response) {
        res.status(404).json({success: false})
    } else {
        res.status(200).json({success: true})
    }
});

// update tags
var exec = require('child_process').exec;
usersRouter.post("/updateTags", async (req, res) => {
    const user_session = req.session.user;
    const { username, tags } = req.body;

    const response = await userModel.updateTags(username, tags);
    if (!response) {
        res.status(404).json({success: false})
    } else {
        console.log("Running Adsoprtion Algo for interest change");
        exec('cd adsorption && mvn exec:java@local',
        function (error, stdout, stderr) {
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
            if (error !== null) {
                console.log('exec error: ' + error);
            }
            console.log("Adsorption finished");
        });
       
        res.status(200).json({success: true})
    }
});
/**
 * login, logout, change data
 */

module.exports = { usersRouter };