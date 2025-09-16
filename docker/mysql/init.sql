-- MySQL initialization script for DeliveryCenter Laravel 12 application

-- Create additional user if needed
-- CREATE USER IF NOT EXISTS 'deliverycenter'@'%' IDENTIFIED BY 'password';
-- GRANT ALL PRIVILEGES ON deliverycenter.* TO 'deliverycenter'@'%';

-- Set timezone
SET time_zone = '+00:00';

-- Enable better performance settings
SET GLOBAL innodb_buffer_pool_size = 268435456; -- 256MB
SET GLOBAL innodb_log_file_size = 67108864; -- 64MB
SET GLOBAL innodb_flush_log_at_trx_commit = 2;
SET GLOBAL sync_binlog = 0;

-- Create database if it doesn't exist (already handled by environment variables)
-- CREATE DATABASE IF NOT EXISTS deliverycenter CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

FLUSH PRIVILEGES;