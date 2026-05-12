import { setSession } from "../utils/storage";
import requestFactory from "../services/api/factoryApi";
import { useNavigate } from "react-router-dom";

const useToken = () => {
  const navigate = useNavigate();

  const getToken = async (paramns) => {
    const url = "/GetToken";
    try {
      const response = await requestFactory.post(url, paramns);
      setSession("token_sac", "Bearer " + response.token);
      navigate("/load");
    } catch (error) {
      console.log(error);
    }
  };

  return { getToken };
};
export default useToken;
