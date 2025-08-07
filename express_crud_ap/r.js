// Complete Line-by-Line Explanation of Node.js/Express CRUD API
// Let's break down every file with desi-style English explanations (no Hindi words):

// 1. .env File
// ini
// MONGODB_URI=mongodb://localhost:27017/crud_db
// PORT=3000
// What it does: Stores sensitive configuration

// Line 1: MongoDB connection URL

// mongodb:// → Protocol for MongoDB

// localhost:27017 → Default MongoDB address+port

// crud_db → Database name (will auto-create)

// Line 2: Server port number (3000 default)

// 2. models/Item.js (Database Model)
// javascript
// const mongoose = require('mongoose');

// const itemSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   description: { type: String }
// });

// module.exports = mongoose.model('Item', itemSchema);
// Line 1: Imports Mongoose (MongoDB helper library)

// Line 3-6: Defines database structure

// name: Must be string (required field)

// description: Optional string field

// Line 8: Creates & exports model named "Item"

// 3. controllers/itemController.js (Business Logic)
// CREATE Operation
// javascript
// exports.createItem = async (req, res) => {
//   try {
//     const newItem = new Item(req.body);
//     await newItem.save();
//     res.status(201).json(newItem);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };
// Line 1: async function (needs await for database)

// Line 2: try block for error handling

// Line 3: Creates new item from request body

// Line 4: Saves to database (await = wait for completion)

// Line 5: Returns 201 (Created) + new item data

// Line 6-8: Catches errors (400 Bad Request)

// READ Operation
// javascript
// exports.getAllItems = async (req, res) => {
//   try {
//     const items = await Item.find();
//     res.json(items);
//   } catch (err) {
//     res.status(500).json({ error: 'Server error' });
//   }
// };
// Line 2: Item.find() gets all items from DB

// Line 3: Sends items as JSON

// Line 5: 500 = Internal server error

// UPDATE Operation
// javascript
// exports.updateItem = async (req, res) => {
//   try {
//     const updatedItem = await Item.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     res.json(updatedItem);
//   } catch (err) {
//     res.status(404).json({ error: 'Item not found' });
//   }
// };
// Line 3: findByIdAndUpdate takes 3 arguments:

// req.params.id → URL parameter (e.g., /items/123)

// req.body → New data to update

// { new: true } → Returns updated document

// Line 7: 404 = Not found error

// DELETE Operation
// javascript
// exports.deleteItem = async (req, res) => {
//   try {
//     await Item.findByIdAndDelete(req.params.id);
//     res.json({ message: 'Item deleted successfully' });
//   } catch (err) {
//     res.status(404).json({ error: 'Item not found' });
//   }
// };
// Line 3: Deletes item by ID

// Line 4: Success message

// 4. routes/itemRoutes.js (API Endpoints)
// javascript
// const express = require('express');
// const router = express.Router();
// const {
//   createItem,
//   getAllItems,
//   updateItem,
//   deleteItem
// } = require('../controllers/itemController');

// router.post('/', createItem);
// router.get('/', getAllItems);
// router.put('/:id', updateItem);
// router.delete('/:id', deleteItem);

// module.exports = router;
// Line 1-2: Creates Express router

// Line 3-7: Imports controller functions

// Line 9-12: Maps HTTP methods to controller functions

// POST / → Create

// GET / → Read all

// PUT /:id → Update by ID

// DELETE /:id → Delete by ID

// Line 14: Exports router

// 5. server.js (Main Application)
// javascript
// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const itemRoutes = require('./routes/itemRoutes');

// const app = express();

// // Middlewares
// app.use(cors());
// app.use(bodyParser.json());

// // Database Connection
// mongoose.connect(process.env.MONGODB_URI)
//   .then(() => console.log('MongoDB Connected!'))
//   .catch(err => console.log(err));

// // Routes
// app.use('/api/items', itemRoutes);

// // Start Server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
// Line 1: Loads environment variables

// Line 2-5: Imports required packages

// Line 7: Creates Express app

// Line 10: cors() → Allows frontend requests

// Line 11: bodyParser.json() → Parses JSON requests

// Line 14-16: Connects to MongoDB

// Line 19: Mounts item routes at /api/items

// Line 22-24: Starts server on specified port

// Key Technical Terms Explained
// Middleware (app.use()):

// Software that processes requests before they reach routes

// Example: bodyParser.json() converts request body to JSON

// async/await:

// async marks a function as asynchronous

// await pauses execution until Promise resolves

// HTTP Status Codes:

// 200 OK → Successful request

// 201 Created → Resource created

// 400 Bad Request → Client-side error

// 404 Not Found → Resource doesn't exist

// 500 Internal Server Error → Server-side failure

// RESTful Routes:

// POST → Create

// GET → Read

// PUT → Update

// DELETE → Delete

// Complete Request Flow
// Request Comes In (e.g., POST /api/items)

// Middleware Processes (CORS + JSON parsing)

// Router Matches to itemController.createItem

// Controller:

// Validates data

// Interacts with Model (Item.save())

// Sends response

// Database (MongoDB) performs operation

// Response Sent Back to client

// Comparison with Python (FastAPI/Flask)
// Part	Node.js/Express	Python/FastAPI
// Imports	require()	import
// Routing	router.post()	@app.post()
// Database	Mongoose (MongoDB)	SQLAlchemy (SQL)
// Async	Native Promises	async/await
// Start	node server.js	uvicorn main:app
