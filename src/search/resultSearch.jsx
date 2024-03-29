import React, { useEffect, useState } from "react";
import axios from "axios";
import { StarIcon } from "@heroicons/react/20/solid";
import { useLocation, useNavigate } from "react-router-dom";

//Initial API KEY
const API_KEY = "77b3a402465e7a82a0baf4ac6fbae43d";

export default function MovieApp() {
  const [search, setsearchMovies] = useState([]);
  const [discover, setdiscoverMovies] = useState([]);
  const [query, setQueryMovies] = useState([]);
  const [isNotFound, SetIsNotFound] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [numOfItems, setNumOfItems] = useState(10);

  const navigate = useNavigate();

  let location = useLocation();
  console.log("location : ", location.state.title);

  //Fetching Data API {{ SEARCH }}
  useEffect(() => {
    const searchMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?query=${location.state.title}&api_key=${API_KEY}`,
          { headers: { accept: "application/json" } }
        );
        console.log("response.data.search", response.data.results);
        setsearchMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching data : ", error);
      }
    };
    searchMovies();
  }, [query]);

  //Fetching Data API {{ SEARCH }}
  useEffect(() => {
    const discoverMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`,
          { headers: { accept: "application/json" } }
        );
        console.log("response.data.discover", response.data.results);
        setdiscoverMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching data : ", error);
      }
    };
    discoverMovies();
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
  const filteredData = discover
    .filter((movie) =>
      movie.title.toLowerCase().includes(searchQuery?.toLowerCase())
    )
    .slice(0, numOfItems);

  useEffect(() => {
    if (search?.length === 0 && query !== "") {
      SetIsNotFound(true);
    } else {
      SetIsNotFound(false);
    }
  }, [search, query]);

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
          <li className="my-2 mx-4 hover:text-yellow-400">
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
      {/* Search Movie Movies */}
      <div className="flex justify-center mt-12 ">
        <div className="py-12">
          <div className=" text-center p-12">
            <p className="text-5xl pb-4">
              <strong>Search "{location.state.title}"</strong>
            </p>
            <p className="pb-5">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Reprehenderit nobis pariatur explicabo,
            </p>
          </div>
          {/* Show Search Movie */}
          <div>
            {isNotFound ? ( // Tampilkan pesan "Not Found" jika tidak ada hasil pencarian
              <div className="">
                <div className="text-center font-bold text-red-500  text-3xl h-[200px] max-w-[90%] mx-auto border flex justify-center items-center">
                  Movie Not Found
                </div>
                <div className=" text-center p-12">
                  <p className="text-5xl pb-4">
                    <strong>Recomend Movies</strong>
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
                <div className="mx-auto max-w-[90%] grid grid-cols-5 gap-8 pb-2">
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
              </div>
            ) : (
              <div className="mx-auto max-w-[90%] grid grid-cols-5 gap-8 pb-2 ">
                {search?.map((e) => (
                  <div
                    key={e?.id}
                    onClick={() => {
                      navigate("/detailSearch", { state: { id: e?.id } });
                    }}
                    className="w-[250px] px-3"
                  >
                    {e?.poster_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w200/${e?.poster_path}`}
                        alt=""
                        className="rounded-md w-full hover:scale-105"
                      />
                    ) : (
                      <div className="bg-gray-300 rounded-md w-full h-[340px] flex justify-center items-center">
                        <p className="text-gray-500">Image Not Available</p>
                      </div>
                    )}
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
    </div>
  );
}
