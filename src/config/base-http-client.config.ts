import axios from "axios";
import { toast } from "sonner";

const localhost: string = "http://localhost:5000";

const config = {
  baseURL: localhost,
  headers: {
    Accept: "application/json; charset=utf-8",
    "Content-Type": "application/json; charset=utf-8",
  },
  withCredentials: true,
};

const baseHttpClient = axios.create(config);

var apiInitialized: boolean = false;

export const initApi = async () => {
  if (apiInitialized) return;

  try {
    const { data } = await axios.get("/config.json");

    if (!data?.API_URL) {
      throw new Error("Invalid config.json");
    }
    baseHttpClient.defaults.baseURL = data.API_URL;
    toast.success("Successfully fetched environment variables", {
      description: data.API_URL,
    });
  } catch (e) {
    toast.error("Failed to fetch config.json");
    toast.info("Using localhost fallback");
    baseHttpClient.defaults.baseURL = localhost;
  }

  apiInitialized = true;
};

baseHttpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    let message = "Unexpected error occurred";

    const data = error?.response?.data;

    if (data?.detail) {
      message = data.detail;
    } else if (data?.title) {
      message = data.title;
    } else if (error.message) {
      message = error.message;
    }

    return Promise.reject({
      ...error,
      message,
    });
  },
);

export default baseHttpClient;
