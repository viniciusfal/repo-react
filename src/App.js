import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";


function App() {
  //Criar uma rota get para listar os repositories
  const [ repositories, setRepositories ] = useState([]); //useState serve para me mostrar algo, ele me dar o valor inicia, padrão que no caso é repositories; e me permite usar o set, que atualiza esse meu estado.
  
  useEffect(() => {
    api.get("/repositories").then((response) =>{
      setRepositories(response.data) //estado atualizado
    });
  }, []);

  //Criar uma rota que me permita adicionar um novo repository
  async function handleAddRepository() {
    
      const response = await api.post("/repositories", {
        title: "Desafio React.js" ,
        url: "https://github.com/viniciusfal",
        techs: ["nodejs", "React.js"],
      })

      const repository = response.data;
      setRepositories([...repositories, repository]);
  };
  



  //Criar uma rota que me permita deletar um desses repository listados
  async function handleRemoveRepository(id) {
    
  }


  //Colocar key
  //mostrar pelo objeto title o repository
  //mapear repository
  return (
    <div>
      <ul data-testid="repository-list">
       {repositories.map((repository) => (//recebe uma chave por conta sintaxe react. permitindo usar html
          <li key = {repository.id}>
            {repository.title}
            
          <button onClick={() => handleRemoveRepository(1)}>
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
