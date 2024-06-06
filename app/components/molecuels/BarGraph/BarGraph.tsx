const generateYAxis = (data: BarGraphDataRowInterface[]) => {
  const yAxisLabels = [];
  const highestRecord = Math.max(...data.map((row) => row.value));
  const topLabel = Math.ceil(highestRecord / 1000) * 1000;

  for (let i = topLabel; i >= 0; i -= 1000) {
    yAxisLabels.push(`${i / 1000}K`);
  }

  return { yAxisLabels, topLabel };
};

type BarGraphProps = {
  data: BarGraphDataRowInterface[];
  height?: number;
};

export interface BarGraphDataRowInterface {
  label: string;
  value: number;
}

export function BarGraph({ data, height = 350 }: BarGraphProps) {
  const { yAxisLabels, topLabel } = generateYAxis(data);

  return (
    <div className="mt-0 grid grid-cols-12 items-end gap-2 rounded-md bg-white p-4 sm:grid-cols-13 md:gap-4">
      <div
        className="mb-6 hidden flex-col justify-between text-sm text-gray-400 sm:flex"
        style={{ height: `${height}px` }}
      >
        {yAxisLabels.map((label) => (
          <p key={label}>{label}</p>
        ))}
      </div>

      {data.map((row) => (
        <div key={row.label} className="flex flex-col items-center gap-2">
          <div
            className="w-full rounded-md bg-blue-300"
            style={{
              height: `${(height / topLabel) * row.value}px`,
            }}
            data-testid="graph-bar"
          ></div>
          <p className="-rotate-90 text-sm text-gray-400 sm:rotate-0">
            {row.label.slice(4, 6)}
          </p>
        </div>
      ))}
    </div>
  );
}
