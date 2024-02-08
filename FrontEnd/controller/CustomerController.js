


let customerId;
let customerFName;
let customerLName;
let customerAddress;
let customerSalary;
let selectedId;

$(window).on('load',function () {
    $("#btnCusUpdate").prop("disabled", true);
    $("#btnCusDelete").prop("disabled", true);
});

function getAllCustomerForTextField() {
     customerId = $('#customerId').val();
     customerFName = $('#cusFirstName').val();
     customerLName = $('#cusLastName').val();
    customerAddress = $('#cusAddress').val();
     customerSalary = $('#cusSalary').val();
}
$('#btnCusSave').click(function () {
    if (checkAll()){
        saveCustomer();

    }else {
        alert('error');
    }
});


$("#btnCusDelete").click(function () {
    if (checkAll()){
        deleteCustomer();

    } else {
        alert('error');
    }
});


$('#btnCusUpdate').click(function () {

    if (checkAll()){
        updateCustomer();

    } else {
        alert('error');
    }
});
$('#btnCusGetAll').click(function () {
    getAllCustomers();
    setDataTextField();
    focusClick();
    $('#search').val("");

});

$('#btnClearCusTable').click(function () {
    $('#tblCustomer').empty();
    clearTextField();
    disableTextField(false);
    $('#search').val("");

});

function saveCustomer() {


        let customerIds = $('#customerId').val();

        if (searchExistCustomer(customerIds.trim())) {
            // Swal.fire({
            //     icon: 'error',
            //     title: 'Oops...',
            //     text: 'This Customer Already Exist.'
            // });

            alert('already exist')
        }else {
            getAllCustomerForTextField();
            let newCustomer = Object.assign({},customer);

            newCustomer.id = customerId;
            newCustomer.firstName = customerFName;
            newCustomer.lastName = customerLName;
            newCustomer.address = customerAddress;
            newCustomer.salary = customerSalary;

            customerDB.push(newCustomer);

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Customer has been saved',
                showConfirmButton: false,
                timer: 1500

            })

            loadAllData();
            clearTextField();
        bindEvents();
            focusClick();
            $('#search').val("");

        }

}

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

            for (let customerObj of customerDB) {
                if (customerObj.id == selectedId) {
                    customerDB.splice(selectedId, 1);
                }
            }


            loadAllData();
            clearTextField();
            bindEvents()
            focusClick();
            $('#search').val("");


            Swal.fire('Deleted!', '', 'success');


        } else if (result.isDenied) {
            Swal.fire('Not Delete', '', 'info')
        }
    });
}

function searchExistCustomer(id) {
    return customerDB.find(function (customer) {
        return customer.id == id;
    });
}

function loadAllData() {
    $('#tblCustomer').empty();
    for (var customer of customerDB){
        var row = `<tr><td>${customer.id}</td><td>${customer.firstName}</td><td>${customer.lastName}</td><td>${customer.address}</td><td>${customer.salary}</td></tr>`;
        $('#tblCustomer').append(row)
    }
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

function disableTextField(condition) {
    $('#customerId').prop('disabled', condition);
    $('#cusFirstName').prop('disabled', condition);
    $('#cusLastName').prop('disabled', condition);
    $('#cusAddress').prop('disabled', condition);
    $('#cusSalary').prop('disabled', condition);

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