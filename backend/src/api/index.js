import express from 'express';

import auth from './auth.api';
import user from './users.api.js';
import vip from './vip.js';
import admin from './admin.js';
import superadmin from './superadmin.js';


const app = express();

// API
app.use('/auth', auth);
app.use('/users', user);
app.use('/vip', vip);
app.use('/admin', admin);
app.use('/superadmin', superadmin);



export default app;
