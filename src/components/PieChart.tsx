import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff8042",
  "#8dd1e1",
  "#a4de6c",
];

type PieChartProps = {
  title: string;
  data: Record<string, number>;
};

export const PieChartComponent = ({ title, data }: PieChartProps) => {
  const chartData = Object.entries(data).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="w-[300px] p-5">
      <h1 className="text-center text-primary mb-2 font-medium">{title}</h1>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
          >
            {chartData.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const { name, value } = payload[0];
                return (
                  <div className="bg-card border border-border rounded-md p-2 shadow-sm text-sm h-8 overflow-hidden">
                    <strong>{name}</strong>: {value}
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend
            verticalAlign="bottom"
            height={20}
            content={({ payload }) => (
              <div className="flex flex-wrap gap-x-2 justify-center text-sm truncate">
                {payload &&
                  payload.map((entry, index) => (
                    <span
                      key={`item-${index}`}
                      className="truncate max-w-[100px]"
                    >
                      <span
                        className="inline-block w-3 h-3 rounded-sm mr-1"
                        style={{ backgroundColor: entry.color }}
                      />
                      {entry.value}
                    </span>
                  ))}
              </div>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
