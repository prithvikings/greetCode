import axios from "axios";
import {ENV} from "../config/env.JS"


export const getLanguageId = (Language) => {
  const languageMap = {
    "c++": 54,
    "java": 62,
    "python": 71,
    "javascript": 63,
  };
  return languageMap[Language.toLowerCase()] || null;
};



export const submitbatch = async (submissions) => {
  try {
    const options = {
      method: "POST",
      url: ENV.rapidapi_url,
      params: {
        base64_encoded: "true",
        wait: "false",
        fields: "*",
      },
      headers: {
        "x-rapidapi-key": ENV.rapidapi_key,
        "x-rapidapi-host": ENV.rapidapi_host,
        "Content-Type": "application/json",
      },
      data:submissions
    };

    async function fetchData() {
      try {
        const response = await axios.request(options);
        return response.data;
      } catch (error) {
        console.error(error);
      }
    }

   return  await fetchData();


  } catch (error) {
    console.error("Error submitting batch:", error);
  }
};
