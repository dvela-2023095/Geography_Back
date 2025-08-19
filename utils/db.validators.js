import User from "../src/user/user.model.js"

export const existsUser = async(username)=>{
    const alreadyExists = await User.findOne({username})
    if(alreadyExists){
        console.error(`The username ${username} is already taken`)
        throw new Error(`The username ${username} is already taken`)
    }
}
