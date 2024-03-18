export function showSuccessModal(message) {
    const modalContainer = document.getElementById('modal-container');
    
    modalContainer.innerHTML = `
      <div class="modal fade" id="OrderModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-body">
              <div class="checkmark-and-text">
                <div class="checkmark-circle">
                  <i class="checkmark">✓</i>
                </div>
                <span class="email-text">${message}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  
    var orderModal = new bootstrap.Modal(document.getElementById('OrderModal'));
    orderModal.show();
  }
  