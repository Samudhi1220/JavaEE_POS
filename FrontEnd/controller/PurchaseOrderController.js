let orderIDs;
let orderedCustomerId;
let orderDate;
let orderedItemId;
let price;
let orderQty;
let cash;
let discount;
let order;
let orderDetail;
let finalBalance;
let inputCash ;
let subTotal;
let getbalance;
$('#customer').prop('disabled', true);
$('#address').prop('disabled', true);
$('#itemNam').prop('disabled', true);
$('#qtyOnHand').prop('disabled', true);
$('#price').prop('disabled', true);
$('#itemIdSpan').css('display', 'none');
$('#inputItemCodes').css("border", "1px solid #ced4da");
$('#cusIdSpan').css('display', 'none');
$('#inputCustomerId').css('border', '1px solid #ced4da');
$('#dateSpan').css('display', 'none');
$('#date').css('border', '1px solid #ced4da');
$('#orderQtySpan').css('display', 'none');
$('#orderQTY').css('border', '1px solid #ced4da');
$('#cashSpan').css('display','none');
function setCustomerId() {
    $('#inputCustomerId').empty();
    $('#inputCustomerId').append('<option selected>Choose...</option>');
    for (let customer of customerDB) {
        let selector = `<option id="selectOption">${customer.id}</option>`
        $('#inputCustomerId').append(selector);
    }
}

function setItemId() {
    $('#inputItemCodes').empty();
    $('#inputItemCodes').append('<option selected>Choose...</option>');
    for (let item of itemDB) {
        let selector = `<option>${item.code}</option>`
        $('#inputItemCodes').append(selector);
    }
}

$('#inputCustomerId').on('change', function () {
    orderedCustomerId = $('#inputCustomerId').val();
    let index = -1;

    for (let customerObj of customerDB) {
        if (customerObj.id == orderedCustomerId) {
            index = customerDB.indexOf(customerObj);
        }
    }

    if (orderedCustomerId == 'Choose...') {
        $('#customer').val('');
        $('#address').val('');
    } else {
        $('#customer').val(customerDB[index].firstName);
        $('#address').val(customerDB[index].address);

    }
});

$('#inputItemCodes').on('change',function () {
    orderedItemId = $('#inputItemCodes').val();
    let index = -1;

    for (let itemObj of itemDB) {
        if (itemObj.code == orderedItemId) {
            index = itemDB.indexOf(itemObj);
        }
    }

    if (orderedItemId == 'Choose...') {
        $('#itemNam').val('');
        $('#price').val('');
        $('#qtyOnHand').val('');
    } else {
        $('#itemNam').val(itemDB[index].name);
        $('#price').val(itemDB[index].price);
        $('#qtyOnHand').val(itemDB[index].qty);

    }


});

$('#date').on('change', function () {
    orderDate = $('#date').val();

})

$('#cash').on('keydown keyup',function () {

    getbalance =parseInt($('#cash').val())- parseInt($('#totalSpan').text());
      $('#balance').val(getbalance);

      if ( $('#balance').val()== "NaN"){
          $('#balance').val("");

      }
      inputCash= $('#cash').val();
      finalBalance = $('#balance').val();
    if($('#discount').val() != ""){

            $('#balance').val(inputCash-subTotal);
    }

insufficient();
})

$('#discount').on('keyup',function () {
    discount= parseInt($('#discount').val())/100* parseInt($('#totalSpan').text());

    subTotal= $('#totalSpan').text()-discount;

    $('#subTotalSpan').text(subTotal);

    if ( $('#subTotalSpan').text() == "NaN"){
        $('#subTotalSpan').text($('#totalSpan').text());
    }
    $('#balance').val(inputCash-subTotal);
    if($('#balance').val() == "NaN"){
        $('#balance').val(getbalance);
    }
    finalBalance = $('#balance').val();
    insufficient();
})

$('#totalSpan').text(100);
$('#subTotalSpan').text(100);

function orderAddToCart() {
    orderIDs = $('#orderId').val();
    orderQty = $('#orderQTY').val();
    price = $('#price').val();

    order = Object.assign({}, purchaseOrder);
    orderDetail = Object.assign({}, orderDetails);

    order.oid = orderIDs;
    order.date = orderDate;
    order.customerID = orderedCustomerId;

    orderDetail.oid = orderIDs;
    orderDetail.qty = orderQty;
    orderDetail.unitPrice = price;
    orderDetail.code = orderedItemId;

    if (searchExistCartItem(orderedItemId)) {
        getDataByItemID(order.orderDetails, orderedItemId).qty = parseInt(getDataByItemID(order.orderDetails, orderedItemId).qty) + parseInt(orderQty);
    } else {
        order.orderDetails.push(orderDetail);
    }
    let total = 0;
    $('#tblOrderDetails').empty();
    for (let orderElement of order.orderDetails) {
        var row = `<tr><td>${orderElement.code}</td><td>${getDataById(itemDB, orderElement.code).name}</td><td>${order.date}</td><td>${orderElement.unitPrice}</td><td>${orderElement.qty}</td><td>${parseInt(orderElement.unitPrice) * parseInt(orderElement.qty)}</td></tr>`;
        $('#tblOrderDetails').append(row)

        total += parseInt(orderElement.unitPrice) * parseInt(orderElement.qty);

        $('#totalSpan').text(total);
        $('#subTotalSpan').text(total);
        $('#orderQTY').val('');
        setBtnOrder();
    }
}

