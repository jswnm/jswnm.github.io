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

const dataUrl = "dataset/videogames_long.csv";

/* Visualization 1 */
const vis1 = vl
  .markBar({ cornerRadiusEnd: 6 })
  .data(dataUrl)
  .title("Global Sales by Genre and Platform")
  .config(gameConfig)
  .encode(
    vl.y().fieldN("genre").sort("-x").title("Genre").axis({ labelLimit: 200 }),
    vl.x()
      .fieldQ("global_sales")
      .aggregate("sum")
      .title("Total Global Sales (Millions)"),
    vl.color().fieldN("platform").title("Platform"),
    vl.tooltip([
      vl.tooltip().fieldN("genre").title("genre"),
      vl.tooltip().fieldN("platform").title("platform"),
      vl.tooltip()
        .fieldQ("global_sales")
        .aggregate("sum")
        .title("Sales (Millions)")
    ])
  )
  .width(650)
  .height({ step: 30 });

vegaEmbed("#view1", vis1.toSpec(), { actions: false });


/* Visualization 2 */
const vis2 = vl
  .markArea({ line: true, interpolate: "monotone" })
  .data(dataUrl)
  .title("Video Game Sales Over Time by Platform and Genre")
  .config(gameConfig)
  .autosize({ type: "fit", contains: "padding" })
  .encode(
    vl.x().fieldO("year").title("Release Year"),
    vl.y()
      .fieldQ("global_sales")
      .aggregate("sum")
      .stack("zero")
      .title("Sales (Millions)"),
    vl.color().fieldN("platform").title("Platform"),
    vl.detail().fieldN("genre"),
    vl.tooltip([
      vl.tooltip().fieldO("year").title("year"),
      vl.tooltip().fieldN("platform").title("platform"),
      vl.tooltip().fieldN("genre").title("genre"),
      vl.tooltip()
        .fieldQ("global_sales")
        .aggregate("sum")
        .title("Sales (Millions)")
    ])
  )
  .height(500);

vegaEmbed("#view2", vis2.toSpec(), embedOptions);


/* Visualization 3 */
const vis3 = vl
  .markBar({ cornerRadiusTopLeft: 4, cornerRadiusTopRight: 4 })
  .data(dataUrl)
  .title("Regional Platform Popularity")
  .config(gameConfig)
  .autosize({ type: "fit", contains: "padding" })
  .encode(
    vl.x().fieldN("platform").title("Platform"),
    vl.y()
      .fieldQ("sales_amount")
      .aggregate("sum")
      .title("Sales (Millions)"),
    vl.color()
      .fieldN("sales_region")
      .title("Region")
      .scale({ scheme: "category10" }),
    vl.tooltip([
      vl.tooltip().fieldN("platform").title("platform"),
      vl.tooltip().fieldN("sales_region").title("region"),
      vl.tooltip()
        .fieldQ("sales_amount")
        .aggregate("sum")
        .title("Sales (Millions)")
    ])
  )
  .height(400);

vegaEmbed("#view3", vis3.toSpec(), embedOptions);


/* Visualization 4 */

const vis4Config = {
  ...gameConfig,
  view: { stroke: null }
};

function donutForRegion(regionKey, titleText) {
  return vl
    .markArc({
      innerRadius: 30,
      outerRadius: 80
    })
    .data({ url: dataUrl })
    .transform(vl.filter(`datum.sales_region === '${regionKey}'`))
    .title({
      text: titleText,
      color: "#ffffff",
      font: "monospace",
      anchor: "middle"
    })
    .encode(
      vl.theta().fieldQ("sales_amount").aggregate("sum"),
      vl.color().fieldN("genre").title("Genre"),
      vl.tooltip([
        vl.tooltip().fieldN("sales_region").title("Region"),
        vl.tooltip().fieldN("genre").title("Genre"),
        vl.tooltip().fieldQ("sales_amount").aggregate("sum").title("Sales (Millions)")
      ])
    )
    .width(150)
    .height(220);
}

const dNA = donutForRegion("na_sales", "North America");
const dEU = donutForRegion("eu_sales", "Europe");
const dJP = donutForRegion("jp_sales", "Japan");
const dOT = donutForRegion("other_sales", "Other");

// horizontal layout
const vis4 = vl
  .hconcat(dNA, dEU, dJP, dOT)
  .title({
    text: "What Genre Each Region Prefers",
    anchor: "middle",
    color: "#00e5ff",
    font: "monospace",
    fontSize: 18,
    offset: 25
  })
  .config(vis4Config);

// render
vegaEmbed("#view4", vis4.toSpec(), embedOptions).catch(console.error);


