// Support popup
export function support() {
    document.addEventListener("DOMContentLoaded", function() {
        var footerSection  = `
        <div id = "supportPopup" class="support">
            <form id="supportForm" action="https://api.web3forms.com/submit" method="POST">
                <div class="support-container" style = "margin-top: 10rem;">
                    <div class="support-box">
                        <div class="support-left"></div>
                        <div class="support-right">
                        <span class="close-btnS">&times;</span>
                            <h2>Reach Us</h2>
                            <input type="hidden" name="access_key" value="8b5a32e6-c25c-4d2b-a7af-b4a27b3207df">
                            <input type="text"  name="name"  class="support-field" placeholder="Your Name" required>
                            <input type="email" name="email" class="support-field" placeholder="Your Email" required>
                            <textarea name="message"  placeholder="Message" class="support-field" required></textarea>
                            <button type = "submit" class="support-btn">Send</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        `;
    
            document.body.insertAdjacentHTML('beforeend', footerSection);
         
            var form = document.getElementById('supportForm');
            var closeBtnS = document.querySelector('.close-btnS');
            var popupS = document.getElementById('supportPopup');
            var btnS = document.getElementById('supportLink');
        
            if (btnS) {
                btnS.onclick = function() {
                    popupS.style.display = 'block';
                    document.body.classList.add('no-scroll');
                    form.reset();
                };
            }
    
            closeBtnS.onclick = function() {
                popupS.style.display = 'none';
                document.body.classList.remove('no-scroll');
            };
    
    });
}