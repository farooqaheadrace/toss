const { MongoClient, ObjectId } = require('mongodb');
const { produce } = require('immer');
const _ = require('lodash');
const Constants = require('../constants');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: __dirname + '/config/.env' })

const UsersRepo = () => {

    const addUser = (userBody) => {
        return new Promise(async (resolve, reject) => {
            const client = new MongoClient(process.env.DB_URL);
            try {
                await client.connect();
                const db = client.db(process.env.DB_NAME);

                let existingUser = await db.collection(Constants.COLLECTION_USERS).find({ EmailAddress: userBody.EmailAddress }).count();
                if (existingUser > 0) reject("Email address already in use");

                let salt = await bcrypt.genSalt(10);
                let hashedPassword = await bcrypt.hash(userBody.Password, salt);

                let userBodyWithHashedPassword = Object.assign({}, userBody, { Password: hashedPassword });

                let responseUser = await db.collection(Constants.COLLECTION_USERS).insertOne(userBodyWithHashedPassword);
                let addedUser = await db.collection(Constants.COLLECTION_USERS).findOne({ _id: responseUser.insertedId });
                resolve(addedUser);

            } catch (error) {
                console.log(error);
                reject(error);
            }
            finally {
                client.close();
            }
        });
    }

    const editUser = (userId, userBody) => {
        return new Promise(async (resolve, reject) => {
            const client = new MongoClient(process.env.DB_URL);
            try {
                await client.connect();
                const db = client.db(process.env.DB_NAME);

                let existingUser = await db.collection(Constants.COLLECTION_USERS).find(
                    {
                        EmailAddress: { "$eq": userBody.EmailAddress },
                        _id: { "$ne": ObjectId(userId) }
                    }).count();


                if (existingUser > 0) reject("Email address already in use");

                let salt = await bcrypt.genSalt(10);
                let hashedPassword = await bcrypt.hash(userBody.Password, salt);

                let userBodyWithHashedPassword = Object.assign({}, userBody, { Password: hashedPassword });
                delete userBodyWithHashedPassword._id;

                let responseUser = await db.collection(Constants.COLLECTION_USERS)
                    .findOneAndUpdate(
                        { _id: ObjectId(userId) },
                        {
                            $set: userBodyWithHashedPassword
                        },
                        { upsert: false }
                    );
                console.log('responseUser', responseUser)

                let editedUser = await db.collection(Constants.COLLECTION_USERS).findOne({ _id: ObjectId(userId) });
                resolve(editedUser);

            } catch (error) {
                reject(error);
            }
            finally {
                client.close();
            }
        });
    }

    const getUsers = () => {
        return new Promise(async (resolve, reject) => {
            const client = new MongoClient(process.env.DB_URL);
            try {
                await client.connect();
                const db = client.db(process.env.DB_NAME);
                let usersList = await db.collection(Constants.COLLECTION_USERS)
                    .aggregate([
                        {
                            $project: {
                                _id: 1,
                                EmailAddress: 1,
                                Name: 1
                            }
                        }
                    ]).toArray();

                resolve(usersList);

            } catch (error) {
                reject(error);
            }
            finally {
                client.close();
            }
        });
    }

    const loginUser = (loginBody) => {
        return new Promise(async (resolve, reject) => {
            console.log('process.env.DB_URL', process.env.DB_URL)
            const client = new MongoClient(process.env.DB_URL);
            try {
                await client.connect();
                const db = client.db(process.env.DB_NAME);

                let userItem = await db.collection(Constants.COLLECTION_USERS)
                    .findOne({ "EmailAddress": loginBody.EmailAddress });
                if (!userItem) reject("Invalid Email or Password");

                var compared = await bcrypt.compare(loginBody.Password, userItem.Password);
                if (!compared) reject("Invalid Email or Password");


                resolve({ UserId: userItem._id });

            } catch (error) {
                console.log(error);
                reject(error);
            }
            finally {
                client.close();
            }
        });
    }
    return { addUser, loginUser, getUsers, editUser }
}
module.exports = UsersRepo();