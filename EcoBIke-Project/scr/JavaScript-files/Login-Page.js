/* Sign-up/Sign-in move animation */
const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

async function initFirebase55() {
    // Initialize Firebase
    const { initializeApp } = await import("https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js");
    const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } = await import("https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js");
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

    /* Login/Register saved in FireBase */
    document.getElementById("signInButton").addEventListener("click", function () {
    var email = document.getElementById("emailIn").value;
    var password = document.getElementById("passwordIn").value;

    var emailPattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    var passwordPattern = /(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;

    if (emailPattern.test(email) && passwordPattern.test(password)) {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("User login:", user); 
            window.location.href = "home.html";  
        })
        .catch((error) => {
            showToast("Email or password is incorrect.");
        });
    } else {
        if (!emailPattern.test(email)) {
            showToast("Please enter a valid email address.");
        } else if (!passwordPattern.test(password)) {
            showToast("Please enter a valid password with at least 6 characters and an uppercase letter.");
        }
    }
});

document.getElementById("signUpButton").addEventListener("click", function () {
    const  name = document.getElementById("name").value;
    const  email = document.getElementById("emailUp").value;
    const  password = document.getElementById("passwordUp").value;

    var namePattern = /^[A-z]{5,}$/;
    var emailPattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    var passwordPattern = /(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;

    if (namePattern.test(name) && emailPattern.test(email) && passwordPattern.test(password)) {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log("User registered:", user);      
                const myModal = new bootstrap.Modal(document.getElementById('exampleModal'));
                myModal.show();
                
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
            showToast("Please enter a name with at least 5 letters.");
        }
        else if (!emailPattern.test(email))
        {
            showToast("Please enter a valid email address.");
        } 
        else if (!passwordPattern.test(password))
        {
            showToast("Please enter a password with at least 6 characters and an uppercase letter.");
        } 
        
    }
});
}

initFirebase55()