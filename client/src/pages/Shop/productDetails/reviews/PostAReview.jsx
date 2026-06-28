

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useFetchProductsByIdQuery } from '../../../../redux/features/products/productsApi';
import { usePostReviewMutation } from '../../../../redux/features/reviews/reviewsApi';
import { FaStar } from 'react-icons/fa';

const PostAReview = ({ isModalOpen, handleClose }) => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0); // 🌟 Added for dynamic star hover effects
  const [comment, setComment] = useState('');

  const { refetch } = useFetchProductsByIdQuery(id, { skip: !id });
  const [postReview] = usePostReviewMutation();

  const handleRating = (value) => {
    setRating(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user._id) {
      alert("You must be logged in to post a review.");
      return;
    }

    if (rating === 0) {
      alert("Please select a star rating before submitting.");
      return;
    }

    const newComment = {
      comment: comment,
      rating: rating,
      userId: user._id,
      productId: id,
    };

    try {
      await postReview(newComment).unwrap();
      alert("Comment posted successfully");
      setComment('');
      setRating(0);
      refetch();
    } catch (error) {
      alert(error.message || "Failed to post review");
    }
    handleClose();
  };

  return (
    // Cinematic Glassmorphic Overlay
    <div 
      className={`fixed inset-0 bg-slate-950/40 backdrop-blur-md items-center justify-center z-50 p-4 transition-all duration-300 ${
        isModalOpen ? 'opacity-100 flex' : 'opacity-0 hidden'
      }`}
    >
      {/* Premium Container Card with subtle internal gradient drop */}
      <form 
        onSubmit={handleSubmit} 
        className="relative bg-gradient-to-br from-white to-slate-50/80 w-full max-w-md p-6 sm:p-8 rounded-2xl shadow-2xl shadow-slate-950/20 border border-white/60 z-50 transform transition-all scale-100"
      >
        
        {/* Modern Top-Right Close Button Shortcut */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-2 rounded-full transition-colors focus:outline-none"
          aria-label="Close modal"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header Block */}
        <div className="mb-6">
          <h2 className="text-xl font-black text-slate-900 tracking-tight mb-1">
            Share Your Thoughts
          </h2>
          <p className="text-xs text-slate-400 font-medium">
            Your feedback directly helps other shoppers make better buying choices.
          </p>
        </div>
        
        {/* Rating Input Field Container */}
        <div className="bg-slate-100/60 border border-slate-200/40 rounded-xl p-3.5 mb-5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            Your Rating
          </label>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => {
                const isLit = hoverRating ? hoverRating >= star : rating >= star;
                return (
                  <button
                    type="button"
                    key={star}
                    onClick={() => handleRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="cursor-pointer transition transform hover:scale-115 active:scale-95 focus:outline-none"
                  >
                    <FaStar 
                      className={`text-2xl transition-colors duration-150 ${
                        isLit ? 'text-amber-400 drop-shadow-[0_1px_3px_rgba(251,191,36,0.3)]' : 'text-slate-200'
                      }`} 
                    />
                  </button>
                );
              })}
            </div>
            
            {/* Real-time Dynamic Context Text Indicator */}
            <span className="text-xs font-semibold text-slate-600 ml-2 bg-white px-2 py-0.5 rounded-md shadow-sm border border-slate-100">
              {rating ? `${rating} / 5 Stars` : 'Tap to rate'}
            </span>
          </div>
        </div>

        {/* Text Entry Field */}
        <div className="mb-6">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            Review Details
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows="4"
            placeholder="What did you like or dislike? Is the quality good?"
            className="w-full text-sm text-slate-800 bg-white border border-slate-200 p-3.5 rounded-xl focus:outline-none focus:ring-4 focus:ring-red-500/10 focus:border-red-500 transition-all placeholder:text-slate-400 shadow-inner resize-none leading-relaxed"
            required
          ></textarea>
        </div>

        {/* Interactive Action Buttons Strip */}
        <div className="grid grid-cols-2 gap-3 sm:flex sm:justify-end sm:gap-3">
          <button
            type="button" 
            onClick={handleClose}
            className="w-full sm:w-auto px-6 py-3 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-600 font-bold text-sm rounded-xl transition-all cursor-pointer text-center"
          >
            Cancel
          </button>
          
          <button
            type="submit" 
            className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-slate-900 to-slate-800 hover:from-red-500 hover:to-red-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-slate-900/10 hover:shadow-red-500/20 transition-all duration-300 cursor-pointer text-center"
          >
            Submit Review
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostAReview;