import { useEffect, useState } from 'react'
import './App.css'
import RecipeInfo from './components/RecipeInfo'

const API_KEY = import.meta.env.VITE_APP_API_KEY

function App() {
  const [list, setList] = useState([])
  const [searchInput, setSearchInput]=useState("")
  const [calorieRange, setCalorieRange] = useState("all");

  useEffect(()=>{
    fetchAllRecipeData().catch(console.error);
    

  },[])

  const fetchAllRecipeData =async()=>{
    const response = await fetch(
      "https://api.spoonacular.com/recipes/findByNutrients?maxCalories=1000&number=2&apiKey="+API_KEY
    )
    const json= await response.json();
    setList(json ||[]);
    console.log(json)
    
  }

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);  // updates the state
  };

  const displayedRecipes = list.filter(recipe => {
    const matchesSearch = Object.values(recipe)
      .join("")
      .toLowerCase()
      .includes(searchInput.toLowerCase());

    let matchesCalories = true;
    const cals = recipe.calories;

    switch (calorieRange) {
      case "low":
        matchesCalories = cals < 300;
        break;
      case "medium":
        matchesCalories = cals >= 300 && cals <= 600;
        break;
      case "high":
        matchesCalories = cals > 600 && cals <= 900;
        break;
      case "veryHigh":
        matchesCalories = cals > 900;
        break;
      default:
        matchesCalories = true;
    }

    return matchesSearch && matchesCalories;
  });
  
  const averageCalories = displayedRecipes.length > 0
    ? Math.round(
        displayedRecipes.reduce((sum, recipe) => sum + recipe.calories, 0) / displayedRecipes.length
      )
    : 0;

  const maxCalories = displayedRecipes.length > 0
  ? Math.max(...displayedRecipes.map(recipe => recipe.calories))
  : 0;

  return (
    <>
       <div className='whole-page'>
      <h1>Low Calorie Recipe List</h1>
      <div className='stats'>
        <div className='totalItems'>
          Showing {displayedRecipes.length} recipe{displayedRecipes.length !== 1 ? "s" : ""}
        </div>
        <div className='avgCalories'>Average Calories: {averageCalories}</div>
        <div className='maxCalories'>Max Calories: {maxCalories}</div>
      </div>

      <div className='search'>
        <div className="title">
          Search by title: 
          <input
            type="text"
            placeholder="Search..."
            onChange={(inputString) => searchItems(inputString.target.value)}
          />
        </div>

        <div className='calorie'>
        Search by calorie range: 
        <select onChange={(e) => setCalorieRange(e.target.value)} value={calorieRange}>
          <option value="all">All</option>
          <option value="low">&lt; 300</option>
          <option value="medium">300–600</option>
          <option value="high">600–900</option>
          <option value="veryHigh">&gt; 900</option>
        </select>
        </div>

      </div>

      <ul>
        {displayedRecipes.map((recipe) => (
          <RecipeInfo
            key={recipe.id}
            id={recipe.id}
            title={recipe.title}
            image={recipe.image}
            calories={recipe.calories}
          />
        ))}
      </ul>
      
    </div>
    </>
  )
}

export default App
