# 🌍 TripNext - Travel Planning Platform

TripNext is a full-stack travel planning platform that helps users discover destinations, create travel plans, bookmark favorite places, and share reviews. The application provides a seamless travel planning experience with secure authentication and efficient data management.

## 🚀 Features

### 🔐 Authentication & Authorization
- User Registration and Login
- JWT-based Authentication
- Protected Routes
- Secure Password Handling

### 🗺️ Destination Management
- Browse Travel Destinations
- Search Destinations by Name
- View Destination Details
- Destination Recommendations

### 📌 Bookmarking System
- Save Favorite Destinations
- Manage Personal Bookmark List
- Quick Access to Saved Places

### ⭐ Review & Rating System
- Add Reviews for Destinations
- View User Reviews
- Rating-Based Feedback

### 👤 User Dashboard
- Manage Profile Information
- View Bookmarked Destinations
- Track Travel Activities

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router
- Axios
- CSS / Tailwind CSS

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

### Authentication
- JSON Web Token (JWT)
- bcrypt.js

---

## 📂 Project Structure

```bash
TripNext/
│
├── client/                 # React Frontend
│   ├── src/
│   ├── public/
│
├── server/                 # Node.js Backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│
├── README.md
└── package.json
```

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/tripnext.git
cd tripnext
```

### 2. Install Backend Dependencies

```bash
cd server
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../client
npm install
```

### 4. Configure Environment Variables

Create a `.env` file inside the server directory.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret
```

### 5. Run Backend Server

```bash
cd server
npm start
```

### 6. Run Frontend

```bash
cd client
npm start
```

---

## 🔗 REST APIs

The platform includes 15+ RESTful APIs such as:

| Method | Endpoint | Description |
|----------|----------|-------------|
| POST | /api/auth/register | Register User |
| POST | /api/auth/login | Login User |
| GET | /api/destinations | Get All Destinations |
| GET | /api/destinations/:id | Get Destination Details |
| GET | /api/search | Search Destinations |
| POST | /api/bookmarks | Add Bookmark |
| GET | /api/bookmarks | Get User Bookmarks |
| DELETE | /api/bookmarks/:id | Remove Bookmark |
| POST | /api/reviews | Add Review |
| GET | /api/reviews/:destinationId | Get Reviews |

---

## 🔒 Security Features

- JWT Authentication
- Password Hashing using bcrypt
- Protected API Routes
- Input Validation
- Error Handling Middleware

---

## 📈 Performance Optimizations

- Optimized MongoDB Schema Design
- Indexed Frequently Queried Fields
- Efficient API Response Handling
- Modular Backend Architecture

---

## 🎯 Future Enhancements

- AI-Based Travel Recommendations
- Trip Itinerary Generator
- Google Maps Integration
- Hotel & Flight Booking Integration
- Real-Time Weather Updates
- Social Sharing Features

---

## 📸 Screenshots

Add your project screenshots here.

```md
![Home Page]("screenshots/Screenshot 2026-06-09 100150.png")
![Destination Page]("screenshots/Screenshot 2026-06-09 100239.png")
![Dashboard](screenshots/dashboard.png)
```

---

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a new branch

```bash
git checkout -b feature-name
```

3. Commit your changes

```bash
git commit -m "Added new feature"
```

4. Push to GitHub

```bash
git push origin feature-name
```

5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Shivam Kumar Singh**

GitHub: https://github.com/shivam-singh084

LinkedIn: https://linkedin.com/in/your-linkedin-profile
