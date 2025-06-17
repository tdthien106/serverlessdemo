const API_URL = 'https://serverlessdemo-git-main-serverlesssdemo.vercel.app/api/products';

async function fetchProducts() {
  try {
    const response = await fetch(API_URL, {
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
    const data = await response.json();
    console.log('Data received:', data);
    displayProducts(data);
  } catch (error) {
    console.error('Fetch error:', error);
    showError(error);
  }
}