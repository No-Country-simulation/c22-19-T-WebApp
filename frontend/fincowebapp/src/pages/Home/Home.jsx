import { SearchBar } from "../../components/filter/searchbar";
import { Header, CardWelcome } from "../../components/"
import { fakeUser } from "../../utils/data";

export const Home = () => {
    return (
      <>
        <Header />
        <main>
          <h2>Home</h2>
          <p>Esta es la pagina de home</p>

          <SearchBar></SearchBar>

          <CardWelcome 
            name={fakeUser.nombre}
            salesValue = {192065}
            salesValuePrev = {132000}
          />

        </main>
      </>
      );
}