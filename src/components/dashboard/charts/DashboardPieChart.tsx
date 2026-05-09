'use client';

import {
  Pie,
  PieChart,
  Cell,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface DataPoint {
  name: string;
  value: number;
  fill?: string;
}

interface DashboardPieChartProps {
  title: string;
  description?: string;
  data: DataPoint[];
  config: ChartConfig;
  dataKey: string;
  nameKey: string;
}

export function DashboardPieChart({
  title,
  description,
  data,
  config,
  dataKey,
  nameKey,
}: DashboardPieChartProps) {
  return (
    <Card className="border-border shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ChartContainer config={config} className="h-[300px] w-full">
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={data}
              dataKey={dataKey}
              nameKey={nameKey}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.fill || `var(--color-${entry.name.toLowerCase().replace(/_/g, '-')})`} 
                />
              ))}
            </Pie>
            <ChartLegend content={<ChartLegendContent />} className="mt-4" />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
