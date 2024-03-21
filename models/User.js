const { model, Schema } = require("mongoose");

const userSchema = new Schema (
    {
        username: {
            type: String,
            unique: true,
            trim: true,
            required: true,
        }
    }
)

module.export = User;