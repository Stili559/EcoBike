const navbarToggler = document.getElementById("navbarToggler");
const navbarCollapse = document.querySelector(".navbar-collapse");

navbarToggler.addEventListener("click", () => {
    navbarToggler.classList.toggle("active");
    navbarCollapse.classList.toggle("active");
});

async function initFirebase55() {
    // Initialize Firebase
    const { initializeApp } = await import("https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js");
    const { getAuth, signOut } = await import("https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js");
    const { getFirestore } = await import("https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js");

    const firebaseConfig = {
        apiKey: "AIzaSyDEffEyjkHl-hztawckeSD1qFYAI4vCDUI",
        authDomain: "ecobike-bb6cc.firebaseapp.com",
        projectId: "ecobike-bb6cc",
        storageBucket: "ecobike-bb6cc.appspot.com",
        messagingSenderId: "73199752449",
        appId: "1:73199752449:web:7288aedbefb7cedd6bb700",
        measurementId: "G-Q1N62R5827"
      };
      
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const auth = getAuth(app);

document.getElementById("signOutButton").addEventListener("click", function () {
    signOut(auth)
        .then(() => {
            console.log("User signed out");
            window.location.href = "Login-Page.html";
        })
        .catch((error) => {
            console.error("Error signing out:", error);
        });
});
}

initFirebase55()

// Function to scroll to the top of the page
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' 
    });
}

document.getElementById('topBtn').addEventListener('click', scrollToTop);