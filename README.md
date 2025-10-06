# Sentinel.ai Mock Test Platform

A full-stack, AI-powered proctoring platform designed to ensure academic integrity in online examinations using real-time video, audio, and behavior analysis.

![Next.js](https://img.shields.io/badge/Next.js-000000?logo=next.js&logoColor=white&style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white&style=for-the-badge)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white&style=for-the-badge)
![Python](https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=white&style=for-the-badge)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?logo=fastapi&logoColor=white&style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white&style=for-the-badge)
![Socket.IO](https://img.shields.io/badge/Socket.IO-black?logo=socket.io&style=for-the-badge)
![JWT](https://img.shields.io/badge/JWT-black?logo=jsonwebtokens&style=for-the-badge)
![OpenCV](https://img.shields.io/badge/OpenCV-5C3EE8?logo=opencv&logoColor=white&style=for-the-badge)
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white&style=for-the-badge)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white&style=for-the-badge)

---

### ▶️ [Live Demo](https://sentinalai-jade.vercel.app/)

---

## 📖 About The Project

Sentinel.ai is a comprehensive solution for conducting secure, proctored online tests. It addresses the critical need for academic integrity by leveraging a multi-service architecture to monitor, analyze, and report on test-taker behavior in real-time. The platform's "brain" is a dedicated AI microservice that analyzes video and audio streams for violations, while a real-time backend communicates instantly with the user's browser to issue warnings and enforce rules.

The system is designed with distinct, feature-rich dashboards for both students and administrators, providing a complete end-to-end experience from test creation to detailed post-exam analysis.

![Project Screenshot](/frontend/public/s1.png)

---

## 🌟 Key Features

-   **Real-Time AI Proctoring**: Utilizes a Python-based AI service with OpenCV and WebRTC VAD to detect multiple faces, absence of the test-taker, and voice activity.
-   **Two-Tiered Violation System**: A sophisticated system of "Fatal Strikes" for critical violations and a cumulative "Suspicion Score" for minor infractions.
-   **Live Warnings & Enforcement**: Leverages Socket.IO to push instant pop-up warnings to the user and trigger server-side force-submission if rules are broken.
-   **Secure, Multi-Stage Test Environment**: A complete test flow including pre-test identity verification with photo and audio capture.
-   **Comprehensive Admin Dashboard**: Admins can view aggregate statistics, pass/fail charts, manage tests, and review every student attempt with detailed proctoring logs.
-   **Detailed Student Reports**: Students can view their scores and a full, transparent timeline of any proctoring events logged during their session.
-   **Modern, Multi-Service Architecture**: Built with a decoupled frontend (Next.js), a core backend (Node.js), and a dedicated, Dockerized AI microservice (FastAPI).

---

## 🔧 Tech Stack

This project is built with a cutting-edge, polyglot stack chosen for performance, scalability, and the specific demands of real-time AI processing.

| Technology      | Role & Justification                                                                                             |
| :-------------- | :--------------------------------------------------------------------------------------------------------------- |
| **Next.js (TS)**| **Frontend Framework**: Chosen for its high performance, file-based routing, and excellent developer experience for building a modern, responsive UI. |
| **Node.js** | **Core Backend Runtime**: Its event-driven model is perfect for handling API requests and managing real-time connections with Socket.IO. |
| **Express.js** | **Backend Framework**: A minimal and flexible framework for Node.js used to build the main REST API for tests, users, and attempts. |
| **Python** | **AI Language**: The industry standard for machine learning and computer vision tasks.                               |
| **FastAPI** | **AI Service Framework**: A high-performance Python framework used to build the AI microservice, chosen for its speed and automatic API documentation. |
| **MongoDB** | **Database**: A NoSQL database used for its flexible schema, making it ideal for storing user data, tests, and nested proctoring logs. |
| **Socket.IO** | **Real-Time Engine**: The core of the live warning system, enabling instant, bidirectional communication between the server and clients. |
| **JWT** | **Authentication**: Provides a secure, stateless method for authenticating users and protecting API routes based on roles (student vs. admin). |
| **OpenCV** | **Computer Vision**: The primary AI library used in the Python service for detecting the presence and number of faces in video frames. |
| **WebRTC VAD** | **Audio Analysis**: A high-quality library used for Voice Activity Detection to identify human speech in audio clips. |
| **Docker** | **Containerization**: Used to create a reproducible, isolated environment for the FastAPI service, ensuring system dependencies like `ffmpeg` are correctly installed. |
| **Tailwind CSS**| **CSS Framework**: For rapid, utility-first styling to build the professional, dark-themed UI. |
| **Vercel & Render** | **Cloud Hosting**: Vercel for the frontend and Render for the backend services, providing seamless CI/CD and generous free tiers. |

---

## 📦 Getting Started

This is a monorepo project with three distinct services. To get a local copy up and running, follow these simple steps.

### Prerequisites

-   **Node.js** (`v18` or higher) & **npm**
-   **Python** (`v3.9` or higher) & **pip**
-   A **MongoDB** instance (local or a free cloud instance from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
-   **Docker Desktop** (optional, for running the AI service locally in a container)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/vikasgautam2003/ai_cheating_in_test_detector.git](https://github.com/vikasgautam2003/ai_cheating_in_test_detector.git)
    cd ai_cheating_in_test_detector
    ```
2.  **Setup the Node.js Backend (`packages/server`):**
    ```bash
    cd packages/server
    npm install
    ```
    Create a `.env` file in this directory and add:
    ```env
    MONGO_URI="your_mongodb_connection_string"
    JWT_SECRET="your_super_secret_jwt_key"
    ```

3.  **Setup the AI Backend (`packages/proctor-ai`):**
    ```bash
    cd ../proctor-ai
    python3 -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    pip install -r requirements.txt
    ```

4.  **Setup the Next.js Frontend (`packages/web`):**
    ```bash
    cd ../web
    npm install
    ```
    Create a `.env.local` file in this directory and add:
    ```env
    NEXT_PUBLIC_API_URL=http://localhost:5000
    NEXT_PUBLIC_AI_API_URL=http://localhost:8000
    ```

### ▶️ Running the App

You need to run all three services concurrently in three separate terminal windows.

1.  **Start the Node.js Backend:**
    ```bash
    # In packages/server
    npm start
    ```

2.  **Start the AI Backend:**
    ```bash
    # In packages/proctor-ai (with venv activated)
    uvicorn main:app --reload --port 8000
    ```

3.  **Start the Next.js Frontend:**
    ```bash
    # In packages/web
    npm run dev
    ```

The application will be available at `http://localhost:3000`.

---

## 📁 Project Structure

This project uses a monorepo structure to manage the three separate services.

├── packages/
│   ├── web/          # Next.js Frontend
│   ├── server/       # Node.js + Express Backend
│   └── proctor-ai/   # Python + FastAPI AI Microservice
├── .gitignore
├── package.json      # (Optional root package.json for workspace management)
└── README.md


---

## 🎯 Future Roadmap

-   [ ] **Phase 5: Averted Gaze Detection**: Implement head-pose estimation using **MediaPipe** to detect when a user is looking away from the screen for an extended period.
-   [ ] **Comprehensive Test Analytics**: Add more charts and graphs to the admin dashboard, such as performance per question or per test.
-   [ ] **Enhanced User Profiles**: Build out the full student profile page with personal statistics and achievements.
-   [ ] **Question Bank**: Allow admins to create a bank of questions and generate tests from it, instead of uploading a JSON for each test.

---

## 📜 License

Distributed under the MIT License.

---

## 📧 Contact

Vikas Gautam - [LinkedIn](https://www.linkedin.com/in/vikas-gautam-ab5ab8278/)

Project Link: [https://github.com/vikasgautam2003/ai_cheating_in_test_detector](https://github.com/vikasgautam2003/ai_cheating_in_test_detector)
