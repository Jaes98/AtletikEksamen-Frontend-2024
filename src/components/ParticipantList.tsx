import { Participant } from "../Interfaces";
import { deleteParticipant } from "../services/apiFacade";
import { toast } from "react-toastify";

interface ParticipantListProps {
  participants: Participant[];
  setParticipants: React.Dispatch<React.SetStateAction<Participant[]>>;
    onEdit: (participant: Participant) => void;
}

export default function ParticipantList({ participants, setParticipants, onEdit }: ParticipantListProps) {

    const handleDelete = async (id: number | undefined) => {
      if (id === undefined) {
        console.error("Cannot delete participant: id is undefined");
        return;
      }

      try {
        await deleteParticipant(id);
        setParticipants(participants.filter((participant) => participant.id !== id));
        toast.success("Participant deleted successfully");
      } catch (error) {
        toast.error("Could not delete participant, something went wrong.");
        console.error(error);
      }
    };
    const handleEdit = async (participant: Participant) => {
      onEdit(participant);
      window.scrollTo(0, 0);
    };
    
  return (
    <div className="participants-list-page">
      <h2 className="participants-header">Participants</h2>
      <table className="participants-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Club</th>
            <th>Discipline Type</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {participants.map((participant) => (
            <tr key={participant.id}>
              <td>{participant.name}</td>
              <td>{participant.age}</td>
              <td>{participant.gender}</td>
              <td>{participant.club}</td>
            <td>
                {participant.disciplines.map((discipline) => (
                    <span key={discipline.id}>{discipline.name}, </span>
                ))}
            </td>
            {/* <td>
                {participant.results.map((result) => (
                    <span key={result.id}>{result.resultValue}, </span>
                ))}
            </td> */}
              <td>
                <button
                  className="edit-button"
                  onClick={() => handleEdit(participant)}
                >
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(participant.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
