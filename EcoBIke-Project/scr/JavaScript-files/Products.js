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
      if (selectedPriceRanges.length === 0) {
          return;
      }
      const filteredBikes = bikes.filter((bike) => {
          const bikePrice = parseFloat(bike.querySelector('.card-price strong').textContent.replace('$', ''));
          for (const [minPrice, maxPrice] of selectedPriceRanges) {
              if (bikePrice >= minPrice && bikePrice <= maxPrice) {
                  return true;
              }
          }
          return false;
      });
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

// Sample data representing bike information
let bikes = [
  {
    id: 1,
    title: "Cruiser GT3 Series",
    year: "2021",
    speed: "25 mph",
    range: "30/50 miles",
    batteryLife: "3/6 hours",
    weight: "15 pounds",
    price: "440",
    imageSrc: "/EcoBIke-Project/Images/EcoBike T-Cross.png",
    description: "Experience the Cruiser GT3 Series, a versatile electric bike perfect for urban commuting and leisurely rides. With a top speed of 25 mph and a range of 30 to 50 miles.",
    descriptionTwo: "But it's not just about performance; the Cruiser GT3 Series also prioritizes comfort and convenience. Its lightweight design, weighing just 15 pounds.",
  },
  {
    id: 2,
    title: "EcoBike T-Cross",
    year: "2020",
    speed: "20 mph",
    range: "20/45 miles",
    batteryLife: "1/4 hours",
    weight: "25 pounds",
    price: "350",
    imageSrc: "/EcoBIke-Project/Images/EcoTraverse R2 GT.png",
    description: "Introducing the EcoBike T-Cross, a reliable companion for your daily commute and weekend adventures. With a top speed of 20 mph and a range of 20 to 45 miles.",
    descriptionTwo: "But what sets the EcoBike T-Cross apart is its versatility. Whether you're navigating city streets or exploring scenic trails, this bike delivers a smooth and enjoyable riding experience every time.",
  },
  {
    id: 3,
    title: "EcoTraverse R2 GT",
    year: "2020",
    speed: "35 mph",
    range: "10/30 miles",
    batteryLife: "1/2 hours",
    weight: "10 pounds",
    price: "600",
    imageSrc: "/EcoBIke-Project/Images/Cruiser GT3 Series.png",
    description: "Unleash the power of the EcoTraverse R2 GT, a high-performance electric bike designed for speed enthusiasts and thrill-seekers. With a top speed of 35 mph and a range of 10 to 30 miles.",
    descriptionTwo: "But speed isn't the only thing this bike offers. Its lightweight construction, weighing just 10 pounds, ensures agile handling and effortless maneuverability.",
  },
  {
    id: 4,
    title: "Cadillac Escalide S3",
    year: "2022",
    speed: "40 mph",
    range: "45/60 miles",
    batteryLife: "8/10 hours",
    weight: "35 pounds",
    price: "620",
    imageSrc: "/EcoBIke-Project/Images/Cadillac Escalade S3.jpg",
    description: "Introducing the Cadillac Escalide S3, a powerhouse of performance and luxury in the world of electric bikes. With its impressive top speed of 40 mph and a range of 45 to 60 miles.",
    descriptionTwo: "But it's not just about speed; the Cadillac Escalide S3 also prioritizes comfort and convenience. Its sleek design and ergonomic features ensure a comfortable ride.",
  },
  {
    id: 5,
    title: "ECO 4 Series GTI",
    year: "2021",
    speed: "10 mph",
    range: "10/20 miles",
    batteryLife: "1/3 hours",
    weight: "15 pounds",
    price: "330",
    imageSrc: "/EcoBIke-Project/Images/ECO 4 Series GTI.jpg",
    description: "Discover the ECO 4 Series GTI, a compact and versatile electric bike perfect for urban commuting and short trips. With a top speed of 10 mph and a range of 10 to 20 miles.",
    descriptionTwo: "But don't let its compact size fool you; the ECO 4 Series GTI is packed with features. Its lightweight frame, weighing just 15 pounds, ensures easy maneuverability.",
  },
  {
    id: 6,
    title: "ECO 4 Series",
    year: "2020",
    speed: "20 mph",
    range: "80/100 miles",
    batteryLife: "10/12 hours",
    weight: "30 pounds",
    price: "475",
    imageSrc: "/EcoBIke-Project/Images/ECO 4 Serie.jpg",
    description: "Experience the ECO 4 Series, a reliable and efficient electric bike designed for longer journeys and outdoor adventures. With a top speed of 20 mph and an impressive range of 80 to 100 miles.",
    descriptionTwo: "But what truly sets the ECO 4 Series apart is its durability and longevity. Its sturdy construction and reliable components ensure years of dependable use.",
  },
  {
    id: 7,
    title: "EcoTraverse RAV4",
    year: "2021",
    speed: "10 mph",
    range: "100/120 miles",
    batteryLife: "5/6 hours",
    weight: "23 pounds",
    price: "740",
    imageSrc: "/EcoBIke-Project/Images/EcoTraverse RAV4.png",
    description: "Introducing the EcoTraverse RAV4, a reliable companion for your outdoor adventures. With its sturdy build and impressive range of 100 to 120 miles, this electric bike ensures you can explore far and wide with confidence.",
    descriptionTwo: "The EcoTraverse RAV4 isn't just about endurance; it's also about comfort. Its ergonomic design and adjustable features guarantee a smooth and enjoyable ride, no matter the terrain.",
  },
  {
    id: 8,
    title: "GreenRoadster 3 Series",
    year: "2022",
    speed: "34 mph",
    range: "23/48miles",
    batteryLife: "2/4 hours",
    weight: "18 pounds",
    price: "490",
    imageSrc: "/EcoBIke-Project/Images/GreenRoadster 3 Series.png",
    description: "Meet the GreenRoadster 3 Series, a high-performance electric bike designed for speed enthusiasts and urban commuters alike. With a top speed of 34 mph and a range of 23 to 48 miles, this bike offers exhilarating rides and convenient travels.",
    descriptionTwo: "But speed isn't the only thing this bike offers. Its lightweight construction, weighing just 18 pounds, ensures agile handling and effortless maneuverability in crowded city streets.",
  },
  {
    id: 9,
    title: "ECO Elite GT4",
    year: "2022",
    speed: "19 mph",
    range: "35/67 miles",
    batteryLife: "4/5 hours",
    weight: "28 pounds",
    price: "400",
    imageSrc: "/EcoBIke-Project/Images/ECO Elite GT4.png",
    description: "Experience the ECO Elite GT4, a versatile electric bike crafted for both leisurely rides and daily commutes. With a top speed of 19 mph and a range of 35 to 67 miles, this bike offers the perfect balance of performance and practicality.",
    descriptionTwo: "But what sets the ECO Elite GT4 apart is its durability and endurance. Its robust frame and reliable components ensure long-lasting reliability.",
  },
  {
    id:10,
    title: "BMX DT 3",
    year: "2022",
    speed: "10 mph",
    range: "10/25 miles",
    batteryLife: "1/2 hours",
    weight: "15 pounds",
    price: "250",
    imageSrc: "/EcoBIke-Project/Images/BMX DT 3.webp",
    description: "Sleek, efficient urban mobility. Stylish design, top speed 10 mph, range 10-25 miles, lightweight at 15 lbs. Durable battery for 1-2 hours. Perfect for commuters and leisure riders.",
    descriptionTwo: "The BMX DT 3 is not just about performance; it's also about style. Its sleek lines and modern aesthetics ensure you'll turn heads wherever you go. And with its advanced features and reliable performance, this bike is more than just a mode of transportation.",
  },
  {
    id: 11,
    title: "BMX REV 2",
    year: "2022",
    speed: "27 mph",
    range: "33/43 miles",
    batteryLife: "2/6 hours",
    weight: "45 pounds",
    price: "439",
    imageSrc: "/EcoBIke-Project/Images/BMX REV 2.webp",
    description: "The BMX REV 2 is a high-performance electric bike designed for urban commuting and off-road adventures. With a top speed of 27 mph and a range of 33 to 43 miles.",
    descriptionTwo:"Its lightweight design, weighing just 45 pounds, makes it easy to maneuver in various terrains. The powerful battery provides 2 to 6 hours of riding "
    +"ensuring you can go the distance without worrying about recharging."
  },
  {
    id: 12,
    title: "BMX XM 3",
    year: "2021",
    speed: "15 mph",
    range: "20/25 miles",
    batteryLife: "1/3 hours",
    weight: "25 pounds",
    price: "299",
    imageSrc: "/EcoBIke-Project/Images/BMX XM 3.webp",
    description: "BMX XM 3 is a sleek and efficient electric bike designed to take your riding experience to the next level.",
    descriptionTwo:"With a top speed of 15 mph and a range of 20 to 25 miles, this bike ensures you can cover significant distances with ease."
    +"Its battery provides 1 to 3 hours of continuous riding, allowing you to explore urban streets or venture into the countryside without worrying about running out of power."
  }
];
//End of bike information

