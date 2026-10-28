/**
 * LUMINA BOTANICA - LUXURY SKINCARE E-COMMERCE STOREFRONT
 * Frontend Engine: Product Catalog, Dynamic Filtering & Sorting,
 * Modal Product Deep-Dives, Full Cart Flow with Promo Codes,
 * Multi-Step Checkout Simulator, and Interactive Skin Diagnostic Quiz.
 */

// Global State
const state = {
  products: [],
  cart: [],
  activeCategory: 'all',
  searchQuery: '',
  activeSort: 'featured',
  promoCode: null,
  discountRate: 0,
  freeShippingThreshold: 60.00,
  flatShippingRate: 5.00,
  taxRate: 0.08
};

// 8 Rich Botanical Products
const mockProducts = [
  {
    id: 1,
    name: "Radiance Renewal Vitamin C Serum",
    category: "serums",
    price: 58.00,
    volume: "30ml / 1.0 fl.oz",
    rating: 4.9,
    reviewsCount: 284,
    badge: "Bestseller",
    badgeType: "gold",
    icon: "fa-solid fa-spa",
    description: "A high-potency antioxidant serum formulated with 15% stabilized Vitamin C, Kakadu Plum, and Ferulic Acid to illuminate uneven skin tone, boost collagen synthesis, and neutralize free radicals.",
    botanicals: "15% THD Ascorbate, Snow Mushroom Extract, Wild Rosehip Seed, Sea Buckthorn.",
    usage: "Smooth 3–4 drops onto freshly cleansed, damp face and neck every morning. Follow with your Ceramide Soufflé.",
    bgGradient: "linear-gradient(135deg, #f7f1e6 0%, #e8dec9 100%)"
  },
  {
    id: 2,
    name: "Ceramide Barrier Defense Soufflé",
    category: "creams",
    price: 64.00,
    volume: "50ml / 1.7 fl.oz",
    rating: 5.0,
    reviewsCount: 342,
    badge: "Award Winner",
    badgeType: "gold",
    icon: "fa-solid fa-shield-heart",
    description: "A decadent, cloud-textured moisturizer infused with 5 essential skin-identical ceramides, ectoin, and gotu kola to lock in deep hydration and reinforce the moisture barrier.",
    botanicals: "Ceramides NP/AP/EOP, Centella Asiatica (Gotu Kola), Squalane, Colloidal Oat.",
    usage: "Massage a dime-sized amount gently into face and decolletage as the final moisturizing step morning and evening.",
    bgGradient: "linear-gradient(135deg, #eef4f0 0%, #dae6de 100%)"
  },
  {
    id: 3,
    name: "Botanical Velvet Cloud Cleanser",
    category: "cleansers",
    price: 38.00,
    volume: "150ml / 5.1 fl.oz",
    rating: 4.8,
    reviewsCount: 198,
    badge: "Organic",
    badgeType: "organic",
    icon: "fa-solid fa-soap",
    description: "A pH-balanced, non-stripping gel-to-milk cleanser that dissolves impurities, SPF, and pollution while soothing reactive skin with chamomile extract and elderberry oils.",
    botanicals: "Organic Roman Chamomile, Elderberry Seed Oil, Saponin Root, Aloe Barbadensis.",
    usage: "Lather with lukewarm water between palms, massage over skin for 60 seconds, and rinse clean.",
    bgGradient: "linear-gradient(135deg, #f5f0ec 0%, #e8ded8 100%)"
  },
  {
    id: 4,
    name: "Midnight Botanical Repair Night Oil",
    category: "serums",
    price: 72.00,
    volume: "30ml / 1.0 fl.oz",
    rating: 4.9,
    reviewsCount: 165,
    badge: "Cult Favorite",
    badgeType: "gold",
    icon: "fa-solid fa-moon",
    description: "An opulent nocturnal elixir blending blue tansy, cold-pressed chia seed, and bakuchiol (plant retinol) to stimulate overnight cellular regeneration without redness.",
    botanicals: "Moroccan Blue Tansy, Bakuchiol 2%, Organic Prickly Pear, Evening Primrose.",
    usage: "Press 3–5 drops into warm hands and gently cup over cheeks, forehead, and jawline before sleep.",
    bgGradient: "linear-gradient(135deg, #e6ecf2 0%, #ccd8e4 100%)"
  },
  {
    id: 5,
    name: "Rose Quartz Clarifying Facial Mist",
    category: "cleansers",
    price: 34.00,
    volume: "100ml / 3.4 fl.oz",
    rating: 4.7,
    reviewsCount: 112,
    badge: "Hydrating",
    badgeType: "organic",
    icon: "fa-solid fa-spray-can-sparkles",
    description: "A crystalline botanical mist combining pure organic Bulgarian rose hydrosol, witch hazel, and tremella mushroom to tone pores and refresh tired complexion throughout the day.",
    botanicals: "Distilled Rose Damascena, Tremella Fuciformis, Witch Hazel, Hibiscus Blossom.",
    usage: "Spritz generously over face post-cleanse, or whenever your skin craves an instant dew boost.",
    bgGradient: "linear-gradient(135deg, #faf0f2 0%, #f0d8dc 100%)"
  },
  {
    id: 6,
    name: "Hydra-Dew Hyaluronic Peptide Gel",
    category: "creams",
    price: 52.00,
    volume: "50ml / 1.7 fl.oz",
    rating: 4.8,
    reviewsCount: 220,
    badge: "Clean Active",
    badgeType: "organic",
    icon: "fa-solid fa-droplet",
    description: "Multi-weight hyaluronic acid complex paired with copper tripeptides that replenishes intercellular moisture reservoirs for a glass-skin, plump appearance.",
    botanicals: "Quadruple Molecular Hyaluronic Acid, Copper Tripeptide-1, Blue Algae Extract.",
    usage: "Apply morning and night after serums to seal in active humectants.",
    bgGradient: "linear-gradient(135deg, #edf6f8 0%, #d4ebf0 100%)"
  },
  {
    id: 7,
    name: "Matcha & Marine Clay Detox Mask",
    category: "cleansers",
    price: 44.00,
    volume: "75ml / 2.5 fl.oz",
    rating: 4.9,
    reviewsCount: 178,
    badge: "Purifying",
    badgeType: "organic",
    icon: "fa-solid fa-mortar-pestle",
    description: "Ceremonial Japanese matcha combined with French green clay and willow bark extract to draw out congested sebum and gently refine texture in 10 minutes.",
    botanicals: "Uji Matcha Green Tea, French Illite Clay, White Willow Bark, Spirulina.",
    usage: "Spread an even layer onto dry skin 2–3 times weekly. Allow to rest for 10 minutes before washing.",
    bgGradient: "linear-gradient(135deg, #edf3ed 0%, #d6e4d6 100%)"
  },
  {
    id: 8,
    name: "Aromatherapy Serenity Body Elixir",
    category: "wellness",
    price: 48.00,
    volume: "120ml / 4.0 fl.oz",
    rating: 4.9,
    reviewsCount: 145,
    badge: "Holistic",
    badgeType: "gold",
    icon: "fa-solid fa-feather",
    description: "A dry botanical body oil scented with organic lavender, vetiver, and bergamot peel that envelops the senses while nourishing parched limbs with golden jojoba.",
    botanicals: "Golden Jojoba Oil, French Lavender Essential Oil, Haitian Vetiver, Sweet Almond.",
    usage: "Smooth all over damp body right after bathing for a luminous, non-greasy satin sheen.",
    bgGradient: "linear-gradient(135deg, #f4f0eb 0%, #e2d9cd 100%)"
  }
];

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  state.products = [...mockProducts];
  loadCartFromStorage();
  initNavigation();
  initCatalog();
  initProductDetailModal();
  initCartDrawer();
  initCheckoutFlow();
  initSkinQuiz();
  initNewsletter();
});

