import { useCurrentAccount, useSuiClientQuery } from "@mysten/dapp-kit";

export const useTodoList = () => {
  const account = useCurrentAccount();

  const { data: todoListData } = useSuiClientQuery(
    "getOwnedObjects",
    {
      owner: account?.address || "",
      filter: {
        StructType: `${
          import.meta.env.VITE_PUBLIC_PACKAGE_ID
        }::todolist::TodoList`,
      },
      options: {
        showContent: true,
      },
    },
    {
      queryKey: ["todoLists"],
    }
  );

  const todoListId = todoListData?.data?.[0]?.data?.objectId;

  return {
    todoListId,
  };
};
