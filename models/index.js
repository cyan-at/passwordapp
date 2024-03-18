'use strict';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Sequelize from 'sequelize';
import { readdirSync } from "fs";
import { basename, dirname } from "path";

const models = {};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import 'dotenv/config'
const env = process.env.NODE_ENV || 'production';
import configuration from '../config/config.js'
const config = configuration[env]
const sequelize = new Sequelize(config.database, config.username, config.password, config);
const db = {};

export default (async () => {
  const files = readdirSync(__dirname)
    .filter(
      (file) => file.indexOf('.') !== 0
      && file !== basename(__filename)
      && file.slice(-3) === '.js',
    );

  for await (const file of files) {
    const model = await import(`./${file}`);
    const namedModel = model.default(sequelize, Sequelize.DataTypes);
    db[namedModel.name] = namedModel;
  }

  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;
	
  return db;
})();