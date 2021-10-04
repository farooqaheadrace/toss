const HelpersRepo = require('../repos/helpersRepo')
const Constants = require('../constants')

module.exports = function (router) {
    router.get(Constants.ROUTE_GET_HISTORYSTATUS, async function (req, res) {
        try {
            const items = await HelpersRepo.getStatusList();
            res.status(200).json(items);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    });

    router.get(Constants.ROUTE_GET_HISTORYSTATUSBYCODE, async function (req, res) {
        try {
            const items = await HelpersRepo.getStatus(req.params.statusCode);
            res.status(200).json(items);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    });

    router.get(Constants.ROUTE_GET_SKILLS, async function (req, res) {
        try {
            const items = await HelpersRepo.getSkills();
            res.status(200).json(items);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    });

    router.get(Constants.ROUTE_GET_CERTIFICATIONS, async function (req, res) {
        try {
            const items = await HelpersRepo.getCertifications();
            res.status(200).json(items);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    });

    router.get(Constants.ROUTE_GET_DESIGNATIONS, async function (req, res) {
        try {
            const items = await HelpersRepo.getDesignations();
            res.status(200).json(items);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    });

    router.get(Constants.ROUTE_GET_REFERENCES, async function (req, res) {
        try {
            const items = await HelpersRepo.getReferences();
            res.status(200).json(items);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    });
}