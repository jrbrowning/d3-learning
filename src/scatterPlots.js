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
      bottom: 50,
      left: 50,
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

  const bounds = wrapper.append('g')
    .style('transform', `translate(${
      dimensions.margin.left
    }px, ${
      dimensions.margin.right
    }
    }px)`);

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

  let dots = bounds.selectAll('circle')
    .data(dataset);

  console.log({dots});
  dots = dots.data(dataset);
  console.log({dots});


  // bounds.append('circle')
  //   .attr('cx', dimensions.boundedWidth / 2)
  //   .attr('cy', dimensions.boundedHeight / 2)
  //   .attr('r', 5)

};

drawScatterPlot();
