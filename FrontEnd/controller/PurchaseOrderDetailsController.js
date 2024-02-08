$('#orderId').on('keydown keyup', function (e) {
    if (e.key == 'Enter'){

    }
});

function searchOrders() {
    $('#search').on('keyup', function () {
        $('#tblOrderDetails').empty();
        let index = -1;

        for (let orderObj of orderDB) {
            if (orderObj.oid == $('#search').val()) {
                index = orderDB.indexOf(orderObj);
            }else {
                $('#tBody-order').empty();
                $('#orderId').val('');
                $('#date').val('');
                $('#inputCustomerId').val('Choose...');
                $('#customer').val('');
                $('#address').val('');
            }
        }
        console.log(orderDB[index].oid);
        $('#orderId').val(orderDB[index].oid);
        $('#date').val(orderDB[index].date);
        $('#inputCustomerId').val(orderDB[index].customerID);
        $('#customer').val(getDataByCustomerID(customerDB,$('#inputCustomerId').val()).firstName);
        $('#address').val(getDataByCustomerID(customerDB,$('#inputCustomerId').val()).address);

        $('#tblOrderDetails').empty();
        for (let i = 0; i < orderDB[index].orderDetails.length; i++) {
            var row = `<tr><td>${orderDB[index].orderDetails[i].code}</td><td>${getDataByItemID(itemDB, orderDB[index].orderDetails[i].code).name}</td><td>${orderDB[index].date}</td><td>${orderDB[index].orderDetails[i].unitPrice}</td><td>${orderDB[index].orderDetails[i].qty}</td><td>${parseInt(orderDB[index].orderDetails[i].unitPrice) * parseInt(orderDB[index].orderDetails[i].qty)}</td></tr>`;
            $('#tblOrderDetails').append(row)
        }
    });

}
function getDataByCustomerID(arr, id) {
    let index = -1;

    for (let Obj of arr) {
        if (Obj.id == id) {
            index = arr.indexOf(Obj);
            return arr[index];
        }
    }
    return null;
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