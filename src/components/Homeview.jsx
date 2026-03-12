import React from "react";
import RecipeSlider from "./RecipeSlider";
import TrendingSlider from "./TrendingRecipe";
import CategorySection from "./CategorySel";

import { API_URL } from "./useFetch";

const Homeview = ({ filterByCategory }) => {
  return (
    <>
      <main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <RecipeSlider
          title="Staff Curated Picks"
          fetchUrl={`${API_URL}search.php?f=c`}
        />
        <TrendingSlider
          title="Staff Curated Picks"
          fetchUrl={`${API_URL}filter.php?a=Canadian`}
        />
        <CategorySection filterByCategory={filterByCategory} />
      </main>
    </>
  );
};

export default Homeview;
