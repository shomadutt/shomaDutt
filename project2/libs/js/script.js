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
  //1

  const colourArray = ["#00cc00", "#6600ff", "#e600e6", "#ff0000"];

  //console.log(colourArray);

  let letterMarkup;
  let letter;
  let employeeMarkup;
  let square;

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

      $.each(alphabetArray, function (alphabetIndex) {
        //4
        letterMarkup =
          '<div class="row">' +
          `<div class="col-sm-6 alignmentRight" id="horizontal${alphabetIndex}">${alphabetArray[alphabetIndex]}</div>` +
          "</div>";

        $("#verticalAlphabet").append(
          `<a href="#horizontal${alphabetIndex}" class="vertical"><div class="col-sm-6">${alphabetArray[alphabetIndex]}</div></a>`
        );

        letter = $("#directoryData").append(letterMarkup);

        $.each(result.data, function (index) {
          //5

          let lastNameUpper = result.data[index].lastName[0].toUpperCase();

          if (lastNameUpper === alphabetArray[alphabetIndex]) {
            //6

            //console.log(index);

            employeeMarkup =
              '<div class="row">' +
              '<div class="col-sm-6"></div>' +
              '<div class="col-sm-2">' +
              `<div id="square${index}" class="square"></div>` +
              "</div>" +
              '<div class="col-sm-4 namePosition">' +
              `<a id="nameLink${index}" class="nameLink" href="#employeeHeading" data-bs-toggle="modal" data-bs-target="#employeeModal">${result.data[index].lastName}` +
              " " +
              `${result.data[index].firstName}</a>`;
            "</div>" + "</div>";

            letter.append(employeeMarkup);

            square = $(`#square${index}`);

            //console.log(square);

            if (index % 4 === 0) {
              square.css("background-color", colourArray[0]);
            } else if (index % 4 === 1) {
              square.css("background-color", colourArray[1]);
            } else if (index % 4 === 2) {
              square.css("background-color", colourArray[2]);
            } else if (index % 4 === 3) {
              square.css("background-color", colourArray[3]);
            }

            //Employee modal
            $(`#nameLink${index}`).on("click", function () {
              $("#employeeHeading").empty();

              $("#employeeHeading").append($(`#nameLink${index}`).text());

              $("#txtFirstName").html(result.data[index].firstName);
              $("#txtLastName").html(result.data[index].lastName);
              $("#txtJobTitle").html(result.data[index].jobTitle);
              $("#txtEmail").html(result.data[index].email);
              $("#txtDept").html(result.data[index].department);
              $("#txtLocation").html(result.data[index].location);

              setTimeout(function () {
                $("#employeeModal").modal("show");
              }, 1000);

              //Edit employee modal

              // Edit button
              $("#edit").on("click", function () {
                $("#employeeModal").modal("hide");
                $("#editHeading").empty();
                $("#editHeading").append("Edit employee");
                $("#txtEditFirstName").html(result.data[index].firstName);
                $("#txtEditLastName").html(result.data[index].lastName);

                $.ajax({
                  //2
                  type: "POST",
                  url: "libs/php/getAllDepartments.php",
                  dataType: "json",

                  success: function (result) {
                    $(".deptSelectList").html("");

                    $.each(result.data, function (index) {
                      $(".deptSelectList").append(
                        $("<option>", {
                          value: result.data[index].locationID,
                          text: result.data[index].name,
                        })
                      );
                    });
                  },
                });

                $.ajax({
                  //2
                  type: "POST",
                  url: "libs/php/getAllLocations.php",
                  dataType: "json",

                  success: function (result) {
                    $(".locSelectList").html("");

                    $.each(result.data, function (index) {
                      $(".locSelectList").append(
                        $("<option>", {
                          value: result.data[index].id,
                          text: result.data[index].name,
                        })
                      );
                    });
                  },
                });

                $(".deptSelectList").change(function () {
                  $(".locSelectList option[value=" + $(this).val() + "]").prop(
                    "selected",
                    "selected"
                  );
                });

                $(".locSelectList").change(function () {
                  $(".deptSelectList option[value=" + $(this).val() + "]").prop(
                    "selected",
                    "selected"
                  );
                });

                setTimeout(function () {
                  $("#editEmployeeModal").modal("show");
                }, 1000);

                $("#editCancel").on("click", function () {
                  location.reload();
                  $("#editEmployeeModal").modal("hide");
                });
              });

              $("#editForm").submit(function (event) {
                event.preventDefault();

                $("#editEmployeeModal").modal("hide");

                setTimeout(function () {
                  $("#editConfirmModal").modal("show");
                }, 1000);
              });

              $("#editConfirmCancel").on("click", function () {
                location.reload();
                $("#editConfirmModal").modal("hide");
              });

              $("#editConfirmForm").submit(function (event) {
                event.preventDefault();

                $("#editConfirmModal").modal("hide");

                let jobTitle = $("#editJobTitle").val();

                if (jobTitle !== "") {
                  jobTitle =
                    jobTitle[0].toUpperCase() +
                    jobTitle.substring(1, jobTitle.length);
                }

                //console.log($("#txtEditLastName").html());

                $.ajax({
                  url: "libs/php/editEmployee.php",
                  method: "post",
                  dataType: "text",
                  data: {
                    firstName: $("#txtEditFirstName").html(),
                    lastName: $("#txtEditLastName").html(),
                    jobTitle: jobTitle,
                    email: $("#editEmail").val(),
                    dept: $("#editDept").val(),
                  },

                  success: function (result) {
                    $("#editMessage").html("");
                    $("#editMessage").append(result);

                    setTimeout(function () {
                      $("#editSuccessModal").modal("show");
                    }, 1000);

                    setTimeout(function () {
                      location.reload();
                    }, 3000);
                  },
                });
              });

              // Delete button
              $("#delete").on("click", function () {
                $("#employeeModal").modal("hide");

                setTimeout(function () {
                  $("#deleteButtonConfirmModal").modal("show");
                }, 1000);
              });

              $("#deleteButtonConfirmForm").submit(function (event) {
                event.preventDefault();

                $("#deleteButtonConfirmModal").modal("hide");

                $.ajax({
                  //2
                  type: "POST",
                  url: "libs/php/deleteEmployee.php",
                  dataType: "text",
                  data: {
                    lastName: result.data[index].lastName,
                  },

                  success: function (result) {
                    //3

                    $("#deleteButtonMessage").html("");
                    $("#deleteButtonMessage").append(result);
                    //console.log(result);

                    setTimeout(function () {
                      $("#deleteButtonSuccessModal").modal("show");
                    }, 1000);

                    setTimeout(function () {
                      location.reload();
                    }, 3000);
                  },
                });
              });

              $("#deleteButtonConfirmCancel").on("click", function () {
                location.reload();
                $("#deleteButtonConfirmModal").modal("hide");
              });
            });
          } //6
        }); //5
      }); //4
    }, //3
  }); //2

  //Create modal
  $("#plus").on("click", function () {
    $("#createHeading").empty();
    $("#createHeading").append("Create employee");
    $.ajax({
      //2
      type: "POST",
      url: "libs/php/getAllDepartments.php",
      dataType: "json",

      success: function (result) {
        $(".deptSelectList").html("");

        $.each(result.data, function (index) {
          $(".deptSelectList").append(
            $("<option>", {
              value: result.data[index].locationID,
              text: result.data[index].name,
            })
          );
        });
      },
    });

    $.ajax({
      //2
      type: "POST",
      url: "libs/php/getAllLocations.php",
      dataType: "json",

      success: function (result) {
        $(".locSelectList").html("");

        $.each(result.data, function (index) {
          $(".locSelectList").append(
            $("<option>", {
              value: result.data[index].id,
              text: result.data[index].name,
            })
          );
        });
      },
    });

    $(".deptSelectList").change(function () {
      $(".locSelectList option[value=" + $(this).val() + "]").prop(
        "selected",
        "selected"
      );
    });

    $(".locSelectList").change(function () {
      $(".deptSelectList option[value=" + $(this).val() + "]").prop(
        "selected",
        "selected"
      );
    });

    setTimeout(function () {
      $("#createModal").modal("show");
    }, 1000);
  });
  $("#createCancel").on("click", function () {
    location.reload();
    $("#createModal").modal("hide");
  });

  $("#createForm").submit(function (event) {
    event.preventDefault();

    $("#createModal").modal("hide");

    setTimeout(function () {
      $("#createConfirmModal").modal("show");
    }, 1000);
  });

  $("#createConfirmForm").submit(function (event) {
    event.preventDefault();

    $("#createConfirmModal").modal("hide");

    let firstName = $("#createFirstName").val();

    if (firstName !== "") {
      firstName =
        firstName[0].toUpperCase() + firstName.substring(1, firstName.length);
    }

    let lastName = $("#createLastName").val();

    if (lastName !== "") {
      lastName =
        lastName[0].toUpperCase() + lastName.substring(1, lastName.length);
    }

    let jobTitle = $("#createJobTitle").val();

    if (jobTitle !== "") {
      jobTitle =
        jobTitle[0].toUpperCase() + jobTitle.substring(1, jobTitle.length);
    }

    $.ajax({
      url: "libs/php/createEmployee.php",
      method: "post",
      dataType: "text",
      data: {
        firstName: firstName,
        lastName: lastName,
        jobTitle: jobTitle,
        email: $("#createEmail").val(),
        dept: $("#createDept").val(),
      },
      success: function (result) {
        $("#createMessage").html("");
        $("#createMessage").append(result);
        //console.log(result);

        setTimeout(function () {
          $("#createSuccessModal").modal("show");
        }, 1000);

        setTimeout(function () {
          location.reload();
        }, 3000);
      },
    });
  });

  $("#createCancel").on("click", function () {
    location.reload();
    $("#createModal").modal("hide");
  });

  $("#createConfirmCancel").on("click", function () {
    location.reload();
    $("#createConfirmModal").modal("hide");
  });

  //Delete modal
  $("#editButton").on("click", function () {
    //1

    const colourArray = ["#00cc00", "#6600ff", "#e600e6", "#ff0000"];

    $.ajax({
      //2
      type: "POST",
      url: "libs/php/getAllPersonnel.php",
      dataType: "json",

      success: function (result) {
        //3

        //console.log(result);

        $("#deleteData").html("");

        deleteAlphabetArray = [
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

        $.each(deleteAlphabetArray, function (deleteIndex) {
          //4

          let deleteLetterMarkup =
            '<div class="row">' +
            `<div class="col-sm-1 alignmentRight" id="delete${deleteIndex}">${deleteAlphabetArray[deleteIndex]}</div>` +
            "</div>";

          $("#deleteAlphabet").append(
            `<a href="#delete${deleteIndex}" class="vertical"><div class="col-sm-1">${deleteAlphabetArray[deleteIndex]}</div></a>`
          );

          let deleteLetter = $("#deleteData").append(deleteLetterMarkup);

          $.each(result.data, function (index) {
            //5
            //console.log(index);

            let lastNameDeleteUpper =
              result.data[index].lastName[0].toUpperCase();

            if (lastNameDeleteUpper === deleteAlphabetArray[deleteIndex]) {
              //6
              let deleteEmployeeMarkup =
                '<div class="row">' +
                '<div class="col-sm-2"></div>' +
                '<div class="col-sm-2">' +
                `<div id="deleteSquare${index}" class="square"></div>` +
                "</div>" +
                '<div class="col-sm-6 namePosition">' +
                `<div id="nameLink${index}" class="nameLink" href="#">${result.data[index].lastName}` +
                " " +
                `${result.data[index].firstName}</div>` +
                "</div>" +
                '<div class="col-sm-1">' +
                '<form action="">' +
                `<input
                        type="checkbox"
                        class="deleteCheckbox"
                        id="checkList"
                        name="checkList"
                        value="${result.data[index].id}"
                      />` +
                "</form>" +
                "</div>" +
                "</div>";

              deleteLetter.append(deleteEmployeeMarkup);

              let deleteSquare = $(`#deleteSquare${index}`);

              if (index % 4 === 0) {
                deleteSquare.css("background-color", colourArray[0]);
              } else if (index % 4 === 1) {
                deleteSquare.css("background-color", colourArray[1]);
              } else if (index % 4 === 2) {
                deleteSquare.css("background-color", colourArray[2]);
              } else if (index % 4 === 3) {
                deleteSquare.css("background-color", colourArray[3]);
              }
            } //6
          });

          let clicked = false;
          $("#selectAll").on("click", function () {
            $(".deleteCheckbox").prop("checked", !clicked);
            clicked = !clicked;
            this.innerHTML = clicked ? "Deselect" : "Select";
            $("#selected").html("");
            let n = $("input:checked").length;
            $("#selected").append(n + " selected");
            if (n > 0) {
              $("#deleteButton").css("color", "#000");
            } else {
              $("#deleteButton").css("color", "#fff");
            }
          });

          $(".deleteCheckbox").on("click", function () {
            $("#selected").html("");
            let n = $("input:checked").length;
            $("#selected").append(n + " selected");
            if (n > 0) {
              $("#deleteButton").css("color", "#000");
            } else {
              $("#deleteButton").css("color", "#fff");
            }
          });
        });

        setTimeout(function () {
          $("#deleteModal").modal("show");
        }, 1000);
      },
    });
  });

  $("#deleteCancel").on("click", function () {
    location.reload();
    $("#deleteModal").modal("hide");
  });

  $("#deleteForm").submit(function (event) {
    event.preventDefault();

    $("#deleteModal").modal("hide");

    setTimeout(function () {
      $("#deleteConfirmModal").modal("show");
    }, 1000);
  });

  $("#deleteConfirmForm").submit(function (event) {
    event.preventDefault();

    $("#deleteConfirmModal").modal("hide");

    let checkList = [];

    $("input:checked").each(function () {
      checkList.push($(this).val());
    });

    //console.log(checkList);

    $.ajax({
      //2
      type: "POST",
      url: "libs/php/deleteEmployeeCheckList.php",
      dataType: "text",
      data: {
        checkList: checkList,
      },

      success: function (result) {
        //3

        console.log(result);
        $("#deleteMessage").html("");
        $("#deleteMessage").append(result);
        console.log(result);

        setTimeout(function () {
          $("#deleteSuccessModal").modal("show");
        }, 1000);

        setTimeout(function () {
          location.reload();
        }, 3000);
      },
    });
    $("#selected").html("");
  });

  $("#deleteConfirmCancel").on("click", function () {
    location.reload();
    $("#deleteConfirmModal").modal("hide");
  });

  // Delete search bar
  $("#deleteSearchBar").keyup(function () {
    let query = $(this).val();

    $.ajax({
      url: "libs/php/deleteSearchBar.php",
      method: "POST",
      dataType: "json",
      data: {
        query: query,
      },
      success: function (result) {
        //console.log(result);

        $("#deleteData").html("");

        $.each(result.data, function (index) {
          if (query != "") {
            //6
            let deleteSearchEmployeeMarkup =
              '<div class="row">' +
              '<div class="col-sm-2"></div>' +
              '<div class="col-sm-2">' +
              `<div id="deleteSearchSquare${index}" class="square"></div>` +
              "</div>" +
              '<div class="col-sm-6 namePosition">' +
              `<div id="nameLink${index}" class="nameLink" href="#">${result.data[index].lastName}` +
              " " +
              `${result.data[index].firstName}</div>` +
              "</div>" +
              '<div class="col-sm-1">' +
              '<form action="">' +
              `<input
                        type="checkbox"
                        class="deleteCheckbox"
                        id="checkList"
                        name="checkList"
                        value="${result.data[index].id}"
                      />` +
              "</form>" +
              "</div>" +
              "</div>";

            $("#deleteData").append(deleteSearchEmployeeMarkup);

            $("#deleteAlphabet").hide();

            let deleteSearchSquare = $(`#deleteSearchSquare${index}`);

            if (index % 4 === 0) {
              deleteSearchSquare.css("background-color", colourArray[0]);
            } else if (index % 4 === 1) {
              deleteSearchSquare.css("background-color", colourArray[1]);
            } else if (index % 4 === 2) {
              deleteSearchSquare.css("background-color", colourArray[2]);
            } else if (index % 4 === 3) {
              deleteSearchSquare.css("background-color", colourArray[3]);
            }

            let clicked = false;
            $("#selectAll").on("click", function () {
              $(".deleteCheckbox").prop("checked", !clicked);
              clicked = !clicked;
              this.innerHTML = clicked ? "Deselect" : "Select";
              $("#selected").html("");
              let n = $("input:checked").length;
              $("#selected").append(n + " selected");
              if (n > 0) {
                $("#deleteButton").css("color", "#000");
              } else {
                $("#deleteButton").css("color", "#fff");
              }
            });

            $(".deleteCheckbox").on("click", function () {
              $("#selected").html("");
              let n = $("input:checked").length;
              $("#selected").append(n + " selected");
              if (n > 0) {
                $("#deleteButton").css("color", "#000");
              } else {
                $("#deleteButton").css("color", "#fff");
              }
            });

            setTimeout(function () {
              $("#deleteModal").modal("show");
            }, 1000);

            $("#deleteCancel").on("click", function () {
              location.reload();
              $("#deleteModal").modal("hide");
            });
          } else {
            $.ajax({
              //2
              type: "POST",
              url: "libs/php/getAllPersonnel.php",
              dataType: "json",

              success: function (result) {
                //3

                console.log(result);

                $("#deleteData").html("");

                deleteAlphabetArray = [
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

                $.each(deleteAlphabetArray, function (deleteIndex) {
                  //4

                  let deleteLetterMarkup =
                    '<div class="row">' +
                    `<div class="col-sm-1 alignmentRight" id="delete${deleteIndex}">${deleteAlphabetArray[deleteIndex]}</div>` +
                    "</div>";

                  let deleteLetter =
                    $("#deleteData").append(deleteLetterMarkup);

                  $.each(result.data, function (index) {
                    //5
                    //console.log(index);

                    let lastNameDeleteUpper =
                      result.data[index].lastName[0].toUpperCase();

                    if (
                      lastNameDeleteUpper === deleteAlphabetArray[deleteIndex]
                    ) {
                      //6
                      let deleteEmployeeMarkup =
                        '<div class="row">' +
                        '<div class="col-sm-2"></div>' +
                        '<div class="col-sm-2">' +
                        `<div id="deleteSquare${index}" class="square"></div>` +
                        "</div>" +
                        '<div class="col-sm-6 namePosition">' +
                        `<div id="nameLink${index}" class="nameLink" href="#">${result.data[index].lastName}` +
                        " " +
                        `${result.data[index].firstName}</div>` +
                        "</div>" +
                        '<div class="col-sm-1">' +
                        '<form action="">' +
                        `<input
                                type="checkbox"
                                class="deleteCheckbox"
                                id="checkList"
                                name="checkList"
                                value="${result.data[index].id}"
                              />` +
                        "</form>" +
                        "</div>" +
                        "</div>";

                      deleteLetter.append(deleteEmployeeMarkup);

                      let deleteSquare = $(`#deleteSquare${index}`);

                      if (index % 4 === 0) {
                        deleteSquare.css("background-color", colourArray[0]);
                      } else if (index % 4 === 1) {
                        deleteSquare.css("background-color", colourArray[1]);
                      } else if (index % 4 === 2) {
                        deleteSquare.css("background-color", colourArray[2]);
                      } else if (index % 4 === 3) {
                        deleteSquare.css("background-color", colourArray[3]);
                      }
                    } //6
                  });

                  let clicked = false;
                  $("#selectAll").on("click", function () {
                    $(".deleteCheckbox").prop("checked", !clicked);
                    clicked = !clicked;
                    this.innerHTML = clicked ? "Deselect" : "Select";
                    $("#selected").html("");
                    let n = $("input:checked").length;
                    $("#selected").append(n + " selected");
                    if (n > 0) {
                      $("#deleteButton").css("color", "#000");
                    } else {
                      $("#deleteButton").css("color", "#fff");
                    }
                  });

                  $(".deleteCheckbox").on("click", function () {
                    $("#selected").html("");
                    let n = $("input:checked").length;
                    $("#selected").append(n + " selected");
                    if (n > 0) {
                      $("#deleteButton").css("color", "#000");
                    } else {
                      $("#deleteButton").css("color", "#fff");
                    }
                  });
                });
                $("#deleteAlphabet").show();

                setTimeout(function () {
                  $("#deleteModal").modal("show");
                }, 1000);
              },
            });
          }

          $("#deleteForm").submit(function (event) {
            event.preventDefault();

            $("#deleteModal").modal("hide");

            setTimeout(function () {
              $("#deleteConfirmModal").modal("show");
            }, 1000);
          });

          $("#deleteConfirmForm").submit(function (event) {
            event.preventDefault();

            $("#deleteConfirmModal").modal("hide");

            let checkList = [];

            $("input:checked").each(function () {
              checkList.push($(this).val());
            });

            //console.log(checkList);

            $.ajax({
              //2
              type: "POST",
              url: "libs/php/deleteEmployeeCheckList.php",
              dataType: "text",
              data: {
                checkList: checkList,
              },

              success: function (result) {
                //3

                $("#deleteMessage").html("");
                $("#deleteMessage").append(result);
                //console.log(result);

                setTimeout(function () {
                  $("#deleteSuccessModal").modal("show");
                }, 1000);

                setTimeout(function () {
                  location.reload();
                }, 3000);
              },
            });
            $("#selected").html("");
          });
          $("#deleteConfirmCancel").on("click", function () {
            location.reload();
            $("#deleteConfirmModal").modal("hide");
          });
        });
      },
    });
  });

  // Search bar
  $("#searchBar").keyup(function () {
    let query = $(this).val();

    $.ajax({
      url: "libs/php/searchBar.php",
      method: "POST",
      dataType: "json",
      data: {
        query: query,
      },
      success: function (result) {
        //console.log(result);

        $("#directoryData").html("");

        $.each(result.data, function (index) {
          if (query != "") {
            let searchEmployeeMarkup =
              '<div class="row">' +
              '<div class="col-sm-4"></div>' +
              '<div class="col-sm-1">' +
              `<div id="searchSquare${index}" class="square"></div>` +
              "</div>" +
              '<div class="col-sm-4 namePosition">' +
              `<a id="nameLinkSearch${index}" class="nameLink" href="#employeeHeading" data-bs-toggle="modal" data-bs-target="#employeeModal">${result.data[index].lastName}` +
              " " +
              `${result.data[index].firstName}</a>`;
            "</div>" + "</div>";

            $("#directoryData").append(searchEmployeeMarkup);

            let searchSquare = $(`#searchSquare${index}`);

            if (index % 4 === 0) {
              searchSquare.css("background-color", colourArray[0]);
            } else if (index % 4 === 1) {
              searchSquare.css("background-color", colourArray[1]);
            } else if (index % 4 === 2) {
              searchSquare.css("background-color", colourArray[2]);
            } else if (index % 4 === 3) {
              searchSquare.css("background-color", colourArray[3]);
            }

            $("#verticalAlphabet").hide();

            //Employee modal for searchBar
            $(`#nameLinkSearch${index}`).on("click", function () {
              $("#employeeHeading").empty();

              $("#employeeHeading").append($(`#nameLinkSearch${index}`).text());

              $("#txtFirstName").html(result.data[index].firstName);
              $("#txtLastName").html(result.data[index].lastName);
              $("#txtJobTitle").html(result.data[index].jobTitle);
              $("#txtEmail").html(result.data[index].email);
              $("#txtDept").html(result.data[index].department);
              $("#txtLocation").html(result.data[index].location);

              setTimeout(function () {
                $("#employeeModal").modal("show");
              }, 1000);

              //Edit employee modal

              // Edit button
              $("#edit").on("click", function () {
                $("#employeeModal").modal("hide");
                $("#editHeading").empty();
                $("#editHeading").append("Edit employee");
                $("#txtEditFirstName").html(result.data[index].firstName);
                $("#txtEditLastName").html(result.data[index].lastName);

                $.ajax({
                  //2
                  type: "POST",
                  url: "libs/php/getAllDepartments.php",
                  dataType: "json",

                  success: function (result) {
                    $(".deptSelectList").html("");

                    $.each(result.data, function (index) {
                      $(".deptSelectList").append(
                        $("<option>", {
                          value: result.data[index].locationID,
                          text: result.data[index].name,
                        })
                      );
                    });
                  },
                });

                $.ajax({
                  //2
                  type: "POST",
                  url: "libs/php/getAllLocations.php",
                  dataType: "json",

                  success: function (result) {
                    $(".locSelectList").html("");

                    $.each(result.data, function (index) {
                      $(".locSelectList").append(
                        $("<option>", {
                          value: result.data[index].id,
                          text: result.data[index].name,
                        })
                      );
                    });
                  },
                });

                $(".deptSelectList").change(function () {
                  $(".locSelectList option[value=" + $(this).val() + "]").prop(
                    "selected",
                    "selected"
                  );
                });

                $(".locSelectList").change(function () {
                  $(".deptSelectList option[value=" + $(this).val() + "]").prop(
                    "selected",
                    "selected"
                  );
                });

                setTimeout(function () {
                  $("#editEmployeeModal").modal("show");
                }, 1000);
              });

              $("#editForm").submit(function (event) {
                event.preventDefault();

                $("#editEmployeeModal").modal("hide");

                setTimeout(function () {
                  $("#editConfirmModal").modal("show");
                }, 1000);
              });

              $("#editConfirmForm").submit(function (event) {
                event.preventDefault();

                $("#editConfirmModal").modal("hide");

                let jobTitle = $("#editJobTitle").val();

                if (jobTitle !== "") {
                  jobTitle =
                    jobTitle[0].toUpperCase() +
                    jobTitle.substring(1, jobTitle.length);
                }

                $.ajax({
                  url: "libs/php/editEmployee.php",
                  method: "post",
                  dataType: "text",
                  data: {
                    firstName: $("#txtEditFirstName").html(),
                    lastName: $("#txtEditLastName").html(),
                    jobTitle: jobTitle,
                    email: $("#editEmail").val(),
                    dept: $("#editDept").val(),
                  },
                  success: function (result) {
                    $("#editMessage").html("");
                    $("#editMessage").append(result);

                    setTimeout(function () {
                      $("#editSuccessModal").modal("show");
                    }, 1000);

                    setTimeout(function () {
                      location.reload();
                    }, 3000);
                  },
                });
              });

              $("#editCancel").on("click", function () {
                location.reload();
                $("#editEmployeeModal").modal("hide");
              });
              $("#editConfirmCancel").on("click", function () {
                location.reload();
                $("#editConfirmModal").modal("hide");
              });

              // Delete button
              $("#delete").on("click", function () {
                $("#employeeModal").modal("hide");

                setTimeout(function () {
                  $("#deleteButtonConfirmModal").modal("show");
                }, 1000);
              });

              $("#deleteButtonConfirmForm").submit(function (event) {
                event.preventDefault();

                $("#deleteButtonConfirmModal").modal("hide");

                $.ajax({
                  //2
                  type: "POST",
                  url: "libs/php/deleteEmployee.php",
                  dataType: "text",
                  data: {
                    lastName: result.data[index].lastName,
                  },

                  success: function (result) {
                    //3

                    $("#deleteButtonMessage").html("");
                    $("#deleteButtonMessage").append(result);
                    //console.log(result);

                    setTimeout(function () {
                      $("#deleteButtonSuccessModal").modal("show");
                    }, 1000);

                    setTimeout(function () {
                      location.reload();
                    }, 3000);
                  },
                });
              });
              $("#deleteButtonConfirmCancel").on("click", function () {
                location.reload();
                $("#deleteButtonConfirmModal").modal("hide");
              });
            });
          } else {
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

                $.each(alphabetArray, function (alphabetIndex) {
                  //4
                  letterMarkup =
                    '<div class="row">' +
                    `<div class="col-sm-5 alignmentRight" id=horizontal${alphabetIndex}>${alphabetArray[alphabetIndex]}</div>` +
                    "</div>";

                  letter = $("#directoryData").append(letterMarkup);

                  $.each(result.data, function (index) {
                    //5
                    //console.log(index);

                    if (
                      result.data[index].lastName[0] ===
                      alphabetArray[alphabetIndex]
                    ) {
                      //6
                      employeeMarkup =
                        '<div class="row">' +
                        '<div class="col-sm-5"></div>' +
                        '<div class="col-sm-2">' +
                        `<div id="square${index}" class="square"></div>` +
                        "</div>" +
                        '<div class="col-sm-4 namePosition">' +
                        `<a id="nameLink${index}" class="nameLink" href="#employeeHeading" data-bs-toggle="modal" data-bs-target="#employeeModal">${result.data[index].lastName}` +
                        " " +
                        `${result.data[index].firstName}</a>`;
                      "</div>" + "</div>";

                      letter.append(employeeMarkup);

                      square = $(`#square${index}`);

                      if (index % 4 === 0) {
                        square.css("background-color", colourArray[0]);
                      } else if (index % 4 === 1) {
                        square.css("background-color", colourArray[1]);
                      } else if (index % 4 === 2) {
                        square.css("background-color", colourArray[2]);
                      } else if (index % 4 === 3) {
                        square.css("background-color", colourArray[3]);
                      }

                      //Employee modal
                      $(`#nameLink${index}`).on("click", function () {
                        $("#employeeHeading").empty();

                        $("#employeeHeading").append(
                          $(`#nameLink${index}`).text()
                        );

                        $("#txtFirstName").html(result.data[index].firstName);
                        $("#txtLastName").html(result.data[index].lastName);
                        $("#txtJobTitle").html(result.data[index].jobTitle);
                        $("#txtEmail").html(result.data[index].email);
                        $("#txtDept").html(result.data[index].department);
                        $("#txtLocation").html(result.data[index].location);

                        setTimeout(function () {
                          $("#employeeModal").modal("show");
                        }, 1000);

                        //Edit employee modal

                        // Edit button
                        $("#edit").on("click", function () {
                          $("#employeeModal").modal("hide");

                          $("#editHeading").empty();
                          $("#editHeading").append("Edit employee");

                          $("#txtEditFirstName").html(
                            result.data[index].firstName
                          );
                          $("#txtEditLastName").html(
                            result.data[index].lastName
                          );

                          $.ajax({
                            //2
                            type: "POST",
                            url: "libs/php/getAllDepartments.php",
                            dataType: "json",

                            success: function (result) {
                              $(".deptSelectList").html("");

                              $.each(result.data, function (index) {
                                $(".deptSelectList").append(
                                  $("<option>", {
                                    value: result.data[index].locationID,
                                    text: result.data[index].name,
                                  })
                                );
                              });
                            },
                          });

                          $.ajax({
                            //2
                            type: "POST",
                            url: "libs/php/getAllLocations.php",
                            dataType: "json",

                            success: function (result) {
                              $(".locSelectList").html("");

                              $.each(result.data, function (index) {
                                $(".locSelectList").append(
                                  $("<option>", {
                                    value: result.data[index].id,
                                    text: result.data[index].name,
                                  })
                                );
                              });
                            },
                          });

                          $(".deptSelectList").change(function () {
                            $(
                              ".locSelectList option[value=" +
                                $(this).val() +
                                "]"
                            ).prop("selected", "selected");
                          });

                          $(".locSelectList").change(function () {
                            $(
                              ".deptSelectList option[value=" +
                                $(this).val() +
                                "]"
                            ).prop("selected", "selected");
                          });

                          setTimeout(function () {
                            $("#editEmployeeModal").modal("show");
                          }, 1000);
                        });
                        $("#editCancel").on("click", function () {
                          location.reload();
                          $("#editModal").modal("hide");
                        });

                        $("#editForm").submit(function (event) {
                          event.preventDefault();

                          $("#editEmployeeModal").modal("hide");

                          setTimeout(function () {
                            $("#editConfirmModal").modal("show");
                          }, 1000);

                          $("#editConfirmForm").submit(function (event) {
                            event.preventDefault();

                            $("#editConfirmModal").modal("hide");

                            let jobTitle = $("#editJobTitle").val();

                            if (jobTitle !== "") {
                              jobTitle =
                                jobTitle[0].toUpperCase() +
                                jobTitle.substring(1, jobTitle.length);
                            }

                            $.ajax({
                              url: "libs/php/editEmployee.php",
                              method: "post",
                              dataType: "text",
                              data: {
                                firstName: $("#txtEditFirstName").html(),
                                lastName: $("#txtEditLastName").html(),
                                jobTitle: jobTitle,
                                email: $("#editEmail").val(),
                                dept: $("#editDept").val(),
                              },
                              success: function (result) {
                                $("#editMessage").html("");
                                $("#editMessage").append(result);

                                setTimeout(function () {
                                  $("#editSuccessModal").modal("show");
                                }, 1000);

                                setTimeout(function () {
                                  location.reload();
                                }, 3000);
                              },
                            });

                            $("#editCancel").on("click", function () {
                              location.reload();
                              $("#editModal").modal("hide");
                            });
                          });
                          $("#editConfirmCancel").on("click", function () {
                            location.reload();
                            $("#editConfirmModal").modal("hide");
                          });
                        });
                      });
                    } //6
                    // Delete button
                    $("#delete").on("click", function () {
                      $("#employeeModal").modal("hide");

                      setTimeout(function () {
                        $("#deleteButtonConfirmModal").modal("show");
                      }, 1000);
                    });

                    $("#deleteButtonConfirmForm").submit(function (event) {
                      event.preventDefault();

                      $("#deleteButtonConfirmModal").modal("hide");

                      $.ajax({
                        //2
                        type: "POST",
                        url: "libs/php/deleteEmployee.php",
                        dataType: "text",
                        data: {
                          lastName: result.data[index].lastName,
                        },

                        success: function (result) {
                          //3

                          $("#deleteButtonConfirmMessage").html("");
                          $("#deleteButtonConfirmMessage").append(result);
                          //console.log(result);

                          setTimeout(function () {
                            $("#deleteButtonSuccessModal").modal("show");
                          }, 1000);

                          setTimeout(function () {
                            location.reload();
                          }, 3000);
                        },
                      });
                    });
                    $("#deleteButtonConfirmCancel").on("click", function () {
                      location.reload();
                      $("#deleteButtonConfirmModal").modal("hide");
                    });
                  }); //5

                  $("#verticalAlphabet").show();
                }); //4
              }, //3
            }); //2
          }
        });
      },
    });
  });

  // Department modal
  $("#department").on("click", function () {
    departmentArray = [];

    $.ajax({
      //2
      type: "POST",
      url: "libs/php/getAllDepartments.php",
      dataType: "json",

      success: function (result) {
        $.each(result.data, function (index) {
          departmentArray.push(result.data[index].name);
        });
      },
    });

    $.ajax({
      url: "libs/php/getAllByDeptName.php",
      dataType: "json",
      data: {},
      success: function (result) {
        //console.log(result);

        $("#deptMenu").html("");
        $("#deptData").html("");

        $.each(departmentArray, function (departmentIndex) {
          //4
          let deptNameMarkup =
            '<div class="row">' +
            '<div class="col-sm-1"></div>' +
            `<div class="col-sm-3" id="dept${departmentIndex}">${departmentArray[departmentIndex]}</div>` +
            "</div>";

          $("#deptMenu").append(
            `<a href="#dept${departmentIndex}" class="vertical"><div class="col-sm-4">${departmentArray[departmentIndex]}</div></a>`
          );

          let deptName = $("#deptData").append(deptNameMarkup);

          $.each(result.data, function (index) {
            //5

            if (
              result.data[index].department === departmentArray[departmentIndex]
            ) {
              //6
              let deptEmployeeMarkup =
                '<div class="row">' +
                '<div class="col-sm-4"></div>' +
                '<div class="col-sm-2">' +
                `<div id="deptSquare${index}" class="square"></div>` +
                "</div>" +
                '<div class="col-sm-5 namePosition">' +
                `<a id="nameLinkDept${index}" class="nameLink" href="#employeeHeading" data-bs-toggle="modal" data-bs-target="#employeeModal">${result.data[index].lastName}` +
                " " +
                `${result.data[index].firstName}</a>`;
              "</div>" + "</div>";

              deptName.append(deptEmployeeMarkup);

              let deptSquare = $(`#deptSquare${index}`);

              if (index % 4 === 0) {
                deptSquare.css("background-color", colourArray[0]);
              } else if (index % 4 === 1) {
                deptSquare.css("background-color", colourArray[1]);
              } else if (index % 4 === 2) {
                deptSquare.css("background-color", colourArray[2]);
              } else if (index % 4 === 3) {
                deptSquare.css("background-color", colourArray[3]);
              }

              setTimeout(function () {
                $("#deptModal").modal("show");
              }, 1000);

              $("#deptCancel").on("click", function () {
                location.reload();
                $("#deptModal").modal("hide");
              });

              //Employee modal for department dropdowm
              $(`#nameLinkDept${index}`).on("click", function () {
                $("#deptModal").modal("hide");

                $("#employeeHeading").empty();

                $("#employeeHeading").append($(`#nameLinkDept${index}`).text());

                $("#txtFirstName").html(result.data[index].firstName);
                $("#txtLastName").html(result.data[index].lastName);
                $("#txtJobTitle").html(result.data[index].jobTitle);
                $("#txtEmail").html(result.data[index].email);
                $("#txtDept").html(result.data[index].department);
                $("#txtLocation").html(result.data[index].location);

                setTimeout(function () {
                  $("#employeeModal").modal("show");
                }, 1000);

                //Edit employee modal

                // Edit button
                $("#edit").on("click", function () {
                  $("#employeeModal").modal("hide");
                  $("#editHeading").empty();
                  $("#editHeading").append("Edit employee");

                  $("#txtEditFirstName").html(result.data[index].firstName);
                  $("#txtEditLastName").html(result.data[index].lastName);

                  $.ajax({
                    //2
                    type: "POST",
                    url: "libs/php/getAllDepartments.php",
                    dataType: "json",

                    success: function (result) {
                      $(".deptSelectList").html("");

                      $.each(result.data, function (index) {
                        $(".deptSelectList").append(
                          $("<option>", {
                            value: result.data[index].locationID,
                            text: result.data[index].name,
                          })
                        );
                      });
                    },
                  });

                  $.ajax({
                    //2
                    type: "POST",
                    url: "libs/php/getAllLocations.php",
                    dataType: "json",

                    success: function (result) {
                      $(".locSelectList").html("");

                      $.each(result.data, function (index) {
                        $(".locSelectList").append(
                          $("<option>", {
                            value: result.data[index].id,
                            text: result.data[index].name,
                          })
                        );
                      });
                    },
                  });

                  $(".deptSelectList").change(function () {
                    $(
                      ".locSelectList option[value=" + $(this).val() + "]"
                    ).prop("selected", "selected");
                  });

                  $(".locSelectList").change(function () {
                    $(
                      ".deptSelectList option[value=" + $(this).val() + "]"
                    ).prop("selected", "selected");
                  });

                  setTimeout(function () {
                    $("#editEmployeeModal").modal("show");
                  }, 1000);
                });

                $("#editCancel").on("click", function () {
                  location.reload();
                  $("#editEmployeeModal").modal("hide");
                });

                $("#editForm").submit(function (event) {
                  event.preventDefault();

                  $("#editEmployeeModal").modal("hide");

                  setTimeout(function () {
                    $("#editConfirmModal").modal("show");
                  }, 1000);

                  $("#editConfirmForm").submit(function (event) {
                    event.preventDefault();

                    $("#editConfirmModal").modal("hide");

                    let jobTitle = $("#editJobTitle").val();

                    if (jobTitle !== "") {
                      jobTitle =
                        jobTitle[0].toUpperCase() +
                        jobTitle.substring(1, jobTitle.length);
                    }

                    $.ajax({
                      url: "libs/php/editEmployee.php",
                      method: "post",
                      dataType: "text",
                      data: {
                        firstName: $("#txtEditFirstName").html(),
                        lastName: $("#txtEditLastName").html(),
                        jobTitle: jobTitle,
                        email: $("#editEmail").val(),
                        dept: $("#editDept").val(),
                      },
                      success: function (result) {
                        $("#editMessage").html("");
                        $("#editMessage").append(result);

                        setTimeout(function () {
                          $("#editSuccessModal").modal("show");
                        }, 1000);

                        setTimeout(function () {
                          location.reload();
                        }, 3000);
                      },
                    });

                    $("#editCancel").on("click", function () {
                      location.reload();
                      $("#editModal").modal("hide");
                    });
                  });
                  $("#editConfirmCancel").on("click", function () {
                    location.reload();
                    $("#editConfirmModal").modal("hide");
                  });
                });

                // Delete button
                $("#delete").on("click", function () {
                  $("#employeeModal").modal("hide");

                  setTimeout(function () {
                    $("#deleteButtonConfirmModal").modal("show");
                  }, 1000);
                });

                $("#deleteButtonConfirmForm").submit(function (event) {
                  event.preventDefault();

                  $("#deleteButtonConfirmModal").modal("hide");

                  $.ajax({
                    //2
                    type: "POST",
                    url: "libs/php/deleteEmployee.php",
                    dataType: "text",
                    data: {
                      lastName: result.data[index].lastName,
                    },

                    success: function (result) {
                      //3

                      $("#deleteButtonMessage").html("");
                      $("#deleteButtonMessage").append(result);
                      //console.log(result);

                      setTimeout(function () {
                        $("#deleteButtonSuccessModal").modal("show");
                      }, 1000);

                      setTimeout(function () {
                        location.reload();
                      }, 3000);
                    },
                  });
                });
                $("#deleteButtonConfirmCancel").on("click", function () {
                  location.reload();
                  $("#deleteButtonConfirmModal").modal("hide");
                });
              });
            }
          });
        });
      },
    });
  });

  // Add department modal
  $("#addDept").on("click", function () {
    $("#deptModal").modal("hide");

    $("#addDeptHeading").html("");
    $("#addDeptHeading").append("Add department");

    $.ajax({
      //2
      type: "POST",
      url: "libs/php/getAllLocations.php",
      dataType: "json",

      success: function (result) {
        $(".locSelectList").html("");

        $.each(result.data, function (index) {
          $(".locSelectList").append(
            $("<option>", {
              value: result.data[index].id,
              text: result.data[index].name,
            })
          );
        });
      },
    });

    setTimeout(function () {
      $("#addDeptModal").modal("show");
    }, 1000);
  });

  $("#addDeptForm").submit(function (event) {
    event.preventDefault();

    $("#addDeptModal").modal("hide");

    setTimeout(function () {
      $("#addDeptConfirmModal").modal("show");
    }, 1000);
  });

  $("#addDeptConfirmForm").submit(function (event) {
    event.preventDefault();

    $("#addDeptConfirmModal").modal("hide");

    let departmentName = $("#addDeptName").val();

    if (departmentName !== "") {
      departmentName =
        departmentName[0].toUpperCase() +
        departmentName.substring(1, departmentName.length);
    }

    $.ajax({
      url: "libs/php/addDepartment.php",
      method: "post",
      dataType: "text",
      data: {
        deptName: departmentName,
        addDeptLoc: $("#addDeptLoc").val(),
      },
      success: function (result) {
        $("#addDeptMessage").html("");
        $("#addDeptMessage").append(result);

        setTimeout(function () {
          $("#deptAddSuccessModal").modal("show");
        }, 1000);

        setTimeout(function () {
          location.reload();
        }, 3000);
      },
    });
  });

  $("#addDeptCancel").on("click", function () {
    location.reload();
    $("#addDeptModal").modal("hide");
  });

  $("#addDeptConfirmCancel").on("click", function () {
    location.reload();
    $("#addDeptConfirmModal").modal("hide");
  });

  // Delete department modal
  $("#deleteDept").on("click", function () {
    $("#deptAddSuccessModal").modal("hide");
    $("#deptModal").modal("hide");
    $("#deleteDeptHeading").html("");
    $("#deleteDeptHeading").append("Delete department");
    $.ajax({
      //2
      type: "POST",
      url: "libs/php/getAllDepartments.php",
      dataType: "json",

      success: function (result) {
        $(".deptSelectList").html("");

        $.each(result.data, function (index) {
          $(".deptSelectList").append(
            $("<option>", {
              value: result.data[index].locationID,
              text: result.data[index].name,
            })
          );
        });
      },
    });

    $.ajax({
      //2
      type: "POST",
      url: "libs/php/getAllLocations.php",
      dataType: "json",

      success: function (result) {
        $(".locSelectList").html("");

        $.each(result.data, function (index) {
          $(".locSelectList").append(
            $("<option>", {
              value: result.data[index].id,
              text: result.data[index].name,
            })
          );
        });
      },
    });

    $(".deptSelectList").change(function () {
      $(".locSelectList option[value=" + $(this).val() + "]").prop(
        "selected",
        "selected"
      );
    });

    $(".locSelectList").change(function () {
      $(".deptSelectList option[value=" + $(this).val() + "]").prop(
        "selected",
        "selected"
      );
    });

    setTimeout(function () {
      $("#deleteDeptModal").modal("show");
    }, 1000);
  });

  $("#deleteDeptForm").submit(function (event) {
    event.preventDefault();

    $("#deleteDeptModal").modal("hide");

    setTimeout(function () {
      $("#deleteDeptConfirmModal").modal("show");
    }, 1000);
  });

  $("#deleteDeptConfirmForm").submit(function (event) {
    event.preventDefault();

    $("#deleteDeptConfirmModal").modal("hide");

    $.ajax({
      url: "libs/php/deleteDepartmentByID.php",
      method: "post",
      dataType: "text",
      data: {
        deleteDept: $("#deleteSelectDept").val(),
      },
      success: function (result) {
        $("#deleteDeptMessage").html("");
        $("#deleteDeptMessage").append(result);
        //console.log(result);

        setTimeout(function () {
          $("#deptDeleteSuccessModal").modal("show");
        }, 1000);

        setTimeout(function () {
          location.reload();
        }, 3000);
      },
    });
  });

  $("#deleteDeptCancel").on("click", function () {
    location.reload();
    $("#deleteDeptModal").modal("hide");
  });

  $("#deleteDeptConfirmCancel").on("click", function () {
    location.reload();
    $("#deleteDeptConfirmModal").modal("hide");
  });

  $("#deptDeleteSuccessModal").modal("hide");

  // Location modal
  $("#location").on("click", function () {
    //1

    let locationArray = [];

    $.ajax({
      type: "POST",
      url: "libs/php/getAllLocations.php",
      dataType: "json",

      success: function (result) {
        $.each(result.data, function (index) {
          locationArray.push(result.data[index].name);
        });
      },
    });

    $.ajax({
      //2
      url: "libs/php/getAllByLocName.php",
      dataType: "json",
      data: {},
      success: function (result) {
        //3
        //console.log(result);

        $("#locationMenu").html("");
        $("#locationData").html("");

        $.each(locationArray, function (locationIndex) {
          //4
          let locNameMarkup =
            '<div class="row">' +
            '<div class="col-sm-1"></div>' +
            `<div class="col-sm-3" id="location${locationIndex}">${locationArray[locationIndex]}</div>` +
            "</div>";

          $("#locationMenu").append(
            `<a href="#location${locationIndex}" class="vertical"><div class="col-sm-4">${locationArray[locationIndex]}</div></a>`
          );

          let locName = $("#locationData").append(locNameMarkup);

          $.each(result.data, function (index) {
            //5

            if (result.data[index].location === locationArray[locationIndex]) {
              //6

              let locEmployeeMarkup =
                '<div class="row">' +
                '<div class="col-sm-4"></div>' +
                '<div class="col-sm-2">' +
                `<div id="locSquare${index}" class="square"></div>` +
                "</div>" +
                '<div class="col-sm-5 namePosition">' +
                `<a id="nameLinkLoc${index}" class="nameLink" href="#employeeHeading" data-bs-toggle="modal" data-bs-target="#employeeModal">${result.data[index].lastName}` +
                " " +
                `${result.data[index].firstName}</a>`;
              "</div>" + "</div>";

              locName.append(locEmployeeMarkup);

              locSquare = $(`#locSquare${index}`);

              if (index % 4 === 0) {
                locSquare.css("background-color", colourArray[0]);
              } else if (index % 4 === 1) {
                locSquare.css("background-color", colourArray[1]);
              } else if (index % 4 === 2) {
                locSquare.css("background-color", colourArray[2]);
              } else if (index % 4 === 3) {
                locSquare.css("background-color", colourArray[3]);
              }

              setTimeout(function () {
                $("#locationModal").modal("show");
              }, 1000);

              $("#locCancel").on("click", function () {
                location.reload();
                $("#locationModal").modal("hide");
              });

              // //Employee modal for location dropdowm
              $(`#nameLinkLoc${index}`).on("click", function () {
                $("#locationModal").modal("hide");

                $("#employeeHeading").empty();

                $("#employeeHeading").append($(`#nameLinkLoc${index}`).text());

                $("#txtFirstName").html(result.data[index].firstName);
                $("#txtLastName").html(result.data[index].lastName);
                $("#txtJobTitle").html(result.data[index].jobTitle);
                $("#txtEmail").html(result.data[index].email);
                $("#txtDept").html(result.data[index].department);
                $("#txtLocation").html(result.data[index].location);

                setTimeout(function () {
                  $("#employeeModal").modal("show");
                }, 1000);

                //Edit employee modal

                // Edit button
                $("#edit").on("click", function () {
                  $("#employeeModal").modal("hide");
                  $("#editHeading").empty();
                  $("#editHeading").append("Edit employee");

                  $("#txtEditFirstName").html(result.data[index].firstName);
                  $("#txtEditLastName").html(result.data[index].lastName);

                  $.ajax({
                    //2
                    type: "POST",
                    url: "libs/php/getAllDepartments.php",
                    dataType: "json",

                    success: function (result) {
                      $(".deptSelectList").html("");

                      $.each(result.data, function (index) {
                        $(".deptSelectList").append(
                          $("<option>", {
                            value: result.data[index].locationID,
                            text: result.data[index].name,
                          })
                        );
                      });
                    },
                  });

                  $.ajax({
                    //2
                    type: "POST",
                    url: "libs/php/getAllLocations.php",
                    dataType: "json",

                    success: function (result) {
                      $(".locSelectList").html("");

                      $.each(result.data, function (index) {
                        $(".locSelectList").append(
                          $("<option>", {
                            value: result.data[index].id,
                            text: result.data[index].name,
                          })
                        );
                      });
                    },
                  });

                  $(".deptSelectList").change(function () {
                    $(
                      ".locSelectList option[value=" + $(this).val() + "]"
                    ).prop("selected", "selected");
                  });

                  $(".locSelectList").change(function () {
                    $(
                      ".deptSelectList option[value=" + $(this).val() + "]"
                    ).prop("selected", "selected");
                  });

                  setTimeout(function () {
                    $("#editEmployeeModal").modal("show");
                  }, 1000);
                });

                $("#editCancel").on("click", function () {
                  location.reload();
                  $("#editEmployeeModal").modal("hide");
                });

                $("#editForm").submit(function (event) {
                  event.preventDefault();

                  $("#editEmployeeModal").modal("hide");

                  setTimeout(function () {
                    $("#editConfirmModal").modal("show");
                  }, 1000);

                  $("#editConfirmForm").submit(function (event) {
                    event.preventDefault();

                    $("#editConfirmModal").modal("hide");

                    let jobTitle = $("#editJobTitle").val();

                    if (jobTitle !== "") {
                      jobTitle =
                        jobTitle[0].toUpperCase() +
                        jobTitle.substring(1, jobTitle.length);
                    }

                    $.ajax({
                      url: "libs/php/editEmployee.php",
                      method: "post",
                      dataType: "text",
                      data: {
                        firstName: $("#txtEditFirstName").html(),
                        lastName: $("#txtEditLastName").html(),
                        jobTitle: jobTitle,
                        email: $("#editEmail").val(),
                        dept: $("#editDept").val(),
                      },
                      success: function (result) {
                        $("#editMessage").html("");
                        $("#editMessage").append(result);

                        setTimeout(function () {
                          $("#editSuccessModal").modal("show");
                        }, 1000);

                        setTimeout(function () {
                          location.reload();
                        }, 3000);
                      },
                    });

                    $("#editCancel").on("click", function () {
                      location.reload();
                      $("#editModal").modal("hide");
                    });
                  });
                  $("#editConfirmCancel").on("click", function () {
                    location.reload();
                    $("#editConfirmModal").modal("hide");
                  });
                });

                // Delete button
                $("#delete").on("click", function () {
                  $("#employeeModal").modal("hide");

                  setTimeout(function () {
                    $("#deleteButtonConfirmModal").modal("show");
                  }, 1000);
                });

                $("#deleteButtonConfirmForm").submit(function (event) {
                  event.preventDefault();

                  $("#deleteButtonConfirmModal").modal("hide");

                  $.ajax({
                    //2
                    type: "POST",
                    url: "libs/php/deleteEmployee.php",
                    dataType: "text",
                    data: {
                      lastName: result.data[index].lastName,
                    },

                    success: function (result) {
                      //3

                      $("#deleteButtonMessage").html("");
                      $("#deleteButtonMessage").append(result);
                      //console.log(result);

                      setTimeout(function () {
                        $("#deleteButtonSuccessModal").modal("show");
                      }, 1000);

                      setTimeout(function () {
                        location.reload();
                      }, 3000);
                    },
                  });
                });
                $("#deleteButtonConfirmCancel").on("click", function () {
                  location.reload();
                  $("#deleteButtonConfirmModal").modal("hide");
                });
              });
            } //6
          }); //5
        }); //4
      }, //3
    }); //2
  }); //1

  // Add location modal
  $("#addLoc").on("click", function () {
    $("#locationModal").modal("hide");

    $("#addLocHeading").html("");
    $("#addLocHeading").append("Add location");

    setTimeout(function () {
      $("#addLocModal").modal("show");
    }, 1000);
  });

  $("#addLocForm").submit(function (event) {
    event.preventDefault();

    $("#addLocModal").modal("hide");

    setTimeout(function () {
      $("#addLocConfirmModal").modal("show");
    }, 1000);
  });

  $("#addLocConfirmForm").submit(function (event) {
    event.preventDefault();

    $("#addLocConfirmModal").modal("hide");

    let locationName = $("#addLocName").val();

    if (locationName !== "") {
      locationName =
        locationName[0].toUpperCase() +
        locationName.substring(1, locationName.length);
    }

    $.ajax({
      url: "libs/php/addLocation.php",
      method: "post",
      dataType: "text",
      data: {
        locName: locationName,
      },
      success: function (result) {
        $("#addLocMessage").html("");
        $("#addLocMessage").append(result);

        setTimeout(function () {
          $("#locAddSuccessModal").modal("show");
        }, 1000);

        setTimeout(function () {
          location.reload();
        }, 3000);
      },
    });
  });

  $("#addLocCancel").on("click", function () {
    location.reload();
    $("#addLocModal").modal("hide");
  });

  $("#addLocConfirmCancel").on("click", function () {
    location.reload();
    $("#addLocConfirmModal").modal("hide");
  });

  // Delete location modal
  $("#deleteLoc").on("click", function () {
    $("#locAddSuccessModal").modal("hide");
    $("#locationModal").modal("hide");
    $("#deleteLocHeading").html("");
    $("#deleteLocHeading").append("Delete location");

    $.ajax({
      //2
      type: "POST",
      url: "libs/php/getAllLocations.php",
      dataType: "json",

      success: function (result) {
        $(".locSelectList").html("");

        $.each(result.data, function (index) {
          $(".locSelectList").append(
            $("<option>", {
              value: result.data[index].id,
              text: result.data[index].name,
            })
          );
        });
      },
    });

    setTimeout(function () {
      $("#deleteLocModal").modal("show");
    }, 1000);
  });

  $("#deleteLocForm").submit(function (event) {
    event.preventDefault();

    $("#deleteLocModal").modal("hide");

    setTimeout(function () {
      $("#deleteLocConfirmModal").modal("show");
    }, 1000);
  });

  $("#deleteLocConfirmForm").submit(function (event) {
    event.preventDefault();

    $("#deleteLocConfirmModal").modal("hide");

    $.ajax({
      url: "libs/php/deleteLocationByID.php",
      method: "post",
      dataType: "text",
      data: {
        deleteLoc: $("#deleteSelectLoc").val(),
      },
      success: function (result) {
        $("#deleteLocMessage").html("");
        $("#deleteLocMessage").append(result);
        //console.log(result);

        setTimeout(function () {
          $("#locDeleteSuccessModal").modal("show");
        }, 1000);

        setTimeout(function () {
          location.reload();
        }, 3000);
      },
    });
  });

  $("#deleteLocCancel").on("click", function () {
    location.reload();
    $("#deleteLocModal").modal("hide");
  });

  $("#deleteLocConfirmCancel").on("click", function () {
    location.reload();
    $("#deleteLocConfirmModal").modal("hide");
  });

  $("#locDeleteSuccessModal").modal("hide");

  //Search modal

  $("#search").on("click", function () {
    $(this).closest("form").find("input[type=text]").val("");

    $("#searchHeading").empty();
    $("#searchHeading").append("Search");

    $.ajax({
      //2
      type: "POST",
      url: "libs/php/getAllDepartments.php",
      dataType: "json",

      success: function (result) {
        $(".deptSelectList").html("");

        $(".deptSelectList").append(
          '<option selected disabled>' + "Select department" + "</option>"
        );

        $.each(result.data, function (index) {
          $(".deptSelectList").append(
            $("<option>", {
              value: result.data[index].name,
              text: result.data[index].name,
            })
          );
        });
      },
    });

    $.ajax({
      //2
      type: "POST",
      url: "libs/php/getAllLocations.php",
      dataType: "json",

      success: function (result) {
        $(".locSelectList").html("");

        $(".locSelectList").append(
          '<option selected disabled value="">' + "Select location" + "</option>"
        );

        $.each(result.data, function (index) {
          $(".locSelectList").append(
            $("<option>", {
              value: result.data[index].name,
              text: result.data[index].name,
            })
          );
        });
      },
    });

    setTimeout(function () {
      $("#searchModal").modal("show");
    }, 1000);
  });

  $("#searchCancel").on("click", function () {
    location.reload();
    $("#searchModal").modal("hide");
  });

  $("#searchForm").submit(function (event) {
    event.preventDefault();

    $("#searchModal").modal("hide");

    if (
      $("#searchFirstName").val() === "" &&
      $("#searchLastName").val() === "" &&
      $("#searchJobTitle").val() === "" &&
      $("#searchEmail").val() === ""
    ) {
      $("#searchErrorMessage").html("");
      $("#searchErrorMessage").append("Please also type in another field.");
      setTimeout(function () {
        $("#searchErrorModal").modal("show");
      }, 1000);
    } else {
      setTimeout(function () {
        $("#searchConfirmModal").modal("show");
      }, 1000);
    }
  });

  $("#searchConfirmCancel").on("click", function () {
    location.reload();
    $("#searchConfirmModal").modal("hide");
  });

  $("#searchConfirmForm").submit(function (event) {
    $(this).closest('form').find("input[type=text]").val("");
    event.preventDefault();

    $("#searchConfirmModal").modal("hide");

    // let searchFirstName = $("#searchFirstName").val();

    // if (searchFirstName !== "") {
    //   searchFirstName =
    //     searchFirstName[0].toUpperCase() +
    //     searchFirstName.substring(1, searchFirstName.length);
    // }

    // let searchLastName = $("#searchLastName").val();

    // if (searchLastName !== "") {
    //   searchLastName =
    //     searchLastName[0].toUpperCase() +
    //     searchLastName.substring(1, searchLastName.length);
    // }

    // let searchJobTitle = $("#searchJobTitle").val();

    // if (searchJobTitle !== "") {
    //   searchJobTitle =
    //     searchJobTitle[0].toUpperCase() +
    //     searchJobTitle.substring(1, searchJobTitle.length);
    // }

    $.ajax({
      type: "POST",
      url: "libs/php/searchButton.php",
      dataType: "json",

      data: {
        firstName: $("#searchFirstName").val(),
        lastName: $("#searchLastName").val(),
        jobTitle: $("#searchJobTitle").val(),
        email: $("#searchEmail").val(),
        department: $("#searchDept").val(),
        location: $("#searchLoc").val(),
      },

      success: function (result) {
       
        console.log(result);

        $("#searchModal").modal("hide");
        $("#searchResultsData").html("");
        $("#searchResultsHeading").html("");

        // Search results modal

        if (result.data.length > 0) {
          $("#searchResultsHeading").append("Search results");

          let searchResultsMarkup;

          $.each(result.data, function (index) {
            searchResultsMarkup =
              '<div class="row">' +
              '<div class="col-sm-3"></div>' +
              '<div class="col-sm-2">' +
              `<div id="searchSquare${index}" class="square"></div>` +
              "</div>" +
              '<div class="col-sm-4 namePosition">' +
              `<a id="searchNameLink${index}" class="nameLink" href="#employeeHeading" data-bs-toggle="modal" data-bs-target="#employeeModal">${result.data[index].lastName}` +
              " " +
              `${result.data[index].firstName}</a>`;
            "</div>" + "</div>";

            $("#searchResultsData").append(searchResultsMarkup);

            square = $(`#searchSquare${index}`);

            if (index % 4 === 0) {
              square.css("background-color", colourArray[0]);
            } else if (index % 4 === 1) {
              square.css("background-color", colourArray[1]);
            } else if (index % 4 === 2) {
              square.css("background-color", colourArray[2]);
            } else if (index % 4 === 3) {
              square.css("background-color", colourArray[3]);
            }

            setTimeout(function () {
              $("#searchResultsModal").modal("show");
            }, 1000);

            //Employee modal
            $(`#searchNameLink${index}`).on("click", function () {
              $("#searchResultsModal").modal("hide");

              $("#employeeHeading").empty();

              $("#employeeHeading").append($(`#searchNameLink${index}`).text());

              $("#txtFirstName").html(result.data[index].firstName);
              $("#txtLastName").html(result.data[index].lastName);
              $("#txtJobTitle").html(result.data[index].jobTitle);
              $("#txtEmail").html(result.data[index].email);
              $("#txtDept").html(result.data[index].department);
              $("#txtLocation").html(result.data[index].location);

              setTimeout(function () {
                $("#employeeModal").modal("show");
              }, 1000);

              //Edit employee modal

              // Edit button
              $("#edit").on("click", function () {
                $("#employeeModal").modal("hide");
                $("#editHeading").empty();
                $("#editHeading").append("Edit employee");

                $("#txtEditFirstName").html(result.data[0].firstName);
                $("#txtEditLastName").html(result.data[0].lastName);

                $.ajax({
                  //2
                  type: "POST",
                  url: "libs/php/getAllDepartments.php",
                  dataType: "json",

                  success: function (result) {
                    $(".deptSelectList").html("");

                    $.each(result.data, function (index) {
                      $(".deptSelectList").append(
                        $("<option>", {
                          value: result.data[index].locationID,
                          text: result.data[index].name,
                        })
                      );
                    });
                  },
                });

                $.ajax({
                  //2
                  type: "POST",
                  url: "libs/php/getAllLocations.php",
                  dataType: "json",

                  success: function (result) {
                    $(".locSelectList").html("");

                    $.each(result.data, function (index) {
                      $(".locSelectList").append(
                        $("<option>", {
                          value: result.data[index].id,
                          text: result.data[index].name,
                        })
                      );
                    });
                  },
                });

                $(".deptSelectList").change(function () {
                  $(".locSelectList option[value=" + $(this).val() + "]").prop(
                    "selected",
                    "selected"
                  );
                });

                $(".locSelectList").change(function () {
                  $(".deptSelectList option[value=" + $(this).val() + "]").prop(
                    "selected",
                    "selected"
                  );
                });

                setTimeout(function () {
                  $("#editEmployeeModal").modal("show");
                }, 1000);
              });

              $("#editCancel").on("click", function () {
                location.reload();
                $("#editEmployeeModal").modal("hide");
              });

              $("#editForm").submit(function (event) {
                event.preventDefault();

                $("#editEmployeeModal").modal("hide");

                setTimeout(function () {
                  $("#editConfirmModal").modal("show");
                }, 1000);

                $("#editConfirmForm").submit(function (event) {
                  event.preventDefault();

                  $("#editConfirmModal").modal("hide");

                  let jobTitle = $("#editJobTitle").val();

                  if (jobTitle !== "") {
                    jobTitle =
                      jobTitle[0].toUpperCase() +
                      jobTitle.substring(1, jobTitle.length);
                  }

                  $.ajax({
                    url: "libs/php/editEmployee.php",
                    method: "post",
                    dataType: "text",
                    data: {
                      firstName: $("#txtEditFirstName").html(),
                      lastName: $("#txtEditLastName").html(),
                      jobTitle: jobTitle,
                      email: $("#editEmail").val(),
                      dept: $("#editDept").val(),
                    },
                    success: function (result) {
                      $("#editMessage").html("");
                      $("#editMessage").append(result);

                      setTimeout(function () {
                        $("#editSuccessModal").modal("show");
                      }, 1000);

                      setTimeout(function () {
                        location.reload();
                      }, 3000);
                    },
                  });
                });

                $("#editConfirmCancel").on("click", function () {
                  location.reload();
                  $("#editConfirmModal").modal("hide");
                });
              });
            });

            // Delete button
            $("#delete").on("click", function () {
              $("#employeeModal").modal("hide");

              setTimeout(function () {
                $("#deleteButtonConfirmModal").modal("show");
              }, 1000);
            });

            $("#deleteButtonConfirmForm").submit(function (event) {
              event.preventDefault();

              $("#deleteButtonConfirmModal").modal("hide");

              $.ajax({
                //2
                type: "POST",
                url: "libs/php/deleteEmployee.php",
                dataType: "text",
                data: {
                  lastName: result.data[index].lastName,
                },

                success: function (result) {
                  //3

                  $("#deleteButtonMessage").html("");
                  $("#deleteButtonMessage").append(result);
                  //console.log(result);

                  setTimeout(function () {
                    $("#deleteButtonSuccessModal").modal("show");
                  }, 1000);

                  setTimeout(function () {
                    location.reload();
                  }, 3000);
                },
              });
            });
            $("#deleteButtonConfirmCancel").on("click", function () {
              location.reload();
              $("#deleteButtonConfirmModal").modal("hide");
            });
          });
        } else {
          $("#searchResultsHeading").append("No matches");

          setTimeout(function () {
            $("#searchResultsModal").modal("show");
          }, 1000);
        }
      },
    });
  });
}); //1
