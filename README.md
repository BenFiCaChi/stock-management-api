# 📦 Stock Management API

## 📌 Overview

Backend API for managing stock operations including product creation, stock entry, exit, and transfer between warehouses.

## 🚀 Features

- Product management
- Stock entry
- Stock exit with validation
- Stock transfer between warehouses
- Real-time stock calculation

## 🛠️ Tech Stack

- Node.js
- NestJS
- Prisma ORM
- MySQL

## 🧠 Architecture

- Modules (Product, Movement)
- DTOs for validation
- Services for business logic
- Prisma for data access

## 🧠 Business Logic Example

- Prevents stock exit when quantity is insufficient
- Handles stock transfers as atomic transactions
- Calculates stock dynamically based on movements

## ▶️ Getting Started

```
</> bash
npm install
cp .env.example .env
npx prisma migrate dev
npm run start:dev
```

---

## 📡 API Endpoints

### 🧾 Products

- `POST /products` → Create product
- `GET /products` → List products

### 📦 Movements

- `POST /movements` → Create stock movement
- `GET /movements/stock` → Check current stock

## 📥 Example Request

POST /movements

{
"productId": 1,
"quantity": 10,
"warehouseId": 1,
"type": "ENTRY"
}

---

## 💡 Highlights

- Clean architecture
- Business logic implementation
- Transaction handling
- Stock validation

## 🎯 Why this project

This project demonstrates real-world backend challenges such as:

- Stock consistency
- Transaction handling
- Business rule validation
- Scalable architecture design
