const db = require('../db');

// ✅ ดึงผู้ใช้ทั้งหมด
exports.getUsers = (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

// ✅ ดึงผู้ใช้ตาม ID
exports.getUserById = (req, res) => {
    const userId = req.params.id;
    db.query('SELECT * FROM users WHERE id = ?', [userId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(result[0]);
    });
};

// ✅ อัปเดตข้อมูลผู้ใช้
exports.updateUser = (req, res) => {
    const userId = req.params.id;
    const { name, email } = req.body;
    db.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, userId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "User updated successfully" });
    });
};
