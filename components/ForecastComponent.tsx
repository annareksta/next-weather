import { useState } from "react";
import styles from "@/styles/ForecastComponent.module.css";

// Типизация структуры одного дня прогноза
type ForecastDay = {
  datetime: string;
  icon: string;
  tempmin: number;
  tempmax: number;
};

// Типизация массива дней прогноза
interface ForecastProps {
  forecast: ForecastDay[];
}

export default function ForecastComponent({ forecast }: ForecastProps) { 
  const [selectedDay, setSelectedDay] = useState<ForecastDay | null>(null);

  if (!forecast || forecast.length === 0) return <p>No forecast available</p>;

  return (
    <div>
      {forecast.map((day, index) => (
        <div key={index} className={styles.forecastCard}>
          <p>{day.datetime}</p>
          <img src={`/icons/${day.icon}.png`} alt={day.icon} />
          <p>{day.tempmin}°C / {day.tempmax}°C</p>
        </div>
      ))}
    </div>
  );
}
