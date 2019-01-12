function choseData() {
  //Width and height of map
  var width = 960;
  var height = 500;

  var highColor = '#16B530'
  var lowColor = '#FB373D'

  // D3 Projection
  var projection = d3.geoAlbersUsa()
    .translate([width / 2, height / 2]) // translate to center of screen
    .scale([1000]); // scale things down so see entire US

  // Define path generator
  var path = d3.geoPath() // path generator that will convert GeoJSON to SVG paths
    .projection(projection); // tell path generator to use albersUsa projection

  //Create SVG element and append map to the SVG
  var svg = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  	// Append Div for tooltip to SVG
  var div = d3.select("body")
    .append("div")
  	.attr("class", "tooltip")
  	.style("opacity", 0);

  	// var toolTip = d3.tip()
    //   .attr("class", "tooltip")
    //   .offset([80, -60])
    //   .html(function(d) {
    //     return (`${d.state}<br>${d.name}`);
    //   });

  // Load in my states data!
  d3.csv("../../db/anem_stateoutliers.csv", function(data) {
  	var dataArray = [];
  	for (var d = 0; d < data.length; d++) {
  		dataArray.push(parseFloat(data[d].value))
  	}
  	var minVal = d3.min(dataArray)
  	var maxVal = d3.max(dataArray)
  	var ramp = d3.scaleLinear().domain([minVal,maxVal]).range([lowColor,highColor])

  	// Load GeoJSON data and merge with states data
  	d3.json("../static/js/us-states.json", function(json) {

  	// Loop through each state data value in the .csv file
  	for (var i = 0; i < data.length; i++) {

  	  // Grab State Name
  	  var dataState = data[i].state;

  	  // Grab data value
  	  var dataValue = data[i].value;

  	  // Find the corresponding state inside the GeoJSON
  	  for (var j = 0; j < json.features.length; j++) {
  	    var jsonState = json.features[j].properties.abbr;

  	    if (dataState == jsonState) {

  	      // Copy the data value into the JSON
  	      json.features[j].properties.value = dataValue;

  	      // Stop looking through the JSON
  	      break;
  	    }
  	  }
  	}

  	// Bind the data to the SVG and create one path per GeoJSON feature
  	svg.selectAll("path")
  	  .data(json.features)
  	  .enter()
  	  .append("path")
  	  .attr("d", path)
  	  .style("stroke", "#fff")
  	  .style("stroke-width", "1")
  	  .style("fill", function(d) { return ramp(d.properties.value) } )
  		.on("mouseover", function(d) {
           div.transition()
               .duration(200)
               .style("opacity", .9);
           div.html(`${d.properties.name}<br>${d.properties.value}`)
           })
       .on("mouseout", function(d) {
           div.transition()
               .duration(500)
               .style("opacity", 0)
       });
  	});

  	// .on("mouseover", function(data) {
  	// 	toolTip.show(data);
  	// })
  	// 	// onmouseout event
  	// .on("mouseout", function(data, index) {
  	// 		toolTip.hide(data);
  	// 	});
  	// });


  	// add a legend
  	var w = 140, h = 300;

  	var key = d3.select("body")
  		.append("svg")
  		.attr("width", w)
  		.attr("height", h)
  		.attr("class", "legend");

  		var legend = key.append("defs")
  			.append("svg:linearGradient")
  			.attr("id", "gradient")
  			.attr("x1", "100%")
  			.attr("y1", "0%")
  			.attr("x2", "100%")
  			.attr("y2", "100%")
  			.attr("spreadMethod", "pad");

  		legend.append("stop")
  			.attr("offset", "0%")
  			.attr("stop-color", highColor)
  			.attr("stop-opacity", 1);

  		legend.append("stop")
  			.attr("offset", "100%")
  			.attr("stop-color", lowColor)
  			.attr("stop-opacity", 1);

  		key.append("rect")
  			.attr("width", w - 100)
  			.attr("height", h)
  			.style("fill", "url(#gradient)")
  			.attr("transform", "translate(0,10)");

  		var y = d3.scaleLinear()
  			.range([h, 0])
  			.domain([minVal, maxVal]);

  		var yAxis = d3.axisRight(y);

  		key.append("g")
  			.attr("class", "y axis")
  			.attr("transform", "translate(41,10)")
  			.call(yAxis)
    });
}
anemData()




