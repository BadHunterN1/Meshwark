# MeshWark - Modern React App

A modern React application built with the latest technologies including Vite, React 19, Tailwind CSS v4, React Query, Firebase, and Framer Motion.

## 🚀 Technologies Used

- **React 19** - Latest React with concurrent features
- **Vite** - Fast build tool and development server
- **React Router DOM v7** - Client-side routing
- **TanStack Query (React Query)** - Data fetching and caching
- **Firebase** - Backend as a Service (Firestore, Auth, etc.)
- **Tailwind CSS v4** - Utility-first CSS framework
- **Lucide React** - Beautiful and consistent icons
- **Framer Motion** - Animation library for React

## 📦 Installed Packages

### Dependencies

- `react-router-dom` ^7.7.1 - Routing
- `lucide-react` ^0.536.0 - Icons
- `@tanstack/react-query` ^5.84.1 - Data fetching
- `firebase` ^12.0.0 - Backend services
- `framer-motion` ^12.23.12 - Animations

### Dev Dependencies

- `tailwindcss` ^4.1.11 - CSS framework
- `postcss` ^8.5.6 - CSS processing
- `autoprefixer` ^10.4.21 - CSS vendor prefixes

## 🛠️ Setup Instructions

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start development server:**

   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

## 🔧 Configuration

### Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Get your Firebase configuration
3. Update the `firebaseConfig` object in `src/App.jsx`
4. Uncomment the Firebase initialization code

### Tailwind CSS

The project is configured with Tailwind CSS v4. The configuration files are:

- `tailwind.config.js` - Tailwind configuration
- `postcss.config.js` - PostCSS configuration
- `src/index.css` - Global styles with Tailwind directives

## 📁 Project Structure

```
src/
├── App.jsx          # Main application component
├── index.css        # Global styles with Tailwind
└── main.jsx         # Application entry point
```

## 🎨 Features Demonstrated

- **Routing** - Multi-page navigation with React Router
- **Data Fetching** - React Query for API calls and caching
- **Animations** - Smooth transitions with Framer Motion
- **Icons** - Beautiful icons from Lucide React
- **Styling** - Modern UI with Tailwind CSS
- **Responsive Design** - Mobile-first approach

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Open [http://localhost:5173](http://localhost:5173) in your browser

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔗 Useful Links

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [React Query Documentation](https://tanstack.com/query)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
