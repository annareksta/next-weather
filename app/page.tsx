"use client"; // Клиентский режим, т.к. используем useState, useEffect

import { useState } from "react";
import WeatherComponent from "@/components/WeatherComponent";
import styles from "@/styles/Home.module.css";

export default function Home() {
  return (
    <main className={styles.container}>
      <h1>Weather Forecast</h1>
      <WeatherComponent />
    </main>
  );
}