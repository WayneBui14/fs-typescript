import { useState, useEffect } from "react";
import { DiaryEntry } from "./types";
import axios from "axios";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("");
  const [weather, setWeather] = useState("");
  const [comment, setComment] = useState("");
  useEffect(() => {
    axios
      .get<DiaryEntry[]>("http://localhost:3000/api/diaries")
      .then((response) => {
        setDiaries(response.data);
      })
      .catch((error) => {
        console.error("Error fetching diaries:", error);
      });
  }, []);

  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newDiaryEntry = {
      date,
      visibility,
      weather,
      comment,
    };
    axios
      .post<DiaryEntry>("http://localhost:3000/api/diaries", newDiaryEntry)
      .then((response) => {
        setDiaries(diaries.concat(response.data));
        setDate("");
        setVisibility("");
        setWeather("");
        setComment("");
      })
      .catch((error) => {
        console.error("Error creating diary:", error);
      });
  };

  return (
    <div>
      <h2>Flight Diaries</h2>
      <div>
        {diaries.map((diary) => (
          <div key={diary.id}>
            <h3>{diary.date}</h3>
            <p>visibility: {diary.visibility}</p>
            <p>weather: {diary.weather}</p>
          </div>
        ))}
      </div>
      <h2>Add new flight diary</h2>
      <form onSubmit={diaryCreation}>
        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <br />
        <label>Visibility:</label>
        <input
          type="text"
          value={visibility}
          onChange={(e) => setVisibility(e.target.value)}
        />
        <br />
        <label>Weather:</label>
        <input
          type="text"
          value={weather}
          onChange={(e) => setWeather(e.target.value)}
        />
        <br />
        <label>Comment:</label>
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <br />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default App;
