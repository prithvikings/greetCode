# GreetCode

GreetCode is a comprehensive full-stack competitive programming platform designed for developers to practice coding, solve problems, and engage with a community. Inspired by platforms like LeetCode, it provides a seamless environment for code execution, AI-powered assistance, and structured learning.

## 🚀 Features

- **Advanced Code Editor**: Integrated with [Monaco Editor](https://microsoft.github.io/monaco-editor/) for a rich, IDE-like experience with syntax highlighting and language support.
- **Problem Solving & Submissions**: A vast library of coding challenges across various difficulty levels.
- **AI Assistance**: Integrated with **Google Gemini AI** to provide code explanations, hints, and feedback.
- **Discussion Forums**: A community space to share solutions, ask questions, and discuss problem-oriented strategies.
- **User Profiles**: Personalized Dashboards to track progress, submission history, and solved problems.
- **Admin Panel**: Robust management system for creating problems, managing users, and monitoring activities.
- **Video Solutions**: Support for video-based problem walkthroughs.
- **Real-time Performance**: Powered by **Redis** for efficient caching and high-speed data retrieval.

## 🛠️ Tech Stack

### Frontend

- **Framework**: [React](https://react.dev/) (Vite-powered)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [Radix UI](https://www.radix-ui.com/), [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Code Editor**: [Monaco Editor](https://microsoft.github.io/monaco-editor/)

### Backend

- **Environment**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) (Mongoose)
- **Caching**: [Redis](https://redis.io/)
- **Authentication**: [JWT](https://jwt.io/) & [Bcrypt](https://github.com/kelektiv/node.bcrypt.js)
- **AI Service**: [Google Generative AI (Gemini)](https://ai.google.dev/)
- **File Storage**: [Cloudinary](https://cloudinary.com/)

---

## 🏃 Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB (Local or Atlas)
- Redis Server
- API Keys for Google Gemini and RapidAPI (Judge0)

### Installation

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd greetcode
   ```

2. **Setup Backend**:

   ```bash
   cd backend
   npm install
   ```

   Create a `.env` file in the `backend` folder and add the following:

   ```env
   PORT=5000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   FRONTEND_URL=http://localhost:5173
   REDIS_HOST=your_redis_host
   REDIS_PORT=your_redis_port
   REDIS_PASSWORD=your_redis_password
   GOOGLE_GENAI_API_KEY=your_gemini_key
   rapidapi_key=your_judge0_key
   rapidapi_host=your_judge0_host
   ```

3. **Setup Frontend**:
   ```bash
   cd ../frontend
   npm install
   ```

### Running the App

1. **Start Backend**:

   ```bash
   cd backend
   npm run dev
   ```

2. **Start Frontend**:
   ```bash
   cd frontend
   npm run dev
   ```

## 📂 Project Structure

```text
greetcode/
├── backend/          # Express API, MongoDB models, Redis config
│   ├── config/       # Environment & Database configurations
│   ├── controllers/  # Request handlers
│   ├── models/       # Mongoose schemas
│   ├── routes/       # API endpoints
│   └── utils/        # Helper functions
├── frontend/         # React application
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Main application views
│   │   ├── store/      # Redux store logic
│   │   └── utils/      # Client-side helpers
└── README.md
```

## 📄 License

This project is licensed under the ISC License.
