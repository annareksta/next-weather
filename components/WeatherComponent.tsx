"use client";

import { useState } from "react";
import ForecastComponent from "@/components/ForecastComponent";
import MapComponent from "@/components/MapComponent";
import styles from "@/styles/WeatherComponent.module.css";

const API_KEY = "C762GHQCU2TWHZFGH5P9ZGA8U"; // 🔥 Вставь API-ключ Visual Crossing

export default function WeatherComponent() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<null | any>(null); // 👈 Исправлено: Теперь по умолчанию `null`
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchWeather(event: React.FormEvent) {
    event.preventDefault();
    if (!city) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${API_KEY}&contentType=json`
      );

      if (!response.ok) {
        throw new Error("Ошибка загрузки данных");
      }

      const data = await response.json();
      setWeather(data); // 👈 Теперь `weather` будет определён
    } catch (err) {
      setError("Не удалось загрузить данные.");
      console.error(err);
    }

    setLoading(false);
  }

  return (
    <div className={styles.weatherContainer}>
      <form onSubmit={fetchWeather} className={styles.searchForm}>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Go!</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}

      {/* 👇 Добавлена проверка `weather !== null`, чтобы не использовать `undefined` */}
      {weather !== null && (
        <div className={styles.weatherResult}>
          <h2>Weather in {weather.address}</h2>
          <p>Temperature: {weather.currentConditions?.temp}°C</p>
          <p>Humidity: {weather.currentConditions?.humidity}%</p>
          <img src={`/icons/${weather.currentConditions?.icon}.png`} alt="Weather icon" width="100" height="100" />
          
          {/* Прогноз на 10 дней */}
          <ForecastComponent forecast={weather.days} />

          {/* Карта */}
          <MapComponent lat={weather.latitude} lon={weather.longitude} />
        </div>
      )}
    </div>
  );
}