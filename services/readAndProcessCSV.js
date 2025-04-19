const fs = require('fs');
const csv = require('csv-parser');
const Product = require('../models/products');
const Customer = require('../models/customers');
const Order = require('../models/orders');
const { log } = require('../scheduler/log');

const loadCSVData = async (csvFilePath) => {
    try {
        await Product.deleteMany();
        await Customer.deleteMany();
        await Order.deleteMany();

        fs.createReadStream(csvFilePath)
            .pipe(csv())
            .on('data', async (row) => {
                try {
                    await Product.updateOne(
                        { productId: row['Product ID'] },
                        {
                            productId: row['Product ID'],
                            name: row['Product Name'],
                            category: row['Category']
                        },
                        { upsert: true }
                    );

                    await Customer.updateOne(
                        { customerId: row['Customer ID'] },
                        {
                            customerId: row['Customer ID'],
                            name: row['Customer Name'],
                            email: row['Customer Email'],
                            address: row['Customer Address']
                        },
                        { upsert: true }
                    );

                    await Order.create({
                        orderId: row['Order ID'],
                        productId: row['Product ID'],
                        customerId: row['Customer ID'],
                        region: row['Region'],
                        unitPrice: Number(row['Unit Price']),
                        discount: Number(row['Discount']),
                        shippingCost: Number(row['Shipping Cost']),
                        paymentMethod: row['Payment Method'],
                        dateOfSale: new Date(row['Date of Sale']),
                        quantitySold: Number(row['Quantity Sold'])
                    });
                } catch (error) {
                    console.log(`Error inserting row: ${JSON.stringify(row)} Error: ${error.message}`);
                    log(`Failed to insert row: ${JSON.stringify(row)} Error: ${error.message}`);
                }
            })
            .on('end', () => {
                log('CSV import completed');
            });
    } catch (err) {

        log(`Error loading data: ${err.message}`);
    }
};

module.exports = loadCSVData;