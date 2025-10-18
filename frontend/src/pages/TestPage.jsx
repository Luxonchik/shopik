import { useEffect } from "react";
import { axiosInstance } from "../lib/axios";

function TestPage() {
  useEffect(() => {
    const testRequest = async () => {
      try {
        const response = await axiosInstance.get("/auth/check", {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyMTIzIiwiaWF0IjoxNzYwNTY5MzA0LCJleHAiOjE3NjA2NTU3MDR9.9lsqQiKIqlt_BJp4DfMlWQ2iLzR800zGtTcAiskIdsY",
          },
        });
        console.log("Test request successful:", response.data);
      } catch (error) {
        console.error("Test request failed:", error);
      }
    };

    testRequest();
  }, []);

  return <div>Testing Axios Requests...</div>;
}

export default TestPage;
