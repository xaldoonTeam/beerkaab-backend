import express from 'express';
import {
  createOrganization,
  loginOrganization,
} from '../controllers/organization.ts';

const router = express.Router();

router.post('/Dashboard/Company/create', createOrganization);
router.get('/login', loginOrganization);

export default router;
