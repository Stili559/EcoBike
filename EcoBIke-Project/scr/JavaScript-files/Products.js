document.addEventListener('DOMContentLoaded', function () {
    const bikeList = document.querySelector('.featured-car-list');
    const bikes = Array.from(bikeList.children);
    const clearFiltersButton = document.getElementById('clear-filters-button');

    const sortLowToHighButton = document.getElementById('sort-low-to-high');
    const sortHighToLowButton = document.getElementById('sort-high-to-low');
    const yearFilterSelect = document.getElementById('year-filter');
    const originalBikesOrder = Array.from(bikes);

    const priceRanges = {
        'range-0-400': [0, 400],
        'range-400-600': [401, 599],
        'range-600-800': [600, 800],
    };
      
    const checkboxes = document.querySelectorAll('#price-ranges input[type="checkbox"]');
    const resultsCount = document.getElementById('filtered-count');

    // Function to compare bike prices
    const comparePrices = (a, b) => {
        const priceA = parseFloat(a.querySelector('.card-price strong').textContent.replace('$', ''));
        const priceB = parseFloat(b.querySelector('.card-price strong').textContent.replace('$', ''));

        return priceA - priceB;
    };

    // Function to update the price list
      checkboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', updatePriceFilter);
      });
    
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
  
    // Function to update the bike list
    const updateBikeList = (bikeArray) => {
        bikeList.innerHTML = '';
        bikeArray.forEach((bike) => {
            bikeList.appendChild(bike);
        });
    };

    sortLowToHighButton.addEventListener('click', () => {
        bikes.sort(comparePrices);
        updateBikeList(bikes);
    });

    sortHighToLowButton.addEventListener('click', () => {
        bikes.sort(comparePrices);
        bikes.reverse();
        updateBikeList(bikes);
    });

    // Event listener for year filter
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

     // Event listener for clear filter
    clearFiltersButton.addEventListener('click', () => {
        yearFilterSelect.value = 'all';
        bikes.length = 0; 
        bikes.push(...originalBikesOrder);
        updateBikeList(bikes);
    });
});

//Bikes and cart
let iconCart = document.querySelector('.icon-cart')
let closeCart = document.querySelector('.closeCart')
let body = document.querySelector('body')
let listCart = document.querySelector('.listCart')
let iconCartSpan = document.querySelector('.count-items')
let shadowTwo = document.querySelector('.shadowTwo');

let isVisible = false;

iconCart.addEventListener('click', () => {
  body.classList.toggle('showCart');
  if (!isVisible) {
    shadowTwo.style.display = 'block';
  } else {
    shadowTwo.style.display = 'none';
  }
  isVisible = !isVisible;
});

closeCart.addEventListener('click', () => {
  body.classList.remove('showCart');
  shadowTwo.style.display = 'none';
  isVisible = false;
});

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
    imageSrc: "/EcoBIke-Project/Images/Cruiser GT3 Series.png"
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
    imageSrc: "/EcoBIke-Project/Images/EcoBike T-Cross.png"
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
    imageSrc: "/EcoBIke-Project/Images/EcoTraverse R2 GT.png"
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
    imageSrc: "/EcoBIke-Project/Images/Cadillac Escalade S3.jpg"
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
    imageSrc: "/EcoBIke-Project/Images/ECO 4 Series GTI.jpg"
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
    imageSrc: "/EcoBIke-Project/Images/ECO 4 Serie.jpg"
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
    imageSrc: "/EcoBIke-Project/Images/EcoTraverse RAV4.png"
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
    imageSrc: "/EcoBIke-Project/Images/GreenRoadster 3 Series.png"
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
    imageSrc: "/EcoBIke-Project/Images/ECO Elite GT4.png"
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
    imageSrc: "/EcoBIke-Project/Images/BMX DT 3.webp"
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
    imageSrc: "/EcoBIke-Project/Images/BMX REV 2.webp"
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
    imageSrc: "/EcoBIke-Project/Images/BMX XM 3.webp"
  }
];

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

// Function to render bikes
function renderBikes() {
  const container = document.getElementById("bikeContainer");
  bikes.forEach((bike, index) => {
    const bikeHTML = generateBikeHTML(bike, index);
    container.innerHTML += bikeHTML;
  });
}

renderBikes();

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const bikeId = parseInt(params.get('id'));
  const bike = bikes.find(b => b.id === bikeId);

  if (bike) {
      const detailsContainer = document.querySelector('.bike-details');
      detailsContainer.innerHTML = `
          <div class="bike-detail">
              <h2>${bike.title}</h2>
              <p>Year: ${bike.year}</p>
              <p>Speed: ${bike.speed}</p>
              <p>Range: ${bike.range}</p>
              <p>Battery Life: ${bike.batteryLife}</p>
              <p>Weight: ${bike.weight}</p>
              <p>Price: $${bike.price}</p>
              <img src="${bike.imageSrc}" alt="${bike.title}">
              <button class="add-to-cart-btn" data-id="${bike.id}">Add to Cart</button>
          </div>
      `;

      const addToCartBtn = detailsContainer.querySelector('.add-to-cart-btn');
      addToCartBtn.addEventListener('click', () => {
          addToCart(bike.id);
      });
  }
});

const bikeList = document.querySelector('.featured-car-list');
let cartAdding = [];

bikeList.addEventListener('click', (event) => {
  let posclick = event.target
  if(posclick.classList.contains('btn')){
    let product_id = posclick.getAttribute('data-id');
    addToCart(product_id)
  }
})

const addToCart = (product_id) => {
  let productIndex = cartAdding.findIndex(item => item.product_id === product_id);
  if (productIndex === -1) 
  { 
    cartAdding.push({ product_id: product_id, quantity: 1 });
  }else 
  { 
    cartAdding[productIndex].quantity++;
  }
  addCartToHTML();
};

const addCartToHTML = () => {
  listCart.innerHTML = '';
  let totalQuantity = 0;
  if (cartAdding.length > 0) {
    cartAdding.forEach(cart => {
      totalQuantity += cart.quantity;
          let newCart = document.createElement('div');
          newCart.classList.add('item');
          newCart.dataset.id = cart.product_id;
          let productInCart = bikes.findIndex((value) => value.id == cart.product_id);
          let info = bikes[productInCart];
          newCart.innerHTML = `
          <div class = "cartItem">
              <div class="cartImage">
                  <img src="${info.imageSrc}" alt="">
              </div>
              <div class="cartName">
              ${info.title}
              </div>
              <div class="cartPrice">
              $${info.price * cart.quantity}
              </div>
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

listCart.addEventListener('click', (event) => {
  let clickedElement = event.target;
  if (clickedElement.classList.contains('minus') || clickedElement.classList.contains('plus')) {
     let product_id = clickedElement.closest('.item').dataset.id;
     let type = clickedElement.classList.contains('plus') ? 'plus' : 'minus';
     changeQuantity(product_id, type);
  }
});

const changeQuantity = (product_id, type) => {
  let quantityChecker = cartAdding.findIndex((value) => value.product_id == product_id);
  if(quantityChecker >= 0){
    switch(type){
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
}
