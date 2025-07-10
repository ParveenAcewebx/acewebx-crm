import { useFormContext } from 'react-hook-form';
import FormInputField from '../share/form/FormInputField';

const ADDERS = ['DESIGN', 'ENGINEERING', 'BUDGET', 'SHIPPING', 'MISC'];

export const AddersReference = () => {
  const { watch } = useFormContext();

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr>
            <th className="text-left px-2 py-1">%</th>
            <th className="text-left px-2 py-1">$</th>
            <th className="text-left px-2 py-1">HR</th>
            <th className="text-left px-2 py-1">HRS</th>
          </tr>
        </thead>
        <tbody>
          {ADDERS.map((adder, index) => {
            const baseName = `adders.${index}`;
            return (
              <tr key={adder} className="border-t">
                {/* % Input */}
                <td className="px-2 py-1">
                  <FormInputField
                    name={`${baseName}.percentage`}
                    type="number"
                    className="text-right w-24"
                    prefix="%"
                    suffix={adder}
                  />
                </td>

                {/* $ Calculated */}
                <td className="px-2 py-1">
                  <FormInputField
                    name={`${baseName}.amount`}
                    type="text"
                    className="text-right w-28 bg-gray-100"
                    readOnly
                    prefix="$"
                  />
                </td>

                {/* HR Input */}
                <td className="px-2 py-1">
                  <FormInputField
                    name={`${baseName}.hr`}
                    type="number"
                    className="text-right w-24"
                    suffix="HR"
                  />
                </td>

                {/* HRS Calculated */}
                <td className="px-2 py-1">
                  <FormInputField
                    name={`${baseName}.hrs`}
                    type="text"
                    className="text-right w-24 bg-gray-100"
                    readOnly
                    suffix="HRS"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
