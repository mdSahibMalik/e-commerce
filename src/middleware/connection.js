const { MongoClient } = require('mongodb');

const url = "mongodb://localhost:27017/ecommerce";
let clieneInstence;
const mongoConnection = async () => {
  await MongoClient.connect(url)
      .then(client => {
         clieneInstence = client;
         console.log('MongoDB connected');
      })
      .catch(err => console.log(err));

}
const getdb = ()=>{
   return clieneInstence.db();
}
module.exports = {mongoConnection, getdb} ;