const ITEM_ID_REGEX = /^(I00-)[0-9]{3}$/;
const ITEM_NAME_REGEX = /^[A-Za-z ]{5,}$/;
const ITEM_PRICE_REGEX = /^[0-9]{2,}([.][0-9]{2})?$/;
const ITEM_QTY_REGEX =  /[0-9]{1,9}/;

let i_vArray = new Array();
i_vArray.push({field: $("#itemCode"), regEx: ITEM_ID_REGEX});
i_vArray.push({field: $("#itemName"), regEx: ITEM_NAME_REGEX});
i_vArray.push({field: $("#itemPrice"), regEx: ITEM_PRICE_REGEX});
i_vArray.push({field: $("#itemQty"), regEx: ITEM_QTY_REGEX});

function checkItemValidation(object) {
    if (object.regEx.test(object.field.val())) {
        setItemBorder(true, object);
        return true;
    }
    setItemBorder(false, object);
    return false;
}
function setItemBorder(bol, ob) {
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

function clearItemTextField() {
    $('#itemCode,#itemName,#itemPrice,#itemQty').val("");
    $('#itemCode,#itemName,#itemPrice,#itemQty').css("border", "1px solid #ced4da");
    $('#itemCode').focus();
    setItemBtn();


}


function checkAllItemReg() {
    for (let i = 0; i < i_vArray.length; i++) {
        if (!checkItemValidation(i_vArray[i])) return false;
    }
    return true;
}

focusNextItemTextField();
setItemBtn();
function focusNextItemTextField() {
    $('#itemCode,#itemName,#itemPrice,#itemQty').on('keydown keyup', function (e) {
        let indexNo = i_vArray.indexOf(i_vArray.find((c) => c.field.attr("id") == e.target.id));

        if (e.key == "Tab") {
            e.preventDefault();
        }
        let checker = checkValidation(i_vArray[indexNo]);

        if (e.key == "Enter") {
            if ($('#itemCode').val() != "" && checker) {
                $('#itemName').focus();
            }

            if ($('#itemName').val() != "" && checker) {
                $('#itemPrice').focus();
            }

            if ($('#itemPrice').val() != "" && checker) {
                $('#itemQty').focus();
            }


            if (checkAllItemReg()){

                $('#itemCode').focus();
                $('#btnItemSave').click();
            }

        }
        setItemBtn();
    });
}

setItemBtn();
function setItemBtn() {
    $('#btnItemSave').prop("disabled", true);
    if (checkAllItemReg()) {
        $("#btnItemSave").prop("disabled", false);
        $("#btnItemUpdate").prop("disabled", false);

    } else {
        $("#btnItemSave").prop("disabled", true);
        $("#btnItemUpdate").prop("disabled", true);

    }
}