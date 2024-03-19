import { initFilters } from "../Components/Filters.js";
import { initializeFirebase } from "../Components/Firebase.js";
import { generateBikeHTML } from "../Components/Bikes.js";
import { showToast } from "../Components/Alert.js";
import { showSuccessModal } from "../Components/Success.js";

async function ProductsFirebase() {
  const { getDatabase, ref, get  } = await import("https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js");
  const { getFirestore, query, getDocs,where,doc, getDoc, setDoc, collection } = await import("https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js");
  const { getAuth, onAuthStateChanged } = await import("https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js");

  const app = await initializeFirebase();
  const db = getFirestore(app);
  const database = getDatabase(app, "https://ecobike-bb6cc-default-rtdb.europe-west1.firebasedatabase.app");

  let bikes = [];

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


//-------------------------------------------//


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
    fetchOrdersByUser(currentUserId)
        .then(orders => {
          displayOrders(orders);
        })
        .catch(error => {
          console.error("Error fetching orders: ", error);
        });
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


//-------------------------------------------//


// Check-out function
function updateCheckoutModal() {
  const checkoutItemsElement = document.getElementById('checkoutItems');
  checkoutItemsElement.innerHTML = '';
  const checkoutFieldsElement = document.getElementById('checkoutFields');
  checkoutFieldsElement.innerHTML = '';
  let totalCartPrice = 0;
  
  cartAdding.forEach(item => {
    const bike = bikes.find(bike => bike.id === item.productId);
    if (bike) {
      const itemTotalPrice = item.quantity * bike.price;
      totalCartPrice += itemTotalPrice;
  
      const itemHTML = `
        <div class="cartCH">
          <div class="listCh">
            <div class="checkout-item">
              <img src="${bike.imageSrc}" alt="${bike.title}">
              <div class="infoCH">
                <div class="nameCH">${bike.title}</div>
              </div>
              <div class="quantityCH">${item.quantity}</div>
              <div class="priceCH">$${bike.price}</div>
            </div>
          </div>
        </div>
      `;
      checkoutItemsElement.innerHTML += itemHTML;
    }
  });
  
  const showScrollBar = cartAdding.length > 6 ? 'scrollbar' : '';
  if (showScrollBar) {
    checkoutItemsElement.classList.add(showScrollBar);
  }

  const checkoutFieldsHTML = `
  <div class="rightCH">
  <h1>COMPLETE ORDER</h1>
  <form>
    <div class="checkout-fields">  
      <div class = "groupCH">
        <label for="NameCH">Full Name</label>
        <input type="text" name="" id="NameCH" required>
      </div>
      <div class = "groupCH">
        <label for="PhoneCH">Phone Number</label>
        <input type="text" name="" id="PhoneCH" required>
      </div>
      <div class = "groupCH">
        <label for="AddressCH">Address</label>
        <input type="text" name="" id="AddressCH" required>
      </div>
      <div class = "groupCH">
        <label for="CityCH">City</label>
        <input type="text" name="" id="CityCH" required>
      </div>
      <div class = "groupCH">
        <label for="CountryCH">Country</label>
        <input type="text" name="" id="CountryCH" required>
      </div>
    </div>
    <div class = "priceCH">
    <div>Total Price:</div>
    <div id="checkoutTotal">$0.00</div>
  </div>
    <button type = "submit" class = "buttonCheckOut" id = "checkoutButton">PLACE ORDER</button>
  </form>
  </div>
  `;
  checkoutFieldsElement.innerHTML += checkoutFieldsHTML;

  document.getElementById('checkoutTotal').innerText = `$${totalCartPrice.toFixed(0)}`;

  // Function to save checkout order
  async function saveCheckoutOrder(checkoutData, userId) {
    if (!userId) return;
    try {
      const orderId = `order_${Date.now()}`;
      const orderData = { ...checkoutData, userId: userId };
      await setDoc(doc(db, "orders", orderId), orderData);
      console.log("Order saved successfully!");

      await saveCartToFirestore([], userId);
      cartAdding = []; 

      showSuccessModal("Your order has been successfully placed and confirmed.");

      fetchOrdersByUser(userId)
      .then(orders => {
        displayOrders(orders);
      })
      .catch(error => {
        console.error("Error fetching orders: ", error);
      });

      if (iconCartSpan) {
        iconCartSpan.innerText = '0';
      }

      listCart.innerHTML = '';

      document.getElementById('checkoutModal').style.display = 'none';
      document.body.classList.remove('no-scroll');

    } catch (error) {
      console.error("Error saving order: ", error);
    }
  }

  // Function to gather checkout data and save order
  async function handlePlaceOrderEvent() {
    const fullName = document.getElementById('NameCH').value.trim();
    const phoneNumber = document.getElementById('PhoneCH').value.trim();
    const address = document.getElementById('AddressCH').value.trim();
    const city = document.getElementById('CityCH').value.trim();
    const country = document.getElementById('CountryCH').value.trim();
  
    if (!fullName || !phoneNumber || !address || !city || !country) {
      showToast("Please fill in all required fields.");
      return;
    }

    const itemsWithTitles = cartAdding.map(item => {
      const bike = bikes.find(b => b.id === item.productId);
      return {
        ...item,
        title: bike ? bike.title : 'Unknown', 
      };
    });

    const checkoutData = {
      fullName,
      phoneNumber,
      address,
      city,
      country,
      items: itemsWithTitles,
      totalPrice: document.getElementById('checkoutTotal').innerText,
      timestamp: new Date(),
    };

    await saveCheckoutOrder(checkoutData, currentUserId);
  }

  document.getElementById('checkoutButton').addEventListener('click', function(event) {
    event.preventDefault();
    handlePlaceOrderEvent();
  });
}

document.querySelector('.checkOut').addEventListener('click', function() {
  if (cartAdding.length === 0) {
    return;
  }
  
  document.body.classList.add('no-scroll');
  document.querySelector('body').classList.remove('showCart');
  document.querySelector('.shadowTwo').style.display = 'none';
  isVisible = false;
  updateCheckoutModal();
  document.getElementById('checkoutModal').style.display = 'block';
});

//-------------------------------------------//


// Function for retrieving the orders by user
async function fetchOrdersByUser(userId) {
  if (!userId) return;
  const db = getFirestore();
  const ordersRef = collection(db, "orders");
  const q = query(ordersRef, where("userId", "==", userId));
  
  try {
    const querySnapshot = await getDocs(q);
    const orders = [];
    querySnapshot.forEach((doc) => {
      orders.push({ id: doc.id, ...doc.data() });
    });
    console.log(orders);
    return orders;
  } catch (error) {
    console.error("Error fetching orders: ", error);
    throw error;
  }
}

// Function to display the orders in the user profile
function displayOrders(orders) {
  const ordersContainer = document.getElementById('ordersContainer');
  ordersContainer.innerHTML = '';
  
  orders.forEach(order => {
    const timestamp = order.timestamp.toDate(); 

    const formattedTimestamp = new Intl.DateTimeFormat('default', {
      year: 'numeric', month: 'long', day: 'numeric'
    }).format(timestamp);

    const orderItemsHTML = order.items.map(item => `
      <p class="order-item">${item.title} - Quantity: ${item.quantity}</p>
    `).join('');

    const orderHTML = `
      <div class="order">
        <h3>Order ID: ${order.id}</h3>
        ${orderItemsHTML}
        <p class="totalPrice">Total Price: ${order.totalPrice}</p>
        <p class="order-date">Order Placed: ${formattedTimestamp}</p>
        <div class="order-item"><span class="delivery-countdown" data-timestamp="${timestamp.getTime()}">Loading countdown...</span></div>
      </div>
      </div>
    `;
    ordersContainer.innerHTML += orderHTML;

// Function to display days left to delivery
    document.querySelectorAll('.delivery-countdown').forEach(function(countdown) {
      const startTime = parseInt(countdown.getAttribute('data-timestamp'), 10);
      let daysLeft = 5;
  
      const updateCountdown = function() {
        const now = new Date().getTime();
        const elapsed = now - startTime;
        const daysElapsed = Math.floor(elapsed / (10 * 1000));
        const currentDaysLeft = daysLeft - daysElapsed;
  
        if (currentDaysLeft <= 0) {
          countdown.innerText = "Order Delivered";
          clearInterval(interval);
        } else {
          countdown.innerText = `${currentDaysLeft} days left to delivering`;
        }
      };

      const interval = setInterval(updateCountdown, 10 * 1000);
      updateCountdown();
    });
  });
}


//-------------------------------------------//


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

