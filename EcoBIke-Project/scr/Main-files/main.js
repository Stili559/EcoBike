import { addFooterContent } from "../Components/Footer.js";
import { support } from "../Components/Support.js";
import { signOut } from "../Components/SignOut.js";
import { profile } from "../Components/Profile.js";
import { injectHTMLComponents } from "../Components/CheckOut.js";
import { fetchAndDisplayUsers } from "../Components/Admin.js";

// Navbar for phone opening
const navbarToggler = document.getElementById("navbarToggler");
const navbarCollapse = document.querySelector(".navbar-collapse");
const email = localStorage.getItem('uiSettings');
const createBike = document.getElementById("openPopupBtn");

navbarToggler.addEventListener("click", () => {
    navbarToggler.classList.toggle("active");
    navbarCollapse.classList.toggle("active");
});
// Navbar for phone opening

// Firebase for Sign Out
signOut()
//End of Firebase for Sign Out

profile();
//End of Profile popup

// Footer 
addFooterContent();
// End of Footer

// Support
support();
//End of Support

// Function to add the checkout-modal and error message HTML
injectHTMLComponents();
// End of function to add the checkout-modal and error message HTML

// Not SignIn no profile
document.getElementById('profileBtn1').addEventListener('click', function() {
  window.open('../Login-Register/Login-Page.html', '_self');
});

// Admin access
if (email === 'c3RpbGlhbm1hbm9sb3YwNUBnbWFpbC5jb20=') {
  fetchAndDisplayUsers();
  if(createBike){
    createBike.style.display = 'block';
  }
}
// End of admin access