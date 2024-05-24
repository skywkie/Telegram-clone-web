import { useAppSelector } from "./useAppSelector";

function useAuth() {
  const { email, id, token } = useAppSelector((state) => state.user);
}

export default useAuth;
