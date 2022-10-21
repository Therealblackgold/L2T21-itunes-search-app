import ItemsList from "../components/ItemsList";
import AddFavourites from "../components/AddFavourites";
import { render, screen, fireEvent } from "@testing-library/react";
import renderer from "react-test-renderer";

const mockedAddFavouriteItem = jest.fn();
const mockedItem = [
  {
    artworkUrl100:
      "https://is3-ssl.mzstatic.com/image/thumb/Music115/v4/fb/64/0a/fb640a31-440e-6855-7bf9-8368648bb74d/14UMGIM60062.rgb.jpg/100x100bb.jpg",
    artistName: "James Bay",
    trackName: "Let It Go",
    releaseDate: "05:03:2014",
    kind: "song",
    primaryGenreName: "Alternative",
  },
];

describe("ItemList Component", () => {
  test("Should render properly", () => {
    const component = renderer.create(
      <ItemsList
        items={mockedItem}
        handleFavouritesClick={mockedAddFavouriteItem}
        FavouriteComponent={AddFavourites}
      />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("Should render a list item and display item data", () => {
    render(
      <ItemsList
        items={mockedItem}
        handleFavouritesClick={mockedAddFavouriteItem}
        FavouriteComponent={AddFavourites}
      />
    );
    const listItem = screen.getByTestId("listItem");
    expect(listItem).toBeInTheDocument();
  });

  test("Should be able to render addFavourite component", () => {
    render(
      <ItemsList
        items={mockedItem}
        handleFavouritesClick={mockedAddFavouriteItem}
        FavouriteComponent={AddFavourites}
      />
    );
    const addFavourite = screen.getByText(/add to Favourites/i);
    expect(addFavourite).toBeInTheDocument();
  });

  test("Should call addFavouriteItem function when clicked", () => {
    render(
      <ItemsList
        items={mockedItem}
        handleFavouritesClick={mockedAddFavouriteItem}
        FavouriteComponent={AddFavourites}
      />
    );
    const addFavouriteButton = screen.getByText(/add to favourites/i);
    fireEvent.click(addFavouriteButton);
    expect(mockedAddFavouriteItem).toHaveBeenCalledTimes(1);
  });
});
