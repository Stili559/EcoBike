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
    
    // Profile popup
        var popup = document.getElementById('profilePopup');
        var btn = document.getElementById('profileBtn');
        var closeBtn = document.querySelector('.close-btn');
        var checkoutPopup = document.getElementById('checkoutModal')
        var popupCreate = document.getElementById('popupForm');
        var btnCreate = document.getElementById('openPopupBtn');
        var closeBtnCreate = document.getElementById('closePopupBtn');

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