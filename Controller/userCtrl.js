const Users = require("../Model/userModel")
const bcrypt = require("bcrypt")
const jwt =require("jsonwebtoken");

const userController = {
    // User Registration
    registerUser: async (req, res) => {
        try {
          const {firstName,lastName, username,password } = req.body;
          const user = await Users.findOne({ username: username });
          if (user)
            return res.status(400).json({ msg: "Username already exists"});
          
          // hashing the password
          const passHash = await bcrypt.hash(password, 10);
          const newUser = new Users({
            firstName: firstName,
            lastName: lastName,
            username: username,
            password: passHash,
          });
          await newUser.save();
          //res.json(newUser)
          res.json({ msg: "signup successfull , login now" });
        } catch (err) {
          return res.status(500).json({ msg: err.message });
        }
      },
      
      // Login User
      loginUser: async (req, res) => {
        try {
          const { username, password } = req.body;
          const user = await Users.findOne({ username: username });
          if (!user) return res.status(400).json({ msg: "User does not exist." });
    
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) return res.status(400).json({ msg: "Incorrect password." });
    
          //create token if isMatch
          const payload = { id: user._id, name: user.username };
          const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
            expiresIn: "1d",
          });
        
          console.log(token);
          //res.json({ token });
          res.status(200).json({msg: "Login successful"})
        } catch (err) {
          return res.status(500).json({ msg: err.message });
        }
      },

      //get user Details (firstName, lastName ,username)
      getDetails: async (req, res) => {
          try{
            const user = await Users.findById({_id : req.params.id},{firstName:1,lastName:1,username:1,_id:0});
            res.json(user);
          }catch(err){
              return res.status(500).json({msg: err.message})
          }
      },

      //get userslist
      getUserlist: async (req,res) => {
        try{
          const user = await Users.find({},{firstName:1,lastName:1,username:1,_id:0})
          res.json(user);
        }catch(err){
            return res.status(500).json({msg: err.message})
        }
      },

}

module.exports = userController;