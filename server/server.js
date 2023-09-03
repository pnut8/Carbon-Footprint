import axios from "axios";
import express from "express";

const app = express();
app.use(express.urlencoded({extended: true}))
// // app.use(express.static("public"));
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
//   next();
// });

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.json());

const url = "https://api.co2signal.com/v1/latest";
const key = process.env.KEY;

console.log(url, key);

app.post("/api/zones", (req, res) => {
  const region = req.body.countryCode; 
  fetchData(region).then((response) => {
    res.status(201).send(response);
  });
  
});


const fetchData = async(region) => {
  try {
    const res = await axios(url, {
      params: {
        countryCode: region,
      },
      headers: {
        'auth-token': key,
      },
    })
      const data = res.data.data;
      return data;
    
  } catch(error) {
    console.log(error);
  }
}

app.listen(3000, function(){
  console.log("server is running on port 3000");
});

