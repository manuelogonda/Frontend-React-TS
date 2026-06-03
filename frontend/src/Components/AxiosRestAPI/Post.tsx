import axios from "axios";
import { useEffect, useState } from "react";

interface Post {
    id: number;
    title: string;
    body: string;
}

export function PostDashBoard() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [isloading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        const fetchposts = async () => {
            try{
                setIsLoading(true);
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10');
                setPosts(response.data);
                setError(null);
            } catch (err) {
                setError('Failed to fetch posts. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        }
        fetchposts();
    }, []);

    if(isloading) return <div className="text-center p-10 text-green-500">Loading existing content...</div>
    if(error) return <div className="text-red-500 p-10">{error}</div>

    return (
        <>
         <h1 className="text-2xl text-center text-green-500 font-bold p-2 mb-4">Posts</h1>
        <div className="p-6 grid gap-4 bg-gray-100 rounded-md p-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
            {posts.map((post: any) => (
                <div key={post.id} className="p-4 border-rounded-md shadow-sm bg-blue-100">
                    <h2 className="font-semibold text-black capitalize">{post.title}</h2>
                    <p className="text-gray-600">{post.body}</p>
                </div>
            ))}
        </div>
        </>
    )
}