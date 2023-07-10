import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoute } from "./routes/route";
import DefaultLayout from "./layout/DefaultLayout/DefaultLayout";
import LayoutWithTwoSide from "./layout/LayoutWithTwoSide/LayoutWithTwoSide";
function App() {
  return (
    <>
      <Router>
        <Routes>
          {publicRoute.map((route, index) => {
            let Layout = <DefaultLayout>{route.component}</DefaultLayout>;
            if (route.layout) {
              Layout = <LayoutWithTwoSide>{route.component}</LayoutWithTwoSide>;
            }
            return (
              <Route path={route.path} element={Layout} key={index}></Route>
            );
          })}
        </Routes>
      </Router>
    </>
  );
}

export default App;