/* ===================================================================
   1. NAVIGATION & SEARCH BAR
   =================================================================== */
function initNavigation() {
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const navMenu = document.getElementById('nav-menu');
  const searchBtn = document.getElementById('search-btn');
  const searchDropdown = document.getElementById('search-dropdown');
  const catalogSearch = document.getElementById('catalog-search');
  const clearSearchBtn = document.getElementById('clear-search-btn');

  // Mobile menu toggle
  if (mobileBtn && navMenu) {
    mobileBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', () => {
        navMenu.classList.remove('open');
        const filterCategory = item.getAttribute('data-filter');
        if (filterCategory) {
          switchCategory(filterCategory);
        }
      });
    });
  }

  // Search Toggle
  if (searchBtn && searchDropdown) {
    searchBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      searchDropdown.classList.toggle('hidden');
      if (!searchDropdown.classList.contains('hidden')) {
        catalogSearch.focus();
      }
    });

    document.addEventListener('click', (e) => {
      if (!searchDropdown.contains(e.target) && e.target !== searchBtn) {
        searchDropdown.classList.add('hidden');
      }
    });

    catalogSearch.addEventListener('input', (e) => {
      state.searchQuery = e.target.value.toLowerCase().trim();
      renderCatalog();
    });

    if (clearSearchBtn) {
      clearSearchBtn.addEventListener('click', () => {
        catalogSearch.value = '';
        state.searchQuery = '';
        renderCatalog();
      });
    }
  }
}

