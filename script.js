document.addEventListener('DOMContentLoaded', () => {
    // URL de tu backend en Render
    const API_BASE_URL = 'https://ecommerce-backend-byu5.onrender.com';
    let cartId = localStorage.getItem('cartId');

    // Función para crear un nuevo carrito si no existe
    async function getOrCreateCart() {
        if (cartId) {
            return cartId;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/api/cart`, {
                method: 'POST'
            });
            const newCart = await response.json();
            localStorage.setItem('cartId', newCart._id);
            return newCart._id;
        } catch (error) {
            console.error('Error al crear el carrito:', error);
            alert('Error al crear el carrito. Inténtalo de nuevo.');
            return null;
        }
    }

    // Función para obtener y mostrar productos
    async function fetchAndDisplayProducts() {
        const productGrid = document.getElementById('product-grid');
        productGrid.innerHTML = ''; // Limpiar la cuadrícula

        try {
            const response = await fetch(`${API_BASE_URL}/api/products`);
            const products = await response.json();
            
            products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.classList.add('product-card');
                productCard.innerHTML = `
                    <img src="${product.imageUrl}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <p class="product-price">$${product.price.toFixed(2)}</p>
                    <button class="btn btn-primary add-to-cart-btn" data-product-id="${product._id}">
                        Añadir al carrito
                    </button>
                `;
                productGrid.appendChild(productCard);
            });
        } catch (error) {
            console.error('Error al obtener productos:', error);
            productGrid.innerHTML = '<p>Error al cargar productos. Por favor, inténtalo de nuevo más tarde.</p>';
        }
    }

    // Función para agregar un producto al carrito
    async function addToCart(productId) {
        cartId = await getOrCreateCart();
        if (!cartId) return;

        try {
            const response = await fetch(`${API_BASE_URL}/api/cart/${cartId}/items`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ productId: productId, quantity: 1 })
            });

            if (response.ok) {
                alert('Producto agregado al carrito!');
            } else {
                alert('Error al agregar el producto al carrito.');
            }
        } catch (error) {
            console.error('Error al agregar el producto al carrito:', error);
            alert('Error de conexión con el servidor.');
        }
    }

    // Evento de clic para los botones de "Añadir al carrito"
    document.getElementById('product-grid').addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart-btn')) {
            const productId = e.target.getAttribute('data-product-id');
            addToCart(productId);
        }
    });

    // Cargar los productos al iniciar la página
    fetchAndDisplayProducts();
});