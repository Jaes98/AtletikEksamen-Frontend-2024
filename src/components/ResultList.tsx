import { Results } from "../Interfaces";
import { deleteResult } from "../services/apiFacade";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ResultListProps {
  results: Results[];
  setResults: React.Dispatch<React.SetStateAction<Results[]>>;
  onEdit: (result: Results) => void;
}

export default function ResultList({
  results,
  setResults,
  onEdit,
}: ResultListProps) {
  const handleDelete = async (id: number | undefined) => {
    if (id === undefined) {
      console.error("Cannot delete result: id is undefined");
      return;
    }

    try {
      await deleteResult(id);
      setResults(results.filter((result) => result.id !== id));
      toast.success("Result deleted successfully");
    } catch (error) {
      toast.error("Could not delete result, something went wrong.");
      console.error(error);
    }
  };

  const handleEdit = (result: Results) => {
    onEdit(result);
    window.scrollTo(0, 0);
  };

  return (
    <div className="results-list-page">
      <h2 className="results-header">Results</h2>
      <table className="results-table">
        <thead>
          <tr>
            <th>Participant Name</th>
            <th>Event</th>
            <th>Score</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result) => (
            <tr key={result.id}>
              <td>{result.participant.name}</td>
            <td>{result.resultValue} {result.resultType === "Track" ? "seconds" : result.resultType === "Field" ? "meters" : ""}</td>
              <td>{new Date(result.date).toLocaleDateString()}</td>
              <td>
                <button
                  className="edit-button"
                  onClick={() => handleEdit(result)}
                >
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(result.id)}
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
}
