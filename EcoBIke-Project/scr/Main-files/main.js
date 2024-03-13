// Navbar for phone opening
const navbarToggler = document.getElementById("navbarToggler");
const navbarCollapse = document.querySelector(".navbar-collapse");

navbarToggler.addEventListener("click", () => {
    navbarToggler.classList.toggle("active");
    navbarCollapse.classList.toggle("active");
});
// Navbar for phone opening

// Firebase for Sign Out authatication
async function initFirebase54() {
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

initFirebase54()
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

// Footer HTML
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
  
  async function addFooterContent() {
    await delay(650); 
    const footerSection = document.getElementById('footerSection');
    footerSection.innerHTML = `
    <section class = "footer">
        <div class="footer-content">
            <h4 class = "mainText">About EcoBike</h4>
            <p class="desText">Eco bike website sells bikes with recycled frames and tires. The bikes are affordable and accessible for all people.</p>
  
            <div class="footer-icons">
                <a href="https://www.facebook.com/profile.php?id=100024002704152"><i class='bx bxl-facebook-circle'></i></a>
                <a href="https://github.com/Stili559"><i class='bx bxl-github'></i></a>
                <a href="https://www.instagram.com/st_ili/"><i class='bx bxl-instagram-alt'></i></a>
                <a href="https://www.linkedin.com/in/stilyan-manolov-112bb1199/"><i class='bx bxl-linkedin-square'></i></a>
            </div>
        </div>
  
        <div class="footer-content">
            <h4>Locations</h4>
            <ul>
                <li>Bulgaria</li>
                <li>Germany</li>
                <li>Japan</li>
                <li>France</li>
            </ul>
        </div>
  
        <div class="footer-content">
            <h4>Services</h4>
            <ul>
                <li>Replacements</li>
                <li>Repair</li>
                <li>Rent</li>
                <li>E-Bike</li>
            </ul>
        </div>
  
        <div class="footer-content">
            <h4>Contacts</h4>
            <ul>
                <li>+359-884-544-632</li>
                <li>stilianmanolov05@gmail.com</li>
                <li>stilimanolov12@gmail.com</li>
                <li>Bankya, Bulgaria</li>
            </ul>
        </div>
  
        <div class="footer-content">
            <h4>Help</h4>
            <ul>
                <li>Privacy</li>
                <li>Support</li>
                <li>Condition</li>
                <li>Other</li>
            </ul>
        </div>
        </section>
    `;
  }
  addFooterContent();
// End of Footer