/* ===================================================================
   2. PRODUCT CATALOG (Rendering, Filtering, Sorting)
   =================================================================== */
function initCatalog() {
  const catTabs = document.querySelectorAll('.cat-tab');
  const sortSelect = document.getElementById('catalog-sort');

  // Category filter tabs
  catTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const cat = tab.getAttribute('data-category');
      switchCategory(cat);
    });
  });

  // Sort selector
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      state.activeSort = e.target.value;
      renderCatalog();
    });
  }

  // Quick Add on Hero banner button
  const heroQuickAdd = document.querySelector('[data-quick-add="1"]');
  if (heroQuickAdd) {
    heroQuickAdd.addEventListener('click', () => {
      addToCart(1, 1);
    });
  }

  renderCatalog();
}

function switchCategory(cat) {
  state.activeCategory = cat;

  // Update tabs UI
  document.querySelectorAll('.cat-tab').forEach(tab => {
    tab.classList.toggle('active', tab.getAttribute('data-category') === cat);
  });

  // Scroll smoothly to catalog
  const catalogEl = document.getElementById('catalog');
  if (catalogEl) {
    catalogEl.scrollIntoView({ behavior: 'smooth' });
  }

  renderCatalog();
}

function renderCatalog() {
  const grid = document.getElementById('products-grid');
  const resultsCounter = document.getElementById('results-count');
  if (!grid) return;

  // Filter products by category & search query
  let filtered = state.products.filter(item => {
    const matchesCategory = state.activeCategory === 'all' || item.category === state.activeCategory;
    const matchesSearch = !state.searchQuery ||
      item.name.toLowerCase().includes(state.searchQuery) ||
      item.botanicals.toLowerCase().includes(state.searchQuery) ||
      item.description.toLowerCase().includes(state.searchQuery);
    return matchesCategory && matchesSearch;
  });

  // Sort products
  if (state.activeSort === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (state.activeSort === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (state.activeSort === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  // Update status counter
  if (resultsCounter) {
    resultsCounter.textContent = `Showing ${filtered.length} of ${state.products.length} formulations`;
  }

  // Render cards
  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: #5e6d64;">
        <i class="fa-solid fa-leaf" style="font-size: 3rem; color: #557762; margin-bottom: 1rem; opacity: 0.5;"></i>
        <h3 style="font-size: 1.5rem; color: #1a2c22; margin-bottom: 0.5rem;">No Formulations Found</h3>
        <p>No products match your current search criteria. Try a different query or reset filters.</p>
        <button class="btn btn-luxury-secondary" style="margin-top: 1rem;" onclick="resetCatalogFilters()">Reset Filters</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(item => `
    <article class="product-card" data-id="${item.id}">
      <span class="product-badge ${item.badgeType}">${item.badge}</span>
      <div class="product-art-wrap" style="background: ${item.bgGradient};">
        <i class="${item.icon} botanical-icon"></i>
        <div class="product-card-actions">
          <button class="action-card-btn view-btn" onclick="openProductModal(${item.id})">
            <i class="fa-solid fa-eye"></i> Quick View
          </button>
          <button class="action-card-btn add-btn" onclick="addToCart(${item.id}, 1)">
            <i class="fa-solid fa-plus"></i> Add to Bag
          </button>
        </div>
      </div>
      <div class="product-details">
        <span class="product-category-tag">${formatCategory(item.category)}</span>
        <h3 class="product-name">${item.name}</h3>
        <div class="product-rating-row">
          <div class="stars">
            ${renderStars(item.rating)}
          </div>
          <span>${item.rating} (${item.reviewsCount})</span>
        </div>
        <div class="product-card-footer">
          <span class="product-price">$${item.price.toFixed(2)}</span>
          <span class="product-volume">${item.volume}</span>
        </div>
      </div>
    </article>
  `).join('');
}

window.resetCatalogFilters = function() {
  state.activeCategory = 'all';
  state.searchQuery = '';
  document.getElementById('catalog-search').value = '';
  document.querySelectorAll('.cat-tab').forEach(t => t.classList.toggle('active', t.getAttribute('data-category') === 'all'));
  renderCatalog();
};

function formatCategory(cat) {
  const map = {
    serums: "Serums & Elixirs",
    cleansers: "Gentle Cleansers",
    creams: "Hydrating Creams",
    wellness: "Holistic Wellness"
  };
  return map[cat] || cat;
}

function renderStars(rating) {
  let stars = '';
  for (let i = 1; i <= 5; i++) {
    stars += `<i class="fa-solid fa-star"></i>`;
  }
  return stars;
}

/* ===================================================================
   3. PRODUCT DETAIL MODAL (Quick View & Deep Dive)
   =================================================================== */
let activeModalProductId = null;
let modalQuantity = 1;

function initProductDetailModal() {
  const modal = document.getElementById('product-modal-overlay');
  const closeBtn = document.getElementById('close-product-modal-btn');
  const qtyMinus = document.getElementById('pmodal-qty-minus');
  const qtyPlus = document.getElementById('pmodal-qty-plus');
  const addToCartBtn = document.getElementById('pmodal-add-to-cart-btn');

  if (closeBtn) closeBtn.addEventListener('click', closeProductModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeProductModal();
    });
  }

  // Quantity stepper in modal
  if (qtyMinus && qtyPlus) {
    qtyMinus.addEventListener('click', () => {
      if (modalQuantity > 1) {
        modalQuantity--;
        updateModalQuantityUI();
      }
    });

    qtyPlus.addEventListener('click', () => {
      modalQuantity++;
      updateModalQuantityUI();
    });
  }

  // Add to Bag action from modal
  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', () => {
      if (activeModalProductId) {
        addToCart(activeModalProductId, modalQuantity);
        closeProductModal();
      }
    });
  }
}

