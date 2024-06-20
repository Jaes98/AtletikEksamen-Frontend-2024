import { useEffect, useState } from "react";
import { getParticipants } from "../services/apiFacade";
import ParticipantList from "./ParticipantList";
import ParticipantForm from "./ParticipantForm";
import { Participant } from "../Interfaces";

export default function ParticipantPage () {
    const [participants, setParticipants] = useState<Participant[]>([]);

    const fetchParticipants = async () => {
      const participantsList = await getParticipants();
      setParticipants(participantsList);
    };

    useEffect(() => {
      fetchParticipants();
    }, []);
    
    return (
      <div
        style={{
          display: "flex",
          margin: "1rem",
          padding: "1vw",
          gap: "2vw",
          justifyContent: "space-evenly",
        }}
      >
        <ParticipantForm />
        <ParticipantList
          participants={participants}
        />
      </div>
    );
}