import http from "../services/httpService";

const apiEndpoint = "/genres";

export function getGenres() {
  return http.get(apiEndpoint);
}
