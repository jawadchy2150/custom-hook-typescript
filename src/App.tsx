import { useEffect, useState } from 'react';
import './App.css'
import useApi from './hooks/useApi'
import useToggle from './hooks/useToggle';
import useDebounce from './hooks/useDebounce';

type ApiResponse = {id: number, name: string}[];

function App() {
  const { data, error, isLoading, apiCall } = useApi<ApiResponse>({
    method: 'GET',
    url: 'https://api.restful-api.dev/objects',
  })
  const {value, toggle} = useToggle()
  
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce<string>(searchTerm, 500);

  const filteredData = data ? data.filter(post=> post.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())): [];

  // useEffect(()=> {
  //   if (debouncedSearchTerm)
  //     console.log("searching data for: ", debouncedSearchTerm)
  // }, [debouncedSearchTerm])

  return (
    <>
      <h2>Custom hook in Typescript</h2>
      <div>
            <input
                type="text"
                value ={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
            />
      </div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {data && (
         <ul>
         {filteredData.map((item) => (
           <li key={item.id}>{item.name}</li>
         ))}
       </ul>
       
      )}
      <div>
        <button onClick={apiCall}>Reload Data</button>
      </div>
      <div>
        <p>Current Status: {value? 'ON': 'OFF'}</p>
        <button onClick={toggle}>{value? 'Turn OFF': 'Turn ON'}</button>
      </div>
    </>
  )
}

export default App
