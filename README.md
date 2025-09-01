# Ecommerce-api

A production-ready **RESTful E-commerce Backend** built with **Node.js, Express, Mongoose/MongoDB**.  
Features authentication, OTP verification, JWT session handling, wishlist, cart, and product reviews.

---

##  Features
- **Authentication & Session**
  - Registration with  OTP verification.
  - JWT access & refresh tokens with refresh endpoint
  - Secure logout and middleware to attach `req.user`
- **Product Management**
  - Product listing, search, product details
  - Brand → Category joins using aggregation pipelines
- **Wishlist & Cart**
  - Idempotent upsert logic (`updateOne(..., { upsert: true })`)
  - Schema validation & ObjectId casting
  - Unique index on `(userID, productID)` to prevent duplicates
- **Reviews**
  - Authenticated review creation
  - Aggregated review listings with product details
- **System Architecture**
  - Clear MVC structure
  - Centralized error handling
  - Input validation for data integrity

---

## 🛠 Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Auth:** JWT, OTP

---

##  Project Structure
src/
 ┣ controllers/    # Handles API requests and responses
 ┣ services/       # Business logic (what happens behind the scenes)
 ┣ models/         # MongoDB schemas (structure of your data)
 ┣ middlewares/    # Authentication, error handling, etc.
 ┣ routes/         # API endpoints definitions
 ┗ app.js          # Main entry point to start the server

