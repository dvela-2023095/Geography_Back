import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import authRoutes from '../src/auth/auth.routes.js'
import levelRoutes from '../src/level/level.routes.js'
import questionRoutes from '../src/question/question.routes.js'
import progressRoutes from '../src/progress/progress.routes.js'
import {limiter} from '../middlewares/rate.limit.js'
const configs = (app)=>{
    app.use(express.json())
    app.use(express.urlencoded({extended:true}))
    app.use(cors())
    app.use(helmet({
        crossOriginResourcePolicy: { policy: 'cross-origin' },
      })
    )
    app.use(morgan('dev'))
    app.use(limiter)

    app.use('/uploads', cors(), express.static('uploads'))
}

const routes =(app)=>{
    app.use('/v1',authRoutes)
    app.use('/v1/levels', levelRoutes)
    app.use('/v1/questions',questionRoutes)
    app.use('/v1/progress', progressRoutes)
    app.use("/upload", express.static("upload"));
}

export const initServer = ()=>{
    const app = express()
    try {
        configs(app)
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running in port ${process.env.PORT}`)
    } catch (err){
        console.error('Server init failed', err)
    }
}