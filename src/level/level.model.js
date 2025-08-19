import { Schema,model } from "mongoose"

const levelSchema = Schema(
    {
        name:{
            type:String,
            minlength:[4,'The name need at least 4 characters'],
            maxlength:[56,`The name can't overcome 56 characters`],
            required:[true,'Name is required']
        },
        levelImage:{
            type:String,
            required:[true,'Level image is required']
        },
        flag:{
            type:String,
            required:[true,'Flag is required']
        }
    }
)

export default model('Level',levelSchema)