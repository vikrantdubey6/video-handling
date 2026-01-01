import mongoose, { models, model, Schema } from "mongoose";

export interface IUser{
    email: string;
    password: string;
    name?:string;
    createdAt?: Date;
    updatedAt?: Date;
}

const UserSchema = new Schema<IUser>({
    email:
    {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
         match: [/[a-z0-9\._%+!$&*=^|~#%'`?{}/\-]+@([a-z0-9\-]+\.){1,}([a-z]{2,16})/, "please use a valid email address"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        trim: true,
        unique:true,
    }
},
{
    timestamps: true
}
)

const User = models?.User || model<IUser>("User", UserSchema)

export default User;