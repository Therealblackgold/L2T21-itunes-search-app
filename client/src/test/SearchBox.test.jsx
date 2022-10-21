import { render, screen, fireEvent } from "@testing-library/react";
import SearchBox from "../components/SearchBox";
import renderer from "react-test-renderer";

const mockedSetTermValue = jest.fn();

describe("ItemList Component", () => {
  test("Should be able to type into input", () => {
    render(<SearchBox setTermValue={mockedSetTermValue} />);
    const inputElement = screen.getByPlaceholderText(/search/i);
    fireEvent.change(inputElement, { target: { value: "Jane Doe" } });
    expect(inputElement.value).toBe("Jane Doe");
  });

  test("Component renders properly", () => {
    const component = renderer.create(
      <SearchBox setTermValue={mockedSetTermValue} />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
