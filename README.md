# Soccer Nerds ⚽️

**Soccer Nerds** is a sleek, user-friendly web application designed for football enthusiasts. It provides a central hub to track live scores, browse upcoming matches, and review past results. With a clean interface and intuitive controls, staying updated with your favorite teams has never been easier.

![Soccer Nerds App Screenshot](https://firebasestorage.googleapis.com/v0/b/ai-prototyping-llc.appspot.com/o/generators%2F3155e714-424a-4b52-a544-bc9a5026c4f0%2F988229b4-71c1-4209-afab-c6e3b2e532b2.png?alt=media)

---

## ✨ Features

- **Live Match View**: A dedicated section for ongoing matches, showing real-time scores and key details.
- **Comprehensive Match Listings**: Easily switch between upcoming fixtures and finished match results for the selected day.
- **Interactive Date Picker**: Navigate through days with a smooth, horizontal calendar.
- **Team Search**: Quickly find matches for a specific team using the search bar.
- **Detailed Statistics**: Click on any match to view in-depth statistics, goal timelines, and more.
- **Fan Zone**: A personalized profile page to manage your favorite clubs and settings.
- **Responsive Design**: Fully functional and visually appealing on both desktop and mobile devices.

---

## 🛠️ Tech Stack

This project is built with a modern frontend stack, ensuring a performant and maintainable codebase.

- **Framework**: [React](https://reactjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Data Source**: [TheSportsDB API](https://www.thesportsdb.com/api.php)

---

## 🚀 Getting Started

Follow these instructions to get a local copy up and running for development and testing purposes.

### Prerequisites

You need to have [Node.js](https://nodejs.org/en/) (v16 or later) and a package manager like [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) installed on your machine.

### Installation & Setup

1.  **Clone the Repository**
    ```sh
    git clone https://github.com/your-username/soccer-nerds.git
    cd soccer-nerds
    ```

2.  **Install Dependencies**
    ```sh
    npm install
    # or
    yarn install
    ```

3.  **Set Up TheSportsDB API Key**
    This application requires an API key from TheSportsDB to fetch match data.

    - Visit [TheSportsDB API](https://www.thesportsdb.com/api.php) and get your free API key.
    - Open the file `lib/api.ts`.
    - Replace the placeholder key `'123'` with your actual API key:

    ```typescript
    // lib/api.ts

    const API_KEY = 'YOUR_API_KEY_HERE'; // Replace '123' with your key
    const BASE_URL = `https://www.thesportsdb.com/api/v1/json/${API_KEY}`;

    // ... rest of the file
    ```

### Running the Application

1.  **Start the Development Server**
    This command will start the application in development mode and open it in your default browser. The server supports hot-reloading.
    ```sh
    npm run dev
    # or
    yarn dev
    ```

2.  **Build for Production**
    To create an optimized production build of the app, run:
    ```sh
    npm run build
    # or
    yarn build
    ```
    This will generate a `dist` folder with all the static assets ready for deployment.

---
## 📂 Project Structure

The codebase is organized to be clean and scalable:

```
/
├── /components      # Reusable React components
├── /lib             # API logic and other utility functions
├── /types           # TypeScript type definitions
├── App.tsx          # Main application component
└── index.tsx        # Entry point for the React application
```

---

## 🤝 Contributing

Contributions are welcome! If you have suggestions for improvements or find a bug, please feel free to open an issue or submit a pull request.
