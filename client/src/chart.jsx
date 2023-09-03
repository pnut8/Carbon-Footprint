import { Chart as ChartJS, ArcElement } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement);


function CreateChart({info}){

    const carbonIntensity = info? info.carbonIntensity : null;
    const carbon = info? info.fossilFuelPercentage : null;
    const renewable = carbon? 100 - carbon : null;

    // console.log(carbonIntensity, carbon, renewable);
    let newColor;
    const clr = document.querySelector(':root');

    switch(true) {
      case carbonIntensity < 100:
        newColor = "#4eaf60";
        break;
      case carbonIntensity < 150:
        newColor = "#a0ca56";
        break;
      case carbonIntensity < 300:
        newColor = "#ddbb43";
        break;
      case carbonIntensity < 400:
        newColor = "#cb983b";
        break;
      case carbonIntensity < 500:
        newColor = "#b67233";
        break;
      case carbonIntensity < 600:
        newColor = "#944c25";
        break;
      case carbonIntensity < 700:
        newColor = "#743319";
        break;
      case carbonIntensity < 800:
        newColor = "#51260c";
        break;
      case carbonIntensity < 900:
        newColor = "#381d02";
        break;
      case carbonIntensity < 1000:
        newColor = "#371c02";
        break;
      case carbonIntensity < 1200:
        newColor = "#1e1001";
        break;   
    }

    clr.style.setProperty('--newColor', newColor); 

    const data = {
        labels: ['Fossil Fuel', ''],
        datasets: [
          {
            label: '',
            data: [carbon, renewable],
            backgroundColor: [
              'rgba(132,201,230,255)',
              'rgba(237,237,237,255)',
            ],
            borderWidth: 1,
          },
        ],
      };

      const data2 = {
        labels: ['', 'Renewable'],
        datasets: [
          {
            label: '',
            data: [renewable, carbon],
            backgroundColor: [
              'rgba(132,201,230,255)',
              'rgba(237,237,237,255)',
            ],
            borderWidth: 1,
          },
        ],
      };

    return (
        <>
            <div className="box">
            <div id="square-box">
            <p>{carbonIntensity}g</p>
            </div>
            <p className="catagory">carbon</p>
            <p className="catagory2">Intensity</p>
            </div>
            <div className="chart">
            { info? <Doughnut data={data} options={{cutout: 28}}/> : null }
            <p className="fuel-percentage">{Math.round(carbon)}%</p>
            <p className="catagory">Fossil Fuel</p>
            </div>
            <div className="chart">
            { info? <Doughnut data={data2} options={{cutout: 28}} /> : null }
            <p className="fuel-percentage">{Math.round(renewable)}%</p>
            <p className="catagory">Renewable</p>
            </div>
        </>
    );
}

export default CreateChart;

