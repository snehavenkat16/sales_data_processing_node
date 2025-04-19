const Order = require('../models/orders');

const revenueController = {
    //function to get the total revenue between the specified dates
    getTotalRevenue: async (req, res) => {
        try {
            const { start, end } = req.query;
            if (!start || !end) {
                return res.status(400).json({ error: 'Start and end dates are required' });
            }
            const matchQuery = {
                dateOfSale: { $gte: new Date(start), $lte: new Date(end) },
            };
            const totalRevenue = await Order.aggregate([
                { $match: matchQuery },
                {
                    $group: {
                        _id: null,
                        revenue: {
                            $sum: {
                                $multiply: [
                                    '$quantitySold',
                                    { $multiply: ['$unitPrice', { $subtract: [1, '$discount'] }] },
                                ],
                            },
                        },
                    },
                },
            ]);

            res.status(200).json({ revenue: totalRevenue[0]?.revenue || 0 });

        } catch (err) {
            console.error('Error calculating revenue:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    //function to get the revenue by a specific field (e.g., region, productId, customerId)
    getRevenueByField: async (req, res, field) => {
        try {
            const { start, end } = req.query;
            if (!start || !end || !field) {
                return res.status(400).json({ error: 'Required Fields are Missing' });
            }
            const matchQuery = {
                dateOfSale: { $gte: new Date(start), $lte: new Date(end) },
            };
            const groupByFieldRevenue = await Order.aggregate([
                { $match: matchQuery },
                {
                    $group: {
                        _id: `$${field}`,
                        revenue: {
                            $sum: {
                                $multiply: [
                                    '$quantitySold',
                                    { $multiply: ['$unitPrice', { $subtract: [1, '$discount'] }] },
                                ],
                            },
                        },
                    },
                },
                { $sort: { revenue: -1 } },
            ]);
            res.status(200).json(groupByFieldRevenue);
        }
        catch (err) {
            console.error('Error calculating revenue:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    //function to get the revenue by trends (e.g., monthly, quarterly, yearly)
    getRevenueByTrends: async (req, res) => {
        try {

            const { start, end, interval } = req.query;

            if (!start || !end || !interval) {
                return res.status(400).json({ error: 'Required Fields are Missing' });
            }

            const dateFormat = {
                monthly: { $dateToString: { format: '%Y-%m', date: '$dateOfSale' } },
                quarterly: {
                    $concat: [
                        { $dateToString: { format: '%Y-Q', date: '$dateOfSale' } },
                        { $toString: { $ceil: { $divide: [{ $month: '$dateOfSale' }, 3] } } },
                    ],
                },
                yearly: { $dateToString: { format: '%Y', date: '$dateOfSale' } },
            }[interval];

            const matchQuery = {
                dateOfSale: { $gte: new Date(start), $lte: new Date(end) },
            };

            const RevenueByTrends = await Order.aggregate([
                { $match: matchQuery },
                {
                    $group: {
                        _id: dateFormat,
                        revenue: {
                            $sum: {
                                $multiply: [
                                    '$quantitySold',
                                    { $multiply: ['$unitPrice', { $subtract: [1, '$discount'] }] },
                                ],
                            },
                        },
                    },
                },
                { $sort: { _id: 1 } },
            ]);

            res.status(200).json(RevenueByTrends);

        } catch (error) {
            console.error('Error calculating revenue by trends:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

}


module.exports = revenueController;