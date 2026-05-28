import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const SingleProduct = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(4);
  const [comment, setComment] = useState("");

  useEffect(() => {
    fetchSingleProduct();
  }, [id]);

  const fetchSingleProduct = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:5005/api/products/${id}`
      );
      setProduct(response.data);
    } catch (error) {
      console.log("Error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = () => {
    setShowModal(true);
    setSelectedRating(4);
    setHoverRating(0);
    setComment("");
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = () => {
    // Handle submit logic here
    console.log("Rating:", selectedRating, "Comment:", comment);
    setShowModal(false);
  };

  if (loading) {
    return (
      <div className="p-10 text-center">
        Loading Product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-10 text-center">
        Product Not Found
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8">

      {/* PRODUCT SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* IMAGE */}
        <div>
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-[450px] object-cover rounded-lg"
          />
        </div>

        {/* DETAILS */}
        <div>
          <h1 className="text-3xl font-bold mb-4">
            {product.name}
          </h1>

          <p className="text-2xl text-red-500 font-semibold mb-4">
            NPR {product.price}
          </p>

          <p className="text-gray-600 mb-4">
            {product.description}
          </p>

          <div className="mb-3">
            <span className="font-semibold">Category:</span>{" "}
            {product.category}
          </div>

          {product.color && (
            <div className="mb-3">
              <span className="font-semibold">Color:</span>{" "}
              {product.color}
            </div>
          )}

          {/* RATING */}
          <div className="flex items-center gap-1 mb-6">
            <FaStar className="text-yellow-400" />
            <FaStar className="text-yellow-400" />
            <FaStar className="text-yellow-400" />
            <FaStar className="text-yellow-400" />
            <FaStar className="text-gray-300" />
            <span className="ml-2 text-gray-600">4.0 Rating</span>
          </div>

          {/* BUTTON */}
          <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-md transition">
            Add To Cart
          </button>
        </div>
      </div>

      {/* COMMENTS SECTION */}
      <div className="mt-16">

        <h2 className="text-2xl font-semibold mb-8">
          All Comments
        </h2>

        {/* COMMENT 1 */}
        <div className="border rounded-lg p-5 mb-6">
          <div className="flex items-center gap-3 mb-3">
            <img
              src="https://i.pravatar.cc/50?img=1"
              alt=""
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h3 className="font-semibold">User1</h3>
              <p className="text-sm text-gray-500">August 17, 2024</p>
            </div>
          </div>
          <div className="flex gap-1 text-yellow-400 mb-3">
            <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
          </div>
          <p className="text-gray-700">
            This is a high-quality product and recommended to buy.
          </p>
        </div>

        {/* COMMENT 2 */}
        <div className="border rounded-lg p-5 mb-6">
          <div className="flex items-center gap-3 mb-3">
            <img
              src="https://i.pravatar.cc/50?img=2"
              alt=""
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h3 className="font-semibold">Admin</h3>
              <p className="text-sm text-gray-500">August 17, 2024</p>
            </div>
          </div>
          <div className="flex gap-1 text-yellow-400 mb-3">
            <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
          </div>
          <p className="text-gray-700">Great product!</p>
        </div>

        {/* ADD COMMENT BUTTON */}
        <button
          onClick={handleOpenModal}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-md transition"
        >
          Add A Comment
        </button>
      </div>

      {/* POST A REVIEW MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 shadow-xl">

            <h2 className="text-xl font-semibold mb-4">Post a Review</h2>

            {/* STAR RATING */}
            <div className="flex gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={`text-2xl cursor-pointer transition-colors ${
                    star <= (hoverRating || selectedRating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setSelectedRating(star)}
                />
              ))}
            </div>

            {/* COMMENT TEXTAREA */}
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your comment here..."
              rows={4}
              className="w-full border border-gray-300 rounded-md p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-red-300 mb-4"
            />

            {/* BUTTONS */}
            <div className="flex justify-end gap-3">
              <button
                onClick={handleCloseModal}
                className="flex items-center gap-1 px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100 transition text-sm"
              >
                ✕ Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="flex items-center gap-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition text-sm"
              >
                ✓ Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleProduct;