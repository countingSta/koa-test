import Db from '../db/mysql.js' // import mysql

//import the table schema and instantiate Account
const Account = Db.import(function(sequelize, DataTypes) {
    return sequelize.define("user", {
        id: {
            type: DataTypes.INTEGER(11), // field type
            allowNull: false, 
            primaryKey: true, 
            autoIncrement: true 
        },
        user_name: {
            type: DataTypes.CHAR(50),
            allowNull: false
        },
        password: {
            type: DataTypes.CHAR(128),
            allowNull: false
        },
        phone:{
            type: DataTypes.CHAR(128),
            allowNull: false
        },
        address:{
            type: DataTypes.CHAR(256),
            allowNull: false
        }
    }, {
        tableName: 'user'
    })
}) 



const getUserById = async function(id) { 
    const userInfo = await Account.findOne({ 
        where: {
            id: id
        }
    })

    return userInfo;
}

const getUserByName = async function(name) {
    const userInfo = await Account.findOne({
        where: {
            user_name: name
        }
    })

    return userInfo;
}

const createUser = async function(userInfo){
    if(!user) {
        return {};
    }
    return await Account.create(userInfo);
}


export default {
    getUserById, 
    getUserByName,
    createUser
}

