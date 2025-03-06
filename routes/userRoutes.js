const express = require('express');
const { getUsers, getUserById, updateUser } = require('../controllers/userController');
const router = express.Router();
const connection = require('../db');

router.get('/', getUsers);       // ✅ GET ดึงผู้ใช้ทั้งหมด
router.get('/:id', getUserById); // ✅ GET ดึงผู้ใช้ตาม ID
router.put('/:id', (req, res) => {
    const userId = req.params.id;
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: "Name and email are required" });
    }

    const sql = `UPDATE users SET name = ?, email = ? WHERE id = ?`;
    connection.query(sql, [name, email, userId], (err, result) => {
        if (err) {
            console.error("❌ Error updating user:", err);
            return res.status(500).json({ error: "Database error" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json({ message: "User updated successfully" });
    });
});

module.exports = router;
