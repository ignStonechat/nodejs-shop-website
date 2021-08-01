var cookie = document.cookie;
var items;
var totalPrice = 0;

if (cookie.startsWith("items")) {
    showItems();
}


function removeItem(item) {
    totalPrice = 0;
    let itemName = item.parentElement.getElementsByClassName('cart_item_name')[0].innerText;

    for (let i = 0; i < items.length; i++) {
        const item = items[i];

        if (item === itemName) {
            items.splice(i, 1);
            break;
        }
    }

    document.cookie = `items=${items.join("=-=")}`;

    document.getElementById('all_cart').innerHTML = "";
    document.getElementById('totalPrice').innerText = `Total Price: ${totalPrice}$`
    showItems();
}


function showItems() {
    totalPrice = 0;
    items = getCookie("items").split("=-=");

    if (items[0] !== "") {
        items.forEach(item => {
            (async () => {
                var fetched = await fetch(`/get?key=${item}`);
                var response = await fetched.json();
                response = response[0]

                totalPrice = totalPrice + parseInt(response.price);
    
                document.getElementById('all_cart').innerHTML += `<div class="cart_item">
                <a href="/item?name=${response.name}"><img src="./images/item_imgs/${response.name}.${response.img_format}" alt="" class="cart_item_img" ></a>
                <div class="cart_item_name">${response.name}</div>
                <div class="cart_remove_BTN" onclick="removeItem(this)">✘</div>
            </div>`;
            document.getElementById('totalPrice').innerText = `Total Price: ${totalPrice}$`
            })()
        });
    }

}



function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}