# Relive App

Relive is a web application designed to help users capture, store, and revisit their cherished memories. Built with React, TypeScript, and Tailwind CSS, it provides a modern and responsive interface for creating, viewing, and managing personal memories with emotional tags.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
- [Available Scripts](#available-scripts)
- [Contributing](#contributing)
- [License](#license)

## Features
- Create and view memories with associated emotional tags.
- User authentication (login/register).
- Responsive dashboard and profile management.
- Theme support for customizable UI.
- Memory management with a context-based state system.
- Error handling with a dedicated NotFound page.

## Tech Stack
- **Frontend**: React, TypeScript, Tailwind CSS
- **Build Tool**: Vite
- **Linting**: ESLint
- **State Management**: React Context API
- **Routing**: React Router (assumed based on page components)
- **Styling**: Tailwind CSS with PostCSS

## Project Structure
adeyemimichael-relive-app/
├── eslint.config.js          # ESLint configuration
├── index.html                # HTML entry point
├── package.json              # Project dependencies and scripts
├── postcss.config.js         # PostCSS configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── tsconfig.app.json         # TypeScript configuration for app
├── tsconfig.json             # Base TypeScript configuration
├── tsconfig.node.json        # TypeScript configuration for Node
├── vite.config.ts            # Vite configuration
└── src/
├── App.tsx               # Main app component
├── index.css             # Global styles
├── main.tsx              # Application entry point
├── vite-env.d.ts         # Vite environment types
├── assets/               # Static assets (e.g., images)
├── components/           # Reusable components
│   ├── EmotionTag.tsx    # Component for emotional tags
│   ├── MemoryCard.tsx    # Component for displaying memories
│   ├── Layout/           # Layout components
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   └── Layout.tsx
│   └── ui/               # UI component library
│       ├── Button.tsx
│       └── Card.tsx
├── context/              # React Context for state management
│   ├── MemoryContext.tsx
│   └── ThemeContext.tsx
├── data/                 # Mock data for development
│   └── mockData.ts
├── pages/                # Page components
│   ├── Dashboard.tsx
│   ├── DropDown.tsx
│   ├── HomePage.tsx
│   ├── Login.tsx
│   ├── NotFound.tsx
│   ├── Profile.tsx
│   ├── Register.tsx
│   └── Memory/
│       ├── MemoryCreate.tsx
│       └── MemoryView.tsx
└── types/                # TypeScript type definitions
└── index.ts

## Getting Started

### Prerequisites
- **Node.js**: Version 18 or higher
- **npm**: Version 9 or higher (or use yarn/pnpm if preferred)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/adeyemimichael/relive-app.git
   cd adeyemimichael-relive-app
    ```
2. Install the dependencies 
   ```bash 
   npm install
  ```

