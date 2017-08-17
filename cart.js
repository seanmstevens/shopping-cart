const cartContents = {};
let $cartItem = $('<tr></tr>');
let $itemName = $('<td></td>', {
    'class': 'item-name'
});
let $itemQuantity = $('<td></td>', {
    'class': 'item-quantity'
});
let $itemPrice = $('<td></td>', {
    'class': 'item-price'
});

$('.add-btn').click(function() {
    const itemDetails = {};
    let productName = $(this).siblings('.product-name').text();
    if (cartContents[productName]) {
        cartContents[productName].quantity += 1;
        cartContents[productName].price += Number($(this).siblings('.product-price').text().match(/[^$](.*)/)[0]);
    } else {
        itemDetails.price = Number($(this).siblings('.product-price').text().match(/[^$](.*)/)[0]);
        itemDetails.quantity = 1;
        cartContents[productName] = itemDetails;
    }
    console.log(cartContents);
    $('.cart').empty().append($('<table></table>', {
        'class': 'table'
    }));
    $('.table').append($('<tbody></tbody>', {
        'class': 'items-list'
    }));
    $.each(cartContents, function(name, details) {
        let item = $cartItem.clone();
        item.append($itemQuantity.clone().text(details.quantity).addClass('bold'));
        item.append($itemName.clone().text(name));
        item.append($itemPrice.clone().text('$' + details.price));
        item.appendTo($('.items-list'));
    });
});