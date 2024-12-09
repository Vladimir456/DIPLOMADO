import { DataTypes } from 'sequelize';
import sequelize  from '../database/database.js';
import { Task } from './tasks.js';
import { Status } from '../constants/index.js';
import logger from '../logs/logger.js';
import { encriptar } from '../common/bycript.js';

export const User = sequelize.define('users',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
     type: DataTypes.STRING,
     allowNull: false,
     unique: true,

     vaidate: {
        notNull:{
            msg: 'Username cannot be null',
        },
     },
},
password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
        notNull:{
        msg: 'Password cannot be null',
    },
 },
},
    status: {
        type: DataTypes.STRING,
        defaultValue: 'active',

        vaidate:{
            isIn: {
            args:[[Status.ACTIVE, Status.INACTIVE]],
            msg: 'Status must be either active or inactive',
            }
        }
    },
});

User.hasMany(Task);
Task.belongsTo(User);

User.beforeCreate(async (user) => {
    try {
        user.password = await encriptar (user.password);
    } catch (error) {
        logger.error(error.message);
        throw new Error('Error al comparar la contraseña');
    }
})

User.beforeUpdate(async (user) => {
    try {
        user.password = await encriptar (user.password);
    } catch (error) {
        logger.error(error.message);
        throw new Error('Error al comparar la contraseña');
    }
})