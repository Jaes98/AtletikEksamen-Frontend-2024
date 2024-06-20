export default function ParticipantList() {
    return (
      <div>
        {animalData && (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Star</th>
                <th>Cuteness Factor</th>
                <th>Animal Type</th>
                <th>Birthdate</th>
              </tr>
            </thead>
            <tbody>
              {animalData.map((animal) => (
                <tr key={animal.id}>
                  <td>{animal.id}</td>
                  <td>{animal.name}</td>
                  <td>{animal.star ? "Yes" : "No"}</td>
                  <td>{animal.cutenessFactor}</td>
                  <td>{animal.animalType.name}</td>
                  <td>{animal.birthdate}</td>
                  <button onClick={() => deleteData(animal.id)}>Delete</button>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
    }