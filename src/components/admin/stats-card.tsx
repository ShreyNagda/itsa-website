import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

interface AdminStatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export default function AdminStatsCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
}: AdminStatsCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="font-manrope text-sm font-medium">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="font-geist text-2xl font-bold">{value}</div>
        {description && (
          <p className="font-manrope text-xs text-muted-foreground">
            {description}
          </p>
        )}
        {trend && (
          <p
            className={`font-manrope text-xs ${
              trend.isPositive ? "text-secondary" : "text-destructive"
            }`}
          >
            {trend.isPositive ? "+" : ""}
            {trend.value}% from last month
          </p>
        )}
      </CardContent>
    </Card>
  );
}
