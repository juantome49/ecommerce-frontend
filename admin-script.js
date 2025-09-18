document.addEventListener('DOMContentLoaded', () => {
    // 1. Verificar si el usuario está autenticado
    const token = localStorage.getItem('token');
    if (!token) {
        // Si no hay token, redirige al usuario a la página de login
        window.location.href = 'login.html';
        return; // Detiene la ejecución del script
    }

    // URL de tu backend en Render
    const API_URL = 'https://e-commerce-qflc.onrender.com/api/products';

    const productForm = document.getElementById('product-form');
    const tableBody = document.getElementById('product-table-body');

    // 2. Manejar el formulario para agregar un nuevo producto (POST)
    if (productForm) {
        productForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const newProduct = {
                name: document.getElementById('name').value,
                description: document.getElementById('description').value,
                price: parseFloat(document.getElementById('price').value),
                stock: parseInt(document.getElementById('stock').value),
                category: document.getElementById('category').value,
                imageUrl: document.getElementById('imageUrl').value,
            };

            try {
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}` // <--- Envía el token
                    },
                    body: JSON.stringify(newProduct)
                });
                
                if (response.ok) {
                    alert('Producto agregado con éxito!');
                    productForm.reset();
                    fetchAndDisplayAdminProducts();
                } else {
                    alert('Error al agregar el producto. ¿Credenciales inválidas?');
                }
            } catch (error) {
                console.error('Error al agregar el producto:', error);
                alert('Error de conexión con el servidor.');
            }
        });
    }

    // 3. Manejar el botón de eliminar producto (DELETE)
    if (tableBody) {
        tableBody.addEventListener('click', async (e) => {
            if (e.target.classList.contains('btn-delete')) {
                const productId = e.target.getAttribute('data-id');
                if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
                    try {
                        const response = await fetch(`${API_URL}/${productId}`, {
                            method: 'DELETE',
                            headers: {
                                'Authorization': `Bearer ${token}` // <--- Envía el token
                            }
                        });

                        if (response.ok) {
                            alert('Producto eliminado con éxito!');
                            fetchAndDisplayAdminProducts(); // Recargar la tabla
                        } else {
                            alert('Error al eliminar el producto. ¿Credenciales inválidas?');
                        }
                    } catch (error) {
                        console.error('Error al eliminar el producto:', error);
                        alert('Error de conexión con el servidor.');
                    }
                }
            }
        });
        
        // 4. Obtener y mostrar todos los productos (GET)
        fetchAndDisplayAdminProducts();
    }
});

async function fetchAndDisplayAdminProducts() {
    try {
        // La petición GET para listar productos NO necesita el token, ya que es una ruta pública
        const response = await fetch('https://e-commerce-qflc.onrender.com/api/products');
        const products = await response.json();
        const tableBody = document.getElementById('product-table-body');
        tableBody.innerHTML = '';

        products.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.name}</td>
                <td>$${product.price.toFixed(2)}</td>
                <td>${product.stock}</td>
                <td>
                    <button class="btn btn-secondary btn-edit" data-id="${product._id}">Editar</button>
                    <button class="btn btn-primary btn-delete" data-id="${product._id}">Eliminar</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        const tableBody = document.getElementById('product-table-body');
        tableBody.innerHTML = '<tr><td colspan="4">Error al cargar productos.</td></tr>';
    }
}