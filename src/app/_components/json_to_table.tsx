import { Fragment } from "react";

export interface data {
  day: string,
  activities: {
    cost: string,
    description: string,
    name: string,
    time: string,
  }[]
}

export default function Table({ json }: { json: data[] }) {
  return (
    <div className="max-w-[80rem] mx-auto bg-white rounded-lg shadow-lg p-0">
      {json.map((items) => (
        <Fragment key={items.day}>
          <div className="bg-[#334155] rounded-md py-4 px-4 mb-4">
            <h2 className="text-2xl font-semibold text-white">{items.day.toUpperCase()}</h2>
          </div>
          <table className="w-full border-collapse text-xl">
            <tbody>
              {items.activities.map((item) => (
                <tr key={item.description} className="border-b border-gray-300">
                  <td className="p-4 text-left text-gray-600 min-w-[150px]">
                    {item.time}
                  </td>
                  <td className="p-4 text-left text-gray-800 font-semibold">
                    {item.name}
                  </td>
                  <td className="p-4 text-left text-gray-500 min-w-[100px]">
                    {item.cost === "Free" ? "Free" : item.cost.startsWith("$")  ? item.cost : `$${item.cost}`}
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
