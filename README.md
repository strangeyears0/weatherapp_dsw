# Neo-Brutalist Weather App 🌤️

A modern, highly stylized weather application built with React, Redux, and Tailwind CSS, featuring a distinctive **Neo-Brutalist** design language.



## 🎨 Features

### **Visual & UX**
- **Neo-Brutalist Design**: Bold typography (Space Grotesk), high contrast colors, hard shadows, and thick borders.
- **Dark/Light Mode**: Fully supported theming that completely transforms the color palette.
- **Responsive Layout**: Mobile-first design with a unified bottom navigation bar.

### **Functionality**
- **Real-time Weather**: Current conditions, humidity, wind speed, pressure, and more.
- **Detailed Forecasts**:
  - **Hourly**: Scrollable timeline of upcoming weather.
  - **5-Day**: Overview of the week ahead.
- **Smart Search**: Find any city globally and add it to your favorites instantly.
- **Favorites System**: Pin your most pertinent cities to the home screen (persisted locally).
- **Unit Conversion**: Seamless toggle between Metric (°C) and Imperial (°F) units across the entire app.

## 🛠️ Tech Stack

- **Framework**: [React 18](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Routing**: [React Router v6](https://reactrouter.com/)
- **Icons**: Material Symbols Outlined

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/strangeyears0/weatherapp_dsw.git
   cd weatherapp_dsw
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:3000` to see the app in action.

## 📂 Project Structure

```
src/
├── components/
│   ├── layout/       # Navbar, Layout wrappers
│   └── ...
├── pages/
│   ├── Home.jsx      # Main dashboard with favorites/featured
│   ├── Search.jsx    # Search interface
│   ├── Settings.jsx  # App configuration & favorites management
│   └── CityDetails.jsx # Detailed weather view
├── store/
│   ├── slices/       # Redux slices (weather, settings, favorites)
│   └── index.js      # Store configuration
└── ...
```

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---
*Created as a semester project for DSW Autumn 2024.*
