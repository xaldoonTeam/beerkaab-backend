// import NextAuth from "next-auth";
// import Providers from "next-auth/providers";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import prisma from "../../../lib/prisma"; // Adjust the path accordingly

// export default NextAuth({
//   providers: [
//     Providers.Email({
//       server: {
//         host: process.env.EMAIL_HOST,
//         port: process.env.EMAIL_PORT,
//         auth: {
//           user: process.env.EMAIL_USER,
//           pass: process.env.EMAIL_PASSWORD,
//         },
//       },
//       from: process.env.EMAIL_FROM,
//     }),
//     // Add more providers if needed
//   ],
//   adapter: PrismaAdapter(prisma),
// });