const express = require('express');
const userController = require('../controllers/user.controller');
const upload = require("../middlewares/upload");
const { tokenService } = require('../services')

const router = express.Router();

router.route('/csv/upload').post(tokenService.verifyAuthToken, upload.single("file"), userController.upload);

module.exports = router;