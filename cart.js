// cart.js

// Função para carregar os itens do carrinho
function loadCart() {
    const cartItems = document.getElementById('cartItems');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    cartItems.innerHTML = ''; // Limpa itens existentes
    cart.forEach(item => {
        const cartItemElement = document.createElement('article');
        cartItemElement.classList.add('cart-item');
        cartItemElement.dataset.id = item.id;
        cartItemElement.innerHTML = `
            <img src="produto${item.id}.jpg" alt="${item.name}">
            <div class="item-details">
                <h3>${item.name}</h3>
                <p>Descrição do ${item.name}.</p>
                <span class="price">R$ ${item.price.toFixed(2).replace('.', ',')}</span>
                <input type="number" value="${item.quantity}" min="1" class="quantity" onchange="updateCart()">
                <button onclick="removeItem(this)">Remover</button>
            </div>
        `;
        cartItems.appendChild(cartItemElement);
    });

    updateCart();
}

// Função para atualizar o carrinho
function updateCart() {
    let subtotal = 0;
    const items = document.querySelectorAll('.cart-item');
    items.forEach(item => {
        const price = parseFloat(item.querySelector('.price').textContent.replace('R$', '').replace(',', '.'));
        const quantity = parseInt(item.querySelector('.quantity').value);
        subtotal += price * quantity;
    });

    const deliveryFee = 10.00;
    const discount = 5.00;
    const total = subtotal + deliveryFee - discount;

    document.getElementById('subtotal').textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
    document.getElementById('deliveryFee').textContent = `R$ ${deliveryFee.toFixed(2).replace('.', ',')}`;
    document.getElementById('discount').textContent = `R$ ${discount.toFixed(2).replace('.', ',')}`;
    document.getElementById('total').textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

// Função para remover um item do carrinho
function removeItem(button) {
    const item = button.closest('.cart-item');
    const id = parseInt(item.dataset.id);
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = cart.filter(cartItem => cartItem.id !== id);

    localStorage.setItem('cart', JSON.stringify(updatedCart));
    loadCart();
}

// Função para exibir instruções de pagamento
function showPaymentInstructions() {
    const total = parseFloat(document.getElementById('total').textContent.replace('R$', '').replace(',', '.'));
    if (total <= 0) {
        alert('Seu carrinho está vazio. Adicione itens ao carrinho antes de finalizar a compra.');
        return;
    }
    alert('Obrigado por sua compra! Para finalizar, por favor faça o pagamento via Pix para a chave PIX: 123.456.789-00. Após o pagamento, envie o comprovante para nosso e-mail para confirmarmos o recebimento.');
}

// Carregar itens do carrinho ao carregar a página
document.addEventListener('DOMContentLoaded', loadCart);
