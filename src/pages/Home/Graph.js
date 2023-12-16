import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function GraphComponent({ commissionGraph, licenseGraph }) {
  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let graphArr = [];
  for (let i = 0; i < month.length; i++) {
    const obj1 = {
      name: month[i],
      license: licenseGraph[i],
      commission: commissionGraph[i],
    };
    graphArr.push(obj1);
  }

  return (
    <LineChart
      width={600}
      height={380}
      data={graphArr}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis yAxisId="left" />
      <YAxis yAxisId="right" orientation="right" />
      <Tooltip />
      <Legend />
      <Line
        yAxisId="left"
        type="monotone"
        dataKey="license"
        stroke="#8884d8"
        activeDot={{ r: 6 }}
      />
      <Line
        yAxisId="right"
        type="monotone"
        dataKey="commission"
        stroke="#82ca9d"
        activeDot={{ r: 6 }}
      />
    </LineChart>
  );
}

// import CanvasJSReact from "@canvasjs/react-charts";

// var CanvasJSChart = CanvasJSReact.CanvasJSChart;

// export default function GraphComponent({ commissionGraph, licenseGraph }) {
//   //   console.log("hi", licenseGraph);
//   //   console.log(commissionGraph);
//   const month = [
//     "Jan",
//     "Feb",
//     "Mar",
//     "Apr",
//     "May",
//     "Jun",
//     "Jul",
//     "Aug",
//     "Sep",
//     "Oct",
//     "Nov",
//     "Dec",
//   ];
//   let commissionArray = [];
//   let licenseArray = [];
//   for (let i = 0; i < month.length; i++) {
//     const obj1 = { y: commissionGraph[i], label: month[i] };
//     commissionArray.push(obj1);

//     const obj2 = { y: licenseGraph[i], label: month[i] };
//     licenseArray.push(obj2);
//   }
//   console.log(licenseArray);
//   const options = {
//     animationEnabled: true,
//     // title: {
//     //     text: "Number of New Customers"
//     // },
//     // axisY: {
//     //     title: "Number of Customers"
//     // },
//     toolTip: {
//       shared: true,
//     },
//     data: [
//       {
//         type: "spline",
//         name: "license",
//         showInLegend: true,
//         dataPoints: licenseArray,
//       },
//       {
//         type: "spline",
//         name: "commission",
//         showInLegend: true,
//         dataPoints: commissionArray,
//       },
//     ],
//   };

//   return (
//     <div>
//       <CanvasJSChart
//         options={options}
//         /* onRef={ref => this.chart = ref} */
//       />
//       {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
//     </div>
//   );
// }
