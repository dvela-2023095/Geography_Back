import { Schema, model } from "mongoose";

const progressSchema = Schema(
    {
        user:{
            type:Schema.Types.ObjectId,
            ref:'User',
            required:[true,'User is required']
        },
        levelsCompleted:{
            type:[
                {
                    level:{
                        type:Schema.Types.ObjectId,
                        ref:'Level'
                    }
                }
            ]
        },
        blockedLevels:{
            type:[
                {
                    level:{
                        type:Schema.Types.ObjectId,
                        ref:'Level'
                    }
                }
            ]
        }
    }
)

export default model('Progress', progressSchema)