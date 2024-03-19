import './App.css';
import Header from "./components/header/header.component";
import MovieContainer from './components/movie/moviecontainer.component';
import Footer from "./components/footer/footer.component";

function App() {
  return (
    <div className="App">
      <Header />
        <MovieContainer />
      <Footer />
    </div>
  );
}

export default App;
