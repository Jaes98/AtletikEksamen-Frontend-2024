import { Participant } from "../Interfaces";

interface ParticipantListProps {
  participants: Participant[];
}

const ParticipantList: React.FC<ParticipantListProps> = ({ participants }) => {
    
  return (
    <div className="product-list-page">
      <h2 className="product-header">Products</h2>
      <table className="product-table">
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

export default ParticipantList;
