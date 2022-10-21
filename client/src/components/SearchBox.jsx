// SearchBox component renders a search input to get items using the entity api query.
const SearchBox = ({ termValue, setTermValue }) => {
  return (
    <div className="col col-sm-4">
      <input
        type="text"
        className="form-control"
        placeholder="Search"
        value={termValue}
        onChange={(event) => setTermValue(event.target.value)}
      />
    </div>
  );
};

export default SearchBox;
