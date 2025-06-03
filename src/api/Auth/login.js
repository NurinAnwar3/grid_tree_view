import axios from "axios";
import ErrorAlert from "helper/errorAlert";
import SuccessAlert from "helper/successAlert";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const auth = async (params) => {
  try {
    const result = await axios.post(`${process.env.REACT_APP_BASE_URL}/user/login`, params);
    localStorage.setItem("token", result?.data?.token);
    localStorage.setItem("loggedInID", result?.data?.id);
    localStorage.setItem("companyId", result?.data?.lastcompany || 1);
    localStorage.setItem("loggedInUsername", result?.data?.userName || "");
    localStorage.setItem("roleId", result?.data?.roleid || "");
    localStorage.setItem("activeTab", "0")


    // SuccessAlert(result, "User Authorized")
    return result; // Return the response if needed
  } catch (error) {
    ErrorAlert(error)
    return error;
  }
};



