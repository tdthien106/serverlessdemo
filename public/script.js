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
  
    // ... (phần displayProducts và các hàm khác giữ nguyên)
  });