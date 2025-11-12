import axios from "axios";
import { ENV } from "../config/env.js";

export const getLanguageId = (Language) => {
  const languageMap = {
    "c++": 54,
    java: 62,
    python: 71,
    javascript: 63,
  };
  return languageMap[Language.toLowerCase()] || null;
};

export const submitbatch = async (submissions) => {
  try {
    const options = {
      method: "POST",
      url: ENV.rapidapi_url,
      params: {
        base64_encoded: "false",
        wait: "false",
        fields: "*",
      },
      headers: {
        "x-rapidapi-key": ENV.rapidapi_key,
        "x-rapidapi-host": ENV.rapidapi_host,
        "Content-Type": "application/json",
      },
      data: { submissions },
    };

    async function fetchData() {
      try {
        const response = await axios.request(options);
        return response.data;
      } catch (error) {
        console.error(error);
      }
    }

    return await fetchData();
  } catch (error) {
    console.error("Error submitting batch:", error);
  }
};

const waiting = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


export const submittoken = async (tokens) => {
  try {
    const options = {
      method: "GET",
      url: ENV.rapidapi_submission_token_url,
      params: {
        tokens: tokens.join(","), //since tokens is an array we need to join it with comma to send it as a string
        base64_encoded: "false",
        fields: "*",
      },
      headers: {
        "x-rapidapi-key": ENV.rapidapi_key,
        "x-rapidapi-host": ENV.rapidapi_host,
      },
    };

    async function fetchData() {
      try {
        const response = await axios.request(options);
        // console.log(response.data);
        return response.data;
      } catch (error) {
        console.error(error);
      }
    }
      while (true) {
        const result= await fetchData();
        const isResultObtained=result.submissions.every((r)=>r.status_id>2); // checking if all submissions have status_id greater than 2 (2 means in queue or processing)
        if(isResultObtained){
          return result.submissions;
        }
        await waiting(2000); // wait for 2 seconds before checking again
      }
      

  } catch (error) {
    console.error("Error fetching submission results:", error);
  }
};
