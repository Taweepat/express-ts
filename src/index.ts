import express from 'express';
import testRoutes from './routes/testRoutes';
import productRoutes from './routes/productRoutes';
import dbTestRoutes from './routes/dbtestRoutes';

const app = express();

app.use(express.json());

// app.use(testRoutes);
app.use(productRoutes);
app.use(dbTestRoutes);



app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

export default app;

