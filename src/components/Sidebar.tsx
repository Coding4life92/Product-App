import { useEffect, useState } from "react"
import { useFilter } from "./FilterContent";

interface Product {
    category: string;
}

interface FetchResponse {
    products: Product[]
}

const Sidebar = () => {
    const {
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
        setKeyword
    } = useFilter();

    const [categories, setCategories] = useState<string[]>([]);

    const [keywords] = useState<string[]>([
        "apple",
        "watch",
        "fashion",
        "trend",
        "shoes",
        "shirt"
    ]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('https://dummyjson.com/products');

                const data: FetchResponse = await response.json();

                const uniqueCategories = Array.from(new Set(data.products.map(product => product.category)));

                setCategories(uniqueCategories);
            } catch (error) {
                console.error('Error fetching products', error);
            }
        }

        fetchCategories();
    }, [])

    const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setMinPrice(value ? parseFloat(value) : undefined);
    }

    const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setMaxPrice(value ? parseFloat(value) : undefined);
    }

    const handleRadioChangeCategories = (category: string) => {
        setSelectedCategory(category);
    }

    const handleKeywordClick = (keyword: string) => {
        setKeyword(keyword);
    }

    const handleResetFilters = () => {
        setSearchQuery('');
        setSelectedCategory('');
        setMinPrice(undefined);
        setMaxPrice(undefined);
        setKeyword('');
    }

    return (
        <div className="w-[100%] p-5 h-full bg-black text-gray-200 overflow-y-scroll">
            <h1 className="text-2xl font-bold mb-6 mt-4 text-gray-200">Shop Where You Belong</h1>

            <section>
                <input
                    type="text"
                    className="border rounded px-2 sm:mb-0 w-full"
                    placeholder="Search Product"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                />

                <div className="flex justify-center items-center mt-2">
                    <input
                        type="text"
                        className="border mr-2 px-5 py-3 mb-3 w-full"
                        placeholder="Min"
                        value={minPrice ?? ''}
                        onChange={handleMinPriceChange}
                    />

                    <input
                        type="text"
                        className="border px-5 py-3 mb-3 w-full"
                        placeholder="Max"
                        value={maxPrice ?? ''}
                        onChange={handleMaxPriceChange}
                    />
                </div>

                {/* Categories Section*/}
                <div className="mb-5">
                    <h2 className="text-xl font-semibold mb-3">Categories</h2>
                </div>

                <section className="flex flex-wrap gap-2.5">
                    {categories.map((category, index) => (
                        <label key={index} className=" mb-2">
                            <input
                                type="radio"
                                name="category"
                                value={category}
                                onChange={() => handleRadioChangeCategories(category)}
                                className="mr-2 w-[16px] h-[16px]"
                                checked={selectedCategory === category}
                            />
                            {category.toUpperCase()}
                        </label>
                    ))}
                </section>

                {/* Keywords Section */}
                <div className="mb-5 mt-4  gap-4">
                    <h2 className="text-xl font-semibold mb-3">Keywords</h2>

                    <div className="flex gap-2 flex-wrap">
                        {keywords.map((keyword, index) => (
                            <button
                                key={index}
                                onClick={() => handleKeywordClick(keyword)}
                                className="mb-3 px-4 py-2 w-full text-left border rounded hover:bg-gray-200 hover:text-black"
                            >
                                {keyword.toUpperCase()}
                            </button>
                        ))}
                    </div>
                </div>

                <button
                    onClick={handleResetFilters}
                    className="w-30 mb-[4rem] py-2 border bord-white bg-black text-white rounded mt-5 cursor-pointer"
                >
                    Reset Filters
                </button>

            </section>
        </div>
    )
}

export default Sidebar
