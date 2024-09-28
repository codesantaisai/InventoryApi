import { Stocks } from "../models/stockModels.js";
import getNextSequence from "../_helpers/stockId.js";  

// Add new stock
export const createStock = async (req, res) => {
    const { itemName, category, inStock, date, statusOfItem } = req.body;

    // Validate required fields
    if (!itemName || !category || !inStock || !date || !statusOfItem) {
        return res.status(400).json({
            success: false,
            message: 'Please provide all required stock details',
        });
    }

    try {
        // Get the next sequence for the stockId
        const stockId = await getNextSequence('stockId');

        // Create new stock
        const newStock = new Stocks({ stockId, itemName, category, inStock, date, statusOfItem });
        await newStock.save();  // Save to the database

        res.status(201).json({
            success: true,
            message: 'Stock created successfully!',
            data: newStock,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Error creating stock: ${error.message}`,
        });
    }
};

// Get all stocks
export const getAllStocks = async (req, res) => {
    try {
        const stocks = await Stocks.find();  // Retrieve all stock records
        res.status(200).json({
            success: true,
            data: stocks,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error retrieving stocks: " + error.message,
        });
    }
};

// Get stock by stockId
export const getStockById = async (req, res) => {
    const { stockId } = req.params;

    try {
        const stock = await Stocks.findOne({ stockId });

        if (!stock) {
            return res.status(404).json({
                success: false,
                message: 'Stock not found!',
            });
        }

        res.status(200).json({
            success: true,
            data: stock,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Error retrieving stock: ${error.message}`,
        });
    }
};

// Update a stock by stockId
export const updateStock = async (req, res) => {
    const { stockId } = req.params;
    const { itemName, category, inStock, date, statusOfItem } = req.body;

    // Validate required fields
    if (!itemName || !category || !inStock || !date || !statusOfItem) {
        return res.status(400).json({
            success: false,
            message: 'Please provide all required stock details for update',
        });
    }

    try {
        // Find stock by stockId and update
        const updatedStock = await Stocks.findOneAndUpdate(
            { stockId }, 
            { itemName, category, inStock, date, statusOfItem },
            { new: true, runValidators: true }
        );

        if (!updatedStock) {
            return res.status(404).json({
                success: false,
                message: 'Stock not found!',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Stock updated successfully!',
            data: updatedStock,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Error updating stock: ${error.message}`,
        });
    }
};

// Delete a stock by stockId
export const deleteStock = async (req, res) => {
    const { stockId } = req.params;

    try {
        const deletedStock = await Stocks.findOneAndDelete({ stockId });

        if (!deletedStock) {
            return res.status(404).json({
                success: false,
                message: 'Stock not found!',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Stock deleted successfully!',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting stock: " + error.message,
        });
    }
};
