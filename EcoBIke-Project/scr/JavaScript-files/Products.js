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