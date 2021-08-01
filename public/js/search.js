function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

async function getItems() {
    let key = await getParameterByName("key");
    let fetched = await fetch('/get?key=' + key);
    let items = await fetched.json();
    
    var i,j, temporary, chunk = 5;
    for (i = 0,j = items.length; i < j; i += chunk) {
        temporary = items.slice(i, i + chunk);
        
        let list = ``

        for (let j = 0; j < temporary.length; j++) {

            list += `<a href="/item?name=${temporary[j].name}"><div class="shop_item"><img src="./images/item_imgs/${temporary[j].name}.${temporary[j].img_format}" class="item_IMG"><div class="item_name">${temporary[j].name}</div></div></a>`
        }

        document.getElementById('all_items').innerHTML += `<div id="shop_items">
        <div class="item_spacer"></div>${list}</div>`
    }
}

getItems();

document.getElementById('search').addEventListener('keydown', (e) => {
    if (e.key === "Enter") {
        window.location.href = "/search?key=" + document.getElementById('search').value;
    }
})

document.getElementById('search_BTN').addEventListener('click', (e) => {
    window.location.href = "/search?key=" + document.getElementById('search').value;
})