document.addEventListener('DOMContentLoaded', () => {
    const API_URL = 'https://serverlessdemo-git-main-serverlessdemo.vercel.app/api/products';
    console.log('Đang kết nối tới:', API_URL);
  
    async function loadProducts() {
      try {
        const response = await fetch(API_URL);
        
        if (!response.ok) {
          throw new Error(`Lỗi HTTP: ${response.status}`);
        }
        
        const products = await response.json();
        
        if (!products || !Array.isArray(products)) {
          throw new Error('Dữ liệu không hợp lệ');
        }
        
        displayProducts(products);
      } catch (error) {
        console.error('Lỗi tải dữ liệu:', error);
        document.getElementById('products-container').innerHTML = `
          <div class="error-message">
            <p>Không thể tải menu. Vui lòng thử lại sau</p>
            <button onclick="window.location.reload()">Tải lại</button>
            <small>${error.message}</small>
          </div>
        `;
      }
    }
  
    function displayProducts(products) {
      const container = document.getElementById('products-container');
      container.innerHTML = products.map(product => `
        <div class="product-card">
          <div class="product-icon">
            ${getIconByCategory(product.category)}
          </div>
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <div class="price">${product.price.toLocaleString('vi-VN')}₫</div>
        </div>
      `).join('');
    }
  
    function getIconByCategory(category) {
      const icons = {
        'Cà phê': 'fa-coffee',
        'Nước ép': 'fa-glass-water',
        'Đặc biệt': 'fa-star'
      };
      return `<i class="fas ${icons[category] || 'fa-mug-hot'}"></i>`;
    }
  
    // Khởi chạy
    loadProducts();
  });