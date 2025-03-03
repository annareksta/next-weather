"use client";
import { useState } from "react";
import styles from "@/styles/ForecastComponent.module.css";

export default function ForecastComponent({ forecast }) {
  if (!forecast) return null;

  const [selectedDay, setSelectedDay] = useState(null);

  return (
    <div className={styles.forecastContainer}>
      <h3>10-Day Forecast</h3>
      <div className={styles.forecastGrid}>
        {forecast.slice(0, 10).map((day) => (
          <div
            key={day.datetime}
            className={`${styles.forecastCard} ${selectedDay === day ? styles.selected : ""}`}
            onClick={() => setSelectedDay(day)}
          >
            <p>{new Date(day.datetime).toLocaleDateString("en-US", { weekday: 'short', day: 'numeric', month: 'short' })}</p>
            <img src={`/icons/${day.icon}.png`} alt="Weather icon" />
            <p>{day.tempmin}°C / {day.tempmax}°C</p>
          </div>
        ))}
      </div>

      {/* Почасовой прогноз */}
      {selectedDay && (
        <div className={styles.hourlyForecast}>
          <h3>Hourly Forecast for {new Date(selectedDay.datetime).toLocaleDateString()}</h3>
          <div className={styles.hourlyGrid}>
            {selectedDay.hours.map((hour) => (
              <div key={hour.datetimeEpoch} className={styles.hourlyTemp}>
                <p>{new Date(hour.datetimeEpoch * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                <img src={`/icons/${hour.icon}.png`} alt="Weather icon" />
                <p>{(hour.temp).toFixed(1)}°C</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}