import { useEffect, useState } from 'react'
import './App.css'
import RecipeInfo from './components/RecipeInfo'

const API_KEY = import.meta.env.VITE_APP_API_KEY

function App() {
  const [list, setList] = useState([])

  useEffect(()=>{
    fetchAllRecipeData().catch(console.error);
    

  },[])

  const fetchAllRecipeData =async()=>{
    const response = await fetch(
      "https://api.spoonacular.com/recipes/findByNutrients?maxCalories=1000&number=10&apiKey="+API_KEY
    )
    const json= await response.json();
    setList(json ||[]);
    console.log(json)
    
  }



  return (
    <>
       <div className='whole-page'>
      <h1>Low Calorie Recipe List</h1>
      <ul>
        {list
        .map((recipe) => (
          <RecipeInfo id={recipe.id} title ={recipe.title} image ={recipe.image} calories ={recipe.calories}/>
        ))}
      </ul>
    </div>
    </>
  )
}

export default App
