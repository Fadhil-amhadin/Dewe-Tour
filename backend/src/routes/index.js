const express = require('express');
const router = express.Router();

const {addTrip, getTrips, getTrip, deleteTrip, updateTrip} = require('../controllers/trip');
const {addUser, getUsers, deleteUser, getUser, updateUser} = require('../controllers/user');
const {addCountry, getCountries, getCountry, deleteCountry} = require('../controllers/country');
const {addTransaction, getTransactions, getTransaction, deleteTransaction, updateTransaction, getLastTransaction, adminTransaction} = require('../controllers/transaction');
const {register, login} = require('../controllers/auth');
const {auth, adminOnly} = require('../middlewares/auth');
const {uploadFile} = require('../middlewares/uploadFile');

router.get('/users/:id',auth, getUser);
router.get('/users',auth, adminOnly, getUsers);
router.patch('/users/:id', uploadFile("photo"), updateUser);
router.delete('/users/:id', auth, adminOnly, deleteUser);

router.get('/trips/:id', getTrip);
router.get('/trips', getTrips);
router.post('/trips', auth, adminOnly, uploadFile("image"), addTrip);
router.patch('/trips/:id', auth, updateTrip);
router.delete('/trips/:id', auth, adminOnly, deleteTrip);

router.get('/countries/:id', getCountry);
router.get('/countries', getCountries);
router.post('/countries', auth, adminOnly, addCountry);
router.delete('/countries/:id', auth, adminOnly, deleteCountry);

router.get('/transactions/:id', auth, getTransaction);
router.get('/transactions', auth, getTransactions);
router.get('/transactionLast', auth, getLastTransaction);
router.post('/transactions', auth, addTransaction);
router.patch('/transactions/:id', auth, uploadFile("attachment"), updateTransaction);
router.patch('/transactionsAdmin/:id', auth, adminOnly, adminTransaction);
router.delete('/transactions/:id', auth, deleteTransaction);

router.post('/login', login);
router.post('/register', register);
module.exports = router;
