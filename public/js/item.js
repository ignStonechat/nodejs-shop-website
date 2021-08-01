document.getElementById("addToCart").addEventListener("click", () => {
    $.notify("Item Added To Your Cart", "success");

    var cookie = document.cookie;

    if (cookie.startsWith("items")) {
        var items = getCookie("items");
        if (items !== "") {
          items = items += `=-=${document.getElementById("itemName").innerText}`;
        } else {
          items = items += `${document.getElementById("itemName").innerText}`;
        }

        document.cookie = "items=" + items;
    } else {
        document.cookie = "items=" + document.getElementById("itemName").innerText;
    }

    console.log(document.cookie);
})


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