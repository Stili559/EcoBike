// Function for opening popups with different information and for rendering the HTML for each popup
function openPopup(store) {
    var title = document.getElementById('popup-title');
    var location = document.getElementById('popup-location');
    var hours = document.getElementById('popup-hours');
    var contact = document.getElementById('popup-contact');
    var storeImage = document.getElementById('small-image');
    
    if(store === 'Store 1') {
        title.textContent = 'ECOBIKE CENTER SOFIA RING MALL';
        location.innerHTML = "<strong>Location:</strong><br>St. 'Alexander Stamboliyski' 101";
        hours.innerHTML = "<strong>Opening Hours:</strong><br>Open daily from 10:00 - 21:00";
        contact.innerHTML = "<strong>Contact us:</strong><br>+359 889 274 774";
        storeImage.src = 'https://firebasestorage.googleapis.com/v0/b/ecobike-bb6cc.appspot.com/o/eco_bike_center.jpg?alt=media&token=116e1c3e-7286-4cee-837b-f2ef619c6632';
    } 
    else if(store === 'Store 2') {
        title.textContent = 'ECOBIKE TRADESQUARE MALL';
        location.innerHTML = "<strong>Location:</strong><br>St. 'John Smith' 123";
        hours.innerHTML = "<strong>Opening Hours:</strong><br>Open daily from 09:00 - 22:00";
        contact.innerHTML = "<strong>Contact us:</strong><br>+359 888 123 456";
        storeImage.src = 'https://firebasestorage.googleapis.com/v0/b/ecobike-bb6cc.appspot.com/o/eco_bike1.jpg?alt=media&token=b0b34a21-95b5-4290-bd8a-46d10a0d9fae';
    }
    else if(store === 'Store 3') {
        title.textContent = 'EcoBike Live CityLink Mall';
        location.innerHTML = "<strong>Location:</strong><br>St. 'Mary Johnson' 456";
        hours.innerHTML = "<strong>Opening Hours:</strong><br>Open daily from 08:00 - 20:00";
        contact.innerHTML = "<strong>Contact us:</strong><br>+359 877 987 654";
        storeImage.src = 'https://firebasestorage.googleapis.com/v0/b/ecobike-bb6cc.appspot.com/o/eco_bike_live.jpg?alt=media&token=8a18d37f-56ae-4c58-b325-72b28db7f0b2';
    }
    else if(store === 'Store 4') {
        title.textContent = 'EcoBike South Mall';
        location.innerHTML = "<strong>Location:</strong><br>St. 'Robert Davis' 789";
        hours.innerHTML = "<strong>Opening Hours:</strong><br>Open daily from 09:00 - 23:00";
        contact.innerHTML = "<strong>Contact us:</strong><br>+359 866 345 678";
        storeImage.src = 'https://firebasestorage.googleapis.com/v0/b/ecobike-bb6cc.appspot.com/o/eco_bike2.jpg?alt=media&token=64c7efe2-8dff-40e3-907c-92fc39906594';
    }
    else if(store === 'Store 5') {
        title.textContent = 'EcoBike Custom Galleria Burgas';
        location.innerHTML = "<strong>Location:</strong><br>St. 'Emily Wilson' 555";
        hours.innerHTML = "<strong>Opening Hours:</strong><br>Open daily from 09:00 - 22:00";
        contact.innerHTML = "<strong>Contact us:</strong><br>+359 855 222 333";
        storeImage.src = 'https://firebasestorage.googleapis.com/v0/b/ecobike-bb6cc.appspot.com/o/eco_bike_custom.jpg?alt=media&token=0b2d283e-ea0f-480a-b711-711585339e33';
    }
    else if(store === 'Store 6') {
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

// Information for different stores
const stores = [
    {
        city: "Sofia",
        name: "EcoBike Center Sofia Ring Mall",
        imageSrc: "https://firebasestorage.googleapis.com/v0/b/ecobike-bb6cc.appspot.com/o/Sofia-Ring-Mall.png?alt=media&token=ba929338-dd7c-4fba-9a33-4d2bd53d9550",
        hours: "Open daily from 10:00 - 21:00",
        id: "Store 1"
    },
    {
        city: "Berlin",
        name: "EcoBike TradeSquare Mall",
        imageSrc: "https://firebasestorage.googleapis.com/v0/b/ecobike-bb6cc.appspot.com/o/TradeSquare.jpg?alt=media&token=c5611b96-add2-40ab-98dd-50edc2e3e028",
        hours: "Open daily from 09:00 - 22:00",
        id: "Store 2"
    },
    {
        city: "Texas",
        name: "EcoBike Live CityLink Mall",
        imageSrc: "https://firebasestorage.googleapis.com/v0/b/ecobike-bb6cc.appspot.com/o/CityLink-Mall.jpg?alt=media&token=e42d2428-91fd-45f1-83bf-7746f4149f61",
        hours: "Open daily from 08:00 - 20:00",
        id: "Store 3"
    },
    {
        city: "Paris",
        name: "EcoBike South Mall",
        imageSrc: "https://firebasestorage.googleapis.com/v0/b/ecobike-bb6cc.appspot.com/o/South-Mall.jpg?alt=media&token=2859d599-37f8-49d8-839b-dccc983d7a3a",
        hours: "Open daily from 09:00 - 23:00",
        id: "Store 4"
    },
    {
        city: "Burgas",
        name: "EcoBike Custom Galleria Burgas",
        imageSrc: "https://firebasestorage.googleapis.com/v0/b/ecobike-bb6cc.appspot.com/o/Galleria_Burgas.jpg?alt=media&token=8987c1c7-ec69-4251-b3fe-7d04db3d721d",
        hours: "Open daily from 09:00 - 22:00",
        id: "Store 5"
    },
    {
        city: "Varna",
        name: "EcoBike Vision Grand Mall",
        imageSrc: "https://firebasestorage.googleapis.com/v0/b/ecobike-bb6cc.appspot.com/o/Grand_Mall.jpg?alt=media&token=ef5a0794-3cd8-41c9-94fb-e0ce25bb1b45",
        hours: "Open daily from 08:00 - 23:00",
        id: "Store 6"
    }
];
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
                <button class="store-button" onclick="openPopup('${store.id}')">Explore the Store</button>
            </div>
        </div>
    `;
}
//End of HTML generator

// Function to rendering the HTML for each store
function renderStores() {
    const storesContainer = document.getElementById("storesContainer");
    storesContainer.innerHTML = stores.map(generateStoreHTML).join('');
}

renderStores();
//End of rendering