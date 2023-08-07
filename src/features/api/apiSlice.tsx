import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type id = string;

type addTodo = {
    userId: Number
    title: string | undefined,
    completed: boolean,
}

export type todo = {
    userId: Number
    title: string | undefined,
    completed: boolean,
    id: id
}

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3500' }),
    tagTypes: ['Todos'],
    endpoints: (builder) => ({
        getTodos: builder.query<todo[], void>({
            query: () => '/todos',
            transformResponse: (res: todo[]) => res.sort((a: todo, b: todo)  =>{
                let idA = Number(a.id);
                let idB = Number(b.id);
               return idB - idA;
            } ),
            providesTags: ['Todos']
        }),
        addTodo: builder.mutation<todo, addTodo>({

            query: (todo) => ({
                url: '/todos',
                method: 'POST',
                body: todo
            }),
            invalidatesTags: ['Todos']

        }),
        updateTodo: builder.mutation<todo, todo>({
            query: (todo) => ({
                url: `/todos/${todo.id}`,
                method: 'PATCH',
                body: todo
            }),
            invalidatesTags: ['Todos']

        }),
        deleteTodo: builder.mutation<void, id>({
            query: (id) => ({
                url: `/todos/${Number(id)}`,
                method: 'DELETE',
                body: id
            }),
            invalidatesTags: ['Todos']

        })
    })

})

export const {
    useAddTodoMutation,
    useDeleteTodoMutation,
    useUpdateTodoMutation,
    useGetTodosQuery
} = apiSlice;
