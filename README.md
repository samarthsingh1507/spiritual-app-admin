# Spiritual App - Mobile Application

A spiritual wellness mobile application built using **React Native and Expo**, connected with a live backend API for authentication, dashboard analytics, notifications, and user management.

The application provides users with a personalized spiritual journey experience with modules for goals, spiritual learning, financial tracking, notifications, and profile management.

---

# 📱 Features

## 🔐 Authentication
- User login system
- JWT-based authentication
- Secure token storage using AsyncStorage
- Persistent login session

---

## 🏠 Dashboard

Connected with live backend data.

Features:
- Total users overview
- Active users tracking
- Premium and Gold membership statistics
- Dynamic progress visualization

---

## 🌿 Spiritual Library

A dedicated section for spiritual content.

Includes:
- Spiritual modules
- Meditation resources
- Daily wisdom
- Audio sessions
- Learning categories

---

## 🎯 Goals Module

Features:
- Goal tracking interface
- Personal improvement activities
- Goal completion workflow

---

## 💰 Financial Module

Features:
- Financial habit tracking
- Investment tracking interface
- Wealth management activities

---

## 🔔 Notifications

Connected with backend APIs.

Features:
- Real-time notifications
- Notification history
- Pull-to-refresh updates

---

## 👤 Profile Management

Features:
- User profile display
- Account information
- Logout functionality

---

# 🏗️ Application Architecture

```
                Mobile Application
              (React Native + Expo)

                       |
                       |
                 REST APIs

                       |
                       |

              Node.js Backend

                       |
                       |

                  Database
```

---

# 🛠️ Technologies Used

## Frontend (Mobile)

- React Native
- Expo
- React Navigation
- JavaScript
- AsyncStorage
- Expo Vector Icons

---

## Backend

- Node.js
- Express.js
- REST APIs
- JWT Authentication

---

## Database

- MySQL

---

# 📂 Project Structure

```
SpiritualAppInner

src
│
├── screens
│   ├── Auth
│   ├── Dashboard
│   ├── Goals
│   ├── Spiritual
│   ├── Notifications
│   └── Profile
│
├── navigation
│
├── components
│
├── services
│   ├── authService.js
│   ├── dashboardService.js
│   ├── notificationService.js
│   └── storageService.js
│
├── theme
│
└── assets
```

---

# 🚀 Installation & Setup

## 1. Clone Repository

```bash
git clone <repository-url>
```

---

## 2. Install Dependencies

Navigate into the project:

```bash
cd SpiritualAppInner
```

Install packages:

```bash
npm install
```

---

## 3. Start Development Server

Run:

```bash
npx expo start
```

A QR code will appear.

Scan it using:

- Expo Go (Android)
- Camera App (iOS)

---

# 🔑 Backend Configuration

The application connects with the deployed backend API:

```
https://spiritual-app-admin.onrender.com
```

The backend provides:

- Authentication APIs
- Dashboard APIs
- Notification APIs
- User management APIs

---

# 🔄 Data Flow

```
User Login

     ↓

Authentication API

     ↓

JWT Token Stored

     ↓

Mobile Application

     ↓

Protected API Requests

     ↓

Backend Database

     ↓

Live Data Display
```

Example:

- Login Screen
- Dashboard
- Spiritual Library
- Notifications
- Profile

---


---

# 👨‍💻 Developer

**Samarth Singh**

Engineering Student  
Electrical and Computer Engineering

---


This project was developed as part of an internship project.
