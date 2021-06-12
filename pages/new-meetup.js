import NewMeetupForm from "../components/meetups/NewMeetupForm";
import { useRouter } from "next/router";

const NewMeetup = () => {
  const router = useRouter();
  const handlerAddMeetup = async (enteredMeetupData) => {
    const res = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    router.push("/");
    const data = await res.json();
    console.log(data);
  };
  return (
    <div>
      <NewMeetupForm onAddMeetup={handlerAddMeetup} />
    </div>
  );
};

export default NewMeetup;
