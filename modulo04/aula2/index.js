
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://raposo:SENHA@raposocluster.tuiq3.mongodb.net/<db_name>";
const client = new MongoClient(uri, {     
    useNewUrlParser: true,
    useUnifiedTopology: true
});
client.connect(async (err) => {
    const collection = client.db("igti_bootcamp").collection("student");
    const documnents = await collection.find({
        subject: 'Historia'
    }).toArray();   

    console.log(documnents);

    const databaselist = await client.db().admin().listDatabases();
    console.log("Databases:");
    databaselist.databases.forEach(db => {
        console.log(` - ${db.name}`);
    });

    client.close();
});
