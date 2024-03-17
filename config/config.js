import 'dotenv/config'

export default {
  'production' : {
    'host' : process.env.DB_HOST,
    'port' : process.env.DB_PORT,
    'username' : process.env.DB_USERNAME,
    'password' : process.env.DB_PASSWORD,
    'dialect' : 'postgres',
    'database' : process.env.DB_NAME,
    'ssl' : true,
    'dialectOptions' : {
      'ssl' : {
        'require' : true,
        'rejectUnauthorized' : true,
        'minVersion' : 'TLSv1.2'
      }
    }
  }
}