function choseData() {
  //Width and height of map
  var width = 960;
  var height = 500;

  var highColor = '#16B530'
  var lowColor = '#FB373D'

  // D3 Projection
  var projection = d3.geoAlbersUsa()
    .translate([width / 2, height / 2]) // translate to center of screen
    .scale([1000]); // scale things down so see entire US

  // Define path generator
  var path = d3.geoPath() // path generator that will convert GeoJSON to SVG paths
    .projection(projection); // tell path generator to use albersUsa projection

  //Create SVG element and append map to the SVG
  var svg = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  	// Append Div for tooltip to SVG
  var div = d3.select("body")
    .append("div")
  	.attr("class", "tooltip")
  	.style("opacity", 0);

  	// var toolTip = d3.tip()
    //   .attr("class", "tooltip")
    //   .offset([80, -60])
    //   .html(function(d) {
    //     return (`${d.state}<br>${d.name}`);
    //   });

  // Load in my states data!
  d3.csv(datafile, function(data) {
  	var dataArray = [];
  	for (var d = 0; d < data.length; d++) {
  		dataArray.push(parseFloat(data[d].value))
  	}
  	var minVal = d3.min(dataArray)
  	var maxVal = d3.max(dataArray)
  	var ramp = d3.scaleLinear().domain([minVal,maxVal]).range([lowColor,highColor])

  	// Load GeoJSON data and merge with states data
  	d3.json("../static/js/us-states.json", function(json) {

  	// Loop through each state data value in the .csv file
  	for (var i = 0; i < data.length; i++) {

  	  // Grab State Name
  	  var dataState = data[i].state;

  	  // Grab data value
  	  var dataValue = data[i].value;

  	  // Find the corresponding state inside the GeoJSON
  	  for (var j = 0; j < json.features.length; j++) {
  	    var jsonState = json.features[j].properties.abbr;

  	    if (dataState == jsonState) {

  	      // Copy the data value into the JSON
  	      json.features[j].properties.value = dataValue;

  	      // Stop looking through the JSON
  	      break;
  	    }
  	  }
  	}

  	// Bind the data to the SVG and create one path per GeoJSON feature
  	svg.selectAll("path")
  	  .data(json.features)
  	  .enter()
  	  .append("path")
  	  .attr("d", path)
  	  .style("stroke", "#fff")
  	  .style("stroke-width", "1")
  	  .style("fill", function(d) { return ramp(d.properties.value) } )
  		.on("mouseover", function(d) {
           div.transition()
               .duration(200)
               .style("opacity", .9);
           div.html(`${d.properties.name}<br>${d.properties.value}`)
           })
       .on("mouseout", function(d) {
           div.transition()
               .duration(500)
               .style("opacity", 0)
       });
  	});

  	// .on("mouseover", function(data) {
  	// 	toolTip.show(data);
  	// })
  	// 	// onmouseout event
  	// .on("mouseout", function(data, index) {
  	// 		toolTip.hide(data);
  	// 	});
  	// });


  	// add a legend
  	var w = 140, h = 300;

  	var key = d3.select("body")
  		.append("svg")
  		.attr("width", w)
  		.attr("height", h)
  		.attr("class", "legend");

  		var legend = key.append("defs")
  			.append("svg:linearGradient")
  			.attr("id", "gradient")
  			.attr("x1", "100%")
  			.attr("y1", "0%")
  			.attr("x2", "100%")
  			.attr("y2", "100%")
  			.attr("spreadMethod", "pad");

  		legend.append("stop")
  			.attr("offset", "0%")
  			.attr("stop-color", highColor)
  			.attr("stop-opacity", 1);

  		legend.append("stop")
  			.attr("offset", "100%")
  			.attr("stop-color", lowColor)
  			.attr("stop-opacity", 1);

  		key.append("rect")
  			.attr("width", w - 100)
  			.attr("height", h)
  			.style("fill", "url(#gradient)")
  			.attr("transform", "translate(0,10)");

  		var y = d3.scaleLinear()
  			.range([h, 0])
  			.domain([minVal, maxVal]);

  		var yAxis = d3.axisRight(y);

  		key.append("g")
  			.attr("class", "y axis")
  			.attr("transform", "translate(41,10)")
  			.call(yAxis)
    });
}
var datafile = "../../db/anem_stateoutliers.csv";
choseData();
