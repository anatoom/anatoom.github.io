let drawChart = function(data) {
    let chart = document.getElementById("chart_div");
    chart.style.position = 'relative';


    let maxXvalue = 0;

    for (let dataPoint of data) {
        let xValuem = parseFloat(dataPoint["Males"]);
        let xValuef = parseFloat(dataPoint["Females"]);
        if (xValuem === undefined || xValuef === undefined) {
            continue;
        }
        if (xValuem > maxXvalue) {
            maxXvalue = xValuem;
        }
        if (xValuef > maxXvalue) {
            maxXvalue = xValuef;
        }
    }

    console.log("max " + maxXvalue);    

    for (let dataPoint of data) {
        let xValuem = dataPoint["Males"];
        let xValuef = dataPoint["Females"];
        let yCountry = dataPoint["Foreign Population in Finland"];
        console.log("point " + xValuem + ", " + xValuef);
        if (xValuem === undefined || xValuef === undefined) {
            continue;
        }

        let bar = document.createElement("div");
        bar.className = "chart-bar";

        let males = document.createElement("div");
       males.style.position = 'relative';
       // males.style.left = xValuem + 'px';
      // males.style.display = 'inline-grid';
        // males.style.border = '1px solid black';
        males.style.backgroundColor = '#0080FF';
        males.style.width = 100 * xValuem / maxXvalue + '%';
        males.style.height = '20px';
        males.style.marginBottom = '5px';
        // males.innerHTML = xValuem + "  ";
        males.className = "mvalues";

        bar.appendChild(males);

        let females = document.createElement("div");
       females.style.position = 'relative';
       // females.style.left = xValuem + 'px';
       // females.style.display = 'inline-grid';
        // females.style.border = '1px solid black';
        females.style.backgroundColor = '#FF6666';
        females.style.width = 100 * xValuef / maxXvalue + '%';
        females.style.height = '20px';
        females.style.marginBottom = '25px';
        // females.innerHTML = xValuef + "  ";
        females.className = "fvalues";

        bar.appendChild(females);

        let minfoContainer = document.createElement("div");
        minfoContainer.className = "minfoContainer" ;
      // minfoContainer.style.width = "100px";
      // minfoContainer.style.height = "100px";

        let minfoContainerText = document.createElement("p");
        minfoContainerText.className = "minfoContainerText";
        minfoContainerText.innerHTML = xValuem;
        minfoContainer.appendChild(minfoContainerText);

        males.appendChild(minfoContainer);


        let finfoContainer = document.createElement("div");
        finfoContainer.className = "finfoContainer" ;
       // finfoContainer.style.width = "100px";
       // finfoContainer.style.height = "100px";

        let finfoContainerText = document.createElement("p");
        finfoContainerText.className = "finfoContainerText";
        finfoContainerText.innerHTML = xValuef;
        finfoContainer.appendChild(finfoContainerText);

        females.appendChild(finfoContainer);




let countryname = document.createElement("div");
countryname.innerHTML = yCountry ;
//countryname.style.display = 'inline';

chart.appendChild(countryname);
chart.append(bar);

    }

};

Papa.parse("https://anatoom.github.io/table_2.csv", {
    download: true,
    header: true,
    complete: function(result) {
        console.log(result.data);
        drawChart(result.data);
    }
})