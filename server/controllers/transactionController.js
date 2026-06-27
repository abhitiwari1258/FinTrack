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