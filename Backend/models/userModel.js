//Importing mongoose and other dependencies that are needed
const mongoose = require('mongoose') //For operations in mongodb
const bcrypt = require("bcryptjs") // For hashing the password

//Defining the user schema
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a name"]
    },
    email: {
        type: String,
        required: [true, "Please add a email"],
        unique: true,
        trim: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Please enter a valid email"
        ]
    },
    password: {
        type: String,
        require: [true, "Please add a password"],
        minLength: [8, "Please enter upto 8 characters"],
        // maxLength: [35, "Please must not exceed 35 characters"], //Because hashing creates upto 60 characters
    },
    image: {
        type: String,
        required: [true, "Please add a image"],
        default: "https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png"
    },
    phoneNumber: {
        type: String,
        required: [true, "Please add a phone number"],
        default: "+9123"
    },
    bio: {
        type: String,
        maxLength: [250, "Bio must not be more than 250 characters"],
        default: "bio"
    }
},
    {
        timestamps: true
    }
)

//Hash the password before saving to db

userSchema.pre("save", async function (next) {

    if (!this.isModified("password")) {
        return next()
    }

    const passwordSalt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this.password, passwordSalt)
    this.password = hashedPassword
})

//Storing the userSchema into a variable
const User = mongoose.model("User", userSchema)

//Exporting the userSchema, so that we can use it in different files
module.exports = User