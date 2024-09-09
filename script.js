// script.js

// Dados fictícios de produtos
const products = [
    { id: 1, name: 'Produto 1', price: 99.99, image: 'produto1.jpg' },
    { id: 2, name: 'Produto 2', price: 129.99, image: 'produto2.jpg' },
    { id: 3, name: 'Produto 3', price: 79.99, image: 'produto3.jpg' },
    { id: 4, name: 'Produto 4', price: 45.99, image: 'produto4.jpg' },
    { id: 5, name: 'Produto 5', price: 55.99, image: 'produto5.jpg' },
    { id: 6, name: 'Produto 6', price: 89.99, image: 'produto6.jpg' },
    { id: 7, name: 'Produto 7', price: 39.99, image: 'produto7.jpg' },
    { id: 8, name: 'Produto 8', price: 59.99, image: 'produto8.jpg' },
    
];

// Função para carregar produtos na página
function loadProducts() {
    const productList = document.querySelector('.product-list');
    products.forEach(product => {
        const productElement = document.createElement('article');
        productElement.classList.add('product');
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Descrição do ${product.name}. Ideal para cuidados especiais.</p>
            <span>R$ ${product.price.toFixed(2).replace('.', ',')}</span>
            <button onclick="addToCart(${product.id}, '${product.name}', ${product.price})">Adicionar ao Carrinho</button>
        `;
        productList.appendChild(productElement);
    });
}

// Função para adicionar itens ao carrinho
function addToCart(id, name, price) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItemIndex = cart.findIndex(item => item.id === id);

    if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity += 1;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// Função para atualizar a contagem de itens no carrinho
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    document.getElementById('itemCount').textContent = cart.length;
}

// Carregar produtos e atualizar a contagem ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    updateCartCount();
});
