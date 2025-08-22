import Level from './level.model.js'

export const addLevel = async (req, res)=>{
    try{
        const data = req.body
        const newLevel = new Level(data)
        newLevel.flag = req.files.flag[0].filename
        newLevel.levelImage = req.files.levelImage[0].filename
        newLevel.save()
        return res.send({success:true, message:'Level created successfully'})
    }catch(e){
        console.error(e)
        return res.status(500).send({success:false, message:'General error creating level.'})
    }
}

export const getLevels = async (req,res)=>{
    try{
        const {limit = 20,skip=0} = req.query
        const levels = await Level.find().limit(limit).skip(skip)
        if(!levels) return res.status(404).send({success:false, message:'Level not found.'})
            return res.send({success:true, message:'Level found.', levels})
    }catch(e){
        console.error(e)
        return res.status(500).send({success:false, message:'General error listing levels'})
    }
}