import express from 'express';

const port = process.env.PORT || 3333;
const app = express();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
