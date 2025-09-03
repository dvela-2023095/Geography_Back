import Progress from './progress.model.js'
import Levels from '../level/level.model.js';
export const addProgress = async (user) => {
    try {
        let levelsBlocked = await Levels.find()
        let firstLevel = levelsBlocked[0]
        levelsBlocked = levelsBlocked.slice(1)
        let newProgress = new Progress({
            user:user,
            levelsCompleted:[],
            blockedLevels: levelsBlocked,
            unblockedLevel:firstLevel
        })
        await newProgress.save()    
    } catch (e) {
        console.error(e)
    }
}

export const getProgressByUser = async (req, res) => {
    try {
        const { id } = req.params
        const progress = await Progress.findOne({ user: id })
            .populate('levelsCompleted.level', '-_id')
            .populate('blockedLevels.level', '-_id')

        if (!progress) return res.status(404).send({
            success: false,
            message: 'Progress not found for this user'
        })
        return res.status(200).send({success: true,message: 'Progress found.',progress})
    } catch (e) {
        console.error(e)
        return res.status(500).send({success: false,message: 'Internal server error',e })
    }
}


export const updateProgress = async(req, res)=>{
    try {
        const {user}=req
        const {levelCompleted}= req.body
        let userProgress = await Progress.findOne({user:user.uid})
        if(userProgress.levelsCompleted.length >0){
            if (userProgress.levelsCompleted.some(lvl => lvl.toString() == levelCompleted)) {
                userProgress.levelsCompleted.push(levelCompleted)
                if(userProgress.blockedLevels.length !== 0){
            
                    userProgress.unblockedLevel = userProgress.blockedLevels[0]
                    userProgress.blockedLevels = userProgress.blockedLevels.slice(1)
                }
                
            }

        }else{
            userProgress.levelsCompleted.push(levelCompleted)
            if(userProgress.blockedLevels.length !== 0){
            
                userProgress.unblockedLevel = userProgress.blockedLevels[0]
                userProgress.blockedLevels = userProgress.blockedLevels.slice(1)
            }
        }
        
        await userProgress.save()
        return res.send({success:true,message:'Progress successfully ulpdated'})
    } catch (error) {
        console.error(error)
        return res.status(500).send({success:false,message:'General error updating the progress'})
    }
}