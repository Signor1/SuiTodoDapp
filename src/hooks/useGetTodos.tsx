/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSuiClientQuery } from '@mysten/dapp-kit';
import { useTodoList } from './useTodoList';


interface Todo {
    id: string;
    task: string;
    completed: boolean;
}


const useGetTodos = () => {
    const { todoListId } = useTodoList();

    return useSuiClientQuery(
        'getObject',
        {
            id: todoListId || '',
            options: {
                showContent: true,
                showOwner: true,
            },
        },
        {
            enabled: !!todoListId,
            queryKey: ['todoList', todoListId],
            select: (data): Todo[] => {
                // Type-safe content parsing
                if (data.data?.content?.dataType !== 'moveObject') return [];

                const fields = data.data.content.fields as {
                    todos?: Array<{
                        fields: {
                            id: string;
                            task: string;
                            completed: boolean;
                        };
                    }>;
                } | undefined;

                const todos = fields?.todos || [];

                const allTodos = todos.map((todo: any) => ({
                    id: todo.fields.id.toString(),
                    task: todo.fields.task,
                    completed: todo.fields.completed
                }));

                return allTodos;
            }
        }
    );
}


export default useGetTodos;