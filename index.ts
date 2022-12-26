

const path = require('path')
const express = require('express');
require('dotenv').config();
const cors = require('cors')
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema.ts')
const connectDBfn = require('./config/db');
const port = process.env.PORT || 5000;
const app = express();

app.use(cors())
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development',
  })
);

if (process.env.NODE_ENV === 'production') {
  //*Set static folder up in production
  app.use(express.static('client/build'));
//@ts-ignore
  app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, 'client', 'build','index.html')));
}


app.listen(port, console.log(`Server running on port ${port}`));

//Connecting to the DB
connectDBfn();