function searchExistCartItem(id) {
    return order.orderDetails.find(function (orderDetail) {
        return orderDetail.code == id;
    });
}


function getDataByItemID(arr, id) {
    let index = -1;

    for (let Obj of arr) {
        if (Obj.code == id) {
            index = arr.indexOf(Obj);
            return arr[index];
        }
    }
    return null;
}

function getDataById(arr, id) {
    let index = -1;

    for (let Obj of arr) {
        if (Obj.code == id) {
            index = arr.indexOf(Obj);
            return arr[index];
        }
    }
    return null;
}

$('#btnAddItem').click(function () {
    if (checkAllOrderRegex()) {
        if ($('#inputItemCodes').val() == 'Choose...') {
            $('#itemIdSpan').css('display', 'block');
            $('#inputItemCodes').css('border', '1px solid red');
        }
        if ($('#inputCustomerId').val() == 'Choose...') {
            $('#cusIdSpan').css('display', 'block');
            $('#inputCustomerId').css('border', '1px solid red');
        }
        if ($('#date').val() == '') {
            $('#dateSpan').css('display', 'block');
            $('#date').css('border', '1px solid red');
        }
        if ($('#inputItemCodes').val() != 'Choose...' && $('#inputCustomerId').val() != 'Choose...' && $('#date').val() != '') {
            orderAddToCart();
        }
    } else {
        alert('error');
    }
});


$('#btnAddPlaceOrder').click(function () {
    if (checkAllPlaceOrderRegex()) {
        if ($('#inputItemCodes').val() == 'Choose...') {
            $('#itemIdSpan').css('display', 'block');
            $('#inputItemCodes').css('border', '1px solid red');
        }
        if ($('#inputCustomerId').val() == 'Choose...') {
            $('#cusIdSpan').css('display', 'block');
            $('#inputCustomerId').css('border', '1px solid red');
        }
        if ($('#date').val() == '') {
            $('#dateSpan').css('display', 'block');
            $('#date').css('border', '1px solid red');
        }
        if ($('#inputItemCodes').val() != 'Choose...' && $('#inputCustomerId').val() != 'Choose...' && $('#date').val() != '') {
            placeOrder();
        }
    } else {
        alert('error');
    }
});
 function insufficient() {
     if (finalBalance.startsWith("-")){
         $('#cashSpan').css('display','block');
     }else{
         $('#cashSpan').css('display','none');
     }
 }

function searchExistOrder(id) {
    return orderDB.find(function (order) {
        return order.oid == id;
    });
}

function placeOrder() {

    cash = $('#cash').val();
    discount = $('#discount').val();


    if (searchExistOrder(orderIDs.trim())) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'This Order Already Exist.'
        });
    } else {
        orderDB.push(order);
        purchaseOrder.orderDetails = [];

        let index = -1;

        for (let orderObj of orderDB) {
            if (orderObj.oid == $('#orderId').val()) {
                index = orderDB.indexOf(orderObj);
            }
        }

        for (let i = 0; i < orderDB[index].orderDetails.length; i++) {
            let itemCode = orderDB[index].orderDetails[i].code;

            for (let itemDBElement of itemDB) {
                if (itemDBElement.code == itemCode) {
                    itemDBElement.qty = itemDBElement.qty - orderDB[index].orderDetails[i].qty;
                }
            }
        }

        loadAllItemData();
        $('#orderId').val('');
        $('#date').val('');
        $('#customer').val('');
        $('#address').val('');
        $('#itemNam').val('');
        $('#price').val('');
        $('#qtyOnHand').val('');
        $('#cash').val('');
        $('#discount').val('');
        $('#balance').val('');
        $('#inputItemCodes').val('Choose...');
        $('#inputCustomerId').val('Choose...');
        $('#btnAddPlaceOrder').prop('disabled', true);
        $('#totalSpan').text('00.00');
        $('#subTotalSpan').text('00.00');
        $('#tblOrderDetails').empty();


        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Order has been saved',
            showConfirmButton: false,
            timer: 1500
        })
    }

}
