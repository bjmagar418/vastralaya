

// import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import TextInput from './TextInput';
// import SelectInput from './SelectInput';
// import UploadImage from './UploadImage';
// import { useAddProductMutation } from '../../../../redux/features/products/productsApi';

// const categories = [
//   { label: 'Select Category', value: '' },
//   { label: 'Accessories', value: 'accessories' },
//   { label: 'Dress', value: 'dress' },
//   { label: 'Jewellery', value: 'jewellery' },
//   { label: 'Cosmetics', value: 'cosmetics' },
//   { label: 'Skin-care', value: 'skin-care' },
// ];

// const colors = [
//   { label: 'Select Color', value: '' },
//   { label: 'Black', value: 'black' },
//   { label: 'Red', value: 'red' },
//   { label: 'Gold', value: 'gold' },
//   { label: 'Blue', value: 'blue' },
//   { label: 'Silver', value: 'silver' },
//   { label: 'Beige', value: 'beige' },
//   { label: 'Green', value: 'green' },
// ];

// const AddProduct = () => {
//   const { user } = useSelector((state) => state.auth);
//   const [product, setProduct] = useState({
//     name: '',
//     category: '',
//     color: '',
//     price: '',
//     description: '',
//   });
//   const [image, setImage] = useState('');
//   const [addProductMutation, { isLoading }] = useAddProductMutation();
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProduct({ ...product, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!product.name || !product.category || !product.price || !product.description || !product.color) {
//       alert('Please fill all required fields');
//       return;
//     }

//     // 1. Create FormData object
//     const formData = new FormData();
//     formData.append("name", product.name);
//     formData.append("category", product.category);
//     formData.append("color", product.color);
//     formData.append("price", Number(product.price));
//     formData.append("description", product.description);
    
//     // 2. Append the image URL/file
//     if (image) {
//       formData.append("images", image);
//     }

//     try {
//       // 3. Submit as FormData (do not stringify)
//       await addProductMutation(formData).unwrap(); 
      
//       alert("Product added successfully");
//       setProduct({ name: '', category: '', color: '', price: '', description: '' });
//       setImage('');
//       navigate('/shop');
//     } catch (error) {
//       console.error("Failed to submit product", error);
//       alert("Error saving product. Please check console.");
//     }
//   };

//   return (
//     <div className="container mx-auto mt-10 max-w-2xl p-6 bg-white shadow-md rounded-lg">
//       <h2 className="text-3xl font-bold mb-8 text-gray-800">Add New Product</h2>
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <TextInput label="Product Name" name="name" value={product.name} onChange={handleChange} placeholder="Enter product name" />
        
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <SelectInput label="Category" name="category" value={product.category} onChange={handleChange} options={categories} />
//           <SelectInput label="Color" name="color" value={product.color} onChange={handleChange} options={colors} />
//         </div>

//         <TextInput label="Price" name="price" value={product.price} onChange={handleChange} type="number" placeholder="50.00" />
        
//         <UploadImage name="image" setImage={setImage} />

//         <div>
//           <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//           <textarea 
//             name="description" id="description" rows="4"
//             className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
//             value={product.description} onChange={handleChange} placeholder="Write a brief description..."
//           ></textarea>
//         </div>

//         <button 
//           type="submit" 
//           disabled={isLoading}
//           className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
//         >
//           {isLoading ? 'Adding...' : 'Add Product'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddProduct;

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import TextInput from './TextInput';
import SelectInput from './SelectInput';
import UploadImage from './UploadImage';
import { useAddProductMutation } from '../../../../redux/features/products/productsApi';

const categories = [
  { label: 'Select Category', value: '' },
  { label: 'Accessories', value: 'accessories' },
  { label: 'Dress', value: 'dress' },
  { label: 'Jewellery', value: 'jewellery' },
  { label: 'Cosmetics', value: 'cosmetics' },
  { label: 'Skin-care', value: 'skin-care' },
];

const colors = [
  { label: 'Select Color', value: '' },
  { label: 'Black', value: 'black' },
  { label: 'Red', value: 'red' },
  { label: 'Gold', value: 'gold' },
  { label: 'Blue', value: 'blue' },
  { label: 'Silver', value: 'silver' },
  { label: 'Beige', value: 'beige' },
  { label: 'Green', value: 'green' },
];

const AddProduct = () => {
  const { user } = useSelector((state) => state.auth);
  const [product, setProduct] = useState({
    name: '',
    category: '',
    color: '',
    price: '',
    description: '',
  });
  
  // Updated state to handle an array of files
  const [files, setFiles] = useState([]);
  
  const [addProductMutation, { isLoading }] = useAddProductMutation();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!product.name || !product.category || !product.price || !product.description || !product.color) {
      alert('Please fill all required fields');
      return;
    }

    // 1. Create FormData object
    const formData = new FormData();
    
    // Append all text fields
    Object.keys(product).forEach((key) => {
      formData.append(key, product[key]);
    });
    
    // 2. Append all files to the "images" key (Must match backend upload.array("images"))
    files.forEach((file) => {
      formData.append("images", file);
    });

    try {
      // 3. Submit as FormData (RTK Query handles headers automatically)
      await addProductMutation(formData).unwrap(); 
      
      alert("Product added successfully");
      
      // Reset form
      setProduct({ name: '', category: '', color: '', price: '', description: '' });
      setFiles([]); 
      
      navigate('/shop');
    } catch (error) {
      console.error("Failed to submit product", error);
      alert("Error saving product. Please check console.");
    }
  };

  return (
    <div className="container mx-auto mt-10 max-w-2xl p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <TextInput label="Product Name" name="name" value={product.name} onChange={handleChange} placeholder="Enter product name" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectInput label="Category" name="category" value={product.category} onChange={handleChange} options={categories} />
          <SelectInput label="Color" name="color" value={product.color} onChange={handleChange} options={colors} />
        </div>

        <TextInput label="Price" name="price" value={product.price} onChange={handleChange} type="number" placeholder="50.00" />
        
        {/* Pass setFiles to the component */}
        <UploadImage setFiles={setFiles} />

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea 
            name="description" id="description" rows="4"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
            value={product.description} onChange={handleChange} placeholder="Write a brief description..."
          ></textarea>
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
        >
          {isLoading ? 'Adding...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;