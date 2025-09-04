import Question from "./question.model.js";

export const addQuestion = async(req,res)=>{
    try{
        const data = req.body
        let newQuestion = new Question(data)
        for(let i = 0;i<3;i++){
            if(newQuestion.opciones[i] === undefined) break
            let newAnswer ={
                answer: newQuestion.opciones[i].answer,
                isCorrect: newQuestion.opciones[i].isCorrect,
                picture : req.files[`opciones[${i}][picture]`][0].filename
            }
            newQuestion.opciones[i]= newAnswer
        }
        await newQuestion.save()
        return res.send({success:true,message:'Question added successfully'})
    }catch(err){
        console.log(err)
        return res.status(500).send({success:false,message:'General error adding the question'})
    }
}

export const getQuestions = async(req,res)=>{
    try {
        const {id}= req.params
        let questionBank = await Question.find({level:id})
        let levelQuestions = []
        if(questionBank.length === 0) return res.status(404).send({success:false,message:'There is no questions'})
        if(questionBank.length >10){
            for(let i = questionBank.length-1;i>(questionBank.length -11);i--){
                let j = Math.floor(Math.random()*(i+1))
                ;[questionBank[i],questionBank[j]]=[questionBank[j],questionBank[i]]
            }
            levelQuestions = questionBank
        }else{
            for(let i = questionBank.length-1;i>0;i--){
                let j = Math.floor(Math.random()*(i+1))
                ;[questionBank[i],questionBank[j]]=[questionBank[j],questionBank[i]]
            }
            levelQuestions = questionBank
        }

        return res.send({success:true,message:levelQuestions})
    } catch (error) {
        console.error(error)
        return res.status(500).send({success:false,message:'General error listing the Questions'})
    }
}

