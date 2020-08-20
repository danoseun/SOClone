import mongoose from 'mongoose';
const { Schema } = mongoose;

const QuestionSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },

    title: {
        type: String
    },

    text: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },

    upvotes: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        }
    }],

    downvotes: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        }
    }],
    
    answers: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        },
        text: {
            type: String,
            required: true
        },

        name: {
            type: String,
            required: true
        },
        Date: {
            type: Date,
            Default: Date.now

        },
        like: [{
            user: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        }],
    }],
    date: {
        type: Date,
        Default: Date.now
    },
});

export const Question = mongoose.model('question', QuestionSchema);
