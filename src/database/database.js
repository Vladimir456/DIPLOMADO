import   {Sequelize} from 'sequelize';
import 'dotenv/config'

const sequelize = new Sequelize(
    process.env.DB_DATABASE,//db name
    process.env.DB_USER,// username
    process.env.DB_PASSWORD,//pass
{
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT, // or 'mysql' or 'postgres'
    logging: console.log, // set to true for logging DB queries

    //PARAQUE FUNCIONE EN RENDER y PARA QUE FUNCIONE EN MODO LOCAL COMENTAR TODO EL DIALECT
    dialectOptions: {
        ssl:{
            require: true,
            rejectUnauthorized: false,
        }
    }
}
);

export default sequelize;
