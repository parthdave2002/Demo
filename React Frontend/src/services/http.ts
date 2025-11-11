import axios from "axios";
import {toast} from 'react-toastify'
const API_URL = import.meta.env.VITE_API_URL;
const CHAT_API_URL = import.meta.env.VITE_CHAT_API_URL;

const getHeader = () => {
  let user: any = localStorage.getItem("token");  
  return user ? { Authorization: `Bearer ${user}` } : {};
};

const getBaseUrl = (url: string) => {
  if (url.startsWith("chat/") || url.startsWith("/chat/")) {
    return CHAT_API_URL;
  }
  return API_URL;
};


export default class Http {
  static get(url:any, params?:any) {
    return new Promise((resolve, reject) => {
      let headers = getHeader();
      const baseUrl = getBaseUrl(url);
      axios({  
        method: "get",
        url: `${baseUrl}/${url}`,
        headers: headers,
        params: params,
        //withCredentials: true,
        // Include this line
        
      })
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          console.log("error in https  file",error );
          if(error?.status==401){
            localStorage.clear();
            window.location.replace('/')
            toast.error("Token expired")
          }else{
            reject(error);
          }
        });
    });
  }

   static post(url:any, body:any) {
    return new Promise((resolve, reject) => {
      let headers = getHeader();
        const baseUrl = getBaseUrl(url);
      axios({
        method: "post",
        url: `${baseUrl}/${url}`,
        data: body,
        headers: headers,
        //withCredentials: true, // Include this line
      })
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          console.log(error, "error");
          if(error?.status==401){
            localStorage.clear();
            window.location.replace('/')
            toast.error("Token expired")
          }else{
            reject(error);
          }
        });
    });
  }
}