import ResultList from "../components/ResultList";
import Resultform from "../components/ResultForm";
import { getResults, getDisciplines, getParticipants } from "../services/apiFacade";
import { useEffect, useState } from "react";
import { Results, Participant, Discipline } from "../Interfaces";


export default function ResultPage() {
    const [results, setResults] = useState<Results[]>([]);
    const [selectedResult, setSelectedResult] = useState<Results | null>(null);
    const [participants, setParticipants] = useState<Participant[]>([]);
    const [disciplines, setDisciplines] = useState<Discipline[]>([]);

    const fetchParticipants = async () => {
      const participantsList = await getParticipants();
      setParticipants(participantsList);
    };

    const fetchDisciplines = async () => {
      const disciplinesList = await getDisciplines();
      setDisciplines(disciplinesList);
    };

    const fetchResults = async () => {
      const resultsList = await getResults();
      setResults(resultsList);
    };

    useEffect(() => {
      fetchResults();
      fetchParticipants();
      fetchDisciplines();
    }, []);

    const handleResultSubmit = () => {
      fetchResults();
    };

    const handleResultEdit = (result: Results) => {
      setSelectedResult(result);
      fetchResults();
    };

    return (
      <div
        style={{
          display: "flex",
          margin: "2rem",
          padding: "3vw",
          gap: "45vw",
          justifyContent: "space-evenly",
        }}
      >
        <Resultform
        participants={participants} 
        disciplines={disciplines}
        onSubmit={handleResultSubmit} />

        <ResultList
          results={results}
          disciplines={disciplines}
          setResults={setResults}
          onEdit={handleResultEdit}
        />
      </div>
    );
};
