import { MessageCircle, ThumbsUp } from 'lucide-react';

const PopularBlogs = () => {
    const blogs = [
        {
            title: "The Rise of AI in Everyday Life",
            author: "Jane Doe",
            likes: 124,
            comments: 12
        },
        {
            title: "10 Tips for a Healthier Lifestyle",
            author: "John Smith",
            likes: 89,
            comments: 7
        },
        {
            title: "Exploring the Wonders of the Universe",
            author: "Luna Vega",
            likes: 157,
            comments: 18
        },
        {
            title: "Mastering React: A Beginner's Guide",
            author: "Alex Johnson",
            likes: 204,
            comments: 25
        }
    ];

    return (
        <div className='bg-white p-5 w-full sm:w-[23rem] mt-4 border ml-0 sm:ml-5 rounded'>
            <h2 className="text-xl font-bold mb-5">Popular Blogs</h2>

            <ul>
                {blogs.map((blog, index) => (
                    <li key={index} className='mb-4'>
                        <div className="flex justify-between items-center">
                            <span className="font-bold mb-2">{blog.title}</span>
                        </div>

                        <span className="text-gray-600">Published by {blog.author}</span>

                        <div className="flex items-center mt-2">
                            <MessageCircle size={16} />
                            <span className="text-gray-500 mr-5 ml-1">{blog.comments}</span>

                            <ThumbsUp size={16} />
                            <span className="text-gray-500 mr-1 ml-2">{blog.likes}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default PopularBlogs
