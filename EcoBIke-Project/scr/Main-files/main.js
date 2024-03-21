import { addFooterContent } from "../Components/Footer.js";
import { support } from "../Components/Support.js";
import { signOut } from "../Components/SignOut.js";
import { profile } from "../Components/Profile.js";
import { injectHTMLComponents } from "../Components/CheckOut.js";

// Navbar for phone opening
const navbarToggler = document.getElementById("navbarToggler");
const navbarCollapse = document.querySelector(".navbar-collapse");

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