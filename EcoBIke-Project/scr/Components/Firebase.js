// firebase.js
export async function initializeFirebase() {
    const { initializeApp } = await import("https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js");
    
    const firebaseConfig = {
        apiKey: "AIzaSyDEffEyjkHl-hztawckeSD1qFYAI4vCDUI",
        authDomain: "ecobike-bb6cc.firebaseapp.com",
        projectId: "ecobike-bb6cc",
        storageBucket: "ecobike-bb6cc.appspot.com",
        messagingSenderId: "73199752449",
        appId: "1:73199752449:web:7288aedbefb7cedd6bb700",
        measurementId: "G-Q1N62R5827"
      };  

    return initializeApp(firebaseConfig);
  }
  