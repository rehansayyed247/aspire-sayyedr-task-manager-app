# 📝 Task Manager Pro - App

A modern **Task Manager web application** built with a **TypeScript-based Node.js backend**, **PostgreSQL database**, and a clean **TailwindCSS frontend**.

This project demonstrates a **full-stack application with DevOps-ready architecture**, supporting task management with a **Kanban board layout (Todo → In Progress → Done)**.

---

# 🚀 Features

### 📋 Task Management

* Create tasks with title and description
* Set **task status** (Todo / In Progress / Done)
* Add **due dates**
* Edit existing tasks
* Delete tasks

### 🎨 User Interface

* Modern **Kanban board UI**
* **Task cards** for easy visualization
* **Search tasks**
* **Dashboard counters**
* **Dark mode toggle**
* **Responsive layout**

### ⚡ Backend

* RESTful API with **Express.js**
* **TypeScript** for maintainability
* PostgreSQL database integration
* Environment variable configuration

---

# 🛠️ Tech Stack

| Layer           | Technology                    |
| --------------- | ----------------------------- |
| Backend         | Node.js, Express, TypeScript  |
| Frontend        | HTML, TailwindCSS, JavaScript |
| Database        | PostgreSQL                    |
| Runtime         | Node.js                       |
| Package Manager | npm / pnpm                    |

---

# 📂 Project Structure

```
task-manager-pro
│
├── public/
│   ├── index.html
│   ├── script.js
│
├── src/
│   ├── config/
│   │   └── db.ts
│   │
│   ├── controllers/
│   │   └── task.controller.ts
│   │
│   ├── models/
│   │   └── task.model.ts
│   │
│   ├── routes/
│   │   └── task.router.ts
│   │
│   └── server.ts
│
├── dist/              # Compiled JavaScript
├── .env
├── package.json
├── tsconfig.json
└── README.md
```

---

# 🌳 Git Branching Strategy

This project follows a **trunk-based development** workflow with protected branches and PR enforcement to ensure code quality and collaboration.

### Branches

- **`main`** - Production-ready code. Protected branch requiring PR approval.
- **`develop`** - Integration branch for ongoing development. Protected branch requiring PR approval.
- **`feature/*`** - Feature branches for new development (e.g., `feature/add-user-auth`).

### Workflow

1. **Create feature branches** from `develop`:
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/your-feature-name
   ```

2. **Develop and commit** changes on your feature branch.

3. **Push and create PR** to merge into `develop`:
   - PRs require at least 1 approval.
   - CI must pass.
   - No direct pushes to `main` or `develop`.

4. **Merge to main** via PR from `develop` when ready for release.

### Branch Protection Rules

- **main** and **develop** are protected:
  - Require PRs for merging.
  - Require status checks (CI) to pass.
  - Require at least 1 code review approval.
  - No force pushes.
  - No deletions.

### CI/CD

- Automated tests and builds run on PRs to `main` and `develop`.
- Merges are blocked if CI fails.

---

# 🗄️ Database Schema

Create database:

```sql
CREATE DATABASE taskdb;
```

Create table:

```sql
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'todo',
  due DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

# ⚙️ Environment Variables

Create a `.env` file in the root directory.

```
PORT=5000

DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_NAME=taskdb
DB_PORT=5432
```

---

# ▶️ Running the Application

### Install dependencies

```
npm install
```

or

```
pnpm install
```

---

### Development mode

```
npm run dev
```

---

### Build the project

```
npm run build
```

---

### Start production server

```
npm start
```

Application will run at:

```
http://localhost:5000
```

---

# 🌐 API Endpoints

| Method | Endpoint         | Description   |
| ------ | ---------------- | ------------- |
| GET    | `/api/tasks`     | Get all tasks |
| POST   | `/api/tasks`     | Create task   |
| PUT    | `/api/tasks/:id` | Update task   |
| DELETE | `/api/tasks/:id` | Delete task   |

---

# ☁️ AWS Deployment Architecture

This application can be deployed on AWS using:

```
Users
  │
Application Load Balancer
  │
EC2 Instance (Node.js App)
  │
RDS PostgreSQL
```

### Infrastructure Components

| Service         | Purpose                 |
| --------------- | ----------------------- |
| EC2             | Run Node.js server      |
| RDS PostgreSQL  | Managed database        |
| Security Groups | Network security        |
| Nginx           | Reverse proxy           |
| PM2             | Node.js process manager |

---

# 📦 Production Deployment Steps

1. Launch an **EC2 instance**
2. Install Node.js and npm
3. Clone repository

```
git clone <repo-url>
cd task-manager-pro
```

4. Install dependencies

```
npm install
```

5. Build application

```
npm run build
```

6. Start application

```
npm start
```

---

# 🔒 Production Improvements

Recommended improvements for production environments:

* Docker containerization
* CI/CD pipeline (GitHub Actions)
* AWS ECS or Kubernetes deployment
* Secrets management using AWS Secrets Manager
* Logging with CloudWatch
* Health check endpoints

---

# 📈 Future Enhancements

* User authentication (JWT)
* Multi-user task management
* Drag-and-drop Kanban board
* Notifications & reminders
* File attachments
* API documentation with Swagger

---

# 👨‍💻 Author

**Rehan Sayyed**

DevOps Engineer specializing in:

* Cloud Infrastructure (AWS)
* CI/CD pipelines
* Containerization (Docker/Kubernetes)
* Infrastructure as Code (Terraform)

---

# ⭐ Contributing

Contributions are welcome!

If you find any issues or improvements, feel free to open a **Pull Request**.

---

# 📜 License

This project is licensed under the **MIT License**.
