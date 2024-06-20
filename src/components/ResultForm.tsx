import React, { useState } from "react";
import { Results, Participant, Discipline } from "../Interfaces";
import { registerResult } from "../services/apiFacade";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ResultFormProps {
  disciplines: Discipline[];
  participants: Participant[];
}

const ResultForm: React.FC<ResultFormProps> = ({
  disciplines,
  participants,
}) => {
  const [formData, setFormData] = useState<Results>({
    resultType: "",
    resultValue: 0,
    date: "",
    participant:
      participants.length > 0
        ? participants[0]
        : {
            id: -1,
            name: "",
            age: 0,
            gender: "",
            club: "",
            disciplines: [],
            results: [],
          },
    discipline:
      disciplines.length > 0
        ? disciplines[0]
        : {
            id: -1,
            name: "",
            resultType: "",
          },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === "resultValue" ? Number(value) : value,
    }));
  };

  const handleDisciplineChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const disciplineId = parseInt(e.target.value);
    const selectedDiscipline = disciplines.find(
      (discipline) => discipline.id === disciplineId
    );
    if (selectedDiscipline) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        discipline: selectedDiscipline,
      }));
    }
  };

  const handleParticipantChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const participantId = parseInt(e.target.value);
    const selectedParticipant = participants.find(
      (participant) => participant.id === participantId
    );
    if (selectedParticipant) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        participant: selectedParticipant,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const savedResult = await registerResult(formData);
      setFormData({
        resultType: "",
        resultValue: 0,
        date: "",
        participant:
          participants.length > 0
            ? participants[0]
            : {
                id: -1,
                name: "",
                age: 0,
                gender: "",
                club: "",
                disciplines: [],
                results: [],
              },
        discipline:
          disciplines.length > 0
            ? disciplines[0]
            : {
                id: -1,
                name: "",
                resultType: "",
              },
      });
      toast.success("Result saved successfully");
    } catch (error) {
      console.error("Error saving result:", error);
      toast.error("Failed to save result");
    }
  };

  return (
    <div className="result-form">
      <h2>Result Management</h2>
      <form onSubmit={handleSubmit}>
        <select
          name="participant"
          value={formData.participant.id}
          onChange={handleParticipantChange}
        >
          {participants.map((participant) => (
            <option key={participant.id} value={participant.id}>
              {participant.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="resultType"
          value={formData.resultType}
          onChange={handleChange}
          placeholder="Result Type"
        />
        <input
          type="number"
          name="resultValue"
          value={formData.resultValue}
          onChange={handleChange}
          placeholder="Result Value"
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
        <select
          name="discipline"
          value={formData.discipline.id}
          onChange={handleDisciplineChange}
        >
          {disciplines.map((discipline) => (
            <option key={discipline.id} value={discipline.id}>
              {discipline.name}
            </option>
          ))}
        </select>

        <button type="submit">Submit Result</button>
      </form>
    </div>
  );
};

export default ResultForm;
