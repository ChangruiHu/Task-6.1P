const mongoose = require("mongoose")
const validator = require("validator")
const expertSchema = new mongoose.Schema(
    {
        country: {
            type: String,
            required: [true, 'Country field required'],
        },
        firstName: {
            type: String,
            required: [true, 'First name field required'],
            trim: true
        },
        lastName: {
            type: String,
            required: [true, 'Last name field required'],
            trim: true
        },
        email: {
            type: String,
            lowercase: true,
            validate(value) {
                if (!validator.isEmail(value)) { throw new Error('The email is not valid!') }
            }
        },
        password: {
            type: String,
            required: [true, 'Password required'],
            minlength: [8, 'Minimun password length 8 characters']
        },
        confirmPassword: {
            type: String,
            required: [true, 'Confirm Password field required'],
            minlength: [8, 'Minimun password length 8 characters']
        },
        addressLine1: {
            type: String,
            required: [true, 'Address required'],
        },
        addressLine2: {
            type: String
        },
        city: {
            type: String,
            required: [true, 'City required']
        },
        state: {
            type: String,
            required: [true, 'State required']
        },
        zipcode: {
            type: String
        },
        phone: {
            type: String
        }
    }
)

module.exports = mongoose.model("Expert", expertSchema);