import Image from "next/image";
import styles from "./MeetupDetail.module.css";

const MeetupDetail = ({ meetup }) => {
  return (
    <>
      <div className={styles.image}>
        <div>
          <img src={meetup.image} alt={meetup.title} />
        </div>
        <div className={styles.body}>
          <h3>{meetup.title}</h3>
          <address>{meetup.address}</address>
          <p>{meetup.description}</p>
        </div>
      </div>
    </>
  );
};

export default MeetupDetail;
