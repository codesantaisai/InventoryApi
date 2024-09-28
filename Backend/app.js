import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {dbConnection} from  "./connectionDb.js"
import stockRoutes from './routes/stockroute.js'; 


dotenv.config({ path: './config/config.env' });

const app = express();


// Middleware setup
app.use(cors({ origin: '*' })); 
app.use(express.json()); 
// Use JSON and URL-encoded body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Connect to the database
dbConnection();

// Use stock routes
app.use('/api/stocks', stockRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
