import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

test("renders inventory list", () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByText("Inventory List")).toBeInTheDocument();
});

test("navigates to edit inventory list", () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  fireEvent.click(screen.getAllByText("Edit List")[0]);
  expect(screen.getByText("View Deleted")).toBeInTheDocument();
});

test("adds item to list", () => {
  render(
    <MemoryRouter initialEntries={["/lists"]}>
      <App />
    </MemoryRouter>
  );
  // Add your test here
  fireEvent.change(screen.getByTestId("itemName"),{target :{value : "item1"}})
  fireEvent.click(screen.getByTestId("addBtn"));

});

test("removes items from list", () => {
  render(
    <MemoryRouter initialEntries={["/lists"]}>
      <App />
    </MemoryRouter>
  );
  // Add your test here
  fireEvent.click(screen.getAllByTestId("deleteBtn")[0]);
  expect(screen.queryByText("Sample Item 1")).not.toBeInTheDocument();


});

test("clears list", () => {
  render(
    <MemoryRouter initialEntries={["/lists"]}>
      <App />
    </MemoryRouter>
  );
  // Add your test here
  fireEvent.click(screen.getByTestId("clearAllBtn"));
  expect(screen.queryByTestId("deleteBtn")).not.toBeInTheDocument();

});
