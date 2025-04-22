import { Text } from "@radix-ui/themes";
import useGetTodos from "../hooks/useGetTodos";
import Todo from "./Todo"


const Todos = () => {
    const { data: todos, isLoading, error } = useGetTodos();

    if (isLoading) return <Text as="p" className="text-2xl font-medium text-stone-200">Loading...</Text>;

    if (error) return <Text as="p" className="text-2xl font-medium text-stone-200">Error loading todos</Text>;

    if (todos === undefined) return <Text as="p" className="text-2xl font-medium text-stone-200">No todos found - Check your wallet connection</Text>;

    return (
        <div className="w-full flex flex-col gap-4">
            <Text as="p" className="text-3xl font-semibold text-amber-600">My Todos</Text>
            <section className="w-full grid lg:grid-cols-3 md:grid-cols-2 md:gap-6 gap-4">
                {
                    todos?.length === 0 ?
                        <Text as="p" className="text-2xl font-medium text-stone-200">There are no available todos</Text> :
                        todos?.map((todo, index) => (<Todo key={index} todo={todo} />))
                }
            </section>
        </div>
    )
}

export default Todos