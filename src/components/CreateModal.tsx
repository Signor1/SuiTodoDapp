import { Dialog, Button, Flex, Text, TextField } from "@radix-ui/themes"
import { useState } from "react"
import useCreateTodo from "../hooks/useCreateTodo";


const CreateTodoModal = () => {

    const handleCreateNewTodo = useCreateTodo();

    const [title, setTitle] = useState("");

    const handleSubmit = () => {
        handleCreateNewTodo(title);
        setTitle("");
    }

    return (
        <div className="w-full flex justify-end">
            <Dialog.Root>
                <Dialog.Trigger>
                    <Button color="orange">Create Todo</Button>
                </Dialog.Trigger>

                <Dialog.Content maxWidth="450px">
                    <Dialog.Title>New Todo</Dialog.Title>
                    <Dialog.Description size="2" mb="4">
                        Create A New Todo Here.
                    </Dialog.Description>

                    <Flex direction="column" gap="3">
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                Todo Task
                            </Text>
                            <TextField.Root
                                placeholder="Enter todo task"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
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
                            <Button onClick={handleSubmit}>Submit</Button>
                        </Dialog.Close>
                    </Flex>
                </Dialog.Content>
            </Dialog.Root>
        </div>
    )
}

export default CreateTodoModal