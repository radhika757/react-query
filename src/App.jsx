import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import "./App.css";

const POSTS = [
  { id: 1, title: "Post 1" },
  { id: 2, title: "Post 2" },
  { id: 3, title: "Post 3" },
];

function App() {
  const [newText, setNewTexts] = useState("");
  const queryClient = useQueryClient();
  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: (queryKey) => wait(1000).then(() => {
      // console.log(obj);
      console.log(queryKey);
     return [...POSTS]
    }),
  });

  //implementing mutations
  const postMutations = useMutation({
    mutationFn: (title) => {
      return wait(1000).then(() =>
        POSTS.push({ id: crypto.randomUUID(), title })
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  const addNewText = () => {
    const enteredText = prompt("Enter a new Text:");
    setNewTexts(enteredText);
  };


  useEffect(() => {
    if (newText) {
      postMutations.mutate(newText);
    } 
    // else {
    //  alert("Empty text not allowed!");
    // }
  }, [newText]);

  // implementing postsQuery
  if (postsQuery.isLoading) return <h1>Loading ...</h1>;
  if (postsQuery.isError) {
    return <pre>{JSON.stringify(postsQuery.error)}</pre>;
  }

  return (
    <>
      <div>
        {postsQuery.data.map((post) => (
          <div key={post.id}>{post.title}</div>
        ))}

        <button disabled={postMutations.isLoading} onClick={addNewText}>
          Add New
        </button>
      </div>
    </>
  );
}

function wait(duration) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

export default App;
