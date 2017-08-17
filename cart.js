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

totalCosts.subtotal = 0;
totalCosts.tax = 0.10;
totalCosts.total = 0;

$('.add-btn').click(function() {

    // Calculate values

    const itemDetails = {};
    let productName = $(this).siblings('.product-name').text();
    let priceFloat = Number($(this).siblings('.product-price').text().match(/[^$](.*)/)[0]);
    if (cartContents[productName]) {
        cartContents[productName].price += priceFloat;
        cartContents[productName].quantity += 1;
    } else {
        itemDetails.price = priceFloat;
        itemDetails.quantity = 1;
        cartContents[productName] = itemDetails;
    }
    totalCosts.subtotal += priceFloat;
    totalCosts.total = (totalCosts.subtotal + (totalCosts.subtotal * totalCosts.tax));

    // Construct the shopping cart's HTML layout

    console.log(cartContents);
    $('.cart').empty().append($('<div />', {
        'class': 'item-list-container'
    }));
    $('.item-list-container').append($('<table></table>', {
        'class': 'table'
    }));
    $('.table').append($('<thead></thead>', {
        'class': 'table-labels'
    }));
    $('.table').append($('<tbody></tbody>', {
        'class': 'items-list'
    }));

    $.each(cartContents, function(name, details) {
        let item = $row.clone();
        item.append($itemQuantity.clone().text(details.quantity + "x"));
        item.append($itemName.clone().text(name));
        item.append($itemPrice.clone().text('$' + details.price.toFixed(2)));
        item.appendTo($('.items-list'));
    });

    let container = $('<div />', {
        'class': 'totals-container'
    });
    container.appendTo($('.cart'));
    container.append($('<table></table>', {
        'class': 'table costs-container'
    }));

    $.each(totalCosts, function(key, value) {
        let costItem = $row.clone();
        costItem.append($totalsBoxElement.clone().text(capitalize(key)));
        if (key == "tax") {
            costItem.append($totalsBoxElement.clone().text(value * 100 + '%'));
        } else if (key == "total") {
            costItem.append($totalsBoxElement.clone().text('$' + value.toFixed(2)).addClass('bold'));
        } else {
            costItem.append($totalsBoxElement.clone().text('$' + value.toFixed(2)));
        }
        costItem.appendTo('.costs-container');
    });

    function capitalize(word) {
        return word[0].toUpperCase() + word.substr(1);
    }

    $('.cart').append($('<button></button>', {
        'class': 'btn btn-primary btn-block',
        'data-toggle': 'modal',
        'data-target': '#shippingInfoModal'
    }).text('Complete Your Order'));
});