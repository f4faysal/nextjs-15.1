"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Role } from "@prisma/client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { createUser, deactivateUser } from "@/lib/action/createUser";

const createUserSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .optional(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .optional(),
  role: z.nativeEnum(Role),
});

const deactivateUserSchema = z.object({
  userId: z.string().uuid({ message: "Invalid user ID" }),
});

export function UserManagementForm({ adminId }: { adminId: string }) {
  const [formType, setFormType] = useState<"create" | "deactivate">("create");

  const createUserForm = useForm<z.infer<typeof createUserSchema>>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      role: Role.user,
    },
  });

  const deactivateUserForm = useForm<z.infer<typeof deactivateUserSchema>>({
    resolver: zodResolver(deactivateUserSchema),
    defaultValues: {
      userId: "",
    },
  });

  async function onCreateUserSubmit(data: z.infer<typeof createUserSchema>) {
    try {
      const newUser = await createUser({ ...data, createdBy: adminId });
      toast({
        title: "User created successfully",
        description: `New user ${newUser.email} has been created.`,
      });
      createUserForm.reset();
    } catch (error) {
      toast({
        title: "Error creating user",
        description:
          error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    }
  }

  async function onDeactivateUserSubmit(
    data: z.infer<typeof deactivateUserSchema>
  ) {
    try {
      await deactivateUser(data.userId, adminId);
      toast({
        title: "User deactivated successfully",
        description: `User with ID ${data.userId} has been deactivated.`,
      });
      deactivateUserForm.reset();
    } catch (error) {
      toast({
        title: "Error deactivating user",
        description:
          error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex space-x-4">
        <Button
          onClick={() => setFormType("create")}
          variant={formType === "create" ? "default" : "outline"}
        >
          Create User
        </Button>
        <Button
          onClick={() => setFormType("deactivate")}
          variant={formType === "deactivate" ? "default" : "outline"}
        >
          Deactivate User
        </Button>
      </div>

      {formType === "create" && (
        <Form {...createUserForm}>
          <form
            onSubmit={createUserForm.handleSubmit(onCreateUserSubmit)}
            className="space-y-4"
          >
            <FormField
              control={createUserForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="user@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={createUserForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={createUserForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password (Optional)</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormDescription>
                    Leave blank for passwordless account
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={createUserForm.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={Role.user}>User</SelectItem>
                      <SelectItem value={Role.admin}>Admin</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Create User</Button>
          </form>
        </Form>
      )}

      {formType === "deactivate" && (
        <Form {...deactivateUserForm}>
          <form
            onSubmit={deactivateUserForm.handleSubmit(onDeactivateUserSubmit)}
            className="space-y-4"
          >
            <FormField
              control={deactivateUserForm.control}
              name="userId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User ID</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter user ID to deactivate"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" variant="destructive">
              Deactivate User
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
}
