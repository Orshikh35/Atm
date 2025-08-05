import { TooltipProps } from "recharts";

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length > 0) {
    const itemMap: { [key: string]: string } = {
      pendingCount: "Хүлээгдэж буй",
      inProgressCount: "Хэрэгжиж буй",
      completedCount: "Дууссан",
      cancelledCount: "Цуцлагдсан",
      testingCount: "Тест хийгдэж буй",
    };

    return (
      <div className="bg-gray-800 text-white text-sm p-3 rounded-md shadow-md border border-white/10 hover:bg-none">
        <p className="text-blue-300 font-semibold mb-1">{label}</p>
        <ul className="space-y-1">
          {payload.map((entry, index) => (
            <li key={index} className="flex justify-between gap-2">
              <span>{itemMap[entry.dataKey as string]}</span>
              <span className="font-bold">{entry.value}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return null;
};
export default CustomTooltip;