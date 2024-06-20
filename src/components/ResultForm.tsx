import { useState, useEffect } from "react";
import { Participant, Discipline, Results } from "../Interfaces"; // Assuming Interfaces are defined
import {
  registerResult,
  updateResult,
  deleteResult,
} from "../services/apiFacade"; // Assuming API functions for CRUD operations
import { toast } from "react-toastify";
import "../styling/resultForm.css"; // Assuming CSS file for styling

interface ResultFormProps {
  participants: Participant[];
  disciplines: Discipline[];
}

export default function ResultForm({
  participants,
  disciplines,
}: ResultFormProps) {
  const [selectedParticipant, setSelectedParticipant] = useState<number | null>(
    null
  );
  const [selectedDiscipline, setSelectedDiscipline] = useState<number | null>(
    null
  );
  const [results, setResults] = useState<Results[]>([]);
  const [newResultValue, setNewResultValue] = useState<string>("");
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editingResultId, setEditingResultId] = useState<number | null>(null);

  useEffect(() => {
    // Fetch initial results or set initial state as needed
    // Example:
    // fetchResults();
  }, []);

  const handleParticipantChange = (participantId: number) => {
    setSelectedParticipant(participantId);
    setResults([]); // Reset results when participant changes
  };

  const handleDisciplineChange = (disciplineId: number) => {
    setSelectedDiscipline(disciplineId);
    setResults([]); // Reset results when discipline changes
  };

  const handleResultInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewResultValue(e.target.value);
  };

  const handleAddResult = async () => {
    if (!selectedParticipant || !selectedDiscipline || !newResultValue.trim()) {
      toast.error(
        "Please select participant, discipline, and enter a result value."
      );
      return;
    }

    try {
      // Perform API call to register result
      const result = await registerResult({
        participantId: selectedParticipant,
        disciplineId: selectedDiscipline,
        resultValue: newResultValue.trim(),
      });

      setResults([...results, result]);
      setNewResultValue("");
      toast.success("Result registered successfully!");
    } catch (error) {
      toast.error("Failed to register result. Please try again.");
      console.error("Error:", error);
    }
  };

  const handleEditResult = async (resultId: number, newValue: string) => {
    try {
      // Perform API call to update result
      const updatedResult = await updateResult(resultId, {
        resultValue: newValue,
      });

      setResults(
        results.map((result) =>
          result.id === resultId ? updatedResult : result
        )
      );
      setEditMode(false);
      setEditingResultId(null);
      toast.success("Result updated successfully!");
    } catch (error) {
      toast.error("Failed to update result. Please try again.");
      console.error("Error:", error);
    }
  };

  const handleDeleteResult = async (resultId: number) => {
    try {
      // Perform API call to delete result
      await deleteResult(resultId);

      setResults(results.filter((result) => result.id !== resultId));
      toast.success("Result deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete result. Please try again.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="result-form">
      <h2>Result Management</h2>

      {/* Participant Selection */}
      <select
        value={selectedParticipant || ""}
        onChange={(e) => handleParticipantChange(parseInt(e.target.value))}
      >
        <option value="">Select Participant</option>
        {participants.map((participant) => (
          <option key={participant.id} value={participant.id}>
            {participant.name}
          </option>
        ))}
      </select>

      {/* Discipline Selection */}
      <select
        value={selectedDiscipline || ""}
        onChange={(e) => handleDisciplineChange(parseInt(e.target.value))}
      >
        <option value="">Select Discipline</option>
        {disciplines.map((discipline) => (
          <option key={discipline.id} value={discipline.id}>
            {discipline.name}
          </option>
        ))}
      </select>

      {/* Result Input */}
      <div className="result-input">
        <input
          type="text"
          value={newResultValue}
          onChange={handleResultInputChange}
          placeholder="Enter result value"
        />
        {!editMode ? (
          <button onClick={handleAddResult}>Add Result</button>
        ) : (
          <button
            onClick={() => handleEditResult(editingResultId!, newResultValue)}
          >
            Save Changes
          </button>
        )}
      </div>

      {/* Results List */}
      <div className="results-list">
        {results.map((result) => (
          <div key={result.id} className="result-item">
            <span>{result.resultValue}</span>
            <button
              onClick={() => {
                setEditMode(true);
                setEditingResultId(result.id);
                setNewResultValue(result.resultValue);
              }}
            >
              Edit
            </button>
            <button onClick={() => handleDeleteResult(result.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
