import SearchBar from "@/components/SearchBar";
import EventTable from "@/components/EventTable";
import Pagination from "@/components/Pagination";
import SortBar from "@/components/SortBar";

function HomePage() {

  return (
      <div className="flex flex-col justify-center items-center h-full w-full">

        <header className="flex flex-row justify-around items-center w-full max-w-screen-2xl py-6">
          <SearchBar />
          <SortBar />
        </header>

        <main className="flex flex-col w-full max-w-screen-2xl px-6">
          <EventTable />
          <Pagination />
        </main>

      </div>
  );
}

export default HomePage;