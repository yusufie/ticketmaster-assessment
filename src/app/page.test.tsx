import React from "react";
import { render, screen } from "@testing-library/react";
import HomePage from "@/app/page";
import "@testing-library/jest-dom";

// Mock components used in HomePage
jest.mock("@/components/SearchBar/SearchBar", () => {
  const SearchBar = () => <div data-testid="search-bar" />;
  SearchBar.displayName = "SearchBar";
  return SearchBar;
});

jest.mock("@/components/SortBar/SortBar", () => {
  const SortBar = () => <div data-testid="sort-bar" />;
  SortBar.displayName = "SortBar";
  return SortBar;
});

jest.mock("@/components/EventTable/EventTable", () => {
  const EventTable = () => <div data-testid="event-table" />;
  EventTable.displayName = "EventTable";
  return EventTable;
});

jest.mock("@/components/Pagination/Pagination", () => {
  const Pagination = () => <div data-testid="pagination" />;
  Pagination.displayName = "Pagination";
  return Pagination;
});

describe("HomePage", () => {
  it("renders all main components", () => {
    render(<HomePage />);

    // Assert that all the key components are rendered
    expect(screen.getByTestId("search-bar")).toBeInTheDocument();
    expect(screen.getByTestId("sort-bar")).toBeInTheDocument();
    expect(screen.getByTestId("event-table")).toBeInTheDocument();
    expect(screen.getByTestId("pagination")).toBeInTheDocument();
  });
});
