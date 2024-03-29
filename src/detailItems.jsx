import React, { useEffect, useState } from "react";
import axios from "axios";
import { StarIcon } from "@heroicons/react/20/solid";
import { useLocation } from "react-router-dom";

//Initial API KEY
const API_KEY = "77b3a402465e7a82a0baf4ac6fbae43d";

export default function MovieApp() {
  const [detail, detailTopRated] = useState([]);
  const [genres, getGenres] = useState([]);
  const [language, getLanguage] = useState([]);
  let location = useLocation();

  //Fetching Data API {{ NOW PLAYING }}
  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${location.state.id}?api_key=${API_KEY}`,
          { headers: { accept: "application/json" } }
        );
        console.log("response.data", response.data);
        detailTopRated(response.data);
        getGenres(response.data.genres);
        getLanguage(response.data.spoken_languages);
      } catch (error) {
        console.error("Error fetching data : ", error);
      }
    };
    fetchMovieDetail();
  }, []);

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
      {/* Content */}
      <div key={detail?.id} className="mx-24 mt-28">
        <div className="border rounded-xl">
          <div className="min-h-[720px] relative">
            <img
              className="absolute -z-20 max-h-[720px] object-cover w-full top-0 left-0 filter brightness-50 contrast-100 rounded-xl"
              src={`https://image.tmdb.org/t/p/w500/${detail?.backdrop_path}`}
              alt=""
            />
            <div className="flex flex-row justify-center items-center pt-12 px-16 relative">
              <div>
                <img
                  src={`https://image.tmdb.org/t/p/w400/${detail?.poster_path}`}
                  alt=""
                  className="max-w-100 rounded-xl"
                />
              </div>
              <div className="max-w-[750px] p-12">
                <div>
                  <p className=" text-6xl">
                    <strong>{detail?.title}</strong>
                  </p>
                  <div className="flex mt-4">
                    <StarIcon className="h-6 me-2 text-yellow-500"></StarIcon>
                    <p>{detail?.vote_average?.toFixed(1)}</p>
                  </div>
                  <p className="mt-4">{detail?.overview}</p>
                  <p className="my-4 text-xl">
                    <strong>Genres</strong>
                  </p>
                  <div className="flex">
                    {genres?.map((e) => (
                      <div className="p-2 border me-2 rounded-md bg-yellow-600">
                        <p>{e?.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between   mt-5 ">
          <div className="flex justify-center text-center items-center  rounded-xl p-5 w-[20%] m-5 border">
            <p>
              <strong className="text-xl">Release Date</strong>
              <p className="text-gray-400 pt-2">{detail?.release_date}</p>
            </p>
          </div>
          <div className="flex justify-center text-center items-center rounded-xl p-5 w-[20%] m-5 border">
            <p>
              <strong className="text-xl">Popularity</strong>
              <p className="text-gray-400 pt-2">{detail?.popularity?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</p>
            </p>
          </div>
          <div className="flex flex-col justify-center text-center items-center rounded-xl p-5 w-[20%] m-5 border">
            <p>
              <strong className="text-xl">Duration</strong>
            </p>
            <p className="text-gray-400 pt-2">{detail?.runtime} minutes</p>
          </div>
          <div className="flex justify-center text-center items-center rounded-xl p-5 w-[20%] m-5 border">
            <p>
              <strong className="text-xl">Revenue</strong>
              <p className="text-gray-400 pt-2">{detail?.revenue?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</p>
            </p>
          </div>
          <div className="flex justify-center text-center items-center rounded-xl p-5 w-[20%] m-5 border">
            <p>
              <strong className="text-xl">Language</strong>
              <div className="flex">
                {language?.map((e) => (
                  <div className="p-2 text-gray-400 flex items-center m-2">
                    <p>{e?.name}</p>
                  </div>
                ))}
              </div>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
