/* Alerts for invalid information */
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