
import React, { useState } from "react";
import commentorIcon from "../../../../assets/avatar.png";
import { formatDate } from "../../../../utils/formatDate";
import RatingStar from "../../../../components/RatingStar";
import PostAReview from "./PostAReview";

const ReviewsCard = ({ productReviews }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const reviews = productReviews || [];

  const handleOpenReviewModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseReviewModal = () => {
    setIsModalOpen(false);
  };

  return (
    // Premium Master Container with modern ambient shadow and soft gradient
    <div className="my-8 bg-gradient-to-b from-white to-slate-50/40 p-5 sm:p-6 md:p-10 rounded-2xl border border-slate-100 shadow-md shadow-slate-200/50">
      <div>
        {reviews.length > 0 ? (
          <div>
            {/* Clean Modern Header with a Counter Pill Badge */}
            <div className="flex items-center gap-3 mb-8 border-b border-slate-100 pb-4">
              <h3 className="text-lg md:text-xl font-bold text-slate-800 tracking-tight">
                Customer Reviews
              </h3>
              <span className="px-2.5 py-0.5 text-xs font-bold bg-slate-900 text-white rounded-full shadow-sm">
                {reviews.length}
              </span>
            </div>
            
            {/* Review Cards List Wrapper */}
            <div className="space-y-8">
              {reviews.map((review, index) => (
                <div 
                  key={index} 
                  className="group relative bg-white rounded-xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 ease-out"
                >
                  {/* User Profile Info Row */}
                  <div className="flex flex-row gap-3 sm:gap-4 items-center">
                    {/* Ringed Avatar with slight lift effect */}
                    <div className="flex-shrink-0 relative group-hover:scale-105 transition-transform duration-300"> 
                      <img 
                        src={commentorIcon} 
                        alt="User avatar" 
                        className="w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full object-cover ring-4 ring-slate-50 border border-slate-200 shadow-inner"
                      />
                    </div>
                    
                    {/* User Metadata */}
                    <div className="space-y-0.5 min-w-0 flex-1">
                      <p className="text-sm sm:text-base font-bold text-slate-800 truncate capitalize tracking-tight">
                        {review?.userId?.username || "Anonymous User"}
                      </p>
                      <p className="text-xs text-slate-400 font-medium">
                        {formatDate(review?.updatedAt)}
                      </p>
                      <div className="pt-1 flex items-center">
                        <RatingStar rating={review?.rating} />
                      </div>
                    </div>
                  </div>

                  {/* Elegant Text Callout Box replacing the blocky card border */}
                  <div className="text-sm sm:text-base text-slate-600 mt-4 pl-4 border-l-2 border-slate-200 group-hover:border-red-400 transition-colors duration-300">
                    <p className="w-full md:w-11/12 leading-relaxed text-slate-600 tracking-wide font-normal break-words">
                      {review?.comment}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Beautiful Minimalism Empty State with geometric placeholder icon */
          <div className="text-center py-12 px-4 bg-white border border-dashed border-slate-200 rounded-2xl shadow-sm">
            <div className="mx-auto w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-3">
              <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h4 className="text-slate-700 font-bold text-base mb-1">No feedback yet</h4>
            <p className="text-slate-400 text-xs sm:text-sm max-w-xs mx-auto leading-relaxed">
              Have you purchased this item? Share your thoughts and help others make a choice!
            </p>
          </div>
        )}
      </div>

      {/* Styled Call To Action Footer Strip */}
      <div className="mt-8 pt-6 border-t border-slate-100 flex justify-start">
        <button 
          onClick={handleOpenReviewModal}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-slate-900 hover:bg-red-500 active:bg-red-600 text-white font-bold text-sm sm:text-base rounded-xl transition-all duration-300 ease-out transform active:scale-[0.98] cursor-pointer shadow-lg shadow-slate-900/10 hover:shadow-red-500/20"
        >
          {/* Added a dynamic write icon next to button text */}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
          Write a Review
        </button>
      </div>

      {/* Review Entry Form Modal */}
      <PostAReview isModalOpen={isModalOpen} handleClose={handleCloseReviewModal} />
    </div>
  );
};

export default ReviewsCard;