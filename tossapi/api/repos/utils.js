const { MongoClient, ObjectId } = require('mongodb');
const Constants = require('../constants');
const _ = require('lodash');
const { produce } = require('immer');

const Utils = () => {
    const getCandidateHistoryBody =
        (candidateId, statusCode, userId, comments, dateStamp) => {
            return {
                "CandidateId": candidateId,
                "Status": statusCode,
                "UserId": userId,
                "Date": dateStamp,
                "Comments": comments,
                "LastModified": new Date()
            }
        }
    const getItem = (itemKey, itemValue, itemCollectionName, db) => {
        return new Promise(async (resolve, reject) => {
            let itemQuery = { [itemKey]: itemValue };
            let itemDetails = await db.collection(itemCollectionName).findOne(itemQuery);
            if (!itemDetails) {
                reject(Constants.ERROR_ITEMDETAILSNOTFOUND);
            }
            resolve(itemDetails)
        });
    }
    const getItems = (itemKey, itemValue, itemCollectionName, db) => {
        return new Promise(async (resolve, reject) => {
            let itemQuery = { [itemKey]: itemValue };
            let itemDetails = await db.collection(itemCollectionName).find(itemQuery).toArray();
            if (!itemDetails) {
                reject(Constants.ERROR_ITEMDETAILSNOTFOUND);
            }
            resolve(itemDetails)
        });
    }

    const getCandidateHistory = (candidateId, db) => {
        return new Promise(async (resolve, reject) => {
            let itemDetails = await db.collection(Constants.COLLECTION_CANDIDATEHISTORY)
                .aggregate([{
                    $match: {
                        CandidateId: candidateId
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
                        CandidateId: 1,
                        Status: 1,
                        UserId: 1,
                        Date: 1,
                        Comments: 1,
                        LastModified: 1,
                        Name: { "$arrayElemAt": ["$userDetails.Name", 0] },
                        Description: { "$arrayElemAt": ["$statusDetails.Description", 0] }
                    }
                }]).toArray();

            if (!itemDetails) {
                reject(Constants.ERROR_ITEMDETAILSNOTFOUND);
            }
            resolve(itemDetails)
        });
    }

    const addLastModifiedColumn = (objectBody) => {
        let clonedObjectBody = produce(objectBody, draft => { draft.LastModified = new Date() });
        return clonedObjectBody;
    }

    return { getCandidateHistoryBody, getItem, getItems, addLastModifiedColumn, getCandidateHistory }
}
module.exports = Utils();