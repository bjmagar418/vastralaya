import React from "react";
import { useSelector } from "react-redux";
import { useGetReviewsByUseridQuery } from "../../../redux/features/reviews/reviewsApi.js";
import { useNavigate } from "react-router-dom";

const UserReviews = () => {
  const { user } = useSelector((state) => state.auth);
  const { data, error, isLoading } = useGetReviewsByUseridQuery(user?._id, {
    skip: !user?._id,
  });
  const reviews = data?.reviews || [];
  const navigate = useNavigate();

  if (isLoading) return <div className="text-center py-12 text-gray-500 font-medium">Loading your reviews...</div>;
  if (error) return <div className="text-center py-12 text-red-500 font-medium">Failed to load reviews</div>;

  const handleCardClick = () => {
    navigate("/shop");
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6">
      
      {/* Dynamic Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-gray-100 mb-8">
        <div>
          <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">Your Reviews</h2>
          <p className="text-xs text-gray-400 font-medium mt-0.5">Manage and track your active product community feedback.</p>
        </div>
        <span className="self-start sm:self-center text-xs font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-lg">
          {reviews.length} Feedback Entry{reviews.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Grid Layout Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Array.isArray(reviews) &&
          reviews.map((review, index) => (
            <div 
              key={index} 
              className="group bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] p-5 flex flex-col justify-between transform hover:scale-[1.02] hover:border-indigo-200 hover:shadow-md transition-all duration-300 cursor-pointer"
            >
              <div>
                {/* Star Ratings Row */}
                <div className="flex items-center gap-1.5 mb-3.5">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i} 
                        className={`w-4 h-4 ${i < (review?.rating || 0) ? "fill-current" : "text-gray-200 stroke-current"}`} 
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-xs font-bold text-gray-400 font-mono">({review?.rating}/5)</span>
                </div>

                {/* Main Feedback Comment Text Area */}
                <p className="text-gray-600 text-sm leading-relaxed mb-4 italic font-medium break-words">
                  "{review?.comment}"
                </p>
              </div>

              {/* Bottom Card Meta Section */}
              <div className="border-t border-gray-50 pt-3.5 space-y-2">
                {/* FIXED: Modified to show full productId and break safely if needed */}
                <div className="flex flex-col gap-1 text-[11px] font-medium">
                  <span className="text-gray-400 uppercase tracking-wider">Product Ref</span>
                  <span className="font-mono text-gray-600 bg-gray-50 border border-gray-100 px-2 py-1 rounded break-all select-all">
                    {review?.productId || 'N/A'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-[11px] font-medium pt-1 border-t border-gray-50/50">
                  <span className="text-gray-400 uppercase tracking-wider">Posted On</span>
                  <span className="text-gray-500 font-sans">
                    {review?.createdAt
                      ? new Date(review.createdAt).toLocaleDateString([], { dateStyle: 'medium' })
                      : review?.updatedAt
                      ? new Date(review.updatedAt).toLocaleDateString([], { dateStyle: 'medium' })
                      : "No date recorded"}
                  </span>
                </div>
              </div>

            </div>
          ))}

        {/* Decorative Action Callout Box: Add Reviews */}
        <div 
          onClick={handleCardClick}
          className="group relative overflow-hidden bg-gradient-to-br from-gray-50 to-slate-100/80 border-2 border-dashed border-gray-200 hover:border-indigo-500 hover:from-white hover:to-indigo-50/30 rounded-2xl p-6 min-h-[200px] flex flex-col items-center justify-center text-center gap-2 transform hover:scale-[1.02] shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-md transition-all duration-300 cursor-pointer"
        >
          <div className="p-3 bg-white rounded-xl shadow-sm text-gray-400 group-hover:text-indigo-600 group-hover:shadow transition-all duration-300 border border-gray-100">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-bold text-gray-700 group-hover:text-indigo-600 transition-colors duration-200">Write New Review</p>
            <p className="text-[11px] text-gray-400 font-medium mt-0.5 px-4">Visit our shop front to share experience updates on your items.</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default UserReviews;