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
- `POST /movements` → Create stock moviment  
- `GET /movements/stock` → Check current stock
---

## 💡 Highlights

- Clean Architecture (modular and scalable)
- Business logic service-centric
- Transaction handling with Prism
- Stock validation before operations
