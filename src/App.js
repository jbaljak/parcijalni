import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);

  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`https://api.github.com/users/${username}`);
      setUser(response.data);
      fetchRepositories(response.data.repos_url); 
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRepositories = async (reposUrl) => {
    try {
      const response = await axios.get(reposUrl);
      setRepos(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchRepositories(user.repos_url);
    }
  }, [user]);

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label>
          Search for a GitHub user:
          <input type="text" value={username} onChange={handleInputChange} />
        </label>
        <br />
        <button type="submit">Search</button>
      </form>

      {user && (
        <div>
          <h2>User Info:</h2>
          <img src={user.avatar_url} alt="User Avatar" />
          <p>Name: {user.name}</p>
          <p>Location: {user.location}</p>
          <p>Bio: {user.bio}</p>
        </div>
      )}

      {repos.length > 0 && (
        <div className="UserRepositories">
          <h2>User Repositories:</h2>
          <ul>
            {repos.map((repo) => (
              <li key={repo.id}>
                <a href={repo.html_url} target="_blank" rel="noreferrer">
                  {repo.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
