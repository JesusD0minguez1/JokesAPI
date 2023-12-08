const { MongoClient, ObjectId } = require("mongodb");
const url = `mongodb://localhost:27017` //this where the data runs, default port
const client = new MongoClient(url);

const dbName = `JokesDB`;
const db = client.db(dbName);
const JokesData = db.collection('JokesData');

const dummyData = [
    {
        category: "Dad Joke",
        Joke: "What did the computer say to the other after a 16 hour car ride? Damn that was a hard drive."

    },
    {
        category:"Dad Joke",
        Joke: "What’s the difference between in-laws & out-laws? Outlaws are wanted"
    },
    {
        category:"Dad Joke",
        Joke: "Why do astronauts use linux? because you can't open windows in space."
    },
    {
        category:"Knock knock",
        Joke: "Knock, knock Who’s there? Leaf Leaf Who? Leaf Me Alone!"
    },
    {
        category:"Knock knock",
        Joke: "Knock, knock! Who’s there? Wire. Wire who? Wire you always asking ‘who’s there’?"
    },
    {
        category:"Knock knock",
        Joke: "Knock! Knock! Who's there? I am. I am who? You tell me!!"
    },
    {
        category:"Pun Jokes",
        Joke: "I have a few jokes about unemployed people, but none of them work"
    },
    {
        category:"Pun Joke",
        Joke: "How do you make holy water? You boil the hell out of it"
    },
    {
        catergory:"Pun Joke",
        Joke: "Last night, I dreamed I was swimming in an ocean of orange soda. But it was just a Fanta sea"
    }
];



exports.api = async (req, res) => {
    await client.connect();
    const defaultData = await JokesData.insertOne(dummyData);
    const foundJokes = await JokesData.find({}).toArray();
    console.log(foundJokes);
    //-------------------------------------------------
    const findJokes = await JokesData.find({}).limit(Number(req.query.amount)).toArray(); // turned table to arraylist
    let refinedJokes = findJokes.filter(joke => joke.category == req.query.category)
    console.log(`Result founds: ${refinedJokes}`);
    client.close();
    res.json(refinedJokes);
}

exports.createJokeForm = (req,res) => {
    res.render(`create`, {
        title:`Who wants to add some jokes, bb *chuckles*`
    });
};

exports.createJoke = async (req,res) => {
    await client.connect();
    let DadJoke = {
        category: req.body.category,
        joke: req.body.joke
    };
    const insertJoke = await JokesData.insertOne(DadJoke);
    client.close();
    res.redirect(`/api?category=${req.body.category}`)
}

