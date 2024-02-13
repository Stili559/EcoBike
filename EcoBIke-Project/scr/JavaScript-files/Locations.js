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
        storeImage.src = '/EcoBIke-Project/Images/eco_bike_center.jpg';
    } 
    else if(store === 'Store 2') {
        title.textContent = 'ECOBIKE TRADESQUARE MALL';
        location.innerHTML = "<strong>Location:</strong><br>St. 'John Smith' 123";
        hours.innerHTML = "<strong>Opening Hours:</strong><br>Open daily from 09:00 - 22:00";
        contact.innerHTML = "<strong>Contact us:</strong><br>+359 888 123 456";
        storeImage.src = '/EcoBIke-Project/Images/eco_bike1.jpg';
    }
    else if(store === 'Store 3') {
        title.textContent = 'EcoBike Live CityLink Mall';
        location.innerHTML = "<strong>Location:</strong><br>St. 'Mary Johnson' 456";
        hours.innerHTML = "<strong>Opening Hours:</strong><br>Open daily from 08:00 - 20:00";
        contact.innerHTML = "<strong>Contact us:</strong><br>+359 877 987 654";
        storeImage.src = '/EcoBIke-Project/Images/eco_bike_live.jpg';
    }
    else if(store === 'Store 4') {
        title.textContent = 'EcoBike South Mall';
        location.innerHTML = "<strong>Location:</strong><br>St. 'Robert Davis' 789";
        hours.innerHTML = "<strong>Opening Hours:</strong><br>Open daily from 09:00 - 23:00";
        contact.innerHTML = "<strong>Contact us:</strong><br>+359 866 345 678";
        storeImage.src = '/EcoBIke-Project/Images/eco_bike2.jpg';
    }
    else if(store === 'Store 5') {
        title.textContent = 'EcoBike Custom Galleria Burgas';
        location.innerHTML = "<strong>Location:</strong><br>St. 'Emily Wilson' 555";
        hours.innerHTML = "<strong>Opening Hours:</strong><br>Open daily from 09:00 - 22:00";
        contact.innerHTML = "<strong>Contact us:</strong><br>+359 855 222 333";
        storeImage.src = '/EcoBIke-Project/Images/eco_bike_custom.jpg';
    }
    else if(store === 'Store 6') {
        title.textContent = 'EcoBike Vision Grand Mall';
        location.innerHTML = "<strong>Location:</strong><br>St. 'James Brown' 999";
        hours.innerHTML = "<strong>Opening Hours:</strong><br>Open daily from 08:00 - 23:00";
        contact.innerHTML = "<strong>Contact us:</strong><br>+359 899 111 222";
        storeImage.src = '/EcoBIke-Project/Images/eco_bike_vision.jpg';
    }

    document.getElementById('popup-overlay').style.display = 'block';
    document.getElementById('store-popup').style.display = 'block';
    document.body.classList.add('no-scroll');
}

document.getElementById('close-popup').addEventListener('click', closePopup);
    
function closePopup() {
    document.getElementById('store-popup').style.display = 'none';
    document.getElementById('popup-overlay').style.display = 'none';
    document.body.classList.remove('no-scroll');
}

const stores = [
    {
        city: "Sofia",
        name: "EcoBike Center Sofia Ring Mall",
        imageSrc: "/EcoBIke-Project/Images/Sofia-Ring-Mall.png",
        hours: "Open daily from 10:00 - 21:00",
        id: "Store 1"
    },
    {
        city: "Berlin",
        name: "EcoBike TradeSquare Mall",
        imageSrc: "/EcoBIke-Project/Images/TradeSquare.jpg",
        hours: "Open daily from 09:00 - 22:00",
        id: "Store 2"
    },
    {
        city: "Texas",
        name: "EcoBike Live CityLink Mall",
        imageSrc: "/EcoBIke-Project/Images/CityLink-Mall.jpg",
        hours: "Open daily from 08:00 - 20:00",
        id: "Store 3"
    },
    {
        city: "Paris",
        name: "EcoBike South Mall",
        imageSrc: "/EcoBIke-Project/Images/South-Mall.jpg",
        hours: "Open daily from 09:00 - 23:00",
        id: "Store 4"
    },
    {
        city: "Burgas",
        name: "EcoBike Custom Galleria Burgas",
        imageSrc: "/EcoBIke-Project/Images/Galleria_Burgas.jpg",
        hours: "Open daily from 09:00 - 22:00",
        id: "Store 5"
    },
    {
        city: "Varna",
        name: "EcoBike Vision Grand Mall",
        imageSrc: "/EcoBIke-Project/Images/Grand_Mall.jpg",
        hours: "Open daily from 08:00 - 23:00",
        id: "Store 6"
    }
];

// Function to generate HTML for each store
function generateStoreHTML(store) {
    return `
        <div class="store">
            <div class="store-header">${store.city}</div>
            <div class="store-header-name">${store.name}</div>
            <div class="store-image">
                <img src="${store.imageSrc}">
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

function renderStores() {
    const storesContainer = document.getElementById("storesContainer");
    storesContainer.innerHTML = stores.map(generateStoreHTML).join('');
}

renderStores();
