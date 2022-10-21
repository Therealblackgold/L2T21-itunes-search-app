import { useEffect, useState } from "react";
// react toastify imports
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
// components
import AddFavourites from "./components/AddFavourites";
import ItemsList from "./components/ItemsList";
import ItemsListHeading from "./components/ItemsListHeading";
import RemoveFavourites from "./components/RemoveFavourites";
import SearchBox from "./components/SearchBox";
import SelectOptions from "./components/SelectOptions";
import UserMessages from "./components/UserMessages";
// spinner loader image
import SPINNER from "./assets/spinner.gif";
// style sheet
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  // DECLARING APP STATE
  const [items, setItems] = useState([]);
  const [termValue, setTermValue] = useState("");
  const [media, setMedia] = useState("");
  const [favourites, setFavourites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // SELECT MEDIA OPTIONS
  const options = [
    { value: "all", label: "All" },
    { value: "audiobook", label: "Audio Book" },
    { value: "ebook", label: "EBooks" },
    { value: "music", label: "Music" },
    { value: "movie", label: "Movie" },
    { value: "musicVideo", label: "Music Videos" },
    { value: "podcast", label: "Podcast" },
    { value: "software", label: "Software" },
    { value: "shortFilm", label: "Short Film" },
    { value: "tvShow", label: "TV Show" },
  ];

  // SELECT HANDLER
  const selectHandleChange = (selectedOption) => {
    setMedia(selectedOption.value);
  };

  // GET ITEMS FUNCTION
  const getItemsRequest = async (termValue, media) => {
    if (termValue) {
      // setting state
      setIsLoading(true);
      setError(null);

      // call to express server stored as proxy in package.json file.
      await fetch(`/api/?media=${media}&term=${termValue}`)
        .then((response) => {
          if (!response.ok) {
            throw Error("Something went wrong!");
          }
          // getting response and parsing response with json
          return response.json();
        })
        .then((responseJson) => {
          // setting state
          setItems(responseJson);
          setIsLoading(false);
          setError(null);
        })
        // catch error
        .catch((err) => {
          // setting state
          setIsLoading(false);
          setError(err.message);
          setItems([]);
        });
    }
  };

  // CALLING GET MOVIES FUNCTION
  useEffect(() => {
    /*call getItemsRequest function which takes termValue param.
     The if block just checks if termValue.length is more than 2 
     before calling getItemsRequest function*/
    if (termValue.length > 2) {
      getItemsRequest(termValue, media);
    } else {
      /*setItems to an empty array when 
      termValue.length is less than 2.*/
      setItems([]);
    }
    /*setting searValue and media as dependencies to filter 
    items list each time termValue or media changes*/
  }, [termValue, media]);

  // ADD FAVOURITES FUNCTION
  const addFavouriteItem = (item) => {
    /*making a new array "newFavouriteList" which copies 
    the current favourites array then add clicked item. */
    const newFavouriteList = [...favourites, item];
    // setFavourites to the "newFavouriteList" array
    setFavourites(newFavouriteList);
    toast.success("Item added to favourites.");
  };

  // REMOVE FAVOURITES FUNCTION
  const removeFavouriteItem = (item) => {
    /*creating a "newFavouriteList" that filters 
    favourites list removes clicked item matching "trackId"*/
    const newFavouriteList = favourites.filter(
      (favourite) => favourite.trackId !== item.trackId
    );
    // setFavourites to the "newFavouriteList" array
    setFavourites(newFavouriteList);
    toast.success("Item removed from favourites.");
  };

  // RETURNING UI
  return (
    <>
      <div className="app-wrapper container-fluid item-app">
        <ToastContainer position="top-center" />
        {/* UserMassages component props error, isLoading, SPINNER  */}
        <UserMessages error={error} isLoading={isLoading} SPINNER={SPINNER} />
        <div className="row d-flex align-items-center mt-4 mb-4">
          {/* ItemListHeading component props heading, media, termValue */}
          <ItemsListHeading
            heading="Itunes Search App"
            media={media}
            termValue={termValue}
          />
          {/* SearchBox component props termValue, setTermValue */}
          <SearchBox termValue={termValue} setTermValue={setTermValue} />
        </div>
        <div className="col">
          {/* SelectOptions component props media, options, selectHandleChange */}
          <SelectOptions
            media={media}
            options={options}
            selectHandleChange={selectHandleChange}
          />
        </div>
        <div className="row mx-0">
          {/* Results ItemsList component props items, handleFavouritesClick, FavouriteComponent */}
          <ItemsList
            items={items}
            handleFavouritesClick={addFavouriteItem}
            FavouriteComponent={AddFavourites}
          />
        </div>
        <div className="row d-flex align-items-center mt-4 mb-4">
          {/* ItemListHeading component props heading */}
          <ItemsListHeading heading="Favourites" />
        </div>
        <div className="row">
          {/* ItemsList component props items, handleFavouritesClick, FavouriteComponent */}
          <ItemsList
            items={favourites}
            handleFavouritesClick={removeFavouriteItem}
            FavouriteComponent={RemoveFavourites}
          />
        </div>
      </div>
    </>
  );
}

export default App;
