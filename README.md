# TeXume

TeXume is a modern, full-stack LaTeX-based résumé (CV) builder that combines a Java/Spring Boot backend and a React (Vite) frontend. Designed for flexibility, scalability, and ease of use, TeXume lets you generate professional résumés with customization.

---

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [License](#license)

---

## Features

- ✨ **LaTeX-based Resume Generation** (backend in `AI-Resume-Builder/`)
- 🖥️ **Modern Frontend**: React + Vite + component-based architecture (`src/`)
- 🐳 **Docker Support**: Easy containerization and deployment
- ⚡ **Spring Boot Backend**: Robust, scalable API
- 🔌 **RESTful API**: Connects frontend and backend seamlessly
- 📄 **Template & Section Customization**
- 🌐 **Ready for Vercel/Cloud Deployment**

---

## Architecture

```
TeXume/
├── AI-Resume-Builder/   # Java Spring Boot backend (API, business logic)
│   ├── src/
│   ├── pom.xml
│   ├── Dockerfile
│   └── HELP.md
├── src/                 # React frontend (UI, routes, components)
│   ├── App.jsx
│   ├── main.jsx
│   └── components/
├── public/              # Static assets
├── package.json         # Frontend dependencies & scripts
├── vite.config.js       # Vite frontend config
├── vercel.json          # Vercel deployment config
└── README.md
```

- **Backend:** Java 21, Spring Boot, Maven, REST API (`AI-Resume-Builder/`)
- **Frontend:** React (JSX), Vite, React Router (`src/`)
- **Tools:** Monaco Editor, TeX Live
- **Deployment:** Docker, Vercel, Render

---

## Getting Started

### Prerequisites

- Java 21+
- Spring Boot
- Maven
- Docker (optional, for containerized deployment)

### Clone the repository

```bash
git clone https://github.com/shryay/TeXume.git
cd TeXume
```

### Backend Setup (`AI-Resume-Builder/`)

```bash
cd AI-Resume-Builder
./mvnw spring-boot:run
```
Or with Docker:
```bash
docker build -t texume-backend .
docker run -p 8080:8080 texume-backend
```

### Frontend Setup

```bash
npm install
npm run dev
```

---

## Usage

- Access the frontend at `http://localhost:5173`
- The backend API runs at `http://localhost:8080`
- Use the web UI to enter résumé data, and generate/download your CV.

---

## References

- [Spring Boot Docs](https://spring.io/projects/spring-boot)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- See `AI-Resume-Builder/HELP.md` for backend-specific usage and links

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

_Crafted with ♥ by [shryay](https://github.com/shryay)_
