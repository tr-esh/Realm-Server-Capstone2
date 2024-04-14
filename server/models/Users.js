const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator')

const UserSchema = new mongoose.Schema({
    role:{
        type: String,
        required: true
    },
    firstname:{
        type: String,
        required: true
    },
    middlename:{
        type: String,
        required: false
    },
    lastname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    phone:{
        type: String,
        required: true,
        unique: true,
    },
    username:{
        type: String,
        required: true,
    },
    accesskey:{
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
    
});

UserSchema.statics.signup = async function (role, firstname, middlename, lastname, email, phone, username, accesskey, password) {
    if (!role || !firstname || !middlename || !lastname || !email || !phone || !username || !accesskey || !password) {
        throw Error('Please complete your details');
    }

    const isEmail = validator.isEmail(email);
    const isPhoneNumber = validator.isMobilePhone(phone, 'en-PH', { strictMode: false });

    // Check if it's a valid email or a valid Philippine phone number
    if (!isEmail) {
        throw Error('Invalid email');
    }
    if (!isPhoneNumber) {
        throw Error('Invalid mobile number');
    }
    if (!validator.equals(accesskey, process.env.ADMIN_KEY)) {
        throw Error('Unauthorized Key');
    }

    // Validate the role
    if (!['Admin', 'Monitoring-Officer'].includes(role)) {
        throw Error('Invalid role. Valid roles are Admin or Monitoring-Officer.');
    }

    // Validate the username (no spaces or special characters)
    if (!/^[a-zA-Z0-9]+$/.test(username)) {
        throw Error('Invalid username. (should not contain spaces and special characters)');
    }

    const emailExist = await this.findOne({ email });
    const phoneExist = await this.findOne({ phone });
    const userExist = await this.findOne({ username });

    if (emailExist) {
        throw Error('Email already exists');
    }
    if (phoneExist) {
        throw Error('Phone number already exists');
    }
    if (userExist) {
        throw Error('Username is already taken');
    }
    if (!validator.isStrongPassword(password, {
        minLength: 12, minLowercase: 1,
        minUppercase: false, minNumbers: 1, minSymbols: false
    })) {
        throw Error('Password is not strong enough');
    }

    const salt = await bcrypt.genSalt(10);
    const encrypt = await bcrypt.hash(password, salt);
    const adminencrypt = await bcrypt.hash(accesskey, salt);

    const user = await this.create({ role, firstname, middlename, lastname, email, phone, username, accesskey: adminencrypt, password: encrypt });

    return user;
};



UserSchema.statics.login = async function (role, username, password) {
    if (!role || !username || !password ) {
        throw Error('Please provide your details');
    }
    if (!/^[a-zA-Z0-9]+$/.test(username)) {
        throw Error('Invalid username. (should not contain spaces and special characters)');
    }
    const user = await this.findOne({ username, role }); // Checking both username and role

    if (!user) {
        throw Error('User not found or role does not match');
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        throw Error('Incorrect Password');
    }

    return user;
};


const UserModel = mongoose.model('User', UserSchema)
module.exports = UserModel
