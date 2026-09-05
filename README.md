<div align="center">

# 🐾 Pet Adoption Server

### *Backend API for Pet Adoption Platform*

![Node.js](https://img.shields.io/badge/Node.js-20-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-8-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Google OAuth](https://img.shields.io/badge/Google_OAuth-2.0-4285F4?style=for-the-badge&logo=google&logoColor=white)

[![Live API](https://img.shields.io/badge/Live_API-Render-4D6E4F?style=for-the-badge&logo=render&logoColor=white)](https://pet-adoption-server-6v5r.onrender.com)

</div>

---

## 📖 Overview

Backend REST API for the Pet Adoption platform. Handles JWT authentication with HTTPOnly cookies, Google OAuth, pet CRUD with ImgBB image upload, and adoption request workflow.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🔐 **JWT Auth** | HTTPOnly cookie-based authentication |
| 🔑 **Google OAuth** | Passport.js Google 2.0 integration |
| 🐕 **Pet CRUD** | Create, read, update, delete pets |
| 🖼️ **Image Upload** | ImgBB image hosting |
| 📋 **Adoption Workflow** | Submit, approve, reject requests |
| 🔍 **Search & Filter** | MongoDB $regex and $in queries |
| 🌱 **Database Seeder** | Pre-populated demo data |

---

## 📡 API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | No | Register user |
| POST | `/api/auth/login` | No | Login user |
| GET | `/api/auth/google` | No | Google OAuth |
| GET | `/api/pets` | No | Get all pets (search/filter) |
| POST | `/api/pets` | Yes | Create pet |
| PUT | `/api/pets/:id` | Yes | Update pet |
| DELETE | `/api/pets/:id` | Yes | Delete pet |
| POST | `/api/adoptions` | Yes | Submit adoption request |
| PUT | `/api/adoptions/:id` | Yes | Update adoption status |

---

## 🚀 Getting Started

```bash
git clone https://github.com/sojibahmedshorif25-ai/Pet-Adoption-Server.git
npm install
cp .env.example .env
npm run seed    # Seed database
npm run dev     # Start server
```

---

## 👨‍💻 Author

**Sojib Ahmed**

[![GitHub](https://img.shields.io/badge/GitHub-sojibahmedshorif25--ai-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/sojibahmedshorif25-ai)

---

<div align="center">

**⭐ Star this repo if you find it impressive!**

</div>
