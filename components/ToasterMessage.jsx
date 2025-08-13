import { toast } from "@/hooks/use-toast";

export const errorMessage = ({description}) => {
  toast({
    title: "Error",
    description: description,
    variant: "destructive",
  });
};

export const successMessage = ({description}) => {
  toast({
    title: "Success",
    description: description,
  });
};
