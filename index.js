// initialise variables
var FirstOption, SecondOption, type, wind_directionData, title, url, temperature, MeasurementValue;
var Isclicked = false;

// Function to fetch data
async function fetchData(url){
  const response = await fetch(url);
  const data = await response.json();
  return data
}

// Hide the Chart on the home page
document.getElementById("myChart").style.display = "none";

// when the "Last 30 Measurements" button is clicked, change the variable Isclicked to true

document.getElementById('clicked').addEventListener("click", function() {
   Isclicked = true
});

//Toggle between  showing and hiding the menu of Wind direction button
function ShowHideDirection(){
  let WindDirectionList = document.getElementById("wind_directionList")
    if (WindDirectionList.style.display == 'none' || WindDirectionList.style.display == '') {
      WindDirectionList.style.display = 'block';
    } else {
      WindDirectionList.style.display = 'none';
    }
  }

//Toggle between  showing and hiding the menu of Wind speed button

function ShowHideSpeed(){
  let WindSpeedList = document.getElementById("wind_speedList")
  if (WindSpeedList.style.display === "none" || WindSpeedList.style.display == '') {
    WindSpeedList.style.display = "block";
  } else {
    WindSpeedList.style.display = "none";
    }
  }

//Toggle between  showing and hiding the menu of other measurements button

function ShowHideOtherMeasurements(){
  let OtherMeasurementsList = document.getElementById("OtherMeasurements_List")
  if (OtherMeasurementsList.style.display === "none" || OtherMeasurementsList.style.display == '') {
    OtherMeasurementsList.style.display = "block";
  } else {
    OtherMeasurementsList.style.display = "none";
  }
}


//Function to hide chart and the table.  (Show only about div)
function About(){
  document.getElementById("table").style.display = "none";
  document.getElementById("about").style.display = "block";
  document.getElementById("header").textContent = "About";
  document.getElementById("myChart").style.display = "none";
}

//Function fetch data and display it in table


function Last30measurements(){
  // Change the heading of the page to Last 30 Measurements
  document.getElementById("header").innerHTML = "Last 30 Measurements";

  // Hide the chart and About section
  document.getElementById("myChart").style.display = "none";
  document.getElementById("table").style.display = "table";
  document.getElementById("about").style.display = "none";

  // Fetch data
  var i = 1;
  var c = 0;
    fetchData("https://webapi19sa-1.course.tamk.cloud/v1/weather").then(data =>{

      // Save the data of the "date_time" in an array
      const times = data.map(
       function(index){
         return index.date_time
     })

     // Save the data of the measurement type and its value in an object

     const WeatherData = data.map(
      function(index){
        return index.data
    })
      var temp="";

      // Slice the date_time into two differents variable, one for time and one for date
      var date = times.map(v => v.slice(0, 10))
      var hours = times.map(v => v.slice(11, 19))

      // slice the data to 30 only and use foreach method to  Iterate  through the data

       data.slice(0,30).forEach(()=>{

        // empty the table to avoid overlapping the data
        document.getElementById('TableBody').innerHTML = "";
        // insert the data inside the table
        temp += "<tr>";
        temp += "<td>" + i + "</td>";
        temp += "<td>" + date[c] + "</td>";
        temp += "<td>" + hours[c] + "</td>";
        //Since the object I fetched keeps changing
        //rather to use object.keys to get the value of the object key and value
        temp += "<td>" + Object.keys(WeatherData[c])+ "</td>";
        temp += "<td>" + Object.values(WeatherData[c]) + "</td>";
        temp += "</tr>";
        c = c + 1;
        i = i + 1;
      })

      // save the data in the table
      document.getElementById('TableBody').innerHTML += temp;
    })
  }

  // Call Function Last30measurements to display the data on the home page
  Last30measurements()


// Fetch data, save it and  display it in tabular and chart

