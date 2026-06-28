import reviewService from "../services/reviewService.js";

const createReview = async (req, res) => {

    try {
   const { comment, rating, userId, productId } = req.body;

if (
  !comment ||
  rating === undefined ||
  rating === null ||
  !productId ||
  !userId
) {
  return res.status(400).send({ message: "All fields are required" });
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



const getTotalReviews = async (req,res) =>{
    try {
        const totalReviews = await reviewService.getTotalReviews();
        return res.status(200).send({totalReviews});
    } catch (error) {
          console.error("Error getting total review", error);
          res.status(500).send({ message: "Failed to get review count" });
    }
}

const getReviewsByUserId = async(req,res) =>{
try {
    const {userId} = req.params;
    if(!userId){
        return res.status(400).send({message:"User Id is required"});

    }
    const reviews = await reviewService.getReviewsByUserId(userId);
    if(reviews.length === 0){
        return res.status(404).send({message:"No reviews found"});
    }
    return res.status(200).send({reviews});
} catch (error) {
    console.error("Error fetching reviews by user:", error);
    return res.status(500).send({ message: "Failed to fetch review by user" });
}

}




export default { createReview, getTotalReviews, getReviewsByUserId };
