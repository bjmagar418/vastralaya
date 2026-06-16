import Reviews from "../models/reviews.js";
import Product from "../models/products.js";

const createReview = async ({ comment, rating, productId, userId }) => {

    const existingReview = await Reviews.findOne({productId,userId});

    if(existingReview){
        existingReview.comment = comment;
        existingReview.rating = rating;
        await existingReview.save();
    }else {
        const newReview = new Reviews({comment,rating,productId,userId});
        await newReview.save();
    }

    const reviews = await Reviews.find({productId});
    if(reviews.length > 0){
        const totalRating = reviews.reduce((acc,review) => acc + review.rating,0);
        const averageRating = totalRating / reviews.length;
    
    const product = await Product.findById(productId);

    if(!product){
        throw new Error("Product not found");
    }
    
    product.rating = averageRating;
    await product.save({ validateBeforeSave: false });
    }

    return {reviews};

};
 export default {createReview}