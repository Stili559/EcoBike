// Function to generate HTML for each bike
export function generateBikeHTML(bike) {
    return `
      <div class="bike">
        <div class="featured-car-card">
          <figure class="card-banner">
          <a href ="../Detail/Detail.html?id=${bike.id}">
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
  

  