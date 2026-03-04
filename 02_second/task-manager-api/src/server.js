import app from './app.js'
import {env} from './config/conf.js';
import {connectDB} from './config/db.js'

const serverStart = async() => {
    await connectDB();

    app.listen(env.port, ( ) => [
        console.log(`port is running at ${env.port}`)
    ])
}

serverStart();