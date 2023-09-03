import { useEffect, useState } from "react";
import axios from "axios";
import CreateChart from "./chart";

const url = "https://dull-gold-cockatoo-garb.cyclic.cloud/api/zones";


export const Carbon = ({region}) => {

  const [carbonPrint, setCarbonPrint] = useState();

  const fetchData = async() => {
  
    try {
      // console.log(region);
      const response = await axios.post(url,{
          headers: {
            'Content-Type': 'application/json'
          },
          countryCode: region
        });
  
      const info = JSON.parse(response.request.response);
      setCarbonPrint(info);
      // console.log("1");
    } catch(error) {
      console.log(error.response);
    }
  }

  useEffect( () => {
    fetchData();
  }, [region] );

  
  return(
    <>
      {/* <p>{JSON.stringify(carbonPrint)}</p> */}
      { carbonPrint? <CreateChart info={carbonPrint}/> : null }
    </>
  );
}