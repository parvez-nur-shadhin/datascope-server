import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import recordRoutes from './routes/recordRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import savedViewRoutes from './routes/savedViewRoutes.js';
import authRoutes from './routes/authRoutes.js'; // ADD THIS
import { protect } from './middlewares/authMiddleware.js'; // ADD THIS

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Public Routes
app.use('/api/auth', authRoutes);

// Protected API Routes (Requires valid JWT)
app.use('/api/records', protect, recordRoutes);
app.use('/api/analytics', protect, analyticsRoutes);
app.use('/api/saved-views', protect, savedViewRoutes);

app.get('/', (req, res) => {
  res.send('DataScope API is running');
});

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => console.error('MongoDB connection error:', error));