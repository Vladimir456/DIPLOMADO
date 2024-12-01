import express from 'express'; //"type":"module", (para que funcione las importaciones)
import morgan from 'morgan';
import { authenticateToken } from './middlewares/authenticate.middleware.js';
//routes
import usersRoutes from './routes/users.routes.js'; 
import authRoutes from './routes/auth.routes.js'; 
import tasksRoutes from './routes/tasks.routes.js'; 

const app = express();

//Middlewares
app.use(morgan('dev'));
app.use(express.json());

//routes
app.use('/api/login', authRoutes);
app.use('/api/users',usersRoutes);
app.use('/api/tasks', authenticateToken, tasksRoutes);

export default app;
