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


const User = mongoose.model('User', userSchema);