const { model, Schema, Types } = require("mongoose");

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: timestamp => new Date(timestamp).toISOString()
    },
}
)
const thoughtsSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        maxlength: 280,
        minlength: 1,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: timestamp => new Date(timestamp).toISOString()
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema] 
},
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false,
    },
)
thoughtsSchema.virtual('reactionCount').get(function () {
    return this.reactions.length; 
});



const Thought = model('Thought', thoughtsSchema);

module.exports = Thought;