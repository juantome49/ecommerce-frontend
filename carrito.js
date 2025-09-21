const backendURL = 'https://ecommerce-backend-byu5.onrender.com';

document.addEventListener('DOMContentLoaded', () => {
    // Obtener el contenido del carrito del backend
    fetch(`${backendURL}/api/carrito`)
        .then(response => response.json())
        .then(cartItems => {
            const cartContainer = document.getElementById('carrito-items');
            
            if (cartItems.length === 0) {
                cartContainer.innerHTML = '<p>Tu carrito está vacío.</p>';
                return;
            }

            cartItems.forEach(item => {
                const cartItemElement = document.createElement('div');
                cartItemElement.classList.add('product-card'); // Reutilizamos la misma clase
                cartItemElement.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <div class="product-info">
                        <h3>${item.name}</h3>
                        <p>$${item.price.toFixed(2)}</p>
                    </div>
                `;
                cartContainer.appendChild(cartItemElement);
            });
        })
        .catch(error => {
            console.error('Error al obtener el carrito:', error);
            const container = document.getElementById('carrito-items');
            container.innerHTML = '<p>No se pudo cargar el carrito.</p>';
        });
});
