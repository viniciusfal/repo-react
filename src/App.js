import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";


function App() {
  //Criar uma rota get para listar os repositories
  const [ repositories, setRepositories ] = useState([]); 

  useEffect(() => {
    api.get("/repositories").then((response) =>{
      setRepositories(response.data) //estado atualizado
    });
  }, []);


  //Criar uma rota que me permita adicionar um novo repository
  async function handleAddRepository() {
    
      const response = await api.post("/repositories", {
        title: "store-repository",
        url: "https://github.com/viniciusfal/store-repository",
        techs: ["Node.js", "React.js"],
      })
      const repository = response.data;
      setRepositories([ ...repositories ,repository])

  };


  //Criar uma rota que me permita deletar um desses repository listados
  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    setRepositories(repositories.filter(
      repository => repository.id != id
      
    ))
  }

  
  //Colocar key
  //mostrar pelo objeto title o repository
  //mapear repository
  return (
    <div>
      <ul data-testid="repository-list">
       {repositories.map(repository => (
          <li key = {repository.id}>
            {repository.title}
            
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
       ))}
     </ul>
      <button onClick={handleAddRepository}>Adicionar</button>

    </div>
  );
}

export default App;
