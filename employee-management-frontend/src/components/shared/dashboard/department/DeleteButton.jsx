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

const DeleteButton = ({ departmentId, departmentName, onDeleted }) => {
  const [loading, setLoading] = useState(false);

  const handleDeleteConfirm = async () => {
    setLoading(true);

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Unauthorized", { description: "You are not logged in." });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/departments/delete/${departmentId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to delete department.");
      }

      toast.success("Department Deleted", {
        description: `Department "${departmentName}" has been successfully deleted.`,
      });

      onDeleted(); // call parent callback to refresh list
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Error", {
        description: error.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Trash />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Department</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete{" "}
            <span className="text-primary font-semibold">
              {departmentName}
            </span>{" "}
            department?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleDeleteConfirm} disabled={loading} type="submit" className="destructive">
            {loading ? "Deleting..." : "Confirm Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteButton;
