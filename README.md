# Pet Adoption Platform - Server

## Purpose
Backend REST API for the Pet Adoption Platform. Built with Express.js, MongoDB, JWT authentication, and Passport Google OAuth.

## Live URL
- Server: https://pet-adoption-server-6v5r.onrender.com
- Client: https://pet-adoption-client-rho-jet.vercel.app

## Features
- JWT authentication with HTTPOnly cookies
- Google OAuth 2.0 login via Passport
- User registration with password validation
- Pet CRUD operations with image upload (ImgBB)
- Adoption request system with approve/reject workflow
- MongoDB $regex search and $in filter
- Seed data route for demo population
- Role-based access control (owner cannot adopt own pet)
- Secure environment variable configuration

## NPM Packages
- express, mongoose, cors, dotenv, cookie-parser
- bcryptjs, jsonwebtoken
- passport, passport-google-oauth20
- nodemon (dev)
