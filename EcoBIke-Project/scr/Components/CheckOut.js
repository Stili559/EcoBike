// Function to add the checkout-modal and error message HTML
export function injectHTMLComponents() {
    const checkoutModalHTML = `
      <div id="checkoutModal" class="modal">
        <div class="modal-contentCH">
          <div id="checkoutItems"></div>
          <div id="checkoutFields"></div>
        </div>
      </div>`;
  
    const errorMessageHTML = `
      <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 9999999">
        <div id="toast-container" class="toast-container"></div>
      </div>`;
  
    document.body.insertAdjacentHTML('beforeend', checkoutModalHTML);
    document.body.insertAdjacentHTML('beforeend', errorMessageHTML);
  }