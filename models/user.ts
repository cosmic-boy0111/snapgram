import { Schema, model, models } from "mongoose";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'

const userSchema = new Schema({
        name : {
            type: String,
            required: [true,'Username is required!'],
        },
        image : {
            type: String,
        },
        email : {
            type: String,
            unique: [true,'Email already exists!'],
            required: [true,'Email is required!'],
        },
        password : {
            type : String,
            required : [true,'Password is required!'],
        },
        tokens : [
            {
                token : {
                    type : String,
                    required : true
                }
            }
        ],
    },
    {
        timestamps : true
    }
)

userSchema.methods.encryptPassword = async function (){

    this.password = await bcrypt.hash(this.password, 12);
    return this.password;

}

userSchema.methods.generateAuthToken = async function () {
    try {
        const KEY = process.env.SECRET_KEY ? process.env.SECRET_KEY : "GAURAVBHAGAT";
        let token = jwt.sign({_id:this._id}, KEY, {
            expiresIn: 60 * 60 * 24 * 30
        });
        this.tokens = this.tokens.concat({token: token});
        await this.save();
        // console.log(token);
        return token;
    } catch (error) {
        console.log(error);
    }
}   


const User = models.User || model("User", userSchema);

export default User;