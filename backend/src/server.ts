import express from 'express';
import cors from 'cors';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import blogRoutes from './routes/blogRoutes';

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to the database
connectDB();

// Middleware
app.use(express.json());

// Enable CORS
const corsOptions = {
  origin: ["http://localhost:4200", "http://localhost:4201", "https://blog-site-frontend.s3.amazonaws.com"],
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Set up routes
app.use("/api/v1.0/blogsite/user", authRoutes);
app.use("/api/v1.0/blogsite/blogs", blogRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
