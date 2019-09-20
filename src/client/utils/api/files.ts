import axios from "../axios";

export default {
  upload: (file: any) => {
    const formData = new FormData();
    formData.append("file", file);

    return axios.post("/files", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  }
};
