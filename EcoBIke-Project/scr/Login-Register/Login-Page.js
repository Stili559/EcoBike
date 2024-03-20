import { showToast } from "../Components/Alert.js";
import { initializeFirebase } from "../Components/Firebase.js";
import { showSuccessModal } from "../Components/Success.js";

// Sign-up/Sign-in move animation
const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});
//End of animation

// Firebase for authitication
async function login_Register() {
    const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider,sendEmailVerification, sendPasswordResetEmail } = await import("https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js");
    const { getFirestore } = await import("https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js"); 

    const app = await initializeFirebase();
    const db = getFirestore(app);
    const auth = getAuth(app);
  
    // Set SameSite=None and Secure for cookies
    const authProvider = new GoogleAuthProvider();
    authProvider.setCustomParameters({
        prompt: 'select_account',
        'sameSite': 'None',
        'secure': true
    });
    //End of secure cookies

    // Forgot Password logic
    document.getElementById("forgotPasswordLink").addEventListener("click", function () {
        const email = document.getElementById("emailIn").value;
    
        if (email.trim() === "") {
            showToast("Please enter your email address.");
            return;
        }
        sendPasswordResetEmail(auth, email)
        .then(() => {
            showSuccessModal("Password reset email sent. Please check your inbox.");
        })
    });
    //End of password logic

    // Sign-in information saved in FireBase(authitication logic)
    document.getElementById("signInButton").addEventListener("click", function () {
    var email = document.getElementById("emailIn").value;
    var password = document.getElementById("passwordIn").value;

    var emailPattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    var passwordPattern = /(?=.[a-zA-Z]*.*[0-9]).{6,}$/;

    if (emailPattern.test(email) && passwordPattern.test(password)) {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("User login:", user); 
            localStorage.setItem('userEmail', user.email);
            window.location.href = "../Home/Home.html";  
        })
        .catch((error) => {
            showToast("Incorrect Email or password.");
        });
    } else {
        if (!emailPattern.test(email)) {
            showToast("Please enter a valid email address.");
        } else if (!passwordPattern.test(password)) {
            showToast("Please enter a password.");
        }
    }
});
//End of logic for sign-in

// Register information saved in FireBase(authitication logic)
document.getElementById("signUpButton").addEventListener("click", function () {
    const  name = document.getElementById("name").value;
    const  email = document.getElementById("emailUp").value;
    const  password = document.getElementById("passwordUp").value;
  
    var namePattern = /(?=.*[a-zA-Z].[0-9]*).{5,}$/;
    var emailPattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    var passwordPattern = /(?=.[a-zA-Z]*.*[0-9]).{6,}$/;

    if (namePattern.test(name) && emailPattern.test(email) && passwordPattern.test(password)) {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                
                const user = userCredential.user;
                console.log("User registered:", user); 
                sendEmailVerification(auth.currentUser);
                showSuccessModal("Your account has been created! Please sign-in.");
                
                document.getElementById("name").value = "";
                document.getElementById("emailUp").value = "";
                document.getElementById("passwordUp").value = "";
            })
            .catch((error) => {
                if (error.code === "auth/email-already-in-use") 
                {
                    showToast("Email is already registered.");
                }
            });
    } 
    else 
    {
        if (!namePattern.test(name)) 
        {
            showToast("Please enter a name with at least 5 characters.");
        }
        else if (!emailPattern.test(email))
        {
            showToast("Please enter a valid email address.");
        } 
        else if (!passwordPattern.test(password))
        {
            showToast("Please enter a password with at least 6 characters and a number.");
        } 
        
    }
});
//End of logic for registration
}

login_Register()
//End of Firebase authitication