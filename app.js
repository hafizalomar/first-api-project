document.getElementById("searchBtn").addEventListener("click", (event) => {
    const inputValue = document.getElementById("searchBox").value;
    document.getElementById("container").innerHTML = "";


    if (inputValue == "") {
        notFound();
    } else {
        document.getElementById("notFound").innerHTML = "";
        let fetchRes = fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`);

        fetchRes.then(res => res.json()).then(data => {
            if (data.meals) {
                displayItem(data.meals);
            } else {
                notFound();
            }
        })

        document.getElementById("searchBox").value = "";
    }
})

const notFound = () => {
    document.getElementById("container").innerHTML = "";
    document.getElementById("notFound").innerHTML = "";

    const notFound = document.getElementById("notFound");
    const div = document.createElement("div");
    div.innerHTML = `
     <div class="d-flex align-items-center justify-content-center">
        <div class="text-center">
            <h1 class="display-1 fw-bold">404</h1>
            <p class="fs-3"> <span class="text-danger">Opps!</span> Page not found.</p>
            <p class="lead">
                The page you’re looking for doesn’t exist.
            </p>
            <a href="index.html" class="btn btn-primary">Go Home</a>
        </div>
    </div>
    `

    notFound.appendChild(div);
}

const displayItem = (elements) => {
    const itemContainer = document.getElementById("container");

    console.log(itemContainer);

    elements.forEach(element => {
        console.log(element);
    
        const div = document.createElement("div");
        div.innerHTML = `
        <div class="card" style="width:400px">
            <img class="card-img-top" src="${element.strMealThumb}" alt="Card image">
            <div class="card-body">
                <h4 class="card-title">${element.strMeal}</h4>
            </div>
        </div>
        `;

        div.addEventListener("click", () => {
            showFoodDitals(element);
        });

        itemContainer.appendChild(div);
    });
};

const showFoodDitals = (element) => {
    const dital = document.getElementById("dital");
    dital.innerHTML = "";

    const div = document.createElement("div");

    let tableRows = "";
    for (let i = 1; i <= 20; i++) {
        const ingredient = element[`strIngredient${i}`];
        const measure = element[`strMeasure${i}`];

        if (ingredient != "" && measure != "") {
            tableRows += `
                <tr>
                    <th scope="row">${i}</th>
                    <td>${ingredient}</td>
                    <td>${measure}</td>
                </tr>
            `;
        }
    }


    div.innerHTML = `
        <div class="card" style="width:400px">
            <img class="card-img-top" src="${element.strMealThumb}" alt="Card image">
            <div class="card-body">
                <h4 class="card-title">${element.strMeal}</h4>
                <p class="card-text">Category: ${element.strCategory}</p>
                <table class="table table-striped">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Ingredient</th>
                        <th scope="col">Measure</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${tableRows}
                    </tbody>
                </table>
            </div>
        </div>
    `

    dital.appendChild(div);
}





