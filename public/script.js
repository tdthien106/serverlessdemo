document.addEventListener('DOMContentLoaded', () => {
    const productsContainer = document.getElementById('products-container');
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // API URL - kiểm tra kỹ URL của bạn
    const API_URL = 'https://serverlessdemo-nine.vercel.app/api/products';
    
    console.log('Đang kết nối tới API:', API_URL); // Debug
  
    async function fetchProducts(searchTerm = '', category = 'all') {
      try {
        let url = API_URL;
        
        if (searchTerm) {
          url = `${API_URL}/search/${encodeURIComponent(searchTerm)}`;
        }
        
        const response = await fetch(url, {
          headers: {
            'Accept': 'application/json'
          }
        });
        
        console.log('API Response:', response); // Debug
        
        if (!response.ok) {
          throw new Error(`Lỗi HTTP: ${response.status}`);
        }
        
        const products = await response.json();
        console.log('Dữ liệu nhận được:', products); // Debug
        
        if (!Array.isArray(products)) {
          throw new Error('Dữ liệu không hợp lệ');
        }
        
        displayProducts(
          category === 'all' 
            ? products 
            : products.filter(p => p.category === category)
        );
      } catch (error) {
        console.error('Chi tiết lỗi:', error);
        productsContainer.innerHTML = `
          <p class="error">
            Không thể tải danh sách đồ uống. 
            <button onclick="location.reload()">Thử lại</button>
            <br><small>${error.message}</small>
          </p>
        `;
      }
    }
    // Hiển thị sản phẩm lên grid
  function displayProducts(products) {
    if (!products || products.length === 0) {
      productsContainer.innerHTML = '<p class="no-results">Không tìm thấy đồ uống phù hợp.</p>';
      return;
    }
    
    productsContainer.innerHTML = products.map(product => `
      <div class="product-card">
        <div class="product-image">
          ${getProductIcon(product.category)}
        </div>
        <div class="product-info">
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <div class="product-price">${product.price.toLocaleString('vi-VN')} VND</div>
        </div>
      </div>
    `).join('');
  }

  // Lấy icon phù hợp
  function getProductIcon(category) {
    switch(category) {
      case 'Cà phê':
        return '<i class="fas fa-coffee"></i>';
      case 'Nước ép':
        return '<i class="fas fa-glass-whiskey"></i>';
      default:
        return '<i class="fas fa-cocktail"></i>';
    }
  }
  
  // Xử lý tìm kiếm
  searchBtn.addEventListener('click', () => {
    const searchTerm = searchInput.value.trim();
    const activeCategory = document.querySelector('.filter-btn.active').dataset.category;
    fetchProducts(searchTerm, activeCategory);
  });

  // Tìm kiếm khi nhấn Enter
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      searchBtn.click();
    }
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