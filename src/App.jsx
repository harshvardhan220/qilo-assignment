import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import "./App.css";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const App = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [weatherData, setWeatherData] = useState({
    avgTemp: 20,
    avgRainfall: 15,
    avgHumidity: 65,
    currentTemp: 22,
  });

  useEffect(() => {
    // Use dummy data
    const dummyWeatherData = {
      daily: [
        { temp: { day: 22 }, rain: 5, humidity: 60 },
        { temp: { day: 24 }, rain: 0, humidity: 65 },
        { temp: { day: 20 }, rain: 10, humidity: 70 },
        { temp: { day: 18 }, rain: 5, humidity: 60 },
        { temp: { day: 21 }, rain: 5, humidity: 55 },
        { temp: { day: 19 }, rain: 20, humidity: 75 },
        { temp: { day: 23 }, rain: 10, humidity: 80 },
      ],
      current: { temp: 22 },
    };

    setWeatherData({
      avgTemp: calculateAvgTemp(dummyWeatherData.daily),
      avgRainfall: calculateAvgRainfall(dummyWeatherData.daily),
      avgHumidity: calculateAvgHumidity(dummyWeatherData.daily),
      currentTemp: dummyWeatherData.current.temp,
    });
  }, []);

  const calculateAvgTemp = (daily) => {
    const total = daily.reduce((acc, day) => acc + day.temp.day, 0);
    return (total / daily.length).toFixed(2);
  };

  const calculateAvgRainfall = (daily) => {
    const total = daily.reduce((acc, day) => acc + (day.rain || 0), 0);
    return (total / daily.length).toFixed(2);
  };

  const calculateAvgHumidity = (daily) => {
    const total = daily.reduce((acc, day) => acc + day.humidity, 0);
    return (total / daily.length).toFixed(2);
  };

  const handleAddItem = () => {
    if (newItem.trim()) {
      setItems([...items, newItem]);
      setNewItem("");
    }
  };

  const handleDeleteItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const data = {
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    datasets: [
      {
        label: "Average Temperature",
        data: [22, 24, 20, 18, 21, 19, 23],
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
      <div className="app-container">
        <header>
          <h1> Name: Kunal Sonawane</h1>
          <p>Email ID : </p>
          <p>Phone Number: </p>
        </header>
        <div className="list-container">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Add new item"
          />
          <button onClick={handleAddItem}>Add Item</button>
          <ul>
            {items.map((item, index) => (
              <li key={index}>
                {item}
                <button onClick={() => handleDeleteItem(index)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="cards-container">
          <div className="card">Avg Temp of Week: {weatherData.avgTemp}°C</div>
          <div className="card">
            Avg Rainfall of Week: {weatherData.avgRainfall}mm
          </div>
          <div className="card">
            Avg Humidity of Week: {weatherData.avgHumidity}%
          </div>
          <div className="card">Current Temp: {weatherData.currentTemp}°C</div>
        </div>
        <div className="chart-container" style={{height: '40%', width:'50%'}}>
          <Bar data={data} height={260} width={760} options={options} />
        </div>
      </div>
  );
};

export default App;
