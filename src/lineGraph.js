async function drawLineChart() {

  // 1. Access data
  // const dataset = await d3.json(`https://covidtracking.com/api/states/daily?state=DC`);

  const dataset = await d3.json("./json/my_dc_weather_data.json");

  const yAccessor = d => d.temperatureMax
  const dateParser = d3.timeParse("%Y-%m-%d")
  const xAccessor = d => dateParser(d.date)

  // 2. Create chart dimensions
  const dimensions = {
    width: window.innerWidth * 0.9,
    height: 400,
    margin: {
      top: 15,
      right: 15,
      bottom: 40, 
      left: 60
    },
  };

  const lineColors = {
    hot: "#BF571B",
    cold: "#5A6B8C",
    line: "#F2B544"
  };
  dimensions.boundedWidth = dimensions.width
    - dimensions.margin.left
    - dimensions.margin.right;

  dimensions.boundedHeight = dimensions.height
    - dimensions.margin.top
    - dimensions.margin.bottom;

  // 3. Draw Canvas
  const wrapper = d3.select("#line-plot")
      .append("svg")
          .attr("width", dimensions.width)
          .attr("height", dimensions.height);


  const bounds = wrapper.append("g")
      .style("transform", `translate(${
        dimensions.margin.left
      }px, ${
        dimensions.margin.top
      }px)`)

  // 4.  Create Scales

  const yScale = d3.scaleLinear()
      .domain(d3.extent(dataset, yAccessor))
      .range([dimensions.boundedHeight, 0])

  const freezingTemperaturePlacement = yScale(32);
  const freezingTemperature = bounds.append("rect")
      .attr("x",0)
      .attr("width", dimensions.boundedWidth)
      .attr("y", freezingTemperaturePlacement)
      .attr("height", d3.max([0, dimensions.boundedHeight
        -freezingTemperaturePlacement]))
      .attr("fill",lineColors.cold);

  const tooHotPlacement = yScale(80);
  const tooHotTemp = bounds.append("rect")
      .attr("x",0)
      .attr("width", dimensions.boundedWidth)
      .attr("y", 0)
      .attr("height", tooHotPlacement)
      .attr("fill", lineColors.hot)

  const xScale = d3.scaleTime()
      .domain(d3.extent(dataset, xAccessor))
      .range([0, dimensions.boundedWidth]);

  // 5. Draw Data

  const lineGenerator = d3.line()
      .x(d => xScale(xAccessor(d)))
      .y(d => yScale(yAccessor(d)));

  const line = bounds.append("path")
      .attr("d", lineGenerator(dataset))
      .attr("fill", "none")
      .attr("stroke", lineColors.line)
      .attr("stroke-width", 2);

  // 6. Draw Peripherials (axis)

  const yAxisGenerator = d3.axisLeft()
    .scale(yScale)

  const xAxisGenerator = d3.axisBottom()
      .scale(xScale)

  bounds.append("g").call(yAxisGenerator);

  bounds.append("g").call(xAxisGenerator)
          .style("transform", `translateY(${
            dimensions.boundedHeight
          }px)`)

}

drawLineChart();
