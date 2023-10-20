document.getElementById("signInButton").addEventListener("click", function () {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    var emailPattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    var passwordPattern = /(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;

    if (emailPattern.test(email) && passwordPattern.test(password)) {
       
        window.location.href = "home.html";
    } else {
       
    }
});