const {transaction, user, trip, country} = require('../../models');

exports.getTransactions = async (req, res) => {
    try {
        const data = await transaction.findAll({
            include: [
                {
                    model: user,
                    as: "user",
                    attributes: {
                        exclude: ["createdAt", "updatedAt", "password"]
                    }
                },
                {
                    model: trip,
                    as: "trip",
                    include: {
                        model: country,
                        as: "country",
                        attributes : {
                            exclude: ["createdAt", "updatedAt"]
                        }
                    },
                    attributes: {
                        exclude: ["cretedAt", "updatedAt"]
                    }
                }
            ],
            attributes: {
                exclude: ["createdAt", "updatedAt", "userId"]
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

exports.getTransaction = async (req, res) => {
    try {
        const {id} = req.params;
        const data = await transaction.findOne({
            where: {
                id
            },
            include: [
                {
                    model: user,
                    as: "user",
                    attributes: {
                        exclude: ["createdAt", "updatedAt", "password"]
                    }
                },
                {
                    model: trip,
                    as: "trip",
                    include: {
                        model: country,
                        as: "country",
                        attributes : {
                            exclude: ["createdAt", "updatedAt"]
                        }
                    },
                    attributes: {
                        exclude: ["cretedAt", "updatedAt"]
                    }
                }
            ],
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

exports.getLastTransaction = async (req, res) => {
    try {
        const {id} = req.params;
        const data = await transaction.findOne({
            order: [ [ 'createdAt', 'DESC' ]],
            include: [
                {
                    model: user,
                    as: "user",
                    attributes: {
                        exclude: ["createdAt", "updatedAt", "password"]
                    }
                },
                {
                    model: trip,
                    as: "trip",
                    include: {
                        model: country,
                        as: "country",
                        attributes : {
                            exclude: ["createdAt", "updatedAt"]
                        }
                    },
                    attributes: {
                        exclude: ["cretedAt", "updatedAt"]
                    }
                }
            ],
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

exports.addTransaction = async (req, res) => {
    try {
        const {id} = req.user;
        const data = req.body;

        await transaction.create({...data, userId: id});
        res.send({
            status: "success",
            message: "add data success"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: "failed",
            message: "server error"
        })
    }
}

exports.updateTransaction = async (req, res) => {
    try {
        const {id} = req.params;
        const data = req.body;
        const attachment = (req.files.attachment[0].filename);
        await transaction.update({...data, attachment}, {
            where:{
                id
            }
        })
        res.send({
            status: "success",
            message: "update data success"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: "failed",
            message: "server error"
        })
    }
}

exports.adminTransaction = async (req, res) => {
    try {
        const {id} = req.params;
        const data = req.body;
        await transaction.update({...data}, {
            where:{
                id
            }
        })
        res.send({
            status: "success",
            message: "update data success"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: "failed",
            message: "server error"
        })
    }
}

exports.deleteTransaction = async (req, res) => {
    try {
        const {id} = req.params;
        await transaction.destroy({
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