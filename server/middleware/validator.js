import z from "zod";

const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        errors: error.errors.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        })),
      });
    }

    // CRITICAL: Log the actual error to your VS Code terminal
    console.error("Validation Middleware Error:", error);

    res.status(500).json({ message: "Internal server error" });
  }
};

export default validate;
