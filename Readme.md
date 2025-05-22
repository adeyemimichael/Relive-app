## **ReLivee**
Welcome to ReLivee, a memory gallery app developed to help users organise their events, adventure memories. ReLivee lets users capture and relive their memories with people, places and even themselves, enhanced by an AI-powered chatbot that provides personalized recommendations with stunning visuals. Built with React, TypeScript, Vite, and Tailwind CSS, it features a memory gallery, collaborative , an AI story 


## **Table of Contents**

Features
Prerequisites
Installation
Environment Setup
Running the App Locally
Project Structure
Video Demo
Social Media
License

## **Features**

Memory Gallery: Store and view travel memories with titles, locations, images, and emotion tags, persisted using Dexie.js.
AI Chatbot: Powered by Google Gemini, it offers personalized travel recommendations based on user memories and queries, addressing users by name for a friendly experience.
Dynamic Images: Integrates Unsplash API to display high-quality images for recommended destinations, with proper photographer attribution.
Collaborative Memory Spaces: Create and share memory spaces with others.
Responsive Design: Tailwind CSS ensures a sleek, dark-mode-ready UI across devices.
Profile information and management
Robust Error Handling: Fallback mock responses ensure the chatbot works even if APIs fail.

**Prerequisites**
Before running ReLivee, ensure you have:

Node.js: Version 18.x or higher (LTS recommended).
npm: Version 9.x or higher (comes with Node.js).
Git: For cloning the repository.
API Keys:
Google Gemini API key from Google Cloud Console.
Unsplash API key from Unsplash Developers.


A modern browser (e.g., Chrome, Firefox).

**Installation**
Follow these steps to set up the project locally:
``` bash 
Clone the Repository:
git clone https://github.com/adeyemimichael/Relive-app.git
cd Relive-app
```

**Install Dependencies:**
```bash
npm install
```

This installs required packages, including:
react, react-dom, react-router-dom
@google/generative-ai (Gemini API)
lucide-react (icons)
dexie (IndexedDB)
tailwindcss, vite, typescript



**Environment Setup**
Create a .env file in the project root and add the following API keys:
VITE_GENAI_API_KEY=your-new-gemini-api-key
VITE_UNSPLASH_API_KEY=your-unsplash-access-key

Obtaining API Keys

**Google Gemini API Key:**

Go to Google Cloud Console.
Create a project or select an existing one.
Enable the Gemini API.
Navigate to APIs & Services > Credentials > Create Credentials > API Key.
Copy the key and add it as VITE_GENAI_API_KEY.
Restrict the key to the Gemini API for security.


**Unsplash API Key:**

Visit Unsplash Developers.
Sign up and create a new application (name: "ReLivee Travel Buddy").
Find the Access Key under "Keys."
Copy the key and add it as VITE_UNSPLASH_API_KEY.
Restrict to your domain (e.g., http://localhost:5173) in the Unsplash dashboard.



**Security Notes:**

Ensure .env is listed in .gitignore (already included in the repository).
Do not commit API keys to version control.
Unsplash’s demo mode limits to 50 requests/hour; request production access for higher limits if needed.

Running the App Locally

**Start the Development Server:**
``` bash
npm run dev
```

This launches Vite’s dev server, typically at http://localhost:5173.

### Open the App:

Open your browser and navigate to http://localhost:5173.
Explore the app:
/gallery: View and add memories.
/spaces: Create collaborative spaces.
/stories: Generate AI stories.
Chatbot (bottom-right Bot icon): Interact with the AI.




## **Test the Chatbot:**

Click the Bot icon.
Enter your name (e.g., “Michael”) when prompted.
Query “Find a beach” or “Hiking spots.”
Expect personalized responses (e.g., “Hey Michael, I recommend visiting Santa Barbara!... Photo by [Photographer] on Unsplash.”) with images.


 ## **Verify APIs:**

Open DevTools > Network tab.
Confirm requests to:
https://generativelanguage.googleapis.com (Gemini).
https://api.unsplash.com/search/photos (Unsplash).\s
Check images and attribution in the chatbot.



   ## **Project Structure**
Directory structure:
└── adeyemimichael-relive-app/
    ├── Readme.md
    ├── eslint.config.js
    ├── index.html
    ├── package.json
    ├── postcss.config.js
    ├── tailwind.config.js
    ├── tsconfig.app.json
    ├── tsconfig.json
    ├── tsconfig.node.json
    ├── vite.config.ts
    └── src/
        ├── App.tsx
        ├── index.css
        ├── main.tsx
        ├── vite-env.d.ts
        ├── assets/
        ├── components/
        │   ├── Chatbot.tsx
        │   ├── EmotionTag.tsx
        │   ├── MemoryCard.tsx
        │   ├── Layout/
        │   │   ├── Footer.tsx
        │   │   ├── Header.tsx
        │   │   └── Layout.tsx
        │   └── ui/
        │       ├── Button.tsx
        │       ├── Card.tsx
        │       ├── ReminderModal.tsx
        │       └── ShareModal.tsx
        ├── context/
        │   ├── AuthContext.tsx
        │   ├── MemoryContext.tsx
        │   └── ThemeContext.tsx
        ├── data/
        │   └── mockData.ts
        ├── hooks/
        │   └── useIDBStore.ts
        ├── pages/
        │   ├── Dashboard.tsx
        │   ├── HomePage.tsx
        │   ├── NotFound.tsx
        │   ├── Profile.tsx
        │   ├── SpaceDashboard.tsx
        │   └── Memory/
        │       ├── AddUploadImages.tsx
        │       ├── MemoryCreate.tsx
        │       ├── MemoryGallery.tsx
        │       └── MemoryView.tsx
        ├── types/
        │   └── index.ts
        └── utils/
            ├── genai.ts
            └── indexedDB.ts


 ## **Video Demo**
[Insert Video Demo Link Here]

GitHub: [(https://github.com/adeyemimichael)]
Twitter/X: [Insert Twitter/X Handle]

## **GitHub Repository**  
[GitHub Repo](https://github.com/adeyemimichael/Relive-app)  

## **Contributions**  

Feel free to fork the project, make improvements, and submit a pull request. 

## **License**  
This project is licensed under MIT license and it is open for modification.
