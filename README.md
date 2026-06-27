# Novus Eventra

A vibrant, interactive, and responsive web application designed for campus event management. This portal allows administrators to create events with capacity limits, while students can browse upcoming activities, check slot availability, and register in real-time.

## 🚀 Features

*   **Dynamic Event Management**: Admins can add events with titles, descriptions, locations, dates, and strict capacity (slot) limits.
*   **Real-time Availability**: The registration system automatically tracks capacity, showing real-time slot availability and disabling registration for full events.
*   **Interactive Calendar**: A visual calendar interface allows users to browse events by date.
*   **Analytics Dashboard**: Visual representation of registration data, including a department-wise breakdown via a dynamic pie chart.
*   **Theme Customization**: Built-in toggle to switch between high-contrast Dark Mode and clean Light Mode.
*   **Data Export**: Admins can export all registration data to CSV format for easy record-keeping.
*   **Responsive UI**: Modern glassmorphism design that adapts seamlessly to desktop and mobile devices.

## 🛠️ Tech Stack

*   **HTML5**: Semantic structure for all pages.
*   **CSS3**: Vibrant styling with CSS variables, Flexbox, Grid, and Glassmorphism effects.
*   **Vanilla JavaScript (ES6+)**: Handles state management, data persistence via `localStorage`, and dynamic UI rendering.

## 📋 How to Use

1.  **Home Page**: View all upcoming events sorted by date. Check slot availability before registering.
2.  **Events & Calendar**: Browse the full event calendar. Click on specific days to see event details.
3.  **Registration**: Fill out the form to secure your spot. Note that the system automatically prevents over-booking.
4.  **Admin Panel**: 
    *   **Create Event**: Set up a new event including its capacity.
    *   **Manage Data**: View all registrations, export to CSV, or clear all data.
5.  **Analytics**: View total registration counts and department-wise distribution charts.

## 📂 Project Structure

*   `index.html`: The central entry point containing the structure for all application views.
*   `style.css`: Contains the theme variables, glassmorphism card styles, and layout grids.
*   `script.js`: Contains all the application logic, including `localStorage` operations, form submission handling, and chart generation.

## 💡 Persistence
This project uses the browser's `localStorage` to persist data between sessions. Your events and registration data will remain available as long as you use the same browser.

## 👤 Author
Developed as a high-performance student portal to simplify campus activity engagement.
