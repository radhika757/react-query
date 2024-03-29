# React Query

## QueryClient

Core class in React query responsible for managing caching,fetching and updating of every query & acts as a central store for saving applications data. We create a new instance QueryClient using NEW keyword.

## QueryClientProvider

React component provided by the React query which wraps the application and makes queryClient available to all the components in the component tree via React context. It should be placed at the top level of your component tree to ensure that all the components have access to the same `queryClient` instance.

## ReactQueryDevTools

Optional component that provides a set of development tools to insepct and debug React Query. It displays a panel in your browser's developer tools that allows you to visualize and interact with the queries in your application during development. You can toggle it on and off as needed.

## useQuery

- Used for fetching and managing asynchronous data.
- It takes in a unique `query key` in an array and a function that performs data fetching.It auotmatically handles caching, re-fetching and loading "state".
- `queryFn` always returns a promise because its for asynchronous data.

1. isLoading - A boolean indiciating whether the data is still being fetched.
2. isError - Any error that occured during fetching process.
3. data - Fetched data

- How to write `query keys` for different URLS?
  The usual idea is to break apart the `/`. Everytime there is a slash make it a new element in the [] Array.

1. /posts : ["posts"]
2. /posts/1 : ["posts",post.id]
3. /posts/2/comments : ["posts",post.id,"comments"]
4. {For Filter} /posts?authorId=1 : ["posts", {authorId: 1}]

- Manually set to refresh on its on using `refetchInterval` in useQuery
- `enabled key` - When you want a query to run after another query is completed. For eg, fetching a particular data from the fetched data.

## useMutation

- Used for managing asynchronous mutations, such as creating, updating or deleting data.
- `useMutation` hook for handling mutation actions.

1. mutate - triggers the mutation.
2. data - Result of mutation.
3. Error - Any error that occured during mutation.
4. isLoading - A boolean indicating whether the mutation is still in progress.

## useQueryClient

- Hook that provides access to the QueryClient instance.
- Useful when you need to interact with the query client directly, such as manually refetching data or clearing the cache or invalidating queries.

## useQueries Hook

- `useQueries` is used to fetch variable number of queries.
- const results = useQueries({
  queries: [
    { queryKey: ['post', 1], queryFn: fetchPost, staleTime: Infinity },
    { queryKey: ['post', 2], queryFn: fetchPost, staleTime: Infinity },
  ],
})

