import { useState } from 'react';

function App() {
  const [animalData, setAnimalData] = useState<Animal[]>([]);
  const [newAnimal, setNewAnimal] = useState<Animal>({
    id: 0,
    name: '',
    star: false,
    cutenessFactor: 0,
    animalType: { id: 0, name: '' },
    birthdate: '',
  });

  interface Animal {
    id: number;
    name: string;
    star: boolean;
    cutenessFactor: number;
    animalType: animalType;
    birthdate: string;
  }
  interface animalType {
    id: number;
    name: string;
  }

  const readData = async () => {
    const response = await fetch('http://localhost:8080/animals');
    const data = await response.json();
    console.log(data);
    
    setAnimalData(data);
  };

  const createData = async () => {
    const response = await fetch('http://localhost:8080/animals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newAnimal),
    });
    const data = await response.json();
    console.log(data);

    setNewAnimal({
      id: 0,
      name: '',
      star: false,
      cutenessFactor: 0,
      animalType: { id: 0, name: '' },
      birthdate: '',
    });

    readData();
  };

  return (
    <div style={{ display: "flex" }}>
      <div>
        <h1>Animal Eksamen</h1>
        <h2>CRUD</h2>
        <button onClick={readData}>Read</button>
        <form onSubmit={createData}>
          Name<input
            type="text"
            value={newAnimal.name}
            onChange={(e) =>
              setNewAnimal({ ...newAnimal, name: e.target.value })
            }
            placeholder="Name"
          />
          Star
          <input
            type="checkbox"
            checked={newAnimal.star}
            onChange={(e) =>
              setNewAnimal({ ...newAnimal, star: e.target.checked })
            }
          />
          Number<input
            type="number"
            value={newAnimal.cutenessFactor}
            onChange={(e) =>
              setNewAnimal({ ...newAnimal, cutenessFactor: +e.target.value })
            }
            placeholder="Cuteness Factor"
          />
          Type<input
            type="text"
            value={newAnimal.animalType.name}
            onChange={(e) =>
              setNewAnimal({
                ...newAnimal,
                animalType: { id: 0, name: e.target.value },
              })
            }
            placeholder="Animal Type"
          />
          Birthdate<input
            type="date"
            value={newAnimal.birthdate}
            onChange={(e) =>
              setNewAnimal({ ...newAnimal, birthdate: e.target.value })
            }
            placeholder="Birthdate"
          />
          <button type="submit">Create</button>
        </form>
      </div>
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
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
