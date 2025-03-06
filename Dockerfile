# ใช้ Node.js เวอร์ชัน 18 เป็น base image
FROM node:18

# ตั้งค่า Working Directory
WORKDIR /app

# คัดลอก package.json และ package-lock.json ไปยัง Container
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm install

# คัดลอกโค้ดทั้งหมดไปยัง Container
COPY . .

# เปิดพอร์ต 3000 สำหรับ Express.js
EXPOSE 3000

# รันเซิร์ฟเวอร์เมื่อ Container เริ่มทำงาน
CMD ["node", "index.js"]
