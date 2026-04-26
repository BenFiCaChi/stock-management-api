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

## ▶️ Getting Started

```
</> bash
npm install
cp .env.example .env
npx prisma migrate dev
npm run start:dev
```

## 📡 Endpoints

POST /products
GET /products
POST /movements
GET /movements/stock

## 💡 Highlights

- Clean architecture
- Business logic implementation
- Transaction handling
- Stock validation
