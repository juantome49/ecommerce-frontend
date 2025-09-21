const backendURL = 'https://ecommerce-backend-byu5.onrender.com';
const adminCode = '258139';

// Lógica para el acceso al admin desde el footer
document.addEventListener('DOMContentLoaded', () => {
    const footer = document.querySelector('footer');
    if (footer) {
        footer.addEventListener('click', () => {
            const code = prompt("Introduce el código de administrador:");
            if (code === adminCode) {
                window.location.href = 'admin.html';
            } else if (code) {
                alert("Código incorrecto.");
            }
        });
    }

    // Lógica para el formulario de administración
    const adminForm = document.getElementById('admin-form');
    if (adminForm) {
        adminForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('product-name').value;
            const price = parseFloat(document.getElementById('product-price').value);
            const image = document.getElementById('product-image').value;
            const category = document.getElementById('product-category').value;
            const messageElement = document.getElementById('message');

            const newProduct = { name, price, image, category };
            
            try {
                const response = await fetch(`${backendURL}/api/admin/productos`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newProduct),
                });
                const data = await response.json();
                
                if (response.ok) {
                    messageElement.textContent = `Éxito: ${data.message}`;
                    adminForm.reset();
                } else {
                    messageElement.textContent = `Error: ${data.message}`;
                }
            } catch (error) {
                console.error('Error al subir el producto:', error);
                messageElement.textContent = 'Error al conectar con el servidor.';
            }
        });
    }
});
