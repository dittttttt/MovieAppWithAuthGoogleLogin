import React, { useEffect, useState } from "react";
import axios from "axios";
import { StarIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";

//Initial API KEY
const API_KEY = "77b3a402465e7a82a0baf4ac6fbae43d";

export default function MovieApp() {
  const [topRated, setTopRated] = useState([]);
  const [query, setSearchQuery] = useState("");
  const [numOfItems, setNumOfItems] = useState(10);
  const [isNotFound, SetIsNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  //Fetching Data API {{ Top Rated }}
  useEffect(() => {
    const topRatedMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`,
          { headers: { accept: "application/json" } }
        );
        console.log("response.data.now_playing", response.data.results);
        setTopRated(response.data.results);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data : ", error);
      }
    };
    topRatedMovies();
  }, []);

  // Search Function
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Function to handle changes in the number of items select
  const handleNumOfItemsChange = (event) => {
    setNumOfItems(parseInt(event.target.value));
  };

  //to lowerchase & filtering
  const filteredData = topRated
    .filter((movie) => movie.title.toLowerCase().includes(query.toLowerCase()))
    .slice(0, numOfItems);

  useEffect(() => {
    if (filteredData.length === 0 && query !== "") {
      SetIsNotFound(true);
    } else {
      SetIsNotFound(false);
    }
  }, [filteredData, query]);

  return (
    <div className="text-white">
      {/* Navbar  */}
      <div className="flex justify-between items-center text-xl py-5 px-12 bg-gray-900 fixed top-0 left-0 w-full shadow-md z-10">
        <a href="/" className="text-3xl">
          <strong className="text-yellow-500">PRIME</strong>MOVIES
        </a>
        <ul className="flex">
          <li className="my-2 mx-4  hover:text-yellow-400">
            <a href="/">Home</a>
          </li>
          <li className="my-2 mx-4 text-yellow-400">
            <a href="/top-rated">Top Rated</a>
          </li>
          <li className="my-2 mx-4  hover:text-yellow-400">
            <a href="/popular">Popular</a>
          </li>
          <li className="my-2 mx-4  hover:text-yellow-400">
            <a href="/upcoming">Up Coming</a>
          </li>
        </ul>
        <div className="flex gap-4">
          <p>Aditya</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </div>
      </div>
      {/* Loading Spinner */}
      {isLoading && (
        <div className="flex justify-center items-center h-screen">
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin dark:text-yellow-600 fill-primary"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
      {/* Content */}
      {!isLoading && (
        <section>
          {/* Top Rated Movies */}
          <div className="flex justify-center mt-12 ">
            <div className="py-12">
              <div className=" text-center p-12">
                <p className="text-5xl pb-4">
                  <strong>Top Rated Movies</strong>
                </p>
                <p className="pb-5">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Reprehenderit nobis pariatur explicabo,
                </p>
                <div className="flex justify-center gap-4 mt-4">
                  {/* Search */}
                  <div>
                    <input
                      type="text"
                      name="search"
                      placeholder="Search"
                      value={query}
                      onChange={handleSearchChange}
                      className="rounded-md p-2 text-black"
                    />
                  </div>
                  {/* Num of Items */}
                  <div>
                    <select
                      id="numOfItems"
                      className="text-black py-2 px-5 rounded-md"
                      value={numOfItems}
                      onChange={handleNumOfItemsChange}
                    >
                      <option value="10">10</option>
                      <option value="15">15</option>
                      <option value="20">20</option>
                      <option value="50">50</option>
                    </select>
                  </div>
                </div>
              </div>
              {/* Show Popular Movie */}
              <div>
                {isNotFound ? ( // Tampilkan pesan "Not Found" jika tidak ada hasil pencarian
                  <div className="text-center text-red-500 font-bold">
                    Movie Not Found
                  </div>
                ) : (
                  <div className="mx-auto max-w-[90%] grid grid-cols-5 gap-8 pb-2 ">
                    {filteredData?.map((e) => (
                      <div
                        key={e?.id}
                        onClick={() => {
                          navigate("/detail", { state: { id: e?.id } });
                        }}
                        className="w-[250px] px-3"
                      >
                        <img
                          src={`https://image.tmdb.org/t/p/w200/${e?.poster_path}`}
                          alt=""
                          className="rounded-md w-full hover:scale-105"
                        />
                        <p className="mt-4">
                          <strong>{e?.title}</strong>
                        </p>
                        <div className="flex">
                          <p className="text-gray-400">{e?.release_date}</p>
                        </div>
                        <div className="flex">
                          <StarIcon className="h-6  text-yellow-500"></StarIcon>
                          <p className="ms-1">{e?.vote_average.toFixed(1)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
