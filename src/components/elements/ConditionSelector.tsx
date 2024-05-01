import React, { useState } from "react";

const ConditionSelector: React.FC = () => {
  const [productConditions, setProductConditions] = useState<{ [key: string]: string }>({
    Mouse: "",
    Keyboard: "",
    Monitor: "",
    CPU: ""
  });

  const conditions = ["Good", "Bad","Average"];

  const handleConditionChange = (productId: string, condition: string) => {
    setProductConditions(prevConditions => ({
      ...prevConditions,
      [productId]: condition
    }));
  };

  return (
    <table className="border-collapse ">
      <thead>
        <tr>
          <th className="px-4 py-2">Product</th>
          {conditions.map(condition => (
            <th key={condition} className="px-8 py-2">{condition}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Object.entries(productConditions).map(([product, selectedCondition]) => (
          <tr key={product}>
            <td className=" px-8 py-2">{product}</td>
            {conditions.map(condition => (
              <td key={`${product}-${condition}`} className=" px-12 py-2">
                <input
                  id={`${product}-${condition}`}
                  type="radio"
                  value={condition}
                  name={`${product}-condition`}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  checked={selectedCondition === condition}
                  onChange={() => handleConditionChange(product, condition)}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ConditionSelector;
