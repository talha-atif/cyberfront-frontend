Setting Up Cyberfront Frontend

This repository contains the frontend code for Cyberfront, built using React and Tailwind CSS.
Installation

To get started, follow these steps:

Create React App

    npx create-react-app cyberfront-frontend
    cd cyberfront-frontend

Install Tailwind CSS

    npm install -D tailwindcss
    npx tailwindcss init

In tailwind.config.js, add the following:

    /** @type {import('tailwindcss').Config} */
    module.exports = {
      content: [
        "./src/**/*.{js,jsx,ts,tsx}",
      ],
      theme: {
        extend: {},
      },
      plugins: [],
    };

Set Up Tailwind CSS in Index.css
In src/index.css, include Tailwind CSS:

    @tailwind base;
    @tailwind components;
    @tailwind utilities;

Install Dependencies
Install necessary packages for the project:

    npm install react-scripts@latest react-table react-icons react-router-dom recharts axios

Running the Application

To start the development server, run:

    npm run start

This will launch the Cyberfront frontend in your browser at http://localhost:3000. Any changes made in the code will automatically reload the application. Happy coding! 🚀
