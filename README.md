# 🛒 Cart Management API (Node.js + MongoDB)

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
restAPIs/
├── src/
│ ├── features/
│ │ └── cart/
│ │ ├── cart.controller.js
│ │ ├── cart.repository.js
│ │ └── cart.route.js
│ └── middleware/
│ └── connection.js
├── .gitignore
├── package.json
└── server.js

### 1. Clone the repository

```bash
git clone https://github.com/mdSahibMalik/e-commerce/
cd your-repo-name



### 1. Clone the repository

bash
Copy
Edit
npm install
3. Set up MongoDB
Make sure MongoDB is running locally or provide a MongoDB Atlas connection string.

Update your MongoDB URI in src/middleware/connection.js.

4. Start the server
bash
Copy
Edit
node server.js
# or
npm start
📬 API Endpoints
Method	Endpoint	Description
POST	/cart/add	Add a product to cart
DELETE	/cart/:userId/:cartItemId	Remove a product from cart
GET	/cart/:userId	Get all products in cart

🧪 Testing With Postman
Set Content-Type: application/json in headers

Use the above routes to test functionality

Make sure to send valid MongoDB ObjectIds

🔒 Example Delete Request
h
Copy
Edit
DELETE /cart/687e7fa07ab4ea92be2a3d2d/687e92e60ad5c7cf5a3fc448
json
Copy
Edit
// Expected Response
{
  "message": "Deleted successfully"
}
🚧 Future Enhancements
JWT-based user authentication

Quantity updates for cart items

Switch to Mongoose with schema validation

Integrate with React frontend

🙌 Contributing
Contributions, issues and feature requests are welcome!
Feel free to open an issue or submit a pull request.

📄 License
This project is licensed under the MIT License.

👨‍💻 Author
Made with ❤️ by Your Name

markdown
Copy
Edit

---

## ✅ Instructions to Use

1. Copy everything above ⬆️
2. Paste it into your project’s `README.md` file
3. Update the following placeholders:
   - `your-username` → your GitHub username
   - `your-repo-name` → your repository name
   - `Your Name` → your actual name or GitHub profile name
4. Then push it to GitHub:

```bash
git add README.md
git commit -m "Add project README"
git push origin main
