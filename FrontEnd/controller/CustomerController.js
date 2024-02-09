


let customerId;
let customerFName;
let customerLName;
let customerAddress;
let customerSalary;
let selectedId;

$(window).on('load',function () {
    $("#btnCusUpdate").prop("disabled", true);
    $("#btnCusDelete").prop("disabled", true);
    loadDataTable();
    setDataTableToTextFeild();
});

function getAllCustomerForTextField() {
     customerId = $('#customerId').val();
     customerFName = $('#cusFirstName').val();
     customerLName = $('#cusLastName').val();
    customerAddress = $('#cusAddress').val();
     customerSalary = $('#cusSalary').val();
}
$('#btnCusSave').click(function () {
    // if (checkAll()){
    //     saveCustomer();
    //
    // }else {
    //     alert('error');
    // }

    let data = $('#CustomerFormData').serialize();
    let id = $('#customerId').val();

    console.log(id)
    console.log("Method Run")
    $.ajax({
        url:"http://localhost:8080/app/customer",
        method:"POST",
        data:data,
        success: function (resp) {
            if (resp.status === 200) {
           loadDataTable();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Customer has been saved',
                    showConfirmButton: false,
                    timer: 2500
                })
            }else if (resp.status === 500 && resp.data.startsWith("Duplicate entry "+"'"+id+"'")){
                Swal.fire({
                    position: 'top-end',
                    icon: 'warning',
                    title: 'Customer has been Already Exist',
                    showConfirmButton: false,
                    timer: 2500
                })


            }else {
                Swal.fire({
                    position: 'top-end',
                    icon: 'warning',
                    title: 'Customer Not saved. Please Try Again',
                    showConfirmButton: false,
                    timer: 2500
                })
            }
        },
        error:function (resp) {
            Swal.fire({
                position: 'top-end',
                icon: 'warning',
                title: 'Customer Not saved. Please Try Again',
                showConfirmButton: false,
                timer: 2500
            })
        }

    })
});

function loadDataTable() {
    $('#tblCustomer').empty();
    $.ajax({
        url: "http://localhost:8080/app/customer",
        method: "GET",
        dataType:"json",
        success: function (resp) {
            console.log(resp)
            for (var customer of resp) {
                console.log(customer)
                var row = `<tr><td>${customer.cusId}</td><td>${customer.cusFirstName}</td><td>${customer.cusLastName}</td><td>${customer.cusAddress}</td><td>${customer.cusSalary}</td></tr>`;
                $('#tblCustomer').append(row)
                setDataTableToTextFeild();
                doubleClick();
            }
        }
    })
}
function setDataTableToTextFeild() {
    $('#tBody > tr').click(function () {
        let id = $(this).children(':eq(0)').text();
        let fName = $(this).children(':eq(1)').text();
        let lName = $(this).children(':eq(2)').text();
        let address = $(this).children(':eq(3)').text();
        let salary = $(this).children(':eq(4)').text();




        setDataTextFeild(id, fName, lName, address, salary);
        $('#customerId').prop('disabled', true);
        selectedId = $('#customerId').val();
        // setId(id);
        setBtn();
        $('#search').val("");
    });
}
function setDataTextFeild(id, fName, lName, address, salary) {
    $('#customerId').val(id);
    $('#cusFirstName').val(fName);
    $('#cusLastName').val(lName);
    $('#cusAddress').val(address);
    $('#cusSalary').val(salary);

}

function doubleClick() {
    $('#tblCustomer > tr').on('dblclick', function () {
        disableTextFeild(true);
        $("#btnCusDelete").prop("disabled", false);
        $("#btnCusSave").prop("disabled", true);
        $("#btnCusUpdate").prop("disabled", true);
    });
}
function disableTextFeild(condition) {
    $('#customerId').prop('disabled', condition);
    $('#cusFirstName').prop('disabled', condition);
    $('#cusLastName').prop('disabled', condition);
    $('#cusAddress').prop('disabled', condition);
    $('#cusSalary').prop('disabled', condition);

}
$("#btnCusDelete").click(function () {
    if (checkAll()){
        deleteCustomer();

    } else {
        alert('error');
    }
});


