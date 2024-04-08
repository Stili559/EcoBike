import { expect } from 'chai';
import { JSDOM } from 'jsdom';
import { showSuccessModal } from "../EcoBIke-Project/scr/Components/Success.js";
import { showToast } from "../EcoBIke-Project/scr/Components/Alert.js";
import { generateBikeHTML } from '../EcoBIke-Project/scr/Components/Bikes.js';

const { window } = new JSDOM(`
  <!DOCTYPE html>
  <html>
    <body>
      <div id="modal-container"></div>
      <div id="toast-container"></div>
    </body>
  </html>
`);

global.document = window.document;
global.window = window;

class MockBootstrapModal {
  constructor() {
    this.isVisible = false;
  }
  show() {
    this.isVisible = true;
  }
}

class MockBootstrapToast {
  constructor() {
    this.isShown = false;
  }
  show() {
    this.isShown = true;
  }
}

globalThis.bootstrap = { Modal: MockBootstrapModal, Toast: MockBootstrapToast };

describe('CorrectMessageModal', () => {
  it('should display the modal with the correct message', () => {
    const testMessage = 'Test Success Message';
    showSuccessModal(testMessage);

    const messageElement = document.querySelector('.email-text');
    expect(messageElement.textContent).to.equal(testMessage);
  });
});

describe('CorrectMessageToast', () => {
  it('should create and show a toast with the correct message', () => {
    const testMessage = 'Invalid email or password';
    showToast(testMessage);

    const toastBody = document.querySelector('.toast-body');
    expect(toastBody.textContent.trim()).to.equal(testMessage);
  });
});

describe('generateBikeHTML', () => {
  it('should correctly generate HTML for a bike', () => {
    const bike = {
      id: '1',
      imageSrc: 'path/to/image.jpg',
      title: 'Test Bike',
      year: '2022',
      type: 'Electric',
      speed: '25 km/h',
      range: '50 km',
      batteryLife: '2 years',
      weight: '15 kg',
      price: '999',
    };

    const html = generateBikeHTML(bike);

    expect(html).to.include(bike.id);
    expect(html).to.include(bike.imageSrc);
    expect(html).to.include(bike.title);
    expect(html).to.include(bike.year);
    expect(html).to.include(bike.type);
    expect(html).to.include(bike.speed);
    expect(html).to.include(bike.range);
    expect(html).to.include(bike.batteryLife);
    expect(html).to.include(bike.weight);
    expect(html).to.include(bike.price);
  });
});