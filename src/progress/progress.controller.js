import Progress from './progress.model.js'

export const addProgress = async (req, res) => {
    try {
        const data = req.body
        const newProgress = new Progress(data)
        await newProgress.save()
        return res.send({ success: true, message: 'Progress created successfully', progress: newProgress })
    } catch (e) {
        console.error(e)
        return res.status(500).send({ success: false, message: 'General error creating progress.' })
    }
}

export const getProgressByUser = async (req, res) => {
    try {
        const { userId } = req.params
        const progress = await Progress.findOne({ user: userId })
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
        const { id } = req.params;
        let data = req.body;

        if (data.levelsCompleted && Array.isArray(data.levelsCompleted)) {
            data.levelsCompleted = data.levelsCompleted.filter(lvl => lvl.level && lvl.level !== "");
        }

        if (data.blockedLevels && Array.isArray(data.blockedLevels)) {
            data.blockedLevels = data.blockedLevels.filter(bl => bl.level && bl.level !== "");
        }

        const updatedProgress = await Progress.findByIdAndUpdate(id, data, { new: true })
            .populate('levelsCompleted.level', '-_id')
            .populate('blockedLevels.level', '-_id');

        if (!updatedProgress) {
            return res.status(404).send({success: false,message: 'Progress not found.'})
        }

        if (data.levelsCompleted.length > 0) {
            updatedProgress.blockedLevels = updatedProgress.blockedLevels.filter(
                bl => !data.levelsCompleted.some(lvl => lvl.level.toString() === bl.level.toString())
            )
            await updatedProgress.save()
        }
        return res.status(200).send({success: true,message: 'Progress updated successfully.',updatedProgress})
    } catch (e) {
        console.error(e)
        return res.status(500).send({ success: false, message: 'General error updating progress', e })
    }
}


