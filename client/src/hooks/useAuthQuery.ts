import axios, { type AxiosResponse } from "axios";

interface AuthRequestData {
  email: string;
  password: string;
}

interface SuccessAuthResponse {
  userId: number;
  token: string;
}
interface BadAuthResponse {}

const useAuthQuery = async (
  shortUrlPath: string,
  requestData: AuthRequestData
): Promise<AxiosResponse<SuccessAuthResponse, BadAuthResponse>> => {
  try {
    const response = await axios
      .post(shortUrlPath, requestData)
      .then((response) => response)
      .catch((err) => err);
    console.log(response);

    return response;
  } catch (err) {
    console.log("@useAxiosQuery error", err);
    throw new Error("@useAxiosQuery error - catch");
  }
};

export default useAuthQuery;
