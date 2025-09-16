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


export const updateProgress = async (req, res) => {
  try {
    const { user } = req;
    const { levelCompleted } = req.body;

    let userProgress = await Progress.findOne({ user: user.uid });

    // Si no tiene progresos todavía o si no existe el nivel en el array
    if (
      userProgress.levelsCompleted.length === 0 ||
      !userProgress.levelsCompleted.some(
        lvl => lvl._id.toString() === levelCompleted
      )
    ) {
      userProgress.levelsCompleted.push(levelCompleted);

      if (userProgress.blockedLevels.length !== 0) {
        userProgress.unblockedLevel = userProgress.blockedLevels[0];
        userProgress.blockedLevels = userProgress.blockedLevels.slice(1);
      }
    }

    console.log(userProgress);
    await userProgress.save();

    return res.send({
      success: true,
      message: "Progress successfully updated",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ success: false, message: "General error updating the progress" });
  }
};