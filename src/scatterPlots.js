async function drawScatterPlot() {
  const dataset = await d3.json("./json/my_dc_weather_data.json");

  // 1. Access data
  const yAccessor = d => d.dewPoint;
  const xAccessor = d => d.humidity;

  // 2. Create Chart Dimensions

  const width = d3.min([
    window.innerWidth * 0.9,
    window.innerHeight * 0.9,
  ])

  let dimensions = {
    width: width,
    height: width,
    margin: {
      top: 10,
      right: 10, 
      bottom: 80,
      left: 80,
    }
  }

  dimensions.boundedWidth = dimensions.width
    - dimensions.margin.left
    - dimensions.margin.right;

  dimensions.boundedHeight = dimensions.height
    - dimensions.margin.top
    - dimensions.margin.bottom;

  // 3. Draw the Canvas
  
  const wrapper = d3.select('#scatter-plot')
    .append('svg')
      .attr('width', dimensions.width)
      .attr('height', dimensions.height);

  const bounds = wrapper
    .append('g')
    .style(
      "transform",
      `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`
  );

  // 4. Create the scales

  const xScale = d3.scaleLinear()
    .domain(d3.extent(dataset, xAccessor))
    .range([0, dimensions.boundedWidth])
    .nice();

  const yScale = d3.scaleLinear()
    .domain(d3.extent(dataset, yAccessor))
    .range([dimensions.boundedHeight, 0])
    .nice();

  // 5. Draw the Data

  function drawDots(dataset, color) {
    const dots = bounds.selectAll("circle").data(dataset);


    // dots.join is shorthand for
      // .enter()
      // .append("circle")
      // .merge(dots)
    dots
      .join("circle")
        .attr("cx", d => xScale(xAccessor(d)))
        .attr("cy", d => yScale(yAccessor(d)))
        .attr("r", 5)
        .attr("fill", color);

  }

  drawDots(dataset, "cornFlowerBlue");

  // 6. Draw Peripherals

  // xAxis
  const xAxisGenerator = d3.axisBottom()
    .scale(xScale);

  const xAxis = bounds.append('g')
    .call(xAxisGenerator)
      .style('transform', `translateY(${dimensions.boundedHeight}px)`)

  const xAxisLabel = xAxis.append('text')
    .attr('x', dimensions.boundedWidth / 2)
    .attr('y', dimensions.margin.bottom - 30)
    .attr('fill', '#aaa')
    .attr('font-size', '1.4em')
    .html('Dew point (&deg;F)')
    
  //yAxis
  const yAxisGenerator = d3.axisLeft()
    .scale(yScale)
    .ticks(6)

  const yAxis = bounds.append('g')
    .call(yAxisGenerator)

  const yAxisLable = yAxis
    .append("text")
    .attr("x", -dimensions.boundedHeight / 2)
    .attr("y", -dimensions.margin.left + 30)
    .attr("fill", "#aaa")
    .attr("font-size", "1.4em")
    .style("transform", "rotate(-90deg)")
    .style("text-anchor", "middle")
    .html("Relative humidity");
};

drawScatterPlot();
