import { toast } from "@/hooks/use-toast";

export const errorMessage = ({description}) => {
  console.log("description",description)
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
