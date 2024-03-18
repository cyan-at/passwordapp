// sanity check, basics
import 'dotenv/config'
import express from 'express';
import { Sequelize } from 'sequelize';
import * as bodyParser from 'body-parser';
import * as jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { expressjwt } from 'express-jwt';
import crypto from "crypto";
const env = process.env.NODE_ENV || 'production';
// console.log('hello world', env);


import configuration from './config/config.js'
const config = configuration[env]
const sequelize = new Sequelize(config);

sequelize.authenticate().then(() => console.log('connected')).catch((e) => console.error(e));

// declare express app
const app = express();
app.use(bodyParser.default.json());
const port = process.env.PORT || 3000;


// declare api / define urls
app.get('/', (req, res, next) => {
   res.json({message: 'Welcome'});
})

import * as models from './models/index.js'

async function hashStr(str) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(str, salt);
}

app.post('/signup', async (req, res) => {
    const { email } = req.body;
    console.log('hi', req);
    const modelsObj = await models.default;
    try {
        const emailExists = await modelsObj.User.findOne({attributes: ['id'], where: {email}});
        if (emailExists) {
            res.status(400);
            return res.json({message: 'email exists', 'sys_message' : 'email_exists'});
        }
        const result = await modelsObj.User.create({
            email: await email
        });
        res.json({message: "Signup success"});
    } catch (e) {
        res.status(403);
        res.json({message: e.message});
    }
});

// stand up express app
app.listen(port, function(err){
   if (err) console.log("Error in server setup")
   console.log("Server listening on Port", port);
})
