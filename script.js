(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#primary-nav');
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
      nav.classList.toggle('open', !isOpen);
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation');
      nav.classList.remove('open');
    }));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && nav.classList.contains('open')) {
        nav.classList.remove('open');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.focus();
      }
    });
  }

  const filterButtons = document.querySelectorAll('[data-filter]');
  const products = document.querySelectorAll('.collection-product[data-category]');
  if (filterButtons.length && products.length) {
    filterButtons.forEach(button => button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      filterButtons.forEach(item => {
        const active = item === button;
        item.classList.toggle('active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      products.forEach(product => {
        const categories = product.dataset.category.split(/\s+/);
        product.hidden = filter !== 'all' && !categories.includes(filter);
      });
    }));
  }

  const mainImage = document.querySelector('#main-product-image');
  const thumbs = document.querySelectorAll('.gallery-thumb');
  if (mainImage && thumbs.length) {
    thumbs.forEach(thumb => thumb.addEventListener('click', () => {
      mainImage.src = thumb.dataset.image;
      mainImage.alt = thumb.dataset.alt || 'Bata formal shoe';
      thumbs.forEach(item => item.classList.toggle('active', item === thumb));
    }));
  }

  const sizeSelect = document.querySelector('#shoe-size');
  const sizeMessage = document.querySelector('#size-message');
  const amazonLink = document.querySelector('#amazon-link');
  if (sizeSelect && sizeMessage) {
    sizeSelect.addEventListener('change', () => {
      if (sizeSelect.value) {
        sizeMessage.textContent = `UK ${sizeSelect.value} selected for demonstration. This prototype does not check live stock.`;
        sizeMessage.classList.remove('error');
      } else {
        sizeMessage.textContent = 'Size selection is for demonstration only; live availability is not connected.';
        sizeMessage.classList.remove('error');
      }
    });
    if (amazonLink) {
      amazonLink.addEventListener('click', event => {
        if (!sizeSelect.value) {
          event.preventDefault();
          sizeMessage.textContent = 'Please choose a demonstration size first. This will not reserve stock or pass your size to Amazon.';
          sizeMessage.classList.add('error');
          sizeSelect.focus();
        }
      });
    }
  }

  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', () => img.classList.add('image-unavailable'), { once: true });
  });
})();
