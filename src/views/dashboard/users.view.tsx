import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { User } from "@/models/user.model";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowDownAz, Ellipsis } from "lucide-react";

const userTableColumns: ColumnDef<User>[] = [
  {
    accessorKey: "cognitoId",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "surname",
    header: "Surname",
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <div>
          Email
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <ArrowDownAz />
          </Button>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: () => {
      return (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open Menu</span>
                <Ellipsis size={4} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Delete User</DropdownMenuItem>
              <DropdownMenuItem>Confirm User</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

const data: User[] = [
  {
    cognitoId: "usr_1a2b3c",
    name: "John",
    surname: "Doe",
    email: "john.doe@gmail.com",
  },
  {
    cognitoId: "usr_4d5e6f",
    name: "Sarah",
    surname: "Williams",
    email: "sarah.williams@yahoo.com",
  },
  {
    cognitoId: "usr_7g8h9i",
    name: "Michael",
    surname: "Johnson",
    email: "michael.johnson@outlook.com",
  },
  {
    cognitoId: "usr_10j11k",
    name: "Emily",
    surname: "Brown",
    email: "emily.brown@gmail.com",
  },
  {
    cognitoId: "usr_12l13m",
    name: "David",
    surname: "Smith",
    email: "david.smith@company.com",
  },
  {
    cognitoId: "usr_14n15o",
    name: "Jessica",
    surname: "Taylor",
    email: "jessica.taylor@gmail.com",
  },
  {
    cognitoId: "usr_16p17q",
    name: "Daniel",
    surname: "Anderson",
    email: "daniel.anderson@outlook.com",
  },
  {
    cognitoId: "usr_18r19s",
    name: "Ashley",
    surname: "Thomas",
    email: "ashley.thomas@yahoo.com",
  },
  {
    cognitoId: "usr_20t21u",
    name: "Chris",
    surname: "Martin",
    email: "chris.martin@gmail.com",
  },
  {
    cognitoId: "usr_22v23w",
    name: "Sophia",
    surname: "Lee",
    email: "sophia.lee@company.com",
  },
];

export default function UsersView() {
  return <DataTable columns={userTableColumns} data={data} />;
}
