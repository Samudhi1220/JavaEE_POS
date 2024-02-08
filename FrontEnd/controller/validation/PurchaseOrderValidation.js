const ORDER_ID_REGEX = /^(OR00-)[0-9]{3}$/;
const QTY_REGEX = /[0-9]{1,9}/;
const PRICE_REGEX = /^[0-9]{2,}([.][0-9]{2})?$/;
const DISCOUNT_REGEX = /^[0-9]{1,}([.][0-9]{2})?$/;

let o_vArray = new Array();
o_vArray.push({field: $("#orderId"), regEx: ORDER_ID_REGEX});
o_vArray.push({field: $("#orderQTY"), regEx: QTY_REGEX});

let place_order_vArray = new Array();
place_order_vArray.push({field: $("#cash"), regEx: PRICE_REGEX});
place_order_vArray.push({field: $("#discount"), regEx: DISCOUNT_REGEX});
place_order_vArray.push({field: $("#orderId"), regEx: ORDER_ID_REGEX});

$("#btnAddPlaceOrder").prop("disabled", true);
$("#balance").prop("disabled", true);
function checkOrderValidation(object) {
    if (object.regEx.test(object.field.val())) {
        setOrderTextBorder(true, object);
        return true;
    }
    setOrderTextBorder(false, object);
    return false;
}

function checkPlaceOrderValidation(object) {
    if (object.regEx.test(object.field.val())) {
        setOrderTextBorder(true, object);
        return true;
    }
    setOrderTextBorder(false, object);
    return false;
}

function setOrderTextBorder(bol, ob) {
    if (!bol) {
        if (ob.field.val().length >= 1) {
            ob.field.css("border", "2px solid red");
        } else {
            ob.field.css("border", "1px solid #ced4da");
        }
    } else {
        if (ob.field.val().length >= 1) {
            ob.field.css("border", "2px solid green");
        } else {
            ob.field.css("border", "1px solid #ced4da");
        }
    }
}

function checkAllOrderRegex() {
    for (let i = 0; i < o_vArray.length; i++) {
        if (!checkOrderValidation(o_vArray[i])) {
            return false;
        }
    }
    return true;
}
function checkAllPlaceOrderRegex() {
    for (let i = 0; i < place_order_vArray.length; i++) {
        if (!checkPlaceOrderValidation(place_order_vArray[i])) {
            return false;
        }
    }
    return true;
}
focusNextOrderTextField();
setBtnOrder();
focusNextPlaceOrderTextField();
setBtnPlaceOrder();
function focusNextOrderTextField() {
    $('#orderQTY,#orderId').on('keyup', function (e) {
        let indexNo = o_vArray.indexOf(o_vArray.find((c) => c.field.attr("id") == e.target.id));

        let checker = checkOrderValidation(o_vArray[indexNo]);

        if (e.key == "Tab") {
            e.preventDefault();
        }
        if (e.key == 'Enter') {

        }
        setBtnOrder();
    });
}


function setBtnOrder() {

    if (checkAllOrderRegex() && parseInt($('#orderQTY').val()) <= parseInt($('#qtyOnHand').val())) {
        $("#btnAddItem").prop("disabled", false);
    } else {
        $("#btnAddItem").prop("disabled", true);
    }
}

function checkOrderedQTY() {

    if ($('#qtyOnHand').val() != '') {
        if (parseInt($('#orderQTY').val()) <= parseInt($('#qtyOnHand').val()) && parseInt($('#orderQTY').val()) != 0) {
            $('#orderQtySpan').css('display', 'none');
            $('#orderQTY').css('border', '1px solid #ced4da');
           }else {
        $('#orderQtySpan').text('Please Enter a Amount lower than: ' + parseInt($('#qtyOnHand').val()));

        $('#orderQtySpan').css('display', 'block');
        $('#orderQTY').css('border', '1px solid red');

    }
    } else {
    $('#orderQtySpan').text('Please select item');
    $('#orderQtySpan').css('display', 'block');
    $('#orderQTY').css('border', '1px solid red');
}

if ($('#orderQTY').val() == '') {
    $('#orderQtySpan').css('display', 'none');
    $('#orderQTY').css('border', '1px solid #ced4da');
}
}
$('#orderQTY').on('keyup', function () {
    checkOrderedQTY();
});

function focusNextPlaceOrderTextField() {
    $('#cash,#discount,#orderId').on('keyup', function (e) {
        let indexNo = place_order_vArray.indexOf(place_order_vArray.find((c) => c.field.attr("id") == e.target.id));

        if (e.key == "Tab") {
            e.preventDefault();
        }
        let checker = checkOrderValidation(place_order_vArray[indexNo]);

        if (e.key == "Enter") {

            if ($('#cash').val() != "" && checker) {
                $('#discount').focus();
            }

            if ($('#discount').val() != "" && checker) {
                $('#btnAddPlaceOrder').click();
            }

        }
        setBtnPlaceOrder();
    });
}

function setBtnPlaceOrder() {

    if (checkAllPlaceOrderRegex()) {
        if (finalBalance.startsWith('-')) {
            // $("#cashSpan").css("display", 'block');
            $("#btnAddPlaceOrder").prop("disabled", true);
        } else {
            // $("#cashSpan").css("display", 'none');
            $("#btnAddPlaceOrder").prop("disabled", false);
        }

    } else {
        $("#btnAddPlaceOrder").prop("disabled", true);
    }
}
