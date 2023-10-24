document.getElementById("signInButton").addEventListener("click", function () {
    var email = document.getElementById("emailIn").value;
    var password = document.getElementById("passwordIn").value;

    var emailPattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    var passwordPattern = /(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;

    if (emailPattern.test(email) && passwordPattern.test(password)) {
        window.location.href = "home.html";
    } else {
        if (!emailPattern.test(email)) {
            showToast("Please enter a valid email address");
        } else if (!passwordPattern.test(password)) {
            showToast("Please enter a valid password with at least 6 characters and an uppercase letter.");
        }
    }
});

document.getElementById("signUpButton").addEventListener("click", function () {
    var name = document.getElementById("name").value;
    var email = document.getElementById("emailUp").value;
    var password = document.getElementById("passwordUp").value;

    var namePattern = /[a-z]{6,}$/;
    var emailPattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    var passwordPattern = /(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;

    if (namePattern.test(name) && emailPattern.test(email) && passwordPattern.test(password)) {
        window.location.href = "home.html";
    } 
    else 
    {
        if (!namePattern.test(name)) 
        {
            showToast("Please enter a name with at least 6 letter.");
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

function showToast(message) {
    var toastContainer = document.getElementById("toast-container");
    var toast = document.createElement("div");
    toast.className = "toast";
    toast.role = "alert";
    toast.setAttribute("aria-live", "assertive");
    toast.setAttribute("aria-atomic", "true");

    toast.innerHTML = `
        <div class="toast-header">
            <strong class="me-auto" style = "color: black">Try Again:</strong>
            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">
            ${message}
        </div>
    `;

    toastContainer.appendChild(toast);

    var bootstrapToast = new bootstrap.Toast(toast);
    bootstrapToast.show();
}
