require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connection = require('./db');

const app = express();
const PORT = process.env.PORT || 3001;

// ✅ ใช้ Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ หน้าเว็บหลัก แสดงฟอร์มเพิ่ม/แก้ไข/ลบข้อมูล และปุ่มดึงข้อมูล
app.get('/', (req, res) => {
    res.send(`
        <h1>📌 ระบบจัดการข้อมูลผู้ใช้</h1>

        <h2>➕ เพิ่มข้อมูลผู้ใช้ (POST)</h2>
        <form action="/create" method="POST">
            <label for="name">ชื่อ:</label>
            <input type="text" name="name" required /><br><br>

            <label for="email">อีเมล:</label>
            <input type="email" name="email" required /><br><br>

            <button type="submit">เพิ่มข้อมูล</button>
        </form>

        <h2>✏️ แก้ไขข้อมูลผู้ใช้ (PUT)</h2>
        <form action="/update" method="POST">
            <label for="id">ID ผู้ใช้:</label>
            <input type="number" name="id" required /><br><br>

            <label for="name">ชื่อใหม่:</label>
            <input type="text" name="name" required /><br><br>

            <label for="email">อีเมลใหม่:</label>
            <input type="email" name="email" required /><br><br>

            <button type="submit">บันทึก</button>
        </form>

        <h2>❌ ลบข้อมูลผู้ใช้ (DELETE)</h2>
        <form onsubmit="deleteUser(event)">
            <label for="deleteId">ID ผู้ใช้:</label>
            <input type="number" id="deleteId" required />
            <button type="submit">ลบข้อมูล</button>
        </form>

        <h2>📋 ข้อมูลผู้ใช้</h2>
        <button onclick="fetchUsers()">ดูข้อมูลผู้ใช้</button>

        <p>
            🌐 <strong>API ที่ใช้งาน:</strong><br>
            🔹 <a href="/api/users" target="_blank">GET /api/users</a><br>
            🔹 
        </p>

        <table border="1" id="userTable" style="margin-top: 10px; display: none;">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>ชื่อ</th>
                    <th>อีเมล</th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>

        <script>
            function fetchUsers() {
                fetch('/api/users')
                    .then(response => response.json())
                    .then(data => {
                        const table = document.getElementById('userTable');
                        const tbody = table.querySelector('tbody');
                        tbody.innerHTML = "";
                        data.forEach(user => {
                            const row = document.createElement('tr');
                            row.innerHTML = \`<td>\${user.id}</td><td>\${user.name}</td><td>\${user.email}</td>\`;
                            tbody.appendChild(row);
                        });
                        table.style.display = 'table';
                    })
                    .catch(error => console.error('❌ Error fetching users:', error));
            }

            function deleteUser(event) {
                event.preventDefault();
                const id = document.getElementById("deleteId").value;
                fetch('/delete/' + id, { method: 'DELETE' })
                    .then(response => response.text())
                    .then(message => {
                        alert(message);
                        fetchUsers();
                    })
                    .catch(error => console.error('❌ Error deleting user:', error));
            }

            function showDeleteExample() {
                alert("🔹 ใช้ API DELETE โดยใส่ ID: เช่น /delete/1");
            }
        </script>
    `);
});



// ✅ ใช้ API /api/users (REST API)
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
