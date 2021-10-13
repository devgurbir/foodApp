import Navbar from './navbar.js'
import FoodItem from './foodItem.js'


const container = document.querySelector('.container')
container.innerHTML = Navbar();

window.addEventListener('load', () => {
     const searchBtn = document.querySelector('.searchBtn');
     searchBtn.addEventListener('click', showFood)
})

function searchFood(q){
    
        let fetchReq = fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${q}`)
        .then( res => res.json() )
        .then( res => res.meals[0]);       
        
        return fetchReq;
    
    
}

async function showFood(){
    const searchInput = document.querySelector('input[name="search"]').value
    console.log(searchInput)
    const data = await searchFood(searchInput);
    
    const {idMeal, strMeal, strMealThumb, strCategory, strTags, strYoutube, strArea, strInstructions, ...rest} = data;
        
    const ingredients = []
        
    for(let prop in rest){
        if(prop.includes('Ingredient') && rest[prop]){
            ingredients.push(rest[prop])
         }
    }

    // console.log(ingredients)

    const foodContainer = document.createElement('div')
    foodContainer.className='foodContainer'
    foodContainer.innerHTML = FoodItem();
    
    const container = document.querySelector('.food');
    container.innerHTML = null;
    container.appendChild(foodContainer)

    const mealNameHeading = document.querySelector('.mealNameHeading')
    mealNameHeading.textContent = strMeal;    

    const mealImage = document.querySelector('.mealImage')
    mealImage.src = strMealThumb;  

    const foodCategory = document.querySelector('.foodCategory')
    foodCategory.textContent = `Category: ${strCategory}`;   

    const foodArea = document.querySelector('.foodArea')
    foodArea.textContent = `Cuisine: ${strArea}`;
    
    const foodInstructions = document.querySelector('.foodInstructions')
    foodInstructions.textContent = strInstructions;

    const foodIngredients = document.querySelector('.foodIngredients')
    foodIngredients.textContent = `Ingredients: ${[...ingredients]}`;
}
