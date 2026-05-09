import { Timestamp } from 'mongodb';
import mongoose , { Schema } from 'mongoose';

const userSchema = new Schema({

    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 30,
        index : true
    },

      email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },

    
     fullname: {
        type: String,
        required: true,
        trim: true
    },

    avater:{
        type: String, //Cloudinary URL for the Image 
        required: true,

    },

    coverImage:{
        type: String //Cloudinary URL for the Image
        
    },

    watchHistory: [{
        type: Schema.Types.ObjectId,
        ref: 'Video'
    }],

    password: {
        type: String, //Password will be handled with bcrypt for hashing Later
        required: [true, "Password is required"],
        minlength: 6
    },

    refreshToken: {
        type: String
    },



    


}

, {timestamps: true}

);

userSchema.pre("save", async function(next) {

    if (!this.isModified("password")) {
        return next();
    }

    //Hash the password before saving
    const bcrypt = await import("bcrypt");
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
});

//Method to compare password during login   
userSchema.methods.comparePassword = async function(candidatePassword) {

    const bcrypt = await import("bcrypt");
    return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.generateAccessToken = function() {

    const jwt = import("jsonwebtoken");
    const token = jwt.sign({  userId: this._id ,
                              email: this.email,
                              username: this.username,
                             fullname: this.fullname}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
    return token;
}; 

userSchema.methods.generateRefreshToken = function() {  
    const jwt = import("jsonwebtoken");
    const token = jwt.sign({ userId: this._id 
                             

    }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY });
    return token;
};

const User = mongoose.model('User', userSchema);