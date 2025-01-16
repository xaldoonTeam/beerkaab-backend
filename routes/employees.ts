import { Router } from 'express';
import { 
  createEmployee, 
  getAllEmployees, 
  getOneEmployee, 
  updateEmployee, 
  deleteEmployee, 
  recycleEmployee, 
  getAllRecycledEmployees, 
  restoreEmployee 
} from '../controllers/EmployeesControls';

const router = Router();


router.post('/employees', createEmployee);

router.get('/employees', getAllEmployees);


router.get('/employees/:id', getOneEmployee);

router.put('/employees/:id', updateEmployee);

router.delete('/employees/:id', deleteEmployee);


router.patch('/employees/:id/recycle', recycleEmployee);


router.get('/employees/recycled', getAllRecycledEmployees);

router.patch('/employees/:id/restore', restoreEmployee);

export default router;
