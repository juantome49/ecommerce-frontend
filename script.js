const backendURL = 'https://ecommerce-backend-byu5.onrender.com';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Obtener productos del backend
    fetch(`${backendURL}/api/productos`)
        .then(response => response.json())
        .then(products => {
            const productsContainer = document.getElementById('productos-container');

            products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.classList.add('product-card');
                productCard.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <div class="product-info">
                        <h3>${product.name}</h3>
                        <p>$${product.price.toFixed(2)}</p>
                        <button class="btn-add" data-id="${product.id}">AÑADIR AL CARRITO</button>
                    </div>
                `;
                productsContainer.appendChild(productCard);
            });

            // 2. Añadir el evento de click a los botones
            document.querySelectorAll('.btn-add').forEach(button => {
                button.addEventListener('click', (event) => {
                    const productId = event.target.dataset.id;
                    
                    fetch(`${backendURL}/api/carrito`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ productId }),
                    })
                    .then(response => response.json())
                    .then(data => {
                        alert(data.message);
                        console.log('Respuesta del backend:', data);
                    })
                    .catch(error => {
                        console.error('Error al agregar producto:', error);
                        alert('Hubo un error al añadir el producto al carrito.');
                    });
                });
            });
        })
        .catch(error => {
            console.error('Error al obtener los productos:', error);
            const container = document.getElementById('productos-container');
            container.innerHTML = '<p>No se pudo cargar el catálogo de productos.</p>';
        });
});
