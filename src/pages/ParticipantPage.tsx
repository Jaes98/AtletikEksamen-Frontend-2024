import { useEffect, useState } from "react";
import { getParticipants } from "../services/apiFacade";
import ParticipantList from "../components/ParticipantList";
import ParticipantForm from "../components/ParticipantForm";
import { Participant } from "../Interfaces";

export default function ParticipantPage() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);
  // const [formParticipant, setFormParticipant] = useState<Participant>(defaultParticipant);

  const fetchParticipants = async () => {
    const participantsList = await getParticipants();
    setParticipants(participantsList);
  };

  useEffect(() => {
    fetchParticipants();
  }, []);

  const handleParticipantSubmit = () => {
    setSelectedParticipant(null);
    fetchParticipants();
  };

  const handleParticipantEdit = (participant: Participant) => {
    setSelectedParticipant(participant);
    fetchParticipants();
  };

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
      <ParticipantForm
        onSubmit={handleParticipantSubmit}
        participant={selectedParticipant}
      />
      <ParticipantList
        participants={participants}
        setParticipants={setParticipants}
        onEdit={handleParticipantEdit}
      />
    </div>
  );
}