window.openProductModal = function(id) {
  const product = state.products.find(p => p.id === id);
  if (!product) return;

  activeModalProductId = id;
  modalQuantity = 1;

  const modal = document.getElementById('product-modal-overlay');
  const modalBadge = document.getElementById('pmodal-badge');
  const modalArt = document.getElementById('pmodal-art');
  const modalImageBox = document.getElementById('pmodal-image-box');
  const modalCategory = document.getElementById('pmodal-category');
  const modalTitle = document.getElementById('pmodal-title');
  const modalRatingText = document.getElementById('pmodal-rating-text');
  const modalPrice = document.getElementById('pmodal-price');
  const modalVolume = document.getElementById('pmodal-volume');
  const modalDescription = document.getElementById('pmodal-description');
  const modalIngredients = document.getElementById('pmodal-ingredients');
  const modalUsage = document.getElementById('pmodal-usage');

  modalBadge.textContent = product.badge;
  modalBadge.className = `pmodal-badge ${product.badgeType}`;
  modalImageBox.style.background = product.bgGradient;
  modalArt.innerHTML = `<i class="${product.icon}"></i>`;
  modalCategory.textContent = formatCategory(product.category);
  modalTitle.textContent = product.name;
  modalRatingText.textContent = `${product.rating} (${product.reviewsCount} customer reviews)`;
  modalPrice.textContent = `$${product.price.toFixed(2)}`;
  modalVolume.textContent = product.volume;
  modalDescription.textContent = product.description;
  modalIngredients.innerHTML = `<strong>Botanical Blend:</strong><br>${product.botanicals}`;
  modalUsage.textContent = product.usage;

  updateModalQuantityUI();

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
};

function updateModalQuantityUI() {
  const qtyVal = document.getElementById('pmodal-qty-val');
  const btnPrice = document.getElementById('pmodal-btn-price');
  const product = state.products.find(p => p.id === activeModalProductId);

  if (qtyVal) qtyVal.textContent = modalQuantity;
  if (btnPrice && product) {
    const total = product.price * modalQuantity;
    btnPrice.textContent = `• $${total.toFixed(2)}`;
  }
}

