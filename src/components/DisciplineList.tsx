import React from "react";
import { Discipline } from "../Interfaces";

interface DisciplineListProps {
  disciplines: Discipline[];
}

const DisciplineList: React.FC<DisciplineListProps> = ({
  disciplines,
}) => {
  return (
    <div>
      <h2>Disciplines</h2>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Result Type</th>
          </tr>
        </thead>
        <tbody>
          {disciplines.map((discipline) => (
            <tr key={discipline.id}>
              <td>{discipline.name}</td>
              <td>{discipline.resultType}</td>
              <td>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DisciplineList;
