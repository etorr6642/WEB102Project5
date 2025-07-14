import { useEffect, useState } from "react"
const API_KEY = import.meta.env.VITE_APP_API_KEY

const RecipeInfo=({id, title, image, calories })=>{

    const [details, setDetails]=useState(null);

    useEffect(() => {
        fetchRecipeDetails().catch(console.error);
    }, [id])

    const fetchRecipeDetails = async()=>{
        const res = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`);
        const data = await res.json();
        setDetails(data);
        console.log(data);
    };

    return(

        <li className="recipe-card">
            <img src={image} alt={title} width="100" />
            <h3>{title}</h3>
            <p>Calories: {calories}</p>

            {details && (
                <>
                <p>Ready in: {details.readyInMinutes} minutes</p>
                <p>Servings: {details.servings}</p>
                <a href={details.sourceUrl} target="_blank">Full Recipe</a>
                </>
            )}
        </li>


    );

   



} 

export default RecipeInfo;