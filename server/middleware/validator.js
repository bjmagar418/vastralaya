// import z from "zod";

// const validate = (schema) => (req, res, next) => {
//   try {
//     schema.parse(req.body);
//     next();
//   } catch (error) {
//     if (error instanceof z.ZodError) {
//       return res.status(400).json({
//         success: false,
//         errors: error.errors.map((err) => ({
//           field: err.path.join("."),
//           message: err.message,
//         })),
//       });
//     }

//     // CRITICAL: Log the actual error to your VS Code terminal
//     console.error("Validation Middleware Error:", error);

//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// export default validate;
// const validate = (schema) => (req, res, next) => {
//   try {
//     schema.parse(req.body);
//     next();
//   } catch (error) {
//     if (error.errors) {
//       const messages = error.errors.map((err) => err.message);
//       return res.status(400).json({ success: false, errors: messages });
//     }
//     return res
//       .status(500)
//       .json({ message: "Internal server error during validation" });
//   }
// };

// export default validate;

import { z } from "zod";

const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    // Check safely if it's an instance of a Zod error
    if (error instanceof z.ZodError) {
      // Use error.issues as it's the standard array for Zod validation items
      const targetErrors = error.issues || error.errors || [];

      return res.status(400).json({
        success: false,
        errors: targetErrors.map((err) => ({
          field: Array.isArray(err.path) ? err.path.join(".") : "field",
          message: err.message,
        })),
      });
    }

    console.error("Validation Middleware Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default validate;