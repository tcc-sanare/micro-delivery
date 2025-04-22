document.getElementById('app').innerHTML = `
  <div class="login-container">
    <h1>Delivery App</h1>
    <form id="loginForm">
      <div class="input-group">
        <label>Email</label>
        <input type="email" placeholder="nicolas@gmail.com" required>
      </div>
      <div class="input-group">
        <label>Senha</label>
        <input type="password" placeholder="" required>
      </div>
      <button type="submit">ENTRAR</button>
    </form>
  </div>
`;

// Após login, redireciona para avaliações
document.getElementById('loginForm').addEventListener('submit', (e) => {
  e.preventDefault();
  window.location.href = 'avaliacoes.html'; // Ou carrega via JS
});