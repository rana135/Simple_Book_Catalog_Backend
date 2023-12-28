import config from "../config";
import app from "./apps"; 

import mongoose from 'mongoose';
 
async function boostrap() {
    try{
        await mongoose.connect(config.database_url as string);
        // eslint-disable-next-line no-console
        console.log("Database is connected");
        app.listen(config.port, () => {
            // eslint-disable-next-line no-console
            console.log(`UM app listening on port ${config.port}`)
          })
    }
    catch(err){
        // eslint-disable-next-line no-console
        console.log("Faild to connected DB", err);
    }
}
boostrap();
