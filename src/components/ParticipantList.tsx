import { Participant } from "../Interfaces";
import { deleteParticipant } from "../services/apiFacade";
import { toast } from "react-toastify";
import { useState } from "react";
import "../styling/modalview.css"

interface ParticipantListProps {
  participants: Participant[];
  setParticipants: React.Dispatch<React.SetStateAction<Participant[]>>;
  onEdit: (participant: Participant) => void;
}

export default function ParticipantList({
  participants,
  setParticipants,
  onEdit,
}: ParticipantListProps) {
  const [showModal, setShowModal] = useState(false);
  const [selectedParticipant, setSelectedParticipant] =
    useState<Participant | null>(null);

  const openModal = (participant: Participant) => {
    setSelectedParticipant(participant);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedParticipant(null);
    setShowModal(false);
  };

  const handleDelete = async (id: number | undefined) => {
    if (id === undefined) {
      console.error("Cannot delete participant: id is undefined");
      return;
    }

    try {
      await deleteParticipant(id);
      setParticipants(
        participants.filter((participant) => participant.id !== id)
      );
      toast.success("Participant deleted successfully");
    } catch (error) {
      toast.error("Could not delete participant, something went wrong.");
      console.error(error);
    }
  };

  const handleEdit = (participant: Participant) => {
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
            <th>Actions</th>
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
              <td>
                <button
                  className="details-button"
                  onClick={() => openModal(participant)}
                >
                  Show more..
                </button>
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

      {/* Modal */}
      {showModal && selectedParticipant && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>Participant Details</h2>
            <p>Name: {selectedParticipant.name}</p>
            <p>Age: {selectedParticipant.age}</p>
            <p>Gender: {selectedParticipant.gender}</p>
            <p>Club: {selectedParticipant.club}</p>
            <p>Results:</p>
            <ul>
              {selectedParticipant.results.map((result) => (
                <li key={result.id}>
                  <>
                    {result.resultValue}{" "}
                    {result.resultType === "Time"
                      ? "seconds"
                      : result.resultType === "Distance"
                      ? "meters"
                      : result.resultType === "Height" ?
                        "meters"
                      : ""}
                  </>
                </li>
              ))}
            </ul>
            <p>Disciplines:</p>
            <ul>
              {selectedParticipant.disciplines.map((discipline) => (
                <li key={discipline.id}>{discipline.name}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
