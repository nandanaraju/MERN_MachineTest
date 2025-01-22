# 📚 Task management App



## 📑 Table of Contents
1. 
2. [Features](#features)
3. [Installation](#installation)


---



## ✨ Features
- **Task Listings**: Access detailed information for each tasks, including descriptions, prerequisites, and features.
- **Task Add**: Explore available tasks
- **Task edit/delete**: Edit and remove tasks.

---

## 🛠 Installation

### Prerequisites
- **Node.js**: Version 14.x or later
- **npm**: Version 6.x or later
- **MongoDB**: Version 4.x or later
- **MongoDB Daemon**: Ensure MongoDB is running by checking the daemon with `sudo systemctl start mongod`.

---

## 🚀 Getting Started

1. **Clone the Repository**

   Clone the project repository from GitHub and navigate into it:
   ```bash
   git clone [repo-url]
   cd MERN_MACHINETEST
   ```
2. **Set Up the Server**

To set up the backend server:

```bash
cd backend
npm install
node server.js
```
Make sure MongoDB is running by starting the MongoDB daemon with:
```bash
sudo systemctl start mongod
```
3. **Set Up the Client**

To set up the frontend:

```bash
cd ../frontend
npm install
npm run dev
```
Once the client server is running, open your browser and visit:
http://localhost:3000
