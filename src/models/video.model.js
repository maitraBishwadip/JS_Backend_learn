import mongoose , { Schema } from 'mongoose';
import mongooseagrigatePaginate from 'mongoose-aggregate-paginate-v2';

const videoSchema = new Schema({

    title: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        required: true,
        trim: true
    },

    videoFile: {
        type: String, //Cloudinary URL for the video file
        required: true
    },

    thumbnail: {
        type: String, //Cloudinary URL for the thumbnail
        required: true
    },

    duration: {
        type: Number, //From Cloudinary metadata
        required: true
    },

    views: {
        type: Number,
        default: 0
    },

    isPublished: {
        type: Boolean,
        default: false
    },

    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

}, { timestamps: true });


videoSchema.plugin(mongooseagrigatePaginate);
const Video = mongoose.model('Video', videoSchema);



export { Video };