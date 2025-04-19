const express = require('express');
const revenueRouter = express.Router();
const RevenueController = require('../controllers/revenue_calc_Controller');

revenueRouter.get('/', RevenueController.getTotalRevenue);
revenueRouter.get('/by-product', (req, res) => RevenueController.getRevenueByField(req, res, 'productId'));
revenueRouter.get('/by-category', (req, res) => RevenueController.getRevenueByField(req, res, 'category'));
revenueRouter.get('/by-region', (req, res) => RevenueController.getRevenueByField(req, res, 'region'));
revenueRouter.get('/trends', RevenueController.getRevenueByTrends);

module.exports = revenueRouter;
