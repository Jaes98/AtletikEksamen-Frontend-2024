import { useState, useEffect } from "react";
import { Participant, Discipline } from "../Interfaces";
import { deleteParticipant } from "../services/apiFacade";
import { toast } from "react-toastify";
import "../styling/modalview.css";

interface ParticipantListProps {
  participants: Participant[];
  setParticipants: React.Dispatch<React.SetStateAction<Participant[]>>;
  onEdit: (participant: Participant) => void;
  disciplines: Discipline[];
}

function ParticipantList(props: ParticipantListProps) {
  const { participants, setParticipants, onEdit, disciplines } = props;
  const [showModal, setShowModal] = useState(false);
  const [selectedParticipant, setSelectedParticipant] =
    useState<Participant | null>(null);
  const [filteredParticipants, setFilteredParticipants] = useState<
    Participant[]
  >([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [genderFilter, setGenderFilter] = useState<string | null>(null);
  const [disciplineFilter, setDisciplineFilter] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    setFilteredParticipants(participants);
  }, [participants]);

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
      toast.success(`Participant deleted successfully`);
    } catch (error) {
      toast.error("Could not delete participant, something went wrong.");
      console.error(error);
    }
  };

  const handleEdit = (participant: Participant) => {
    onEdit(participant);
    window.scrollTo(0, 0);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    filterParticipants(
      e.target.value,
      genderFilter,
      disciplineFilter,
      sortBy,
      sortOrder
    );
  };

  const handleGenderFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = e.target.value;
    setGenderFilter(value === "all" ? null : value);
    filterParticipants(
      searchTerm,
      value === "all" ? null : value,
      disciplineFilter,
      sortBy,
      sortOrder
    );
  };

  const handleDisciplineFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = e.target.value;
    setDisciplineFilter(value === "all" ? null : value);
    filterParticipants(
      searchTerm,
      genderFilter,
      value === "all" ? null : value,
      sortBy,
      sortOrder
    );
  };

  const handleSort = (sortByField: string) => {
    if (sortBy === sortByField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(sortByField);
      setSortOrder("asc");
    }

    filterParticipants(
      searchTerm,
      genderFilter,
      disciplineFilter,
      sortByField,
      sortOrder === "asc" ? "asc" : "desc"
    );
  };

  const filterParticipants = (
    searchTerm: string,
    gender: string | null,
    discipline: string | null,
    sortByField: string | null,
    sortOrder: "asc" | "desc"
  ) => {
    let filteredList = participants.filter((participant) =>
      participant.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (gender) {
      filteredList = filteredList.filter(
        (participant) =>
          participant.gender.toLowerCase() === gender.toLowerCase()
      );
    }

    if (discipline) {
      filteredList = filteredList.filter((participant) =>
        participant.disciplines.some(
          (d) => d.name.toLowerCase() === discipline.toLowerCase()
        )
      );
    }

    if (sortByField) {
      filteredList.sort((a, b) => {
        const aValue = a[sortByField as keyof Participant];
        const bValue = b[sortByField as keyof Participant];

        if (aValue !== undefined && bValue !== undefined) {
          if (sortOrder === "asc") {
            return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
          } else {
            return bValue < aValue ? -1 : bValue > aValue ? 1 : 0;
          }
        }
        return 0;
      });
    }

    setFilteredParticipants(filteredList);
  };

  return (
    <div className="participants-list-page">
      <h2 className="participants-header">Participants</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={handleSearch}
      />

      {/* Gender Filter Select */}
      <select onChange={handleGenderFilterChange}>
        <option value="all">All Genders</option>
        <option value="female">Female</option>
        <option value="male">Male</option>
      </select>

      {/* Discipline Filter Select */}
      <select onChange={handleDisciplineFilterChange}>
        <option value="all">All Disciplines</option>
        {disciplines.map((discipline) => (
          <option key={discipline.id} value={discipline.name}>
            {discipline.name}
          </option>
        ))}
      </select>

      <table className="participants-table">
        <thead>
          <tr>
            <th onClick={() => handleSort("name")}>Name</th>
            <th onClick={() => handleSort("age")}>Age</th>
            <th onClick={() => handleSort("gender")}>Gender</th>
            <th onClick={() => handleSort("club")}>Club</th>
            <th onClick={() => handleSort("disciplines")}>Discipline Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredParticipants.map((participant) => (
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
                      : result.resultType === "Height"
                      ? "meters"
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

export default ParticipantList;
