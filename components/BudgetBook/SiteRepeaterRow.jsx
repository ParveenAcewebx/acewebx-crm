"use client";

import { useEffect } from "react";
import { useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import FormInputField from "../share/form/FormInputField";

// Define default row values
const defaultRow = {
  name: "",
  qty: "",
  gsqft: "",
  tsqft: "",
  csqft: "0.0000",
  psqft: "0.00",
  cost: "0.00",
  ctotal: "0.00",
  csw: "0.00",
  cup: "0.00",
  csp: "0.00",
  cmc: "0.00",
  pbsw: "0.00",
  pbup: "0.00",
  pbsp: "0.00",
  pbmc: "0.00",
  pbtot: "0.00",
  ptot: "0.00",
  psw: "0.00",
  pup: "0.00",
  psp: "0.00",
  pmc: "0.00",
};

export default function SiteRepeaterTable({ form }) {
  const { control, getValues } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "sites", // ✅ make sure this matches your form defaultValues
  });

  // ✅ Append only if no data in defaultValues
  useEffect(() => {
    const existing = getValues("sites");
    if (!existing || existing.length === 0) {
      append(defaultRow);
    }
  }, []);

  return (
    <>
      <div className="overflow-auto border rounded-md">
        <table className="min-w-full text-[10px] border">
          <thead className="bg-gray-100">
            <tr>
              <th rowSpan={2}></th>
              <th rowSpan={2}>NAME</th>
              <th rowSpan={2}>QTY</th>
              <th rowSpan={2}>GSQFT</th>
              <th rowSpan={2}>TSQFT</th>
              <th rowSpan={2}>CSQFT</th>
              <th rowSpan={2}>PSQFT</th>
              <th rowSpan={2}>COST</th>
              <th rowSpan={2}>CTOTAL</th>
              <th colSpan={4} className="text-center">GENERAL DATA</th>
              <th colSpan={5} className="text-center">PRICE/BLDG</th>
              <th colSpan={6} className="text-center">ALL BLDG TYPE</th>
            </tr>
            <tr>
              <th>C.SW</th>
              <th>C.UP</th>
              <th>C.SP</th>
              <th>C.MC</th>
              <th>PB.SW</th>
              <th>PB.UP</th>
              <th>PB.SP</th>
              <th>PB.MC</th>
              <th>PB.TOT</th>
              <th>PTOT</th>
              <th>P.SW</th>
              <th>P.UP</th>
              <th>P.SP</th>
              <th>P.MC</th>
            </tr>
          </thead>
          <tbody>
            {fields.map((_, index) => (
              <tr key={_.id} className="text-center">
                <td>
                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      className="h-6 w-6 p-0"
                      onClick={() => remove(index)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  )}
                </td>
                {Object.keys(defaultRow).map((key) => (
                  <td key={key}>
                    <FormInputField
                      name={`sites.${index}.${key}`}
                      className="h-6 px-1 text-[10px]"
                      inputMode="decimal"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-3">
        <Button
          type="button"
          onClick={() => append(defaultRow)}
          className="text-xs"
        >
          Add More
        </Button>
      </div>
    </>
  );
}
