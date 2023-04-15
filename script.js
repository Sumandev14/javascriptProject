var counter = 3;
var selectRow = null;
var Id = 1;
var tableId = 0;
let id = 2;
var Detail = [];

//=============ADD DATA TO DYNAMIC TABLE TO MODEL FORM ===============
function format(d) {
  //DYNAMIC ADD PRODUCT DATA IN THE TABLE
  let table =
    `<div class="row">` +
    `<table>` +
    `<thead>` +
    `<tr>` +
    `<th></th>` +
    `<th>Product Name</th>` +
    `<th>Type</th>` +
    `<th>Price</th>` +
    `<th>Discount</th>` +
    `<th>Final Price</th>` +
    `<th>Payment</th>` +
    `<th>Status</th>` +
    `</tr>` +
    `</thead>`;

  var tableForm = "";
  for (let n = 0; n < d.product_Data.length; n++) {
    tableForm +=
      "<tr>" +
      `<th></th>` +
      `<td>${d.product_Data[n].productName}</td>` +
      `<td>${d.product_Data[n].type}</td>` +
      `<td>${d.product_Data[n].price}</td>` +
      `<td>${d.product_Data[n].discount}</td>` +
      `<td>${d.product_Data[n].finalPrice}</td>` +
      `<td>${d.product_Data[n].payment}</td>` +
      `<td>${d.product_Data[n].status}</td>` +
      "</tr>";
  }
  tableForm += `</table>` + `</div>`;
  table += tableForm;
  return table;
}

var t;
$(document).ready(function () {
  t = $("#table").DataTable({
    // 'ajax' : './tableData.json',
    // ajax: {
    //     url: './tableData.json',
    //     dataSrc: 'Detail',
    // },
    data: Detail,
    columns: [
      {
        className: "dt-control",
        orderable: false,
        data: null,
        defaultContent: "",
      },
      {
        data: "id",
      },
      {
        data: "firstName",
      },
      {
        data: "lastName",
      },
      {
        data: "birth",
      },
      {
        data: "job",
      },
      {
        data: "phoneNo",
      },
      {
        data: "email",
      },
      {
        data: "address",
      },
      {
        data: null,
        render: (data) => {
          return `
                <button class="btn btn-success" data-toggle="modal" data-target="#ExampleModel" id="btn_edit" onclick="editBtn(${data.id})"><i class="bi bi-pencil-square"></i>Edit</button>

                <td><button class="btn btn-danger" onClick = "deleteBtn(${data.id})"><i class="bi bi-trash"></i>delete</button></td>
                `;
        },
      },
    ],
  });
  $("#table tbody").on("click", "td.dt-control", function () {
    var tr = $(this).closest("tr");
    var row = t.row(tr);

    if (row.child.isShown()) {
      row.child.hide();
      tr.removeClass("shown");
    } else {
      // Open this row
      row.child(format(row.data())).show();
      tr.addClass("shown");
    }
  });

  $("#table").on("click", ".btn-danger", function (id) {
    if (confirm("Are you sure, you want to delete this Row?") == true) {
      $(this).parent().parent().remove();
    }
  });
});

$("#ExampleModel").on("hide.bs.modal", function () {
  // console.log("Called");
  document.getElementById("form").reset();
  document.getElementById("dynamicRow").innerHTML = "";
});

function deleteBtn(id) {
  confirm("Delete row id is = " + id);
  console.log(id);
}

function openForm() {
  document.getElementById("dynamicRow").innerHTML = null;
  counter = 3;

  document.getElementById(
    "buttons"
  ).innerHTML = `<button type="button" class="btn btn-primary add-modal-waste"
    onclick="onSubmission() , validateForm()" id="saveId">
    Save
</button>`;

  // document.getElementById("saveId").style.display = "block"
  // document.getElementById("updateId").style.display = "none";
}

