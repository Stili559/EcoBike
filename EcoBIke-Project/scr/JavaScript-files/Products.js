async function ProductsFirebase() {
  const { getDatabase, ref, get  } = await import("https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js");
  const { initializeApp } = await import("https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js");
  const { getFirestore, doc, getDoc, setDoc, collection } = await import("https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js");
  const { getAuth, onAuthStateChanged } = await import("https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js");
  
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
  const db = getFirestore(app);
  const database = getDatabase(app, "https://ecobike-bb6cc-default-rtdb.europe-west1.firebasedatabase.app");

  let bikes = [];

// Function to generate HTML for each bike
function generateBikeHTML(bike) {
  return `
    <div class="bike">
      <div class="featured-car-card">
        <figure class="card-banner">
        <a href ="Detail.html?id=${bike.id}">
        <img src="${bike.imageSrc}" alt="${bike.title}" loading="lazy" width="440" height="300" class="w-100">
        </a>
        </figure>
        <div class="card-content">
          <div class="card-title-wrapper">
          <a style="display: none;" class="card-item-text type">${bike.type}</a>
            <h3 class="h3 card-title">
              <a>${bike.title}</a>
            </h3>
            <data class="year" value="${bike.year}">${bike.year}</data>
          </div>
          <ul class="card-list">
            <li class="card-list-item">
              <i class="fa-solid fa-tachometer-alt"></i>
              <span class="card-item-text speed">${bike.speed}</span>
            </li>
            <li class="card-list-item">
              <i class="fa-solid fa-battery-full"></i>
              <span class="card-item-text">${bike.range}</span>
            </li>
            <li class="card-list-item">
              <i class="fa-solid fa-bolt"></i>
              <span class="card-item-text">${bike.batteryLife}</span>
            </li>
            <li class="card-list-item">
              <i class="fa-solid fa-bicycle"></i>
              <span class="card-item-text weight">${bike.weight}</span>
            </li>
          </ul>
          <div class="card-price-wrapper">
            <p class="card-price">
              <strong>$${bike.price}</strong>
            </p>
            <button class="btn" data-id="${bike.id}">Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Function to retrieve bikes data from Firebase and generate HTML
async function fetchBikes() {
  const dbRef = ref(database, 'bikes');
  try {
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      const bikesObj = snapshot.val();
      bikes = Object.keys(bikesObj).map(key => ({
        id: key,
        ...bikesObj[key]
      }));
      renderBikes(bikes);
      initFilters();
    } else {
      console.log("No data available");
    }
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
}

// Function to render bikes on the page
function renderBikes(bikesData) {
  const bikesContainer = document.getElementById('bikeContainer');
  bikesContainer.innerHTML = '';
  Object.values(bikesData).forEach(bike => {
    const bikeHTML = generateBikeHTML(bike);
    bikesContainer.innerHTML += bikeHTML;
  });
}

// Function for calling all the functions
async function loadDataAndCart() {
  await fetchBikes(); 
  fetchCartFromFirestore(currentUserId); 
  initFilters();
}
loadDataAndCart();
fetchBikes();






// Cart Elements
const iconCart = document.querySelector('.icon-cart');
const closeCart = document.querySelector('.closeCart');
const body = document.querySelector('body');
const listCart = document.querySelector('.listCart');
const iconCartSpan = document.querySelector('.count-items');
const shadowTwo = document.querySelector('.shadowTwo');
const params = new URLSearchParams(window.location.search);
const bikeId = parseInt(params.get('id'));
const bike = bikes.find(b => b.id === bikeId);
let isVisible = false;

// Toggle Cart Visibility
iconCart.addEventListener('click', toggleCartVisibility);
closeCart.addEventListener('click', closeCartHandler);

// Populate Bike Details
async function fetchBikeDetails(bikeId) {
    const dbRef = ref(database, `bikes/${bikeId}`);
    try {
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
            const bikeData = snapshot.val();
            bikeData.id = bikeId;
            renderBikeDetails(bikeData);
        } else {
            console.log(`No bike found with ID ${bikeId}`);
        }
    } catch (error) {
        console.error("Error fetching bike details: ", error);
    }
}  

function renderBikeDetails(bikeData) {
  const detailsContainer = document.querySelector('.bike-details');
  if (detailsContainer) {
      detailsContainer.innerHTML = `
        <div class="bike-detail">
          <div class = "detailImg">
            <img src="${bikeData.imageSrc}" alt="${bikeData.title}">
          </div>
          <div class = "detailInfo">
            <h2 class = "desName">${bikeData.title}</h2>
            <p class = "desPrice">$${bikeData.price}</p>
            <div class = "detailDescription">
            ${bikeData.description}
            </div>
            <div class = "detailDescription">
            ${bikeData.descriptionTwo}
            </div>
            <div class = "datailButton">
              <button class="btn add-to-cart-btn" data-id="${bikeData.id}">ADD TO CART</button>
            </div>
          </div>
        </div>
      `;

      const addToCartBtn = detailsContainer.querySelector('.add-to-cart-btn');
      addToCartBtn.addEventListener('click', (event) => {
        let posclick = event.target;
        let product_id = posclick.getAttribute('data-id');
        addToCart(product_id)
      });
  } else {
      console.error('Details container not found');
  }
}

if (!isNaN(bikeId)) {
  fetchBikeDetails(bikeId);
} 

// Add to Cart Functionality
const bikeList = document.querySelector('.featured-car-list');
let cartAdding = [];

bikeList.addEventListener('click', addToCartHandler);

let currentUserId = null;

onAuthStateChanged(getAuth(), (user) => {
  if (user) {
    // User is signed in
    currentUserId = user.uid;
    fetchCartFromFirestore(currentUserId);
  } else {
    // User is signed out
    currentUserId = null;
  }
});

// Save Cart to Firestore
async function saveCartToFirestore(userCart, userId) {
  if (!userId) return;
  try {
    await setDoc(doc(db, "carts", userId), { cartItems: userCart });
    console.log("Cart saved successfully!");
  } catch (error) {
    console.error("Error saving cart: ", error);
  }
}

// Fetch Cart from Firestore
async function fetchCartFromFirestore(userId) {
  if (!userId) return [];
  try {
    const docRef = doc(db, "carts", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Cart data:", docSnap.data().cartItems);
      cartAdding = docSnap.data().cartItems;
      addCartToHTML();
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.error("Error fetching cart: ", error);
  }
}

const addToCart = (productId) => {
  const productIndex = cartAdding.findIndex(item => item.productId === productId);
  if (productIndex === -1) {
    cartAdding.push({ productId: productId, quantity: 1 });
  } else {
    cartAdding[productIndex].quantity++;
  }
  addCartToHTML();
  saveCartToFirestore(cartAdding, currentUserId);
};

//HTML for cart
const addCartToHTML = () => {
  listCart.innerHTML = '';
  let totalQuantity = 0;
  if (cartAdding.length > 0) {
    cartAdding.forEach(cart => {
      totalQuantity += cart.quantity;
      const productInCartIndex = bikes.findIndex((value) => value.id == cart.productId);
      if (productInCartIndex !== -1) {
        const productInCart = bikes[productInCartIndex];

        const imageSrc = productInCart.imageSrc ?? '';
        const title = productInCart.title ?? '';
        const price = productInCart.price ?? 0;

        const newCart = document.createElement('div');
        newCart.classList.add('item');
        newCart.dataset.id = cart.productId;
        newCart.innerHTML = `
          <div class="cartItem">
            <div class="cartImage">
              <img src="${imageSrc}" alt="">
            </div>
            <div class="cartName">${title}</div>
            <div class="cartPrice">$${price * cart.quantity}</div>
            <div class="cartQuantity">
              <span class="minus">-</span>
              <span>${cart.quantity}</span>
              <span class="plus">+</span>
            </div>
          </div>
        `;
        listCart.appendChild(newCart);
      }
    });
  }
  iconCartSpan.innerText = totalQuantity;
};

// Modify Cart Item Quantity
listCart.addEventListener('click', modifyCartItemQuantity);





// Check-out function
function updateCheckoutModal() {
  const checkoutItemsElement = document.getElementById('checkoutItems');
  checkoutItemsElement.innerHTML = '';
  let totalCartPrice = 0;

  cartAdding.forEach(item => {
    const bike = bikes.find(bike => bike.id === item.productId);
    if (bike) {
      const itemTotalPrice = item.quantity * bike.price;
      totalCartPrice += itemTotalPrice;

      const itemHTML = `
        <div class="checkout-item">
          <img src="${bike.imageSrc}" alt="${bike.title}" style="width:50px; height:auto;">
          <div>
            <p>${bike.title}</p>
            <p>Quantity: ${item.quantity}</p>
            <p>Price: $${bike.price}</p>
          </div>
        </div>
      `;
      checkoutItemsElement.innerHTML += itemHTML;
    }
  });

  const checkoutFieldsHTML = `
    <div class="checkout-fields">  
      <label for="NameCH">Name:</label>
      <input type="text" id="NameCH" name="checkoutname"><br><br>
      <label for="PhoneNumberCH">Phone Number</label>
      <input type="number" id="PhoneNumberCH" name="PhoneNumber"><br><br>
      <label for="AddressCH">Address</label>
      <input type="text" id="AddressCH" name="Address"><br><br>
      <label for="CityCH">City</label>
      <input type="text" id="CityCH" name="City"><br><br>
      <label for="CountryCH">Country</label>
      <input type="text" id="CountryCH" name="Country"><br><br>
      <button id="finalizeOrder">Place Order</button>
    </div>
  `;
  checkoutItemsElement.innerHTML += checkoutFieldsHTML;

  document.getElementById('checkoutTotal').innerText = `$${totalCartPrice.toFixed(2)}`;
}

document.querySelector('.modal .close').addEventListener('click', function() {
  this.parentElement.parentElement.style.display = 'none';
});

document.querySelector('.checkOut').addEventListener('click', function() {
  document.querySelector('body').classList.remove('showCart');
  document.querySelector('.shadowTwo').style.display = 'none';
  isVisible = false;
  updateCheckoutModal();
  document.getElementById('checkoutModal').style.display = 'block';
});





//Helper functions
function toggleCartVisibility() {
  body.classList.toggle('showCart');
  shadowTwo.style.display = isVisible ? 'none' : 'block';
  isVisible = !isVisible;
}

function closeCartHandler() {
  body.classList.remove('showCart');
  shadowTwo.style.display = 'none';
  isVisible = false;
}

function addToCartHandler(event) {
  const posclick = event.target;
  if (posclick.classList.contains('btn')) {
    const productId = posclick.getAttribute('data-id');
    addToCart(productId);
  }
}

function modifyCartItemQuantity(event) {
  const clickedElement = event.target;
  if (clickedElement.classList.contains('minus') || clickedElement.classList.contains('plus')) {
    const productId = clickedElement.closest('.item').dataset.id;
    const type = clickedElement.classList.contains('plus') ? 'plus' : 'minus';
    changeQuantity(productId, type);
  }
}

const changeQuantity = (productId, type) => {
  const quantityChecker = cartAdding.findIndex((value) => value.productId == productId);
  if (quantityChecker >= 0) {
    switch (type) {
      case 'plus':
        cartAdding[quantityChecker].quantity++;
        break;
      case 'minus':
        if (cartAdding[quantityChecker].quantity > 1) {
          cartAdding[quantityChecker].quantity--;
        } else {
          cartAdding.splice(quantityChecker, 1);
        }
        break;
    }
  }
  addCartToHTML();
  saveCartToFirestore(cartAdding, currentUserId);
};
}
ProductsFirebase();





//Filters
function initFilters() {
  const speedFilterSelect = document.getElementById('speed-filter');
  const weightFilterSelect = document.getElementById('weight-filter');
  const bikeList = document.querySelector('.featured-car-list');
  const clearFiltersButton = document.getElementById('clear-filters-button');
  const sortLowToHighButton = document.getElementById('sort-low-to-high');
  const sortHighToLowButton = document.getElementById('sort-high-to-low');
  const yearFilterSelect = document.getElementById('year-filter');
  const checkboxes = document.querySelectorAll('#price-ranges input[type="checkbox"]');
  const toggleFiltersButton = document.getElementById('toggle-filters-button');

  const bikes = Array.from(bikeList.children);
  const originalBikesOrder = Array.from(bikes);

  // Price range for checkboxes
  const priceRanges = {
      'range-0-400': [0, 400],
      'range-400-600': [401, 599],
      'range-600-800': [600, 800],
  };

  // Compare bike prices
  const comparePrices = (a, b) => {
      const priceA = parseFloat(a.querySelector('.card-price strong').textContent.replace('$', ''));
      const priceB = parseFloat(b.querySelector('.card-price strong').textContent.replace('$', ''));
      return priceA - priceB;
  };

  // Update bike list
  const updateBikeList = (bikeArray) => {
    bikeList.innerHTML = ''; 
    if (bikeArray.length > 0) {
        bikeArray.forEach((bike) => {
            bikeList.appendChild(bike);
        });
    } else {
        bikeList.innerHTML = ' <img class = "notFound" src="https://firebasestorage.googleapis.com/v0/b/ecobike-bb6cc.appspot.com/o/itemNotFound.png?alt=media&token=e17013a0-ae20-48d1-ba37-6784199a0c64">';
    }
  };

// Function for working filters
function filterBikes() {
  const searchInput = document.getElementById('title-search').value.toLowerCase();
  const selectedType = document.getElementById('type-filter').value;
  const selectedSpeedRange = speedFilterSelect.value;
  const selectedWeightRange = weightFilterSelect.value;
  const selectedYear = yearFilterSelect.value;
  const selectedPriceRanges = [];

  let [minSpeed, maxSpeed] = selectedSpeedRange !== 'all' ? selectedSpeedRange.split('-').map(Number) : [0, Infinity];
  let [minWeight, maxWeight] = selectedWeightRange !== 'all' ? selectedWeightRange.split('-').map(Number) : [0, Infinity];

  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      const rangeId = checkbox.id;
      selectedPriceRanges.push(priceRanges[rangeId]);
    }
  });

  // Connected filters
  const filteredBikes = originalBikesOrder.filter((bike) => {
    
    const bikePrice = parseFloat(bike.querySelector('.card-price strong').textContent.replace('$', ''));
    const bikeYear = bike.querySelector('.year').getAttribute('value');
    const bikeSpeed = parseFloat(bike.querySelector('.speed').textContent);
    const bikeWeight = parseFloat(bike.querySelector('.weight').textContent);
    const bikeTitle = bike.querySelector('.card-title a').textContent.toLowerCase();
    const bikeType = bike.querySelector('.type').textContent.trim();

    const isSpeedMatch = bikeSpeed >= minSpeed && bikeSpeed <= maxSpeed;
    const isYearMatch = selectedYear === 'all' || bikeYear === selectedYear;
    const isPriceMatch = selectedPriceRanges.length === 0 || selectedPriceRanges.some(([minPrice, maxPrice]) => bikePrice >= minPrice && bikePrice <= maxPrice);
    const isWeightMatch = bikeWeight >= minWeight && bikeWeight <= maxWeight;
    const isTitleMatch = bikeTitle.includes(searchInput);
    const isTypeMatch = selectedType === 'all' || bikeType === selectedType;

    return isYearMatch && isPriceMatch && isSpeedMatch && isWeightMatch && isTitleMatch && isTypeMatch;
  });

  updateBikeList(filteredBikes);
}

  // Event listeners for all filters
  toggleFiltersButton.addEventListener('click', function() {
    var filters = document.getElementById('price-ranges');
    if (filters.style.display === "none" || filters.style.display === "") {
      filters.style.display = "flex";
      this.textContent = "Hide Filters";
    } else {
      filters.style.display = "none";
      this.textContent = "Show Filters";
    }
  });

  checkboxes.forEach((checkbox) => checkbox.addEventListener('change', filterBikes));
  sortLowToHighButton.addEventListener('click', () => {
    bikes.sort(comparePrices);
    updateBikeList(bikes);
  });

  sortHighToLowButton.addEventListener('click', () => {
    bikes.sort(comparePrices).reverse();
    updateBikeList(bikes);
  });

  document.getElementById('type-filter').addEventListener('change', filterBikes);
  document.getElementById('title-search').addEventListener('input', filterBikes);

  speedFilterSelect.addEventListener('change', filterBikes);
  weightFilterSelect.addEventListener('change', filterBikes);
  yearFilterSelect.addEventListener('change', filterBikes);
  clearFiltersButton.addEventListener('click', () => {
    weightFilterSelect.value = 'all';
    yearFilterSelect.value = 'all';
    speedFilterSelect.value = 'all';
    document.getElementById('title-search').value = '';
    document.getElementById('type-filter').value = 'all';
    checkboxes.forEach((checkbox) => checkbox.checked = false);
    filterBikes(); 
  });

    // Adjust filters for different screens
  function adjustForViewport() {
    const filters = document.getElementById('price-ranges');
    const toggleButton = document.getElementById('toggle-filters-button');
    if (window.innerWidth > 1200) {
      filters.style.display = 'flex';
      toggleButton.style.display = 'none';
    } else {
      filters.style.display = 'none';
      toggleButton.style.display = 'inline-block';
    }
  }
  
  window.addEventListener('load', adjustForViewport);
  
  window.addEventListener('resize', adjustForViewport);
}