$('#btnCusUpdate').click(function () {

    // if (checkAll()) {
    //     updateCustomer();
    // } else {
    //     alert('error');
    // }
    var cusOB = {
        cusId:$('#customerId').val(),
        cusFirstName:$('#cusFirstName').val(),
        cusLastName:$('#cusLastName').val(),
        cusAddress:$('#cusAddress').val(),
        cusSalary:$('#cusSalary').val(),

    }
    let data = $('#CustomerFormData').serialize();
    let id = $('#customerId').val();

    console.log(data)
    $.ajax({
        url: "http://localhost:8080/app/customer",
        method: "PUT",
        contentType: "application/json",
        data:JSON.stringify(cusOB),
        success: function (resp) {
            if (resp.status === 200) {
                loadDataTable();
                clearTextField();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Customer has been Updated!',
                    showConfirmButton: false,
                    timer: 2500
                })
                // }else if (resp.status === 500 && resp.data.startsWith("Duplicate entry "+"'"+id+"'")){
                //     Swal.fire({
                //         position: 'top-end',
                //         icon: 'warning',
                //         title: 'Customer has been Already Exist',
                //         showConfirmButton: false,
                //         timer: 2500
                //     })


            } else {
                Swal.fire({
                    position: 'top-end',
                    icon: 'warning',
                    title: 'Customer Not saved. Please Try Again',
                    showConfirmButton: false,
                    timer: 2500
                })
            }
        },
        error: function (resp) {
            Swal.fire({
                position: 'top-end',
                icon: 'warning',
                title: 'Customer Not saved. Please Try Again',
                showConfirmButton: false,
                timer: 2500
            })
        }
    });
});
$('#btnCusGetAll').click(function () {

        loadDataTable();
        setDataTableToTextFeild();
        doubleClick();
        $('#search').val("");


});

$('#btnClearCusTable').click(function () {
    $('#tblCustomer').empty();
    clearTextField();
    disableTextField(false);
    $('#search').val("");

});



function updateCustomer() {
    getAllCustomerForTextField();

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

            for (let customerObj of customerDB) {
                if (customerObj.id == selectedId) {
                    index = customerDB.indexOf(customerObj);
                }
            }

            customerDB[index].id = customerId;
            customerDB[index].firstName = customerFName;
            customerDB[index].lastName = customerLName;
            customerDB[index].address = customerAddress;
            customerDB[index].salary = customerSalary;

            loadAllData();
            $('#customerId').prop('disabled', true);
            clearTextField();
          bindEvents();
            focusClick();
            $('#search').val("");
            Swal.fire('Saved!', '', 'success');



        } else if (result.isDenied) {
            Swal.fire('Changes are not saved', '', 'info')
        }


    });
}

function deleteCustomer() {


}

function searchExistCustomer(id) {
    return customerDB.find(function (customer) {
        return customer.id == id;
    });
}



function setDataTextField(id,firstName,lastName,address,salary) {
    $('#customerId').val(id);
    $('#cusFirstName').val(firstName);
    $('#cusLastName').val(lastName);
    $('#cusAddress').val(address);
    $('#cusSalary').val(salary);
}
function getAllCustomers() {

    $("#tblCustomer").empty();

    for (let i = 0; i < customerDB.length; i++) {
        let id = customerDB[i].id;
        let firstName = customerDB[i].firstName;
        let lastName = customerDB[i].lastName;
        let address = customerDB[i].address;
        let salary = customerDB[i].salary;

        let row = `<tr>
                     <td>${id}</td>
                     <td>${firstName}</td>
                     <td>${lastName}</td>
                     <td>${address}</td>
                     <td>${salary}</td>
                    </tr>`;

        $("#tblCustomer").append(row);

        bindEvents();
    }
}
function bindEvents() {
    $('#tblCustomer>tr').click(function () {

        let id = $(this).children().eq(0).text();
        let firstName = $(this).children().eq(1).text();
        let lastName = $(this).children().eq(2).text();
        let address = $(this).children().eq(3).text();
        let salary = $(this).children().eq(4).text();

        setDataTextField(id, firstName, lastName, address, salary);
        $('#customerId').prop('disabled', true);
        selectedId = $('#customerId').val();
    })
}



function focusClick() {
    $('#tblCustomer > tr').on('click', function () {
        $("#btnCusUpdate").prop("disabled", false);
        disableTextField(false);
        $("#btnCusDelete").prop("disabled", false);
        $("#btnCusSave").prop("disabled", true);

    });
}
function searchCustomer() {
    $('#search').on('keyup', function () {
        $('#tblCustomer').empty();
        let index = -1;

        for (let customerObj of customerDB) {
            if (customerObj.id == $('#search').val()) {
                index = customerDB.indexOf(customerObj);
            }
        }
        var row = `<tr><td>${customerDB[index].id}</td><td>${customerDB[index].firstName}</td><td>${customerDB[index].lastName}</td><td>${customerDB[index].address}</td><td>${customerDB[index].salary}</td></tr>`;
        $('#tblCustomer').append(row)
        setDataTextField();
        focusClick();
    });

}