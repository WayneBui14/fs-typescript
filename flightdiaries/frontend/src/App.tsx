import { useState, useEffect } from "react";
import { DiaryEntry } from "./types";
import axios from "axios";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("");
  const [weather, setWeather] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState<string>("");
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

  const diaryCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post<DiaryEntry>(
        "http://localhost:3000/api/diaries",
        { date, visibility, weather, comment },
      );
      setDiaries(diaries.concat(response.data));
      setDate("");
      setVisibility("");
      setWeather("");
      setComment("");
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        let message = "Unknown error";
        if (e.response?.data) {
          // Check if data is string (e.g. general error like 'Incorrect date format')
          if (typeof e.response.data === "string") {
            message = e.response.data;
          }
          // Check if it's a ZodError response: { error: [{ message: '...', path: [...] }, ...] }
          else if (
            e.response.data.error &&
            Array.isArray(e.response.data.error)
          ) {
            message = e.response.data.error
              .map((err: any) => err.message)
              .join(", ");
          }
        }
        setError(message);
        setTimeout(() => {
          setError("");
        }, 10000);
      } else {
        console.error(e);
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <div>
      <h2>Add new flight diary</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
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
    </div>
  );
};

export default App;
