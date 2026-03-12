import React, { useCallback, useState } from "react";
import Navbar from "./components/Navbar";
import Homeview from "./components/Homeview";
import CategorySel from "./components/CategorySel";
import CuisineBar from "./components/Cuisine";
import RecipeCard from "./components/RecipeCard";
import { RecipeDetailView } from "./components/RecipeDetailView";
import SearchView from "./components/SearchView";
import TrendingRecipe from "./components/TrendingRecipe";
import RecipeSlider from "./components/RecipeSlider";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const API_URL = "https://www.themealdb.com/api/json/v1/1/";

const App = () => {
  const [searchResult, setsearchResult] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const filterRecipe = useCallback(async (query, filterType) => {
    setsearchResult([]);
    setSearchLoading(true);
    try {
      const res = await fetch(`${API_URL}filter.php?${filterType}=${query}`);
      if (!res.ok) throw new Error(`Error: ${res.status}`);

      const result = await res.json();
      setsearchResult(result?.meals || []);
    } catch (error) {
      console.log(error);
    } finally {
      setSearchLoading(false);
    }
  }, []);

  // filter by category
  const filterByCategory = useCallback(
    (category) => {
      filterRecipe(category, "c");
    },
    [filterRecipe]
  );

  // filter by area
const filterByArea = useCallback(
  (area) => {
    filterRecipe(area, "a");
  },
  [filterRecipe]
);

  const handleSearch = useCallback(async (query) => {
    setsearchResult([]);
    setSearchLoading(true);
    try {
      const res = await fetch(`${API_URL}search.php?s=${query}`);
      if (!res.ok) throw new Error(`Error: ${res.status}`);

      const result = await res.json();
      setsearchResult(result?.meals || []);
    } catch (error) {
      console.log(error);
    } finally {
      setSearchLoading(false);
    }
  }, []);

  return (
    <>
      <Router>
        <div className="min-h-screen bg-grey-950 font-sans text-grey-100">
          <Navbar handleSearch={handleSearch} />
          <CuisineBar filterByArea={filterByArea}/>
          <Routes>
            <Route path="/" element={<Homeview filterByCategory={filterByCategory}/>} />
            <Route path="/recipe/:id" element={<RecipeDetailView />} />
            <Route
              path="/search/:query"
              element={
                <SearchView meals={searchResult} loading={searchLoading} />
              }
            />
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default App;
