import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
 import ProductCards from '../Shop/ProductCards';
import Products from '../Shop/Products';

const Search = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5005/api/products');
        if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (products.length === 0) return;
    const params = new URLSearchParams(location.search);
    const urlQuery = params.get('query') || '';
    if (!urlQuery.trim()) {
      setFilteredProducts(products);
      return;
    }
    const query = urlQuery.toLowerCase();
    const filtered = products.filter((product) =>
      product.name?.toLowerCase().includes(query) ||
      product.category?.toLowerCase().includes(query) ||
      product.price?.toString().includes(query)
    );
    setFilteredProducts(filtered);
  }, [location.search, products]);

  return (
    <section className='min-h-screen px-4 sm:px-6 lg:px-12 py-8'>
      {/* Header */}
      <div className='mb-6'>
        <h2 className='text-2xl sm:text-3xl font-bold capitalize'>Search Results</h2>
        <p className='text-gray-500 text-sm sm:text-base mt-1'>
          Browse a diverse range of categories, from chic dresses to versatile accessories.
        </p>
      </div>

      {/* States */}
      {loading && (
        <div className='flex justify-center items-center min-h-[300px]'>
          <p className='text-gray-500 text-sm animate-pulse'>Loading products...</p>
        </div>
      )}
      {error && (
        <div className='flex justify-center items-center min-h-[300px]'>
          <p className='text-red-500 text-sm'>Error: {error}</p>
        </div>
      )}
      {!loading && !error && filteredProducts.length === 0 && (
        <div className='flex flex-col justify-center items-center min-h-[300px] gap-2'>
          <i className='ri-search-line text-4xl text-gray-300'></i>
          <p className='text-gray-400 text-sm'>No products found. Try a different keyword.</p>
        </div>
      )}

      {/* Product Grid */}
      {!loading && !error && filteredProducts.length > 0 && (
        <Products products={filteredProducts} className="p-4" />
      )}
    </section>
  );
};

export default Search;