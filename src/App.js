import { useState } from 'react';
import { FiSearch } from 'react-icons/fi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style.css'
import api from './services/api'

function App() {

  const [input, setInput] = useState('')
  const [cep, setCep] = useState({})

  async function handleSearch() {
    if(input === '') {
      toast.warning('Preencha com algum cep!')
      // alert('Preencha com algum cep!')
      return
    }

    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data)
      setInput('')
    } catch {
      toast.error('Digite um cep valido!')
      setInput('')
    }
  }

  function handleKeyDown(e) {
    if(e.key === 'Enter') {
      handleSearch()
    }
  }

  function ClearCep() {
    setCep({})
  }

  return (
    <div className="container">
      <h1 className="title">Buscador de CEP</h1>

      <div className="containerInput">
        <input 
          type="text"
          placeholder="Digite o seu cep..."
          value={input}
          onChange={(e) => setInput(e.target.value) }
          onKeyDown={handleKeyDown}
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color='#FFF'/>
        </button>
      </div>
      
      {Object.keys(cep).length > 0 && (
        <main className='main'>
          <h2>CEP:{cep.cep}</h2>
          <span>{cep.logradouro}</span>
          <span>Complemento:{cep.complemento ? cep.complemento : " Não possui complemento"}</span>
          <span>{cep.bairro}</span>
          <span>{cep.localidade} {cep.uf}</span>
        </main>
      )}
      <button className='clearBtn' onClick={ClearCep}>Limpar</button>
      <ToastContainer 
        position="top-center"
        autoClose={4000}
        theme="colored"
      />
    </div>
  );
}

export default App;
