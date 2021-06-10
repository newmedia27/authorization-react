import React, { useEffect } from "react";
import axios from "axios";

const Home = () => {
  useEffect(() => {
    async function getCategories() {
      try {
        const response = await axios.get(`http://localhost:1337/categories`, {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjIzMzIwMTM3LCJleHAiOjE2MjU5MTIxMzd9.3GHB5VtId5r9fTr5AMiafok5rfH4v7h4UVL2H1YoSRs",
          },
        });
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    }
    getCategories();
  }, []);
  return <div>HOME!</div>;
};

export default Home;
