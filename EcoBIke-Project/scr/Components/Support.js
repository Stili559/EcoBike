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
                            <input type="hidden" name="access_key" value="3987d5fb-544c-4666-a71b-d237032c2c09">
                            <input type="hidden" name="from_name" value="EcoBike Customer">
                            <input type="text"  name="name"  class="support-field" placeholder="Your Name" required>
                            <input type="email" name="email" class="support-field" placeholder="Your Email" required>
                            <textarea name="message"  placeholder="Message" class="support-field" required></textarea>
                            <button type = "submit" class="support-btn">Send</button>
                            <div id="result"></div>
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

            //Web3Form message submission on same page
            const support = document.getElementById('supportForm');
            const result = document.getElementById('result');
            
            support.addEventListener('submit', function(e) {
              e.preventDefault();
              const formData = new FormData(support);
              const object = Object.fromEntries(formData);
              const json = JSON.stringify(object);
              result.innerHTML = "Please wait..."
            
                fetch('https://api.web3forms.com/submit', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: json
                    })
                    .then(async (response) => {
                        let json = await response.json();
                        if (response.status == 200) {
                            result.innerHTML = json.message;
                        } else {
                            console.log(response);
                            result.innerHTML = json.message;
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        result.innerHTML = "Something went wrong!";
                    })
                    .then(function() {
                        support.reset();
                        setTimeout(() => {
                            result.style.display = "none";
                        }, 3000);
                    });
            });
    });
}