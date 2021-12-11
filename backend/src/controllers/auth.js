const {user} = require('../../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const joi = require('joi');

exports.register = async (req, res) => {
    const schema = joi.object({
        fullName: joi.string().min(3).required(),
        email: joi.string().email().min(5).required(),
        phone: joi.string().min(9).required(),
        password: joi.string().min(6).required(),
        address: joi.string().min(6).required(),
        gender: joi.string().min(4).required(),
        photo: joi.string().min(3).required()
    })
    const {error} = schema.validate(req.body)
    if(error){
        return res.status(400).send({
            status: "failed!",
            error: {
                message: error.details[0].message
            }
        })
    }
    try {
        const userExist = await user.findOne({
            where: {
                email: req.body.email
            }
        })
        if(userExist){
            return res.status(400).send({
                status: "failed",
                message: "user already exist"
            })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt) //============== hashing password ==========//
        const newUser = await user.create({
            fullName: req.body.fullName,
            email: req.body.email,
            password : hashedPassword,
            phone : req.body.phone,
            address : req.body.address,
            gender : req.body.gender,
            photo : req.body.photo,
            status: "user"
        })
        const token = jwt.sign({id: newUser.id, status: newUser.status}, process.env.TOKEN_KEY)
        res.send({
            status: 'success',
            message: "add user success",
            data: {
                fullName: newUser.fullName,
                email: newUser.email,
                token
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: "failed",
            message: "server error"
        })
    }
}

exports.login = async (req, res) => {
    const schema = joi.object({
        email: joi.string().email().min(5).required(),
        password: joi.string().min(6).required()
    })
    const {error} = schema.validate(req.body)
    if(error){
        return res.status(400).send({
            status: "failed",
            error: {
                message: error.details[0].message
            }
        })
    }
    try {
        const userExist = await user.findOne({
            where: {
                email: req.body.email
            }
        })
        if(!userExist){
            res.status(404).send({
                status: "failed",
                message: "user not found"
            })
        }
        const isValid = await bcrypt.compare(req.body.password, userExist.password);
        if(!isValid){
            return res.status(400).send({
                status: "failed",
                message: 'credential is invalid'
            })
        }
        const token = jwt.sign({id: userExist.id, status: userExist.status}, process.env.TOKEN_KEY)
        res.status(200).send({
            status: "success",
            data: {
                name: userExist.name,
                email: userExist.email,
                token
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: "failed",
            message: "server error"
        })
    }
}
