# Photographer Portfolio

A modern, responsive photographer portfolio website built with React and Node.js. This application showcases photography collections with an elegant design and smooth animations.

## Features

- **Responsive Design**: Optimized for all devices and screen sizes
- **Photo Galleries**: Dynamic photo collections with smooth navigation
- **Admin Dashboard**: Secure admin panel for managing photos and collections
- **Modern UI**: Built with Tailwind CSS and Framer Motion animations
- **Authentication**: Secure login system for admin access
- **Image Upload**: Drag-and-drop photo upload functionality

## Tech Stack

### Frontend

- React 18
- React Router DOM
- Tailwind CSS
- Framer Motion
- Axios
- React Toastify
- Heroicons

### Backend

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Multer for file uploads
- bcrypt for password hashing

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone <your-repo-url>
cd photographer-portfolio
```

2. Install backend dependencies

```bash
cd backend
npm install
```

3. Install frontend dependencies

```bash
cd ../frontend
npm install
```

4. Set up environment variables

**Backend Environment Variables**
Create a `.env` file in the backend directory:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
ADMIN_PASSWORD=your_admin_password
```

**Frontend Environment Variables**
Create a `.env` file in the frontend directory:

```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_UPLOADS_URL=http://localhost:5000/api/uploads
REACT_APP_PROXY_TARGET=http://localhost:5000
```

5. Start the backend server

```bash
cd backend
npm run dev
```

6. Start the frontend development server

```bash
cd frontend
npm start
```

The application will be available at `http://localhost:3000`

## Project Structure

```
photographer-portfolio/
├── backend/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   └── pages/
│   └── package.json
```

## Deployment

### Frontend Deployment

1. Build the production version:

```bash
cd frontend
npm run build
```

2. Deploy the `build` folder to your hosting service (Netlify, Vercel, etc.)

### Backend Deployment

1. Deploy to a cloud service (Heroku, Railway, DigitalOcean, etc.)
2. Set up environment variables on your hosting platform:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `ADMIN_PASSWORD`

### Frontend Deployment

1. Update environment variables for production:
   ```env
   REACT_APP_API_URL=https://your-backend-domain.com
   REACT_APP_UPLOADS_URL=https://your-backend-domain.com/api/uploads
   ```
2. Build the production version:
   ```bash
   npm run build
   ```
3. Deploy the `build` folder to your hosting service

## Configuration

### Proxy Configuration

The application uses a flexible proxy setup for development:

- **Development**: Uses `setupProxy.js` with configurable target via `REACT_APP_PROXY_TARGET`
- **Production**: No proxy needed - frontend makes direct API calls to your deployed backend
- **Default**: If `REACT_APP_PROXY_TARGET` is not set, defaults to `http://localhost:5000`

### Customizing Contact Information

Update the contact details in `frontend/src/components/Footer.jsx`:

- Email address
- Phone number
- Location

### Branding

Modify the brand name and logo in:

- `frontend/src/components/Navigation.jsx`
- `frontend/src/components/Footer.jsx`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For support and questions, please open an issue in the repository.
