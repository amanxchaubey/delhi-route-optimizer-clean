import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : "https://delhi-route-optimizer-clean.onrender.com/api";

// ================= METRO APIs =================

export const getMetroStations = () => axios.get(`${BASE_URL}/stations`);

export const getMetroLines = () => axios.get(`${BASE_URL}/lines`);

export const getMetroRoute = (fromId, toId) =>
  axios.get(`${BASE_URL}/route?from=${fromId}&to=${toId}`);