import { addFooterContent } from "../Components/Footer.js";

// Navbar for phone opening
const navbarToggler = document.getElementById("navbarToggler");
const navbarCollapse = document.querySelector(".navbar-collapse");

navbarToggler.addEventListener("click", () => {
    navbarToggler.classList.toggle("active");
    navbarCollapse.classList.toggle("active");
});
// Navbar for phone opening

// Firebase for Sign Out authatication
async function signOut() {
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

    // Sign Out Button function
    document.body.addEventListener('click', function(event) {
        if (event.target.id === 'signOutButton') {
            signOut(auth)
                .then(() => {
                    console.log("User signed out");
                    window.location.href = "Login-Page.html";
                })
                .catch((error) => {
                    console.error("Error signing out:", error);
                });
        }
    });
    // End of Sign Out Button function
}

signOut()
//End of Firebase authatication

// Function to scroll to the top of the page
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' 
    });
}
//End of scroll function

// Define the HTML content for the profile popup
document.getElementById('topBtn').addEventListener('click', scrollToTop);
const email = localStorage.getItem('userEmail');
const name = localStorage.getItem('userName');
document.addEventListener("DOMContentLoaded", function() {
    var profilePopupHTML = `
        <div id="profilePopup" class="profile-popup">
            <div class="profile-container">
                <div class="profile-header">
                <h2>User Profile</h2>
                    <span class="close-btn">&times;</span>
                </div>
                <div class="profile-body">
                    <div class="profile-info">
                    <p><strong>Name:</strong> <span id="userName">${name}</span></p>
                    <p><strong>Email:</strong> <span id="userEmail">${email}</span></p>
                    </div>
                    <div class="containerButton">
                    <button id="signOutButton">Sign Out</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', profilePopupHTML);
    //End of HTML content

    // Profile popup
    var popup = document.getElementById('profilePopup');
    var btn = document.getElementById('profileBtn');
    var closeBtn = document.querySelector('.close-btn');
    var checkoutPopup = document.getElementById('checkoutModal')
    
    if (btn) {
        btn.onclick = function() {
            popup.style.display = 'block';
            document.body.classList.add('no-scroll');
        };
    }

    closeBtn.onclick = function() {
        popup.style.display = 'none';
        document.body.classList.remove('no-scroll');
    };

    window.onclick = function(event) {
        if (event.target === popup || event.target === checkoutPopup) {
            popup.style.display = 'none';
            document.getElementById('checkoutModal').style.display = 'none';
            document.body.classList.remove('no-scroll');
        }
    };
});
//Profile popup

// Footer 
  addFooterContent();
// End of Footer
