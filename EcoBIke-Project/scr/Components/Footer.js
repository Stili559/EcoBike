// Footer
export async function addFooterContent() {

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    await delay(650); 
    
    const footerSection = document.getElementById('footerSection');
    footerSection.innerHTML = `
    <section class = "footer">
        <div class="footer-content">
            <h4 class = "mainText">About EcoBike</h4>
            <p class="desText">Eco bike website sells bikes with recycled frames and tires. The bikes are affordable and accessible for all people.</p>
  
            <div class="footer-icons">
                <a href="https://www.facebook.com/profile.php?id=100024002704152"><i class='bx bxl-facebook-circle'></i></a>
                <a href="https://github.com/Stili559"><i class='bx bxl-github'></i></a>
                <a href="https://www.instagram.com/st_ili/"><i class='bx bxl-instagram-alt'></i></a>
                <a href="https://www.linkedin.com/in/stilyan-manolov-112bb1199/"><i class='bx bxl-linkedin-square'></i></a>
            </div>
        </div>
  
        <div class="footer-content">
            <h4>Locations</h4>
            <ul>
            <li><a href="../Locations/Locations.html">Bulgaria</a></li>
            <li><a href="../Locations/Locations.html">Germany</a></li>
            <li><a href="../Locations/Locations.html">Japan</a></li>
            <li><a href="../Locations/Locations.html">France</a></li>
            </ul>
        </div>
  
        <div class="footer-content">
            <h4>Content</h4>
            <ul>
            <li><a href="../Home/Home.html">Home</a></li>
            <li><a href="../Products/Products.html">Product</a></li>
            <li><a href="../Locations/Locations.html">Locations</a></li>
            <li><a href="../About-us/About-us.html">About Us</a></li>
            </ul>
        </div>
  
        <div class="footer-content">
            <h4>Contacts</h4>
            <ul>
                <li>+359-884-544-632</li>
                <li>stilianmanolov05@gmail.com</li>
                <li>stilimanolov12@gmail.com</li>
                <li>Bankya, Bulgaria</li>
            </ul>
        </div>
  
        <div class="footer-content">
            <h4>Help</h4>
            <ul>
                <li>Privacy</li>
                <li>Support</li>
                <li>Condition</li>
                <li>Other</li>
            </ul>
        </div>
        </section>
    `;
  }
  addFooterContent();
// End of Footer
