import { useEffect, useState } from "react";
import { getParticipants, getDisciplines } from "../services/apiFacade";
import ParticipantList from "../components/ParticipantList";
import ParticipantForm from "../components/ParticipantForm";
import { Participant, Discipline } from "../Interfaces";

export default function ParticipantPage() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);

  const fetchParticipants = async () => {
    const participantsList = await getParticipants();
    setParticipants(participantsList);
  };

  const fetchDisciplines = async () => {
    const disciplinesList = await getDisciplines();
    setDisciplines(disciplinesList);
  };

  useEffect(() => {
    fetchParticipants();
    fetchDisciplines();
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
        disciplines={disciplines}
      />
    </div>
  );
}
