let student = {};

var stored = [];

let form = $('#form');

$(document).ready(function () {



     $("#btnclick").click(function () {



          let id = $('#id').val();

          let firstName = $('#firstname').val();

          let lastName = $('#lastname').val();

          let dob = $('#dob').val();

          let address = $('#address').val();

          let phoneNumber = $('#phonenumber').val();

          let emailId = $('#emailid').val();

          let state = $('#selectstate').val();

          let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

          let validEmail = validRegex.test(emailId);

          let validphoneNo = /^\d{10}$/;

          let validPhoneNumber = validphoneNo.test(phoneNumber);

          var gender = $("input[name='gender']:checked").val();

          let isvalid = true;

          //first name validation

          if (firstName == '') {
               $('#error1').text('! Please Enter the Last Name')
               isvalid = false;
          }
          else {
               $('#error1').text('')
          }

          //last name validation

          if (lastName == '') {
               $('#error2').text('! Please Enter the Last Name')
               isvalid = false;

          }
          else {
               $('#error2').text('')
          }
          // gender validation

          if (gender == null) {
               $('#error7').text(' Please choose your gender')
               isvalid = false;

          }
          else {

               $('#error7').text('')
               gender.value;

          }

          // date of birth validation

          if (dob == '') {

               $('#error3').text('! Please Enter the Date of Birth')
               isvalid = false;
          }
          else {
               $('#error3').text('')
          }
          // address validation

          if (address == '') {

               $('#error4').text('! Please Enter the Address')
               isvalid = false;

          }
          else {
               $('#error4').text('')
          }
          // phone Number validation

          if (phoneNumber == '') {

               $('#error5').text('! Please Enter the Phone Number')
               isvalid = false;

          }
          else if (!validPhoneNumber) {

               $('#error5').text('! Please Enter valid Phone Number')
               isvalid = false;

          }
          else {
               $('#error5').text('')
          }
          // Email Id validation

          if (emailId == '') {

               $('#error6').text('! Please Enter the email')
               isvalid = false;

          }
          else if (!validEmail) {
               $('#error6').text('! fill the valid Email Address')
               isvalid = false;

          }
          else {
               $('#error6').text('')
          }
          // state validation
          if (state == 'Select a State') {
               $('#error8').text('! please select your state')
               isvalid = false;

          }
          else {
               $('#error8').text('')
          }


          let result =

          {
               "FirstName": firstName,
               "lastname": lastName,
               "Gender": gender,
               "Dob": dob,
               "Address": address,
               "Phonenumber": phoneNumber,
               "EmailId": emailId,
               "state": state
          }

          console.log(result)

          if ((id === "") && (isvalid)) {
               $.ajax({
                    type: "POST",
                    url: "https://63b806e94d97e82aa3ccef11.mockapi.io/user",
                    data: result,
                    encode: true,
                    success: function (data) {
                         get();
                         console.log(data)
                         $('#form')[0].reset()
                         location.reload();
                    }

               });
          }

          else {
               $.ajax({
                    type: "PUT",
                    url: "https://63b806e94d97e82aa3ccef11.mockapi.io/user/" + student.id,
                    data: result,
                    encode: true,
                    success: function (data) {
                         // console.log(response);
                         get();
                         $('#form')[0].reset();
                         location.reload();

                    }
               });
          }

     });


})
function get() {

     $.ajax({
          type: "GET",
          url: "https://63b806e94d97e82aa3ccef11.mockapi.io/user",
          dataType: "JSON",
          success: function (response) {
               let storedData = response;


               for (let i = 0; i < storedData.length; i++) {


                    let row =
                         "<tr>"
                         + "<td>" + storedData[i].FirstName + "</td>"
                         + "<td>" + storedData[i].lastname + "</td>"
                         + "<td>" + storedData[i].Gender + "</td>"
                         + "<td>" + storedData[i].Address + "</td>"
                         + "<td>" + storedData[i].Dob + "</td>"
                         + "<td>" + storedData[i].Phonenumber + "</td>"
                         + "<td>" + storedData[i].EmailId + "</td>"
                         + "<td>" + storedData[i].state + "</td>"
                         + "<td><button type='button' class=' text-white btn btn-warning' onclick='btnEdit(" + storedData[i].id + ")'>Edit</button>" +
                         "<button type='button' class=' btn btn-danger' onclick='deleteRow(" + storedData[i].id + ")'>Delete</button>" + "</td>"

                    "</tr>"




                    document.querySelector('#tablebody').innerHTML += row;
               }
          }

     })

}

function btnEdit(id) {

     $.ajax({
          type: "GET",
          url: "https://63b806e94d97e82aa3ccef11.mockapi.io/user/" + id,
          success: function (response) {

               $('#id').val(response.id);
               $('#firstname').val(response.FirstName);
               $('#lastname').val(response.lastname);
               $("input[name='gender']").each(function () {
                    if ($(this).val() == response.Gender) {
                         $(this).prop("checked", true);
                    } else {
                         $(this).prop("checked", false);
                    }
               });
               $('#dob').val(response.Dob);
               $('#selectstate').val(response.state);
               $('#address').val(response.Address);
               $('#emailid').val(response.EmailId);
               $('#phonenumber').val(response.Phonenumber);
               $('#btnclick').text('Update').attr('id', 'update-btn').data('id', id);
               student = response

          }



     });

}
function deleteRow(id) {

     $.ajax({
          type: "DELETE",
          url: "https://63b806e94d97e82aa3ccef11.mockapi.io/user/" + id,

          success: function (response) {
               alert('Are you sure you want to delete')
               get();
               location.reload();

          },
          error: function (response) {
               alert('Error!')
          }
     })

}