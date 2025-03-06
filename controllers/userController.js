const connection = require('../db');

const getUsers = (req, res) => {
    connection.query('SELECT * FROM users', (err, results) => {
        if (err) {
            console.error('❌ Error fetching users:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results);
    });
};

module.exports = { getUsers };
