const express = require('express');
const userController = require('../controllers/user.controller');
const upload = require("../middlewares/upload");
const router = express.Router();

router.route('/uploadcsv').post(upload.single("file"),userController.upload);

module.exports = router;
