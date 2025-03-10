import React, { useState } from 'react';
import './App.css';

// Sample songs data, including Bollywood songs and moods
const songs = [
  { id: 1, title: 'Blinding Lights', artist: 'The Weeknd', genre: 'Pop', mood: 'Energetic' },
  { id: 2, title: 'Levitating', artist: 'Dua Lipa', genre: 'Pop', mood: 'Energetic' },
  { id: 3, title: 'Save Your Tears', artist: 'The Weeknd', genre: 'Pop', mood: 'Sad' },
  { id: 4, title: 'Industry Baby', artist: 'Lil Nas X', genre: 'Hip-Hop', mood: 'Energetic' },
  { id: 5, title: 'Good 4 U', artist: 'Olivia Rodrigo', genre: 'Pop', mood: 'Sad' },
  { id: 6, title: 'Peaches', artist: 'Justin Bieber', genre: 'R&B', mood: 'Relaxed' },
  { id: 7, title: 'Montero', artist: 'Lil Nas X', genre: 'Hip-Hop', mood: 'Energetic' },
  { id: 8, title: 'Kiss Me More', artist: 'Doja Cat', genre: 'Pop', mood: 'Happy' },
  { id: 9, title: 'Tum Hi Ho', artist: 'Arijit Singh', genre: 'Bollywood', mood: 'Sad' },
  { id: 10, title: 'London Thumakda', artist: 'Neha Kakkar', genre: 'Bollywood', mood: 'Energetic' },
  { id: 11, title: 'Dil Dhadakne Do', artist: 'Priyanka Chopra', genre: 'Bollywood', mood: 'Happy' },
  { id: 12, title: 'Tum Jo Aaye', artist: 'Rahat Fateh Ali Khan', genre: 'Bollywood', mood: 'Romantic' },
  { id: 13, title: 'Gallan Goodiyan', artist: 'Sukhwinder Singh', genre: 'Bollywood', mood: 'Happy' },
  { id: 14, title: 'Channa Mereya', artist: 'Arijit Singh', genre: 'Bollywood', mood: 'Sad' },
  { id: 15, title: 'Agar Tum Saath Ho', artist: 'Alka Yagnik', genre: 'Bollywood', mood: 'Romantic' }
];

function App() {
  const [userMood, setUserMood] = useState('');
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [showSongs, setShowSongs] = useState(false);

  const handleMoodChange = (event) => {
    setUserMood(event.target.value);
  };

  const handleSubmitMood = (event) => {
    event.preventDefault();
    
    // Filter songs based on the selected mood
    if (userMood) {
      const songsByMood = songs.filter((song) => song.mood.toLowerCase() === userMood.toLowerCase());
      setFilteredSongs(songsByMood);
      setShowSongs(true);
    }
  };

  return (
    <div className="app">
      <h1>Song Recommender</h1>
      
      {!showSongs ? (
        <div className="mood-input">
          <form onSubmit={handleSubmitMood}>
            <label htmlFor="mood">Enter Your Mood:</label>
            <input 
              type="text" 
              id="mood" 
              value={userMood} 
              onChange={handleMoodChange} 
              placeholder="Happy, Sad, Energetic, Romantic, Relaxed" 
            />
            <button type="submit">Get Recommendations</button>
          </form>
        </div>
      ) : (
        <div className="song-list">
          {filteredSongs.length > 0 ? (
            filteredSongs.map((song) => (
              <div key={song.id} className="song-item">
                <h3>{song.title}</h3>
                <p>{song.artist}</p>
                <p><strong>Genre:</strong> {song.genre}</p>
                <p><strong>Mood:</strong> {song.mood}</p>
              </div>
            ))
          ) : (
            <p>No songs found for this mood. Please try another mood.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
