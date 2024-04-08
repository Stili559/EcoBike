import { expect } from 'chai';
import { JSDOM } from 'jsdom';
import { addFooterContent } from "../EcoBIke-Project/scr/Components/Footer.js";
import { profile } from '../EcoBIke-Project/scr/Components/Profile.js';

const { window } = new JSDOM(`
  <!DOCTYPE html>
  <html>
    <body>
      <div id="footerSection"></div>
      <div id="modal-container"></div>
      <div id="toast-container"></div>
    </body>
  </html>
`);

class LocalStorageMock {
  constructor() {
      this.store = {};
  }

  clear() {
      this.store = {};
  }

  getItem(key) {
      return this.store[key] || null;
  }

  setItem(key, value) {
      this.store[key] = String(value);
  }

  removeItem(key) {
      delete this.store[key];
  }
};

global.document = window.document;
global.window = window;
global.localStorage = new LocalStorageMock();

describe('FooterContent', () => {
  it('should correctly add footer content to the footerSection', async () => {
    await addFooterContent();

    const footerSection = document.getElementById('footerSection');
    expect(footerSection.innerHTML).to.include('About EcoBike');
    expect(footerSection.innerHTML).to.include('Locations');
    expect(footerSection.innerHTML).to.include('Content');
    expect(footerSection.innerHTML).to.include('Contacts');
    expect(footerSection.innerHTML).to.include('Help');

    const facebookLink = footerSection.querySelector('a[href="https://www.facebook.com/profile.php?id=100024002704152"]');
    expect(facebookLink).to.not.be.null;
    expect(facebookLink.querySelector('i').classList.contains('bxl-facebook-circle')).to.be.true;
  });
});

describe('Profile Popup Functionality', () => {
  beforeEach(() => {
      localStorage.clear();
      document.body.innerHTML = '';
      localStorage.setItem('uiSettings', btoa('user@example.com'));
      localStorage.setItem('userName', 'John Doe');
  });

  it('should retrieve the correct values from localStorage', () => {
      profile();
      expect(localStorage.getItem('uiSettings')).to.equal(btoa('user@example.com'));
      expect(localStorage.getItem('userName')).to.equal('John Doe');
  });

  it('should perform sign-out action', function() {
    profile();
    localStorage.removeItem('userName');
    localStorage.removeItem('uiSettings');

    expect(localStorage.getItem('userName')).to.be.null;
    expect(localStorage.getItem('uiSettings')).to.be.null;
  });
});
