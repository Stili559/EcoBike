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
        storeImage.src = '/EcoBIke-Project/Images/12.png';
    } 
    else if(store === 'Store 2') {
        title.textContent = 'ECOBIKE TRADESQUARE MALL';
        location.innerHTML = "<strong>Location:</strong><br>St. 'John Smith' 123";
        hours.innerHTML = "<strong>Opening Hours:</strong><br>Open daily from 09:00 - 22:00";
        contact.innerHTML = "<strong>Contact us:</strong><br>+359 888 123 456";
        storeImage.src = '/EcoBIke-Project/Images/ring_mall_1322.jpg';
    }
    else if(store === 'Store 3') {
        title.textContent = 'EcoBike Live CityLink Mall';
        location.innerHTML = "<strong>Location:</strong><br>St. 'Mary Johnson' 456";
        hours.innerHTML = "<strong>Opening Hours:</strong><br>Open daily from 08:00 - 20:00";
        contact.innerHTML = "<strong>Contact us:</strong><br>+359 877 987 654";
        storeImage.src = '/EcoBIke-Project/Images/ring_mall_1322.jpg';
    }
    else if(store === 'Store 4') {
        title.textContent = 'EcoBike South Mall';
        location.innerHTML = "<strong>Location:</strong><br>St. 'Robert Davis' 789";
        hours.innerHTML = "<strong>Opening Hours:</strong><br>Open daily from 09:00 - 23:00";
        contact.innerHTML = "<strong>Contact us:</strong><br>+359 866 345 678";
        storeImage.src = '/EcoBIke-Project/Images/ring_mall_1322.jpg';
    }
    else if(store === 'Store 5') {
        title.textContent = 'EcoBike Custom Galleria Burgas';
        location.innerHTML = "<strong>Location:</strong><br>St. 'Emily Wilson' 555";
        hours.innerHTML = "<strong>Opening Hours:</strong><br>Open daily from 09:00 - 22:00";
        contact.innerHTML = "<strong>Contact us:</strong><br>+359 855 222 333";
        storeImage.src = '/EcoBIke-Project/Images/ring_mall_1322.jpg';
    }
    else if(store === 'Store 6') {
        title.textContent = 'EcoBike Vision Grand Mall';
        location.innerHTML = "<strong>Location:</strong><br>St. 'James Brown' 999";
        hours.innerHTML = "<strong>Opening Hours:</strong><br>Open daily from 08:00 - 23:00";
        contact.innerHTML = "<strong>Contact us:</strong><br>+359 899 111 222";
        storeImage.src = '/EcoBIke-Project/Images/ring_mall_1322.jpg';
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