document.querySelectorAll('.onclick').forEach(function(el){
  el.addEventListener('click', function() {

    //  Hide the "About" section and display the table
    document.getElementById("about").style.display = "none";
    document.getElementById("table").style.display = "table";

    //Detect if the Submit button is clicked
    if(Isclicked){

      //Get the value of the first option
      FirstOption = document.getElementById('OtherMeasuremnts').value;

      //Get the value of the second option

      SecondOption = document.getElementById('OtherMeasuremntsTime').value;

      //Save the values inside the url
      url = 'https://webapi19sa-1.course.tamk.cloud/v1/weather/'+FirstOption+SecondOption

      title = FirstOption
      Type = FirstOption

      // Change the heading
      document.getElementById("header").textContent = "Latest Measuremnts of " + FirstOption

      //Reset the button to false to detect new clicks
      Isclicked = false
    }else{

      //Otherwise if the submit button is not clicked, fetch other data
      url = 'https://webapi19sa-1.course.tamk.cloud/v1/weather/'+this.getAttribute('data-value')
      title = this.getAttribute('value')
      Type = this.getAttribute('data-value')

      // Change the heading

      document.getElementById("header").textContent = this.getAttribute('value')
    }

    // Display the chart
    document.getElementById("myChart").style.display = "block";

    // Fetch data with the url
          fetchData(url).then(data => {

    // Iterate over the data and return specific requested data
             const wind_directionData = data.map(
              function(index){
                return index.wind_direction
            })
            const wind_speedData = data.map(
              function(index){
              return index.wind_speed
            })
            const temperature = data.map(
              function(index){
              return index.temperature
            })
            const rain = data.map(
              function(index){
              return index.rain
            })
            const light = data.map(
              function(index){
              return index.light
            })
            const humidity_in = data.map(
              function(index){
              return index.humidity_in
            })
            const humidity_out = data.map(
              function(index){
              return index.humidity_out
            })
              var Time = data.map(
                function(index){
                return index.date_time
              })

              var temp = "";
              var c = 0;
              var i = 1;

      // Switch statement to detect what Measuremnt type to show
              switch(true){
                case title.includes('Direction'):
                MeasurementValue = wind_directionData
                break;
                case title.includes('Speed'):
                MeasurementValue = wind_speedData
                break;
                case title.includes('Speed'):
                MeasurementValue = wind_speedData
                break;
                case title.includes('temperature'):
                MeasurementValue = temperature
                break;
                case title.includes('rain'):
                MeasurementValue = rain
                break;
                case title.includes('light'):
                MeasurementValue = light
                break;
                case title.includes('humidity_in'):
                MeasurementValue = humidity_in
                break;
                case title.includes('humidity_out'):
                MeasurementValue = humidity_out
                break;
              }

              let length = Type.indexOf("/")
              var date = Time.map(v => v.slice(0, 10))
              var hours = Time.map(v => v.slice(11, 19))

              // Iterate  through the data
              data.forEach(()=>{

              // Clear the table to avoid overlapping
                document.getElementById('TableBody').innerHTML = "";

              // Save the data in table
                temp += "<tr>";
                temp += "<td>" + i + "</td>";
                temp += "<td>" + date[c] + "</td>";
                temp += "<td>" + hours[c] + "</td>";
                if(Type.includes("/")){
                  temp += "<td>" + Type.slice(0, length)+ "</td>";
                }else{
                  temp += "<td>" + Type+ "</td>";
                }
                temp += "<td>" + MeasurementValue[c] + "</td>";
                temp += "</tr>";
                c = c + 1;
                i = i + 1;
              })
              document.getElementById('TableBody').innerHTML += temp;

              // Assign new values to  the Horizontal  axis
              myChart.config.data.labels = Time;

              // Assign new values to  Vertical axis
              myChart.config.data.datasets[0].data = MeasurementValue;

              // Assign new values to the title of the chart 

              myChart.config.data.datasets[0].label = title;

              myChart.update();

        })
      })
    })
const data = {
      labels: [],
      datasets: [{
        label: "Weather Data",
        data: [18, 12, 6, 9, 12, 3, 9],
        backgroundColor: [
          'rgb(47,139,191)',
        ],
        borderColor: [
          'rgb(47,139,191)'
        ],
        borderWidth: 1
      }]
    };

    const config = {
          type: 'line',
          data,
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        };


    // render init block
    const myChart = new Chart(
      document.getElementById('myChart'),
      config
    );
