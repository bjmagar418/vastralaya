import React, { useState, useEffect } from 'react'
import { Link } from 'react-router'

const Categories = () => {
    // 1. Create state to hold the fetched products/categories data
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 2. Fetch data from backend when the component mounts
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:5005/api/products');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                
                // Assuming your API returns an array of products/categories
                setCategories(data); 
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    // 3. Handle Loading and Error states gracefully
    if (loading) return <div className="text-center p-5">Loading categories...</div>;
    if (error) return <div className="text-center p-5 text-red-500">Error: {error}</div>;

    return (
    /* -mt-16 uses a negative top margin to forcefully pull this component up */
    <div className='flex flex-col items-center w-full -mt-32 pt-0'>
        {/* mb-4 sets a small, tight 1rem baseline space right underneath the title */}
        <h1 className='font-bold text-2xl text-center mb-4'>Featured Category</h1>
        
        <div className='flex flex-wrap justify-center items-center gap-4 w-full mt-0'>
            {
                categories.map((category) => (
                    <Link 
                        key={category._id || category.id || category.name} 
                        to={`/categories/${category.path}`} 
                        className='categories__card'
                    >
                        <img src={category.image} alt={category.name}/>
                        <h4>{category.name}</h4>
                    </Link>
                ))
            }
        </div>
    </div>
)
  
}

export default Categories;