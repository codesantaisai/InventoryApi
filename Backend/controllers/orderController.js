import { Orders } from "../models/orderModel.js";
import { Stocks } from "../models/stockModels.js";

// Create new order
export const createOrder = async (req, res) => {
    const { orderName, supplier, date, noOfItems, stockId } = req.body;

    // Validate required fields
    if (!orderName || !supplier || !date || !noOfItems || !stockId) {
        return res.status(400).json({
            success: false,
            message: 'Please provide all required order and stock details',
        });
    }

    try {
        // Find the stock by stockId
        const stock = await Stocks.findOne({ stockId });

        // Check if the stock exists and has enough quantity
        if (!stock) {
            return res.status(404).json({
                success: false,
                message: 'Stock item not found!',
            });
        }
        if (stock.inStock < noOfItems) {
            return res.status(400).json({
                success: false,
                message: `Not enough items in stock. Available: ${stock.inStock}`,
            });
        }

        // Create new order
        const newOrder = new Orders({ orderName, supplier, date, noOfItems });
        await newOrder.save();  
        
        // Reduce the stock count
        stock.inStock -= noOfItems;
        await stock.save();  

        res.status(201).json({
            success: true,
            message: 'Order created and stock updated successfully!',
            data: newOrder,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Error creating order or updating stock: ${error.message}`,
        });
    }
};


// Get all orders
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Orders.find();  
        res.status(200).json({
            success: true,
            data: orders,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Error retrieving orders: ${error.message}`,
        });
    }
};

// Get order by ID
export const getOrderById = async (req, res) => {
    const { id } = req.params;

    try {
        const order = await Orders.findById(id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found!',
            });
        }

        res.status(200).json({
            success: true,
            data: order,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Error retrieving order: ${error.message}`,
        });
    }
};

// Update order by ID
export const updateOrder = async (req, res) => {
    const { id } = req.params;
    const { orderName, supplier, date, noOfItems } = req.body;

    // Validate required fields
    if (!orderName || !supplier || !date || !noOfItems) {
        return res.status(400).json({
            success: false,
            message: 'Please provide all required order details for update',
        });
    }

    try {
        const updatedOrder = await Orders.findByIdAndUpdate(
            id,
            { orderName, supplier, date, noOfItems },
            { new: true, runValidators: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({
                success: false,
                message: 'Order not found!',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Order updated successfully!',
            data: updatedOrder,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Error updating order: ${error.message}`,
        });
    }
};

// Delete order by ID
export const deleteOrder = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedOrder = await Orders.findByIdAndDelete(id);

        if (!deletedOrder) {
            return res.status(404).json({
                success: false,
                message: 'Order not found!',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Order deleted successfully!',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Error deleting order: ${error.message}`,
        });
    }
};
