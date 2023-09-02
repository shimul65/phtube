const handleCategory = async (categoryID) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/categories`)
    const data = await res.json();
    const btnContainer = document.getElementById('btn-container');

    const catagories = data.data;
    // console.log(catagories)

    catagories.forEach(category => {
        const div = document.createElement('div');
        div.classList = `w-full`
        div.innerHTML = `
            <button id="category-btn" onclick="displayCategory('${category.category_id}')" class="btn btn-ghost bg-gray-300 normal-case text-lg px-5 w-full">${category.category}</button>
        `
        btnContainer.appendChild(div);
        // displayCategory(categoryID);
    });
    // displayCategory(categoryID);
    // return catagories;
}

const displayCategory = async (categoryId = "1000") => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`)
    const data = await res.json();

    const categoryItemContainer = document.getElementById('category-item-container');
    const noContentContainer = document.getElementById('no-content-container');
    categoryItemContainer.textContent = '';

    const categoriesItems = data.data;
    console.log(categoriesItems.length);
    if (categoriesItems.length === 0) {
        noContentContainer.classList.remove('hidden');
    }
    else {
        noContentContainer.classList.add('hidden');
        categoriesItems.forEach(categoriesItem => {
            // posted time
            const postedTime = categoriesItem.others.posted_date;
            const hrs = Math.floor(postedTime / 3600);
            const min = Math.floor((postedTime % 3600) / 60);
            const displayPostedTime = !postedTime === false ? `<p class="text-xs text-white bg-[#171717] w-fit p-2 rounded-md absolute bottom-2 right-2">${hrs > 24 ? `${Math.floor(hrs / 24)} days ${hrs % 24} hrs 0 min` : `${hrs} hrs ${min} min`} ago</p>` : '';
            // verified symbol
            const verified = categoriesItem.authors[0].verified;
            const verifiedImg = verified === true ? '<img class="w-5" src="./fi_10629607.svg" alt="verified">' : '';
            // item div
            const itemDiv = document.createElement('div');
            itemDiv.classList = `card border  duration-300 cursor-pointer hover:scale-105 md:w-fit w-full bg-base-100  rounded-lg`;
            itemDiv.innerHTML = `
        <figure class="w-full h-3/4 rounded-lg mt-3">
            <div class="relative w-full h-full">
                 <img class=" w-full h-full" src="${categoriesItem?.thumbnail}" alt="thumbnail" />
                <div>${displayPostedTime}</div>
            </div>
        </figure>
        <div class="card-body flex flex-row  gap-3">
                <img class="w-10 h-10 rounded-full" src="${categoriesItem?.authors[0]?.profile_picture}" alt="authors">
        <div class="">
                <h2 class="card-title text-left text-lg font-bold">${categoriesItem?.title}</h2>
            <div class="flex items-center gap-2 mt-2">
                 <p class="text-xl text-left text-gray-700 max-w-fit">${categoriesItem?.authors[0]?.profile_name}</p>
                <div>${verifiedImg}</div>
            </div>
            <p class="text-left text-xl text-gray-600 mt-2">${categoriesItem.others.views} views</p>
                    </div>
        </div>
        `
            categoryItemContainer.appendChild(itemDiv);

        });
    }
}

const sortByView = ()  => {
    // displayCategory(categoryId);
}


handleCategory();
displayCategory();

// const allCategory = async () => {
//     handleCategory();
// }