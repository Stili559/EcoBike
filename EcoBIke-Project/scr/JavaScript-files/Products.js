//Filters
document.addEventListener('DOMContentLoaded', function () {
  const bikeList = document.querySelector('.featured-car-list');
  const clearFiltersButton = document.getElementById('clear-filters-button');
  const sortLowToHighButton = document.getElementById('sort-low-to-high');
  const sortHighToLowButton = document.getElementById('sort-high-to-low');
  const yearFilterSelect = document.getElementById('year-filter');
  const checkboxes = document.querySelectorAll('#price-ranges input[type="checkbox"]');

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
      bikeArray.forEach((bike) => {
          bikeList.appendChild(bike);
      });
  };

  // Function for working filters
  function updatePriceFilter() {
      const selectedPriceRanges = [];
      checkboxes.forEach((checkbox) => {
          if (checkbox.checked) {
              const rangeId = checkbox.id;
              selectedPriceRanges.push(priceRanges[rangeId]);
          }
      });
      let filteredBikes;
      if (selectedPriceRanges.length === 0) {
        filteredBikes = bikes;
    } else {
        filteredBikes = bikes.filter((bike) => {
            const bikePrice = parseFloat(bike.querySelector('.card-price strong').textContent.replace('$', ''));
            return selectedPriceRanges.some(([minPrice, maxPrice]) => bikePrice >= minPrice && bikePrice <= maxPrice);
        });
    }
    updateBikeList(filteredBikes);
  }
  // End of function for filters

  // Event listeners for all filters
  checkboxes.forEach((checkbox) => {
      checkbox.addEventListener('change', updatePriceFilter);
  });

  sortLowToHighButton.addEventListener('click', () => {
      bikes.sort(comparePrices);
      updateBikeList(bikes);
  });

  sortHighToLowButton.addEventListener('click', () => {
      bikes.sort(comparePrices);
      bikes.reverse();
      updateBikeList(bikes);
  });

  yearFilterSelect.addEventListener('change', () => {
      const selectedYear = yearFilterSelect.value;
      let filteredBikes;
      if (selectedYear === 'all') {
          filteredBikes = bikes;
      } else {
          filteredBikes = bikes.filter((bike) => {
              const bikeYear = bike.querySelector('.year').getAttribute('value');
              return bikeYear === selectedYear;
          });
      }
      updateBikeList(filteredBikes);
  });

  clearFiltersButton.addEventListener('click', () => {
      yearFilterSelect.value = 'all';
      bikes.length = 0;
      bikes.push(...originalBikesOrder);
      updateBikeList(bikes);
  });
});
//End of event listeners
//End of filters

async function ProductsFirebase() {
  const { getDatabase, ref, set, push, get,firebase,child  } = await import("https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js");
  const { initializeApp } = await import("https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js");
  const { getFirestore } = await import("https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js");

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

  let bikes = [
  ];

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
      } else {
        console.log("No data available");
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }

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
            <h3 class="h3 card-title">
              <a>${bike.title}</a>
            </h3>
            <data class="year" value="${bike.year}">${bike.year}</data>
          </div>
          <ul class="card-list">
            <li class="card-list-item">
              <i class="fa-solid fa-tachometer-alt"></i>
              <span class="card-item-text">${bike.speed}</span>
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
              <span class="card-item-text">${bike.weight}</span>
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
// End of HTML for each bike

// Function to render bikes on the page
function renderBikes(bikesData) {
  const bikesContainer = document.getElementById('bikeContainer');
  bikesContainer.innerHTML = ''; // Clear the container
  Object.values(bikesData).forEach(bike => {
    const bikeHTML = generateBikeHTML(bike);
    bikesContainer.innerHTML += bikeHTML;
  });
}

fetchBikes();
// End of function for rendering bikes

// Cart Elements
const iconCart = document.querySelector('.icon-cart');
const closeCart = document.querySelector('.closeCart');
const body = document.querySelector('body');
const listCart = document.querySelector('.listCart');
const iconCartSpan = document.querySelector('.count-items');
const shadowTwo = document.querySelector('.shadowTwo');
let isVisible = false;

// Toggle Cart Visibility
iconCart.addEventListener('click', () => {
  body.classList.toggle('showCart');
  shadowTwo.style.display = isVisible ? 'none' : 'block';
  isVisible = !isVisible;
});

// Close Cart
closeCart.addEventListener('click', () => {
  body.classList.remove('showCart');
  shadowTwo.style.display = 'none';
  isVisible = false;
});

// Populate Bike Details
document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const bikeId = parseInt(params.get('id'));
  const bike = bikes.find(b => b.id === bikeId);

  if (!isNaN(bikeId)) {
    fetchBikeDetails(bikeId);
  } 

  async function fetchBikeDetails(bikeId) {
    const dbRef = ref(database, `bikes/${bikeId}`);
    try {
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
            const bikeData = snapshot.val();
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
});
//End of bike details

// Add to Cart Functionality
const bikeList = document.querySelector('.featured-car-list');
const cartAdding = [];

bikeList.addEventListener('click', (event) => {
  const posclick = event.target;
  if (posclick.classList.contains('btn')) {
    const productId = posclick.getAttribute('data-id');
    addToCart(productId);
  }
});

const addToCart = (productId) => {
  const productIndex = cartAdding.findIndex(item => item.productId === productId);
  if (productIndex === -1) {
    cartAdding.push({ productId: productId, quantity: 1 });
  } else {
    cartAdding[productIndex].quantity++;
  }
  addCartToHTML();
};

//HTML for cart
const addCartToHTML = () => {
  listCart.innerHTML = '';
  let totalQuantity = 0;
  if (cartAdding.length > 0) {
    cartAdding.forEach(cart => {
      totalQuantity += cart.quantity;
      const newCart = document.createElement('div');
      newCart.classList.add('item');
      newCart.dataset.id = cart.productId;
      const productInCart = bikes.findIndex((value) => value.id == cart.productId);
      const info = bikes[productInCart];
      newCart.innerHTML = `
        <div class="cartItem">
          <div class="cartImage">
            <img src="${info.imageSrc}" alt="">
          </div>
          <div class="cartName">${info.title}</div>
          <div class="cartPrice">$${info.price * cart.quantity}</div>
          <div class="cartQuantity">
            <span class="minus">-</span>
            <span>${cart.quantity}</span>
            <span class="plus">+</span>
          </div>
        </div>
      `;
      listCart.appendChild(newCart);
    });
  }
  iconCartSpan.innerText = totalQuantity;
};
//End of HTML for cart

// Modify Cart Item Quantity
listCart.addEventListener('click', (event) => {
  const clickedElement = event.target;
  if (clickedElement.classList.contains('minus') || clickedElement.classList.contains('plus')) {
    const productId = clickedElement.closest('.item').dataset.id;
    const type = clickedElement.classList.contains('plus') ? 'plus' : 'minus';
    changeQuantity(productId, type);
  }
});

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
};
// End of Cart Functionality
}
ProductsFirebase();