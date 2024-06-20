export default function ParticipantForm() {
    return (
      <div>
        <h1>Atletik Eksamen</h1>
        <h2>CRUD</h2>
        <form onSubmit={createData}>
          Name
          <input
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
          Number
          <input
            type="number"
            value={newAnimal.cutenessFactor}
            onChange={(e) =>
              setNewAnimal({ ...newAnimal, cutenessFactor: +e.target.value })
            }
            placeholder="Cuteness Factor"
          />
          Type
          <input
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
          Birthdate
          <input
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
    );
    }