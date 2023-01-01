const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const uniqueValidator = require('mongoose-unique-validator');
const jwt = require('jsonwebtoken');
require("dotenv").config();


const UserSchema = new mongoose.Schema({
	
	firstName: {
		type: String,
		required: [true, "First Name can't be empty"]
	},
	lastName: {
		type: String,
		required: [true, "Last Name can't be empty"]
	},
	email: {
		type: String, 
		lowercase: true, 
		required: [true, "Email can't be empty"], 
		match: [/\S+@\S+\.\S+/, 'is invalid'], 
		index: true,
		unique: true, 
	},
	country:{
		type: String,
		required: [true, "country can't be empty"]
	},
	password:{
		type: String,
		required: [true, "Password can't be empty"]

	},
	verifiedStatus:{
		type: Boolean,
    default: false,
		required: [true, "VerifyStatus can't be empty"]
	},
},{
	timestamps:true
});

UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});


UserSchema.pre('save',async function(next){
	
	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(this.password,salt);
	this.password = hash;
	next();
});

UserSchema.methods.comparePassword =  async function(candidatePassword){
	const user = this ;
	return bcrypt.compare(candidatePassword,user.password).catch(e => false);
};

UserSchema.methods.generateJWT = function() {
	  let today = new Date();
	  let exp = new Date(today);
	  exp.setDate(today.getDate() + 60);

	  return jwt.sign({
	    id: this._id,
	    email: this.email,
	    exp: parseInt(exp.getTime() / 1000),
	  }, process.env.JWTSECRET);
	};

const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;
