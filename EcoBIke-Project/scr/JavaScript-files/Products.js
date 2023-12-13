document.addEventListener('DOMContentLoaded', function () {
    const bikeList = document.querySelector('.featured-car-list');
    const bikes = Array.from(bikeList.children);

    const sortLowToHighButton = document.getElementById('sort-low-to-high');
    const sortHighToLowButton = document.getElementById('sort-high-to-low');
    const yearFilterSelect = document.getElementById('year-filter');

    // Function to compare bike prices
    const comparePrices = (a, b) => {
        const priceA = parseFloat(a.querySelector('.card-price strong').textContent.replace('$', ''));
        const priceB = parseFloat(b.querySelector('.card-price strong').textContent.replace('$', ''));

        return priceA - priceB;
    };

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
});