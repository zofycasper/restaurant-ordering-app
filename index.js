import { menuArray } from "./data.js";

const orderArray = [];

document.addEventListener("click", (e) => {
    if (e.target.dataset.add) {
        handleAddClick(e.target.dataset.add);
    }
    if (e.target.dataset.remove) {
        handleRemoveClick(e.target.dataset.remove);
    }
    if (e.target.id === "complete-btn") {
        if (orderArray.length !== 0) {
            handleComplete();
        }
    }

    if (e.target.id === "pay-btn") {
        const clientName = document.getElementById("input-name").value;
        if (clientName) {
            handlePay(clientName);
        }
    }

    const card = document.getElementById("card");

    if (
        e.target.id !== "complete-btn" &&
        e.target !== card &&
        !card.contains(e.target)
    ) {
        card.style.display = "none";
    }
});

function handlePay(clientName) {
    document.getElementById("card").style.display = "none";

    document.getElementById("order").innerHTML = `
        <div class="finish-container">
            <p>${clientName}! Your order is on its way!</p>
        </div>
        `;
}

function handleComplete() {
    document.getElementById("card").style.display = "inline";
}

function getMenuHtml() {
    return menuArray
        .map((item) => {
            return `
            <div class="menu-item">
                <div class="item-image">${item.emoji}</div>
                <h3 class="item-title">${item.name}</h3>
                <p class="ingredients">${item.ingredients}</p>
                <p class="menu-item-price">$${item.price}</p>
                <button class="add-btn" id="add-btn" data-add=${item.id}>+</button>
            </div>
        `;
        })
        .join("");
}

function renderMenu() {
    document.getElementById("main-menu").innerHTML = getMenuHtml();
}

function handleRemoveClick(itemId) {
    const targetItem = orderArray.filter((item) => item.id == itemId)[0];
    const index = orderArray.indexOf(targetItem);
    orderArray.splice(index, 1);
    console.log(index);
    renderOrder();
    renderTotalPrice();
}

function handleAddClick(itemId) {
    const targetItem = menuArray.filter((item) => item.id == itemId)[0];

    orderArray.push(targetItem);
    console.log(orderArray);

    renderOrder();
    renderTotalPrice();
}

function getYourOrderHtml() {
    return orderArray
        .map((item) => {
            return `
            <div class="order-item">
                <h3>${item.name}</h3>
                <p class="remove-btn" data-remove=${item.id}>remove</p>
                <p class="item-price">$${item.price}</p>
            </div>
        `;
        })
        .join("");
}

function renderOrder() {
    //render getYourOrderHtml
    document.getElementById("order-container").innerHTML = getYourOrderHtml();
}

function getTotalPrice() {
    const orderPriceArray = orderArray.map((item) => {
        return item.price;
    });
    if (orderArray.length === 0) {
        return 0;
    } else {
        return orderPriceArray.reduce((total, current) => {
            return total + current;
        });
    }
}

function renderTotalPrice() {
    const totalPrice = getTotalPrice();
    console.log(totalPrice);
    document.getElementById("total-item-price").innerHTML = `$${totalPrice}`;
}

renderMenu();
renderOrder();
