npx create-react-app cyberfront-frontend
cd cyberfront-frontend

npm install -D tailwindcss
npx tailwindcss init

Write this in tailwind.config.js
/** @type {import('tailwindcss').Config} \*/
module.exports = {
content: [
"./src/**/\*.{js,jsx,ts,tsx}",
],
theme: {
extend: {},
},
plugins: [],
}

In index.css
@tailwind base;
@tailwind components;
@tailwind utilities;

npm install react-scripts@latest
npm install axios
npm install recharts
npm install react-router-dom
npm install react-icons
npm install react-table

nom run start
