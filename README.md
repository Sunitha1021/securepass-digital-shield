# SecurePass Vault

Create a modern, premium, highly attractive, responsive web application called **SecurePass – Smart Password Generator**.

The application should look like a professional cybersecurity SaaS product and be suitable for a software developer portfolio project.

## Overall Design

* Use a modern dark cybersecurity theme.
* Create a premium and clean UI.
* Use glassmorphism cards with subtle shadows.
* Use smooth animations and hover effects.
* Add a subtle animated gradient or glowing background.
* Use a professional color palette with dark navy/black background and accent colors.
* Ensure the UI is fully responsive for desktop, tablet, and mobile.
* Use excellent spacing, typography, and visual hierarchy.
* Make the website look like a real deployed product, not a basic student project.

## Navigation Bar

Create a responsive navbar with:

* SecurePass logo
* Home
* Generator
* Password Checker
* Features
* GitHub button

The GitHub button should have a GitHub icon.

## Hero Section

Create a visually attractive hero section with:

Headline:
**Generate Strong. Stay Secure.**

Subheadline:
**Create secure, customizable passwords and analyze their strength instantly. SecurePass helps you build stronger digital security.**

Add two buttons:

* Generate Password
* Check Password

Add a visual cybersecurity/password illustration or animated security-themed UI element.

## Main Password Generator Section

Create a large modern glassmorphism card.

Include:

### Password Display

A large password output field with:

* Generated password
* Copy button
* Regenerate button

### Password Length

Create a slider.

Allow password lengths from 6 to 32 characters.

Display the selected number dynamically.

### Character Options

Create attractive toggle switches for:

* Uppercase Letters (A-Z)
* Lowercase Letters (a-z)
* Numbers (0-9)
* Symbols (!@#$%^&*)

### Password Strength

Create a visual password strength meter.

Show:

* Weak
* Fair
* Strong
* Very Strong

Display a percentage or strength score.

### Generate Button

Create a large attractive button:

**Generate Secure Password**

Add a subtle animation on hover.

## Password Analysis Section

Create a password security analysis card.

Show:

* Password Strength Score
* Estimated Entropy
* Character Types Used
* Password Length
* Security Recommendation

Use modern cards, icons, progress bars, and small visual indicators.

## Password Checker Section

Create an input where users can enter a password.

Analyze the password and display:

* Weak / Fair / Strong / Very Strong
* Password length
* Uppercase letters detected
* Lowercase letters detected
* Numbers detected
* Symbols detected
* Entropy estimate
* Security recommendations

Important:
Never store the user's password.

Display a privacy message:

**Your password is analyzed locally and is never stored.**

## Features Section

Create four attractive feature cards:

### Secure Generation

Generate strong randomized passwords.

### Password Strength Analysis

Analyze password strength and identify weaknesses.

### Customizable Passwords

Control length and character types.

### Privacy Focused

Passwords are never stored.

## How It Works Section

Create a modern 3-step process:

1. Customize your password
2. Generate a secure password
3. Copy and use it safely

Use numbered cards and icons.

## Footer

Include:

* SecurePass logo
* Built with Python and React
* GitHub link
* LinkedIn link
* Copyright

## Extra Features

Add:

* Dark and light mode toggle
* Smooth scrolling navigation
* Toast notification when password is copied
* Password generation history
* Clear history button
* Responsive mobile navigation
* Loading animations
* Subtle cybersecurity animations
* Accessible design
* Modern icons

## Important Functionality

The frontend should be prepared to connect with a Python FastAPI backend using REST APIs.

Create API integration placeholders for:

POST /generate-password

POST /analyze-password

GET /health

The application should have clean, well-organized, production-quality code with reusable components.

Use React, TypeScript, Tailwind CSS, and modern UI components.

Do not make it look like a basic password generator. Make it look like a polished cybersecurity SaaS portfolio project.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://securepass-digital-shield.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/19d4fd0c-a708-4cb0-ab1a-5ed9ad377024).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
