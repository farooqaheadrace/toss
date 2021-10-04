const { MongoClient, ObjectId } = require('mongodb');
const { produce } = require('immer');
const _ = require('lodash');
const Utils = require('./utils')
const Constants = require('../constants');
require('dotenv').config({ path: __dirname + '/config/.env' })

const HelpersRepo = () => {
    const getStatusList = () => {
        return new Promise(async (resolve, reject) => {
            const client = new MongoClient(process.env.DB_URL);
            try {
                await client.connect();
                const db = client.db(process.env.DB_NAME);
                let candidateStatusList = await db.collection(Constants.COLLECTION_CANDIDATESTATUS)
                    .find({}).toArray();

                resolve(candidateStatusList);

            } catch (error) {
                reject(error);
            }
            finally {
                client.close();
            }
        });
    }

    const getStatus = (statusCode) => {
        return new Promise(async (resolve, reject) => {
            const client = new MongoClient(process.env.DB_URL);
            try {
                await client.connect();
                const db = client.db(process.env.DB_NAME);
                let candidateStatus = await db.collection(Constants.COLLECTION_CANDIDATESTATUS)
                    .findOne({ Code: statusCode });

                resolve(candidateStatus);

            } catch (error) {
                reject(error);
            }
            finally {
                client.close();
            }
        });
    }

    const getSkills = () => {
        return new Promise(async (resolve, reject) => {
            const client = new MongoClient(process.env.DB_URL);
            try {
                await client.connect();
                const db = client.db(process.env.DB_NAME);

                let skills = await db.collection(Constants.COLLECTION_CANDIDATES)
                    .aggregate([
                        { "$unwind": "$Skills" },
                        { "$group": { "_id": null, Skills: { $push: "$Skills" } } },
                        { "$project": { Skills: 1, _id: 0 } }
                    ]).toArray();

                resolve(_.uniq(skills[0]["Skills"]));
            } catch (error) {
                reject(error);
            }
            finally {
                client.close();
            }
        });
    }

    const getCertifications = () => {
        return new Promise(async (resolve, reject) => {
            const client = new MongoClient(process.env.DB_URL);
            try {
                await client.connect();
                const db = client.db(process.env.DB_NAME);

                let certifications = await db.collection(Constants.COLLECTION_CANDIDATES)
                    .aggregate([
                        { "$unwind": "$Certifications" },
                        { "$group": { "_id": null, Certifications: { $push: "$Certifications" } } },
                        { "$project": { Certifications: 1, _id: 0 } }
                    ]).toArray();

                resolve(_.uniq(certifications[0]["Certifications"]));
            } catch (error) {
                reject(error);
            }
            finally {
                client.close();
            }
        });
    }

    const getDesignations = () => {
        return new Promise(async (resolve, reject) => {
            const client = new MongoClient(process.env.DB_URL);
            try {
                await client.connect();
                const db = client.db(process.env.DB_NAME);

                let designations = await db.collection(Constants.COLLECTION_CANDIDATES)
                    .aggregate([
                        { "$unwind": "$CurrentDesignation" },
                        { "$group": { "_id": null, Designations: { $push: "$CurrentDesignation" } } },
                        { "$project": { Designations: 1, _id: 0 } }
                    ]).toArray();

                resolve(_.uniq(designations[0]["Designations"]));
            } catch (error) {
                reject(error);
            }
            finally {
                client.close();
            }
        });
    }

    const getReferences = () => {
        return new Promise(async (resolve, reject) => {
            const client = new MongoClient(process.env.DB_URL);
            try {
                await client.connect();
                const db = client.db(process.env.DB_NAME);

                let references = await db.collection(Constants.COLLECTION_CANDIDATES)
                    .aggregate([
                        { "$unwind": "$References" },
                        { "$group": { "_id": null, References: { $push: "$References" } } },
                        { "$project": { References: 1, _id: 0 } }
                    ]).toArray();

                resolve(_.uniq(references[0]["References"]));
            } catch (error) {
                reject(error);
            }
            finally {
                client.close();
            }
        });
    }

    return { getStatusList, getStatus, getSkills, getCertifications, getDesignations, getReferences }
}
module.exports = HelpersRepo();