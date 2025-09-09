let addToCartItem = [];
const removeActive = () => {
    const categoryBtn = document.querySelectorAll(".category-btn");
    categoryBtn.forEach(btn => btn.classList.remove("active"));
}

const manageSpinner = (status) => {
    if (status == true) {
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("trees-container").classList.add("hidden");
    }
    else {
        document.getElementById("trees-container").classList.remove("hidden");
        document.getElementById("spinner").classList.add("hidden");
    }
}

const loadCategories = () => {
    const url = "https://openapi.programming-hero.com/api/categories";
    fetch(url)
        .then(res => res.json())
        .then(Categorie => displayCategories(Categorie.categories));
};

const displayCategories = (categories) => {

    const categoriesContainer = document.getElementById("categories-container");
    categoriesContainer.innerHTML = "";
   
    categories.forEach(category => {
        const categoriesDiv = document.createElement("div");
        categoriesDiv.innerHTML = `
                    <div class="flex flex-col">
                                <button onclick="loadTreeByCategory(${category.id})" id="category-btn-${category.id}"
                                    class="category-btn py-2 px-3 text-[#1F2937] rounded-[4px] text-start w-full bg-[#15803D]/10 md:bg-transparent hover:bg-[#15803D]/70 hover:text-white duration-300 cursor-pointer">
                                    ${category.category_name} </button>
                            </div>
        `;
        categoriesContainer.append(categoriesDiv);
    });
};
const loadAllTrees = () => {
    removeActive() 
    document.getElementById("allcategoryBtn").classList.add("active"); 

    manageSpinner(true);
    const url = "https://openapi.programming-hero.com/api/plants";
    fetch(url)
        .then(res => res.json())
        .then(plants => displayTrees(plants.plants));
};
const loadTreeByCategory = (id) => {
    manageSpinner(true)
    const url = `https://openapi.programming-hero.com/api/category/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(trees => {
            removeActive() 
            const clickBtn = document.getElementById(`category-btn-${id}`)
            clickBtn.classList.add("active") 

            displayTrees(trees.plants)
        });
};

const displayTrees = (trees) => {

    const treesContainer = document.getElementById("trees-container");
    treesContainer.innerHTML = "";

    trees.forEach(tree => {

        // Limit description to 18 words 
        const words = tree.description.split(" "); 
        const words20 = words.slice(0, 18).join(" "); 
        const shortDescription = words20 + (words.length > 18 ? "..." : " ");

        const treesCart = document.createElement("div");
        treesCart.innerHTML = `
                <div id="${tree.id}" class=" bg-white rounded-[16px] p-4 h-full">
                            
                                <img src="${tree.image}" class="w-full h-[200px] bg-[#EDEDED] rounded-[8px] mb-3">

                                <h4 onclick="treeDetailsHandler(${tree.id})" class="font-semibold mb-1 cursor-pointer">${tree.name}</h4>
                                <p>${shortDescription}</p>
                            
                            <!-- Trees Item Category and Price -->
                            <div class="flex justify-between items-center my-3">
                                <p class="bg-[#DCFCE7] px-3 py-1 rounded-full text-[#15803D]">${tree.category}</p>
                                <p >৳${tree.price}</p>
                            </div>

                            
                                <button  id= "add-to-cart-item-(${tree.id})"
                                    class="bg-[#15803D] py-3 px-5 rounded-full text-white font-medium cursor-pointer w-full hover:bg-[#0b5c28] duration-300">
                                    Add to Cart</button>
                            
                </div>
        `;
       
        treesContainer.append(treesCart);
    });
    manageSpinner(false);
};

loadCategories();
loadAllTrees();

const treesContainer = document.getElementById("trees-container");
treesContainer.addEventListener('click', (e) => {
    if (e.target.innerText === 'Add to Cart') {
        handleAddToCart(e)
    };
});
const handleAddToCart = (e) => {
    const treeName = e.target.parentNode.children[1].innerText;
    const treeId = e.target.parentNode.id;
    const treePrice = parseInt(
        e.target.parentNode.children[3].children[1].innerText.replace("৳", "")
    );
    const treeNames = treeName.includes("Tree") ? treeName : `${treeName} Tree`;

    alert(`🌱 ${treeNames} has been added to your Cart.`);

    addToCartItem.push({
        uniqueId: Math.random(),
        treeName: treeName,
        treeId: treeId,
        treePrice: treePrice,
    });

    displayAddToCartItem(addToCartItem);
};
console.log(addToCartItem)

const displayAddToCartItem = (treeItem) => {
    const addToCartContainer = document.getElementById("add-to-cart-container");
    addToCartContainer.innerHTML = "";
    let totalAmount = 0;

    treeItem.forEach(item => {
        addToCartContainer.innerHTML += `
            <div class="bg-[#F0FDF4] py-2 px-3 rounded-[8px] flex justify-between items-center">
                <div>
                    <h4 class="font-semibold mb-1">${item.treeName}</h4>
                    <p>৳${item.treePrice}</p>
                </div>
                <div class="text-red-600">
                   <button onclick= "removeTreeHandler('${item.treeId}')" class="cursor-pointer"> 
                       <i class="fa-solid fa-xmark"></i>
                   </button>
                </div>
            </div>
        `;

        totalAmount += item.treePrice;
    });

    document.getElementById("total-amount").innerText = `৳ ${totalAmount}`;
};

const removeTreeHandler = (treeId) => {
    addToCartItem = addToCartItem.filter(item => item.treeId !== treeId);
    displayAddToCartItem(addToCartItem);
}


const treeDetailsHandler = async (id) => {
    const url = `https://openapi.programming-hero.com/api/plant/${id}`;
   
    const res = await fetch(url);
    const details = await res.json();
    displayTreeDetails(details.plants)
}


const displayTreeDetails = (trees) => {
    const treeDetailsContainer = document.getElementById("tree-details-container");
    treeDetailsContainer.innerHTML = `
                        <!-- Trees Item Name -->
                        <h4 class="font-semibold text-[22px] mb-3">${trees.name}</h4>

                        <!-- Trees Item Images -->
                        <img src="${trees.image}" class="w-full h-[300px] bg-[#EDEDED] rounded-[8px] mb-3">

                        <!-- Trees Item Category -->
                        <p class="font-semibold mb-2"> Category: ${trees.category}</p>

                        <!-- Trees Item Category and Price -->
                        <p class="font-semibold mb-2"> Price: ৳${trees.price}</p>

                        <!-- Trees Item Description -->
                        <p>${trees.description}</p>
`;
    document.getElementById("productDetailsModal").showModal();
}
