//Filters
export function initFilters() {
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
        'range-600-1200': [600, 1200],
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
  //End of Filters