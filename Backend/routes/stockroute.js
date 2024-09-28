import express from 'express';
import { createStock, getAllStocks, deleteStock,updateStock, getStockById } from '../controllers/stockController.js';

const router = express.Router();

// Route to create new stock
router.post('/create', createStock);

// Route to get all stocks
router.get('/all', getAllStocks);

router.get('/:stockId', getStockById);

// Route to update a stock by ID
router.put('/update/:stockId', updateStock);  

// Route to delete a stock by ID
router.delete('/:stockId', deleteStock);

export default router;