function closeProductModal() {
  const modal = document.getElementById('product-modal-overlay');
  if (modal) modal.classList.add('hidden');
  document.body.style.overflow = '';
}

/* ===================================================================
   4. SHOPPING BAG & CART STATE MANAGEMENT
   =================================================================== */
function initCartDrawer() {
  const openCartBtn = document.getElementById('open-cart-btn');
  const closeCartBtn = document.getElementById('close-cart-btn');
  const cartOverlay = document.getElementById('cart-drawer-overlay');
  const applyPromoBtn = document.getElementById('apply-promo-btn');
  const promoInput = document.getElementById('promo-input');
  const checkoutBtn = document.getElementById('proceed-checkout-btn');

  if (openCartBtn) {
    openCartBtn.addEventListener('click', openCartDrawer);
  }
  if (closeCartBtn) {
    closeCartBtn.addEventListener('click', closeCartDrawer);
  }
  if (cartOverlay) {
    cartOverlay.addEventListener('click', (e) => {
      if (e.target === cartOverlay) closeCartDrawer();
    });
  }

  // Promo code handler
  if (applyPromoBtn && promoInput) {
    applyPromoBtn.addEventListener('click', () => {
      const code = promoInput.value.trim().toUpperCase();
      applyPromoCode(code);
    });
  }

  // Proceed to Checkout
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (state.cart.length === 0) {
        showToast('Your ritual bag is empty.', 'error');
        return;
      }
      closeCartDrawer();
      openCheckoutModal();
    });
  }

  updateCartUI();
}

