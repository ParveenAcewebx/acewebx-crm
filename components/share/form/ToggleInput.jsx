import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const ToggleOption = ({ label, name, checked, onChange }) => {
  return (
    <div className="flex items-center space-x-2 py-1">
      <Switch id={name} checked={checked} onCheckedChange={onChange} />
      <Label htmlFor={name} className="text-sm">
        {label}
      </Label>
    </div>
  );
};

export default ToggleOption;
