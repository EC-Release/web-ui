import React from "react";

export default class Dashboard extends React.Component {
  /* istanbul ignore next */
  componentDidMount() {
        this.highChart();
  }

  /* istanbul ignore next */
  highChart() {
    Highcharts.chart("pieChart", {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: "pie",
      },
      title: {
        text: "Browser market shares in January, 2018",
      },
      tooltip: {
        pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
      },
      accessibility: {
        point: {
          valueSuffix: "%",
        },
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          dataLabels: {
            enabled: true,
            format: "<b>{point.name}</b>: {point.percentage:.1f} %",
          },
        },
      },
      series: [
        {
          name: "Brands",
          colorByPoint: true,
          data: [
            {
              name: "Chrome",
              y: 61.41,
              sliced: true,
              selected: true,
            },
            {
              name: "Internet Explorer",
              y: 11.84,
            },
            {
              name: "Firefox",
              y: 10.85,
            },
            {
              name: "Edge",
              y: 4.67,
            },
            {
              name: "Safari",
              y: 4.18,
            },
            {
              name: "Sogou Explorer",
              y: 1.64,
            },
            {
              name: "Opera",
              y: 1.6,
            },
            {
              name: "QQ",
              y: 1.2,
            },
            {
              name: "Other",
              y: 2.61,
            },
          ],
        },
      ],
    });

    Highcharts.chart("lineChart", {
      title: {
        text: "Solar Employment Growth by Sector, 2010-2016",
      },

      subtitle: {
        text: "Source: thesolarfoundation.com",
      },

      yAxis: {
        title: {
          text: "Number of Employees",
        },
      },

      xAxis: {
        accessibility: {
          rangeDescription: "Range: 2010 to 2017",
        },
      },

      legend: {
        layout: "vertical",
        align: "right",
        verticalAlign: "middle",
      },

      plotOptions: {
        series: {
          label: {
            connectorAllowed: false,
          },
          pointStart: 2010,
        },
      },

      series: [
        {
          name: "Installation",
          data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175],
        },
        {
          name: "Manufacturing",
          data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434],
        },
        {
          name: "Sales & Distribution",
          data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387],
        },
        {
          name: "Project Development",
          data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227],
        },
        {
          name: "Other",
          data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111],
        },
      ],

      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500,
            },
            chartOptions: {
              legend: {
                layout: "horizontal",
                align: "center",
                verticalAlign: "bottom",
              },
            },
          },
        ],
      },
    });

    Highcharts.chart("barChart", {
      chart: {
        type: "column",
      },

      title: {
        text: "Total fruit consumption, grouped by gender",
      },

      xAxis: {
        categories: ["Apples", "Oranges", "Pears", "Grapes", "Bananas"],
      },

      yAxis: {
        allowDecimals: false,
        min: 0,
        title: {
          text: "Number of fruits",
        },
      },

      tooltip: {
        formatter: function () {
          return (
            "<b>" +
            this.x +
            "</b><br/>" +
            this.series.name +
            ": " +
            this.y +
            "<br/>" +
            "Total: " +
            this.point.stackTotal
          );
        },
      },

      plotOptions: {
        column: {
          stacking: "normal",
        },
      },

      series: [
        {
          name: "John",
          data: [5, 3, 4, 7, 2],
          stack: "male",
        },
        {
          name: "Joe",
          data: [3, 4, 4, 2, 5],
          stack: "male",
        },
        {
          name: "Jane",
          data: [2, 5, 6, 2, 1],
          stack: "female",
        },
        {
          name: "Janet",
          data: [3, 0, 4, 4, 3],
          stack: "female",
        },
      ],
    });
  }

  render() {
    /* jshint ignore:start */
    /* istanbul ignore next */
    return (
      /* istanbul ignore next */
      <div className="Dashboard row mt-4">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <div id="lineChart"></div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <div id="barChart"></div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <div id="pieChart"></div>
            </div>
          </div>
        </div>
      </div>
    );
    /* jshint ignore:end */
  }
}
