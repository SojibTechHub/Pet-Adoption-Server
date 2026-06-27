# Pet Adoption Platform - Server

## Purpose
Backend REST API for the Pet Adoption Platform. Handles authentication, pet CRUD, and adoption request workflow with secure MongoDB integration.

## Live URL
- **Server:** https://pet-adoption-server-6v5r.onrender.com
- **Client:** https://pet-adoption-client-rho-jet.vercel.app

## Features
- User authentication with JWT stored in HTTPOnly cookies
- Google OAuth 2.0 login via Passport.js
- Pet CRUD operations with ImgBB image upload support
- Adoption request system with approve/reject workflow
- MongoDB queries using `$regex` (search) and `$in` (species filter)
- Seed data route for populating demo pets
- Adoption control (owner cannot adopt own pet, only one approval per pet)
- Environment variables for secure credential management

## NPM Packages
- express, mongoose, cors, dotenv, cookie-parser
- bcryptjs, jsonwebtoken
- passport, passport-google-oauth20
- nodemon (dev dependency)
