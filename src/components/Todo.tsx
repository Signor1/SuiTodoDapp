import { AlertDialog, Box, Button, Card, Dialog, Flex, Text, TextField } from "@radix-ui/themes"
import { useState } from "react";
import useUpdateTodo from "../hooks/useUpdateTodo";
import useDeleteTodo from "../hooks/useDeleteTodo";
import useCompleteTodo from "../hooks/useCompleteTodo";

interface Todo {
    id: string;
    task: string;
    completed: boolean;
}

const Todo = ({ todo }: { todo: Todo }) => {

    const handleTodoEdit = useUpdateTodo();
    const handleDeleteTodo = useDeleteTodo();
    const handleTodoCompleted = useCompleteTodo();

    const { id, task, completed } = todo;

    const [newTask, setNewTask] = useState(task || "")

    // Method for updating todo
    const handleUpdate = (value: string) => {
        handleTodoEdit(value, newTask);
        setNewTask("");
    }

    // Method for deleting a todo
    const handleDelete = (value: string) => {
        handleDeleteTodo(value);
    }

    // Method for completing a todo
    const handleDone = (value: string) => {
        handleTodoCompleted(value);
    }

    return (
        <Box className="w-full">
            <Card variant="surface" >
                <Flex direction={"column"} gap={`2`}>
                    <Text as="div" size="2" weight="bold">
                        Task
                    </Text>
                    <Text as="div" color="gray" size="2">
                        {task}
                    </Text>
                    <Text as="div" size="2" weight="bold">
                        Completed
                    </Text>
                    <Text as="div" color="gray" size="2">
                        {completed ? "Yes" : "No"}
                    </Text>
                </Flex>

                <div className="w-full flex justify-start mt-4 items-center gap-4">
                    {/* Delete Alert */}
                    <AlertDialog.Root>
                        <AlertDialog.Trigger>
                            <Button color="red">Delete</Button>
                        </AlertDialog.Trigger>
                        <AlertDialog.Content maxWidth="450px">
                            <AlertDialog.Title>Delete Todo</AlertDialog.Title>
                            <AlertDialog.Description size="2">
                                Are you sure? If you delete this todo, you will not be able to recover it.
                            </AlertDialog.Description>

                            <Flex gap="3" mt="4" justify="end">
                                <AlertDialog.Cancel>
                                    <Button variant="soft" color="gray">
                                        Cancel
                                    </Button>
                                </AlertDialog.Cancel>
                                <AlertDialog.Action>
                                    <Button onClick={() => handleDelete(id)} variant="solid" color="red">
                                        Delete
                                    </Button>
                                </AlertDialog.Action>
                            </Flex>
                        </AlertDialog.Content>
                    </AlertDialog.Root>

                    {/* Update todo inputs */}
                    <Dialog.Root>
                        <Dialog.Trigger>
                            <Button color="orange">Edit</Button>
                        </Dialog.Trigger>

                        <Dialog.Content maxWidth="450px">
                            <Dialog.Title>Edit Todo</Dialog.Title>
                            <Dialog.Description size="2" mb="4">
                                Edit Your Todo Here.
                            </Dialog.Description>

                            <Flex direction="column" gap="3">
                                <label>
                                    <Text as="div" size="2" mb="1" weight="bold">
                                        Todo Title
                                    </Text>
                                    <TextField.Root
                                        placeholder="Enter title"
                                        value={newTask}
                                        onChange={(e) => setNewTask(e.target.value)}
                                    />
                                </label>
                            </Flex>

                            <Flex gap="3" mt="4" justify="end">
                                <Dialog.Close>
                                    <Button variant="soft" color="gray">
                                        Cancel
                                    </Button>
                                </Dialog.Close>
                                <Dialog.Close>
                                    <Button onClick={() => handleUpdate(id)} >Update</Button>
                                </Dialog.Close>
                            </Flex>
                        </Dialog.Content>
                    </Dialog.Root>

                    {/* Complete Alert */}
                    <AlertDialog.Root>
                        <AlertDialog.Trigger>
                            <Button color="green">Done</Button>
                        </AlertDialog.Trigger>
                        <AlertDialog.Content maxWidth="450px">
                            <AlertDialog.Title>Completed Todo</AlertDialog.Title>
                            <AlertDialog.Description size="2">
                                Are you sure you&apos;ve completed this task ?
                            </AlertDialog.Description>

                            <Flex gap="3" mt="4" justify="end">
                                <AlertDialog.Cancel>
                                    <Button variant="soft" color="gray">
                                        Cancel
                                    </Button>
                                </AlertDialog.Cancel>
                                <AlertDialog.Action>
                                    <Button onClick={() => handleDone(id)} variant="solid" color="green">
                                        Yes, I have
                                    </Button>
                                </AlertDialog.Action>
                            </Flex>
                        </AlertDialog.Content>
                    </AlertDialog.Root>
                </div>
            </Card>
        </Box>
    )
}

export default Todo