const User = require ('../models/Users')
const jwt = require('jsonwebtoken')

const generateToken = (_id) => {
    return jwt.sign({_id}, process.env.TOKEN_KEY, { expiresIn: '3d' })
}

const loginUser = async (req, res) => {
    const { role, username, password} = req.body
    try{
        const user = await User.login(role, username, password)
        
        const token = generateToken(user._id)
 
        res.status(200).json({role, username, token})
     } catch (error){
        res.status(400).json({error: error.message})
     }
     
 }
    


const signupUser = async (req, res) => {
    const {role, firstname, middlename, lastname, email, phone, username, accesskey, password} = req.body

    try{
       const user = await User.signup(role, firstname, middlename, lastname, email, phone, username, accesskey, password)
       
       const token = generateToken(user._id)

       res.status(200).json({role, username, token})
    } catch (error){
       res.status(400).json({error: error.message})
    }
    
}

module.exports = {signupUser, loginUser}