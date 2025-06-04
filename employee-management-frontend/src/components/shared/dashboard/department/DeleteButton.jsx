import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogClose
} from "@/components/ui/dialog";
import { toast } from "sonner";
export const DeleteButton = ({departmentId, departmentName, onDeleted}) => {
    const [loading, setLoading] = useState(false);

    const handleDeleteConfirm = async () => {
        setLoading(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/departments/delete/${departmentId}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },               
                }
            );

            if(!response.ok){
                throw new Error("Failed to delete department.");
            }

            toast.success("Department Deleted", {description: `Department "${departmentName}" has been successfully deleted.`});

            onDeleted();

        } catch (error) {
            toast.error("Error", {description: error});
        } finally {
            setLoading(false);
        }
    };

  return (
  <>
    

     <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="icon"><Trash/></Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Department</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {departmentName} department?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleDeleteConfirm} disabled={loading} type="submit">
                {loading ? "Deleting..." : "Confirm Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
    </Dialog>

  </>
  );
};

export default DeleteButton