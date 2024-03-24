const { model, Schema } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            trim: true,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, 'Please use a valid email'],
        },
        thoughts: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Thought',
        }],
        friends: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    },
);

const User = model('User', userSchema);

module.exports = User;