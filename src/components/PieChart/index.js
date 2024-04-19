/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-array-index-key */

import {
  PieChart as PieChartComponent,
  Pie,
  Cell,
  Legend,
  Tooltip,
} from 'reactCharts'

import './index.css'

const COLORS = ['blue', 'orange', 'yellow']
const PieChart = props => {
  const {data} = props

  return (
    <div className="pie-chart-bg-container">
      <PieChart width={730} height={250}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#82ca9d"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend verticalAlign="bottom" height={36} />
      </PieChart>
    </div>
  )
}

export default PieChart