//====edit form===
var newId;
function editBtn(obj) {
  document.getElementById("buttons").innerHTML = `
    <button type="button" class="btn btn-danger" id="updateId" data-dismiss="modal" onclick="onUpdate(${obj})"></span>Update</button>`;

  document.getElementById("dynamicRow").innerHTML = null;
  counter = 3;

  newId = Detail.findIndex((object) => object.id == obj);

  if (Detail[newId]) {
    document.getElementById("fname").value = Detail[newId].firstName;
    document.getElementById("lname").value = Detail[newId].lastName;
    document.getElementById("dob").value = Detail[newId].birth;
    document.getElementById("job").value = Detail[newId].job;
    document.getElementById("phone").value = Detail[newId].phoneNo;
    document.getElementById("email").value = Detail[newId].email;
    document.getElementById("address").value = Detail[newId].address;

    let pName, pType, pPrice, pDiscount, pFprice, pPyment, pStatus;
    for (let i = 1; i <= Detail[newId].product_Data.length; i++) {
      if (Detail[newId].product_Data.length >= counter) {
        addDynamicRow();
      }
      if (document.getElementById(`productName${i}`)) {
        pName = document.getElementById(`productName${i}`);
        pType = document.getElementById(`productType${i}`);
        pPrice = document.getElementById(`price${i}`);
        pDiscount = document.getElementById(`discount${i}`);
        pFprice = document.getElementById(`finalPrice${i}`);
        pPyment = document.getElementById(`payment${i}`);
        pStatus = document.getElementById(`status${i}`);

        pName.value = Detail[newId].product_Data[i - 1].productName;
        pType.value = Detail[newId].product_Data[i - 1].type;
        pPrice.value = Detail[newId].product_Data[i - 1].price;
        pDiscount.value = Detail[newId].product_Data[i - 1].discount;
        pFprice.value = Detail[newId].product_Data[i - 1].finalPrice;
        pPyment.value = Detail[newId].product_Data[i - 1].payment;
        pStatus.value = Detail[newId].product_Data[i - 1].status;
      }
    }
  }
}

function readFormData() {
  var formData = {};
  formData["fname"] = document.getElementById("fname").value;
  formData["lname"] = document.getElementById("lname").value;
  formData["dob"] = document.getElementById("dob").value;
  formData["job"] = document.getElementById("job").value;
  formData["phone"] = document.getElementById("phone").value;
  formData["email"] = document.getElementById("email").value;
  formData["address"] = document.getElementById("address").value;

  return formData;
}

// function resetForm() {
//     document.getElementById("fname").innerHTML = "";

//     document.getElementById("form").reset();
// }

function closeForm() {
  document.getElementById("fname").innerHTML = "";
  document.getElementById("lname").innerHTML = "";
  document.getElementById("dob").innerHTML = "";
  document.getElementById("job").innerHTML = "";
  document.getElementById("phone").innerHTML = "";
  document.getElementById("email").innerHTML = "";
  document.getElementById("address").innerHTML = "";

  for (let j = 0; j < counter; j++) {
    document.getElementById(`productName${j}`).innerHTML = "";
    document.getElementById(`productType${j}`).innerHTML = "";
    document.getElementById(`price${j}`).innerHTML = "";
    document.getElementById(`discount${j}`).innerHTML = "";
    document.getElementById(`finalPrice${j}`).innerHTML = "";
    document.getElementById(`payment${j}`).innerHTML = "";
    document.getElementById(`status${j}`).innerHTML = "";
    // document.getElementById(`paymentStatus${j}`).innerHTML = "";
  }
  document.getElementById("form").reset();
}

//=====update form=====
function onUpdate() {
  // var day = dob.getDate();
  // var updateDate = ("0" + day).slice(-2) + "/" + (month.length > 1 ? month : "0" + month) + "/" + myDob.getFullYear()
  // console.log(updateDate)

  let check = readFormData();

  Detail[newId].firstName = check.fname;
  Detail[newId].lastName = check.lname;
  Detail[newId].birth = dob;
  Detail[newId].job = check.job;
  Detail[newId].phoneNo = check.phone;
  Detail[newId].email = check.email;
  Detail[newId].address = check.address;

  emptyArr = [];
  for (let i = 0; i < counter; i++) {
    // console.log(i)
    if (document.getElementById(`productName${i}`)) {
      let name = document.getElementById(`productName${i}`);
      let type = document.getElementById(`productType${i}`);
      let price = document.getElementById(`price${i}`);
      let discount = document.getElementById(`discount${i}`);
      let finalPrice = document.getElementById(`finalPrice${i}`);
      let payment = document.getElementById(`payment${i}`);
      let status = document.getElementById(`status${i}`);

      productObject = {
        obj: i,
        productName: name.value,
        type: type.value,
        price: price.value,
        discount: discount.value,
        finalPrice: finalPrice.value,
        payment: payment.value,
        status: status.value,
      };
      // Detail[newId].product_Data.push(productObject)
      emptyArr.push(productObject);
    }
  }
  Detail[newId].product_Data = emptyArr;
  $("#table").DataTable().clear().rows.add(Detail).draw(false);
}

