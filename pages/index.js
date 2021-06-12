import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";

// export const getServerSideProps = async (context) => {
//   const req = context.req;
//   const res = context.res;
//   return {
//     props: {
//       meetups: MEETING_LIST,
//     },
//   };
// };

export const getStaticProps = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://user1:test@333@cluster0.lblks.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();
  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => {
        return {
          title: meetup.title,
          image: meetup.image,
          address: meetup.address,
          id: meetup._id.toString(),
        };
      }),
    },
    //revalidate is for refresh data every x Time if your data change
    // revalidate: 1,
  };
};

const Home = ({ meetups }) => {
  return (
    <div>
      <MeetupList meetups={meetups} />
    </div>
  );
};

export default Home;
