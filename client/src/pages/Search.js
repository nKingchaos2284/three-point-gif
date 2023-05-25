import React, { useState } from 'react';
import axios from 'axios';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [gifs, setGifs] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.get(`/api/gifs?searchTerm=${searchTerm}`);
      setGifs(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>In A GIFFY</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for GIFs"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {gifs.map((gif) => (
            <img key={gif.id} src={gif.url} alt={gif.title} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
