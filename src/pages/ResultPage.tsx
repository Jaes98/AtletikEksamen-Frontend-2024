import ResultList from "../components/ResultList";
import Resultform from "../components/ResultForm";
import { getResults } from "../services/apiFacade";
import { useEffect, useState } from "react";
import { Results } from "../Interfaces";


export default function ResultPage() {
    const [results, setResults] = useState<Results[]>([]);
    const [selectedResult, setSelectedResult] = useState<Results | null>(null);

    const fetchResults = async () => {
      const resultsList = await getResults();
      setResults(resultsList);
    };

    useEffect(() => {
      fetchResults();
    }, []);

    const handleResultSubmit = () => {
      setSelectedResult(null);
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
          margin: "1rem",
          padding: "1vw",
          gap: "2vw",
          justifyContent: "space-evenly",
        }}
      >
        <ResultList
          results={results}
          setResults={setResults}
          onEdit={handleResultEdit}
        />
        <Resultform />
      </div>
    );
};
