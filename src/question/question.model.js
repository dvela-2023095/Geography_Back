import { Schema, model } from "mongoose"

const questionSchema = Schema(
 {
    question:{
        type:String,
        minlength:[10, 'The question need at least 10 characters'],
        maxlength:[100,`The question can't overcome 100 characters`],
    },
    opciones:{
        type:[
            {
                answer:{
                    type:String,
                    minlength:[5,'The answer need at least 5 characters'],
                    maxlength:[50, `The answer can't overcome 50 characters`],
                    required:[true,'Answer is required']
                },
                picture:{
                    type:String,
                    required:[true,'Picture is required']
                },
                isCorrect:{
                    type:Boolean,
                    required:[true,'Need to know if the option is or is not correct']
                }
            }
        ]
    },
    level:{
        type:Schema.Types.ObjectId,
        ref:'Level',
        required:[true,'Level id is required']
    }
 }
)

export default model('Question', questionSchema)
