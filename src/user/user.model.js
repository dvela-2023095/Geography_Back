import { Schema, model } from "mongoose";

const userSchema = Schema(
    {
        username:{
            type:String,
            minlength:[3,'The title need at least 3 characters'],
            maxlength:[10,`the title can't overcome 10 characters`],
            required:[true,'Username is required']
        },
        password:{
            type:String,
            minlength:[8, 'The password need at least 8 characterds'],
            maxlength:[12,`The password can't overcome 12 characters`],
            required:[true, 'Password is required']
        }
    }
)

export default model ('User',userSchema)