// Function to generate HTML for each bike
function generateBikeHTML(bike, index) {
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

// Function to render bikes
function renderBikes() {
  const container = document.getElementById("bikeContainer");
  bikes.forEach((bike, index) => {
    const bikeHTML = generateBikeHTML(bike, index);
    container.innerHTML += bikeHTML;
  });
}

renderBikes();
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

  if (bike) {
    const detailsContainer = document.querySelector('.bike-details');
    detailsContainer.innerHTML = `
    <div class="title">
    PRODUCT DETAIL
    </div>
      <div class="bike-detail">
        <div class = "detailImg">
          <img src="${bike.imageSrc}" alt="${bike.title}">
        </div>
        <div class = "detailInfo">
          <h2 class = "desName">${bike.title}</h2>
          <p class = "desPrice">$${bike.price}</p>
          <div class = "detailDescription">
          ${bike.description}
          </div>
          <div class = "detailDescription">
          ${bike.descriptionTwo}
          </div>
          <div class = "datailButton">
            <button class="btn add-to-cart-btn" data-id="${bike.id}">ADD TO CART</button>
          </div>
        </div>
      </div>
    `;
    const addToCartBtn = detailsContainer.querySelector('.add-to-cart-btn');
    addToCartBtn.addEventListener('click', () => {
      addToCart(bike.id);
    });
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
// ENd of Cart Functionality