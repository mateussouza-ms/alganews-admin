import { Metric } from "ms-alganews-sdk";

export function transformDataIntoAntdChart(
  data: Metric.MonthlyRevenuesExpenses
) {
  return data
    .map((item) => {
      return [
        {
          yearMonth: item.yearMonth,
          value: item.totalRevenues,
          category: "totalRevenues" as any,
        },
        {
          yearMonth: item.yearMonth,
          value: item.totalExpenses,
          category: "totalExpenses",
        },
      ];
    })
    .flat();
}
