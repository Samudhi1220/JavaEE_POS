
let itemCode;
let itemName;
let itemPrice;
let itemQty;
let selectedItemId;

$(window).on('load',function () {
    $("#btnItemUpdate").prop("disabled", true);
    $("#btnItemDelete").prop("disabled", true);
});

function getAllItemsForTextField() {
    itemCode = $('#itemCode').val();
    itemName = $('#itemName').val();
    itemPrice = $('#itemPrice').val();
    itemQty = $('#itemQty').val();

}
$('#btnItemSave').click(function () {
    if (checkAllItemReg()){
        saveItem();

    }else {
        alert('error');
    }
});

$("#btnItemDelete").click(function () {
    if (checkAllItemReg()){
        deleteItem();

    } else {
        alert('error');
    }
});

$('#btnItemUpdate').click(function () {

    if (checkAllItemReg()){
        updateItem();

    } else {
        alert('error');
    }
});
$('#btnGetAllItem').click(function () {
    getAllItem();
    setItemDataTextField();
    focusItemClick();
    $('#search').val("");

});

$('#btnClearItemTable').click(function () {
    $('#tblItem').empty();
    clearItemTextField();
    disableItemTextField(false);
    $('#search').val("");
});

function saveItem() {


    let itemCodes = $('#itemCode').val();

    if (searchExistItem(itemCodes.trim())) {
        // Swal.fire({
        //     icon: 'error',
        //     title: 'Oops...',
        //     text: 'This Customer Already Exist.'
        // });

        alert('already exist')
    }else {
        getAllItemsForTextField();
        let newItem = Object.assign({},item);

        newItem.code = itemCode;
        newItem.name = itemName;
        newItem.price = itemPrice;
        newItem.qty = itemQty;


        itemDB.push(newItem);

        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Item has been saved',
            showConfirmButton: false,
            timer: 1500

        })

        loadAllItemData();
        clearItemTextField();
        bindEvent();
        focusItemClick();

        $('#search').val("");

    }

}
function updateItem() {
    getAllItemsForTextField();

    Swal.fire({
        title: 'Do you want to save the changes?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Save',
        denyButtonText: `Don't save`,
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {



            let index = -1;

            for (let itemObj of itemDB) {
                if (itemObj.code == selectedItemId) {
                    index = itemDB.indexOf(itemObj);
                }
            }

            itemDB[index].code = itemCode;
            itemDB[index].name = itemName;
            itemDB[index].price = itemPrice;
            itemDB[index].qty = itemQty;


            loadAllItemData();
            $('#itemCode').prop('disabled', true);
            clearItemTextField();
            bindEvent();
            focusItemClick();
            Swal.fire('Saved!', '', 'success');

            $('#search').val("");


        } else if (result.isDenied) {
            Swal.fire('Changes are not saved', '', 'info')
        }


    });
}

function deleteItem() {

    Swal.fire({
        title: 'Do you want to delete?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Delete',
        denyButtonText: `Don't delete`,
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {

            let index = -1;

            for (let itemObj of itemDB) {
                if (itemObj.code == selectedItemId) {
                    itemDB.splice(selectedItemId, 1);
                }
            }


            loadAllItemData();
            clearItemTextField();
            bindEvent()
            focusItemClick();

            $('#search').val("");



            Swal.fire('Deleted!', '', 'success');


        } else if (result.isDenied) {
            Swal.fire('Not Delete', '', 'info')
        }
    });
}

function searchExistItem(code) {
    return itemDB.find(function (item) {
        return item.code == code;
    });
}

function loadAllItemData() {
    $('#tblItem').empty();
    for (var item of itemDB){
        var row = `<tr><td>${item.code}</td><td>${item.name}</td><td>${item.price}</td><td>${item.qty}</td></tr>`;
        $('#tblItem').append(row)
    }
}

function setItemDataTextField(code,name,price,qty) {
    $('#itemCode').val(code);
    $('#itemName').val(name);
    $('#itemPrice').val(price);
    $('#itemQty').val(qty);

}
function getAllItem() {

    $("#tblItem").empty();

    for (let i = 0; i < itemDB.length; i++) {
        let code = itemDB[i].code;
        let name = itemDB[i].name;
        let price = itemDB[i].price;
        let qty = itemDB[i].qty;


        let row = `<tr>
                     <td>${code}</td>
                     <td>${name}</td>
                     <td>${price}</td>
                     <td>${qty}</td>
                    </tr>`;

        $("#tblItem").append(row);

        bindEvent();
    }
}

function bindEvent() {
    $('#tblItem>tr').click(function () {

        let code = $(this).children().eq(0).text();
        let name = $(this).children().eq(1).text();
        let price = $(this).children().eq(2).text();
        let qty = $(this).children().eq(3).text();


        setItemDataTextField(code,name,price,qty);
        $('#itemCode').prop('disabled', true);
        selectedItemId = $('#itemCode').val();
    })
}

function disableItemTextField(condition) {
    $('#itemCode').prop('disabled', condition);
    $('#itemName').prop('disabled', condition);
    $('#itemPrice').prop('disabled', condition);
    $('#itemQty').prop('disabled', condition);


}

function focusItemClick() {
    $('#tblItem > tr').on('click', function () {
        $("#btnItemUpdate").prop("disabled", false);
        disableItemTextField(false);
        $("#btnItemDelete").prop("disabled", false);
        $("#btnItemSave").prop("disabled", true);

    });
}

function searchItem() {
    $('#search').on('keyup', function () {
        $('#tblItem').empty();
        let index = -1;

        for (let itemObj of itemDB) {
            if (itemObj.code == $('#search').val()) {
                index = itemDB.indexOf(itemObj);
            }
        }
        var row = `<tr><td>${itemDB[index].code}</td><td>${itemDB[index].name}</td><td>${itemDB[index].price}</td><td>${itemDB[index].qty}</td></tr>`;
        $('#tblItem').append(row)
        setItemDataTextField();
        focusItemClick();
    });
}