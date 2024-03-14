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
                <li>Bulgaria</li>
                <li>Germany</li>
                <li>Japan</li>
                <li>France</li>
            </ul>
        </div>
  
        <div class="footer-content">
            <h4>Services</h4>
            <ul>
                <li>Replacements</li>
                <li>Repair</li>
                <li>Rent</li>
                <li>E-Bike</li>
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
