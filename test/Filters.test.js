import { expect, assert } from 'chai';
import sinon from "sinon";
import { initFilters } from '../EcoBIke-Project/scr/Components/Filters.js';

describe('Filters Initialization', function() {
    let sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        sandbox.stub(document, 'getElementById').callsFake((id) => {
            switch (id) {
                case 'speed-filter':
                case 'weight-filter':
                case 'year-filter':
                case 'clear-filters-button':
                case 'sort-low-to-high':
                case 'sort-high-to-low':
                case 'type-filter':
                case 'title-search':
                    return document.createElement('select');
                case 'toggle-filters-button':
                    return document.createElement('button');
                case 'price-ranges':
                    return document.createElement('div');
                default:
                    return null;
            }
        });
        sandbox.stub(document, 'querySelector').callsFake((selector) => {
            if (selector === '.featured-car-list') {
                const list = document.createElement('ul');
                return list;
            }
            return null;
        });
        sandbox.stub(document, 'querySelectorAll').callsFake((selector) => {
            if (selector === '#price-ranges input[type="checkbox"]') {
                const checkbox1 = document.createElement('input');
                checkbox1.type = 'checkbox';
                const checkbox2 = document.createElement('input');
                checkbox2.type = 'checkbox';
                return [checkbox1, checkbox2];
            }
            return null;
        });
        sandbox.stub(window, 'addEventListener').callsFake(() => {});
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should initialize filters correctly', function() {
        initFilters();
        expect(document.getElementById.calledWith('speed-filter')).to.be.true;
        expect(document.getElementById.calledWith('weight-filter')).to.be.true;
        expect(document.getElementById.calledWith('type-filter')).to.be.true;
        expect(document.getElementById.calledWith('clear-filters-button')).to.be.true;
    });
    
    it('should sort bikes from low to high price when "Sort Low to High" button is clicked', function() {
        initFilters();
        const bikes = [
            createMockBike(500),
            createMockBike(1000),
            createMockBike(700)
        ];
        document.getElementById('sort-low-to-high').click();

    });

    it('should sort bikes from high to low price when "Sort High to Low" button is clicked', function() {
        initFilters();
        const bikes = [
            createMockBike(500),
            createMockBike(1000),
            createMockBike(700)
        ];
        document.getElementById('sort-high-to-low').click();
    });
    
    it('should initialize filters correctly', () => {
        initFilters();
    
        assert.isNotNull(document.getElementById('speed-filter'), 'Speed filter should be initialized');
        assert.isNotNull(document.getElementById('weight-filter'), 'Weight filter should be initialized');
        assert.isNotNull(document.querySelector('.featured-car-list'), 'Bike list should be initialized');
        assert.isNotNull(document.getElementById('clear-filters-button'), 'Clear filters button should be initialized');
        assert.isNotNull(document.getElementById('sort-low-to-high'), 'Sort low to high button should be initialized');
        assert.isNotNull(document.getElementById('sort-high-to-low'), 'Sort high to low button should be initialized');
        assert.isNotNull(document.getElementById('year-filter'), 'Year filter should be initialized');
        assert.isNotNull(document.getElementById('toggle-filters-button'), 'Toggle filters button should be initialized');
      });

    function createMockBike(price) {
        const bike = document.createElement('li');
        const priceElement = document.createElement('span');
        priceElement.className = 'card-price';
        priceElement.innerHTML = `<strong>$${price}</strong>`;
        bike.appendChild(priceElement);
        return bike;
    }
});