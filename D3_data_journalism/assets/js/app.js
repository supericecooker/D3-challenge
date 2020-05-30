// Step 1: Set up our chart
// ================================
var svgWidth = 1000;
var svgHeight = 600;

var margin = {
  top: 20,
  right: 0,
  bottom: 80,
  left: 90
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Step 2: Create an SVG wrapper,
// append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
// =================================
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Step 3:
// Import data from the data.csv file
// =================================
d3.csv("/assets/data/data.csv").then(function(csvData) {
    // Step 4: 
    // Create a function to Format the data

csvData.forEach(function(formatData) {
    formatData.poverty = +formatData.poverty;
    formatData.healthcare = +formatData.healthcare;
    });

// Step 5: Create the scales for the chart
  // =================================
var xLinearScale = d3.scaleLinear()
  .domain([d3.min(csvData, d=>d.poverty)*0.9,
      d3.max(csvData, d => d.poverty)*1.1])
  .range([0, width]);

var yLinearScale = d3.scaleLinear()
  .domain([0, d3.max(csvData, d => d.healthcare)*1.1])
  .range([height, 0]);

// Step 6: Create the axes
  // =================================
var bottomAxis = d3.axisBottom(xLinearScale);
var leftAxis = d3.axisLeft(yLinearScale);

// Step 8: Append the axes to the chartGroup
  // ==============================================
  // Add x-axis
chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .style("font-size", "13px")
        .call(bottomAxis);
// CHANGE THE TEXT 
chartGroup.append("g")
        .style("font-size", "16px")
        .call(leftAxis);

//Step 9 create SVG circle
chartGroup.selectAll("circle")
        .data(csvData)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.poverty))
        .attr("cy", d => yLinearScale(d.healthcare))
        .attr("r", 11)
        .attr("fill", "pink")
        .attr("opacity", ".8");

// // Part 2
// Binding the SVG to data
chartGroup.selectAll("text.text-circles")
        .data(csvData)
        .enter()
        .append("text")
        .classed("text-circles",true)
        .text(d => d.abbr)
        .attr("x", d => xLinearScale(d.poverty))
        .attr("y", d => yLinearScale(d.healthcare))
        .attr("dy",5)
        .attr("text-anchor","middle")
        .attr("font-size","13px")
        .attr("fill", "blue");

//Step 10: Add color coded titles to the x-axis

chartGroup.append("text")
        .attr("y", height + margin.bottom/2 - 10)
        .attr("x", width / 2)
        .attr("dy", "1em")
        .classed("aText", true)
        .text("In Poverty (%)");


});

//Step 10: Add color coded titles to the y-axis
chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 30 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .classed("aText", true)
        .text("Lacks Healthcare (%)");
