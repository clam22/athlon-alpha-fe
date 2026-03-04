import axios from "axios";
import { toast } from "sonner";
import i18n from "@/config/internationalisation"

const localhost: string = "http://localhost:5000";

const config = {
  baseURL: localhost,
  headers: {
    Accept: "application/json; charset=utf-8",
    "Content-Type": "application/json; charset=utf-8",
  },
  withCredentials: true
};

const baseHttpClient = axios.create(config);

baseHttpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status: number | string = error.response.status;

      switch (status) {
        case 400:
          toast.error(i18n.t("error.bad-request"));
          break;
        case 401:
          toast.error(i18n.t("error.unauthorised"));
          break;
        case 403:
          toast.error(i18n.t("error.forbidden"));
          break;
        case 404:
          toast.error(i18n.t("error.not-found"));
          break;
        case 500:
          toast.error(i18n.t("error.server"));
          break;
        default:
          toast.error(i18n.t("error.unknown"));
      }
    } else if (error.request) {
      console.error();
    } else {
      console.error(i18n.t("error.axios"));
    }
    return Promise.reject(error);
  },
);

export default baseHttpClient;