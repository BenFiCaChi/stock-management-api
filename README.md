# 📦 Stock Management API

## 📌 Description

API for managing stock with entry, exit and transfer operations.

## 🚀 Features

- Product management
- Stock entry
- Stock exit (with validation)
- Stock transfer between warehouses
- Real-time stock calculation

## 🛠️ Tech Stack

- Node.js
- NestJS
- Prisma ORM
- MySQL

## ▶️ Run project

npm install
npx prisma migrate dev
npm run start:dev

## 📡 Endpoints

POST /products
GET /products
POST /movements
GET /movements/stock

## 💡 Highlights

- Business logic implementation
- Transaction handling
- Stock validation
