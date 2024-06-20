import { useState, useEffect } from "react";
import { Participant, Discipline } from "../Interfaces";
import {
    createParticipant,
    updateParticipant,
    getDisciplines,
} from "../services/apiFacade";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styling/participantForm.css";

interface ParticipantFormProps {
    participant: Participant | null;
    onSubmit: (participant: Participant) => void;
}

export default function ParticipantForm({
    participant,
    onSubmit,
}: ParticipantFormProps) {
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [disciplines, setDisciplines] = useState<Discipline[]>([]);

    const defaultFormObj: Participant = {
        id: undefined,
        name: "",
        age: 0,
        gender: "",
        club: "",
        disciplines: [],
        results: [],
    };

    const [formData, setFormData] = useState<Participant>(
        participant || defaultFormObj
    );

    useEffect(() => {
        setFormData(participant || defaultFormObj);
    }, [participant]);

    useEffect(() => {
        async function fetchDisciplines() {
            const disciplinesList = await getDisciplines();
            setDisciplines(disciplinesList);
        }
        fetchDisciplines();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formData.name || formData.age <= 0 || !formData.gender) {
            setErrorMessage("Please fill out all fields");
            return;
        }
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

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        if (name === "age" && Number(value) < 0) {
            return;
        }
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: name === "age" ? Number(value) : value,
        }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        const disciplineId = parseInt(value);
        const discipline = disciplines.find((d) => d.id === disciplineId);

        if (!discipline) return;

        setFormData((prevFormData) => {
            const newDisciplines = checked
                ? [...prevFormData.disciplines, discipline]
                : prevFormData.disciplines.filter((d) => d.id !== disciplineId);

            return { ...prevFormData, disciplines: newDisciplines };
        });
    };

    return (
        <div className="participant-form">
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
                className="form-select"
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
                <input
                    type="text"
                    name="club"
                    value={formData.club}
                    onChange={handleInputChange}
                    placeholder="Club"
                />

                <div className="discipline-checkbox">
                    <h3>Disciplines</h3>
                    {disciplines.map((discipline) => (
                        <div key={discipline.id}>
                            <input
                                type="checkbox"
                                value={discipline.id.toString()}
                                checked={formData.disciplines.some(
                                    (d) => d.id === discipline.id
                                )}
                                onChange={handleCheckboxChange}
                            />
                            <label>{discipline.name}</label>
                        </div>
                    ))}
                </div>

                <button type="submit">{formData.id ? "Update" : "Submit"}</button>
            </form>
        </div>
    );
}
