const embedOptions = { actions: false, renderer: "canvas" };
const gameConfig = {
  background: "#0b0f1a",
  axis: {
    labelColor: "#e5e7eb",
    titleColor: "#00e5ff",
    gridColor: "#1f2a44",
    domainColor: "#00e5ff",
    tickColor: "#00e5ff",
    labelFont: "monospace",
    titleFont: "monospace"
  },
  legend: {
    labelColor: "#e5e7eb",
    titleColor: "#00e5ff",
    labelFont: "monospace",
    titleFont: "monospace"
  },
  title: { color: "#00e5ff", font: "monospace", fontSize: 18 },
  view: { stroke: "#00e5ff" }
};

/* -----------------------------
   Visualization 1 — Global Sales by Genre
   Sorted Bar Chart (Stable Version)
----------------------------- */
const vis1 = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",

  config: gameConfig,

  data: { url: "dataset/videogames_long.csv" },

  title: "Global Sales by Genre",

  mark: {
    type: "bar",
    cornerRadiusEnd: 6
  },

  encoding: {
    y: {
      field: "genre",
      type: "nominal",

      // ✅ Sort by the aggregated value directly (this is the SAFE way)
      sort: "-x",

      title: "Genre",
      axis: { labelLimit: 200 }
    },

    x: {
      aggregate: "sum",
      field: "global_sales",
      type: "quantitative",
      title: "Total Global Sales (Millions)"
    },

    color: {
      field: "platform",
      type: "nominal",
      title: "Platform"
    },

    tooltip: [
      { field: "genre", type: "nominal" },
      { field: "platform", type: "nominal" },
      { aggregate: "sum", field: "global_sales", type: "quantitative", title: "Sales" }
    ]
  },

  // ✅ Use fixed width — "container" breaks in many setups
  width: 620,

  // height step prevents squishing
  height: { step: 26 }
};

vegaEmbed("#view1", vis1, { actions: false });

/* -----------------------------
   Visualization 2 — Stacked area
----------------------------- */
const vis2 = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  data: { url: "dataset/videogames_long.csv" },
  config: gameConfig,
  autosize: { type: "fit", contains: "padding" },
  title: "Video Game Sales Over Time by Platform & Genre",
  mark: { type: "area", line: true, interpolate: "monotone" },
  encoding: {
    x: { field: "year", type: "ordinal", title: "Release Year" },
    y: { aggregate: "sum", field: "global_sales", type: "quantitative", stack: "zero", title: "Sales (Millions)" },
    color: { field: "platform", type: "nominal", title: "Platform" },
    detail: { field: "genre" },
    tooltip: [
      { field: "year", type: "ordinal" },
      { field: "platform", type: "nominal" },
      { field: "genre", type: "nominal" },
      { aggregate: "sum", field: "global_sales", type: "quantitative", title: "Sales (Millions)" }
    ]
  },
  height: 500
};
vegaEmbed("#view2", vis2, embedOptions);

/* -----------------------------
   Visualization 3 — Grouped bars
----------------------------- */
const vis3 = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  data: { url: "dataset/videogames_long.csv" },
  config: gameConfig,
  autosize: { type: "fit", contains: "padding" },
  title: "Regional Platform Popularity",
  mark: { type: "bar", cornerRadiusTopLeft: 4, cornerRadiusTopRight: 4 },
  encoding: {
    x: { field: "platform", type: "nominal", title: "Platform" },
    y: { aggregate: "sum", field: "sales_amount", type: "quantitative", title: "Sales (Millions)" },
    color: { field: "sales_region", type: "nominal", scale: { scheme: "category10" }, title: "Region" },
    tooltip: [
      { field: "platform", type: "nominal" },
      { field: "sales_region", type: "nominal" },
      { aggregate: "sum", field: "sales_amount", type: "quantitative", title: "Sales (Millions)" }
    ]
  },
  height: 400
};
vegaEmbed("#view3", vis3, embedOptions);

/* -----------------------------
   Visualization 4 — Stacked bars
----------------------------- */
const vis4 = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",

  config: {
    ...gameConfig,

    // Make the region labels white (this was the original request)
    header: {
      labelColor: "#ffffff",
      titleColor: "#ffffff",
      labelFont: "monospace",
      titleFont: "monospace"
    },

    // Remove extra spacing that was pushing charts out
    view: { stroke: null }
  },

  data: { url: "dataset/videogames_long.csv" },

  title: "Genre Contribution by Region",

  facet: {
    field: "sales_region",
    type: "nominal",
    columns: 3   // keeps them in one row
  },

  spec: {
    width: 180,   // KEY: fixed internal size (prevents overflow)
    height: 180,

    mark: {
      type: "arc",
      innerRadius: 50,
      outerRadius: 80,
      stroke: "#0b0f1a",
      strokeWidth: 2
    },

    encoding: {
      theta: {
        aggregate: "sum",
        field: "sales_amount",
        type: "quantitative"
      },

      color: {
        field: "genre",
        type: "nominal",
        title: "Genre"
      },

      tooltip: [
        { field: "sales_region", title: "Region" },
        { field: "genre", title: "Genre" },
        {
          aggregate: "sum",
          field: "sales_amount",
          type: "quantitative",
          title: "Sales (Millions)"
        }
      ]
    }
  }
};

vegaEmbed("#view4", vis4, embedOptions);
