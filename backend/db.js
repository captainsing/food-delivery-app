import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

export const initDb = async () => {
  try {
    // 1. Users Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 2. Foods Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS foods (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        category VARCHAR(50) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        image VARCHAR(255) NOT NULL,
        rating DECIMAL(2,1) DEFAULT 4.5,
        description TEXT
      );
    `);

    // 3. Orders Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id) ON DELETE SET NULL,
        items JSONB NOT NULL,
        total_amount DECIMAL(10,2) NOT NULL,
        status VARCHAR(20) DEFAULT 'Pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Seed Initial Menu Items
    const foodsRes = await pool.query('SELECT COUNT(*) FROM foods');
    if (parseInt(foodsRes.rows[0].count) === 0) {
      await pool.query(`
        INSERT INTO foods (name, category, price, image, rating, description) VALUES
        ('Double Cheese Burst Burger', 'Burger', 199.00, 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600', 4.8, 'Loaded with extra cheese, grilled veg patty, and signature sauce.'),
        ('Supreme Farmhouse Pizza', 'Pizza', 399.00, 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600', 4.7, 'Fresh mushrooms, capsicum, tomato, and mozzarella cheese.'),
        ('Creamy Alfredo Pasta', 'Pasta', 249.00, 'https://images.unsplash.com/photo-1621996346565-e3d5d6281290?w=600', 4.5, 'Rich white sauce pasta infused with herbs and garlic bread.'),
        ('Sizzling Lava Brownie', 'Dessert', 149.00, 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600', 4.9, 'Warm chocolate lava cake served with vanilla ice cream.'),
        ('Crispy French Fries', 'Sides', 99.00, 'https://images.unsplash.com/photo-1576107232684-1279f3908594?w=600', 4.3, 'Golden fried salted potatoes with peri peri dip.'),
        ('Iced Cold Coffee', 'Drinks', 119.00, 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600', 4.6, 'Thick blended espresso coffee topped with chocolate syrup.');
      `);
      console.log('✅ Menu Data Loaded into Neon DB!');
    }
  } catch (err) {
    console.error('❌ Database Initialization Error:', err);
  }
};