// import User from "../models/User.js";
// import bcrypt from "bcryptjs";

// const seedUsers = async () => {
//   try {
//     const adminExists = await User.findOne({ email: "admin@vastralaya.com" });

//     if (adminExists) {
//       console.log("Admin already exists");
//       return;
//     }

//     // const hashedPassword = await bcrypt.hash("admin123", 10);

//     await User.create({
//       name: "Admin",
//       email: "admin@vastralaya.com",
//       password: "admin123",
//       role: "admin",
//     });

//     console.log("Admin seeded successfully");
//   } catch (error) {
//     console.log("Seed error:", error.message);
//   }
// };

// export default seedUsers;