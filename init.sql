CREATE DATABASE IF NOT EXISTS mydatabase;
USE mydatabase;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE
);

INSERT INTO users (name, email) VALUES ('John Doe', 'john@example.com')
ON DUPLICATE KEY UPDATE name=name;

INSERT INTO users (name, email) VALUES ('Alice Smith', 'alice@example.com')
ON DUPLICATE KEY UPDATE name=name;

INSERT INTO users (name, email) VALUES ('Dohn joe', 'dohn@example.com')
ON DUPLICATE KEY UPDATE name=name;

INSERT INTO users (name, email) VALUES ('slice amith', 'alice@example.com')
ON DUPLICATE KEY UPDATE name=name;
