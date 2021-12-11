const {trip, country} = require('../../models');

exports.getTrips = async (req, res) => {
    try {
        const data = await trip.findAll({
            include: {
                model: country,
                as: "country",
                attributes: {
                    exclude: ["createdAt", "updatedAt","id"]
                }
            },
            attributes: {
                exclude: ["createdAt", "updatedAt", "countryId"]
            }
        })

        let newData = [];
        for (let i = 0; i < data.length; i++) {
            let dataParser = JSON.parse(data[i].image)
            let countryName = data[i].dataValues.country.dataValues.name
            dataParser = dataParser.map(elm => `http://localhost:5000/uploads/${elm}`)
            const dataCont = {
                ...data[i].dataValues,
                image : dataParser,
                country : countryName
            }
            JSON.stringify(dataCont)
            newData.push(dataCont);
        }

        res.send({
            status: "success",
            message: "get data success",
            data : newData
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: "failed",
            message: "server error"
        })
    }
}

exports.getTrip = async (req, res) => {
    try {
        const {id} = req.params;
        const data = await trip.findOne({
            where: {
                id
            },
            include: {
                model: country,
                as: 'country',
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                }
            },
            attributes: {
                exclude: ["createdAt", "updatedAt", "countryId"]
            }
        })
        let dataParser = JSON.parse(data.image)
        let countryName = data.dataValues.country.dataValues.name
        dataParser = dataParser.map(elm => `http://localhost:5000/uploads/${elm}`)
        const newData = {
            ...data.dataValues,
            image : dataParser,
            country : countryName
        }
        JSON.stringify(newData)

        res.send({
            status: "success",
            message: "get data success",
            data: newData
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: "failed",
            message: "server error"
        })
    }
}

exports.addTrip = async (req, res) => {
    try {
        const data = req.body;
        const dataImage = (req.files);
        const imageArray = dataImage.image.map(elm => elm.filename);
        const image = JSON.stringify(imageArray);

        await trip.create({...data, image});
        console.log(`============ ${data.soldQty} =============`)
        res.send({
            status: "success",
            message: "add data success"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: "failed",
            message: "server error"
        })
    }
}

exports.updateTrip = async (req, res) => {
    try {
        const {id} = req.params;
        const data = req.body;
        await trip.update({...data}, {
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

exports.deleteTrip = async (req, res) => {
    try {
        const {id} = req.params;
        await trip.destroy({
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