// ======ADD DYNAMIC ROW TO CLICK ON ADD BUTTON====
function addDynamicRow() {
  var addItm = document.getElementById("dynamicRow");
  const new_el = document.createElement("div");
  new_el.innerHTML = `
   
    <div id="product" class="row d-flex product_table mt-3">
        <div class="col-2">
            <input type="text" class="form-control productName" id="productName${counter}" placeholder="Product Name">
            <span id="productError${counter}" class="error"> </span></b>
        </div>

        <div class="col-1">
            <select class="form-control type" id="productType${counter}">
            <option value="chose">chose</option>
                            <option value="study">accessories</option>
                            <option value="health">health</option>
                            <option value="home">home</option>
                            <option value="wellness">wellness</option>
            </select>
            <span id="typeError${counter}" class="error"> </span></b>
        </div>

        <div class="col-1">
            <input type="number" class="form-control price" id="price${counter}" placeholder="Price">
            <span id="priceError${counter}" class="error"> </span></b>
        </div>

        <div class="col-2">
            <input type="number" class="form-control discount" id="discount${counter}" placeholder="Discount">
            <span id="discountError${counter}" class="error"> </span></b>
        </div>

        <div class="col-2">
            <input type="number" class="form-control finalPrice" id="finalPrice${counter}" placeholder="Final Price">
            <span id="finalPriceError${counter}" class="error"> </span></b>
        </div>

        <div class="col-2">
            <input type="text" class="form-control payment" id="payment${counter}" placeholder="Payment">
            <span id="paymentError${counter}" class="error"> </span></b>
        </div>

        <div class="col-1">
            <select class="form-control status" id="status${counter}">
                <option value="chose">chose</option>
                <option value="successful">successful</option>
                <option value="cancel">cancel</option>
                <option value="pending">pending</option>
            </select>
            <span id="statusError${counter}" class="error"> </span></b>
        </div>
        <div class="col-1">
            <button class="btn btn-danger" onclick="remove_click(this)">
                <i class="bi bi-x-lg"></i>
            </button>        
        </div>
    </div> `;

  counter++;
  addItm.appendChild(new_el);
}

//====REMOVE THE DYNAMIC ROW====
function remove_click(del) {
  var delItem = del.parentNode.parentNode;
  delItem.remove();
}

function printError(productId, hintMsg) {
  document.getElementById(productId).innerHTML = hintMsg;
}

//===== validate form======
function validateForm() {
  var first_name = document.getElementById("fname").value;

  var last_name = document.getElementById("lname").value;

  var dob = document.getElementById("dob").value;

  var job = document.getElementById("job").value;

  var phone = document.getElementById("phone").value;

  var email = document.getElementById("email").value;

  var address = document.getElementById("address").value;

  var first_name = document.getElementById("fname").value;
  var fRegex = /^[a-zA-Z\s]+$/;

  var last_name = document.getElementById("lname").value;
  var lRegex = /^[a-zA-Z\s]+$/;

  var dob = document.getElementById("dob").value;

  var job = document.getElementById("job").value;
  var jRegex = /^[a-zA-Z\s]+$/;

  var phone = document.getElementById("phone").value;
  var phRegex = /^\d{10}$/;

  var email = document.getElementById("email").value;
  var eRegex = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;

  var address = document.getElementById("address").value;

  for (let j = 1; j < counter; j++) {
    if (document.getElementById(`productName${j}`)) {
      let productName = document.getElementById(`productName${j}`).value;

      let productType = document.getElementById(`productType${j}`).value;

      let productPrice = document.getElementById(`price${j}`).value;

      let productDiscount = document.getElementById(`discount${j}`).value;
      let discountRegex = /^\d{0,2}?$/;

      let FinalPrice = document.getElementById(`finalPrice${j}`).value;

      let productPayment = document.getElementById(`payment${j}`).value;

      let productStatus = document.getElementById(`status${j}`).value;

      if (productName == "") {
        //product name validation
        document.getElementById(`productError${j}`).innerHTML =
          "Enter your Product Name";
      } else {
        document.getElementById(`productError${j}`).innerHTML = "";
      }

      if (productType == "chose") {
        //product type validation
        document.getElementById(`typeError${j}`).innerHTML = "Select Type";
      } else {
        document.getElementById(`typeError${j}`).innerHTML = "";
      }

      if (productPrice == "") {
        //product price validation
        document.getElementById(`priceError${j}`).innerHTML = "Enter Price";
      } else {
        document.getElementById(`priceError${j}`).innerHTML = "";
      }

      if (productDiscount == "") {
        //product discount validation
        document.getElementById(`discountError${j}`).innerHTML =
          "Enter Product Discount";
      } else if (discountRegex.test(productDiscount) === false) {
        document.getElementById(`discountError${j}`).innerHTML =
          "Enter your valid Product discount";
      } else {
        document.getElementById(`discountError${j}`).innerHTML = "";
      }

      if (FinalPrice == "") {
        //product final price validation
        document.getElementById(`finalPriceError${j}`).innerHTML =
          "Enter Final Price";
      } else {
        document.getElementById(`finalPriceError${j}`).innerHTML = "";
      }

      if (productPayment == "") {
        //product payment validation
        document.getElementById(`paymentError${j}`).innerHTML =
          "Enter Product Payment";
      } else {
        document.getElementById(`paymentError${j}`).innerHTML = "";
      }

      if (productStatus == "chose") {
        //product status validation
        document.getElementById(`statusError${j}`).innerHTML = "Select status";
      } else {
        document.getElementById(`statusError${j}`).innerHTML = "";
      }
    }
  }

  document.getElementById("form").reset();

  // personal data
  if (first_name == "") {
    //First name validation
    printError("nameError", "Please enter your First Name");
  } else if (fRegex.test(first_name) === false) {
    printError("nameError", "Please enter a valid First Name");
  } else {
    printError("nameError", "");
    nameError = false;
  }

  if (last_name == "") {
    //last name validation
    printError("lastError", "Please enter your Last Name");
  } else if (lRegex.test(last_name) === false) {
    printError("lastError", "Please enter a valid Last Name");
  } else {
    printError("lastError", "");
    lastError = false;
  }

  if (dob == "") {
    //date-of-birth validation
    printError("dobError", "Please enter your Date-Of-bBirth");
  } else {
    printError("dobError", "");
    dobError = false;
  }

  if (job == "") {
    //job name validation
    printError("jobError", "Please enter your job");
  } else if (jRegex.test(job) === false) {
    printError("jobError", "Please enter a valid job");
  } else {
    printError("jobError", "");
    jobError = false;
  }

  if (phone == "") {
    //phone number validation
    printError("mobileError", "Please enter mobile number");
  } else if (phRegex.test(phone) == false) {
    printError("mobileError", "Please enter a valid mobile number");
  } else {
    printError("mobileError", "");
    mobileErr = false;
  }

  if (email == "") {
    //Email id validation
    printError("emailError", "Please enter your email");
  } else if (eRegex.test(email) == false) {
    printError("emailError", "Please enter a valid email");
  } else {
    printError("emailError", "");
    emailError = false;
  }

  if (address == "") {
    //adderss validation
    printError("addressError", "Please enter your address");
  } else {
    printError("addressError", "");
    return false;
  }
}

