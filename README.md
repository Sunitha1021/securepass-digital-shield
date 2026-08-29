# 🔐 SecurePass – Smart Password Generator

> **Generate Strong. Stay Secure.**

SecurePass is a modern, full-stack cybersecurity web application that helps users **generate strong passwords and analyze password strength** through an intuitive and responsive interface.

Built with **React, TypeScript, Tailwind CSS, and Python FastAPI**, SecurePass demonstrates frontend development, REST API integration, password-security concepts, and cloud deployment.

## 🚀 Live Demo

### 🌐 [Try SecurePass Live](https://securepass-digital-shield-fpj9q0e1u-ss8172127-6479.vercel.app/)

## 🔗 Project Links

| Resource               | Link                                                                                                      |
| ---------------------- | --------------------------------------------------------------------------------------------------------- |
| 🌐 Live Website        | [SecurePass](https://securepass-digital-shield-fpj9q0e1u-ss8172127-6479.vercel.app/)                      |
| 🎨 Frontend Repository | [securepass-digital-shield](https://github.com/Sunitha1021/securepass-digital-shield)                     |
| ⚙️ Backend Repository  | [SecurePass-Smart-Password-Generator](https://github.com/Sunitha1021/SecurePass-Smart-Password-Generator) |

---

## 📌 Overview

SecurePass provides users with tools to improve their password security.

Users can:

* Generate customizable secure passwords
* Adjust password length
* Select character types
* Check password strength
* View password security analysis
* Estimate entropy
* Receive security recommendations
* Copy generated passwords
* Maintain and clear password-generation history

The application is designed with a **professional cybersecurity SaaS-style interface**, including responsive layouts, glassmorphism components, animations, and dark/light mode support.

---

## ✨ Features

### 🔑 Secure Password Generator

Generate randomized passwords based on user-defined requirements.

* Password length: **6–32 characters**
* Uppercase letters
* Lowercase letters
* Numbers
* Symbols
* Regenerate password
* One-click copy

### 📊 Password Strength Analysis

Analyze passwords using multiple security characteristics.

The application displays:

* Strength level
* Strength score
* Password length
* Character types detected
* Estimated entropy
* Security recommendations

### 🛡️ Password Checker

Users can enter a password and immediately receive a security analysis.

The checker identifies:

* Uppercase characters
* Lowercase characters
* Numbers
* Symbols
* Password length
* Estimated entropy
* Overall strength
* Security recommendations

> 🔒 **Privacy:** Passwords entered for analysis are not stored.

### 🎨 Modern UI

* Dark cybersecurity theme
* Light/dark mode
* Glassmorphism cards
* Responsive design
* Smooth animations
* Hover effects
* Toast notifications
* Mobile navigation
* Accessible UI
* Modern icons

### 📜 Password History

Generated passwords can be viewed through password-generation history.

Users can also clear their history when required.

---

## 🛠️ Tech Stack

### Frontend

* **React**
* **TypeScript**
* **Tailwind CSS**
* **Vite**
* Modern UI components

### Backend

* **Python**
* **FastAPI**
* **REST API**

### Deployment & Development

* **GitHub**
* **Vercel**
* Git
* Lovable

---

## 🏗️ Application Architecture

```text
                    👤 User
                       │
                       ▼
              ┌─────────────────┐
              │  SecurePass UI  │
              │ React + TS      │
              └────────┬────────┘
                       │
                       │ REST API
                       ▼
              ┌─────────────────┐
              │  FastAPI        │
              │  Python Backend │
              └────────┬────────┘
                       │
                       ▼
              ┌─────────────────┐
              │ Password        │
              │ Generation &    │
              │ Analysis Logic  │
              └────────┬────────┘
                       │
                       ▼
                  JSON Response
                       │
                       ▼
              ┌─────────────────┐
              │ SecurePass UI   │
              └─────────────────┘
```

---

## 🔌 API Integration

The frontend is designed to communicate with the Python FastAPI backend through REST APIs.

### Generate Password

```http
POST /generate-password
```

Generates a password based on the selected configuration.

### Analyze Password

```http
POST /analyze-password
```

Analyzes password strength and returns security information.

### Health Check

```http
GET /health
```

Checks whether the backend service is running.

---

## 📂 Project Structure

```text
securepass-digital-shield/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── hooks/
│   └── ...
│
├── public/
├── package.json
├── tsconfig.json
├── tailwind.config.*
├── vite.config.*
└── README.md
```

---

## ⚙️ Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/Sunitha1021/securepass-digital-shield.git
```

### 2. Navigate to the project

```bash
cd securepass-digital-shield
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

The application will be available at the local URL shown in your terminal.

---

## ⚙️ Backend

The backend source code is maintained in a separate repository.

### Backend Repository

https://github.com/Sunitha1021/SecurePass-Smart-Password-Generator

The backend is built using **Python FastAPI** and provides the REST APIs required by the frontend.

---

## 🔐 Security & Privacy

SecurePass is designed with privacy in mind.

* Passwords entered into the checker are not intentionally stored.
* Password-generation history is managed on the client side.
* The application focuses on generating and analyzing passwords without requiring users to create an account.

> **Never use a generated password directly for highly sensitive accounts without considering the security requirements of the specific service.**

---

## 🎯 Project Objectives

This project was developed to gain practical experience in:

* Full-stack web development
* React and TypeScript
* REST API integration
* Python FastAPI
* Responsive UI development
* Password-security concepts
* Frontend/backend architecture
* Git and GitHub
* Cloud deployment
* Production-style project development

---

## 👩‍💻 Author

### Sunitha

Computer Science & Engineering Student

**GitHub:**
https://github.com/Sunitha1021

---

## ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.

---

### 📄 License

This project is intended for educational and portfolio purposes.
