// Mongoo table here
const Users = require('../models/userModel');
const Payments = require('../models/paymentModel');
// for Passsword Encryption
const bcrypt = require('bcrypt');
// Then create jsonWebtoken to authenticate
const jwt = require('jsonwebtoken');


const userCtrl = {

    // 1
    register: async (req, res) => {
        // res.json({msg: "Test userCtrl"});
        try{
            const {name, email, password} = req.body;

            const user = await Users.findOne({email})

            // mail validation
            if(user) return res.status(400).json({msg: "The email already exists!"})

            //  password validation
            if(password.length < 6) 
            return res.status(400).json({msg: "Password is atleast 6 characters long"})

            // Passsword Encryption
            const passwordHash = await bcrypt.hash(password, 10);

            //  New User insert to mongo
            const newUser = new Users({
                name, email, password: passwordHash
            });

            //  Data Save to Mongodb
                await newUser.save();

            // Then newly create jsonWebtoken to authenticate
            const accesstoken = createAccessToken({id: newUser._id});

            const refreshtoken = createRefreshToken({id: newUser._id});

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7*24*60*60*1000 // 7d
            });

            

            res.json({accesstoken});

            // res.json({msg: "Register Siccess!"});

            // res.json(newUser)

            // res.json({password, passwordHash})
            


        }catch(err) {
            return res.status(500).json({
                msg: err.message,
            })
        }
    },


    // 2
    refreshToken: (req, res) =>{
        try {
            const rf_token = req.cookies.refreshtoken;

            // res.json({rf_token});

            if(!rf_token) return res.status(400).json({msg: "Please Login or Register"})
            
            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) =>{
                if(err) return res.status(400).json({msg: "Please Login or Register"})

                const accesstoken = createAccessToken({id: user.id})

                res.json({accesstoken})

                // res.json({user, accesstoken})
            })

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
        
    },

    // 3 
    login: async (req, res) => {
        try{
            const {email, password} = req.body;

            const user = await Users.findOne({email});
            if(!user)  return res.status(400).json({msg: "User doesn't exists!"});

            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch)  return res.status(400).json({msg: "Incorrect password!"});

            // If Login success, create access token & refresh token using old user
            const accesstoken = createAccessToken({id: user._id})
            const refreshtoken = createRefreshToken({id: user._id})

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7*24*60*60*1000 // 7d
            })

            res.json({accesstoken})
            // res.json({msg: "Login Success!"});


        }catch(err){
            return res.status(500).json({msg: err.message});
        }
    },

    // 4
    logout: async (req, res) => {
        try{
            // clear cookie after logout check refresh token
            res.clearCookie('refreshtoken', {path: '/user/refresh_token'});
            return res.json({msg: "Logged out!"});

        }catch(err){
            return res.status(500).json({msg: err.message});
        }
    },

    // 5 (After setting auth)

    getUser: async (req, res) =>{
        try {
            // const user = await (await Users.findById(req.user.id));
            const user = await Users.findById(req.user.id).select('-password')
             // res.json(req.user)
            if(!user) return res.status(400).json({msg: "User does not exist."})

            res.json(user)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    // 5 after buy products of cart page should not be deleted if page refresh

    addCart: async (req, res) =>{
        try {
            const user = await Users.findById(req.user.id)
            if(!user) return res.status(400).json({msg: "User does not exist."})

            await Users.findOneAndUpdate({_id: req.user.id}, {
                cart: req.body.cart
            })

            return res.json({msg: "Added to cart"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    // 6 user cart history
    history: async(req, res) =>{
        try {
            const history = await Payments.find({user_id: req.user.id})

            res.json(history)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },



};

const createAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '11m'});

};

const createRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'});

};

module.exports = userCtrl;