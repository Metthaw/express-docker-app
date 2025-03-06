# ใช้ Node.js เวอร์ชันล่าสุด
FROM node:latest

# กำหนด Working Directory
WORKDIR /app

# คัดลอกไฟล์ package.json และ package-lock.json
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm install

# คัดลอกโค้ดทั้งหมดเข้าไปใน Container
COPY . .

# เปิดพอร์ต 3001
EXPOSE 3001

# คำสั่งรันแอป
CMD ["node", "index.js"]