function onSubmission(event) {
  // ======Display Data ======
  const product_Data = [];
  // var Detail = []

  var firstName = document.getElementById("fname").value;

  var lastName = document.getElementById("lname").value;

  var birth = document.getElementById("dob").value;

  var job = document.getElementById("job").value;

  var phoneNo = document.getElementById("phone").value;

  var email = document.getElementById("email").value;

  var address = document.getElementById("address").value;

  var productName = document.getElementsByClassName("productName");
  var type = document.getElementsByClassName("type");
  var price = document.getElementsByClassName("price");
  var discount = document.getElementsByClassName("discount");
  var finalPrice = document.getElementsByClassName("finalPrice");
  var payment = document.getElementsByClassName("payment");
  var status = document.getElementsByClassName("status");

  for (let index = 0; index < productName.length; index++) {
    let object2 = {
      productName: productName[index].value,
      type: type[index].value,
      price: price[index].value,
      discount: discount[index].value,
      finalPrice: finalPrice[index].value,
      payment: payment[index].value,
      status: status[index].value,
    };
    product_Data.push(object2); //PUSH PRODUCT DATA
    if (object2.type == "") {
      return;
    }
    console.log("boj2", object2.productName);
  }

  let object1 = {
    id: id,
    firstName: firstName,
    lastName: lastName,
    birth: birth,
    job: job,
    phoneNo: phoneNo,
    email: email,
    address: address,
    product_Data: product_Data,
  };
  id++;

  Detail.push(object1); //PUSH PERSONAL DETAILS
  console.log(Detail);
  if (
    object1.firstName != "" &&
    object1.lastName != "" &&
    object1.birth != "" &&
    object1.job != "" &&
    object1.phoneNo != "" &&
    object1.email != "" &&
    object1.address != "" &&
    object1.product_Data != "" &&
    product_Data[0].productName != "" &&
    product_Data[1].productName != "" &&
    product_Data[0].type != "chose" &&
    product_Data[1].type != "chose" &&
    product_Data[0].price != "" &&
    product_Data[1].price != "" &&
    product_Data[0].discount != "" &&
    product_Data[1].discount != "" &&
    product_Data[0].finalPrice != "" &&
    product_Data[1].finalPrice != "" &&
    product_Data[0].payment != "" &&
    product_Data[1].payment != "" &&
    product_Data[0].status != "chose" &&
    product_Data[1].status != "chose"
  ) {
    t.row
      .add({
        id: object1.id,
        firstName: object1.firstName,
        lastName: object1.lastName,
        birth: object1.birth,
        job: object1.job,
        phoneNo: object1.phoneNo,
        email: object1.email,
        address: object1.address,
        product_Data: object1.product_Data,
      })
      .draw();
  }
}
