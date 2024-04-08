import { expect } from 'chai';
import sinon from "sinon";

function addHoverClass(element, relatedElement, title, newTitle) {
  element.classList.add('hover');
  relatedElement.classList.add('enter');
  title.innerHTML = newTitle;
}

function removeHoverClass(element, relatedElement, title, defaultTitle) {
  element.classList.remove('hover');
  relatedElement.classList.remove('enter');
  title.innerHTML = defaultTitle;
}

describe('Sponsor Tier Hover Effects', function() {
  let element, relatedElement, title;

  beforeEach(() => {
      element = { classList: { add: sinon.spy(), remove: sinon.spy() } };
      relatedElement = { classList: { add: sinon.spy(), remove: sinon.spy() } };
      title = { innerHTML: '' };
  });

  it('should handle hover state correctly for multiple elements', function() {
      const element2 = { classList: { add: sinon.spy(), remove: sinon.spy() } };
      const relatedElement2 = { classList: { add: sinon.spy(), remove: sinon.spy() } };

      addHoverClass(element, relatedElement, title, 'Gold Sponsor');
      addHoverClass(element2, relatedElement2, title, 'Silver Sponsor');

      expect(element.classList.add.calledWith('hover')).to.be.true;
      expect(relatedElement.classList.add.calledWith('enter')).to.be.true;
      expect(element2.classList.add.calledWith('hover')).to.be.true;
      expect(relatedElement2.classList.add.calledWith('enter')).to.be.true;

      expect(title.innerHTML).to.equal('Silver Sponsor');
  });

  it('should reset title to default on mouseleave when multiple elements are involved', function() {
      addHoverClass(element, relatedElement, title, 'Gold Sponsor');
      removeHoverClass(element, relatedElement, title, 'All Sponsors');

      addHoverClass(element, relatedElement, title, 'Silver Sponsor');
      removeHoverClass(element, relatedElement, title, 'All Sponsors');

      expect(title.innerHTML).to.equal('All Sponsors');
  });
});