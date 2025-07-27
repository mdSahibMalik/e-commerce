# 🛒E-commerce Backend  (Node.js + Express + MongoDB)

A simple and efficient backend API for managing cart items, built with **Node.js**, **Express**, and **MongoDB**. This project is part of a MERN stack e-commerce application, focusing on cart-related operations like adding, removing, and fetching items.

---

## 🚀 Features

- ✅ Add item to cart
- ❌ Remove item from cart
- 🔄 View user cart items
- ✅ MongoDB ObjectId validation
- 📦 Clean modular structure (Controller, Repository, Routes)

---

## 🧰 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB**
- **MongoDB Native Driver**
- **Postman** (for API testing)

---

## 📁 Project Structure

```text
restAPIs/
├── src/
│   ├── features/
│   │   └── cart/
│   │       ├── cart.controller.js
│   │       ├── cart.repository.js
│   │       └── cart.route.js
│   └── middleware/
│       └── connection.js
├── .gitignore
├── package.json
└── server.js