function openCartDrawer() {
  const cartOverlay = document.getElementById('cart-drawer-overlay');
  if (cartOverlay) {
    cartOverlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}

function closeCartDrawer() {
  const cartOverlay = document.getElementById('cart-drawer-overlay');
  if (cartOverlay) {
    cartOverlay.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

window.addToCart = function(productId, quantity = 1) {
  const product = state.products.find(p => p.id === productId);
  if (!product) return;

  const existing = state.cart.find(item => item.id === productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    state.cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      volume: product.volume,
      icon: product.icon,
      quantity: quantity
    });
  }

  saveCartToStorage();
  updateCartUI();
  showToast(`Added ${quantity}x "${product.name}" to your bag!`, 'success');
  openCartDrawer();
};

window.modifyCartItemQty = function(productId, delta) {
  const item = state.cart.find(i => i.id === productId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    removeFromCart(productId);
    return;
  }

  saveCartToStorage();
  updateCartUI();
};

window.removeFromCart = function(productId) {
  state.cart = state.cart.filter(i => i.id !== productId);
  saveCartToStorage();
  updateCartUI();
  showToast('Item removed from your bag.', 'info');
};

function updateCartUI() {
  const badge = document.getElementById('cart-count-badge');
  const itemsTotal = document.getElementById('cart-items-total');
  const container = document.getElementById('cart-items-container');
  const subtotalEl = document.getElementById('cart-subtotal');
  const discountRow = document.getElementById('cart-discount-row');
  const discountEl = document.getElementById('cart-discount');
  const shippingEl = document.getElementById('cart-shipping');
  const taxEl = document.getElementById('cart-tax');
  const totalEl = document.getElementById('cart-total');
  const progressFill = document.getElementById('shipping-progress-fill');
  const progressText = document.getElementById('shipping-status-text');

  // Compute total item count
  const totalCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  if (badge) badge.textContent = totalCount;
  if (itemsTotal) itemsTotal.textContent = totalCount;

  // Render items
  if (container) {
    if (state.cart.length === 0) {
      container.innerHTML = `
        <div class="empty-cart-state">
          <i class="fa-solid fa-leaf"></i>
          <h4>Your Ritual Bag is Empty</h4>
          <p>Discover our clean botanical apothecary and awaken your skin's natural glow.</p>
          <button class="btn btn-luxury-primary" style="margin-top: 1.5rem;" onclick="closeCartDrawer()">Start Exploring</button>
        </div>
      `;
    } else {
      container.innerHTML = state.cart.map(item => `
        <div class="cart-item">
          <div class="cart-item-thumb">
            <i class="${item.icon}"></i>
          </div>
          <div class="cart-item-info">
            <h4 class="cart-item-title">${item.name}</h4>
            <span class="cart-item-vol">${item.volume}</span>
            <div class="cart-item-bottom">
              <div class="qty-stepper">
                <button class="qty-btn" onclick="modifyCartItemQty(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button class="qty-btn" onclick="modifyCartItemQty(${item.id}, 1)">+</button>
              </div>
              <span class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
              <button class="remove-item-btn" onclick="removeFromCart(${item.id})" title="Remove item">
                <i class="fa-solid fa-trash-can"></i>
              </button>
            </div>
          </div>
        </div>
      `).join('');
    }
  }

  // Calculations
  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = subtotal * state.discountRate;
  const eligibleForFreeShipping = subtotal >= state.freeShippingThreshold || (state.promoCode === 'FREESHIP');
  const shipping = subtotal === 0 ? 0 : (eligibleForFreeShipping ? 0 : state.flatShippingRate);
  const taxableAmount = Math.max(0, subtotal - discount);
  const tax = taxableAmount * state.taxRate;
  const total = taxableAmount + shipping + tax;

  if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;

  if (discountRow && discountEl) {
    if (discount > 0) {
      discountRow.classList.remove('hidden');
      discountEl.textContent = `-$${discount.toFixed(2)}`;
    } else {
      discountRow.classList.add('hidden');
    }
  }

  if (shippingEl) {
    shippingEl.textContent = shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`;
  }
  if (taxEl) taxEl.textContent = `$${tax.toFixed(2)}`;
  if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;

  // Free shipping progress bar
  if (progressFill && progressText) {
    if (subtotal >= state.freeShippingThreshold) {
      progressFill.style.width = '100%';
      progressText.innerHTML = `<span>✨ <strong>Unlocked!</strong> You qualify for Free Carbon-Neutral Shipping</span>`;
    } else {
      const remaining = (state.freeShippingThreshold - subtotal).toFixed(2);
      const percentage = Math.min(100, Math.floor((subtotal / state.freeShippingThreshold) * 100));
      progressFill.style.width = `${percentage}%`;
      progressText.innerHTML = `<span>Add <strong>$${remaining}</strong> more for Free Shipping</span><span>${percentage}%</span>`;
    }
  }
}

function applyPromoCode(code) {
  const statusEl = document.getElementById('promo-status');
  if (!statusEl) return;

  if (code === 'LUMINA15') {
    state.promoCode = 'LUMINA15';
    state.discountRate = 0.15;
    statusEl.textContent = '✓ 15% discount applied successfully!';
    statusEl.className = 'promo-status success';
    statusEl.classList.remove('hidden');
    showToast('Promo code LUMINA15 applied!', 'success');
  } else if (code === 'FREESHIP') {
    state.promoCode = 'FREESHIP';
    state.discountRate = 0;
    statusEl.textContent = '✓ Free shipping unlocked!';
    statusEl.className = 'promo-status success';
    statusEl.classList.remove('hidden');
    showToast('Free shipping unlocked with code FREESHIP!', 'success');
  } else {
    statusEl.textContent = 'Invalid promo code. Try LUMINA15 or FREESHIP';
    statusEl.className = 'promo-status error';
    statusEl.classList.remove('hidden');
  }

  updateCartUI();
}

function saveCartToStorage() {
  localStorage.setItem('lumina-botanica-cart', JSON.stringify(state.cart));
}

function loadCartFromStorage() {
  try {
    const saved = localStorage.getItem('lumina-botanica-cart');
    if (saved) {
      state.cart = JSON.parse(saved);
    }
  } catch (e) {
    state.cart = [];
  }
}

/* ===================================================================
   5. CHECKOUT FLOW MODAL
   =================================================================== */
function initCheckoutFlow() {
  const overlay = document.getElementById('checkout-modal-overlay');
  const closeBtn = document.getElementById('close-checkout-modal-btn');
  const shippingForm = document.getElementById('shipping-form');
  const paymentForm = document.getElementById('payment-form');
  const continueShoppingBtn = document.getElementById('continue-shopping-btn');

  if (closeBtn) closeBtn.addEventListener('click', closeCheckoutModal);
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeCheckoutModal();
    });
  }

  // STEP 1: Shipping form submit
  if (shippingForm) {
    shippingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const fn = document.getElementById('ship-first-name').value.trim();
      const ln = document.getElementById('ship-last-name').value.trim();
      const email = document.getElementById('ship-email').value.trim();
      const address = document.getElementById('ship-address').value.trim();

      const alertEl = document.getElementById('shipping-error-alert');
      if (!fn || !ln || !email || !address) {
        if (alertEl) alertEl.classList.remove('hidden');
        return;
      }
      if (alertEl) alertEl.classList.add('hidden');

      // Move to Step 2
      setCheckoutStep(2);
    });
  }

  // STEP 2: Payment form submit
  if (paymentForm) {
    paymentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const payBtn = document.getElementById('pay-now-btn');
      payBtn.disabled = true;
      payBtn.textContent = 'Authorizing Payment...';

      setTimeout(() => {
        payBtn.disabled = false;
        payBtn.textContent = 'Complete Purchase';

        // Generate Order ID & populate Step 3
        const randomId = Math.floor(10000 + Math.random() * 90000);
        document.getElementById('confirmed-order-id').textContent = `#LUM-${randomId}`;

        const recapBox = document.getElementById('order-recap-box');
        if (recapBox) {
          const totalVal = document.getElementById('chk-total-payable').textContent;
          recapBox.innerHTML = `
            <div style="font-size: 0.9rem; margin-bottom: 0.5rem;">
              <strong>Items Purchased:</strong> ${state.cart.map(i => `${i.quantity}x ${i.name}`).join(', ')}
            </div>
            <div style="font-size: 0.9rem; color: #1a2c22;">
              <strong>Amount Paid:</strong> ${totalVal}
            </div>
          `;
        }

        // Clear Cart
        state.cart = [];
        saveCartToStorage();
        updateCartUI();

        // Show Step 3
        setCheckoutStep(3);
        showToast('Payment successful! Order confirmed.', 'success');
      }, 1200);
    });
  }

  if (continueShoppingBtn) {
    continueShoppingBtn.addEventListener('click', () => {
      closeCheckoutModal();
    });
  }
}

