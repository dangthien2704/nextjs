import { MongoClient } from "mongodb";

const handlerData = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;
    // const { title, image, address, description } = data;

    const client = await MongoClient.connect(
      "mongodb+srv://user1:test@333@cluster0.lblks.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.insertOne(data);
    //use try catch to catch error if fetch failed
    console.log(result);

    client.close();
    res.status(201).json({ message: "Meetup inserted!" });
  }

  // return (  );
};

export default handlerData;
