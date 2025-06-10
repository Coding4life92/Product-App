import { useEffect, useState } from "react"

interface Author {
    name: string;
    isFollowing: boolean;
    image: string;
}

const TopSellers = () => {
    const [authors, setAuthors] = useState<Author[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://randomuser.me/api/?results=5');

                const data = await response.json();

                const authorsData: Author[] = data.results.map((user: any) => ({
                    name: `${user.name.first} ${user.name.last}`,
                    isFollowing: false,
                    image: user.picture.medium
                }));

                setAuthors(authorsData);
            } catch (error) {
                console.error(`Error fetching authors: ${error}`);
            }
        };

        fetchData();
    }, []);

    const handleFollowClick = (index: number) => {
        setAuthors(prevAuthor =>
            prevAuthor.map((author, i) =>
                i === index ? { ...author, isFollowing: !author.isFollowing } : author
            )
        );
    };

    return (
        <div className="bg-white p-5 w-full sm:w-[23rem] mt-8 border rounded sm:ml-5">
            <h2 className="text-xl font-bold mb-5">Top Sellers</h2>

            <ul>
                {authors.map((author, index) => (
                    <li key={index} className="flex items-center justify-between mb-4">
                        <section className="flex items-center">
                            <img
                                src={author.image}
                                alt={author.name}
                                className="w-12 h-12 object-cover rounded-full"
                            />
                            <span className="ml-4 text-sm sm:text-base">{author.name}</span>
                        </section>

                        <button
                            onClick={() => handleFollowClick(index)}
                            className={`px-3 py-1 text-sm sm:text-base rounded cursor-pointer ${author.isFollowing ? 'bg-red-500 text-white' : 'bg-black text-white'
                                }`}
                        >
                            {author.isFollowing ? 'Unfollow' : 'Follow'}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TopSellers;
