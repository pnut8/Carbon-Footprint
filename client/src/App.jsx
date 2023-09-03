import { useState } from "react";
import { Carbon } from "./script";
import Zones from './zones.json';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Unfold from '@mui/icons-material/UnfoldMoreRounded';

function App() {
  let countryLocalStorage = localStorage.getItem("countryLocal")? localStorage.getItem("countryLocal") : "India";
  let zoneLocalStorage = localStorage.getItem("zoneLocal")? localStorage.getItem("zoneLocal") : "IN";
  // console.log(countryLocalStorage);
  // console.log(zoneLocalStorage);

  const [country, setcountry] = useState(countryLocalStorage);
  const [zone, setZone] = useState(zoneLocalStorage);
  const [region, setRegion] = useState(zone);

  // let fosilFuel = useEffect( () => {Carbon}, [region]);
  
  // console.log(fosilFuel);

  function hideElements() {
    let x = document.getElementById("form-div");
    if ((x.style.display === "none") || (x.style.display === "")) {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  } 

  function handleZone(e) {
    setZone(e.target.value);
    localStorage.setItem("zoneLocal", e.target.value);
    // console.log(zone);
  }

  function handleCountry(e) {
    setcountry(e.target.value);
    setZone(Zones[e.target.value][0].zon);
    localStorage.setItem("countryLocal", e.target.value);
    localStorage.setItem("zoneLocal", Zones[e.target.value][0].zon);
    // console.log(e.target.value);
  }
  // console.log(zone);

  function handleSubmit(e) {
    e.preventDefault();
    setRegion(zone);
    // console.log(zone);
    
  }

  return (
    <>
    <div className="card">
    <div className="card-p">
    <p>{country}, {region}</p>
    </div>
    { region? <Carbon region={region}/> : null}
    </div>
    <IconButton sx={{marginLeft: 35 }} color="secondary" onClick={hideElements}>
      <Unfold/>
    </IconButton>
    <div id="form-div">
    <Box sx={{ minWidth: 230, maxWidth: 100 }} id="form-element" className="form-div">
    <FormControl fullWidth sx={{marginBottom: 2}}>
    <InputLabel id="demo-simple-select-label">Country</InputLabel>
          <Select 
          value={country} 
          onChange={handleCountry}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Country"
          MenuProps={{ PaperProps: { sx: { maxHeight: 350 }}}}
          >
            {Object.keys(Zones).map((item) => {
              return (
              <MenuItem key={item} value={item}>{ item }</MenuItem>
              );
            })}

          </Select>
          </FormControl>
          <FormControl fullWidth sx={{marginBottom: 2}}>
          <InputLabel id="demo-simple-select-label">Zone</InputLabel>
          <Select 
          value={zone} 
          onChange={handleZone} 
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Zone"
          MenuProps={{ PaperProps: { sx: { maxHeight: 350 }}}}
          >

            { Zones[country].map((item) => {
              return (
                <MenuItem  key={item.zon} value={item.zon}>{ item.zoneName }</MenuItem>
              );
            }) }
          </Select>
        <Button sx={{marginTop: 3}} variant="contained" onClick={handleSubmit} className="btn">Set Region</Button>
    </FormControl>
    </Box>
    </div>
  </>
  );
}

export default App
