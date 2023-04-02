const express = require('express');
const session = require('express-session');
const userRouter = require('./routers/user');
const todoRouter = require('./routers/todo');
const { isAuthenticated } = require('./authentication/session');
const { errorHandler } = require('./utils/error-handler');
require('./utils/establish-mongoose-connection');
const { sessionOptions } = require('./utils/session-configuration');

const PORT = 3000;
const app = express();

// start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT} :)`);
});

// Middleware
app.use(express.json());
app.use(session(sessionOptions));

// Routers
app.use('/users', userRouter);
app.use('/todos', isAuthenticated, todoRouter);

// page not found 404
app.use((req, res) => {
  res.status(404).send({
    errors: { msg: [`Can't find this endpoint: ${req.method} ${req.path}`] },
  });
});

// express error handler
app.use((err, req, res, next) => {
  res.status(401).send(errorHandler(err));
});
