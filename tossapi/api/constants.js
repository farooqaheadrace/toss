const Constants = {
    COLLECTION_CANDIDATES: 'candidates',
    COLLECTION_USERS: 'users',
    COLLECTION_CANDIDATEHISTORY: 'candidatesHistory',
    COLLECTION_CANDIDATESTATUS: 'candidateStatus',

    ERROR_EMAILADDRESSMUSTBEUNIQUE: 'Email address must be unique',
    ERROR_CONNECTDATABASE: 'Database not connected',
    ERROR_USERDETAILSNOTFOUND: 'User details not found',
    ERROR_ITEMDETAILSNOTFOUND: 'Item details not found',

    ROUTE_POST_ADDCANDIDATE: '/candidates',
    ROUTE_GET_CANDIDATES: '/candidates',
    ROUTE_GET_CANDIDATE: '/candidates/:candidateId',
    ROUTE_POST_CANDIDATEHISTORY: '/candidatehistory',
    ROUTE_GET_CANDIDATEHISTORY: '/candidatehistory/:candidateId',

    ROUTE_GET_HISTORYSTATUS: '/historystatus',
    ROUTE_GET_HISTORYSTATUSBYCODE: '/historystatus/:statusCode',
    ROUTE_GET_SKILLS: '/skills',
    ROUTE_GET_CERTIFICATIONS: '/certifications',
    ROUTE_GET_DESIGNATIONS: '/designations',
    ROUTE_GET_REFERENCES: '/references',

    ROUTE_POST_ADDUSER: '/users',
    ROUTE_POST_EDITUSER: '/users/:userId',
    ROUTE_GET_USERS: '/users',
    ROUTE_POST_LOGINUSER: '/login'
}
module.exports = Constants;