function openCheckoutModal() {
  const overlay = document.getElementById('checkout-modal-overlay');
  if (!overlay) return;

  setCheckoutStep(1);

  // Update total payable
  const totalEl = document.getElementById('cart-total');
  const chkPayable = document.getElementById('chk-total-payable');
  if (totalEl && chkPayable) {
    chkPayable.textContent = totalEl.textContent;
  }

  overlay.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeCheckoutModal() {
  const overlay = document.getElementById('checkout-modal-overlay');
  if (overlay) overlay.classList.add('hidden');
  document.body.style.overflow = '';
}

function setCheckoutStep(stepNumber) {
  // Update indicator tags
  document.getElementById('step-indicator-1').classList.toggle('active', stepNumber === 1);
  document.getElementById('step-indicator-2').classList.toggle('active', stepNumber === 2);
  document.getElementById('step-indicator-3').classList.toggle('active', stepNumber === 3);

  // Switch panes
  document.getElementById('checkout-step-1').classList.toggle('hidden', stepNumber !== 1);
  document.getElementById('checkout-step-2').classList.toggle('hidden', stepNumber !== 2);
  document.getElementById('checkout-step-3').classList.toggle('hidden', stepNumber !== 3);
}

/* ===================================================================
   6. SKIN DIAGNOSTIC QUIZ
   =================================================================== */
const quizQuestions = [
  {
    title: "What is your skin's primary aspiration?",
    subtitle: "Select your main botanical goal:",
    options: [
      { text: "Luminous Radiance & Even Tone", recProduct: 1 },
      { text: "Barrier Repair & Calming Redness", recProduct: 2 },
      { text: "Gentle Pore Cleansing & Clarifying", recProduct: 3 },
      { text: "Deep Overnight Rejuvenation", recProduct: 4 }
    ]
  },
  {
    title: "How does your skin feel in mid-afternoon?",
    subtitle: "Understanding your hydration retention:",
    options: [
      { text: "Tight, dry, or craving a moisture mist", recProduct: 2 },
      { text: "Balanced, comfortable, and supple", recProduct: 1 },
      { text: "Oily in T-zone with congested pores", recProduct: 7 },
      { text: "Sensitized, warm, or easily flushed", recProduct: 3 }
    ]
  }
];

let currentQuizIndex = 0;
let userQuizChoices = [];

function initSkinQuiz() {
  const openQuizNav = document.getElementById('quiz-btn-nav');
  const openQuizHero = document.getElementById('hero-quiz-trigger');
  const openQuizSec = document.getElementById('open-quiz-modal-btn');
  const overlay = document.getElementById('quiz-modal-overlay');
  const closeBtn = document.getElementById('close-quiz-btn');

  const triggers = [openQuizNav, openQuizHero, openQuizSec];
  triggers.forEach(btn => {
    if (btn) {
      btn.addEventListener('click', () => {
        openQuiz();
      });
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      overlay.classList.add('hidden');
      document.body.style.overflow = '';
    });
  }

  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.add('hidden');
        document.body.style.overflow = '';
      }
    });
  }
}

