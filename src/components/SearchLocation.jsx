import axios from "axios";
import  { useState } from "react";

const api = `https://nominatim.openstreetmap.org/search.php?`;

const SearchLocation = ({ setPosition }) => {
  const [search, setSearch] = useState("");
  const [locationList, setLocationList] = useState([]);

  const handleSearch = () => {
    const params = {
      q: search,
      format: "json",
      addressdetails: 1,
      polygon_geojson: 1,
    };
    const urlQueryString = new URLSearchParams(params);
    axios
      .get(`${api}${urlQueryString}`)
      .then((response) => {
        setLocationList(response.data);
      })
      .catch((error) => {
        const { response } = error;
        console.table(response);
        console.log(error);
      });
  };

  const handleListOnClick = (location) => {
    const { lat, lon } = location;
    setPosition({
      lat,
      lng: lon,
    });
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className="search-container"
    >
      <div className="input-box">
        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <button
          onClick={() => {
            handleSearch();
          }}
        >
          Search
        </button>
      </div>
      <div className="location-list">
        <ul>
          {locationList.map((location) => {
            return (
              <li
                key={location.lon}
                onClick={() => {
                  handleListOnClick(location);
                }}
              >
                {location.display_name}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default SearchLocation;
