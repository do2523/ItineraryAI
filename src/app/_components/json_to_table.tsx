import { Fragment } from "react";

export interface data {
  day: string;
  activities: {
    cost: string;
    description: string;
    name: string;
    time: string;
  }[];
}

export default function Table({ json }: { json: data[] }) {
  return (
    <div className="mx-auto max-w-[80rem] rounded-lg bg-white p-0 shadow-lg">
      {json.map((items) => (
        <Fragment key={items.day}>
          <div className="mb-4 rounded-md bg-[#334155] px-4 py-4">
            <h2 className="text-2xl font-semibold text-white">
              {items.day.toUpperCase()}
            </h2>
          </div>
          <table className="w-full border-collapse text-xl">
            <tbody>
              {items.activities.map((item) => (
                <tr key={item.description} className="border-b border-gray-300">
                  <td className="min-w-[150px] p-4 text-left text-gray-600">
                    {item.time}
                  </td>
                  <td className="p-4 text-left font-semibold text-gray-800">
                    {item.name}
                  </td>
                  <td className="min-w-[100px] p-4 text-left text-gray-500">
                    {item.cost === "Free" ? "Free" : `$${item.cost}`}
                  </td>
                  <td className="p-4 text-left text-gray-600">
                    {item.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mb-3"></div>
        </Fragment>
      ))}
    </div>
  );
}
