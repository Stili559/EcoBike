document.getElementById("signInButton").addEventListener("click", function () {
    // Get the values of email and password input fields
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    // Perform validation
    var emailPattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    var passwordPattern = /(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;

    if (emailPattern.test(email) && passwordPattern.test(password)) {
        // Redirect to the home page if both email and password are valid
        window.location.href = "home.html";
    } else {
        // Display an error message or take other appropriate actions for invalid input
    
    }
});