const cartContents = {};
const totalCosts = {};

let $row = $('<tr></tr>');
let $itemName = $('<td></td>', {
    'class': 'item-name'
});
let $itemQuantity = $('<td></td>', {
    'class': 'item-quantity'
});
let $itemPrice = $('<td></td>', {
    'class': 'item-price'
});
let $totalsBoxElement = $('<td></td>', {
    'class': 'totals-box-element'
});
let $itemDelete = $('<td></td>', {
    'class': 'item-delete-button'
});

totalCosts.subtotal = 0;
totalCosts.tax = 0.10;
totalCosts.total = 0;

$(document).ready(function() {
    let elemList = $('.product-name');
    for (let element of elemList) {
        $(element).text(faker.commerce.productName());
        $(element).siblings('.product-price').text('$' + faker.commerce.price());
    }
});

$('.add-btn').click(function() {

    // Calculate values
    const itemDetails = {};
    let productName = $(this).siblings('.product-name').text();
    let priceFloat = Number($(this).siblings('.product-price').text().match(/[^$](.*)/)[0]);
    if (cartContents[productName]) {
        cartContents[productName].quantity += 1;
        totalCosts.subtotal += cartContents[productName].price;
    } else {
        itemDetails.price = priceFloat;
        itemDetails.quantity = 1;
        totalCosts.subtotal += itemDetails.price;
        cartContents[productName] = itemDetails;
    }
    totalCosts.total = (totalCosts.subtotal + (totalCosts.subtotal * totalCosts.tax));

    // Construct the shopping cart's HTML layout
    $('.cart').empty().append($('<div />', {
        'class': 'item-list-container'
    }));
    $('.item-list-container').append($('<table></table>', {
        'class': 'table',
        'id': 'cart-table'
    }));
    $('#cart-table').append($('<thead></thead>', {
        'class': 'table-labels'
    }));
    $('#cart-table').append($('<tbody></tbody>', {
        'class': 'items-list'
    }));

    $.each(cartContents, function(name, details) {
        let item = $row.clone();
        item.append($itemQuantity.clone().text(details.quantity + "x"));
        item.append($itemName.clone().text(name));
        item.append($itemPrice.clone().text('$' + details.price.toFixed(2)));
        item.append($itemDelete.clone().html('&times;'));
        item.appendTo($('.items-list'));
    });

    $('#subtotal').text('$' + totalCosts.subtotal.toFixed(2));
    $('#taxRate').text(totalCosts.tax * 100 + '%');
    $('#total').text('$' + totalCosts.total.toFixed(2));
});

function updateTotals() {
    totalCosts.subtotal = 0;
    $.each(cartContents, function(key, value) {
        totalCosts.subtotal += value.price * value.quantity;
    });
    totalCosts.total = (totalCosts.subtotal + (totalCosts.subtotal * totalCosts.tax));
    $('#subtotal').text('$' + totalCosts.subtotal.toFixed(2));
    $('#taxRate').text(totalCosts.tax * 100 + '%');
    $('#total').text('$' + totalCosts.total.toFixed(2));
}

$(document.body).on({click: function() {
    let productName = $(this).siblings('.item-name').text();
    delete cartContents[productName];
    updateTotals();
    $(this).parent().remove();
    if (!Object.keys(cartContents).length) {
        $('.cart').empty();
        $('.cart').append($('<p class="text-muted text-center placeholder"><em>No items in cart.</em></p>'));
    }
}}, '.item-delete-button');