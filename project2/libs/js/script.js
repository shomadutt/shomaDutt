// $(window).on("load", function () {
//     if ($("#preloader").length) {
//       $("#preloader")
//         .delay(100)
//         .fadeOut("slow", function () {
//           $(this).remove();
//         });
//     }
//   });

$(document).ready(function () {
  //1
  const colourArray = ["#00cc00", "#6600ff", "#e600e6", "#ff0000"];

  // Populate the directory
  $.ajax({
    //2
    type: "POST",
    url: "libs/php/getAll.php",
    dataType: "json",

    success: function (result) {
      //3

      //console.log(result);

      $("#directoryData").html("");

      alphabetArray = [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
      ];

      let alphabetMarkup;

      $.each(alphabetArray, function (alphabetIndex) {
        letterMarkup =
          '<div class="row">' +
          `<div class="col-sm-5 alignmentRight">${alphabetArray[alphabetIndex]}</div>` +
          "</div>";

        let letter = $("#directoryData").append(letterMarkup);

        let employeeMarkup;

        $.each(result.data, function (index) {
          //console.log(index);

          if (result.data[index].lastName[0] === alphabetArray[alphabetIndex]) {
            employeeMarkup =
              '<div class="row">' +
              '<div class="col-sm-5 alignmentRight"></div>' +
              '<div class="col-sm-2">' +
              '<div class="square"></div>' +
              "</div>" +
              '<div class="col-sm-4 alignmentLeft namePosition">' +
              `<a id="nameLink" href="#employeeModal" data-bs-toggle="modal" data-bs-target="#employeeModal">${result.data[index].lastName}` +
              " " +
              `${result.data[index].firstName}</a>`;
            "</div>" + "</div>";

            let square = $(".square");

            for(let i = 0; i < square.length; i++) {
              if (index % 4 === 0) {
                square.css('background-color', colourArray[0]);
              } else if (index % 4 === 1) {
                square.css("background-color", colourArray[1]);
              } else if (index % 4 === 2) {
                square.css("background-color", colourArray[2]);
              } else if (index % 4 === 3) {
                square.css("background-color", colourArray[3]);
              }
            }

            $(letter).append(employeeMarkup);
          }
        });

        $("#verticalAlphabet").append(
          `<div class="col-sm-6 alignmentRight">${alphabetArray[alphabetIndex]}</div>`
        );
      });
    },
  }); //2

  //Employee modal
  $(document).on("click", "#nameLink", function () {
    //1

    $.ajax({
      //2
      type: "POST",
      url: "libs/php/getAll.php",
      dataType: "json",

      success: function (result) {
        //3
        //console.log(result);

        $.each(result.data, function (index) {
          //4

          if (
            result.data[index].lastName + " " + result.data[index].firstName ===
            $("#nameLink").text()
          ) {
            console.log($("#nameLink").text());

            $("#employeeHeading").empty();

            $("#employeeHeading").append(
              `${result.data[index].firstName}` +
                " " +
                `${result.data[index].lastName}`
            );

            $("#txtFirstName").html(result.data[index].firstName);
            $("#txtLastName").html(result.data[index].lastName);
            $("#txtJobTitle").html(result.data[index].jobTitle);
            $("#txtEmail").html(result.data[index].email);
            $("#txtDept").html(result.data[index].department);
            $("#txtLocation").html(result.data[index].location);

            $("#employeeModal").modal("show");
          }
        }); //4
      }, //3
    }); //2
  }); //1
}); //1
