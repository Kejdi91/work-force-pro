import React, { useState, useEffect } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useParams } from 'react-router-dom'

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
});

const EditDepartmentCard = () => {
  const { id } = useParams(); // corrected
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "" },
  });

  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/departments/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to load department");
        }

        const data = await response.json();
        form.setValue("name", data.name);
      } catch (error) {
        toast.error("Error", { description: error.message });
      }
    };

    fetchDepartment();
  }, [id, form]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/departments/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to update department.");
      }

      const result = await response.json();

      toast.success("Success", {
        description: `Department "${result.name}" updated successfully`,
      });

      form.reset({ name: result.name });
    } catch (error) {
      toast.error("Error", {
        description: error.message || "Failed to update department",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="lg:w-96 w-full">
      <CardHeader>
        <CardTitle>Edit Department</CardTitle>
        <CardDescription>Update the department's name below</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Department Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update Department"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default EditDepartmentCard;
