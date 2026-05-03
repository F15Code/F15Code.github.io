const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const path = require('path');

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); 
app.use(express.json()); 
// Роздача статичних фото з папки public/images
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Авто
app.get('/api/cars', async (req, res) => {
  try {
    const cars = await prisma.car.findMany();
    res.json(cars);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

//Відгуки
app.get('/api/reviews', async (req, res) => {
  try {
    const reviews = await prisma.review.findMany({ 
        orderBy: { id: 'desc' } // Останні відгуки зверху
    });
    res.json(reviews);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// FAQ 
app.get('/api/faq', async (req, res) => {
  try {
    const faqs = await prisma.fAQ.findMany();
    res.json(faqs);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

//Обране

// 1. Отримати всі або перевірити конкретне
app.get('/api/favorites', async (req, res) => {
  const { userId, carId } = req.query;
  
  if (!userId) return res.status(400).json({ error: "userId обов'язковий" });

  try {
    const query = { userId: Number(userId) };
    if (carId) query.carId = Number(carId);

    const favorites = await prisma.favorite.findMany({
      where: query,
      include: { car: true }
    });
    res.json(favorites);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Помилка сервера при отриманні обраного" });
  }
});

//Додати в обране
app.post('/api/favorites', async (req, res) => {
  const { userId, carId } = req.body;
  try {
    const newFavorite = await prisma.favorite.create({
      data: {
        userId: Number(userId),
        carId: Number(carId)
      }
    });
    res.status(201).json(newFavorite);
  } catch (error) {
    res.status(400).json({ error: "Вже в обраному або помилка даних" });
  }
});

// Видалити з обраного
app.delete('/api/favorites/:userId/:carId', async (req, res) => {
  const { userId, carId } = req.params;
  try {
    await prisma.favorite.deleteMany({
      where: {
        userId: Number(userId),
        carId: Number(carId)
      }
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Помилка при видаленні" });
  }
});

// Авторизація

app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const newUser = await prisma.user.create({
      data: { email, password }
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: "Користувач вже існує" });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (user && user.password === password) {
      res.json(user);
    } else {
      res.status(401).json({ error: "Невірний логін або пароль" });
    }
  } catch (error) {
    res.status(500).json({ error: "Помилка сервера" });
  }
});

// Отримати бронювання конкретного користувача
app.get('/api/my-bookings', async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: "userId не вказано" });
  }

  try {
    const bookings = await prisma.booking.findMany({
      where: {
        userId: Number(userId) // Перетворюємо в число для бази
      },
      include: {
        car: true // Підтягуємо дані про авто 
      },
      orderBy: {
        startDate: 'desc' // Нові бронювання будуть зверху
      }
    });
    res.json(bookings);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Створення нового бронювання
app.post('/api/bookings', async (req, res) => {
  const { carId, userId, startDate, endDate, totalPrice, location } = req.body;

  try {
    const newBooking = await prisma.booking.create({
      data: {
        carId: Number(carId),
        userId: Number(userId),
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        totalPrice: Number(totalPrice),
        location: location
      }
    });
    res.status(201).json(newBooking);
  } catch (e) {
    console.error("Помилка при збереженні бронювання:", e);
    res.status(400).json({ error: "Не вдалося створити бронювання. Перевірте дані." });
  }
});

app.listen(PORT, () => {
  console.log(`Server ready at http://localhost:${PORT}`);
});