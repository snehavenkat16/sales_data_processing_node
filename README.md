#  Sales Data Processing Backend (Node.js + MongoDB)

A normalized and scalable backend system to handle historical sales data from CSV files, store them in a MongoDB database, and provide RESTful APIs for analytical queries.

---

##  Features

- Upload and process CSV sales data
- Normalized schema with Products, Customers, and Orders
- Background job to reload data daily
- RESTful APIs for analytical reporting (revenue, top customers, etc.)

---

## Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)

---

## Setup Instructions

```bash
# Clone the repository
git clone https://github.com/snehavenkat16/sales_data_processing_node.git
cd sales_data_processing_node

# Install dependencies
npm install

# Start the MongoDB server (if using local MongoDB)
mongod

# Start the application
node server.js
```

---

## 📄 CSV Upload (via Postman)

**Endpoint:**  
`POST /api/upload`

**Body (form-data):**

| Key  | Type | Value     |
|------|------|-----------|
| file | File | `data.csv` |

---

## 📁 Folder Structure

```
├── models/             # Mongoose schemas (Product, Customer, Order)
├── routes/             # API route definitions
├── controllers/        # Request handlers
├── services/           # CSV processing logic
├── scheduler/          # Background cron job
├── uploads/            # Temporary storage for uploaded CSV files
├── server/config/      # Database connection file
├── README.md
```

---

## 📒 API Reference

| Route                      | Method | Params / Body             | Description                         |
|---------------------------|--------|---------------------------|-------------------------------------|
| `/api/upload`             | POST   | Form-Data: `file` (CSV)   | Upload and process a CSV file       |
| `/api/revenue/by-product` | GET    | `start`, `end` (ISO date) | Revenue grouped by product          |
| `/api/revenue/by-region`  | GET    | `start`, `end` (optional) | Revenue grouped by region           |
| `/api/top-customers`      | GET    | `limit`, `start`, `end`   | Top customers by total spend        |
| `/api/orders`             | GET    | `start`, `end` (optional) | Retrieve all orders in date range   |

---

## 📫 Contact

For any queries or suggestions, please feel free to open an issue or reach out via [GitHub](https://github.com/snehavenkat16).
