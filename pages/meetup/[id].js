import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://user1:test@333@cluster0.lblks.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();
  const paths = meetups.map((meetup) => {
    return {
      params: { id: meetup._id.toString() },
    };
  });
  return {
    fallback: true,
    paths: paths,
  };
}

export async function getStaticProps(context) {
  // fetch data for a single meetup
  const id = context.params.id;
  // console.log("context and id", context, id);

  const client = await MongoClient.connect(
    "mongodb+srv://user1:test@333@cluster0.lblks.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");
  // console.log("Collection abc", meetupsCollection);
  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(id),
  });
  // console.log("Slected one", selectedMeetup);
  client.close();

  return {
    props: {
      meetupData: { ...selectedMeetup, _id: id },
    },
  };
}

const MeetupDetails = ({ meetupData }) => {
  // console.log("object testing", meetupData);
  return <MeetupDetail meetup={meetupData} />;
};

export default MeetupDetails;
