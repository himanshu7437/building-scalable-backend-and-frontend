import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    refreshTokenVersion: {
        type: Number,
        default: 0
    },
}, {timestamps: true})

userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 12);
    return next();
})

userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

export const User = mongoose.model('User', userSchema)