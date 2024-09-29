import express from 'express';
import {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder
} from '../controllers/orderController.js';

const router = express.Router();

// Route to create new order
router.post('/create', createOrder);

// Route to get all orders
router.get('/all', getAllOrders);

// Route to get an order by ID
router.get('/:id', getOrderById);

// Route to update an order by ID
router.put('/update/:id', updateOrder);

// Route to delete an order by ID
router.delete('/delete/:id', deleteOrder);

export default router;
