// AddFavourites renders the overlay content to add favourites
const AddFavourites = () => {
  return (
    <>
      <span style={{ marginRight: "6px" }}>Add to Favourites</span>
      <i
        className="bi bi-heart-fill"
        style={{ color: "red", marginTop: "2px" }}
      ></i>
    </>
  );
};

export default AddFavourites;
