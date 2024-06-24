import React, { useState, useEffect } from "react";
import { createDiscipline, updateDiscipline } from "../services/apiFacade";
import { Discipline } from "../Interfaces"
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


interface DisciplineFormProps {
  onSubmit: (discipline: Discipline) => void;
  discipline: Discipline | null;
}

const DisciplineForm: React.FC<DisciplineFormProps> = ({
  onSubmit,
  discipline,
}) => {
  const defaultFormObj: Discipline = {
    // @ts-ignore
    id: undefined,
    name: "",
    resultType: "",
  };

  const [formData, setFormData] = useState<Discipline>(
    discipline || defaultFormObj
  );
  const [formErrors, setFormErrors] = useState<string[]>([]);

  useEffect(() => {
    setFormData(discipline || defaultFormObj);
  }, [discipline]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    try {
      let savedDiscipline;
      if (formData.id) {
        savedDiscipline = await updateDiscipline(formData.id, formData);
      } else {
        savedDiscipline = await createDiscipline(formData);
      }
      onSubmit(savedDiscipline);
      setFormData(defaultFormObj);
      toast.success("Discipline saved successfully");
      window.scrollTo(0, 0);
    } catch (error) {
      console.error("Error saving discipline:", error);
      toast.error("Failed to save discipline");
    }
  };

  const validateForm = (): boolean => {
    const errors: string[] = [];

    if (!formData.name || !formData.resultType) {
      errors.push("Please fill out all fields.");
    }

    setFormErrors(errors);
    return errors.length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2>
        Add New Discipline
      </h2>
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Result Type:
            <select
              name="resultType"
              value={formData.resultType}
              onChange={handleInputChange}
            >
              <option value="">Select Result Type</option>
              <option value="Time">Time</option>
              <option value="Distance">Distance</option>
              <option value="Height">Height</option>
              <option value="Points">Points</option>
            </select>
          </label>
          <div>
            {formErrors.map((error, index) => (
              <p key={index}>
                {error}
              </p>
            ))}
          </div>
          <button type="submit">Save Discipline</button>
        </form>
      </div>
    </div>
  );
};

export default DisciplineForm;
