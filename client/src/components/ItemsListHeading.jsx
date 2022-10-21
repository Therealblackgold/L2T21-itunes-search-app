// This component simply renders dynamic headings for the itemsList component.
const ItemsListHeading = ({ heading, media, termValue }) => {
  return (
    <div className="col">
      <h1>{heading}</h1>
      {media || termValue ? (
        <p>
          {media} - {termValue} results
        </p>
      ) : null}
    </div>
  );
};

export default ItemsListHeading;
