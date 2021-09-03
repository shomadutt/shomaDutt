$(window).on("load", function () {
  if ($("#preloader").length) {
    $("#preloader")
      .delay(100)
      .fadeOut("slow", function () {
        $(this).remove();
      });
  }
});

$(document).ready(function () {
  const alphabetArray = [
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

  function startPage() {
    // Populate the directory with employees
    $.ajax({
      type: "POST",
      url: "libs/php/getAllPersonnel.php",
      dataType: "json",

      success: function (result) {
        //console.log(result);

        $("#directoryData").html("");

        $.each(alphabetArray, function (alphabetIndex) {
          let letterMarkup =
            '<div class="row">' +
            `<div class="col-sm-2 alignmentRight" id="letterIndex">${alphabetArray[alphabetIndex]}</div>` +
            "</div>";

          let letter = $("#directoryData").append(letterMarkup);

          $.each(result.data, function (index) {
            let lastNameUpper = result.data[index].lastName[0].toUpperCase();

            if (lastNameUpper === alphabetArray[alphabetIndex]) {
              employeeMarkup =
                '<div class="row" >' +
                '<div class="col-sm-2"></div>' +
                '<div class="col-sm-1">' +
                `<div id="square" class="square"></div>` +
                "</div>" +
                '<div class="col-sm-4 namePosition">' +
                `<a id="nameLink${index}" class="nameLink hoverOver" href="#employeeHeading" data-bs-toggle="modal" data-bs-target="#employeeModal">${result.data[index].firstName}` +
                " " +
                `${result.data[index].lastName}</a>`;
              "</div>" + "</div>";

              letter.append(employeeMarkup);
            } else {
              // $("#letterIndex").hide();
            }
          });
        });
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log("status code: " + jqXHR.status);
        console.log("errorThrown: " + errorThrown);
        console.log("jqXHR.responseText: " + jqXHR.responseText);
      },
    });
  }

  startPage();

  $("#personnel-tab").on("click", function () {
    startPage();
  });

  //Populate the directory with departments
  $("#department-tab").on("click", function () {
    $.ajax({
      url: "libs/php/getAllDepartments.php",
      dataType: "json",
      data: {},
      success: function (result) {
        //console.log(result);

        $("#directoryData").html("");

        $.each(alphabetArray, function (alphabetIndex) {
          //4
          let deptLetterMarkup =
            '<div class="row">' +
            `<div class="col-sm-2 alignmentRight" id="horizontal${alphabetIndex}">${alphabetArray[alphabetIndex]}</div>` +
            "</div>";

          let deptLetter = $("#directoryData").append(deptLetterMarkup);

          $.each(result.data, function (index) {

            let deptNameUpper = result.data[index].name[0].toUpperCase();

            if (deptNameUpper === alphabetArray[alphabetIndex]) {


              let deptMarkup =
                '<div class="row" >' +
                '<div class="col-sm-2"></div>' +
                '<div class="col-sm-1">' +
                `<div id="deptSquare" class="square"></div>` +
                "</div>" +
                '<div class="col-sm-4 namePosition">' +
                `<a id="nameLink${index}" class="nameLink hoverOver" href="#employeeHeading" data-bs-toggle="modal" data-bs-target="#employeeModal">${result.data[index].name}`;
              "</div>" + "</div>";

              deptLetter.append(deptMarkup);
            }
          });
        });
      },
    });
  });

  // Populate the directory with locations
  $("#location-tab").on("click", function () {
    $.ajax({
      url: "libs/php/getAllLocations.php",
      dataType: "json",
      data: {},
      success: function (result) {
        //console.log(result);

        $("#directoryData").html("");

        $.each(alphabetArray, function (alphabetIndex) {
          //4
          let locLetterMarkup =
            '<div class="row">' +
            `<div class="col-sm-2 alignmentRight" id="horizontal${alphabetIndex}">${alphabetArray[alphabetIndex]}</div>` +
            "</div>";

          let locLetter = $("#directoryData").append(locLetterMarkup);

          $.each(result.data, function (index) {

            let locNameUpper = result.data[index].name[0].toUpperCase();

            if (locNameUpper === alphabetArray[alphabetIndex]) {
 
              let locMarkup =
                '<div class="row" >' +
                '<div class="col-sm-2"></div>' +
                '<div class="col-sm-1">' +
                `<div id="deptSquare" class="square"></div>` +
                "</div>" +
                '<div class="col-sm-4 namePosition">' +
                `<a id="nameLink${index}" class="nameLink hoverOver" href="#employeeHeading" data-bs-toggle="modal" data-bs-target="#employeeModal">${result.data[index].name}`;
              "</div>" + "</div>";

              locLetter.append(locMarkup);
            }
          });
        });
      },
    });
  });
}); 
