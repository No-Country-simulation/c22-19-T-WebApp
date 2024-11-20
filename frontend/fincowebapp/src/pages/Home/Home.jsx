import { Header } from "../../components/"
import { SearchBar } from "../../components/filter/searchbar";

export const Home = () => {
    return (
      <>
        <Header />
        <main>
          <h2>Home</h2>
          <p>Esta es la pagina de home</p>
          <SearchBar></SearchBar>
        </main>
      </>
      );
}