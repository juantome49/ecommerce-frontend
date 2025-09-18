document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');
    // Asegúrate de que esta URL coincida con la de tu backend desplegado
    const API_URL = 'https://e-commerce-qflc.onrender.com/api/login';

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password })
                });

                if (response.ok) {
                    const data = await response.json();
                    localStorage.setItem('token', data.accessToken);
                    window.location.href = 'admin.html'; // Redirigir al panel de administración
                } else {
                    errorMessage.textContent = 'Credenciales incorrectas';
                }
            } catch (error) {
                console.error('Error de red:', error);
                errorMessage.textContent = 'Error de conexión con el servidor';
            }
        });
    }
});