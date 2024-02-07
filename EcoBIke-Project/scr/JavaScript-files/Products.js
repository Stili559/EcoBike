document.addEventListener('DOMContentLoaded', function () {
    const bikeList = document.querySelector('.featured-car-list');
    const bikes = Array.from(bikeList.children);
    const titles = document.querySelectorAll('.title-Products-first, .title-Products');
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
        hideTitles();
      }
  
    // Function to update the bike list
    const updateBikeList = (bikeArray) => {
        bikeList.innerHTML = '';
        bikeArray.forEach((bike) => {
            bikeList.appendChild(bike);
        });
    };

    const hideTitles = () => {
        titles.forEach((title) => {
            title.style.display = 'none';
        });
    };

    const showTitles = () => {
        titles.forEach((title) => {
            title.style.display = '';
        });
    };

    sortLowToHighButton.addEventListener('click', () => {
        bikes.sort(comparePrices);
        updateBikeList(bikes);
        hideTitles();
    });

    sortHighToLowButton.addEventListener('click', () => {
        bikes.sort(comparePrices);
        bikes.reverse();
        updateBikeList(bikes);
        hideTitles();
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
        hideTitles();
    });

     // Event listener for clear filter
    clearFiltersButton.addEventListener('click', () => {
        yearFilterSelect.value = 'all';
        bikes.length = 0; 
        bikes.push(...originalBikesOrder);
        updateBikeList(bikes);
        showTitles();
    });
});


// Sample data representing bike information
const bikes = [
  {
    title: "Cruiser GT3 Series",
    year: "2021",
    speed: "25 mph",
    range: "30/50 miles",
    batteryLife: "3/6 hours",
    weight: "15 pounds",
    price: "$440",
    imageSrc: "/EcoBIke-Project/Images/Cruiser GT3 Series.png"
  },
  {
    title: "EcoBike T-Cross",
    year: "2020",
    speed: "20 mph",
    range: "20/45 miles",
    batteryLife: "1/4 hours",
    weight: "25 pounds",
    price: "$350",
    imageSrc: "/EcoBIke-Project/Images/EcoBike T-Cross.png"
  },
  {
    title: "EcoTraverse R2 GT",
    year: "2020",
    speed: "35 mph",
    range: "10/30 miles",
    batteryLife: "1/2 hours",
    weight: "10 pounds",
    price: "$600",
    imageSrc: "/EcoBIke-Project/Images/EcoTraverse R2 GT.png"
  },
  {
    title: "Cadillac Escalide S3",
    year: "2022",
    speed: "40 mph",
    range: "45/60 miles",
    batteryLife: "8/10 hours",
    weight: "35 pounds",
    price: "$620",
    imageSrc: "/EcoBIke-Project/Images/Cadillac Escalade S3.jpg"
  },
  {
    title: "ECO 4 Series GTI",
    year: "2021",
    speed: "10 mph",
    range: "10/20 miles",
    batteryLife: "1/3 hours",
    weight: "15 pounds",
    price: "$330",
    imageSrc: "/EcoBIke-Project/Images/ECO 4 Series GTI.jpg"
  },
  {
    title: "ECO 4 Series",
    year: "2020",
    speed: "20 mph",
    range: "80/100 miles",
    batteryLife: "10/12 hours",
    weight: "30 pounds",
    price: "$475",
    imageSrc: "/EcoBIke-Project/Images/ECO 4 Serie.jpg"
  },
  {
    title: "EcoTraverse RAV4",
    year: "2021",
    speed: "10 mph",
    range: "100/120 miles",
    batteryLife: "5/6 hours",
    weight: "23 pounds",
    price: "$740",
    imageSrc: "/EcoBIke-Project/Images/EcoTraverse RAV4.png"
  },
  {
    title: "GreenRoadster 3 Series",
    year: "2022",
    speed: "34 mph",
    range: "23/48miles",
    batteryLife: "2/4 hours",
    weight: "18 pounds",
    price: "$490",
    imageSrc: "/EcoBIke-Project/Images/GreenRoadster 3 Series.png"
  },
  {
    title: "ECO Elite GT4",
    year: "2022",
    speed: "19 mph",
    range: "35/67 miles",
    batteryLife: "4/5 hours",
    weight: "28 pounds",
    price: "$400",
    imageSrc: "/EcoBIke-Project/Images/ECO Elite GT4.png"
  },
  {
    title: "EcoBike T-Cross",
    year: "2020",
    speed: "20 mph",
    range: "20/45 miles",
    batteryLife: "1/4 hours",
    weight: "25 pounds",
    price: "$350",
    imageSrc: "/EcoBIke-Project/Images/EcoBike_T-Cross.png"
  },
  {
    title: "EcoBike T-Cross",
    year: "2020",
    speed: "20 mph",
    range: "20/45 miles",
    batteryLife: "1/4 hours",
    weight: "25 pounds",
    price: "$350",
    imageSrc: "/EcoBIke-Project/Images/EcoBike_T-Cross.png"
  },
  {
    title: "EcoBike T-Cross",
    year: "2020",
    speed: "20 mph",
    range: "20/45 miles",
    batteryLife: "1/4 hours",
    weight: "25 pounds",
    price: "$350",
    imageSrc: "/EcoBIke-Project/Images/EcoBike_T-Cross.png"
  }
];

// Function to generate HTML for each bike
function generateBikeHTML(bike) {
  return `
    <div class="bike">
      <div class="featured-car-card">
        <figure class="card-banner">
          <img src="${bike.imageSrc}" alt="${bike.title}" loading="lazy" width="440" height="300" class="w-100">
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
              <strong>${bike.price}</strong>
            </p>
            <button class="btn">Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Function to render bikes
function renderBikes() {
  const container = document.getElementById("bikeContainer");
  bikes.forEach(bike => {
    const bikeHTML = generateBikeHTML(bike);
    container.innerHTML += bikeHTML;
  });
}

renderBikes();
