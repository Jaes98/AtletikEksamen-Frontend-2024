const readData = async () => {
  const response = await fetch("http://localhost:8080/animals");
  const data = await response.json();
  console.log(data);

  setAnimalData(data);
};

const createData = async () => {
  const response = await fetch("http://localhost:8080/animals", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newAnimal),
  });
  const data = await response.json();
  console.log(data);

  setNewAnimal({
    id: 0,
    name: "",
    star: false,
    cutenessFactor: 0,
    animalType: { id: 0, name: "" },
    birthdate: "",
  });

  readData();
};

const deleteData = async (animalId: number) => {
  const response = await fetch(`http://localhost:8080/animals/${animalId}`, {
    method: "DELETE",
  });
  const data = await response.json();
  console.log(data);

  readData();
};

export { readData, createData, deleteData };