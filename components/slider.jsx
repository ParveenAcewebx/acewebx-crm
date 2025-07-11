import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";



export function SliderDemo({ form, name, label, ...props }) {
  const rawValue = form.watch(name)?? 50;
  const value = Array.isArray(rawValue) ? rawValue[0] : (rawValue ?? 50); // Ensure it's a number

  return (
    <div className="flex flex-col gap-2">
      {label && <label className="text-sm font-medium">{label}</label>}
      <Slider
        defaultValue={50}
        value={[value]}
        max={100}
        step={1}
        className={cn("w-[60%]")}
        onValueChange={(newValue) => form.setValue(name, newValue[0])}

        {...props}
      />
      <span className="text-sm text-gray-500">Selected Value: {value}</span>
    </div>
  );
}
