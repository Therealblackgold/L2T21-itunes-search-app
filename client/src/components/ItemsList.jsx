// ItemList component renders a list of items returned from the api.
const ItemsList = ({ items, FavouriteComponent, handleFavouritesClick }) => {
  return (
    <>
      {items.map((item, index) => (
        <div
          key={index}
          className="col card-container  m-3"
          data-testid="listItem"
        >
          <div className="card">
            <img src={item.artworkUrl100} alt="item" />
            <h5>
              {item.artistName}, {item.trackName}
            </h5>
            <p>
              Date:{item.releaseDate}, Categories:{item.kind}{" "}
              {item.primaryGenreName}
            </p>
            <div
              onClick={() => handleFavouritesClick(item)}
              className="overlay d-flex align-items-center justify-content-center"
            >
              <FavouriteComponent />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ItemsList;
