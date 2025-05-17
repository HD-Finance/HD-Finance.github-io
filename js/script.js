const productListContainer = document.getElementById('product-list');

const products = [
  {
    category: 'rumah-tangga',
    title: 'Bekal Makan',
    image: 'images/bekal.jpg',
    alt: 'Bekal',
    link: 'https://s.shopee.co.id/2qI5VZfkbG'
  },
  {
    category: 'rumah-tangga',
    title: 'Botol Minum',
    image: 'images/botol.jpg',
    alt: 'Botol',
    link: 'https://s.shopee.co.id/10qRKGi9rg'
  },
  {
    category: 'elektronik',
    title: 'Kulkas 1 Pintu',
    image: 'images/kulkas.jpg',
    alt: 'Kulkas',
    link: 'https://s.shopee.co.id/AUhWdmfZ8k'
  },
  {
    category: 'elektronik',
    title: 'Router Wifi',
    image: 'images/router.jpg',
    alt: 'Router',
    link: 'https://s.shopee.co.id/2VfF77ZkVE'
  }
];

// Helper function to create a product card element
function createProductCard(product) {
  const card = document.createElement('div');
  card.className = 'product-card';

  const img = document.createElement('img');
  img.src = product.image;
  img.alt = product.alt;
  img.style.cursor = 'pointer';

  const title = document.createElement('h3');
  title.textContent = product.title;

  const link = document.createElement('a');
  link.href = product.link;
  link.target = '_blank';
  link.textContent = 'Beli Sekarang';

  card.appendChild(img);
  card.appendChild(title);
  card.appendChild(link);

  return card;
}

// Render all products sorted by title
function renderProducts() {
  productListContainer.innerHTML = '';
  const sortedProducts = products.slice().sort((a, b) => a.title.localeCompare(b.title));
  sortedProducts.forEach(product => {
    const card = createProductCard(product);
    productListContainer.appendChild(card);
  });
}

// Event delegation for product image clicks to open modal
productListContainer.addEventListener('click', event => {
  const target = event.target;
  if (target.tagName === 'IMG' && target.closest('.product-card')) {
    const card = target.closest('.product-card');
    modalImage.src = target.src;
    modalImage.alt = target.alt;
    modalTitle.textContent = card.querySelector('h3').textContent;
    modalLink.href = card.querySelector('a').href;
    modal.style.display = 'flex';
  }
});

const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', debounce(() => {
  filterProducts(searchInput.value.toLowerCase());
}, 300));

// Debounce function to limit the rate of function calls
function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

// Filter products based on query
function filterProducts(query) {
  const cards = productListContainer.querySelectorAll('.product-card');
  cards.forEach(card => {
    const title = card.querySelector('h3').textContent.toLowerCase();
    card.style.display = title.includes(query) ? '' : 'none';
  });
}

// Modal elements
const modal = document.getElementById('productModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalLink = document.getElementById('modalLink');
const modalClose = document.getElementById('modalClose');

// Close modal on close button click
modalClose.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Close modal when clicking outside modal content
modal.addEventListener('click', e => {
  if (e.target === modal) modal.style.display = 'none';
});

renderProducts();
