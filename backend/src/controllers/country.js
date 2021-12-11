const {country} = require('../../models');

exports.getCountries = async (req, res) => {
    try {
        const data = await country.findAll({
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            }
        })
        res.send({
            status: "success",
            message: "get data success",
            data
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: "failed",
            message: "server error"
        })
    }
}

exports.getCountry = async (req, res) => {
    try {
        const {id} = req.params;
        const data = await country.findOne({
            where: {
                id
            },
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            }
        })
        res.send({
            status: "success",
            message: "get data success",
            data
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: "failed",
            message: "server error"
        })
    }
}

exports.addCountry = async (req, res) => {
    try {
        const data = req.body;
        await country.create(data);
        res.send({
            status: "success",
            message: "add data success"
        })
    } catch (error) {
        res.status(500).send({
            status: "failed",
            message: "server error"
        })
    }
}

exports.deleteCountry = async (req, res) => {
    try {
        const {id} = req.params;
        await country.destroy({
            where: {
                id
            }
        })
        res.send({
            status : "success",
            message : "delete data success"
        })
    } catch (error) {
        console.log(error);
        res.send({
            status: "failed",
            message: "server error"
        })
    }
}