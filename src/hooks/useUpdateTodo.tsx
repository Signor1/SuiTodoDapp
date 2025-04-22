import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react'
import { useTodoList } from './useTodoList';
import { useCurrentAccount, useSignAndExecuteTransaction } from '@mysten/dapp-kit';
import { toast } from 'react-toastify';
import { Transaction } from '@mysten/sui/transactions';
import { bcs } from '@mysten/bcs';

const useUpdateTodo = () => {
    const queryClient = useQueryClient();
    const { todoListId } = useTodoList();

    const account = useCurrentAccount();
    const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();

    return useCallback(async (id: string, newTask: string) => {
        if (!newTask) {
            toast.error("Title is required");
            return;
        }
        if (!account) {
            toast.error("Please connect your wallet");
            return;
        }
        if (!todoListId) {
            toast.error("TodoList not initialized");
            return;
        }

        const transaction = new Transaction();
        transaction.moveCall({
            target: `${import.meta.env.VITE_PUBLIC_PACKAGE_ID}::todolist::update_todo`,
            arguments: [
                transaction.object(todoListId),
                transaction.pure(bcs.u64().serialize(id.toString()).toBytes()),
                transaction.pure(bcs.string().serialize(newTask).toBytes())
            ],
            typeArguments: []
        });

        try {
            await signAndExecuteTransaction({
                transaction,
                chain: 'sui:testnet',
            }, {
                onSuccess: (txResult) => {
                    toast.success(`Todo updated! Digest: ${txResult.digest}`);
                    queryClient.invalidateQueries({
                        queryKey: ['todoLists']
                    });
                    queryClient.invalidateQueries({
                        queryKey: ['todoList', todoListId]
                    });
                },
                onError: (error) => {
                    toast.error("Transaction failed");
                    console.error("Transaction error:", error);
                }
            })
        } catch (error) {
            toast.error("Transaction failed");
            console.error("Error:", error);
        }

    }, [account, todoListId, queryClient, signAndExecuteTransaction])
}

export default useUpdateTodo