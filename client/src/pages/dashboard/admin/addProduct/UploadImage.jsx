// // import React, { useState } from 'react';
// // import axios from 'axios';
// // import { getBaseUrl } from '../../../../utils/baseURL';

// // const UploadImage = ({ name, setImage }) => {
// //   const [loading, setLoading] = useState(false);
// //   const [url, setUrl] = useState("");

// //   const convertBase64 = (file) => {
// //     return new Promise((resolve, reject) => {
// //       const fileReader = new FileReader();
// //       fileReader.readAsDataURL(file);
// //       fileReader.onload = () => resolve(fileReader.result);
// //       fileReader.onerror = (error) => reject(error);
// //     });
// //   };

// //   const uploadSingleImage = (base64) => {
// //     setLoading(true);
// //     axios.post(`${getBaseUrl()}/uploadImage`, { image: base64 })
// //       .then((res) => {
// //         setUrl(res.data);
// //         alert("image uploaded successfully")
// //         setImage(res.data);
// //       }).then(()=>setLoading(false))
// //       .catch((error) => console.error("Error uploading image", error))
// //       .finally(() => setLoading(false));
// //   };

// //   const uploadImage = async (event) => {
// //     const files = event.target.files;
// //     if (files.length > 0) {
// //       const base64 = await convertBase64(files[0]);
// //       uploadSingleImage(base64);
// //       return
// //     }
// //   };

// //   return (
// //     <div className="space-y-2">
// //       <label htmlFor={name} className="block text-sm font-medium text-gray-700">Upload Image</label>
// //       <input 
// //         type="file" name={name} id={name} onChange={uploadImage}
// //         className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition"
// //       />
// //       {loading && <p className="text-sm text-blue-600 animate-pulse">Uploading product image...</p>}
// //       {url && (
// //         <div className="mt-4 p-2 border rounded-lg">
// //           <p className="text-sm text-green-600 mb-2 font-medium">Upload successful!</p>
// //           <img src={url} alt="product" className="w-20 h-20 object-cover rounded shadow-sm" />
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default UploadImage;

// import React, { useState } from 'react';
// import axios from 'axios';
// import { getBaseUrl } from '../../../../utils/baseURL';

// // const UploadImage = ({ name, setImage }) => {
// //   const [loading, setLoading] = useState(false);
// //   const [url, setUrl] = useState("");

// //   const uploadImage = async (event) => {
// //     const file = event.target.files[0];
// //     if (!file) return;

// //     const formData = new FormData();
// //     formData.append("image", file); // Must match 'upload.single("image")' in your backend

// //     setLoading(true);
// //     try {
// //       const res = await axios.post(`${getBaseUrl()}/`, formData, {
// //         headers: { "Content-Type": "multipart/form-data" }
// //       });
// //       setUrl(res.data);
// //       alert("Image uploaded successfully");
// //       setImage(res.data);
// //     } catch (error) {
// //       console.error("Error uploading image", error);
// //       alert("Failed to upload image");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="space-y-2">
// //       <label htmlFor={name} className="block text-sm font-medium text-gray-700">
// //         Upload Image
// //       </label>
// //       <input 
// //         type="file" 
// //         name={name} 
// //         id={name} 
// //         onChange={uploadImage}
// //         className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition"
// //       />
// //       {loading && <p className="text-sm text-blue-600 animate-pulse">Uploading product image...</p>}
// //       {url && (
// //         <div className="mt-4 p-2 border rounded-lg">
// //           <p className="text-sm text-green-600 mb-2 font-medium">Upload successful!</p>
// //           <img src={url} alt="product" className="w-20 h-20 object-cover rounded shadow-sm" />
// //         </div>
// //       )}
// //     </div>
// //   );
// // };


// // UploadImage.jsx
// const UploadImage = ({ setFiles }) => {
//   const handleFileChange = (event) => {
//     // Collect all selected files
//     const selectedFiles = Array.from(event.target.files);
//     setFiles(selectedFiles);
//   };

//   return (
//     <div className="space-y-2">
//       <label className="block text-sm font-medium text-gray-700">Upload Images</label>
//       <input 
//         type="file" 
//         multiple 
//         onChange={handleFileChange}
//         className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700"
//       />
//     </div>
//   );
// };

// export default UploadImage;


import React from 'react';

const UploadImage = ({ setFiles }) => {
  const handleFileChange = (event) => {
    // Collect all selected files from the input
    const selectedFiles = Array.from(event.target.files);
    // Send the array of files up to the parent (AddProduct)
    setFiles(selectedFiles);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Upload Product Images
      </label>
      <input 
        type="file" 
        multiple // Allows selecting more than one image
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500 
                   file:mr-4 file:py-2 file:px-4 
                   file:rounded-full file:border-0 
                   file:text-sm file:font-semibold 
                   file:bg-blue-50 file:text-blue-700 
                   hover:file:bg-blue-100 transition"
      />
      <p className="text-xs text-gray-400">You can select up to 5 images.</p>
    </div>
  );
};

export default UploadImage;