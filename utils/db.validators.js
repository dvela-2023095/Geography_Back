import User from "../src/user/user.model.js"
import Level from "../src/level/level.model.js"
export const existsUser = async(username)=>{
    const alreadyExists = await User.findOne({username})
    if(alreadyExists){
        console.error(`The username ${username} is already taken`)
        throw new Error(`The username ${username} is already taken`)
    }
}

export const existsLevel = async(name) => {
    const alreadyLevel = await Level.findOne({ name })
    if (alreadyLevel) {
        console.error(`The level ${name} already exists`)
        throw new Error(`The level ${name} already exists`)
    }
}
