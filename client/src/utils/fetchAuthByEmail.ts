import axios from "axios";

interface UserFetchData {
  email: string;
  password: string;
}

interface SuccessUserResponse {
  userId: number;
  token: string;
  ok: true;
}
interface BadUserResponse {
  ok: false;
}

export default async function fetchAuthByEmail(
  url: string,
  UserData: UserFetchData
): Promise<SuccessUserResponse | BadUserResponse> {
  try {
    const responseData = await axios
      .post(url, UserData)
      .then((response) => {
        const responseData: SuccessUserResponse = { ...response.data, ok: true };
        return responseData;
      })
      .catch((err) => {
        console.log("@fetchAuthByEmail axios", err);
        const responseData: BadUserResponse = { ok: false };
        return responseData;
      });

    return responseData;
  } catch (err) {
    const responseData: BadUserResponse = { ok: false };
    return responseData;
  }
}
