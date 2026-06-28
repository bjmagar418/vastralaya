import React from 'react';

const TextInput = ({ label, name, value, onChange, type = 'text', placeholder }) => {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input 
        type={type} name={name} id={name} placeholder={placeholder}
        value={value} onChange={onChange}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
      />
    </div>
  );
};

export default TextInput;