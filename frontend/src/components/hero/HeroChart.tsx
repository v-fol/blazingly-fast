import { Line, LineChart } from "recharts";

import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";



const chartData = [
  { month: "January", golang: 186, python: 80 },
  { month: "February", golang: 305, python: 200 },
  { month: "March", golang: 237, python: 120 },
  { month: "April", golang: 73, python: 190 },
  { month: "May", golang: 209, python: 130 },
  { month: "June", golang: 214, python: 140 },
];

const chartConfig = {
  golang: {
    label: "Golang",
    color: "var(--chart-6)",
  },
  python: {
    label: "Python",
    color: "var(--chart-7)",
  },
} satisfies ChartConfig;

export function HeroChart() {
  return (
    <Card className="border-none mt-24">
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="golang"
              type="monotone"
              stroke="var(--color-golang)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="python"
              type="monotone"
              stroke="var(--color-python)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
