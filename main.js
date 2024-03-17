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

sequelize.authenticate().then(() => console.log('connected'));