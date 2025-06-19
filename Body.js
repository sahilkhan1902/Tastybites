import { useEffect, useState } from "react";
import { restrauList } from "../components/constants";
import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import Shimmer from "./shimmer";
import { Link } from "react-router-dom";
import { filterData } from "../utils/helper";
import useOnline from "../utils/useOnline";

const Body = () => {
  const [searchText, setSearchText] = useState("");
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");


  useEffect(() => {
    getRestaurants();
  }, []);

  // async function getRestaurant to fetch Swiggy API data
  async function getRestaurants() {

    try {
      const response = await fetch(
        "https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.6295538&lng=77.0801899&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      );
      const json = await response.json();

      // initialize checkJsonData() function to check Swiggy Restaurant data
      async function checkJsonData(jsonData) {
        for (let i = 0; i < jsonData?.data?.cards.length; i++) {
          // initialize checkData for Swiggy Restaurant data
          let checkData =
            json?.data?.cards[i]?.card?.card?.gridElements?.infoWithStyle
              ?.restaurants;

          // if checkData is not undefined then return it
          if (checkData !== undefined) {
            return checkData;
          }
        }
      }

      // call the checkJsonData() function which return Swiggy Restaurant data
      const resData = await checkJsonData(json);

      // update the state variable restaurants with Swiggy API data
      setAllRestaurants(resData);
      setFilteredRestaurants(resData);
    } catch (error) {
      console.log(error);
    }
  }

  // use searchData function and set condition if data is empty show error message
  const searchData = (searchText, restaurants) => {
    if (searchText !== "") {
      const filteredData = filterData(searchText, restaurants);
      setFilteredRestaurants(filteredData);
      setErrorMessage("");
      if (filteredData?.length === 0) {
        setErrorMessage(
          `Sorry, we couldn't find any results for "${searchText}"`
        );
      }
    } else {
      setErrorMessage("");
      setFilteredRestaurants(restaurants);
    }
  };

  // if allRestaurants is empty don't render restaurants cards
  if (!allRestaurants) return null;

  return (
    <div className="mx-8  ">
      <div className="flex flex-col justify-between items-center md:flex md:flex-row">
        <div className="text-sm flex gap-2 my-4">
          <input
            type="text"
            placeholder="Search for a restaurants or cafe"
            className="w-64 text-xs border border-gray-300 focus:border-yellow-500 transition-all duration-300 px-2 py-2 rounded"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
                // const fData = filterData(searchText,allRestaurants)
                searchData(e.target.value, allRestaurants);
            }}
          />
          <button
            className="text-xs font-medium shadow-md px-2 py-2 outline-none  rounded bg-yellow-400 hover:bg-yellow-500 transition-all duration-200 ease-in-out text-white"
            onClick={() => {
              searchData(searchText, allRestaurants);
              //  const fData = filterData(searchText,allRestaurants)
              //  console.log(fData)
              //  setFilteredRestaurants(fData)
            }}
          >
            Search
          </button>
        </div>
        <div className="flex gap-12 cursor-pointer text-xs">
          <div className="flex gap-4 items-center">
            <img
              className="h-6"
              alt="illustration"
              src="data:image/png;base64,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"
              loading="lazy"
            />
            <span className="">Delivery!</span>
          </div>
          <div className="flex gap-4 items-center">
            <img
              className="h-6"
              alt="illustration"
              src="data:image/png;base64,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"
              loading="lazy"
            />
            <span className="whitespace-nowrap">Dining In</span>
          </div>
          <div className="flex gap-4 items-center">
            <img
              className="h-6"
              alt="illustration"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAA21BMVEX///9Gcca5vvz/6pL5p6c3Ysykyf/g6/y9wf5EcMUmWcqnzP/m8P46ZctDbscvXcsdVMno7PnP1/FBbMjyvMG5xOqXpe4wXspaedf/6Yyvt/l+md5hgdalr/Rui9iltuaaqOxVesxiitbDzu54kdt+pOebwfl6oOny9fxDa8+Kse+FmuJnhtQ7Zsp7j+L//PH/++r/7aP/+Nz/9tH/7J7/8bj/767/9Mj/88D/+uTrzdf3ra6twOzV4vmLpOKarePm2ufvw8r1s7fl3+3p0t2SquT7oZ+VuveHmejeG0NZAAANxUlEQVR4nO2daUPbOhaGGzwGHIIdklJjwhoIJSwTliSElqXtLXD//y8a7ZJ32ZKckPH7oUXBVvRY1tE5R7L58qVWrVq1atWqJa8H63beTTCqu3FgWfNuhElNAV8wmXcrzOnRAoBW8DjvdhjTA+QDhPNuhzFNMKA1nndDTGlKAK1lHYYMMHiYd1PMiAFawd2822JEMwZoBTfzbowJ3XNAKxjNuzUGdCMAWtYyEo6tJSecBUtOGL5Hl5HwNky4fJbmMdKFy0cYNjNLGFpEu7CIT2O0v6e6nKtpjFDaL30IgqmeRiQIXHk9Qc7Iikq+1UYHLbjyejrxPtqFlnSaBgXMpjoRDR4tnTiNA8r1y+gOH3w/MtCNoxtk/4KZeuWjhC4M7nPPmt6OLXJmEFi3U63mdxaqfDzNbU6m7pIIc++8SXQK1Zn4iI6bQM3JmiUQ5qeiYk6C2mUOK2r7FJObtwmAEjbs0RwgRBQvoGr2NqkLLYm0vtiLmgEBouBmqQImGRpLKpHBB7CBzBW/UZVdipjLJn3hRkYzV6wTg5liTUmmFFWca74+Sx8meTRynYhXAAIdjYhLuLVU56GHFML8kTiF0/F0ghgVGxEXvPDBLapc1fFNJcw1p7eAD3gyo0kQ6F/JmQXBGIzu0QxcRWOEeaPrZvJIf5C2NI+yrR1NyAQ0mqnOROmEBlLfD1qdO0mlWRodYzwmA75BvtJmC9SJmm0kvF+q78SUGZ8gqs62YaEqK1/XSvHa9CPe3JFQ+17a3GhSFqA2dwUafbb+CiPmKiEToyfdvRjL5lVpcDKmC9wYHeYmYrGDSvdcZZoa1JyxhlsqhFgtYN5A1HVPCYhVA8ZT3kl3qno3Tnh1GhpdSFleDUNUNzhCxktHq4sontVPZLQe1PqR2+zqF++iuc9UxolK2pfUYc3DrYmucWdAjmeJ8cbjJHdKGaHT7+HVnMOWKwlbwxhB2PtwJ9xmN3czEAoHuYuqIxzSfhlNgzkQyncipQys8S3QGP9sSeVX6b15U30AVagTU6AXfV1czpxmyNxCsC7lOad5+gSbN25VED/Fbs3sQDgHcPHvUaisfE0OYELqpdM7KKHTJ6OI5YdifBAetj2/hLz2nlFESect1oVxL2erbZdU22wvlpoVk2bC7aZtb8qL4oEfvFOjhKV6MWmqh4ROo7g2bf/ALGGJsZjoiC8wYUGLGqQkBReZ8MtoXCDOSIv7F5oQrdzJ8SUOQUboLi7hlxsZDy4zcbPohOQp0my+SZavvfiEgPE2414NrEy+z0EI7tXZOBEysG5zY/TPQQh08zBFWQq2DzIIxpM7iVCQ2VKHCSPklCsnhBrdPcymMCUznczuZVMVlNA5ZsLA0XKDledHWEqE0B1sMPVB2bni5QG6i89Y+cz9jITOYGOVCBP2efnChV24yrR8hIM5Ed7rWfFdYEJNqyaLSwiCJy3vi+CEYUvT5+ULZExXWXm1GkI07al14sk2UM+z7W63e331nekYlLsNXu5fww94+TssA8KdbRmdlGvcCIf4Ksu9z167CeSRtITvMUXLPvrAixwADmnKqO2vFW3a/fSWP8IRjKclV4dsv2wKqqD8nYIti+aD8xfLEvXclu0ENYHr2H4u2LboY7Lllto7bdt7aa2ZVuvFK04YQSy7gwYMr+aTacTWU9P2h+eFGycglt8idAJTwR2ziK0OsErNMtZUeEqlvDV9BZd3xyjg2lrXt9uvZRrH08EqW5YOPNs7MNmJLfQNpdom7FFUIDwfwitMEX991aVfFPAN3CXd4oMQihhRVbdmDXhs3jZB/I8+EUDoEHqF7SgSnBKDAD/CobSkuw2szeYzas+WPsB3TPgMp8Ltcg17DAILejIPgFNtO8gLtzY/3nUB/sAV7oDp6KVsw2YzcnM+qIYXe57d7OH79Ksmwq/4HgUuvWd2EVVO52BSbB5ixJ9aAH9iwENwd2yWszKa9QTNwQlC/EcL4T8I8ARU2+zMGw4JGjx/iK3NX3W+dzxVPJtfBZcWJAQDBhuH38qAv3FFaHjPG40IEQKjh4fiH0VCYmWQiZ43GRUmZGGGmrUhVgaObXtr3mRUkLBrszBDzdpgK9NZHCsDBQkbQ5tN/H/L873/xVUMywYUVGu9vTJ6SZ6ccDYRbo8hYUZpa0OsjEJAQdQpt0vLbzYTRwbJl8Kh+KZmbf7wgELNygzL5siSLyxde4KIOMwo6YP/3GJWpnj+UNQ5DAeuRclu10rOl9D1Q2htSJjxqwwgnephQFEyCUwEd9p1S6xKd3MIG9e2SpghBhRvSoDmCKG1aZ6WDTPIVH8KrMyVGqBBQkchzCBW5rVc7rAqQmRt/HJhhhBQlEtbVEMIrY1fxtqIAUXJtEVFhNDaeHv4Pv1RAPCH1oCCETqRDS455TxCfCQcioWTGjRt0dSTtqCETp+pgVp4xcrHeH8MP8DJJ3Qa+FC/eJihO6AghOIqNN7vwleh0Tq7e8EPgMg5hHQ/zYVX2NoQK9PWFVBwQr6TwAnvJPhwMCH7QIKQ7lTYADNaoaQGCSieYUBxqAPQNOHqxp4PJm3pMIMGFFfAymjau2+acHV1s0iY8Ud/2sI44cZHgaSGibSF+T7cuILxWUdm4n9HVmatox5QVEvYlw0zNAYUFRM6QlIja+IX0haqAUUhwo0oocx8GNnXBofia95Q1BlQJBAenzEhn8W5YOUBKg9Y+UPCa3P7vD5wQWCYQdZO0yd+nLbY1hJQxAlFtxP7oS4rulG/VMJrix+el9TQG1AkEBqJLQQha9NKtzZa1kHnSoiSGhlhhuaAYh6E2UkNvg6qfYWiMkI0FFPDDB5QlNxtoYOwGxIYV5uvh3GdAn9kyA8bdjluN3XtlAUU4Ii9p4RambaLd7A04WYs6W17ybsjI+LPCAlJjd+itaHroFdwL23OFk6/sDcnS3hdMvcPuppXYievnfKAQkLNos4Az9O4RDQv47IPSOPshG6UkUvrc9zEpAYNKOAe3PyvKLw1kRH2+M5z5KX1+c5zBxH6/13ZLax/PUqI6u+jMCNibcg6KDjS+5b3FSAwLuoOSORpPijh+kpRrX8jhLR+4FX73VCYQddBwVTv5X+DEmF2bKFOiCuHIKG1Ux5Q+Dv5X7D4hLGkBl8HtYe7+RVWQbhOxCkiH4jlOOHGh8/CjK2f7z95QEG6MKu6agiPiPbxd67T8hFp0T4t7yb34cZ3j4UZazhrAQIKnxCu70aq2xWrq4Jw/ZJGVV38lfu07F5iZId84F6tJxKivA0NM9aYlaF92BBPBxUc0/JxZYTUC3P30VcesTIlJGUnlfDC5mEGDSgo4W7DEU6HhLT8mQgHaBvDIUXEAcVmHmFDPyEbOGe6+9CBYQbZoonXQW332jjh8QcVztO4F2e0PNBBGK5fWDt9ho5at2G8DwU31CV5Gq6GOmG0fh5m7IEjrhsVEOYpl9DJJozXh4YizB2i6GOBCNnsQAhjswVVNiGwNh6wp3CDOsoJcELhdERIE3YVEa4csVchkBmZlTHxyhUtX2YSAiRG2OCEKwfi6fCK0vJBVYTMnYr9v55QLk7IvbVwdeSHCgiLqThhjmrC/2vCjPnQ0UEYq9+umNA5vmC6Qj7NgJV7rjqh0+D1I5+p8j4M5WmIX8r202jM06A9NqhTh9UTFozx+ayQUU6JLTIIU6tTnS2kCXdPqUgTWJlkWS4PcPFgvxRh6HSYQiC1H3yriDDfa2PljPgwnZB5ba5ur63aCDiTUDjdcARcE9aEi0cYWrdImw/LRsDxdZHKCRsDJrwnuMfKfQ192IjWn+LTVJKnSVs/VJotBD+XvSix0GzhVhbjx2b8y+iMT8uhGT+uFL80dLow45+qzvjShCW9NmlCY16bPGEhLVJ8WBPWhJ+BUNwsGS+rE0bqrz5Pw6+uI/zLflLO00Trrz5PE90j/BHeI6yYERbrP0WIaTH+SrhebRnhrH3eoTxNelafrLwnZ/Wjb9lNJbwyldXXF+Mnr8wUjvG1r8yoR0+5scX8o6fljw9rwpqwJlQk1LBjKJxHcYT9pW4jabYouutLKk+TvutLPYshPMuNr1n4WW7FnXuxZ8VTvDZzO/eEvAy9LVLWD8vtvmzE9pGn+aWmdl/mSnv0VLXnXRPWhJ+QUNxZkLXKvS4oi1Coz82wpXm16iN0+jwLP4BbF1II90+5juK/5vPhd6G+hpNHeMlrvTRE6PI/dIO3FiQTrh/wh2mJ15FI6ByvCvX18gj3hVqJ76S/D8+415ZJKKRzsgmF+nIJj4Shu5yE+0tPWPfh5yes+7AmXHzC+i7VQ7ghRXgqEsY9U9GnCRG61wLh0A0TrocJBXe1NKEb18UH1wAcAAn349oTH61J+P2/Pq7+WKjuo3+NHtluP7XwE9y2vdkFn+yws74JLep+E+srSZgk4W9skT+yZSe+Tjh0TsbvY/X5bfyOs6u2Hz8/tVZbH6FZAd4d+nje4Q67hjIqTPhlry2n+AscJI8jH3u8kQDvrdNizx+2Oq87nvjrlJqxvOJvxuhI6iSigse9Dmn7uy8na+E/KdRaO3nptgnk8C2zGQvz9vmItnY8jOfH8Bhkz8fvDfF2FuIvdRQUBhz2TlrnrTSdt056Q4w47+YW1zm2Zwe9Xu80XeC3B2ge8Rf1VkzXuUdNaI6IUf2Et+lbu8Ar+9v6XilYoZ72dmS1p+fNrLVq1apVq6j+BzzOi7jmr+u0AAAAAElFTkSuQmCC"
              loading="lazy"
            />
            <span className=""> NightMeals</span>
          </div>
        </div>
      </div>
      <div className="flex flex-row md:flex-row items-center md:flex-wrap gap-2 my-2 md:my-0   ">
        {errorMessage && <div className="error-container">{errorMessage}</div>}
        {allRestaurants?.length === 0 ? (
          <Shimmer />
        ) : (
          <div className="restaurant-list flex flex-row md:flex-row items-center md:flex-wrap gap-2 my-2 md:my-0 justify-evenly">
            
            {filteredRestaurants.map((restaurant) => {
              return (
                <Link
                  to={"/restaurant/" + restaurant?.info?.id}
                  key={restaurant?.info?.id}
                >  <RestaurantCard {...restaurant?.info} />
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Body;

// const Body = () => {
//   const [allRestaurents, setAllRestaurents] = useState([]);
//   const [filteredRestaurents, setFilteredRestaurents] = useState([]);
//   const [searchText, setSearchText] = useState("");

//     useEffect(() => {
//       getData();
//     }, []);
//     async function getData() {

//       const url = await fetch(
//         "https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.6295538&lng=77.0801899&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
//       );
//       const json = await url.json();
//       console.log(json.data.cards[2].card.card.gridElements)

//       setAllRestaurents(json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
//       // setFilteredRestaurents(json?.data?.cards[2]?.card?.card?.gridElements?.infoWiyhStyle?.restaurants);
//     }
//     // const isonline = useOnline();
//     // if(!isonline){
//     //   return<h1>Offline, please check your conection</h1>
//     // }

// // condtition rendering
// return (
//   <div className="mx-8 ">
//   <div className="flex flex-col justify-between items-center md:flex md:flex-row">
// <div className="text-sm flex gap-2 my-4">
//   <input
//     type="text"
//     placeholder="Search for a restaurants or cafe"
//     className="w-64 text-xs border border-gray-300 focus:border-yellow-500 transition-all duration-300 px-2 py-2 rounded"
//     value={searchText}
//     onChange={(e)=>{
//       setSearchText(e.target.value)
//   const fData = filterData(searchText,allRestaurents)
//  setFilteredRestaurents(fData)
// }}
// />
// <button className="text-xs font-medium shadow-md px-2 py-2 outline-none  rounded bg-yellow-400 hover:bg-yellow-500 transition-all duration-200 ease-in-out text-white"
// onClick={()=>{
//   searchData(searchText, allRestaurants);
//  const fData = filterData(searchText,allRestaurents)
//  console.log(fData)
//  setFilteredRestaurents(fData)
//   }}
//       >
//         Search
//       </button>
//     </div>
//       <div className="flex gap-12 cursor-pointer text-xs">
//           <div className="flex gap-4 items-center">
//           <img className="h-6" alt="illustration" src="data:image/png;base64,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" loading="lazy" />
//               <span className="">Delivery!</span>
//           </div>
//           <div className="flex gap-4 items-center">
//           <img className="h-6" alt="illustration" src="data:image/png;base64,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" loading="lazy" />
//               <span className="whitespace-nowrap">Dining In</span>
//           </div>
//           <div className="flex gap-4 items-center">
//           <img className="h-6" alt="illustration" src="data:image/png;base64,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" loading="lazy" />
//               <span className="">NightMeals</span>
//           </div>
//       </div>
//       </div>
//     <div className="flex flex-col md:flex-row items-center md:flex-wrap gap-2 my-2 md:my-0   ">
//     {errorMessage && <div className="error-container">{errorMessage}</div>}
//     {allRestaurants?.length === 0 ? (
//         <Shimmer />
//       ) : (
//         <div className="restaurant-list">
//           {/* We are mapping restaurants array and passing JSON array data to RestaurantCard component as props with unique key as restaurant.data.id */}
//           {filteredRestaurants.map((restaurant) => {
//             return (
//               <RestaurantCard key={restaurant?.info?.id} {...restaurant?.info} />
//             );
//           })}
//         </div>
//       )}
//     </div>
//   </div>
// );
// };
// export default Body;
