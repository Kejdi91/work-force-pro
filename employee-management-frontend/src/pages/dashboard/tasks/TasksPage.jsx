import React from 'react'
import DashboardLayout from '../DashboardLayout'
import Header from '../../../components/shared/dashboard/Header'
import {Button} from "@/components/ui/button"
import { Plus } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import TasksDeleteButton from '../../../components/shared/dashboard/tasks/TasksDeleteButton'

const tasks = [
  {
    id: "INV001",
    status: "Paid",
    title: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    id: "INV002",
    status: "Pending",
    title: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    id: "INV003",
    status: "Unpaid",
    title: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    id: "INV004",
    status: "Paid",
    title: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    id: "INV005",
    status: "Paid",
    title: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    id: "INV006",
    status: "Pending",
    title: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    id: "INV007",
    status: "Unpaid",
    title: "$300.00",
    paymentMethod: "Credit Card",
  },
]

const TasksPage = () => {
  return (
    <>
    <DashboardLayout>
      <Header title="Task Manager" subtitle="Here you can manage all the tasks">
        <Button>Create New Task <Plus/></Button>
      </Header>
    </DashboardLayout>

     <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Task</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task) => (
          <TableRow  key={task.id}>
            <TableCell className="font-medium">{task.title}</TableCell>
            <TableCell>{task.status}</TableCell> 
            <TableCell>{task.status}</TableCell>  
            <TableCell>{task.priority}</TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end space-x-2">
              <Button>Edit</Button>
              <TasksDeleteButton />
              </div>
            </TableCell>

          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
    </>
  )
}

export default TasksPage