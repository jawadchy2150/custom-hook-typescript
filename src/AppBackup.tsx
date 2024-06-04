import { useEffect, useState } from "react";
import "./App.css";
import useApi from "./hooks/useApi";

type ApiResponse = { id: number; name: string }[];
type PostResponse = { message: string };

interface LoginRequestBody {
  email: string;
  password: string;
}

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { data, error, isLoading, apiCall } = useApi<ApiResponse>({
    method: "GET",
    url: "https://api.restful-api.dev/objects",
  });

  const { data: postData, apiCall: postRequest } = useApi<
    PostResponse,
    LoginRequestBody
  >({
    method: "POST",
    url: "https://api.restful-api.dev/objects",
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const requestBody: LoginRequestBody = {
      email: email,
      password: password,
    };

    await postRequest(requestBody);
    // console.log(postData);
  };

  // const { value, toggle } = useToggle();

  // const [searchTerm, setSearchTerm] = useState("");
  // const debouncedSearchTerm = useDebounce<string>(searchTerm, 500);

  // const filteredData = data
  //   ? data.filter((post) =>
  //       post.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  //     )
  //   : [];

  // useEffect(()=> {
  //   if (debouncedSearchTerm)
  //     console.log("searching data for: ", debouncedSearchTerm)
  // }, [debouncedSearchTerm])

  return (
    <>
      <h2>Custom hook in Typescript</h2>
      {/* <div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
        />
      </div> */}
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {data && (
        <ul>
          {data.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
      <div>
        <button onClick={apiCall}>Reload Data</button>
      </div>
      {/* <div>
        <p>Current Status: {value ? "ON" : "OFF"}</p>
        <button onClick={toggle}>{value ? "Turn OFF" : "Turn ON"}</button>
      </div> */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          ></input>
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default App;
