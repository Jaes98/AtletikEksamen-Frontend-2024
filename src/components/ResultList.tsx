import React, { useState } from "react";
import { Results, Discipline } from "../Interfaces";
import { deleteResult } from "../services/apiFacade";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ResultListProps {
  results: Results[];
  setResults: React.Dispatch<React.SetStateAction<Results[]>>;
  disciplines: Discipline[];
  onEdit: (result: Results) => void;
}

const ResultList: React.FC<ResultListProps> = ({
  results = [],
  setResults,
  disciplines = [],
  onEdit,
}) => {
  const [selectedDiscipline, setSelectedDiscipline] = useState<number | null>(
    null
  );
  const [selectedGender, setSelectedGender] = useState<string>("");

  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: string;
  }>({
    key: "",
    direction: "",
  });

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

  const requestSort = (key: string) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedResults = [...results].sort((a, b) => {
    if (sortConfig.direction === "ascending") {
      return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
    }
    if (sortConfig.direction === "descending") {
      return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
    }
    return 0;
  });

  const getClassNamesFor = (name: string) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  // Filter results based on selected discipline and gender
  const filteredResults = sortedResults
    .filter((result) =>
      selectedDiscipline ? result.discipline.id === selectedDiscipline : true
    )
    .filter((result) =>
      selectedGender ? result.participant.gender === selectedGender : true
    );

  return (
    <div className="results-list-page">
      <h2 className="results-header">Results</h2>

      <div className="filter-controls">
        <label htmlFor="discipline-select">Discipline: </label>
        <select
          id="discipline-select"
          value={selectedDiscipline ?? ""}
          onChange={(e) =>
            setSelectedDiscipline(
              e.target.value ? parseInt(e.target.value) : null
            )
          }
        >
          <option value="">All</option>
          {disciplines.map((discipline) => (
            <option key={discipline.id} value={discipline.id}>
              {discipline.name}
            </option>
          ))}
        </select>

        <label htmlFor="gender-select">Gender: </label>
        <select
          id="gender-select"
          value={selectedGender}
          onChange={(e) => setSelectedGender(e.target.value)}
        >
          <option value="">All</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>

      <table className="results-table">
        <thead>
          <tr>
            <th onClick={() => requestSort("participant.name")}>
              Participant Name{" "}
              {getClassNamesFor("participant.name") === "ascending" && (
                <span className="sort-indicator">&#9650;</span>
              )}
              {getClassNamesFor("participant.name") === "descending" && (
                <span className="sort-indicator">&#9660;</span>
              )}
            </th>
            <th onClick={() => requestSort("discipline.name")}>
              Event{" "}
              {getClassNamesFor("discipline.name") === "ascending" && (
                <span className="sort-indicator">&#9650;</span>
              )}
              {getClassNamesFor("discipline.name") === "descending" && (
                <span className="sort-indicator">&#9660;</span>
              )}
            </th>
            <th onClick={() => requestSort("resultValue")}>
              Score{" "}
              {getClassNamesFor("resultValue") === "ascending" && (
                <span className="sort-indicator">&#9650;</span>
              )}
              {getClassNamesFor("resultValue") === "descending" && (
                <span className="sort-indicator">&#9660;</span>
              )}
            </th>
            <th onClick={() => requestSort("date")}>
              Date{" "}
              {getClassNamesFor("date") === "ascending" && (
                <span className="sort-indicator">&#9650;</span>
              )}
              {getClassNamesFor("date") === "descending" && (
                <span className="sort-indicator">&#9660;</span>
              )}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredResults.map((result) => (
            <tr key={result.id}>
              <td>{result.participant.name}</td>
              <td>{result.discipline.name}</td>
              <td>
                {result.resultValue}{" "}
                {result.resultType === "Time"
                  ? "seconds"
                  : result.resultType === "Distance"
                  ? "meters"
                  : ""}
              </td>
              <td>{new Date(result.date).toLocaleDateString()}</td>
              <td>
                {/* <button
                  className="edit-button"
                  onClick={() => handleEdit(result)}
                >
                  Edit
                </button> */}
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
};

export default ResultList;
