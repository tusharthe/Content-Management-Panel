
import './App.css';
import Body from './body';
import Header from './header';
import AddNewPoster from './add-new-poster';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App() {

  return (


    <>
      <div className="App">
        <div className="relative bg-white min-w-full  min-h-screen">
          <BrowserRouter>
            <Header />

            <Switch>
              <Route path="/" exact component={() => {
                return (
                  <Body />
                );
              }}
              />

              <Route path="/add-new" exact component={() => {
                return (
                  <AddNewPoster />
                );
              }}
              />



            </Switch>

          </BrowserRouter>
        </div>
      </div>

    </>


  );
}

export default App;
