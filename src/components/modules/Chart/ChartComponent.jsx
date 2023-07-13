import React from 'react'
import Chart from "react-apexcharts";
import moment from 'moment';
const ChartComponent = ({ data }) => {
  return (
    <Chart
      options={{
        chart: {
          id: "basic-bar",
          animations: {
            initialAnimation: {
              enabled: false
            }
          }
        },
        xaxis: {
          /* type: "datetime", */
          type: "category",
          axisTicks: true,
          /* type: "numeric", */
          /* categories: dates, */
          /* tickAmount: data.length, */
          /* tickAmount: "dataPoints", */
          /* min: data.length, */
          /* max: data.length, */
          labels: {
            /* format: 'dd/MM', */
            /* formatter: val => moment(new Date(val)).format('D/MM'),
            datetimeUTC: false */
            formatter: val => moment(val).format('D/MM')
          },

          /* range: dates.length > 0 ? dates.length : undefined */
        },
        yaxis: {
          labels: {
            formatter: function (val, index) {
              return val.toFixed(2);
            }
          }
        }
      }}
      series={[
        {
          name: "Precio $/oz",
          data: data
        }
      ]}
      type="line"
      width="800"
    />
  )
}

export default ChartComponent