import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String
    },
    hobbies: {
        type: [String]
    },
    city: {
        type: String
    },
    dob: {
        type: String
    },
    photo: {
        type: String
    }
});

const Registration = mongoose.model("Registration", registrationSchema);
export default Registration;