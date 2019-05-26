async function drawLineChart() {

  // 1. Access data
  const dataset = await d3.json("./json/my_dc_weather_data.json");

  const yAccessor = d => d.temperatureMax
  const dateParser = d3.timeParse("%Y-%m-%d")
  const xAccessor = d => dateParser(d.date)

  // 2. Create chart dimensions
  console.log("rest of code goes here!");
}
drawLineChart()