import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';

interface BlogPost {
    content: string;
}

const Blog: React.FC = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [newPost, setNewPost] = useState<string>('');

    useEffect(() => {
        // Fetch all blog posts from the server
        axios.get<BlogPost[]>('/api/posts')
            .then(response => setPosts(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleAddPost = () => {
        // Add a new blog post to the server
        axios.post<BlogPost>('/api/posts', { content: newPost })
            .then(response => {
                setPosts([...posts, response.data]);
                setNewPost('');
            })
            .catch(error => console.error(error));
    };

    return (
        <div>
            <h1>React Blog App</h1>
            <div>
        <textarea
            rows={4}
            cols={50}
            placeholder="Write your blog post here..."
            value={newPost}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setNewPost(e.target.value)}
        />
                <br />
                <button onClick={handleAddPost}>Add Post</button>
            </div>
            <div>
                <h2>Blog Posts:</h2>
                {posts.map(post => (
                    <div key={post.content}>
                        <p>{post.content}</p>
                        <hr />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Blog;
