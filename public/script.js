document.addEventListener('DOMContentLoaded', () => {
    const productsContainer = document.getElementById('products-container');
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const filterButtons = document.querySelectorAll('.filter-btn');
    

    const API_URL = 'https://serverlessdemo-nine.vercel.app/api/products';
    
    // Hiển thị sản phẩm
    async function fetchProducts(searchTerm = '', category = 'all') {
      try {
        let url = API_URL;
        
        if (searchTerm) {
          url = `${API_URL}/search/${searchTerm}`;
        }
        
        const response = await fetch(url);
        let products = await response.json();
        
        // Lọc theo danh mục
        if (category !== 'all') {
          products = products.filter(product => product.category === category);
        }
        
        displayProducts(products);
      } catch (error) {
        console.error('Lỗi khi tải sản phẩm:', error);
        productsContainer.innerHTML = '<p class="error">Không thể tải danh sách đồ uống. Vui lòng thử lại sau.</p>';
      }
    }
    
    // Hiển thị sản phẩm lên grid
    function displayProducts(products) {
      if (products.length === 0) {
        productsContainer.innerHTML = '<p class="no-results">Không tìm thấy đồ uống phù hợp.</p>';
        return;
      }
      
      productsContainer.innerHTML = products.map(product => `
        <div class="product-card">
          <div class="product-image">
            <i class="fas fa-coffee"></i>
          </div>
          <div class="product-info">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="product-price">${product.price.toLocaleString()} VND</div>
          </div>
        </div>
      `).join('');
    }
    
    // Xử lý tìm kiếm
    searchBtn.addEventListener('click', () => {
      const searchTerm = searchInput.value.trim();
      const activeCategory = document.querySelector('.filter-btn.active').dataset.category;
      fetchProducts(searchTerm, activeCategory);
    });
    
    // Xử lý bộ lọc
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        const category = button.dataset.category;
        const searchTerm = searchInput.value.trim();
        fetchProducts(searchTerm, category);
      });
    });
    
    // Tải sản phẩm ban đầu
    fetchProducts();
  });