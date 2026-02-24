import axios from "axios";
import { toast } from "sonner";
import { n } from "./internationalisation";

const localhost: string = "http://localhost:5000";

const config = {
  baseURL: localhost,
  headers: {
    Accept: "application/json; charset=utf-8",
    "Content-Type": "application/json; charset=utf-8",
  },
};

const baseHttpClient = axios.create(config);

baseHttpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status: number | string = error.response.status;

      switch (status) {
        case 400:
          toast.error(n("error.bad-request"), {
            description: JSON.stringify(error),
          });
          break;
        case 401:
          toast.error(n("error.unauthorised"));
          break;
        case 403:
          toast.error(n("error.forbidden"));
          break;
        case 404:
          toast.error(n("error.not-found"));
          break;
        case 500:
          toast.error(n("error.server"));
          break;
        default:
          toast.error(n("error.unknown"));
      }
    } else if (error.request) {
      console.error();
    } else {
      console.error(n("error.axios"));
    }

    return Promise.reject(error);
  },
);

export default baseHttpClient;