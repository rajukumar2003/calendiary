# Calendiary - Smart Calendar Management System

## 🌟 Overview

Calendiary is a sophisticated full-stack calendar management application that combines the power of React, Express.js, and PostgreSQL to deliver a seamless event scheduling experience. With real-time updates and intuitive interface, it's designed to make calendar management effortless.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

## 🚀 Features

- 📅 Interactive Calendar Interface
- 🔐 Secure User Authentication
- ✨ Real-time Event Management
- 👥 User Profile Management
- 📱 Responsive Design
- 🔔 Event Notifications
- 🛡️ Data Privacy & Security

## 🛠️ Technology Stack

### Frontend
- React with TypeScript
- Tailwind CSS for styling
- React Router for navigation
- React Big Calendar
- Sonner for notifications
- Axios for API requests

### Backend
- Express.js server
- PostgreSQL database
- Prisma ORM
- Firebase Authentication
- JWT token management

## 🏗️ Architecture

### Frontend Structure
```typescript
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage/>} />
        <Route path="/login" element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route
          path='/dashboard'
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />
        <Route path='/calendar' element={<CalendarApp />} />
      </Routes>
    </Router>
  )
}
```

### Key Components
- **Authentication Module**: Handles user login/signup
- **Calendar Module**: Manages event display and interaction
- **Profile Module**: Handles user information management
- **Event Module**: Manages event CRUD operations

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL
- npm or yarn
- Firebase account

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/rajukumar2003/calendiary.git
   cd calendiary
   ```

2. **Install Dependencies**
   ```bash
   # Install frontend dependencies
   cd frontend
   npm install

   # Install backend dependencies
   cd ../backend
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Frontend (.env)
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_domain
   VITE_API_URL=http://localhost:3000

   # Backend (.env)
   DATABASE_URL="postgresql://user:password@localhost:5432/calendiary"
   JWT_SECRET=your_jwt_secret
   ```

4. **Database Setup**
   ```bash
   cd backend
   npx prisma migrate dev
   ```

5. **Start the Application**
   ```bash
   # Start backend
   cd backend
   npm run dev

   # Start frontend
   cd frontend
   npm run dev
   ```

## 🔒 Security

- JWT-based authentication
- Firebase security rules
- Input validation & sanitization
- Protected API routes
- Secure password handling

## 🧪 Testing

```bash
# Run frontend tests
cd frontend
npm test

# Run backend tests
cd backend
npm test
```

## 📖 API Documentation

### Authentication Endpoints
- `POST /api/auth/login`
- `POST /api/auth/register`
- `POST /api/auth/logout`

### Event Endpoints
- `GET /api/events`
- `POST /api/events`
- `PUT /api/events/:id`
- `DELETE /api/events/:id`

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Development Guidelines

- Follow TypeScript best practices
- Write unit tests for new features
- Follow the existing code style
- Document API endpoints
- Keep components modular

## 🎯 Future Enhancements

- [ ] Calendar sharing capabilities
- [ ] Integration with external calendars
- [ ] Mobile application
- [ ] Advanced event recurrence
- [ ] Team calendar management

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👏 Acknowledgments

- React Team
- Firebase Team
- Express.js Team
- PostgreSQL Team
- Prisma Team
- All contributors

## 📞 Contact

- GitHub: [@rajukumar2003](https://github.com/rajukumar2003)
- Project Link: [https://github.com/rajukumar2003/calendiary](https://github.com/rajukumar2003/calendiary)

---
⭐️ If you find this project useful, please consider giving it a star!
