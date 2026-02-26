# 🎓 AlumniX

> **Cultivate Lifelong Connections.** An exclusive platform designed to bridge the gap between ambitious students and distinguished alumni.

![AlumniX Banner](https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop)

## 📖 Overview

**AlumniX** is a centralized, premium digital platform designed to connect alumni, students, and institutions. Built with a "Modern Prestige" aesthetic, it simplifies alumni data management, fosters engagement, and strengthens lifelong connections through mentorship, exclusive events, and philanthropy.

## ✨ Key Features

*   **👥 Role-Based Access:** Dedicated portals and dashboards for Students, Alumni, and Administrators.
*   **🔍 Alumni Directory:** Search, filter, and connect with distinguished alumni across different batches, courses, and industries.
*   **🤝 Mentorship Program:** Seamlessly connect ambitious students and recent graduates with experienced alumni for career guidance.
*   **📅 Exclusive Events:** Organize, discover, and RSVP to high-profile virtual and in-person alumni gatherings.
*   **💼 Jobs & Internships:** A dedicated job board where alumni can post opportunities exclusively for the institution's network.
*   **💝 Philanthropy:** Secure, transparent fundraising campaigns for institutional development and student scholarships.
*   **💬 Social Feed:** Stay updated with community news, achievements, and announcements.
*   **🌗 Dark/Light Mode:** Beautifully crafted themes supporting both light and dark preferences.
*   **🌐 Multi-language Support:** Fully internationalized (i18n) supporting English, Hindi, and Punjabi.

## 🛠️ Tech Stack

*   **Frontend Framework:** [React 18](https://react.dev/)
*   **Build Tool:** [Vite](https://vitejs.dev/)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/) (v4)
*   **Routing:** [React Router v6](https://reactrouter.com/)
*   **Animations:** [Framer Motion](https://motion.dev/)
*   **Icons:** [Lucide React](https://lucide.dev/)
*   **Internationalization:** [react-i18next](https://react.i18next.com/)

## 🚀 Getting Started

### Prerequisites

*   Node.js (v18 or higher recommended)
*   npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/alumnix.git
   cd alumnix
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000` (or the port specified in your terminal).

## 📂 Project Structure

```text
alumnix/
├── public/               # Static assets
├── src/
│   ├── components/       # Reusable UI components (Buttons, Cards, Dialogs)
│   ├── context/          # React Context providers (Auth, Theme)
│   ├── layouts/          # Page layouts (MainLayout with Sidebar)
│   ├── pages/            # Route components (LandingPage, Login, Dashboards)
│   ├── lib/              # Utility functions
│   ├── i18n.ts           # Internationalization setup
│   ├── App.tsx           # Main application router
│   └── index.css         # Global styles and Tailwind configuration
├── package.json          # Project dependencies and scripts
└── vite.config.ts        # Vite configuration
```

## 🎨 Design System ("Modern Prestige")

AlumniX utilizes a custom design system aimed at evoking trust, elegance, and professionalism:
*   **Typography:** *Playfair Display* for sophisticated, confident headings, paired with *Inter* for highly readable interface text.
*   **Color Palette:** Deep Navy (`#0f172a`) primary backgrounds with Subtle Gold (`#d4af37`) accents, ensuring a high-end, Ivy League aesthetic.
*   **Motion:** Buttery-smooth, deliberate animations using custom easing curves for a premium feel.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---
*Built by Students for Students & Alumni.*
