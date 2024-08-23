import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  LabelList,
  ResponsiveContainer,
} from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useBenchmarkFilters } from "@/services/state/benchmarksStore";
import { useMemo } from "react";

type TestData = {
  combinedScore: number;
  requestsSec: number;
  latency: number;
  cpuUtilization: number;
  memoryUtilization: number;
};

type TestTypes = "all" | "cpuBound"; // Add other test types as needed
type Metrics = keyof TestData;

interface Filters {
  testType: TestTypes;
  metrics: Metrics;
}

const chartData = [
  {
    stackName: "Golang",
    points: 275,
    fill: "var(--color-go)",
    position: 1,
    language: "go",
    testData: {
      all: {
        name: "all",
        combinedScore: 175,
        requestsSec: 80000,
        latency: 0.1,
        cpuUtilization: 0.1,
        memoryUtilization: 0.1,
      },
      cpuBound: {
        name: "CPU-bound",
        combinedScore: 275,
        requestsSec: 80000,
        latency: 0.1,
        cpuUtilization: 0.1,
        memoryUtilization: 0.1,
      },
    },
  },
  {
    stackName: "Python+FastAPi+Redis+Guinicorn",
    points: 200,
    fill: "var(--color-python)",
    positon: 2,
    language: "python",
    testData: {
      all: {
        name: "All",
        combinedScore: 275,
        requestsSec: 30000,
        latency: 0.1,
        cpuUtilization: 0.1,
        memoryUtilization: 0.1,
      },
      cpuBound: {
        name: "CPU-bound",
        combinedScore: 275,
        requestsSec: 8000000000000,
        latency: 0.1,
        cpuUtilization: 0.1,
        memoryUtilization: 0.1,
      },
    },
  },
  {
    stackName: "Golang+Gin",
    points: 187,
    fill: "var(--color-go)",
    position: 3,
    language: "go",
    testData: {
      all: {
        name: "All",
        combinedScore: 225,
        requestsSec: 20000,
        latency: 0.1,
        cpuUtilization: 0.1,
        memoryUtilization: 0.1,
      },
      cpuBound: {
        name: "CPU-bound",
        combinedScore: 275,
        requestsSec: 80000,
        latency: 0.1,
        cpuUtilization: 0.1,
        memoryUtilization: 0.1,
      },
    },
  },
  {
    stackName: "Python+Flask",
    points: 173,
    fill: "var(--color-python)",
    position: 4,
    language: "python",
    testData: {
      all: {
        name: "All",
        combinedScore: 375,
        requestsSec: 10000,
        latency: 0.1,
        cpuUtilization: 0.1,
        memoryUtilization: 0.1,
      },
      cpuBound: {
        name: "CPU-bound",
        combinedScore: 275,
        requestsSec: 80000,
        latency: 0.1,
        cpuUtilization: 0.1,
        memoryUtilization: 0.1,
      },
    },
  },
];

const chartConfig = {
  combinedScore: {
    label: "Points",
  },
  requestsSec: {
    label: "Req/s",
  },
  latency: {
    label: "%",
  },
  cpuUtilization: {
    label: "%",
  },
  memoryUtilization: {
    label: "%",
  },
} satisfies ChartConfig;

export function LeaderBoardChart() {
  const { filters } = useBenchmarkFilters() as { filters: Filters };

  const dataBasedOnFilters = useMemo(() => {
    const newChartData = [];
    for (const data of chartData) {
      // take the data based on the filters and puch it to newChartData like `bellow
      // stackname, fill, language, score (based on filters) label (based on filters)
      newChartData.push({
        stackName: data.stackName,
        fill: data.fill,
        language: data.language,
        score: data.testData[filters.testType]?.[filters.metrics],
        metrics: filters.metrics,
        testType: filters.testType,
      });
    }
    newChartData.sort((a, b) => b.score - a.score);
    return newChartData;
  }, [filters, chartData]);

  return (
    <Card className="border-none ">
      <CardContent>
        <ResponsiveContainer width="100%" height={chartData.length * 50}>
          <ChartContainer config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={[...dataBasedOnFilters]}
              layout="vertical"
              margin={{
                left: 25,
                right: 65,
                top: 40,
                bottom: 40,
              }}
              maxBarSize={60}
            >
              <YAxis
                dataKey="language"
                type="category"
                tickLine={false}
                axisLine={false}
                interval={0}
                tick={(value) => (
                  <Image position={value.y} lang={value.payload.value} />
                )}
              />
              <XAxis dataKey={(x) => x.score} type="number" hide />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    hideLabel
                    indicator="line"
                    labelKey="testType"
                    nameKey="metrics"
                  />
                }
              />
              <Bar dataKey={(x) => x.score} layout="vertical" radius={8}>
                <LabelList
                  dataKey="stackName"
                  position="insideLeft"
                  offset={8}
                  className="fill-[--color-label]"
                  fontSize={20}
                />
                <LabelList
                  dataKey="score"
                  position="right"
                  offset={8}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </ResponsiveContainer>
      </CardContent>
      {/* <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total points for the last 6 months
        </div>
      </CardFooter> */}
    </Card>
  );
}

function Image({ position, lang }: { position: number; lang: string }) {
  // do it with g
  console.log(lang);
  var icon, height, width, offset, leftOffset;
  if (lang === "python") {
    icon = "https://quantumzeitgeist.com/wp-content/uploads/pythoned.png";
    height = "30px";
    width = "30px";
    offset = 14;
    leftOffset = 35;
  } else if (lang === "go") {
    icon = "https://go.dev/blog/go-brand/Go-Logo/SVG/Go-Logo_Blue.svg";
    height = "60px";
    width = "60px";
    offset = 30;
    leftOffset = 15;
  } else {
    icon = "https://go.dev/blog/go-brand/Go-Logo/SVG/Go-Logo_Blue.svg";
    height = "60px";
    width = "60px";
    offset = 30;
    leftOffset = 20;
  }

  return (
    <g transform={`translate(${leftOffset},${position - offset})`}>
      <image
        xlinkHref={icon}
        x={0}
        y={0}
        height={height}
        width={width}
        textAnchor="middle"
        fill="#666"
      />
    </g>
  );
}
