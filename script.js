// global variable
let currentData = [];

// handle category
const handleCategory = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/categories`)
    const data = await res.json();
    const catagories = data.data;

    const btnContainer = document.getElementById('btn-container');

    catagories.forEach(category => {
        const div = document.createElement('div');
        div.classList = `w-full`
        div.innerHTML = `
            <button id="category-btn" onclick="displayCategory('${category.category_id}')" class="btn btn-ghost bg-gray-300 normal-case text-lg px-5 w-full">${category.category}</button>
        `
        btnContainer.appendChild(div);
    });
}

// display category
const displayCategory = async (categoryId = "1000") => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`)
    const data = await res.json();
    currentData = data.data;

    const categoryItemContainer = document.getElementById('category-item-container');
    const noContentContainer = document.getElementById('no-content-container');

    categoryItemContainer.textContent = '';

    const categoriesItems = data.data;

    if (categoriesItems.length === 0) {
        noContentContainer.classList.remove('hidden');
    }
    else {
        // sortByView(categoriesItems);
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
            <p class="text-left text-xl text-gray-600 mt-2">${categoriesItem?.others?.views} views</p>
                    </div>
        </div>
        `
            categoryItemContainer.appendChild(itemDiv);

        });
    }
}

// handle sort by view btn
const sortbyView = () => {
    const categoryItemContainer = document.getElementById('category-item-container');
    categoryItemContainer.textContent = '';
    for (categoriesItem of currentData) {
        const viewsNumber = parseFloat(categoriesItem.others.views) * 1000;
        categoriesItem.others.views = viewsNumber;
    };
    let result = currentData.sort((a, b) => b.others.views - a.others.views);
    // console.log(result);
    result.forEach(categoriesItem => {
        const viewsNumber2 = categoriesItem.others.views / 1000 + 'K';
        categoriesItem.others.views = viewsNumber2;
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
        <p class="text-left text-xl text-gray-600 mt-2">${categoriesItem?.others?.views} views</p>
                </div>
    </div>
    `
        categoryItemContainer.appendChild(itemDiv);

    });
}


handleCategory();
displayCategory();