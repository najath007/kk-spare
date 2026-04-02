-- ============================================
-- KK SPARE PARTS - MySQL Database Schema
-- ============================================

CREATE DATABASE IF NOT EXISTS kk_spare_parts;
USE kk_spare_parts;

-- --------------------------------------------
-- BRANDS
-- --------------------------------------------
CREATE TABLE brands (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- --------------------------------------------
-- MODELS (linked to brands)
-- --------------------------------------------
CREATE TABLE models (
  id INT AUTO_INCREMENT PRIMARY KEY,
  brand_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (brand_id) REFERENCES brands(id) ON DELETE CASCADE,
  UNIQUE KEY unique_brand_model (brand_id, name)
);

-- --------------------------------------------
-- YEARS
-- --------------------------------------------
CREATE TABLE years (
  id INT AUTO_INCREMENT PRIMARY KEY,
  year YEAR NOT NULL UNIQUE
);

-- --------------------------------------------
-- CATEGORIES
-- --------------------------------------------
CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  part_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- --------------------------------------------
-- PRODUCTS
-- --------------------------------------------
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  category_id INT NOT NULL,
  badge ENUM('HOT', 'NEW', 'SALE', '') DEFAULT '',
  image VARCHAR(255),
  type ENUM('OEM', 'Aftermarket') NOT NULL,
  stock INT DEFAULT 0,
  warranty VARCHAR(50) DEFAULT 'N/A',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- --------------------------------------------
-- PRODUCT COMPATIBILITY (brand + model + year)
-- --------------------------------------------
CREATE TABLE product_compatibility (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  brand_id INT NOT NULL,
  model_id INT NOT NULL,
  year_id INT NOT NULL,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  FOREIGN KEY (brand_id) REFERENCES brands(id),
  FOREIGN KEY (model_id) REFERENCES models(id),
  FOREIGN KEY (year_id) REFERENCES years(id),
  UNIQUE KEY unique_compat (product_id, brand_id, model_id, year_id)
);

-- --------------------------------------------
-- FREQUENTLY BOUGHT TOGETHER
-- --------------------------------------------
CREATE TABLE bought_together (
  product_id INT NOT NULL,
  related_product_id INT NOT NULL,
  PRIMARY KEY (product_id, related_product_id),
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  FOREIGN KEY (related_product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- --------------------------------------------
-- USERS
-- --------------------------------------------
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  role ENUM('customer', 'admin') DEFAULT 'customer',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- --------------------------------------------
-- ADDRESSES
-- --------------------------------------------
CREATE TABLE addresses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  full_name VARCHAR(150),
  phone VARCHAR(20),
  address_line1 VARCHAR(255),
  address_line2 VARCHAR(255),
  city VARCHAR(100),
  state VARCHAR(100),
  pincode VARCHAR(10),
  is_default BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- --------------------------------------------
-- ORDERS
-- --------------------------------------------
CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  address_id INT,
  total_amount DECIMAL(10, 2) NOT NULL,
  status ENUM('pending', 'confirmed', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
  payment_method ENUM('COD', 'online') DEFAULT 'COD',
  payment_status ENUM('unpaid', 'paid', 'refunded') DEFAULT 'unpaid',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (address_id) REFERENCES addresses(id)
);

-- --------------------------------------------
-- ORDER ITEMS
-- --------------------------------------------
CREATE TABLE order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  unit_price DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id)
);

-- --------------------------------------------
-- CART
-- --------------------------------------------
CREATE TABLE cart (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT DEFAULT 1,
  added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  UNIQUE KEY unique_cart_item (user_id, product_id)
);

-- ============================================
-- SEED DATA (migrated from data.js)
-- ============================================

INSERT INTO brands (name) VALUES
('Hero'),('Honda'),('Bajaj'),('TVS'),
('Royal Enfield'),('Yamaha'),('Suzuki'),('Scooters');

INSERT INTO models (brand_id, name) VALUES
(1,'Splendor'),(1,'Passion'),(1,'CBZ'),(1,'Xpulse'),
(2,'Shine'),(2,'Unicorn'),(2,'CBR'),(2,'Activa'),
(3,'Pulsar'),(3,'Discover'),(3,'Dominar'),(3,'Platina'),
(4,'Apache'),(4,'Jupiter'),(4,'NTORQ'),(4,'Star City'),
(5,'Classic 350'),(5,'Bullet 350'),(5,'Himalayan'),(5,'Meteor'),
(6,'R15'),(6,'MT-15'),(6,'FZS'),(6,'Fascino'),
(7,'Gixxer'),(7,'Access'),(7,'Burgman'),(7,'Intruder'),
(8,'Generic 110cc'),(8,'Generic 125cc'),(8,'Electric Scooty');

INSERT INTO years (year) VALUES
(2015),(2016),(2017),(2018),(2019),(2020),(2021),(2022),(2023),(2024);

INSERT INTO categories (name, part_count) VALUES
('Engine',12540),('Brakes',8320),('Electrical',6410),
('Suspension',4215),('Body',9102),('Tyres',3200),
('Filters',5420),('Lights',7100),('Exhaust',2150),('Transmission',3890);

INSERT INTO products (id, name, price, category_id, badge, image, type, stock, warranty) VALUES
(1,'High-Performance Brake Pads (Ceramic)',1200.00,2,'HOT','/images/brake_pads.png','Aftermarket',45,'1 Year'),
(2,'NGK Iridium Spark Plug',450.00,3,'NEW','/images/spark_plug.png','OEM',210,'6 Months'),
(3,'Motul 7100 4T 20W-50 Synthetic Engine Oil',1100.00,1,'SALE','/images/engine_oil.png','Aftermarket',15,'N/A'),
(4,'Front Disc Brake Master Cylinder Assembly',2450.00,2,'','/images/brake_pads.png','OEM',8,'1 Year'),
(5,'Endurance Rear Shock Absorber Pair',3200.00,4,'HOT','/images/shock_absorber.png','OEM',32,'2 Years'),
(6,'LED Headlight Bulb 40W (White)',850.00,8,'NEW','/images/headlight_bulb.png','Aftermarket',120,'1 Year'),
(7,'Brake Fluid DOT 4 (250ml)',250.00,2,'','/images/engine_oil.png','Aftermarket',300,'N/A'),
(8,'Premium Oil Filter',150.00,7,'','/images/oil_filter.png','OEM',500,'N/A');

INSERT INTO bought_together VALUES
(1,4),(1,7),(2,6),(3,8),(4,1),(6,2),(7,1),(7,4),(8,3);
