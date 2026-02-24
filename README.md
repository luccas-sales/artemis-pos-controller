# Artemis - POS Controller

A modern and responsive web platform for monitoring fiscal POS systems, built with React, Node.js, and MongoDB. It enables the registration of POS systems and checkouts, tracks last sale and verification dates, and highlights checkouts inactive for over 5 days, designed to help prevent compliance issues with the Brazilian tax authority.

## Technologies Used

### Frontend

- **React** - JavaScript library for building user interfaces
- **React Context API** - Global state management
- **HTML5** - Semantic application structure
- **CSS3** - Styling with CSS variables and responsive design
- **Tailwind CSS** - Utility-first CSS framework for rapid styling
- **Tailwind-Animate** - Professional animation engine for motion design
- **React Router** - Declarative routing for React applications
- **Axios** - Promise-based HTTP client for API requests
- **React Hook Form** - Performant and flexible form management
- **Yup** - Schema-based validation for runtime values
- **React Icons** - Popular icon packs for React applications
- **i18next (React-i18next)** - Internationalization support (EN/PT-BR) with dynamic language switching

### Backend

- **Node.js** - JavaScript runtime environment
- **Express** - Web framework for Node.js
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **Cors** - Cross-origin resource sharing middleware
- **Dotenv** - Environment variables configuration
- **Helmet** - Security headers for Express
- **Joi** - Schema-based data validation

### Tools and Services

- **Vite** - Next-generation frontend tooling
- **Vercel** - Frontend hosting
- **MongoDB Atlas** - Cloud database
- **Insomnia** - API testing
- **VS Code** - Development environment

## Features

### Monitoring & Analytics

- General Statistics - High-level dashboard showing the total count of checkouts and active critical alerts.
- Visual Health Status - Real-time status identification using Green (Active) and Red (Critical) color-coded cards.
- Multi-unit Oversight - Simultaneous monitoring of multiple business locations like Store Times Square, Store Paris, and Store Lago Di Como.

### Fiscal Compliance (The 5-Day Rule)

- Inactivity Alerts - Automated flagging for checkouts with no sales registered for over 5 days.
- Detailed Tracking - Granular view of "Last Purchase" and "Last Verification" timestamps for every POS - terminal.
- Pagination Engine - Optimized navigation system for business units with high-density checkout - environments.

### Management & UX

- Interactive Modals - Dedicated UI for editing unit metadata and managing checkout lists efficiently.
- Dynamic Registration - Fast setup for new POS terminals and business addresses with built-in validation.
- Fluid UI/UX - Animations via Tailwind-Animate and a fully responsive grid system built with Tailwind CSS.
- Data Consistency - Seamless synchronization between frontend forms and the MongoDB database.
- Internationalization (i18n) - Multi-language support (English and Brazilian Portuguese) with real-time language switching.

## Security

- Security Headers - Protection against common vulnerabilities via helmet
- Input Validation - Client and server-side verification using joi and yup
- CORS Configured - Restricted access control for authorized domains
- Data Sanitization - Built-in protection against injection via Mongoose schemas

## Environment Setup

1. **Prerequisites**

   ```bash
   Node.js >= 22.x
   MongoDB >= 5.x
   ```

2. **Installation**

   ```bash
   # Clone the repository
   git clone https://github.com/luccas-sales/artemis-pos-controller.git

   # Install frontend dependencies
   cd ./artemis-pos-controller-front-end
   npm install

   # Install backend dependencies
   cd ../artemis-pos-controller-back-end
   npm install
   ```

3. **Configuration**
   - Create a `.env` file in the backend:
     ```
     MONGO_URL=your_mongodb_url
     NODE_ENV=your_ambient
     ```
   - Create a `.env` file in the frontend:
     ```
     VITE_AXIOS_BASE_URL="http://localhost:1507/api"
     ```

4. **Running**

   ```bash
   # Start the backend
   cd ./artemis-pos-controller-back-end
   npm run start

   # Start the frontend
   cd ./artemis-pos-controller-front-end
   npm run dev
   ```

## Project Structure

```
artemis-pos-controller/
├── artemis-pos-controller-front-end/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── pages/
│   │   └── routes/
│   └── package.json
├── artemis-pos-controller-back-end/
│   ├── config/
│   ├── models/
│   ├── routes/
│   └── package.json
└── README.md
```

## License

- ISC License - Distributed under the ISC License for open-source use.
