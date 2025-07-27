const { MongoClient } = require('mongodb');

const url = "mongodb://127.0.0.1:27017/ecommerce?replicaSet=oertest";
let clientInstence;
const mongoConnection = async () => {
  await MongoClient.connect(url)
      .then(client => {
         clientInstence = client;
         console.log('MongoDB connected');
      })
      .catch(err => console.log(err));

}
const getClient = ()=>{
   return clientInstence
}
const getdb = ()=>{
   return clientInstence.db();
}
module.exports = {mongoConnection, getdb, getClient} ;