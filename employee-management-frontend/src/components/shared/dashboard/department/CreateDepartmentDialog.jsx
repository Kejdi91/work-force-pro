import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"

import { Button } from "@/components/ui/button"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

import { useDispatch } from "react-redux"

import {Plus} from "lucide-react"
import { toast } from "sonner"
import { useState } from "react"
import { addDepartment } from "../../../../store/departmentsSlice"

const formSchema = z.object({
    name: z.string().min(2,{message:"Name of department must be at least 2 characters long."})
})

const CreateDepartmentDialog = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues:{
        name:""
    }
  });

  const onSubmit = async (data) => {
    setLoading(true);                                              
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/departments/create `,{
        method: "POST",
        headers: {
          "Content-Type" : "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data)
      })

      if(!response.ok){
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create department")
      }

      const result = await response.json();

      dispatch(addDepartment(result))
      toast.success("Success", { description: `Department "${result.name}" created successfully`,});

      form.reset();
    } catch (error) {
      toast.error("Error", {description: error.message});
    }finally{
      setLoading(false);
    }
    
    
  }
  
    return (
    <Dialog>
      <DialogTrigger asChild>
        <Button><Plus/>Create new department</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create new department</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Department name</FormLabel>
              <FormControl>
                <Input placeholder="Enter department name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button type="submit" disable={loading}>{loading ? "Creating..." : "Save changes"}</Button>
        </DialogFooter>
      </form>
    </Form>
    </DialogContent>
    </Dialog>
  )
}
export default CreateDepartmentDialog