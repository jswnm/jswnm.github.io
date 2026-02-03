document.addEventListener("DOMContentLoaded", () => {

  const svgNS = "http://www.w3.org/2000/svg";
  const chart = document.querySelector("#chart");

  const data = [
    1, 0, 0, 0, 1, 1, -2, 9, 0,
    29, 1, 15, 13, 27, 27, 18,
    40, 54, 51, 32, 17, 25, 27,
    12, 22, 21, 10, 20, 17, 23
  ];

  const chartWidth = 900;
  const chartHeight = 300;
  const padding = 40;

  const maxValue = Math.max(...data);
  const xStep = (chartWidth - padding * 2) / (data.length - 1);

  let points = [];

  /* Turning the data into points */
  data.forEach((value, index) => {
    const x = padding + index * xStep;
    const y =
      chartHeight -
      padding -
      (value / maxValue) * (chartHeight - padding * 2);

    points.push({ x, y });
  });

  /* DRAW LINES */
  for (let i = 0; i < points.length - 1; i++) {
    const line = document.createElementNS(svgNS, "line");

    line.setAttribute("x1", points[i].x);
    line.setAttribute("y1", points[i].y);
    line.setAttribute("x2", points[i + 1].x);
    line.setAttribute("y2", points[i + 1].y);
    line.setAttribute("stroke", "#3b82f6");
    line.setAttribute("stroke-width", 3);
    line.setAttribute("stroke-linecap", "round");

    chart.appendChild(line);
  }

  /* AXES */

  const xAxis = document.createElementNS(svgNS, "line");
  xAxis.setAttribute("x1", padding);
  xAxis.setAttribute("y1", chartHeight - padding);
  xAxis.setAttribute("x2", chartWidth - padding);
  xAxis.setAttribute("y2", chartHeight - padding);
  xAxis.setAttribute("stroke", "#9ca3af");
  chart.appendChild(xAxis);

  const yAxis = document.createElementNS(svgNS, "line");
  yAxis.setAttribute("x1", padding);
  yAxis.setAttribute("y1", padding);
  yAxis.setAttribute("x2", padding);
  yAxis.setAttribute("y2", chartHeight - padding);
  yAxis.setAttribute("stroke", "#9ca3af");
  chart.appendChild(yAxis);

  const ySteps = 5;

  for (let i = 0; i <= ySteps; i++) {
    const value = Math.round((maxValue / ySteps) * i);
    const y =
      chartHeight -
      padding -
      (value / maxValue) * (chartHeight - padding * 2);

    const label = document.createElementNS(svgNS, "text");
    label.setAttribute("x", padding - 10);
    label.setAttribute("y", y + 4);
    label.setAttribute("text-anchor", "end");
    label.setAttribute("fill", "#e5e7eb");
    label.setAttribute("font-size", "12px");
    label.textContent = value;

    chart.appendChild(label);
  }

  data.forEach((_, index) => {
    if (index % 5 !== 0) return; // fewer labels = cleaner

    const x = padding + index * xStep;

    const label = document.createElementNS(svgNS, "text");
    label.setAttribute("x", x);
    label.setAttribute("y", chartHeight - padding + 20);
    label.setAttribute("text-anchor", "middle");
    label.setAttribute("fill", "#e5e7eb");
    label.setAttribute("font-size", "12px");
    label.textContent = index;

    chart.appendChild(label);
  });

  /* Creative Art SVG */

  const art = document.querySelector("#art");

  /* Left lens */
  const leftLens = document.createElementNS(svgNS, "circle");
  leftLens.setAttribute("cx", 300);
  leftLens.setAttribute("cy", 150);
  leftLens.setAttribute("r", 70);
  leftLens.setAttribute("fill", "none");
  leftLens.setAttribute("stroke", "white");
  leftLens.setAttribute("stroke-width", 6);
  art.appendChild(leftLens);

  /* Right lens */
  const rightLens = document.createElementNS(svgNS, "circle");
  rightLens.setAttribute("cx", 500);
  rightLens.setAttribute("cy", 150);
  rightLens.setAttribute("r", 70);
  rightLens.setAttribute("fill", "none");
  rightLens.setAttribute("stroke", "white");
  rightLens.setAttribute("stroke-width", 6);
  art.appendChild(rightLens);

  /* Glasses bridge */
  const bridge = document.createElementNS(svgNS, "line");
  bridge.setAttribute("x1", 370);
  bridge.setAttribute("y1", 150);
  bridge.setAttribute("x2", 430);
  bridge.setAttribute("y2", 150);
  bridge.setAttribute("stroke", "white");
  bridge.setAttribute("stroke-width", 6);
  bridge.setAttribute("stroke-linecap", "round");
  art.appendChild(bridge);

  /* Target rings (left lens) */
  const outerRing = document.createElementNS(svgNS, "circle");
  outerRing.setAttribute("cx", 300);
  outerRing.setAttribute("cy", 150);
  outerRing.setAttribute("r", 50);
  outerRing.setAttribute("fill", "none");
  outerRing.setAttribute("stroke", "#7dd3fc");
  outerRing.setAttribute("stroke-width", 4);
  art.appendChild(outerRing);

  const innerRing = document.createElementNS(svgNS, "circle");
  innerRing.setAttribute("cx", 300);
  innerRing.setAttribute("cy", 150);
  innerRing.setAttribute("r", 35);
  innerRing.setAttribute("fill", "none");
  innerRing.setAttribute("stroke", "#7dd3fc");
  innerRing.setAttribute("stroke-width", 3);
  art.appendChild(innerRing);

  /* Crosshair */
  const verticalLine = document.createElementNS(svgNS, "line");
  verticalLine.setAttribute("x1", 300);
  verticalLine.setAttribute("y1", 90);
  verticalLine.setAttribute("x2", 300);
  verticalLine.setAttribute("y2", 210);
  verticalLine.setAttribute("stroke", "#7dd3fc");
  verticalLine.setAttribute("stroke-width", 3);
  art.appendChild(verticalLine);

  const horizontalLine = document.createElementNS(svgNS, "line");
  horizontalLine.setAttribute("x1", 240);
  horizontalLine.setAttribute("y1", 150);
  horizontalLine.setAttribute("x2", 360);
  horizontalLine.setAttribute("y2", 150);
  horizontalLine.setAttribute("stroke", "#7dd3fc");
  horizontalLine.setAttribute("stroke-width", 3);
  art.appendChild(horizontalLine);

  /* Center dot */
  const centerDot = document.createElementNS(svgNS, "circle");
  centerDot.setAttribute("cx", 300);
  centerDot.setAttribute("cy", 150);
  centerDot.setAttribute("r", 4);
  centerDot.setAttribute("fill", "#7dd3fc");
  art.appendChild(centerDot);

});
