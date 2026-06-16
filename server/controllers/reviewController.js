import reviewService from "../services/reviewService.js";

const createReview = async (req, res) => {

    try {
   const { comment, rating, userId, productId } = req.body;

   if(!comment || !rating || !productId || !userId){s
    return res.status(400).send({message:"All fields are required"});
   }

   const result = await reviewService.createReview({comment,rating,userId,productId})
   
   return res.status(200).send({
    message:"Review Processed successfully",
    reviews: result.reviews,
   })
        
    } catch (error) {
        console.error("Error posting review",error);
        res.status(500).send({message:"Failed to post review"});
    }
};
export default { createReview };
