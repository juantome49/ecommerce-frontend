const backendURL = 'https://ecommerce-backend-byu5.onrender.com';

document.addEventListener('DOMContentLoaded', () => {
    // Ejemplo de cómo obtener datos de un producto (esto es un mock)
    const products = [
        { id: 1, name: "Reloj Clásico", price: 250, image: "https://via.placeholder.com/250x250/B38E5A/121212?text=RELOJ" },
        { id: 2, name: "Pulsera de Cuero", price: 80, image: "https://via.placeholder.com/250x250/B38E5A/121212?text=PULSERA" },
        { id: 3, name: "Gemelos de Lujo", price: 150, image: "https://via.placeholder.com/250x250/B38E5A/121212?text=GEMELOS" }
    ];

    const productsContainer = document.getElementById('productos-container');

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button class="btn-add" data-id="${product.id}">Agregar al Carrito</button>
        `;
        productsContainer.appendChild(productCard);
    });
});
