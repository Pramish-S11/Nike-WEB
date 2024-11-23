class ProductSystem {
    constructor() {
        this.products = [];
        this.filters = {
            category: 'all',
            priceRange: 'all',
            color: 'all',
            search: ''
        };
        this.init();
    }

    async init() {
        await this.loadProducts();
        this.setupFilterListeners();
        this.renderProducts();
        this.setupSearch();
    }

    async loadProducts() {
        try {
            // In a real application, this would be an API call
            this.products = [
                {
                    id: 1,
                    name: "Air Max 2024",
                    price: 120,
                    category: "running",
                    color: "black",
                    image: "path/to/image1.jpg"
                },
                // Add more products here
            ];
        } catch (error) {
            console.error('Error loading products:', error);
        }
    }

    setupFilterListeners() {
        // Category filter
        document.querySelectorAll('.category-filter').forEach(filter => {
            filter.addEventListener('click', (e) => {
                this.filters.category = e.target.dataset.category;
                this.renderProducts();
                this.updateActiveFilters();
            });
        });

        // Price range filter
        document.getElementById('priceRange').addEventListener('change', (e) => {
            this.filters.priceRange = e.target.value;
            this.renderProducts();
        });

        // Color filter
        document.querySelectorAll('.color-filter').forEach(filter => {
            filter.addEventListener('click', (e) => {
                this.filters.color = e.target.dataset.color;
                this.renderProducts();
                this.updateActiveFilters();
            });
        });
    }

    setupSearch() {
        const searchInput = document.getElementById('productSearch');
        searchInput.addEventListener('input', (e) => {
            this.filters.search = e.target.value.toLowerCase();
            this.renderProducts();
        });
    }

    filterProducts() {
        return this.products.filter(product => {
            // Category filter
            if (this.filters.category !== 'all' && 
                product.category !== this.filters.category) return false;

            // Price range filter
            if (this.filters.priceRange !== 'all') {
                const [min, max] = this.filters.priceRange.split('-');
                if (product.price < Number(min) || product.price > Number(max)) return false;
            }

            // Color filter
            if (this.filters.color !== 'all' && 
                product.color !== this.filters.color) return false;

            // Search filter
            if (this.filters.search && 
                !product.name.toLowerCase().includes(this.filters.search)) return false;

            return true;
        });
    }

    renderProducts() {
        const productContainer = document.querySelector('.products');
        const filteredProducts = this.filterProducts();

        if (filteredProducts.length === 0) {
            productContainer.innerHTML = `
                <div class="no-products">
                    <i class="fas fa-search fa-3x"></i>
                    <p>No products found matching your criteria</p>
                </div>
            `;
            return;
        }

        productContainer.innerHTML = filteredProducts.map(product => `
            <div class="product-card" data-product-id="${product.id}">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>$${