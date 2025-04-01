# ExpoFirebaseApp

Features

Firebase Authentication integration
Google Sign-In
GitHub Sign-In
Works on iOS, Android, and Web
Fast development with Expo

Prerequisites
Before you begin, make sure you have the following:

Node.js (v14 or newer)
Expo CLI (npm install -g expo-cli)
Firebase Account
Google Cloud Platform Account
GitHub Developer Account (for GitHub authentication)

Getting Started

1. Clone the repository
   git clone https://github.com/MayuriPapat25/ExpoFirebaseApp
   cd expo-auth-starter
2. Install dependencies
   npm install or yarn install
3. Configure Firebase
   Create a new Firebase project at firebase.google.com
   Enable Authentication service and add Google and GitHub as sign-in providers
   Create a web app in your Firebase project
   Copy the Firebase configuration to firebaseConfig.js
   // firebaseConfig.js
   import { initializeApp } from 'firebase/app';
   import { getAuth } from 'firebase/auth';

const firebaseConfig = {
apiKey: "YOUR_API_KEY",
authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
projectId: "YOUR_PROJECT_ID",
storageBucket: "YOUR_PROJECT_ID.appspot.com",
messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

4. Configure OAuth Providers
   Google Authentication

Go to Google Cloud Console
Create a new project or select your existing project
Navigate to APIs & Services > Credentials
Create an OAuth 2.0 Client ID
Add these authorized redirect URIs:

For Expo Go: https://auth.expo.io/@your-username/your-app-slug
For standalone: your-app-scheme://
For web: https://your-firebase-project-id.firebaseapp.com/__/auth/handler

GitHub Authentication

Go to GitHub Developer Settings
Create a new OAuth App
Add the following Authorization callback URL:

https://your-firebase-project-id.firebaseapp.com/__/auth/handler

Note the Client ID and Client Secret

5. Update app.json
   Configure your Expo app with the proper scheme and other settings:
   jsonCopy{
   "expo": {
   "name": "Your App Name",
   "slug": "your-app-slug",
   "version": "1.0.0",
   "orientation": "portrait",
   "scheme": "your-app-scheme",
   "web": {
   "bundler": "metro"
   }
   }
   }

6. Update authentication configuration in your app
   Update the client IDs in your authentication configuration:
   javascriptCopy// For Google Auth
   const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
   expoClientId: 'EXPO_CLIENT_ID', // Only needed if using Expo Go
   iosClientId: 'IOS_CLIENT_ID',
   androidClientId: 'ANDROID_CLIENT_ID',
   webClientId: 'WEB_CLIENT_ID', // This is required
   redirectUri: Platform.select({
   native: 'https://auth.expo.io/@your-username/your-app-slug',
   default: 'https://your-firebase-project-id.firebaseapp.com/__/auth/handler'
   })
   });

// For GitHub Auth (if you're using the approach from the code)
const GITHUB_CLIENT_ID = "YOUR_GITHUB_CLIENT_ID";
const GITHUB_CLIENT_SECRET = "YOUR_GITHUB_CLIENT_SECRET";

7. Run the app
   bashCopyexpo start
