import { Schema,model } from "mongoose"

const levelSchema = Schema(
    {
        name:{
            type:String,
            minlength:[4,'The name need at least 4 characters'],
            maxlength:[56,`The name can't overcome 56 characters`]
        },
        levelImage:{
            type:String
        },
        flag:{
            type:String
        }
    }
)

export default model('Level',levelSchema)