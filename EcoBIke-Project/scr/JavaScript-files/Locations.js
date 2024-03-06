// Function for opening popups with different information and for rendering the HTML for each popup
function openPopup(store) {
    var title = document.getElementById('popup-title');
    var location = document.getElementById('popup-location');
    var hours = document.getElementById('popup-hours');
    var contact = document.getElementById('popup-contact');
    var storeImage = document.getElementById('small-image');
    
    if(store === 'Sofia') {
        title.textContent = 'ECOBIKE CENTER SOFIA RING MALL';
        location.innerHTML = "<strong>Location:</strong><br>St. 'Alexander Stamboliyski' 101";
        hours.innerHTML = "<strong>Opening Hours:</strong><br>Open daily from 10:00 - 21:00";
        contact.innerHTML = "<strong>Contact us:</strong><br>+359 889 274 774";
        storeImage.src = 'https://firebasestorage.googleapis.com/v0/b/ecobike-bb6cc.appspot.com/o/eco_bike_center.jpg?alt=media&token=116e1c3e-7286-4cee-837b-f2ef619c6632';
    } 
    else if(store === 'Berlin') {
        title.textContent = 'ECOBIKE TRADESQUARE MALL';
        location.innerHTML = "<strong>Location:</strong><br>St. 'John Smith' 123";
        hours.innerHTML = "<strong>Opening Hours:</strong><br>Open daily from 09:00 - 22:00";
        contact.innerHTML = "<strong>Contact us:</strong><br>+359 888 123 456";
        storeImage.src = 'https://firebasestorage.googleapis.com/v0/b/ecobike-bb6cc.appspot.com/o/eco_bike1.jpg?alt=media&token=b0b34a21-95b5-4290-bd8a-46d10a0d9fae';
    }
    else if(store === 'Texas') {
        title.textContent = 'EcoBike Live CityLink Mall';
        location.innerHTML = "<strong>Location:</strong><br>St. 'Mary Johnson' 456";
        hours.innerHTML = "<strong>Opening Hours:</strong><br>Open daily from 08:00 - 20:00";
        contact.innerHTML = "<strong>Contact us:</strong><br>+359 877 987 654";
        storeImage.src = 'https://firebasestorage.googleapis.com/v0/b/ecobike-bb6cc.appspot.com/o/eco_bike_live.jpg?alt=media&token=8a18d37f-56ae-4c58-b325-72b28db7f0b2';
    }
    else if(store === 'Paris') {
        title.textContent = 'EcoBike South Mall';
        location.innerHTML = "<strong>Location:</strong><br>St. 'Robert Davis' 789";
        hours.innerHTML = "<strong>Opening Hours:</strong><br>Open daily from 09:00 - 23:00";
        contact.innerHTML = "<strong>Contact us:</strong><br>+359 866 345 678";
        storeImage.src = 'https://firebasestorage.googleapis.com/v0/b/ecobike-bb6cc.appspot.com/o/eco_bike2.jpg?alt=media&token=64c7efe2-8dff-40e3-907c-92fc39906594';
    }
    else if(store === 'Burgas') {
        title.textContent = 'EcoBike Custom Galleria Burgas';
        location.innerHTML = "<strong>Location:</strong><br>St. 'Emily Wilson' 555";
        hours.innerHTML = "<strong>Opening Hours:</strong><br>Open daily from 09:00 - 22:00";
        contact.innerHTML = "<strong>Contact us:</strong><br>+359 855 222 333";
        storeImage.src = 'https://firebasestorage.googleapis.com/v0/b/ecobike-bb6cc.appspot.com/o/eco_bike_custom.jpg?alt=media&token=0b2d283e-ea0f-480a-b711-711585339e33';
    }
    else if(store === 'Varna') {
        title.textContent = 'EcoBike Vision Grand Mall';
        location.innerHTML = "<strong>Location:</strong><br>St. 'James Brown' 999";
        hours.innerHTML = "<strong>Opening Hours:</strong><br>Open daily from 08:00 - 23:00";
        contact.innerHTML = "<strong>Contact us:</strong><br>+359 899 111 222";
        storeImage.src = 'https://firebasestorage.googleapis.com/v0/b/ecobike-bb6cc.appspot.com/o/eco_bike_vision.jpg?alt=media&token=f7c47141-4e7d-40df-839a-e085849ef92c';
    }

    document.getElementById('popup-overlay').style.display = 'block';
    document.getElementById('store-popup').style.display = 'block';
    document.body.classList.add('no-scroll');
}
//End of popup information

// Function for closing the popups 
document.getElementById('close-popup').addEventListener('click', closePopup);
function closePopup() {
    document.getElementById('store-popup').style.display = 'none';
    document.getElementById('popup-overlay').style.display = 'none';
    document.body.classList.remove('no-scroll');
}
//End of closing the popups 

async function locationFirebase() {
    const { initializeApp } = await import("https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js");
    const { getDatabase, ref, set, get, child, update, remove } = await import("https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js");
    
    const firebaseConfig = {
        apiKey: "AIzaSyDEffEyjkHl-hztawckeSD1qFYAI4vCDUI",
        authDomain: "ecobike-bb6cc.firebaseapp.com",
        projectId: "ecobike-bb6cc",
        storageBucket: "ecobike-bb6cc.appspot.com",
        messagingSenderId: "73199752449",
        appId: "1:73199752449:web:7288aedbefb7cedd6bb700",
        measurementId: "G-Q1N62R5827"
      };  

    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app, "https://ecobike-bb6cc-default-rtdb.europe-west1.firebasedatabase.app");
  
// Information for different stores
const dbRef = ref(database, 'stores');
  get(dbRef).then((snapshot) => {
    if (snapshot.exists()) {
      const storeData = snapshot.val();
      const storeContainer = document.getElementById('storesContainer');
      storeContainer.innerHTML = ''; 
      Object.values(storeData).forEach(bike => {
        const storeHTML = generateStoreHTML(bike);
        storeContainer.innerHTML += storeHTML;
      });
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error("Error fetching data: ", error);
  });
//End of different stores information

// Function to generate HTML for each store
function generateStoreHTML(store) {
    return `
        <div class="store">
            <div class="store-header">${store.city}</div>
            <div class="store-header-name">${store.name}</div>
            <div class="store-image">
                <img src="${store.imageSrc}" loading="lazy">
            </div>
            <div class="store-content">
                <div class="store-hours">Opening Hours</div>
                <div class="store-hours-time">
                    <span class="storeColorText">Open daily from </span>
                    <span class="storeColorNum">${store.hours}</span>
                </div>
                <button class="store-button" onclick="openPopup('${store.city}')">Explore the Store</button>
            </div>
        </div>
    `;
}
//End of HTML generator
}
locationFirebase()