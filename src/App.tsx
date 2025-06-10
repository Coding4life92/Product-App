import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import ProductPage from "./components/ProductPage";
import TopSellers from "./components/TopSellers";
import PopularBlogs from "./components/PopularBlogs";

export default function App() {
  return (
    <Router>
      <div className="flex justify-center flex-col lg:flex-row min-h-screen">
        <div className="w-full lg:w-1/5">
          <Sidebar />
        </div>

        {/* Main area and right column */}
        <div className="flex flex-col lg:flex-row flex-1">
          {/* Main content area */}
          <div className="w-full lg:w-2/3">
            <Routes>
              <Route path="/" element={<MainContent />} />
              <Route path="/product/:id" element={<ProductPage />} />
            </Routes>
          </div>

          {/* Right side content: stacks below main on mobile */}
          <div className="w-full lg:w-1/4 px-4">
            <TopSellers />
            <PopularBlogs />
          </div>
        </div>
      </div>
    </Router>
  );
}
