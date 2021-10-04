const { MongoClient, ObjectId } = require('mongodb');
const { produce } = require('immer');
const _ = require('lodash');
const Utils = require('./utils')
const Constants = require('../constants');
require('dotenv').config({ path: __dirname + '/config/.env' })

function CandidateRepo() {
    function updateCandidateStatus(candidateStatus) {
        return new Promise(async (resolve, reject) => {
            try {
                let client = new MongoClient(process.env.DB_URL);
                await client.connect();
                let db = client.db(process.env.DB_NAME);

                let candidateId = ObjectId(candidateStatus.CandidateId);
                let candidateHistoryBody =
                    Utils.getCandidateHistoryBody(candidateId,
                        candidateStatus.Status,
                        ObjectId(candidateStatus.UserId), candidateStatus.CommentText,
                        candidateStatus.DateSelected);

                let insertAck = await db.collection(Constants.COLLECTION_CANDIDATEHISTORY).insertOne(candidateHistoryBody);
                let addedCandidateHistory = await Utils.getCandidateHistory(candidateId, db);

                await db.collection(Constants.COLLECTION_CANDIDATES).updateOne({ _id: candidateId },
                    {
                        $set: {
                            Status: candidateStatus.Status,
                            UserId: ObjectId(candidateStatus.UserId)
                        }
                    },
                    {
                        upsert: false
                    }
                );

                resolve(addedCandidateHistory);

            } catch (error) {
                reject(error);
            }
            finally {
                client.close();
            }
        });
    }

    function insertCandidate(candidateBody) {
        return new Promise(async (resolve, reject) => {
            let client = new MongoClient(process.env.DB_URL);
            try {

                await client.connect();
                let db = client.db(process.env.DB_NAME);

                let initialStatus = "InitialDiscussionDone";

                let emailCheckQuery = { EmailAddress: candidateBody.EmailAddress };
                let emailCount = await db.collection(Constants.COLLECTION_CANDIDATES).find(emailCheckQuery).count();
                if (emailCount) {
                    reject(Constants.ERROR_EMAILADDRESSMUSTBEUNIQUE);
                }

                const candidateBodyWithMetaData = Object.assign(
                    {},
                    candidateBody,
                    {
                        LastModified: new Date(),
                        UserId: ObjectId(candidateBody.UserId),
                        Status: initialStatus
                    });

                let responseCandidate = await db.collection(Constants.COLLECTION_CANDIDATES).insertOne(candidateBodyWithMetaData);
                let addedCandidate = await db.collection(Constants.COLLECTION_CANDIDATES)
                    .aggregate([{
                        $match: {
                            _id: responseCandidate.insertedId
                        }
                    },
                    {
                        $lookup: {
                            from: Constants.COLLECTION_USERS,
                            localField: "UserId",
                            foreignField: "_id",
                            as: "userDetails"
                        }
                    },
                    {
                        $lookup: {
                            from: Constants.COLLECTION_CANDIDATESTATUS,
                            localField: "Status",
                            foreignField: "Code",
                            as: "statusDetails"
                        }
                    },
                    {
                        $project: {
                            _id: 1,
                            LastModified: 1,
                            Status: 1,
                            FirstName: 1,
                            LastName: 1,
                            EmailAddress: 1,
                            ContactNumbers: 1,
                            Gender: 1,
                            OverallExperience: 1,
                            ResumeFile: 1,
                            CurrentDesignation: 1,
                            References: 1,
                            Certifications: 1,
                            Skills: 1,
                            InitialDiscussionDate: 1,
                            UserId: 1,
                            Username: { "$arrayElemAt": ["$userDetails.Name", 0] },
                            Description: { "$arrayElemAt": ["$statusDetails.Description", 0] }
                        }
                    }]).toArray();

                let candidateHistoryBody =
                    Utils.getCandidateHistoryBody(addedCandidate[0]._id,
                        initialStatus,
                        ObjectId(candidateBody.UserId), '', addedCandidate[0].InitialDiscussionDate);

                await db.collection(Constants.COLLECTION_CANDIDATEHISTORY).insertOne(candidateHistoryBody);

                let addedCandidateHistory = await Utils.getCandidateHistory(addedCandidate[0]._id, db);
                let candidateObject = produce(addedCandidate[0], draft => { draft.CandidateHistory = addedCandidateHistory });
                resolve(candidateObject);
            } catch (error) {
                reject(error);
            }
            finally {
                client.close();
            }
        })
    }

    function getCandidates() {
        return new Promise(async (resolve, reject) => {
            const client = new MongoClient(process.env.DB_URL);
            try {
                await client.connect();
                const db = client.db(process.env.DB_NAME);

                let candidatesList = await db.collection(Constants.COLLECTION_CANDIDATES)
                    .aggregate([
                        {
                            $lookup: {
                                from: Constants.COLLECTION_USERS,
                                localField: "UserId",
                                foreignField: "_id",
                                as: "userDetails"
                            }
                        },
                        {
                            $lookup: {
                                from: Constants.COLLECTION_CANDIDATESTATUS,
                                localField: "Status",
                                foreignField: "Code",
                                as: "statusDetails"
                            }
                        },
                        {
                            $project: {
                                _id: 1,
                                LastModified: 1,
                                Status: 1,
                                FirstName: 1,
                                LastName: 1,
                                EmailAddress: 1,
                                ContactNumbers: 1,
                                Gender: 1,
                                OverallExperience: 1,
                                ResumeFile: 1,
                                CurrentDesignation: 1,
                                References: 1,
                                Certifications: 1,
                                Skills: 1,
                                InitialDiscussionDate: 1,
                                UserId: 1,
                                Username: { "$arrayElemAt": ["$userDetails.Name", 0] },
                                Description: { "$arrayElemAt": ["$statusDetails.Description", 0] },
                                History: []
                            }
                        }]).toArray();

                resolve(candidatesList);

            } catch (error) {
                reject(error);
            }
            finally {
                client.close();
            }
        });
    }

    function getCandidate(candidateId) {
        return new Promise(async (resolve, reject) => {
            const client = new MongoClient(process.env.DB_URL);
            try {
                await client.connect();
                const db = client.db(process.env.DB_NAME);

                let candidatesList = await db.collection(Constants.COLLECTION_CANDIDATES)
                    .aggregate([
                        {
                            $match: {
                                _id: ObjectId(candidateId)
                            }
                        },
                        {
                            $lookup: {
                                from: Constants.COLLECTION_USERS,
                                localField: "UserId",
                                foreignField: "_id",
                                as: "userDetails"
                            }
                        },
                        {
                            $lookup: {
                                from: Constants.COLLECTION_CANDIDATESTATUS,
                                localField: "Status",
                                foreignField: "Code",
                                as: "statusDetails"
                            }
                        },
                        {
                            $project: {
                                _id: 1,
                                LastModified: 1,
                                Status: 1,
                                FirstName: 1,
                                LastName: 1,
                                EmailAddress: 1,
                                ContactNumbers: 1,
                                Gender: 1,
                                OverallExperience: 1,
                                ResumeFile: 1,
                                CurrentDesignation: 1,
                                References: 1,
                                Certifications: 1,
                                Skills: 1,
                                InitialDiscussionDate: 1,
                                UserId: 1,
                                Username: { "$arrayElemAt": ["$userDetails.Name", 0] },
                                Description: { "$arrayElemAt": ["$statusDetails.Description", 0] },
                                History: []
                            }
                        }]).toArray();

                if (!candidatesList || candidatesList.length == 0) {
                    reject("No candidates with the given Id");
                }
                resolve(candidatesList[0]);

            } catch (error) {
                reject(error);
            }
            finally {
                client.close();
            }
        });
    }

    function getCandidateHistory(candidateId) {
        return new Promise(async (resolve, reject) => {
            const client = new MongoClient(process.env.DB_URL);
            try {
                await client.connect();
                const db = client.db(process.env.DB_NAME);
                let candidateHistory = await Utils.getCandidateHistory(ObjectId(candidateId), db);
                resolve(candidateHistory);
            } catch (error) {
                reject(error);
            }
        })
    }

    return { insertCandidate, getCandidates, updateCandidateStatus, getCandidate, getCandidateHistory }
}

module.exports = CandidateRepo();