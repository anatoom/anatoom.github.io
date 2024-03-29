

/*var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();*/ // Siin saab kuvada praegust kellaaega

var today = new Date();
var timeNow = today.getHours()/* + ":" + today.getMinutes() + ":" + today.getSeconds()*/;








//console.log(timeNow);


//console.log(date);

// set the dimensions and margins of the graph
var margin = {top: 25, right: 150, bottom: 30, left: 30},
    width = 625 - margin.left - margin.right,
    height = 233 - margin.top - margin.bottom;


// Drawchart

drawChart();

function drawChart() {





// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
  .attr("viewBox", `0 0 499 333`)
  .style("background-color", "#E8EBED");
    /*.attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)*/

// Sisesta tekstid graafiku ette

svg.append("text")
.attr("class", "pk")
.attr("x", 17)
.attr("y", 34)
.text("Elektri hind");

// Date ja time 

svg.append("text")
.attr("id", "dateDisplay")
.attr("class", "tekst")
.attr("x", 21)
.attr("y", 60);

svg.append("text")
.attr("id", "timeDisplay")
.attr("class", "tekst")
.attr("x", 95)
.attr("y", 60);



refreshTime();
function refreshTime() {
var dateString = new Date();
var dateTick = dateString.getDate() + "." + (dateString.getMonth()<10?'0':'') + (dateString.getMonth()+1); 
var timeTick = dateString.getHours()+ "." + (dateString.getMinutes()<10?'0':'') + dateString.getMinutes();



var timeDisplay = document.getElementById("timeDisplay");
var dateDisplay = document.getElementById("dateDisplay");


timeDisplay.innerHTML = "Kell: " + timeTick;
 dateDisplay.innerHTML = dateTick;

}

setInterval(refreshTime, 1000);


// Muu tekst

svg.append("text")
.attr("class", "tekst_ita")
.attr("x", 15)
.attr("y", 83)
.text("Hind sisaldab käibemaksu.");

// Hindade display intros

svg.append("text")
.attr("id", "maxHind")
.attr("class", "maxHindClass")
.attr("x", 225)
.attr("y", 45);

svg.append("text")
.attr("id", "minHind")
.attr("class", "minHindClass")
.attr("x", 425)
.attr("y", 45);

svg.append("text")
.attr("id", "nowHind")
.attr("class", "nowHindClass")
.attr("x", 312)
.attr("y", 50);

svg.append("text")
.attr("class", "tekstSmall")
.attr("x", 225)
.attr("y", 25)
.text("max");

svg.append("text")
.attr("class", "tekstSmall")
.attr("x", 312)
.attr("y", 25)
.text("hetkel");

svg.append("text")
.attr("class", "tekstSmall")
.attr("x", 425)
.attr("y", 25)
.text("min");

svg.append("text")
.attr("class", "tekstSmall")
.attr("x", 225)
.attr("y", 60)
.text("senti/kWh");

/*
svg.append("text")
.attr("class", "tekstSmall")
.attr("x", 280)
.attr("y", 120)
.text("senti/kWh");

svg.append("text")
.attr("class", "tekstSmall")
.attr("x", 280)
.attr("y", 50)
.text("senti/kWh");*/

// Legend

svg.append("text")
.attr("class", "tekstSmall")
.attr("x", 15)
.attr("y", 123)
.text("Täna");

svg.append("line")
.style("stroke", "#55ABC0")
.style("stroke-width", 2)
.attr("x1", 55)
.attr("x2", 75)
.attr("y1", 120)
.attr("y2", 120);

svg.append("circle")
.attr("cx", 65)
.attr("cy", 120)
.attr("r", 4)
.attr("fill", "#55ABC0");


svg.append("line")
.style("stroke", "#55ABC0")
.style("stroke-width", 2)
.style("opacity", 0.5)
.attr("x1", 135)
.attr("x2", 155)
.attr("y1", 120)
.attr("y2", 120);

svg.append("text")
.attr("class", "tekstSmall")
.attr("x", 100)
.attr("y", 123)
.text("Eile");


// Kirjuta chart

var innerSVG = svg.append("svg")
.attr("class", "chart")
.attr("width", 499)
.attr("height", 333)
.style("overflow", "visible")
.attr("x", 30)
.attr("y", 130);

  
innerSVG.append("g")
   .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");
        
          var bisectDate = d3.bisector(function(d) { return d.time; }).left 

          const formatTime = d3.timeFormat("%H");
          
          const displayTime = d3.timeFormat("%H:%M");
//console.log("chart drawn");





//Read the data
d3.csv("data/elektrihind_1.csv",
  // When reading the csv, I must format variables:
  function(d){
    return { time : d3.timeParse("%H:%M:%S")(d.time), value : d.value, value2 : d.value2  }
   
},
 

 
  // Now I can use this dataset:
  function(data) {
    //console.log(data) 
// Filtreerib välja praeguse elektrihinna tunni järgi
data.forEach(function(d) {
    d.date = formatTime(d.time);
    d.value = +d.value;
    d.value2 = +d.value2;
    if (d.date == timeNow) { 
    

   // LISA PÄRAST !!!
   var nowHind = d.value;
   var nowHindDisplay = document.getElementById("nowHind");


   nowHindDisplay.innerHTML = nowHind; 
       

    };
   
});



// Maksimaalne hind ja minimaalne hind

var maxHind = d3.max(data, function(d) { return Math.max(d.value); });
var minHind = d3.min(data, function(d) { return Math.min(d.value); });
var keskHind = d3.median(data, function(d) { return (d.value); });
//console.log(keskHind);


 //!!!! LISA PÄRAST 
var maxHindDisplay = document.getElementById("maxHind");
var minHindDisplay = document.getElementById("minHind");

minHindDisplay.innerHTML = minHind;
maxHindDisplay.innerHTML = maxHind;




    // Add X axis --> it is a date format
    var x = d3.scaleTime()
      .domain(d3.extent(data, function(d) { return d.time; }))
      .range([ 0, width ]);
    
      var xAxis = d3.axisBottom(x)
      
  
            
    
    
      innerSVG.append("g")
      .attr("transform", "translate(0," + height + ")")
     /*.call(xAxis .tickValues(data.map(function(d){return d.time}))
                .tickFormat(d3.timeFormat("%H")));*/
                .call(xAxis.tickFormat(d3.timeFormat("%H"))
                //.tickValues(data.map(function(d){return d.time}))
              .ticks(8));
      
     d3.select(".domain").attr("stroke", "none");
     innerSVG.selectAll("g").selectAll(".tick").selectAll("line").remove(); // Change time format as m/d

     innerSVG.selectAll("g").selectAll(".tick")
     .style("font-size", "14px");
  
 // console.log(data);
  
  // set the ranges



// define the 1st line
var valueline = d3.line()
    .x(function(d) { return x(d.time); })
    .y(function(d) { return y(d.value); });


// define the 2nd line
var valueline2 = d3.line()
    .x(function(d) { return x(d.time); })
    .y(function(d) { return y(d.value2); });  
  




   // Add Y axis
    var y = d3.scaleLinear()
      .domain([d3.min(data, function(d) {
        return Math.min(d.value, d.value2) - 50; }), d3.max(data, function(d) {
        return Math.max(d.value, d.value2); })])
      .range([ height, 0 ]);
 
 
// Joonista keskmise hinna joon
 
var line = innerSVG.append("g");
line.append("line")
      //.data(data)
      //.enter()
.attr("class", "y0")
.style("stroke", "gray")
.style("stroke-width", 1)
.style("stroke-dasharray", 5)
    .attr("opacity", 0.5)
//.attr("x1", 0)
.attr("x2", width)
.attr("y1",  function(d) { return y(keskHind) } )
.attr("y2",  function(d) { return y(keskHind) } )
   
 line.append("text")
 .attr('id', "myLabel")
 .style("fill", "gray")
      .attr("opacity", 0.5)
      .attr('text-anchor', 'start')
      .attr("x", 0)
      .attr("y", function(d) { return y(keskHind) - 10 } )
      .text('päeva keskmine (kWh)')


 /*svg.append("g")
      .call(d3.axisLeft(y));*/
    
      
  
    // Add the line
    innerSVG.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#55ABC0")
      .attr("stroke-width", 1.5)
      .attr("d", valueline)

        
    // Add the line 2
    innerSVG.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("opacity", 0.5)
    .attr("stroke", "#55ABC0")
    .attr("stroke-width", 1.5)
    .attr("d", valueline2)


// Add the points
innerSVG
      .append("g")
      .selectAll("dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", function(d) {
           if (formatTime(d.time) == timeNow) {return "dotNow"}
           
           
           })
        .attr("cx", function(d) { return x(d.time) } )
        .attr("cy", function(d) { return y(d.value) } )
        .attr("r", 5)
        .attr("fill", function(d) {
           if (formatTime(d.time) == timeNow) {return "#F57043"
           
           
           } // Siia lisada optsioon kuvada praegust kellaaega

           // if (d.value == d3.max(data, function(d) { return d.value; })) {return "red"}
            else 	{ return "#55ABC0"}
        ;})
      
 
  function circleTransition() {
  var timeCircle = innerSVG.select(".dotNow")
  repeat();


  function repeat() {
    timeCircle
       .attr("r", 5)
        //.attr("opacity", 1)  
     .transition() // apply a transition
      .duration(500) // apply it over 2000 milliseconds
 .attr("r", 10)
 //.attr("opacity", 0.5)      
 .transition() // apply a transition
      .duration(500) // apply it over 2000 milliseconds
    .attr("r", 5)
           // .attr("opacity", 1)  
     .transition() // apply a transition
      .duration(5000) // apply it over 2000 milliseconds
       .on("end", function() {
        repeat();
      });
  };

};

circleTransition();

    
        
        
     

// Add the points 2
  /*  svg
      .append("g")
      .selectAll("dot")
      .data(data)
      .enter()
      .append("circle")
        .attr("cx", function(d) { return x(d.time) } )
        .attr("cy", function(d) { return y(d.value2) } )
        .attr("r", 5)
        .attr("fill", "#69b3a2")
        .attr("opacity", 0.2)*/
       


      

var focus = innerSVG.append("g")
.attr("class", "focus")
.style("display", "none");

focus.append("circle")
.attr("r", 5);

focus.append("rect")
.attr("class", "tooltip")
.attr("width", 110)
.attr("height", 50)
.attr("x", 10)
.attr("y", -22)
.attr("rx", 4)
.attr("ry", 4);


focus.append("text")
.attr("class", "tooltip-date")
.attr("x", 18)
.attr("y", -2);

focus.append("text")
.attr("class", "tooltip-hind")
.attr("x", 18)
.attr("y", 18)
.text("Hind:");

focus.append("text")
.attr("class", "tooltip-value")
.attr("x", 60)
.attr("y", 18);

innerSVG.append("rect")
.attr("class", "overlay")
.attr("width", width)
.attr("height", height)
.on("mouseover", function() { focus.style("display", null); })
.on("mouseout", function() { focus.style("display", "none"); })
.on("mousemove", mousemove);

function mousemove() {
var x0 = x.invert(d3.mouse(this)[0]),
    i = bisectDate(data, x0, 1),
    d0 = data[i - 1],
    d1 = data[i]
    if (typeof d0 !== 'undefined' && typeof d1 !== 'undefined') d = x0 - d0.time > d1.time - x0 ? d1 : d0;
focus.attr("transform", "translate(" + x(d.time) + "," + y(d.value) + ")");
focus.select(".tooltip-date").text(displayTime(d.time));
focus.select(".tooltip-value").text((d.value));


var text = [];
document.querySelectorAll(".tooltip-date").forEach(function(e){
    text.push(e.textContent);
   // console.log(text);
   
   focus.select(".tooltip-date").text(function(d) {
    if (text == "00:00") {return "00:00 - 01:00"} 
    if (text == "01:00") {return "01:00 - 02:00"} 
    if (text == "02:00") {return "02:00 - 03:00"} 
    if (text == "03:00") {return "03:00 - 04:00"} 
    if (text == "04:00") {return "04:00 - 05:00"} 
    if (text == "05:00") {return "05:00 - 06:00"} 
    if (text == "06:00") {return "06:00 - 07:00"} 
    if (text == "07:00") {return "07:00 - 08:00"} 
    if (text == "08:00") {return "08:00 - 09:00"} 
    if (text == "09:00") {return "09:00 - 10:00"} 
    if (text == "10:00") {return "10:00 - 11:00"} 
    if (text == "11:00") {return "11:00 - 12:00"} 
    if (text == "12:00") {return "12:00 - 13:00"} 
    if (text == "13:00") {return "13:00 - 14:00"} 
    if (text == "14:00") {return "14:00 - 15:00"} 
    if (text == "15:00") {return "15:00 - 16:00"} 
    if (text == "16:00") {return "16:00 - 17:00"} 
    if (text == "17:00") {return "17:00 - 18:00"} 
    if (text == "18:00") {return "18:00 - 19:00"} 
    if (text == "19:00") {return "19:00 - 20:00"} 
    if (text == "20:00") {return "20:00 - 21:00"} 
    if (text == "21:00") {return "21:00 - 22:00"} 
    if (text == "22:00") {return "22:00 - 23:00"} 
    if (text == "23:00") {return "23:00 - 00:00"} 

 ;})


   focus.select(".tooltip").attr("x", function(d) {
           if (text == "19:00" || text == "20:00" || text == "21:00" || text == "22:00" ||  text == "23:00") {return -120} // Siia lisada optsioon kuvada praegust kellaaega

           // if (d.value == d3.max(data, function(d) { return d.value; })) {return "red"}
            else 	{ return 10}
        ;})

        focus.select(".tooltip-date").attr("x", function(d) {
          if (text == "19:00" || text == "20:00" || text == "21:00" || text == "22:00" ||  text == "23:00") {return -112} // Siia lisada optsioon kuvada praegust kellaaega

          // if (d.value == d3.max(data, function(d) { return d.value; })) {return "red"}
           else 	{ return 18}
       ;})
       
               focus.select(".tooltip-hind").attr("x", function(d) {
          if (text == "19:00" || text == "20:00" || text == "21:00" || text == "22:00" ||  text == "23:00") {return -112} // Siia lisada optsioon kuvada praegust kellaaega

          // if (d.value == d3.max(data, function(d) { return d.value; })) {return "red"}
           else 	{ return 18}
       ;})
       
                      focus.select(".tooltip-value").attr("x", function(d) {
          if (text == "19:00" || text == "20:00" || text == "21:00" || text == "22:00" ||  text == "23:00") {return -71} // Siia lisada optsioon kuvada praegust kellaaega

          // if (d.value == d3.max(data, function(d) { return d.value; })) {return "red"}
           else 	{ return 60}
       ;})
        

    
    
});

}
}

)}

// Updeidib aega graafikul


  
var inter = setInterval(function() {
$( "#my_dataviz" ).empty();	//updateTime();
	drawChart();

	//console.log("updated");
}, 50000);   // iga 5 min


