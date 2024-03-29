import React, { useEffect, useState } from "react";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { StarIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";

//Initial API KEY
const API_KEY = "77b3a402465e7a82a0baf4ac6fbae43d";

export default function MovieApp() {
  const [topRated, setTopRatedMovies] = useState([]);
  const [nowPlaying, setNowPlayingMovies] = useState([]);
  const [popular, setPopularMovies] = useState([]);
  const [upcoming, setUpComingMovies] = useState([]);
  const [query, setSearchQuery] = useState("");
  const navigate = useNavigate();

  //Fetching Data API {{ POPULAR }}
  useEffect(() => {
    const popularMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
          { headers: { accept: "application/json" } }
        );
        console.log("response.data.popular", response.data.results);
        setPopularMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching data : ", error);
      }
    };
    popularMovies();
  }, []);

  //Fetching Data API {{ TOP RATED }}
  useEffect(() => {
    const topRatedMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`,
          { headers: { accept: "application/json" } }
        );
        console.log("response.data.top_rated", response.data.results);
        setTopRatedMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching data : ", error);
      }
    };
    topRatedMovies();
  }, []);

  //Fetching Data API {{ NOW PLAYING }}
  useEffect(() => {
    const nowPlayingMovie = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`,
          { headers: { accept: "application/json" } }
        );
        console.log("response.data.Now_Playing", response.data.results);
        setNowPlayingMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching data : ", error);
      }
    };
    nowPlayingMovie();
  }, []);

  //Fetching Data API {{ UP COMING }}
  useEffect(() => {
    const upComingMovie = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`,
          { headers: { accept: "application/json" } }
        );
        console.log("response.data.upcoming", response.data.results);
        setUpComingMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching data : ", error);
      }
    };
    upComingMovie();
  }, []);

  //AutoPlayMethod Slick
  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const fade = {
    fade: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
  };

  // Search Function
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (query) => {
    console.log("ini adalah data event : ", query);
    if (query === "") return alert("Mau Cari Film Apa?");
    navigate(`/resultSearch`, {
      state: {
        title: query,
      },
    });
  };

  return (
    <div className="text-white">
      {/* Navbar  */}
      <div className="flex justify-between items-center text-xl py-5 px-12 bg-gray-900 fixed top-0 left-0 w-full shadow-md z-10">
        <a href="/" className="text-3xl">
          <strong className="text-yellow-500">PRIME</strong>MOVIES
        </a>
        <ul className="flex">
          <li className="my-2 mx-4 text-yellow-400">
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
      {/* Slicker Search */}
      <div>
        <div className="slider-container mt-6">
          <div className="absolute -z-20 max-h-[600px] object-cover w-full top-0 left-0 filter brightness-50 contrast-100">
            <Slider {...fade}>
              {nowPlaying.map((e) => (
                <div className="min-h-[600px] relative">
                  <img
                    className="absolute -z-20 max-h-[600px] object-cover w-full top-0 left-0 filter brightness-50 contrast-100"
                    src={`https://image.tmdb.org/t/p/w500/${e?.backdrop_path}`}
                    alt=""
                  />
                  <div className="flex flex-row justify-center items-center p-12 relative"></div>
                </div>
              ))}
            </Slider>
          </div>
          <div className="h-[600px]  flex flex-col justify-center items-center">
            <div className=" text-center">
              <p className="text-5xl pb-4">
                <strong>Enjoy With Our Movies</strong>
              </p>
              <p className="pb-5">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Reprehenderit nobis pariatur explicabo,
              </p>
              <div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const searchData = e.target.search.value;
                    handleSearchSubmit(searchData);
                  }}
                  className="flex justify-center items-center"
                >
                  <input
                    type="text"
                    name="search"
                    placeholder="Search"
                    value={query}
                    onChange={handleSearchChange}
                    className=" p-2 text-white bg-transparent border"
                  />
                  <button
                    type="submit"
                    className="border p-2 bg-yellow-600 hover:bg-yellow-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                      />
                    </svg>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Top Rated Movies */}
      <div className="flex justify-center mt-4">
        <div className="py-12">
          <div className=" text-center py-">
            <p className="text-5xl pb-4">
              <strong>Top Rated Movies</strong>
            </p>
            <p className="pb-5">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Reprehenderit nobis pariatur explicabo,
            </p>
          </div>
          {/* Show Top Rated Movie */}
          <div>
            <div className=" mx-auto grid grid-cols-5 gap-8 pb-2 justify-center px-12 py-6">
              {topRated
                ?.map((e) => (
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
                ))
                .slice(0, 10)}
            </div>
            <div className="text-center m-8">
              <a
                href="/top-rated"
                className="bg-green-600 px-8 py-3 rounded-xl border hover:bg-green-700 "
              >
                <strong>View All</strong>
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Slicker */}
      {/* Now Playing */}
      <div>
        <div className=" text-center">
          <p className="text-5xl pb-4">
            <strong>Now Playing</strong>
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Reprehenderit nobis pariatur explicabo,
          </p>
        </div>
        <div className="slider-container mt-6">
          <Slider {...settings}>
            {nowPlaying.map((e) => (
              <div className="min-h-[500px] relative">
                <img
                  className="absolute -z-20 max-h-[720px] object-cover w-full top-0 left-0 filter brightness-50 contrast-100"
                  src={`https://image.tmdb.org/t/p/w500/${e?.backdrop_path}`}
                  alt=""
                />
                <div className="flex flex-row justify-center items-center p-12 relative">
                  <div>
                    <img
                      src={`https://image.tmdb.org/t/p/w400/${e?.poster_path}`}
                      alt=""
                      className="max-w-100"
                    />
                  </div>
                  <div className="max-w-[750px] p-12">
                    <p className=" text-6xl">
                      <strong>{e?.title}</strong>
                    </p>
                    <div className="flex mt-5">
                      <StarIcon className="h-6  text-yellow-500"></StarIcon>
                      <p className="mx-2">{e?.vote_average.toFixed(1)}</p>
                    </div>
                    <p className="py-5">{e?.overview.slice(0, 150)} ...</p>
                    <button
                      className="border bg-yellow-600 rounded-full px-8 py-2 hover:bg-yellow-700"
                      key={e?.id}
                      onClick={() => {
                        navigate("/detail", { state: { id: e?.id } });
                      }}
                    >
                      <strong>Detail</strong>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
      {/* Popular Movies */}
      <div className="flex justify-center">
        <div className="py-12">
          <div className=" text-center py-">
            <p className="text-5xl pb-4">
              <strong> Popular Movies</strong>
            </p>
            <p className="pb-5">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Reprehenderit nobis pariatur explicabo,
            </p>
          </div>
          {/* Show Popular Movie */}
          <div>
            <div className=" mx-auto grid grid-cols-5 gap-8 pb-2 justify-center p-12">
              {popular
                ?.map((e) => (
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
                      {/* icon view */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                      <p className="ms-1">
                        {e?.popularity
                          .toFixed(3)
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                      </p>
                    </div>
                  </div>
                ))
                .slice(0, 10)}
            </div>
            <div className="text-center m-8">
              <a
                href="/popular"
                className="bg-green-600 px-8 py-3 rounded-xl border hover:bg-green-700 "
              >
                <strong>View All</strong>
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Up Coming Movies */}
      <div className="flex justify-center">
        <div className="py-12">
          <div className=" text-center py-">
            <p className="text-5xl pb-4">
              <strong> Up Coming Movies</strong>
            </p>
            <p className="pb-5">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Reprehenderit nobis pariatur explicabo,
            </p>
          </div>
          {/* Show Popular Movie */}
          <div>
            <div className=" mx-auto grid grid-cols-5 gap-8 pb-2 justify-center p-12">
              {upcoming
                ?.map((e) => (
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
                  </div>
                ))
                .slice(0, 10)}
            </div>
            <div className="text-center m-8">
              <a
                href="/upcoming"
                className="bg-green-600 px-8 py-3 rounded-xl border hover:bg-green-700 "
              >
                <strong>View All</strong>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