function openQuiz() {
  const overlay = document.getElementById('quiz-modal-overlay');
  currentQuizIndex = 0;
  userQuizChoices = [];
  renderQuizStep();
  overlay.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function renderQuizStep() {
  const container = document.getElementById('quiz-step-container');
  if (!container) return;

  if (currentQuizIndex < quizQuestions.length) {
    const q = quizQuestions[currentQuizIndex];
    container.innerHTML = `
      <span style="font-size: 0.75rem; text-transform: uppercase; color: #c39a55; font-weight: 700; letter-spacing: 0.1em;">
        Step ${currentQuizIndex + 1} of ${quizQuestions.length}
      </span>
      <h3 class="quiz-step-title">${q.title}</h3>
      <p class="quiz-step-sub">${q.subtitle}</p>
      <div class="quiz-options-list">
        ${q.options.map((opt, i) => `
          <button class="quiz-option-btn" onclick="selectQuizOption(${opt.recProduct})">
            <span>${opt.text}</span>
            <i class="fa-solid fa-chevron-right" style="color: #c39a55; font-size: 0.8rem;"></i>
          </button>
        `).join('')}
      </div>
    `;
  } else {
    // Show Consultation Result
    const recId = userQuizChoices[0] || 1;
    const recommendedProduct = state.products.find(p => p.id === recId) || state.products[0];

    container.innerHTML = `
      <div style="text-align: center;">
        <span style="font-size: 2.2rem; color: #557762; margin-bottom: 0.5rem; display: inline-block;">🌿</span>
        <h3 class="quiz-step-title">Your Prescribed Ritual</h3>
        <p class="quiz-step-sub">Based on your botanical profile, we recommend starting with:</p>

        <div style="background: #faf7f2; border: 1px solid #eae4d8; border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem; text-align: left;">
          <h4 style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 1.4rem; color: #1a2c22; margin-bottom: 0.35rem;">
            ${recommendedProduct.name}
          </h4>
          <p style="font-size: 0.88rem; color: #5e6d64; margin-bottom: 1rem;">${recommendedProduct.description}</p>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <strong style="font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; color: #1a2c22;">$${recommendedProduct.price.toFixed(2)}</strong>
            <button class="btn btn-luxury-primary" onclick="addQuizResultToCart(${recommendedProduct.id})">
              Add to Bag
            </button>
          </div>
        </div>

        <button class="btn btn-luxury-secondary" onclick="openQuiz()">Retake Consultation</button>
      </div>
    `;
  }
}

window.selectQuizOption = function(recProductId) {
  userQuizChoices.push(recProductId);
  currentQuizIndex++;
  renderQuizStep();
};

window.addQuizResultToCart = function(productId) {
  addToCart(productId, 1);
  const overlay = document.getElementById('quiz-modal-overlay');
  if (overlay) overlay.classList.add('hidden');
  document.body.style.overflow = '';
};

/* ===================================================================
   7. NEWSLETTER SUBSCRIPTION
   =================================================================== */
function initNewsletter() {
  const form = document.getElementById('newsletter-form');
  const emailInput = document.getElementById('newsletter-email');
  const msgEl = document.getElementById('newsletter-msg');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailRegex.test(email)) {
      msgEl.textContent = 'Please enter a valid email address.';
      msgEl.className = 'newsletter-msg error';
      return;
    }

    msgEl.textContent = 'Welcome to the Botanical Circle! Check your inbox for your 15% discount.';
    msgEl.className = 'newsletter-msg success';
    emailInput.value = '';
    showToast('Subscribed to LUMINA Botanical Circle!', 'success');
  });
}

/* ===================================================================
   8. TOAST NOTIFICATION HELPER
   =================================================================== */
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';

  const iconClass = type === 'success' ? 'fa-solid fa-circle-check' : 'fa-solid fa-leaf';
  toast.innerHTML = `
    <i class="${iconClass}"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}
