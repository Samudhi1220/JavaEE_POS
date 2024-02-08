const CUS_ID_REGEX = /^(C00-)[0-9]{3}$/;
const CUS_FIRSTNAME_REGEX = /^[A-Za-z ]{5,}$/;
const CUS_LASTNAME_REGEX = /^[A-Za-z ]{5,}$/;
const CUS_ADDRESS_REGEX = /^[A-Za-z0-9 ]{8,}$/;
const CUS_SALARY_REGEX = /^[0-9]{2,}([.][0-9]{2})?$/;

let c_vArray = new Array();
c_vArray.push({field: $("#customerId"), regEx: CUS_ID_REGEX});
c_vArray.push({field: $("#cusFirstName"), regEx: CUS_FIRSTNAME_REGEX});
c_vArray.push({field: $("#cusLastName"), regEx: CUS_LASTNAME_REGEX});
c_vArray.push({field: $("#cusAddress"), regEx: CUS_ADDRESS_REGEX});
c_vArray.push({field: $("#cusSalary"), regEx: CUS_SALARY_REGEX});

function checkValidation(object) {
    if (object.regEx.test(object.field.val())) {
        setBorder(true, object);
        return true;
    }
    setBorder(false, object);
    return false;
}

function setBorder(bol, ob) {
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

function clearTextField() {
    $('#customerId,#cusFirstName,#cusLastName,#cusAddress,#cusSalary').val("");
    $('#customerId,#cusFirstName,#cusLastName,#cusAddress,#cusSalary').css("border", "1px solid #ced4da");
    $('#customerId').focus();
    setBtn();


}


function checkAll() {
    for (let i = 0; i < c_vArray.length; i++) {
        if (!checkValidation(c_vArray[i])) return false;
    }
    return true;
}

focusNextTextField();
setBtn();
function focusNextTextField() {
    $('#customerId,#cusFirstName,#cusLastName,#cusAddress,#cusSalary').on('keydown keyup', function (e) {
        let indexNo = c_vArray.indexOf(c_vArray.find((c) => c.field.attr("id") == e.target.id));

        if (e.key == "Tab") {
            e.preventDefault();
        }
        let checker = checkValidation(c_vArray[indexNo]);

        if (e.key == "Enter") {
            if ($('#customerId').val() != "" && checker) {
                $('#cusFirstName').focus();
            }

            if ($('#cusFirstName').val() != "" && checker) {
                $('#cusLastName').focus();
            }

            if ($('#cusLastName').val() != "" && checker) {
                $('#cusAddress').focus();
            }

            if ($('#cusAddress').val() != "" && checker) {
                $('#cusSalary').focus();
            }


            if (checkAll()){

                $('#customerId').focus();
                $('#btnCusSave').click();
            }

        }
        setBtn();
    });
}

setBtn();
function setBtn() {
    $('#btnCusSave').prop("disabled", true);
    if (checkAll()) {
        $("#btnCusSave").prop("disabled", false);
        $("#btnCusUpdate").prop("disabled", false);

    } else {
        $("#btnCusSave").prop("disabled", true);
        $("#btnCusUpdate").prop("disabled", true);

    }
}
