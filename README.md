# Tags

![React](https://img.shields.io/badge/Frontend-React-61dafb?logo=react)
![Vite](https://img.shields.io/badge/Bundler-Vite-646cff?logo=vite)
![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178c6?logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Styling-TailwindCSS-38bdf8?logo=tailwindcss)
![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?logo=node.js)
![WebSocket](https://img.shields.io/badge/Protocol-WebSocket-010101?logo=websocket)
![MIT License](https://img.shields.io/badge/License-MIT-green)

# ChatApp

A modern, real-time chat application built with React (Vite + TypeScript) for the frontend and Node.js (WebSocket) for the backend. Features a clean, green-themed UI, room-based chat, and instant messaging.

Watch the full demo here: [Google Drive Video](https://drive.google.com/file/d/1aO-zEMWeZCHPbwtbyUpzXtNJ4g8IRmVv/view?usp=sharing)

## 🚀 Key Features

## Features
- Create or join chat rooms
- Real-time messaging with WebSockets
- Responsive, modern UI with Tailwind CSS
- Unique room IDs for private conversations
- Copy room ID to clipboard
- Persistent user info with localStorage

## Tech Stack
- **Frontend:** React, Vite, TypeScript, Tailwind CSS
- **Backend:** Node.js, WebSocket

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/Bhumesh01/chatApp.git
   cd chatApp
   ```

2. **Install dependencies:**
   - For the frontend:
     ```sh
     cd client
     npm install
     ```
   - For the backend:
     ```sh
     cd server
     npm install
     ```

3. **Run the app:**
   - Start the backend server:
     ```sh
     cd server
     npm run dev
     ```
   - In a new terminal, start the frontend:
     ```sh
     cd client
     npm run dev
     ```

4. **Open your browser:**
   - Visit [http://localhost:5173](http://localhost:5173)

## Usage
- Enter your name and create a room or join an existing room using its ID.
- Share the room ID with friends to chat together in real time.

## Folder Structure
```
client/    # Frontend (React + Vite)
server/    # Backend (Node.js + WebSocket)
```

## Customization
- Edit theme colors in `client/src/index.css`

## License
MIT
