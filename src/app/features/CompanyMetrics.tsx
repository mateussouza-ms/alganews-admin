import { Area, AreaConfig } from "@ant-design/charts";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { MetricService } from "ms-alganews-sdk";
import { useEffect, useState } from "react";
import { transformDataIntoAntdChart } from "../../core/utils/transformDataIntoAntdChart";

export function CompanyMetrics() {
  const [data, setData] = useState<
    {
      yearMonth: string;
      value: number;
      category: "totalRevenues" | "totalExpenses";
    }[]
  >([]);

  const config: AreaConfig = {
    data,
    height: 256,
    xField: "yearMonth",
    yField: "value",
    seriesField: "category",
    legend: {
      itemName: {
        formatter: (legend) =>
          legend === "totalRevenues" ? "Receitas" : "Despesas",
      },
    },
    color: ["#0099ff", "#274060"],
    areaStyle: { fillOpacity: 1 },
    yAxis: false,
    xAxis: {
      label: {
        formatter: (item) => format(new Date(item), "MM/yyyy"),
      },
    },
    tooltip: {
      title: (title) => format(new Date(title), "MMMM yyyy", { locale: ptBR }),
      formatter: (data) => {
        return {
          name: data.category === "totalRevenues" ? "Receitas" : "Despesas",
          value: (data.value as number).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
            maximumFractionDigits: 2,
          }),
        };
      },
    },
    point: {
      size: 5,
      shape: "circle",
    },
  };

  useEffect(() => {
    MetricService.getMonthlyRevenuesExpenses()
      .then(transformDataIntoAntdChart)
      .then(setData);
  }, []);
  return <Area {...config} />;
}
