import Transaction from "../model/transaction.js";

export const createTransaction = async (req, res) => {
    try {
        const { type, amount, category, description, date } = req.body;

        if (!type || !amount || !category) {
            return res.status(400).json({
                message: "Type, amount and category are required.",
            });
        }

        const transaction = await Transaction.create({
            user: req.user.userId,
            type,
            amount,
            category,
            description,
            date,
        })

        res.status(201).json({
            message: "Transaction created successfully.",
            transaction,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

export const getTransactions = async (req, res) => {
    try {
        const transaction = await Transaction.find({
            user: req.user.userId,
        }).sort({ date: -1 })

        res.status(200).json({
            count: transaction.length,
            transaction
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

export const updateTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        const { type, amount, category, description, date } = req.body

        const transaction = await Transaction.findById(id)

        if (!transaction) {
            return res.status(404).json({
                message: "Transaction not found.",
            });
        }


        if (transaction.user.toString() !== req.user.userId) {
            return res.status(403).json({
                message: "You are not authorized to update this transaction.",
            });
        }

        transaction.type = type || transaction.type;
        transaction.amount = amount || transaction.amount;
        transaction.category = category || transaction.category;
        transaction.description = description || transaction.description;
        transaction.date = date || transaction.date;

        await transaction.save();

        res.status(200).json({
            message: "Transaction updated successfully.",
            transaction,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}