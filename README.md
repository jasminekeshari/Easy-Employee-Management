Easy Employee Management
A simple yet powerful Employee Management System built with the MERN stack (MongoDB, Express.js, React.js, Node.js).
The application allows HR teams and managers to efficiently manage employee records, roles, and performance data.

🚀 Live Demo: https://easy-employee-management.vercel.app/
📂 GitHub Repo: https://github.com/jasminekeshari/Easy-Employee-Management

📌 Features
Employee CRUD – Add, update, view, and delete employee records.

Role Management – Assign roles and permissions.

Search & Filter – Quickly find employees by name, department, or role.

Responsive UI – Works seamlessly on desktop and mobile.

Secure Backend – REST API with Express.js & MongoDB.

Deployment Ready – Hosted on Vercel (frontend) and connected to MongoDB Atlas.

🛠 Tech Stack
Frontend:

React.js

React Router

CSS / Tailwind / Bootstrap (depending on your project setup)

Backend:

Node.js

Express.js

MongoDB Atlas (Cloud Database)

Other Tools:

Axios for API calls

dotenv for environment variables

📂 Folder Structure
csharp
Copy
Edit
Easy-Employee-Management/
│
├── client/               # Frontend (React)
│   ├── public/
│   └── src/
│
├── server/               # Backend (Node + Express)
│   ├── models/           # MongoDB Schemas
│   ├── routes/           # API Endpoints
│   └── server.js
│
└── README.md
⚙️ Installation & Setup
Clone the repository

bash
Copy
Edit
git clone https://github.com/jasminekeshari/Easy-Employee-Management.git
cd Easy-Employee-Management
Install dependencies for both client & server

bash
Copy
Edit
cd server
npm install
cd ../client
npm install
Set up environment variables
Create a .env file inside the server folder:

ini
Copy
Edit
MONGO_URI=your_mongodb_connection_string
PORT=5000
Run the backend

bash
Copy
Edit
cd server
npm start
Run the frontend

bash
Copy
Edit
cd client
npm start
📸 Screenshots
(Add some screenshots of your UI here to make it visually appealing)

📜 License
This project is open-source and available under the MIT License.















