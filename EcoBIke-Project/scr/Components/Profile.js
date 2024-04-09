export function profile() {
    // Define the HTML content for the profile popup
    const encodedEmail = localStorage.getItem('uiSettings');
    const name = localStorage.getItem('userName');
    const email = atob(encodedEmail)
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
                        <a href="../Admin/Admin.html" id="adminPage" style = "display: none">Admin</a>
                        </div>
                        <div class="profile-header">
                        <h2>Your Orders</h2>
                        </div>
                        <div id="ordersContainer"></div>
                    </div>
                </div>
            </div>
        `;
    
        document.body.insertAdjacentHTML('beforeend', profilePopupHTML);
    //End of HTML content
    
    // Open/Close popups
        var popup = document.getElementById('profilePopup');
        var btn = document.getElementById('profileBtn');
        var closeBtn = document.querySelector('.close-btn');
        var checkoutPopup = document.getElementById('checkoutModal')
        var popupCreate = document.getElementById('popupForm');
        var btnCreate = document.getElementById('openPopupBtn');
        var closeBtnCreate = document.getElementById('closePopupBtn');
        const closeEditButton = document.getElementById('closeEditPopupBtn');
        const emailChecker = localStorage.getItem('uiSettings');
        const adminPage = document.getElementById("adminPage");

        if(closeEditButton){
        closeEditButton.addEventListener('click', function() {
        document.getElementById('editBikeForm').style.display = 'none';
        });
        }

        if (emailChecker === 'c3RpbGlhbm1hbm9sb3YwNUBnbWFpbC5jb20=') {
            if(adminPage){adminPage.style.display = '';}
        }

        if (btnCreate) {
        btnCreate.onclick = function() {
            popupCreate.style.display = "block";
            document.body.classList.add('no-scroll');
          }
        }
          
        if (closeBtnCreate) {
        closeBtnCreate.onclick = function() {
            popupCreate.style.display = "none";
            document.body.classList.remove('no-scroll');
          }
        }
        
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
            if (event.target === checkoutPopup) {
                document.getElementById('checkoutModal').style.display = 'none';
                document.body.classList.remove('no-scroll');
            }
        };
    });
}