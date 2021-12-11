const {user} = require('../../models');

exports.getUsers = async (req, res) => {
    try {
        const data = await user.findAll({
            attributes: {
                exclude: ["createdAt", "updatedAt", "password", "id"]
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

exports.getUser = async (req, res) => {
    try {
        const {id} = req.params;
        const data = await user.findOne({
            where: {
                id
            },
            attributes: {
                exclude: ["createdAt", "updatedAt", "password", "id"]
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

exports.addUser = async (req, res) => {
    try {
        const data = req.body;
        await user.create(data);
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

exports.updateUser = async (req, res) => {
    try {
        const {id} = req.params;
        const photo = req.files.photo[0].filename;
        await user.update({photo}, {
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

exports.deleteUser = async (req, res) => {
    try {
        const {id} = req.params;
        await user.destroy({
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
