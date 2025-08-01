# 🚕 Go Together API

## 🎯 Project Overview
A secure, scalable, and role-based backend API for a ride sharing system (like Uber, Pathao) built with **Express.js**, **Mongoose**, **TyepScript**.

This API allows:
- Riders to request.
- Drivers to accept, complete rides, and manage availability.
- Admins to manage users, drivers, and rides.

## 🔑 Core Business Logic & Features

### 🔐 Authentication & Authorization
- JWT-based authentication with **three roles**: `admin`, `rider`, `driver`
- Secure password hashing using bcrypt
- Role-based route protection

### 🧍 Rider Features
- Request a ride with pickup & destination locations
- Cancel a ride (before pickup the ride by a driver)
- View ride history

### 🚗 Driver Features
- Accept or reject ride requests
- Update ride status (`Picked Up → In Transit → Completed`)
- View earnings history
- Set availability status (Online/Offline)

### 🛠 Admin Features
- View all users, drivers, and rides
- Approve or suspend drivers
- Block or unblock users

### 📦 Ride Management Logic
- Full ride lifecycle with statuses:
  - `requested → accepted → picked_up → in_transit → completed`
- Cancellation handling and timestamp logging
- Ride conflict and edge case handling

## 🧩 API Endpoints (Summary)

### Riders
- `POST /rides/request` → Request a ride
- `PATCH /rides/:id/status` → Only allowed to cancel ride by sending data in body
- `GET /rides/history` → View ride history

### Drivers
- `PATCH /rides/:id/status` → To accept and updated ride status
- `GET /drivers/earning` → View earnings history
- `PATCH /drivers/active` → Set availability status

### Admin
- `GET /users` → View all users
- `PATCH /drivers/approve/:id` → Approve driver
- `PATCH /drivers/suspend/:id` → Suspend driver
- `PATCH /users/block/:id` → Block/unblock users
- `GET /rides/all-rides` → View all rides

## 🧠 Business Rules
- Suspended drivers cannot accept rides
- A driver can only have one active ride
- Only active driver can accept ride
- Riders cannot have multiple active rides
- Role-based route protection for each endpoint

## 📁 Project Structure
```
src/
├── modules/
│   ├── auth/
│   ├── user/
│   ├── driver/
│   ├── ride/
    ├── feedback/
├── middlewares/
├── config/
├── utils/
├── app.ts
```

## ⚙️ Environment Variables
You must create a `.env` file in the **root folder** with the following variables:

```
MONGODB_URI=<your_mongodb_connection_string>
PORT=<server_port>
NODE_ENV=development | production
EXPRESS_SESSION_SECRET=<your_session_secret>
BCRYPT_SALT_ROUND=<number_of_salt_rounds>
JWT_ACCESS_SECRET=<access_token_secret>
JWT_ACCESS_EXP=<access_token_expiration>
JWT_REFRESH_SECRET=<refresh_token_secret>
JWT_REFRESH_EXP=<refresh_token_expiration>
```

## 📬 Postman Collection
A **Postman demo JSON** file is provided in the **root folder** for testing all API requests.

---
📌 **Extra Features:** Optional features like driver ratings, rider feedback, fare estimation.