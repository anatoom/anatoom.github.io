

/*var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();*/ // Siin saab kuvada praegust kellaaega

var todayTime = new Date();
var timeNow = todayTime.getHours()/* + ":" + today.getMinutes() + ":" + today.getSeconds()*/;








//console.log(timeNow);


//console.log(date);

// set the dimensions and margins of the graph
var margin = {top: 25, right: 150, bottom: 30, left: 30},
    width = 950 - margin.left - margin.right,
    height = 200 - margin.top - margin.bottom;


// Drawchart

drawChart();

function drawChart() {





// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
  .attr("viewBox", `0 0 1200 200`)
  .style("background-color", "#E8EBED");
    /*.attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)*/


    svg.append("text")
    .attr("class", "width")
    .attr("x", 17)
    .attr("y", 54)
    .text("");
    
    /*svg.append("text")
    .attr("class", "height")
    .attr("x", 67)
    .attr("y", 54)
    .text("");*/
    

// Resize fondi funktsioon

//go();    

window.addEventListener('resize', go);

function go(){
 //document.querySelector('.width').innerHTML = document.documentElement.clientWidth;
 
  if (document.documentElement.clientWidth <= "700") {

svg.selectAll(".tooltip-date,.tooltip-hind,.tooltip-today")
.style("font-size", "16px");

svg.select(".tooltip")
.attr("width", 130);


    /*focus.append("rect")
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
.attr("class", "tooltip-today")
.attr("x", 60)
.attr("y", 18);*/
    
    svg.selectAll("g").selectAll(".tick")
    .style("font-size", "16px");
    svg.selectAll(".tekstSmall")
    .style("font-size", "14px");
    svg.selectAll(".tekst")
    .style("font-size", "16px");
    svg.select("#myLabel")
    .style("font-size", "16px");
    svg.selectAll(".tekst_ita")
    .style("font-size", "14px");

    svg.select("#timeDisplay")
    .attr("x", 85);

  }

  if (document.documentElement.clientWidth > "700") {

    svg.selectAll(".tooltip-date,.tooltip-hind,.tooltip-today")
.style("font-size", "14px");

svg.select(".tooltip")
.attr("width", 110);
    
    svg.selectAll("g").selectAll(".tick")
    .style("font-size", "14px");
    svg.selectAll(".tekstSmall")
    .style("font-size", "12px");
    svg.selectAll(".tekst")
    .style("font-size", "14px");
    svg.selectAll(".tekst_ita")
    .style("font-size", "12px");
    svg.select("#myLabel")
    .style("font-size", "12px");



  }
  
 // document.querySelector('.height').innerHTML = document.documentElement.clientHeight;
}




    // Sisesta tekstid graafiku ette

svg.append("text")
.attr("class", "pk")
.attr("x", 17)
.attr("y", 84)
.text("Elektri hind");

// Date ja time 

svg.append("text")
.attr("id", "dateDisplay")
.attr("class", "tekst")
.attr("x", 21)
.attr("y", 123);

svg.append("text")
.attr("id", "timeDisplay")
.attr("class", "tekst")
.attr("x", 95)
.attr("y", 123);



refreshTime();
function refreshTime() {
  go(); 
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
.attr("y", 183)
.text("Hind sisaldab käibemaksu.");

// Hindade display intros

svg.append("text")
.attr("id", "maxHind")
.attr("class", "maxHindClass")
.attr("x", 280)
.attr("y", 30);

svg.append("text")
.attr("id", "minHind")
.attr("class", "minHindClass")
.attr("x", 280)
.attr("y", 170);

svg.append("text")
.attr("id", "nowHind")
.attr("class", "nowHindClass")
.attr("x", 280)
.attr("y", 100);

svg.append("text")
.attr("class", "tekstSmall")
.attr("x", 225)
.attr("y", 30)
.text("max");

svg.append("text")
.attr("class", "tekstSmall")
.attr("x", 225)
.attr("y", 100)
.text("hetkel");

svg.append("text")
.attr("class", "tekstSmall")
.attr("x", 225)
.attr("y", 170)
.text("min");

svg.append("text")
.attr("class", "tekstSmall")
.attr("x", 280)
.attr("y", 190)
.text("senti/kWh");

svg.append("text")
.attr("class", "tekstSmall")
.attr("x", 280)
.attr("y", 120)
.text("senti/kWh");

svg.append("text")
.attr("class", "tekstSmall")
.attr("x", 280)
.attr("y", 50)
.text("senti/kWh");

// Legend

svg.append("text")
.attr("class", "tekstSmall")
.attr("x", 398)
.attr("y", 30)
.text("Täna");

svg.append("line")
.style("stroke", "#55ABC0")
.style("stroke-width", 2)
.attr("x1", 438)
.attr("x2", 464)
.attr("y1", 27)
.attr("y2", 27);

svg.append("circle")
.attr("cx", 451)
.attr("cy", 27)
.attr("r", 4)
.attr("fill", "#55ABC0");


svg.append("line")
.style("stroke", "#55ABC0")
.style("stroke-width", 2)
.style("opacity", 0.5)
.attr("x1", 525)
.attr("x2", 551)
.attr("y1", 27)
.attr("y2", 27);




svg.append("text")
.attr("class", "tekstSmall")
.attr("x", 490)
.attr("y", 30)
.text("Eile");


// Kirjuta chart

var innerSVG = svg.append("svg")
.attr("class", "chart")
.attr("width", 1100)
.attr("height", 300)
.style("overflow", "visible")
.attr("x", 397)
.attr("y", 30);

  
innerSVG.append("g")
   .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");
        
          var bisectDate = d3.bisector(function(d) { return d.time; }).left 

          const formatTime = d3.timeFormat("%H");
          
          const displayTime = d3.timeFormat("%H:%M");
//console.log("chart drawn");





//Read the data
d3.json("https://www.delfi.ee/misc/common/embed/electricity/prices.php",



  // When reading the csv, I must format variables:
  function(d){
    return { time : d3.timeParse("%H:%M:%S")(d.time), today : d.today, yesterday : d.yesterday  }
   
},
 

 
  // Now I can use this dataset:
  function(data) {
    console.log(data) 
// Filtreerib välja praeguse elektrihinna tunni järgi
data.forEach(function(d) {
    d.date = formatTime(d.time);
    d.today = +d.today;
    d.yesterday = +d.yesterday;
    if (d.date == timeNow) { 
    

   // LISA PÄRAST !!!
   var nowHind = d.today;
   var nowHindDisplay = document.getElementById("nowHind");


   nowHindDisplay.innerHTML = nowHind; 
       

    };
   
});



// Maksimaalne hind ja minimaalne hind

var maxHind = d3.max(data, function(d) { return Math.max(d.today); });
var minHind = d3.min(data, function(d) { return Math.min(d.today); });
var keskHind = d3.median(data, function(d) { return (d.today); });
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
     .call(xAxis .ticktodays(data.map(function(d){return d.time}))
                .tickFormat(d3.timeFormat("%H")));
      
     d3.select(".domain").attr("stroke", "none");
     innerSVG.selectAll("g").selectAll(".tick").selectAll("line").remove(); // Change time format as m/d

    
  
 // console.log(data);
  
  // set the ranges



// define the 1st line
var todayline = d3.line()
    .x(function(d) { return x(d.time); })
    .y(function(d) { return y(d.today); });


// define the 2nd line
var todayline2 = d3.line()
    .x(function(d) { return x(d.time); })
    .y(function(d) { return y(d.yesterday); });  
  




   // Add Y axis
    var y = d3.scaleLinear()
      .domain([d3.min(data, function(d) {
        return Math.min(d.today, d.yesterday) - 50; }), d3.max(data, function(d) {
        return Math.max(d.today, d.yesterday); })])
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
      .attr("d", todayline)

        
    // Add the line 2
    innerSVG.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("opacity", 0.5)
    .attr("stroke", "#55ABC0")
    .attr("stroke-width", 1.5)
    .attr("d", todayline2)


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
        .attr("cy", function(d) { return y(d.today) } )
        .attr("r", 5)
        .attr("fill", function(d) {
           if (formatTime(d.time) == timeNow) {return "#F57043"
           
           
           } // Siia lisada optsioon kuvada praegust kellaaega

           // if (d.today == d3.max(data, function(d) { return d.today; })) {return "red"}
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
        .attr("cy", function(d) { return y(d.yesterday) } )
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
.attr("class", "tooltip-today")
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
focus.attr("transform", "translate(" + x(d.time) + "," + y(d.today) + ")");
focus.select(".tooltip-date").text(displayTime(d.time));
focus.select(".tooltip-today").text((d.today));




// change textbox direction


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
           if (text == "21:00" || text == "22:00" ||  text == "23:00") {return -120} // Siia lisada optsioon kuvada praegust kellaaega

           // if (d.today == d3.max(data, function(d) { return d.today; })) {return "red"}
            else 	{ return 10}
        ;})

        focus.select(".tooltip-date").attr("x", function(d) {
          if (text == "21:00" || text == "22:00" ||  text == "23:00") {return -112} // Siia lisada optsioon kuvada praegust kellaaega

          // if (d.today == d3.max(data, function(d) { return d.today; })) {return "red"}
           else 	{ return 18}
       ;})
       
               focus.select(".tooltip-hind").attr("x", function(d) {
          if (text == "21:00" || text == "22:00" ||  text == "23:00") {return -112} // Siia lisada optsioon kuvada praegust kellaaega

          // if (d.today == d3.max(data, function(d) { return d.today; })) {return "red"}
           else 	{ return 18}
       ;})
       
                      focus.select(".tooltip-today").attr("x", function(d) {
          if (text == "21:00" || text == "22:00" ||  text == "23:00") {return -71} // Siia lisada optsioon kuvada praegust kellaaega

          // if (d.today == d3.max(data, function(d) { return d.today; })) {return "red"}
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





