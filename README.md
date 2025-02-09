# 🚀 User Management CRUD Portal

## 📌 Overview
This is a simple **User Management System** built using **Node.js, Express, MySQL, and EJS**. It allows users to **Create, Read, Update, and Delete (CRUD)** user records with authentication using passwords.

## 🔧 Features
✅ View total number of users
✅ Add a new user
✅ Edit an existing username
✅ Delete a user with password authentication
✅ List all users with an edit option

## 🛠️ Technologies Used
- 🟢 **Node.js** - Backend runtime
- 🌐 **Express.js** - Web framework for Node.js
- 🗄️ **MySQL** - Database to store users
- 🎭 **EJS** - Template engine for rendering views
- 🔄 **Method-Override** - Enables PUT and DELETE requests
- 🔑 **UUID** - Generates unique user IDs
- 🃏 **Faker.js** - Generates random user data

## 📂 Project Structure
```
📁 project-root
 ┣ 📂 views          # EJS templates
 ┣ 📂 node_modules   # Dependencies
 ┣ 📜 index.js       # Main server file
 ┣ 📜 package.json   # Project metadata
 ┗ 📜 README.md      # Project documentation
```

## 🚀 Setup and Installation
1️⃣ Clone the repository:
```sh
 git clone https://github.com/your-repo-url.git
```

2️⃣ Navigate to the project directory:
```sh
 cd project-root
```

3️⃣ Install dependencies:
```sh
 npm install
```

4️⃣ Configure your MySQL database:
- Create a MySQL database named `sigma_app`.
- Create a table `userss` with the following schema:
```sql
CREATE TABLE userss (
  id VARCHAR(255) PRIMARY KEY,
  username VARCHAR(255),
  email VARCHAR(255),
  password VARCHAR(255)
);
```

5️⃣ Run the server:
```sh
 nodemon index.js
```
Server will start at **http://localhost:8080** 🎉

## 🌍 Routes
| Method  | Endpoint              | Description              |
|---------|-----------------------|--------------------------|
| GET     | `/`                   | Home page                |
| GET     | `/user`               | List all users           |
| GET     | `/user/new`           | Form to add new user     |
| POST    | `/user/new`           | Create a new user        |
| GET     | `/user/:id/edit`      | Edit username form       |
| PATCH   | `/user/:id`           | Update username          |
| GET     | `/user/:id/delete`    | Confirm delete user form |
| DELETE  | `/user/:id`           | Delete a user            |

## 🤝 Contributing
Feel free to **fork** this repository and submit **pull requests**. Any contributions, issues, or feature requests are welcome! 🚀

## 📜 License
This project is **MIT Licensed**. 🎉

