const CandidateRepo = require('../repos/candidateRepo')
const Constants = require('../constants')

module.exports = function (router) {

    router.post(Constants.ROUTE_POST_ADDCANDIDATE, async function (req, res) {
        try {
            let addedItem = await CandidateRepo.insertCandidate(req.body);
            res.status(200).json(addedItem);
        } catch (error) {
            res.status(500).json(error);
        }
    });

    router.post(Constants.ROUTE_POST_CANDIDATEHISTORY, async function (req, res) {
        try {
            let addedItem = await CandidateRepo.updateCandidateStatus(req.body);
            res.status(200).json(addedItem);
        } catch (error) {
            console.log('here', error);
            res.status(500).json(error);
        }
    });

    router.get(Constants.ROUTE_GET_CANDIDATES, async function (req, res) {
        try {
            const items = await CandidateRepo.getCandidates();
            res.status(200).json(items);
        } catch (error) {
            return res.status(500).json(error);
        }
    });

    router.get(Constants.ROUTE_GET_CANDIDATEHISTORY, async function (req, res) {
        try {
            const items = await CandidateRepo.getCandidateHistory(req.params.candidateId);
            res.status(200).json(items);
        } catch (error) {
            return res.status(500).json(error);
        }
    });

    router.get(Constants.ROUTE_GET_CANDIDATE, async function (req, res) {
        try {
            const items = await CandidateRepo.getCandidate(req.params.candidateId);
            res.status(200).json(items);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    });
}