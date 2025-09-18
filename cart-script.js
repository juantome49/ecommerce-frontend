document.addEventListener('DOMContentLoaded', () => {
    const API_BASE_URL = 'https://e-commerce-qflc.onrender.com';
    let cartId = localStorage.getItem('cartId');

    // Si no hay un cartId guardado, lo creamos y lo guardamos
    if (!cartId) {
        createCartAndFetchItems();
    } else {
        fetchCartItems(cartId);
    }

    async function createCartAndFetchItems() {
        try {
            const response = await fetch(`${API_BASE_URL}/api/cart`, { method: 'POST' });
            if (!response.ok) {
                throw new Error('No se pudo crear el carrito.');
            }
            const newCart = await response.json();
            localStorage.setItem('cartId', newCart._id);
            fetchCartItems(newCart._id);
        } catch (error) {
            console.error('Error al crear el carrito:', error);
            document.getElementById('cart-items').innerHTML = '<p>Error al iniciar el carrito. Por favor, recargue la página.</p>';
        }
    }

    async function fetchCartItems(cartId) {
        try {
            const response = await fetch(`${API_BASE_URL}/api/cart/${cartId}`);
            if (!response.ok) {
                if (response.status === 404) {
                    // El carrito no existe en el backend, lo creamos
                    localStorage.removeItem('cartId');
                    createCartAndFetchItems();
                    return;
                }
                throw new Error('No se pudo obtener el carrito.');
            }
            const cart = await response.json();
            const cartItemsContainer = document.getElementById('cart-items');
            const cartTotalSpan = document.getElementById('cart-total');
            let total = 0;

            cartItemsContainer.innerHTML = '';
            if (cart && cart.items && cart.items.length > 0) {
                cart.items.forEach(item => {
                    const itemElement = document.createElement('div');
                    itemElement.classList.add('cart-item');
                    const subtotal = item.productId.price * item.quantity;
                    total += subtotal;
                    itemElement.innerHTML = `
                        <img src="${item.productId.imageUrl}" alt="${item.productId.name}">
                        <div class="cart-item-details">
                            <h4>${item.productId.name}</h4>
                            <p>Cantidad: ${item.quantity}</p>
                            <p>Precio: $${item.productId.price.toFixed(2)}</p>
                            <p>Subtotal: $${subtotal.toFixed(2)}</p>
                        </div>
                    `;
                    cartItemsContainer.appendChild(itemElement);
                });
            } else {
                cartItemsContainer.innerHTML = '<p>Tu carrito está vacío.</p>';
            }
            cartTotalSpan.textContent = total.toFixed(2);
        } catch (error) {
            console.error('Error al obtener los items del carrito:', error);
            document.getElementById('cart-items').innerHTML = '<p>Error al cargar el carrito. Por favor, inténtelo de nuevo.</p>';
            document.getElementById('cart-total').textContent = '0.00';
        }
    }
});