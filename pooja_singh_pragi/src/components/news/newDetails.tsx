'use client'
import React, { useEffect, useMemo, useRef, useState } from 'react';

const categories = ['technology', 'sports', 'business', 'health', 'entertainment'];

export default function NewsDetailsComponents() {
  const [category, setCategory] = useState('technology');
  const [articles, setArticles] = useState([] as any);
  const [page, setPage] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const [loading, setLoading] = useState(false);

  const loadMore = async () => {
    setLoading(true);
    const req = await fetch(
      `https://newsapi.org/v2/top-headlines?category=${category}&pageSize=20&page=${page}&apiKey=800999465eee4186b0b638809b86fa6c`
    );
    const data = await req.json();
    setTotalData(data.totalResults);
    setArticles(data.articles);
    setLoading(false);
  };

  useEffect(()=>{
    setArticles([]);
    setPage(1);
  },[category])

  useEffect(() => {
    loadMore();
  }, [category, page]);

  console.log(articles, 'asdfasfdasdfasdf')

  if (loading) {
    return (
      <div role="status" className='h-screen flex justify-center items-center'>
        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    )
  }


  return (
    <div className=''>
      <div className='flex justify-around items-center px-2 '>
      <select
        onChange={(e) => setCategory(e.target.value)}
        className="p-2.5 m-4 pr-8 text-sm bg-white border border-gray-300 rounded-l"
      >
        <option value="" className='bg-white text-green-900 font-bold'>--select--</option>
        {categories?.map((e: string, i: number) => (
          <option key={i} value={e} className="bg-white text-green-900 font-bold">
            {e}
          </option>
        ))}
      </select>
      <div className='text-3xl text-green-600'>
        News details
      </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {articles?.map((article: any, i: number) => (
          <div
            key={i}
            className="bg-white rounded-xl hover:cursor-pointer shadow-md overflow-hidden transition transform hover:scale-[1.01] hover:shadow-lg duration-300"
            onClick={() => window.location.href = article.url}
          >
            <img
              src={article.urlToImage}
              alt={article.title}
              className="w-full h-62 object-cover"
              loading="lazy"
            />
            <div className="p-4 space-y-2">
              <h2 className="text-lg font-semibold line-clamp-2">{article.title}</h2>
              <p className="text-sm text-gray-600 line-clamp-3">{article.description}</p>
              <div className="text-sm text-gray-500">
                {article.author && <span>By {article.author}</span>}
              </div>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-sm text-blue-600 hover:underline font-medium"
              >
                Read more →
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center space-x-4 my-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={loading || page === 1}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg  hover:cursor-pointer disabled:bg-gray-300"
        >
          Pervious
        </button>
        {Array.from({ length: Math.ceil(totalData / 20)}).map((_, index) => (
          <button
            key={index}
            onClick={() => setPage(index + 1)}
            className={`px-4 py-2 border ${page === index + 1 ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'} rounded-lg hover:bg-blue-500  hover:cursor-pointer hover:text-white`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, Math.ceil(totalData / 20)))}
          disabled={loading || page === Math.ceil(totalData / 20)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-300 hover:cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
}