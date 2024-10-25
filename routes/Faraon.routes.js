const express = require('express')
const router = express.Router()
const authMiddleware = require('../config/authMiddleW')
const { getToken, getFaraones, getFaraon, createFaraon, updateFaraon, deleteFaraon } = require('../controllers/Faraones.controllers');


module.exports = (io) => {
    router.post('/login', getToken);
    router.get('/getallfaraons', authMiddleware, getFaraones);
    router.get('/getonefaraon/:id', authMiddleware, getFaraon);
    router.post('/createfaraon/', authMiddleware, (req, res) => createFaraon (req, res, io));
    router.put('/updatefaraon/:id', authMiddleware, (req, res) => updateFaraon (req, res, io));
    router.delete('/deletefaraon/:id', authMiddleware, (req, res) => deleteFaraon (req, res, io));

    return router;
}


