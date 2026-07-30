import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const sql = neon(process.env.DATABASE_URL);

// Database Initialization with 20+ Items
async function initDb() {
  try {
    // Drop table to ensure schema matching
    await sql`DROP TABLE IF EXISTS foods CASCADE`;

    await sql`
      CREATE TABLE foods (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        price NUMERIC(10, 2) NOT NULL,
        image TEXT NOT NULL,
        description TEXT,
        rating NUMERIC(2, 1) DEFAULT 4.5,
        prep_time VARCHAR(50) DEFAULT '20-30 min',
        is_veg BOOLEAN DEFAULT true
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password TEXT NOT NULL
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        user_id INTEGER,
        items JSONB NOT NULL,
        total_amount NUMERIC(10, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // 20+ Expanded Food Items Seed
    await sql`
      INSERT INTO foods (name, category, price, image, description, rating, prep_time, is_veg) VALUES
      ('Hyderabadi Dum Biryani', 'Biryani', 299.00, 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500', 'Rich slow-cooked aromatic basmati rice with authentic Indian spices.', 4.9, '30-35 min', false),
      ('Paneer Tikka Biryani', 'Biryani', 269.00, 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=500', 'Marinated tandoori paneer cubes layered with saffron spiced basmati rice.', 4.8, '25-30 min', true),
      ('Cheesy Supreme Burger', 'Burger', 179.00, 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500', 'Juicy veggie patty with double cheddar cheese and secret smoked sauce.', 4.8, '15-20 min', true),
      ('Double Bacon Smoked Burger', 'Burger', 239.00, 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=500', 'Crispy chicken patty topped with caramelized onions and double cheese.', 4.7, '20 min', false),
      ('Butter Paneer Masala Pizza', 'Pizza', 349.00, 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=500', 'Desi style Makhani sauce pizza loaded with paneer cubes and capsicum.', 4.9, '25-30 min', true),
      ('Chicken Pepperoni Feast', 'Pizza', 399.00, 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500', 'Loaded with smoked chicken pepperoni and double mozzarella cheese.', 4.7, '25-30 min', false),
      ('Farmhouse Veggie Delight', 'Pizza', 319.00, 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500', 'Crispy crust topped with golden corn, jalapenos, mushrooms, and olives.', 4.6, '20-25 min', true),
      ('Creamy Alfredo Pasta', 'Pasta', 249.00, 'https://images.unsplash.com/photo-1621996346565-e3d5d6281216?w=500', 'Rich white sauce pasta cooked with garlic herbs, parmesan, and mushrooms.', 4.6, '20-25 min', true),
      ('Arrabbiata Red Sauce Pasta', 'Pasta', 229.00, 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=500', 'Tangy spicy tomato basil sauce tossed with penne pasta.', 4.5, '20 min', true),
      ('Spicy Hakka Noodles', 'Chinese', 189.00, 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500', 'Wok-tossed noodles with crunchy vegetables and Schezwan chili sauce.', 4.5, '15-20 min', true),
      ('Veg Manchurian Gravy', 'Chinese', 209.00, 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500', 'Deep-fried vegetable balls in spicy garlic soy sauce.', 4.6, '20 min', true),
      ('Crispy Masala Dosa', 'South Indian', 149.00, 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=500', 'Golden crispy rice crepe filled with spiced potato masala, coconut chutney.', 4.9, '15 min', true),
      ('Mysore Onion Rava Dosa', 'South Indian', 169.00, 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500', 'Semolina crepe topped with onions, red chili chutney, and ghee.', 4.7, '15-20 min', true),
      ('Crispy Chicken Wings', 'Sides', 279.00, 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=500', 'Deep-fried spicy wings tossed in honey BBQ glaze.', 4.8, '20-25 min', false),
      ('Cheesy Garlic Breadsticks', 'Sides', 159.00, 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=500', 'Baked garlic bread stuffed with melted mozzarella and oregano.', 4.7, '15 min', true),
      ('Peri Peri French Fries', 'Sides', 109.00, 'https://images.unsplash.com/photo-1576107232684-1279f390859f?w=500', 'Crispy fries tossed in hot African peri peri spice mix.', 4.4, '10-15 min', true),
      ('Dark Chocolate Walnut Brownie', 'Dessert', 129.00, 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500', 'Warm chocolate walnut brownie with hot fudge sauce.', 4.9, '10-15 min', true),
      ('Chocolaty Lava Cake', 'Dessert', 119.00, 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500', 'Gooey molten chocolate center wrapped in fluffy sponge cake.', 4.8, '10-15 min', true),
      ('Classic Oreo Thick Shake', 'Drinks', 139.00, 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500', 'Rich vanilla cream blended with crunchy Oreo cookies.', 4.8, '10 min', true),
      ('Classic Cold Coffee', 'Drinks', 99.00, 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=500', 'Thick blended iced coffee topped with chocolate drizzle.', 4.6, '10 min', true)
    `;

    console.log('✅ 20+ Food Items Successfully Seeded into Database!');
  } catch (err) {
    console.error('❌ DB Init Error:', err);
  }
}

initDb();

// Routes
app.get('/api/foods', async (req, res) => {
  try {
    const foods = await sql`SELECT * FROM foods ORDER BY id ASC`;
    res.json(foods);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch foods' });
  }
});

app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existing = await sql`SELECT * FROM users WHERE email = ${email}`;
    if (existing.length > 0) return res.status(400).json({ error: 'Email already registered' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await sql`INSERT INTO users (name, email, password) VALUES (${name}, ${email}, ${hashedPassword}) RETURNING id, name, email`;

    const user = result[0];
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'secret');
    res.json({ user, token });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const users = await sql`SELECT * FROM users WHERE email = ${email}`;
    if (users.length === 0) return res.status(400).json({ error: 'User not found' });

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid password' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'secret');
    res.json({ user: { id: user.id, name: user.name, email: user.email }, token });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
});

app.post('/api/orders', async (req, res) => {
  const { userId, items, totalAmount } = req.body;
  try {
    const result = await sql`INSERT INTO orders (user_id, items, total_amount) VALUES (${userId}, ${JSON.stringify(items)}, ${totalAmount}) RETURNING *`;
    res.json({ success: true, order: result[0] });
  } catch (err) {
    res.status(500).json({ error: 'Failed to place order' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));