//Получение данных из localStorage, анализ, есть ли товары в корзине
var updateValueButton = document.querySelector('.buttons-cart a'),
    changeQtyInput = document.querySelector('td.product-quantity input'),
    removeItemButton = document.querySelector('td.product-remove a');
var cartTableContent = document.getElementById('cart-table-content');


function getItemsToCart() {
    var arr = [];
    if (localStorage.length > 0) {
        for (var i=0; i<localStorage.length; i++){
            if (localStorage.key(i).indexOf('горизонт') === 0){
                var obj = localStorage.getItem(localStorage.key(i));
                arr.push(JSON.parse(obj));
            }
        }
        if(arr.length > 0){
            drawCartTable(arr);
        }
    }

}

//Отрисовка таблицы корзины
function drawCartTable(arr) {
            document.querySelector('.total_cart_field').classList.remove('hidden');
            var table = document.createElement('table');
            var row = document.createElement('tr');

            row.innerHTML = '<tr><th class="product-thumbnail">Изображение</th>';
            row.innerHTML +='<th class="product-name">Наименование</th>';
            row.innerHTML +='<th class="product-price">Цена</th>';
            row.innerHTML +='<th class="product-quantity">Количество</th>';
            row.innerHTML +='<th class="product-subtotal">Сумма</th>';
            row.innerHTML += '<th class="product-remove">Удалить</th></tr>';
            table.appendChild(row);

            //строим строки таблицы
            for (var i=0; i<arr.length; i++){
                var row = document.createElement('tr');
                row.innerHTML = '<td class="product-thumbnail"><a href="#"><img src="'+arr[i]['image']+'" alt="product img" /></a></td>'
                                +'<td class="product-name"><a href="#">'+arr[i]['name']+'</a></td>'
                                +'<td class="product-price"><span class="amount">'+(+arr[i]['price']).toFixed(2)+'p.</span></td>'
                                +'<td class="product-quantity"><input type="number" value="'+ (+arr[i]['qty']) +'" name="product-quantity-in-table" onclick="recountCartSum()"/></td>'
                                +'<td class="product-subtotal product-subtotal-in-table"></td>'
                                +'<td class="product-remove"><a href="#" onclick="removeProductFromCart(this)">X</a></td>';
                table.appendChild(row);
            }
            cartTableContent.firstElementChild.classList.add('hidden');
            cartTableContent.appendChild(table);

            //Считаем стоимость в зависимости от количества и ИТОГО
            recountCartSum();
}

//Функция пересчета корзины при изменении количества товара
function recountCartSum() {
    var productQuantity = document.getElementsByName('product-quantity-in-table');
    var productPrice = document.body.querySelectorAll('td.product-price .amount');
    var productSumElem = document.body.querySelectorAll('.product-subtotal-in-table');
    var value = 0;
    for (var i=0; i<productQuantity.length; i++) {
        if (+(productQuantity[i].value) > 0){
            value = +(productQuantity[i].value)
        } else {
            value = 0;
            productQuantity[i].value = 0;
        }
        productSumElem[i].innerHTML = (value*(+(productPrice[i].innerHTML.slice(0, -2)))).toFixed(2)+'p.';
    }
    //Считаем ИТОГО
    countTotalSum();
}

//Функция сохранения в корзине новых значений количества
function updateCartValues() {
    //var table = document.getElementById('cart-table-content');
    var productImage = cartTableContent.querySelectorAll('.product-thumbnail img');
    var productName = cartTableContent.querySelectorAll('.product-name a');
    var productPrice = cartTableContent.querySelectorAll('td.product-price .amount');
    var productQuantity = document.getElementsByName('product-quantity-in-table');
    for (var i=0; i<productName.length; i++){
        if(+(productQuantity[i].value) === 0){
            localStorage.removeItem('горизонт' + productName[i].textContent);
            productQuantity[i].closest('table').removeChild(productQuantity[i].closest('tr'));
        } else if (+(productQuantity[i].getAttribute('value')) !== +(productQuantity[i].value)){
            var prod_descr = {
                image : productImage[i].getAttribute('src'),
                name : productName[i].innerHTML,
                price : (productPrice[i].innerHTML).slice(0, -2),
                qty : productQuantity[i].value
            };
            localStorage.setItem('горизонт' + prod_descr.name, JSON.stringify(prod_descr));
        }
    };
    if(cartTableContent.getElementsByTagName('TABLE')[0].getElementsByTagName('td').length === 0){
        cartTableContent.removeChild(cartTableContent.getElementsByTagName('TABLE')[0]);
        cartTableContent.firstElementChild.classList.remove('hidden');
        document.querySelector('.total_cart_field').classList.add('hidden');
    }
    event.preventDefault();
};

//Функция подсчета поля ИТОГО
function countTotalSum() {
    var productSumElem = document.body.querySelectorAll('.product-subtotal-in-table');
    var orderTotalField = document.body.querySelector('table .order-total .amount');
    var arr = [];
    for (var i=0; i< productSumElem.length; i++){
        arr.push(+(productSumElem[i].innerHTML).slice(0, -2));
    }
    for (var i=0; i< arr.length; i++){
        var result = arr.reduce(function (sum, current){
            return sum + current;
        })
    }
    orderTotalField.innerHTML = result.toFixed(2)+'p.';
};


//Функция удаления товара из корзины
function removeProductFromCart(elem) {
    var productName = elem.closest('tr').querySelector('.product-name a').innerHTML;
    var table = elem.closest('table');
    localStorage.removeItem('горизонт' + productName);
    table.removeChild(elem.closest('tr'));
    console.log(table.getElementsByTagName('td'));
    if(table.getElementsByTagName('td').length === 0){
        cartTableContent.removeChild(table);
        cartTableContent.firstElementChild.classList.remove('hidden');
        document.querySelector('.total_cart_field').classList.add('hidden');
    } else {
        recountCartSum();
    }
    //getItemsToCart();
    event.preventDefault();
};




if (updateValueButton !== null){
    updateValueButton.addEventListener('click', updateCartValues);
}

//Функция Оформить заказ
var checkout = document.getElementById('checkout');
if (checkout !== null){
    checkout.onclick = function () {
        updateCartValues();
        document.location.href='checkout.html';
    };
}

function init() {
    getItemsToCart();
};

var cart = init();