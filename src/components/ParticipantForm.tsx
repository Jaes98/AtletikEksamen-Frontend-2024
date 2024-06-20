import { useState } from 'react';
import { Participant } from '../Interfaces';
import { useEffect } from 'react';
import { createParticipant, updateParticipant } from '../services/apiFacade';
import { toast } from 'react-toastify';

interface ParticipantFormProps {
  participant: Participant | null;
  onSubmit: (participant: Participant) => void;
}

export default function ParticipantForm({ participant, onSubmit }: ParticipantFormProps) {
    const [errorMessage, setErrorMessage] = useState<string>("");

    const defaultFormObj: Participant = {
      id: undefined,
      name: "",
      age: 0,
      gender: "",
      club: "",
      disciplines: [],
      results: []
    };


    const [formData, setFormData] = useState<Participant>(
      participant || defaultFormObj
    );

    useEffect(() => {
      setFormData(participant || defaultFormObj);
    }, [participant]);

    const handleSubmit = async (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
      e.preventDefault();
      //   if (
      //     participant.name === "" ||
      //     selectedParticipant.age === 0 ||
      //     selectedParticipant.species === ""
      //   )
      //     return setErrorMessage("Please fill out all fields");
      try {
        let savedParticipant;
        if (formData.id) {
          savedParticipant = await updateParticipant(formData.id, formData);
        } else {
          savedParticipant = await createParticipant(formData);
        }
        onSubmit(savedParticipant);
        setFormData(defaultFormObj);
        toast.success("Participant saved successfully");
      } catch (error) {
        console.error("Error saving participant:", error);
        toast.error("Failed to save participant");
      }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      if (name === "age" && Number(value) < 0) {
        return;
      }
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: name === "age" ? Number(value) : value,
      }));
    };

  return (
    <div>
        {errorMessage && <p>{errorMessage}</p>}
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Name"
      />
      <input
        type="number"
        name="age"
        value={formData.age}
        onChange={handleInputChange}
        placeholder="Age"
      />
      <select
        name="gender"
        value={formData.gender}
        onChange={handleInputChange}
      >
        <option value="">Select gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <input
        type="text"
        name="club"
        value={formData.club}
        onChange={handleInputChange}
        placeholder="Club"
      />
      {/* {formData.disciplines.map((discipline, index) => (
        <div key={index}>
          <input
            type="checkbox"
            checked={formData.disciplines.includes(discipline)}
            value={discipline}
            onChange={handleCheckboxChange}
          />
          <label>{discipline}</label>
        </div>
      ))} */}
      <button type="submit">Save</button>
    </form>
    </div>
  );
}