# 🚀 Jovial AI - Frontend

### **Unleash Your Creativity with AI-Powered Content Generation**

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Production--Ready-brightgreen?style=flat-square)]()

---

## 📖 Project Overview

**Jovial AI** is a cutting-edge, production-grade AI content generation platform designed for modern marketing teams, bloggers, and entrepreneurs. Built with a focus on speed, user experience, and scalability, Jovial AI allows users to generate high-quality blog posts, social media updates, and professional emails in seconds.

### **The Problem**
Content creation is time-consuming and often leads to "writer's block." Teams struggle to maintain consistent quality and tone across multiple channels.

### **The Solution**
Jovial AI leverages the power of Google Gemini AI to provide specialized templates that guide users to perfect outputs every time. It eliminates friction with a seamless dashboard and role-based collaboration features.

---

## 🔗 Live Links

| Type | URL |
| :--- | :--- |
| **Frontend Live** | [https://jovial-ai-frontend.vercel.app](https://jovial-ai-frontend.vercel.app) |
| **Backend API** | [https://jovial-backend-production.up.railway.app](https://jovial-backend-production.up.railway.app) |
| **GitHub Repo** | [https://github.com/mahatab6/jovial-ai-frontend](https://github.com/mahatab6/jovial-ai-frontend) |

---

## 🖼️ Preview Section

| Home Page | Dashboard Overview |
| :--- | :--- |
| ![Home Page](https://via.placeholder.com/800x450?text=Jovial+AI+Home+Page) | ![Dashboard](https://via.placeholder.com/800x450?text=Jovial+AI+Dashboard) |

| AI Generation | Mobile View |
| :--- | :--- |
| ![AI Generator](https://via.placeholder.com/800x450?text=AI+Content+Generator) | ![Mobile View](https://via.placeholder.com/400x800?text=Mobile+Responsive+View) |

---

## ✨ Features

### 🔐 Authentication Features
- [x] **Better-Auth Integration**: Secure, modern authentication.
- [x] **Social Login**: Google OAuth support for frictionless access.
- [x] **Session Persistence**: Robust cookie-based and bearer token session management.

### 🤖 AI Features
- [x] **Gemini 1.5 Integration**: High-speed, accurate content generation.
- [x] **Dynamic Prompting**: Templates provide strict instructions to AI for consistent results.
- [x] **Live Preview**: Real-time markdown rendering of generated content.

### 📊 Dashboard & User Features
- [x] **Role-Based Access**: Specialized views for ADMIN, MANAGER, and USER.
- [x] **Usage Analytics**: Track token consumption and generation history.
- [x] **Template Explorer**: Search, filter, and paginate through specialized AI templates.

### 🛠️ Admin Features
- [x] **Template Management**: Full CRUD interface for managing AI templates.
- [x] **User Moderation**: Manage roles and permissions for the entire platform.
- [x] **Global Analytics**: View system-wide health and usage stats.

---

## 🛠️ Tech Stack

### **Frontend Core**
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS & Framer Motion (Animations)

### **State & Data**
- **Data Fetching**: TanStack Query (React Query) v5
- **State Management**: Zustand
- **Form Validation**: Zod

### **Infrastructure**
- **Auth Client**: Better-Auth React
- **API Client**: Axios (with centralized interceptors)
- **Deployment**: Vercel

---

## 🏗️ Architecture

### **Folder Structure**
```bash
src/
├── app/            # Next.js App Router (Pages & API Routes)
├── components/     # UI Components (Atomic Design)
│   ├── ui/         # Shadcn Base Components
│   ├── admin/      # Admin-specific modules
│   ├── shared/     # Global reusable components
│   └── layouts/    # Navbar, Sidebar, Footer
├── hooks/          # Custom React Hooks
├── lib/            # Utility functions (Axios, utils)
├── services/       # API Service Layer
├── store/          # Zustand Global Stores
└── types/          # TypeScript Interfaces
```

### **Performance Optimizations**
- **Route Segment Config**: Leverages static and dynamic rendering appropriately.
- **Component Lazy Loading**: Uses `next/dynamic` for heavy UI components.
- **Debounced Searching**: Prevents API over-fetching during search interactions.
- **Optimistic UI Updates**: Instant feedback for role changes and content updates.

---

## 🚀 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/mahatab6/jovial-ai-frontend.git
   cd jovial-ai-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory:
   ```env
   NEXT_PUBLIC_API_URL=your_backend_url
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```

5. **Build for Production**
   ```bash
   npm run build
   ```

---

## 📈 Roadmap
- [ ] **Stripe Integration**: Monetization and subscription plans.
- [ ] **Multi-Language Support**: Content generation in 50+ languages.
- [ ] **Custom AI Tuning**: Allow users to provide their own style guides.

---

## 👨‍💻 Author
**Mahatab**
- **GitHub**: [@mahatab6](https://github.com/mahatab6)
- **Portfolio**: [Your Portfolio Link]
- **LinkedIn**: [Your LinkedIn Link]

---

## 📄 License
Distributed under the MIT License. See `LICENSE` for more information.
