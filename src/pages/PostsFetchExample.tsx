import { FC } from "react";
import { useQuery } from '@tanstack/react-query';

import '../App.css'

/**
 * A basic example of useQuery
 */

interface PostsFetchExampleProps {
    title: string
};

interface Post {
    "userId": number,
    "id": number,
    "title": string,
    "body": string
  };

const PostsFetchExample: FC<PostsFetchExampleProps> = ({ title }: PostsFetchExampleProps) => {

    const { data, isError, isLoading, refetch } = useQuery({
        queryKey: ['allPosts'],
        queryFn: () => fetch('https://jsonplaceholder.typicode.com/posts').then((res) => res.json())
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if(isError) {
        return (
            <div>
                <h1>Error Occured</h1>
                <p>Please retry again</p>
                <button onClick={() => refetch()}>
                    Retry
                </button>
            </div>
    )}

    return (
    <div>
        <h2>{title}</h2>
        {data.map((post: Post) => <div>
            <p>{post.title}</p>
        </div>)}
    </div>
    );
}

export default PostsFetchExample;
