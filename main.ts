import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// Local Files
import organizationRoute from './routes/organization.ts';
import companyOrderRoute from './routes/orders.ts';
import organizationTools from './routes/tools.ts';
import userRoute from './routes/users.ts';
import postRoute from './routes/postRoute.ts'
import EmployeesRoute from './routes/employees.ts'
const app = express();
dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Routes
app.use('/organization', organizationRoute);
app.use('/orders', companyOrderRoute);
app.use('/tool', organizationTools);
app.use('/user', userRoute);
app.use('/Posts',postRoute)
app.use('/Employee',EmployeesRoute)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
