const { user, chat } = require("../../models");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

const connectedUser = {};

const socketIo = (io) => {
 
    io.use((socket, next) => {
        if (socket.handshake.auth && socket.handshake.auth.token) {
        next();
        } else {
        next(new Error("Not Authorized"));
        }
    });

    io.on("connection", (socket) => {
      console.log("client connected: ", socket.id);

      const userId = socket.handshake.query.id;
      connectedUser[userId] = socket.id;

      socket.on("load admin contact", async() => {
          try {
            const adminContact = await user.findOne({
                where: {
                  status: "admin",
                },
                attributes: {
                  exclude: ["createdAt", "updatedAt", "password"],
                },
              });
              console.log(adminContact)
              socket.emit("admin contact", adminContact);
          } catch (error) {
              console.log(error)
          }
      })

      socket.on("load customer contacts", async () => {
        try {
          const customerContact = await user.findAll({
            include: [
              {
                model: chat,
                as: "recipientMessage",
                attributes: {
                  exclude: ["createdAt", "updatedAt", "idRecipient", "idSender"],
                },
              },
              {
                model: chat,
                as: "senderMessage",
                attributes: {
                  exclude: ["createdAt", "updatedAt", "idRecipient", "idSender"],
                },
              },
            ],
            attributes: {
              exclude: ["createdAt", "updatedAt", "password"],
            },
          });
          socket.emit("customer contact", customerContact);
        } catch (err) {
          console.log(err);
        }
      });
  
      //message =====================
      socket.on("load messages", async (payload) => {
        try {
          const token = socket.handshake.auth.token;
          const tokenKey = process.env.TOKEN_KEY;
          const verified = jwt.verify(token, tokenKey);
  
          const idRecipient = payload;
          const idSender = verified.id;
          const data = await chat.findAll({
            where: {
              idSender: {
                [Op.or]: [idRecipient, idSender],
              },
              idRecipient: {
                [Op.or]: [idRecipient, idSender],
              },
            },
            include: [
              {
                model: user,
                as: "recipient",
                attributes: {
                  exclude: ["createdAt", "updatedAt", "password"],
                },
              },
              {
                model: user,
                as: "sender",
                attributes: {
                  exclude: ["createdAt", "updatedAt", "password"],
                },
              },
            ],
            order: [["createdAt", "ASC"]],
            attributes: {
              exclude: ["createdAt", "updatedAt", "idRecipient", "idSender"],
            },
          });
  
          socket.emit("messages", data);
        } catch (error) {
          console.log(error);
        }
      });
      //========= message send ===========//
      socket.on("send message", async (payload) => {
        try {
          const token = socket.handshake.auth.token;
          const tokenKey = process.env.TOKEN_KEY;
          const verified = jwt.verify(token, tokenKey);
  
          const idSender = verified.id;
  
          const { message, idRecipient } = payload;
  
          await chat.create({
            message,
            idRecipient,
            idSender,
          });
  
          io.to(socket.id).to(connectedUser[idRecipient]).emit("new message", idRecipient);
        } catch (error) {
          console.log(error);
        }
      });

      socket.on("disconnect", () => {
        console.log("client disconnect");
        delete connectedUser[userId];
      });
    });
  };
  
  module.exports = socketIo;