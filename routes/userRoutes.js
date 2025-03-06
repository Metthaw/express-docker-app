const express = require('express');
const { getUsers, getUserById, updateUser } = require('../controllers/userController');
const router = express.Router();
const connection = require('../db');

router.get('/', getUsers);       // ✅ GET ดึงผู้ใช้ทั้งหมด

module.exports = router;
