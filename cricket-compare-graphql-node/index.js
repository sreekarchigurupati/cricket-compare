const { GraphQLServer } = require('graphql-yoga')
const MongoClient = require('mongodb').MongoClient;
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(function (err) {
    console.log("MongoDB connected");
    db = client.db("cricket-compare"); //mongodb database name
  });

const typeDefs = `
  type Query {
    players: [Player!]!
    player(queryName: String!): Player!
  }
  type Player {
    id: ID!
    name: String!
    team: String!
    age: Int!
    battingStyle: String!
    bowlingStyle: String!
    matches: Int!
    runs: Int!
    battingInnings: Int!
    hundreds: Int!
    fifties: Int!
    fours: Int!
    sixes: Int!
    SR: Float!
    bowlingInnings: Int!
    balls: Int!
    economy: Float!
    wickets: Int!
  }
`

const resolvers = {
  Query: {
    players: async () => {
        values = await db.collection("players").find().toArray().then(res => { return res })
        console.log(values)
        values.forEach(idRename)

        function idRename(item, index, arr) {
            arr[index].id = item._id
            delete arr[index]._id
          }
        return values
        },
    player: async (queryName) => {
        var query = { name: new RegExp(queryName, "i") };
        values = await db.collection("players").findOne(query).then(res => { return res })
        console.log(values)
        values.id = values._id
        delete values._id
        return values
    }
  },
}
const PORT = process.env.PORT || 4000;
const options = { port: PORT }
const server = new GraphQLServer({ typeDefs, resolvers })
server.start(options, () => console.log('Server is running on localhost:' + options.port))