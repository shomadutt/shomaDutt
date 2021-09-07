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
  

   // Automatically click the personnel tab on page load
   jQuery(function () {
    jQuery("#personnel-tab").click();
  });

 // Delete employee event handler
 $("#deleteEmployee").on("click", function () {
  $("#editEmployeeModal").modal("hide");

  setTimeout(function () {
    $("#deleteEmployeeConfirmModal").modal("show");
  }, 1000);
});

// Delete department even handler
$("#deleteDepartment").on("click", function () {
  $("#editDepartmentModal").modal("hide");

  setTimeout(function () {
    $("#deleteDepartmentConfirmModal").modal("show");
  }, 1000);
});

// Delete location event handler
$("#deleteLocation").on("click", function () {
  $("#editLocationModal").modal("hide");

  setTimeout(function () {
    $("#deleteLocationConfirmModal").modal("show");
  }, 1000);
});


 // Letters array
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

  // Populate the directory with employees

  $("#personnel-tab").on("click", function () {
    // Search bar for personnel
    $("#searchBar").keyup(function () {
      let query = $(this).val();

      $.ajax({
        url: "libs/php/searchBarEmployee.php",
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
                '<div class="row" >' +
                '<div class="col-sm-4"></div>' +
                '<div class="col-sm-1">' +
                `<div id="square" class="square"></div>` +
                "</div>" +
                '<div class="col-sm-3 namePosition">' +
                `<a id="searchLinkEmployee${index}" class="nameLink hoverOver" data-bs-toggle="modal" data-bs-target="#editEmployeeModal">${result.data[index].firstName}` +
                " " +
                `${result.data[index].lastName}</a>` +
                "</div>" +
                '<div class="col-sm-2 namePosition">' +
                `${result.data[index].jobTitle}` +
                "</div>" +
                '<div class="col-sm-2 namePosition">' +
                `${result.data[index].email}` +
                "</div>" +
                "</div>";

              $("#directoryData").append(searchEmployeeMarkup);

              //Edit employee modal for search bar
              $(`#searchLinkEmployee${index}`).on("click", function () {
                $("#editFirstName").val(result.data[index].firstName);
                $("#editLastName").html(result.data[index].lastName);
                $("#editJobTitle").val(result.data[index].jobTitle);
                $("#editEmail").val(result.data[index].email);

                // Get department id
                let deptID;
                let locID;

                $.ajax({
                  //2
                  type: "POST",
                  url: "libs/php/getDepartmentID.php",
                  dataType: "json",
                  data: {
                    employeeDept: result.data[index].department,
                  },

                  success: function (resultDeptID) {
                    //console.log(resultDeptID);

                    deptID = resultDeptID.data[index].id;

                    // Display the employee's department in the department dropdown
                    $.ajax({
                      //2
                      type: "POST",
                      url: "libs/php/getAllDepartments.php",
                      dataType: "json",

                      success: function (resultDept) {
                        $(".deptEditSelectList").html("");

                        $.each(resultDept.data, function (index) {
                          $("#editEmployeeDept").val(deptID);

                          $(".deptEditSelectList").append(
                            $("<option>", {
                              value: resultDept.data[index].id,
                              text: resultDept.data[index].name,
                            })
                          );
                        });
                      },
                      error: function (jqXHR, textStatus, errorThrown) {
                        console.log("status code: " + jqXHR.status);
                        console.log("errorThrown: " + errorThrown);
                        console.log(
                          "jqXHR.responseText: " + jqXHR.responseText
                        );
                      },
                    });

                    $(".deptEditSelectList").on("change", function () {
                      let departID = $(this).val();
                      if (departID) {
                        // Find the location id from the department id
                        $.ajax({
                          //2
                          type: "POST",
                          url: "libs/php/getLocationID.php",
                          dataType: "json",
                          data: {
                            employeeDeptID: departID,
                          },

                          success: function (resultLocID) {
                            locID = resultLocID.data[index].locationID;

                            // Use location id to set location dropdown
                            $.ajax({
                              //2
                              type: "POST",
                              url: "libs/php/getAllLocations.php",
                              dataType: "json",

                              success: function (resultLoc) {
                                $(".locEditSelectList").html("");

                                $.each(resultLoc.data, function (index) {
                                  $("#editEmployeeLoc").val(locID);

                                  $(".locEditSelectList").append(
                                    $("<option>", {
                                      value: resultLoc.data[index].id,
                                      text: resultLoc.data[index].name,
                                    })
                                  );
                                });
                              },
                              error: function (jqXHR, textStatus, errorThrown) {
                                console.log("status code: " + jqXHR.status);
                                console.log("errorThrown: " + errorThrown);
                                console.log(
                                  "jqXHR.responseText: " + jqXHR.responseText
                                );
                              },
                            });
                          },
                          error: function (jqXHR, textStatus, errorThrown) {
                            console.log("status code: " + jqXHR.status);
                            console.log("errorThrown: " + errorThrown);
                            console.log(
                              "jqXHR.responseText: " + jqXHR.responseText
                            );
                          },
                        });
                      }
                    });
                  },
                  error: function (jqXHR, textStatus, errorThrown) {
                    console.log("status code: " + jqXHR.status);
                    console.log("errorThrown: " + errorThrown);
                    console.log("jqXHR.responseText: " + jqXHR.responseText);
                  },
                });

                setTimeout(function () {
                  $("#editEmployeeModal").modal("show");
                }, 1000);

                $("#editEmployeeForm").submit(function (event) {
                  event.preventDefault();

                  $("#editEmployeeModal").modal("hide");

                  setTimeout(function () {
                    $("#editEmployeeConfirmModal").modal("show");
                  }, 1000);
                });

                $("#editEmployeeConfirmForm").submit(function (event) {
                  event.preventDefault();

                  $("#editEmployeeConfirmModal").modal("hide");

                  let firstName = $("#editFirstName").val();

                  if (firstName !== "") {
                    firstName =
                      firstName[0].toUpperCase() +
                      firstName.substring(1, firstName.length);
                  }

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
                      id: result.data[index].id,
                      firstName: firstName,
                      lastName: $("#editLastName").html(),
                      jobTitle: jobTitle,
                      email: $("#editEmail").val(),
                      dept: $("#editEmployeeDept").val(),
                    },

                    success: function (resultEmp) {
                      //console.log(result);
                      $("#editEmployeeSuccessMessage").html("");
                      $("#editEmployeeSuccessMessage").append(resultEmp);

                      setTimeout(function () {
                        $("#editEmployeeSuccessModal").modal("show");
                      }, 1000);

                      // To stop form resubmission
                      if (window.history.replaceState) {
                        window.history.replaceState(
                          null,
                          null,
                          window.location.href
                        );
                      }

                      setTimeout(function () {
                        location.reload();
                      }, 3000);
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                      console.log("status code: " + jqXHR.status);
                      console.log("errorThrown: " + errorThrown);
                      console.log("jqXHR.responseText: " + jqXHR.responseText);
                    },
                  });
                });

               // Delete employee

                $("#deleteEmployeeConfirmForm").submit(function (event) {
                  event.preventDefault();

                  $("#deleteEmployeeConfirmModal").modal("hide");

                  $.ajax({
                    //2
                    type: "POST",
                    url: "libs/php/deleteEmployee.php",
                    dataType: "text",
                    data: {
                      id: result.data[index].id,
                    },

                    success: function (resultDelete) {
                      //3

                      $("#deleteEmployeeSuccessMessage").html("");
                      $("#deleteEmployeeSuccessMessage").append(resultDelete);
                      //console.log(result);

                      setTimeout(function () {
                        $("#deleteEmployeeSuccessModal").modal("show");
                      }, 1000);

                      // To stop form resubmission
                      if (window.history.replaceState) {
                        window.history.replaceState(
                          null,
                          null,
                          window.location.href
                        );
                      }

                      setTimeout(function () {
                        location.reload();
                      }, 3000);
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                      console.log("status code: " + jqXHR.status);
                      console.log("errorThrown: " + errorThrown);
                      console.log("jqXHR.responseText: " + jqXHR.responseText);
                    },
                  });
                });
              });
            } else {
              window.localStorage.setItem("focus_on", "#searchBar");
              location.reload();
            }
          });
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log("status code: " + jqXHR.status);
          console.log("errorThrown: " + errorThrown);
          console.log("jqXHR.responseText: " + jqXHR.responseText);
        },
      });
    });

    $.ajax({
      type: "POST",
      url: "libs/php/getAll.php",
      dataType: "json",

      success: function (result) {
        //console.log(result);

        $("#directoryData").html("");

        $.each(alphabetArray, function (alphabetIndex) {
          // Make sure letters without employees are not shown
          if (
            result.data.find(
              (elem) =>
                elem.lastName[0].toUpperCase() === alphabetArray[alphabetIndex]
            )
          ) {
            let letterMarkup =
              '<div class="row">' +
              `<div class="col-sm-4 alignmentRight" id="letterIndex">${alphabetArray[alphabetIndex]}</div>` +
              "</div>";

            let letter = $("#directoryData").append(letterMarkup);

            $.each(result.data, function (index) {
              let lastNameUpper = result.data[index].lastName[0].toUpperCase();

              if (lastNameUpper === alphabetArray[alphabetIndex]) {
                employeeMarkup =
                  '<div class="row" >' +
                  '<div class="col-sm-4"></div>' +
                  '<div class="col-sm-1">' +
                  `<div id="square" class="square"></div>` +
                  "</div>" +
                  '<div class="col-sm-3 namePosition">' +
                  `<a id="nameLink${index}" class="nameLink hoverOver" data-bs-toggle="modal" data-bs-target="#editEmployeeModal">${result.data[index].firstName}` +
                  " " +
                  `${result.data[index].lastName}</a>` +
                  "</div>" +
                  '<div class="col-sm-2 namePosition">' +
                  `${result.data[index].jobTitle}` +
                  "</div>" +
                  '<div class="col-sm-2 namePosition">' +
                  `${result.data[index].email}` +
                  "</div>" +
                  "</div>";

                letter.append(employeeMarkup);

                //Edit employee modal
                $(`#nameLink${index}`).on("click", function () {
                  $("#editFirstName").val(result.data[index].firstName);
                  $("#editLastName").html(result.data[index].lastName);
                  $("#editJobTitle").val(result.data[index].jobTitle);
                  $("#editEmail").val(result.data[index].email);

                  // Get department id
                  let deptID;
                  let locID;

                  $.ajax({
                    //2
                    type: "POST",
                    url: "libs/php/getDepartmentID.php",
                    dataType: "json",
                    data: {
                      employeeDept: result.data[index].department,
                    },

                    success: function (resultDeptID) {
                      //console.log(resultDeptID);

                      deptID = resultDeptID.data[index].id;

                      // Display the employee's department in the department dropdown
                      $.ajax({
                        //2
                        type: "POST",
                        url: "libs/php/getAllDepartments.php",
                        dataType: "json",

                        success: function (resultDept) {
                          $(".deptEditSelectList").html("");

                          $.each(resultDept.data, function (index) {
                            $("#editEmployeeDept").val(deptID);

                            $(".deptEditSelectList").append(
                              $("<option>", {
                                value: resultDept.data[index].id,
                                text: resultDept.data[index].name,
                              })
                            );
                          });
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                          console.log("status code: " + jqXHR.status);
                          console.log("errorThrown: " + errorThrown);
                          console.log(
                            "jqXHR.responseText: " + jqXHR.responseText
                          );
                        },
                      });

                      $(".deptEditSelectList").on("change", function () {
                        let departID = $(this).val();
                        if (departID) {
                          // Find the location id from the department id
                          $.ajax({
                            //2
                            type: "POST",
                            url: "libs/php/getLocationID.php",
                            dataType: "json",
                            data: {
                              employeeDeptID: departID,
                            },

                            success: function (resultLocID) {
                              locID = resultLocID.data[index].locationID;

                              // Use location id to set location dropdown
                              $.ajax({
                                //2
                                type: "POST",
                                url: "libs/php/getAllLocations.php",
                                dataType: "json",

                                success: function (resultLoc) {
                                  $(".locEditSelectList").html("");

                                  $.each(resultLoc.data, function (index) {
                                    $("#editEmployeeLoc").val(locID);

                                    $(".locEditSelectList").append(
                                      $("<option>", {
                                        value: resultLoc.data[index].id,
                                        text: resultLoc.data[index].name,
                                      })
                                    );
                                  });
                                },
                                error: function (
                                  jqXHR,
                                  textStatus,
                                  errorThrown
                                ) {
                                  console.log("status code: " + jqXHR.status);
                                  console.log("errorThrown: " + errorThrown);
                                  console.log(
                                    "jqXHR.responseText: " + jqXHR.responseText
                                  );
                                },
                              });
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                              console.log("status code: " + jqXHR.status);
                              console.log("errorThrown: " + errorThrown);
                              console.log(
                                "jqXHR.responseText: " + jqXHR.responseText
                              );
                            },
                          });
                        }
                      });
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                      console.log("status code: " + jqXHR.status);
                      console.log("errorThrown: " + errorThrown);
                      console.log("jqXHR.responseText: " + jqXHR.responseText);
                    },
                  });

                  setTimeout(function () {
                    $("#editEmployeeModal").modal("show");
                  }, 1000);

                  $("#editEmployeeForm").submit(function (event) {
                    event.preventDefault();

                    $("#editEmployeeModal").modal("hide");

                    setTimeout(function () {
                      $("#editEmployeeConfirmModal").modal("show");
                    }, 1000);
                  });

                  $("#editEmployeeConfirmForm").submit(function (event) {
                    event.preventDefault();

                    $("#editEmployeeConfirmModal").modal("hide");

                    let firstName = $("#editFirstName").val();

                    if (firstName !== "") {
                      firstName =
                        firstName[0].toUpperCase() +
                        firstName.substring(1, firstName.length);
                    }

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
                        id: result.data[index].id,
                        firstName: firstName,
                        lastName: $("#editLastName").html(),
                        jobTitle: jobTitle,
                        email: $("#editEmail").val(),
                        dept: $("#editEmployeeDept").val(),
                      },

                      success: function (resultEmp) {
                        //console.log(result);
                        $("#editEmployeeSuccessMessage").html("");
                        $("#editEmployeeSuccessMessage").append(resultEmp);

                        setTimeout(function () {
                          $("#editEmployeeSuccessModal").modal("show");
                        }, 1000);

                        // To stop form resubmission
                        if (window.history.replaceState) {
                          window.history.replaceState(
                            null,
                            null,
                            window.location.href
                          );
                        }

                        setTimeout(function () {
                          location.reload();
                        }, 3000);
                      },
                      error: function (jqXHR, textStatus, errorThrown) {
                        console.log("status code: " + jqXHR.status);
                        console.log("errorThrown: " + errorThrown);
                        console.log(
                          "jqXHR.responseText: " + jqXHR.responseText
                        );
                      },
                    });
                  });

                  // Delete employee

                  $("#deleteEmployeeConfirmForm").submit(function (event) {
                    event.preventDefault();

                    $("#deleteEmployeeConfirmModal").modal("hide");

                    $.ajax({
                      //2
                      type: "POST",
                      url: "libs/php/deleteEmployee.php",
                      dataType: "text",
                      data: {
                        id: result.data[index].id,
                      },

                      success: function (resultDelete) {
                        //3

                        $("#deleteEmployeeSuccessMessage").html("");
                        $("#deleteEmployeeSuccessMessage").append(resultDelete);
                        //console.log(result);

                        setTimeout(function () {
                          $("#deleteEmployeeSuccessModal").modal("show");
                        }, 1000);

                        // To stop form resubmission
                        if (window.history.replaceState) {
                          window.history.replaceState(
                            null,
                            null,
                            window.location.href
                          );
                        }

                        setTimeout(function () {
                          location.reload();
                        }, 3000);
                      },
                      error: function (jqXHR, textStatus, errorThrown) {
                        console.log("status code: " + jqXHR.status);
                        console.log("errorThrown: " + errorThrown);
                        console.log(
                          "jqXHR.responseText: " + jqXHR.responseText
                        );
                      },
                    });
                  });
                });
              }
            });
          }
        });
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log("status code: " + jqXHR.status);
        console.log("errorThrown: " + errorThrown);
        console.log("jqXHR.responseText: " + jqXHR.responseText);
      },
    });
  });

  let plusMarkup = '<i class="fas fa-plus"></i>';
  $("#plus").append(plusMarkup);

  let deleteMarkup = '<i class="fas fa-trash-alt"></i>';
  $("#delete").append(deleteMarkup);

  let searchMarkup = '<i class="fas fa-search"></i>';
  $("#search").append(searchMarkup);

  //Populate the directory with departments
  $("#department-tab").on("click", function () {
    // Search bar for department
    $("#searchBar").keyup(function () {
      let query = $(this).val();

      $.ajax({
        url: "libs/php/searchBarDept.php",
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
              let searchDepartmentMarkup =
                '<div class="row" >' +
                '<div class="col-sm-6"></div>' +
                '<div class="col-sm-1">' +
                `<div id="deptSquare" class="square"></div>` +
                "</div>" +
                '<div class="col-sm-3 namePosition">' +
                `<a id="searchLinkDept${index}" class="nameLink hoverOver" data-bs-toggle="modal" data-bs-target="#editDepartmentModal">${result.data[index].name}` +
                "</div>" +
                "</div>";

              $("#directoryData").append(searchDepartmentMarkup);

              //Edit department modal for search bar
              $(`#searchLinkDept${index}`).on("click", function () {
                $.ajax({
                  //2
                  type: "POST",
                  url: "libs/php/getAllLocations.php",
                  dataType: "json",

                  success: function (result) {
                    $(".deptEditLocSelectList").html("");

                    $(".deptEditLocSelectList").append(
                      '<option selected disabled value="">' +
                        "Select location" +
                        "</option>"
                    );

                    $.each(result.data, function (index) {
                      $(".deptEditLocSelectList").append(
                        $("<option>", {
                          value: result.data[index].id,
                          text: result.data[index].name,
                        })
                      );
                    });
                  },
                  error: function (jqXHR, textStatus, errorThrown) {
                    console.log("status code: " + jqXHR.status);
                    console.log("errorThrown: " + errorThrown);
                    console.log("jqXHR.responseText: " + jqXHR.responseText);
                  },
                });

                $("#editDepartment").val(result.data[index].name);

                setTimeout(function () {
                  $("#editDepartmentModal").modal("show");
                }, 1000);

                $("#editDepartmentForm").submit(function (event) {
                  event.preventDefault();

                  $("#editDepartmentModal").modal("hide");

                  setTimeout(function () {
                    $("#editDepartmentConfirmModal").modal("show");
                  }, 1000);
                });

                $("#editDepartmentConfirmForm").submit(function (event) {
                  event.preventDefault();

                  $("#editDepartmentConfirmModal").modal("hide");

                  let departmentName = $("#editDepartment").val();

                  if (departmentName !== "") {
                    departmentName =
                      departmentName[0].toUpperCase() +
                      departmentName.substring(1, departmentName.length);
                  }

                  let locName = $("#editDeptLoc").val();

                  $.ajax({
                    url: "libs/php/editDepartment.php",
                    method: "post",
                    dataType: "text",
                    data: {
                      id: result.data[index].id,
                      dept: departmentName,
                      loc: locName,
                    },

                    success: function (result) {
                      console.log(result);
                      $("#editDepartmentSuccessMessage").html("");
                      $("#editDepartmentSuccessMessage").append(result);

                      setTimeout(function () {
                        $("#editEmployeeSuccessModal").modal("show");
                      }, 1000);

                      // To stop form resubmission
                      if (window.history.replaceState) {
                        window.history.replaceState(
                          null,
                          null,
                          window.location.href
                        );
                      }

                      setTimeout(function () {
                        location.reload();
                      }, 3000);
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                      console.log("status code: " + jqXHR.status);
                      console.log("errorThrown: " + errorThrown);
                      console.log("jqXHR.responseText: " + jqXHR.responseText);
                    },
                  });
                });

                // Delete department

                $("#deleteDepartmentConfirmForm").submit(function (event) {
                  event.preventDefault();

                  $("#deleteDepartmentConfirmModal").modal("hide");

                  $.ajax({
                    //2
                    type: "POST",
                    url: "libs/php/deleteDepartment.php",
                    dataType: "text",
                    data: {
                      deleteDept: result.data[index].id,
                    },

                    success: function (resultDeleteDept) {
                      //3

                      $("#deleteDepartmentSuccessMessage").html("");
                      $("#deleteDepartmentSuccessMessage").append(
                        resultDeleteDept
                      );
                      //console.log(result);

                      setTimeout(function () {
                        $("#deleteDepartmentSuccessModal").modal("show");
                      }, 1000);

                      // To stop form resubmission
                      if (window.history.replaceState) {
                        window.history.replaceState(
                          null,
                          null,
                          window.location.href
                        );
                      }

                      setTimeout(function () {
                        location.reload();
                      }, 3000);
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                      console.log("status code: " + jqXHR.status);
                      console.log("errorThrown: " + errorThrown);
                      console.log("jqXHR.responseText: " + jqXHR.responseText);
                    },
                  });
                });
              });
            } else {
              window.localStorage.setItem("focus_on", "#searchBar");
              location.reload();
            }
          });
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log("status code: " + jqXHR.status);
          console.log("errorThrown: " + errorThrown);
          console.log("jqXHR.responseText: " + jqXHR.responseText);
        },
      });
    });

    $.ajax({
      url: "libs/php/getAllDepartments.php",
      dataType: "json",
      data: {},
      success: function (result) {
        //console.log(result);

        $("#directoryData").html("");

        $.each(alphabetArray, function (alphabetIndex) {
          if (
            result.data.find(
              (elem) =>
                elem.name[0].toUpperCase() === alphabetArray[alphabetIndex]
            )
          ) {
            let deptLetterMarkup =
              '<div class="row">' +
              `<div class="col-sm-6 alignmentRight" id="horizontal${alphabetIndex}">${alphabetArray[alphabetIndex]}</div>` +
              "</div>";

            let deptLetter = $("#directoryData").append(deptLetterMarkup);

            $.each(result.data, function (index) {
              let deptNameUpper = result.data[index].name[0].toUpperCase();

              if (deptNameUpper === alphabetArray[alphabetIndex]) {
                let deptMarkup =
                  '<div class="row" >' +
                  '<div class="col-sm-6"></div>' +
                  '<div class="col-sm-1">' +
                  `<div id="deptSquare" class="square"></div>` +
                  "</div>" +
                  '<div class="col-sm-3 namePosition">' +
                  `<a id="deptLink${index}" class="nameLink hoverOver" data-bs-toggle="modal" data-bs-target="#editDepartmentModal">${result.data[index].name}` +
                  "</div>" +
                  "</div>";

                deptLetter.append(deptMarkup);

                //Edit department modal
                $(`#deptLink${index}`).on("click", function () {
                  $.ajax({
                    //2
                    type: "POST",
                    url: "libs/php/getAllLocations.php",
                    dataType: "json",

                    success: function (result) {
                      $(".deptEditLocSelectList").html("");

                      $(".deptEditLocSelectList").append(
                        '<option selected disabled value="">' +
                          "Select location" +
                          "</option>"
                      );

                      $.each(result.data, function (index) {
                        $(".deptEditLocSelectList").append(
                          $("<option>", {
                            value: result.data[index].id,
                            text: result.data[index].name,
                          })
                        );
                      });
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                      console.log("status code: " + jqXHR.status);
                      console.log("errorThrown: " + errorThrown);
                      console.log("jqXHR.responseText: " + jqXHR.responseText);
                    },
                  });

                  $("#editDepartment").val(result.data[index].name);

                  setTimeout(function () {
                    $("#editDepartmentModal").modal("show");
                  }, 1000);

                  $("#editDepartmentForm").submit(function (event) {
                    event.preventDefault();

                    $("#editDepartmentModal").modal("hide");

                    setTimeout(function () {
                      $("#editDepartmentConfirmModal").modal("show");
                    }, 1000);
                  });

                  $("#editDepartmentConfirmForm").submit(function (event) {
                    event.preventDefault();

                    $("#editDepartmentConfirmModal").modal("hide");

                    let departmentName = $("#editDepartment").val();

                    if (departmentName !== "") {
                      departmentName =
                        departmentName[0].toUpperCase() +
                        departmentName.substring(1, departmentName.length);
                    }

                    let locName = $("#editDeptLoc").val();

                    $.ajax({
                      url: "libs/php/editDepartment.php",
                      method: "post",
                      dataType: "text",
                      data: {
                        id: result.data[index].id,
                        dept: departmentName,
                        loc: locName,
                      },

                      success: function (result) {
                        console.log(result);
                        $("#editDepartmentSuccessMessage").html("");
                        $("#editDepartmentSuccessMessage").append(result);

                        setTimeout(function () {
                          $("#editEmployeeSuccessModal").modal("show");
                        }, 1000);

                        // To stop form resubmission
                        if (window.history.replaceState) {
                          window.history.replaceState(
                            null,
                            null,
                            window.location.href
                          );
                        }

                        setTimeout(function () {
                          location.reload();
                        }, 3000);
                      },
                      error: function (jqXHR, textStatus, errorThrown) {
                        console.log("status code: " + jqXHR.status);
                        console.log("errorThrown: " + errorThrown);
                        console.log(
                          "jqXHR.responseText: " + jqXHR.responseText
                        );
                      },
                    });
                  });

                  // Delete department

                  $("#deleteDepartmentConfirmForm").submit(function (event) {
                    event.preventDefault();

                    $("#deleteDepartmentConfirmModal").modal("hide");

                    $.ajax({
                      //2
                      type: "POST",
                      url: "libs/php/deleteDepartment.php",
                      dataType: "text",
                      data: {
                        deleteDept: result.data[index].id,
                      },

                      success: function (resultDeleteDept) {
                        //3

                        $("#deleteDepartmentSuccessMessage").html("");
                        $("#deleteDepartmentSuccessMessage").append(
                          resultDeleteDept
                        );
                        //console.log(result);

                        setTimeout(function () {
                          $("#deleteDepartmentSuccessModal").modal("show");
                        }, 1000);

                        // To stop form resubmission
                        if (window.history.replaceState) {
                          window.history.replaceState(
                            null,
                            null,
                            window.location.href
                          );
                        }

                        setTimeout(function () {
                          location.reload();
                        }, 3000);
                      },
                      error: function (jqXHR, textStatus, errorThrown) {
                        console.log("status code: " + jqXHR.status);
                        console.log("errorThrown: " + errorThrown);
                        console.log(
                          "jqXHR.responseText: " + jqXHR.responseText
                        );
                      },
                    });
                  });
                });
              }
            });
          }
        });
      },
    });
  });

  // Populate the directory with locations
  $("#location-tab").on("click", function () {
    // Search bar for location
    $("#searchBar").keyup(function () {
      let query = $(this).val();

      $.ajax({
        url: "libs/php/searchBarLoc.php",
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
              let searchLocationMarkup =
                '<div class="row" >' +
                '<div class="col-sm-6"></div>' +
                '<div class="col-sm-1">' +
                `<div id="locSquare" class="square"></div>` +
                "</div>" +
                '<div class="col-sm-3 namePosition">' +
                `<a id="searchLocLink${index}" class="nameLink hoverOver" data-bs-toggle="modal" data-bs-target="#editLocationModal">${result.data[index].name}` +
                "</div>" +
                "</div>";

              $("#directoryData").append(searchLocationMarkup);

              //Edit location modal for search bar
              $(`#searchLinkLoc${index}`).on("click", function () {
                $("#editLoc").val(result.data[index].name);

                setTimeout(function () {
                  $("#editLocationModal").modal("show");
                }, 1000);

                $("#editLocationForm").submit(function (event) {
                  event.preventDefault();

                  $("#editLocationModal").modal("hide");

                  setTimeout(function () {
                    $("#editLocationConfirmModal").modal("show");
                  }, 1000);
                });

                $("#editLocationConfirmForm").submit(function (event) {
                  event.preventDefault();

                  $("#editLocationConfirmModal").modal("hide");

                  let locName = $("#editLoc").val();

                  if (locName !== "") {
                    locName =
                      locName[0].toUpperCase() +
                      locName.substring(1, locName.length);
                  }

                  $.ajax({
                    url: "libs/php/editLocation.php",
                    method: "post",
                    dataType: "text",
                    data: {
                      id: result.data[index].id,
                      locName: locName,
                    },

                    success: function (result) {
                      //console.log(result);
                      $("#editLocationSuccessMessage").html("");
                      $("#editLocationSuccessMessage").append(result);

                      setTimeout(function () {
                        $("#editLocationSuccessModal").modal("show");
                      }, 1000);

                      // To stop form resubmission
                      if (window.history.replaceState) {
                        window.history.replaceState(
                          null,
                          null,
                          window.location.href
                        );
                      }

                      setTimeout(function () {
                        location.reload();
                      }, 3000);
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                      console.log("status code: " + jqXHR.status);
                      console.log("errorThrown: " + errorThrown);
                      console.log("jqXHR.responseText: " + jqXHR.responseText);
                    },
                  });
                });

                // Delete location

                $("#deleteLocationConfirmForm").submit(function (event) {
                  event.preventDefault();

                  $("#deleteLocationConfirmModal").modal("hide");

                  $.ajax({
                    //2
                    type: "POST",
                    url: "libs/php/deleteLocation.php",
                    dataType: "text",
                    data: {
                      deleteLoc: result.data[index].id,
                    },

                    success: function (resultDeleteLoc) {
                      //3

                      $("#deleteLocationSuccessMessage").html("");
                      $("#deleteLocationSuccessMessage").append(
                        resultDeleteLoc
                      );
                      //console.log(result);

                      setTimeout(function () {
                        $("#deleteLocationSuccessModal").modal("show");
                      }, 1000);

                      // To stop form resubmission
                      if (window.history.replaceState) {
                        window.history.replaceState(
                          null,
                          null,
                          window.location.href
                        );
                      }

                      setTimeout(function () {
                        location.reload();
                      }, 3000);
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                      console.log("status code: " + jqXHR.status);
                      console.log("errorThrown: " + errorThrown);
                      console.log("jqXHR.responseText: " + jqXHR.responseText);
                    },
                  });
                });
              });
            } else {
              window.localStorage.setItem("focus_on", "#searchBar");
              location.reload();
            }
          });
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log("status code: " + jqXHR.status);
          console.log("errorThrown: " + errorThrown);
          console.log("jqXHR.responseText: " + jqXHR.responseText);
        },
      });
    });

    $.ajax({
      url: "libs/php/getAllLocations.php",
      dataType: "json",
      data: {},
      success: function (result) {
        //console.log(result);

        $("#directoryData").html("");

        $.each(alphabetArray, function (alphabetIndex) {
          if (
            result.data.find(
              (elem) =>
                elem.name[0].toUpperCase() === alphabetArray[alphabetIndex]
            )
          ) {
            let locLetterMarkup =
              '<div class="row">' +
              `<div class="col-sm-6 alignmentRight" id="horizontal${alphabetIndex}">${alphabetArray[alphabetIndex]}</div>` +
              "</div>";

            let locLetter = $("#directoryData").append(locLetterMarkup);

            $.each(result.data, function (index) {
              let locNameUpper = result.data[index].name[0].toUpperCase();

              if (locNameUpper === alphabetArray[alphabetIndex]) {
                let locMarkup =
                  '<div class="row" >' +
                  '<div class="col-sm-6"></div>' +
                  '<div class="col-sm-1">' +
                  `<div id="locSquare" class="square"></div>` +
                  "</div>" +
                  '<div class="col-sm-3 namePosition">' +
                  `<a id="locLink${index}" class="nameLink hoverOver" data-bs-toggle="modal" data-bs-target="#editLocationModal">${result.data[index].name}` +
                  "</div>" +
                  "</div>";

                locLetter.append(locMarkup);

                //Edit location modal
                $(`#locLink${index}`).on("click", function () {
                  $("#editLoc").val(result.data[index].name);

                  setTimeout(function () {
                    $("#editLocationModal").modal("show");
                  }, 1000);

                  $("#editLocationForm").submit(function (event) {
                    event.preventDefault();

                    $("#editLocationModal").modal("hide");

                    setTimeout(function () {
                      $("#editLocationConfirmModal").modal("show");
                    }, 1000);
                  });

                  $("#editLocationConfirmForm").submit(function (event) {
                    event.preventDefault();

                    $("#editLocationConfirmModal").modal("hide");

                    let locName = $("#editLoc").val();

                    if (locName !== "") {
                      locName =
                        locName[0].toUpperCase() +
                        locName.substring(1, locName.length);
                    }

                    $.ajax({
                      url: "libs/php/editLocation.php",
                      method: "post",
                      dataType: "text",
                      data: {
                        id: result.data[index].id,
                        locName: locName,
                      },

                      success: function (result) {
                        //console.log(result);
                        $("#editLocationSuccessMessage").html("");
                        $("#editLocationSuccessMessage").append(result);

                        setTimeout(function () {
                          $("#editLocationSuccessModal").modal("show");
                        }, 1000);

                        // To stop form resubmission
                        if (window.history.replaceState) {
                          window.history.replaceState(
                            null,
                            null,
                            window.location.href
                          );
                        }

                        setTimeout(function () {
                          location.reload();
                        }, 3000);
                      },
                      error: function (jqXHR, textStatus, errorThrown) {
                        console.log("status code: " + jqXHR.status);
                        console.log("errorThrown: " + errorThrown);
                        console.log(
                          "jqXHR.responseText: " + jqXHR.responseText
                        );
                      },
                    });
                  });

                  // Delete location

                  $("#deleteLocationConfirmForm").submit(function (event) {
                    event.preventDefault();

                    $("#deleteLocationConfirmModal").modal("hide");

                    $.ajax({
                      //2
                      type: "POST",
                      url: "libs/php/deleteLocation.php",
                      dataType: "text",
                      data: {
                        deleteLoc: result.data[index].id,
                      },

                      success: function (resultDeleteLoc) {
                        //3

                        $("#deleteLocationSuccessMessage").html("");
                        $("#deleteLocationSuccessMessage").append(
                          resultDeleteLoc
                        );
                        //console.log(result);

                        setTimeout(function () {
                          $("#deleteLocationSuccessModal").modal("show");
                        }, 1000);

                        // To stop form resubmission
                        if (window.history.replaceState) {
                          window.history.replaceState(
                            null,
                            null,
                            window.location.href
                          );
                        }

                        setTimeout(function () {
                          location.reload();
                        }, 3000);
                      },
                      error: function (jqXHR, textStatus, errorThrown) {
                        console.log("status code: " + jqXHR.status);
                        console.log("errorThrown: " + errorThrown);
                        console.log(
                          "jqXHR.responseText: " + jqXHR.responseText
                        );
                      },
                    });
                  });
                });
              }
            });
          }
        });
      },
    });
  });

  //Create modal for personnel

  $("#plus").on("click", function () {
    $('a[data-toggle="tab"]').on("shown.bs.tab", function (e) {
      // here is the new selected tab id
      let selectedTabId = e.target.id;
    });

    let id = $(".tab-content .active").attr("id");

    if (id === "personnel") {
      $.ajax({
        //2
        type: "POST",
        url: "libs/php/getAllDepartments.php",
        dataType: "json",

        success: function (result) {
          $(".deptSelectList").html("");

          $(".deptSelectList").append(
            "<option selected disabled>" + "Select department" + "</option>"
          );

          $.each(result.data, function (index) {
            $(".deptSelectList").append(
              $("<option>", {
                value: result.data[index].locationID,
                text: result.data[index].name,
              })
            );
          });
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log("status code: " + jqXHR.status);
          console.log("errorThrown: " + errorThrown);
          console.log("jqXHR.responseText: " + jqXHR.responseText);
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
            '<option selected disabled value="">' +
              "Select location" +
              "</option>"
          );

          $.each(result.data, function (index) {
            $(".locSelectList").append(
              $("<option>", {
                value: result.data[index].id,
                text: result.data[index].name,
              })
            );
          });
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log("status code: " + jqXHR.status);
          console.log("errorThrown: " + errorThrown);
          console.log("jqXHR.responseText: " + jqXHR.responseText);
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
        $("#createPersonnelModal").modal("show");
      }, 1000);

      $("#createPersonnelForm").submit(function (event) {
        event.preventDefault();

        $("#createPersonnelModal").modal("hide");

        if ($("#createPersonnelDept").val() === null) {
          $("#createPersonnelErrorMessage").html("");
          $("#createPersonnelErrorMessage").append(
            "Please select a department."
          );
          setTimeout(function () {
            $("#createPersonnelErrorModal").modal("show");
          }, 1000);
        } else {
          setTimeout(function () {
            $("#createPersonnelConfirmModal").modal("show");
          }, 1000);
        }
      });

      $("#createPersonnelConfirmForm").submit(function (event) {
        event.preventDefault();

        $("#createPersonnelConfirmModal").modal("hide");

        let firstName = $("#createFirstName").val();

        if (firstName !== "") {
          firstName =
            firstName[0].toUpperCase() +
            firstName.substring(1, firstName.length);
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
            dept: $("#createPersonnelDept").val(),
          },
          success: function (result) {
            $("#createPersonnelSuccessMessage").html("");
            $("#createPersonnelSuccessMessage").append(result);
            //console.log(result);

            setTimeout(function () {
              $("#createPersonnelSuccessModal").modal("show");
            }, 1000);

            // To stop form resubmission
            if (window.history.replaceState) {
              window.history.replaceState(null, null, window.location.href);
            }

            setTimeout(function () {
              location.reload();
            }, 3000);
          },
          error: function (jqXHR, textStatus, errorThrown) {
            console.log("status code: " + jqXHR.status);
            console.log("errorThrown: " + errorThrown);
            console.log("jqXHR.responseText: " + jqXHR.responseText);
          },
        });
      });
      //Create modal for department
    } else if (id === "department") {
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
        error: function (jqXHR, textStatus, errorThrown) {
          console.log("status code: " + jqXHR.status);
          console.log("errorThrown: " + errorThrown);
          console.log("jqXHR.responseText: " + jqXHR.responseText);
        },
      });

      setTimeout(function () {
        $("#createDepartmentModal").modal("show");
      }, 1000);

      $("#createDepartmentForm").submit(function (event) {
        event.preventDefault();

        $("#createDepartmentModal").modal("hide");

        setTimeout(function () {
          $("#createDepartmentConfirmModal").modal("show");
        }, 1000);
      });

      $("#createDepartmentConfirmForm").submit(function (event) {
        event.preventDefault();

        $("#createDepartmentConfirmModal").modal("hide");

        let departmentName = $("#createDeptName").val();

        if (departmentName !== "") {
          departmentName =
            departmentName[0].toUpperCase() +
            departmentName.substring(1, departmentName.length);
        }

        $.ajax({
          url: "libs/php/createDepartment.php",
          method: "post",
          dataType: "text",
          data: {
            deptName: departmentName,
            addDeptLoc: $("#createDeptLoc").val(),
          },
          success: function (result) {
            $("#createDepartmentSuccessMessage").html("");
            $("#createDepartmentSuccessMessage").append(result);

            setTimeout(function () {
              $("#createDepartmentSuccessModal").modal("show");
            }, 1000);

            // To stop form resubmission
            if (window.history.replaceState) {
              window.history.replaceState(null, null, window.location.href);
            }

            setTimeout(function () {
              location.reload();
            }, 3000);
          },
          error: function (jqXHR, textStatus, errorThrown) {
            console.log("status code: " + jqXHR.status);
            console.log("errorThrown: " + errorThrown);
            console.log("jqXHR.responseText: " + jqXHR.responseText);
          },
        });
      });
    } else if (id === "location") {
      setTimeout(function () {
        $("#createLocationModal").modal("show");
      }, 1000);

      $("#createLocationForm").submit(function (event) {
        event.preventDefault();

        $("#createLocationModal").modal("hide");

        setTimeout(function () {
          $("#createLocationConfirmModal").modal("show");
        }, 1000);
      });

      $("#createLocationConfirmForm").submit(function (event) {
        event.preventDefault();

        $("#createLocationConfirmModal").modal("hide");

        let locationName = $("#createLocName").val();

        if (locationName !== "") {
          locationName =
            locationName[0].toUpperCase() +
            locationName.substring(1, locationName.length);
        }

        $.ajax({
          url: "libs/php/createLocation.php",
          method: "post",
          dataType: "text",
          data: {
            locName: locationName,
          },
          success: function (result) {
            $("#createLocationSuccessMessage").html("");
            $("#createLocationSuccessMessage").append(result);

            setTimeout(function () {
              $("#createLocationSuccessModal").modal("show");
            }, 1000);

            // To stop form resubmission
            if (window.history.replaceState) {
              window.history.replaceState(null, null, window.location.href);
            }

            setTimeout(function () {
              location.reload();
            }, 3000);
          },
          error: function (jqXHR, textStatus, errorThrown) {
            console.log("status code: " + jqXHR.status);
            console.log("errorThrown: " + errorThrown);
            console.log("jqXHR.responseText: " + jqXHR.responseText);
          },
        });
      });
    }
  });

  // Delete modal for personnel
  $("#delete").on("click", function () {
    $('a[data-toggle="tab"]').on("shown.bs.tab", function (e) {
      // here is the new selected tab id
      let selectedTabId = e.target.id;
    });

    let id = $(".tab-content .active").attr("id");

    if (id === "personnel") {
      $.ajax({
        //2
        type: "POST",
        url: "libs/php/getAllPersonnel.php",
        dataType: "json",

        success: function (result) {
          //3

          //console.log(result);

          $("#deletePersonnelData").html("");

          $.each(alphabetArray, function (alphabetIndex) {
            if (
              result.data.find(
                (elem) =>
                  elem.lastName[0].toUpperCase() ===
                  alphabetArray[alphabetIndex]
              )
            ) {
              let deletePersonnelLetterMarkup =
                '<div class="row">' +
                `<div class="col-sm-1 alignmentRight" id="delete${alphabetIndex}">${alphabetArray[alphabetIndex]}</div>` +
                "</div>";

              let deleteLetter = $("#deletePersonnelData").append(
                deletePersonnelLetterMarkup
              );

              $.each(result.data, function (index) {
                let lastNameDeleteUpper =
                  result.data[index].lastName[0].toUpperCase();

                if (lastNameDeleteUpper === alphabetArray[alphabetIndex]) {
                  //6
                  let deletePersonnelMarkup =
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
                        id="checkList${index}"
                        name="checkList${index}"
                        value="${result.data[index].id}"
                      />` +
                    "</form>" +
                    "</div>" +
                    "</div>";

                  deleteLetter.append(deletePersonnelMarkup);
                }
              });

              let clicked = false;
              $("#selectAllPersonnel").on("click", function () {
                $(".deleteCheckbox").prop("checked", !clicked);
                clicked = !clicked;
                this.innerHTML = clicked ? "Deselect" : "Select";
                $("#selectedPersonnel").html("");
                let n = $("input:checked").length;
                $("#selectedPersonnel").append(n + " selected");
              });

              $(".deleteCheckbox").on("click", function () {
                $("#selectedPersonnel").html("");
                let n = $("input:checked").length;
                $("#selectedPersonnel").append(n + " selected");
              });
            }
          });

          setTimeout(function () {
            $("#deletePersonnelModal").modal("show");
          }, 1000);
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log("status code: " + jqXHR.status);
          console.log("errorThrown: " + errorThrown);
          console.log("jqXHR.responseText: " + jqXHR.responseText);
        },
      });

      $("#deletePersonnelForm").submit(function (event) {
        event.preventDefault();

        $("#deletePersonnelModal").modal("hide");

        setTimeout(function () {
          $("#deletePersonnelConfirmModal").modal("show");
        }, 1000);
      });

      $("#deletePersonnelConfirmForm").submit(function (event) {
        event.preventDefault();

        $("#deletePersonnelConfirmModal").modal("hide");

        let checkList = [];

        $("input:checked").each(function () {
          checkList.push($(this).val());
        });

        //console.log(checkList);

        $.ajax({
          //2
          type: "POST",
          url: "libs/php/deletePersonnelCheckList.php",
          dataType: "text",
          data: {
            checkList: checkList,
          },

          success: function (result) {
            //3

            console.log(result);
            $("#deletePersonnelSuccessMessage").html("");
            $("#deletePersonnelSuccessMessage").append(result);
            console.log(result);

            setTimeout(function () {
              $("#deletePersonnelSuccessModal").modal("show");
            }, 1000);

            setTimeout(function () {
              location.reload();
            }, 3000);
          },
          error: function (jqXHR, textStatus, errorThrown) {
            console.log("status code: " + jqXHR.status);
            console.log("errorThrown: " + errorThrown);
            console.log("jqXHR.responseText: " + jqXHR.responseText);
          },
        });
        $("#selected").html("");
      });

      // Delete search bar for personnel
      $("#deletePersonnelSearchBar").keyup(function () {
        let query = $(this).val();

        $.ajax({
          url: "libs/php/deletePersonnelSearchBar.php",
          method: "POST",
          dataType: "json",
          data: {
            query: query,
          },
          success: function (result) {
            //console.log(result);

            $("#deletePersonnelData").html("");

            $.each(result.data, function (index) {
              if (query != "") {
                //6
                let deletePersonnelSearchMarkup =
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
                        id="checkList${index}"
                        name="checkList${index}"
                        value="${result.data[index].id}"
                      />` +
                  "</form>" +
                  "</div>" +
                  "</div>";

                $("#deletePersonnelData").append(deletePersonnelSearchMarkup);

                let clicked = false;
                $("#selectAllPersonnel").on("click", function () {
                  $(".deleteCheckbox").prop("checked", !clicked);
                  clicked = !clicked;
                  this.innerHTML = clicked ? "Deselect" : "Select";
                  $("#selectedPersonnel").html("");
                  let n = $("input:checked").length;
                  $("#selectedPersonnel").append(n + " selected");
                });

                $(".deleteCheckbox").on("click", function () {
                  $("#selectedPersonnel").html("");
                  let n = $("input:checked").length;
                  $("#selectedPersonnel").append(n + " selected");
                });

                setTimeout(function () {
                  $("#deletePersonnelModal").modal("show");
                }, 1000);
              } else {
                window.localStorage.setItem("focus_on", "#deleteSearchBar");
                location.reload();
              }

              $("#deletePersonnelForm").submit(function (event) {
                event.preventDefault();

                $("#deletePersonnelModal").modal("hide");

                setTimeout(function () {
                  $("#deletePersonnelConfirmModal").modal("show");
                }, 1000);
              });

              $("#deletePersonnelConfirmForm").submit(function (event) {
                event.preventDefault();

                $("#deletePersonnelConfirmModal").modal("hide");

                let checkList = [];

                $("input:checked").each(function () {
                  checkList.push($(this).val());
                });

                //console.log(checkList);

                $.ajax({
                  //2
                  type: "POST",
                  url: "libs/php/deletePersonnelCheckList.php",
                  dataType: "text",
                  data: {
                    checkList: checkList,
                  },

                  success: function (result) {
                    //3

                    $("#deletePersonnelMessage").html("");
                    $("#deletePersonnelMessage").append(result);
                    //console.log(result);

                    setTimeout(function () {
                      $("#deletePersonnelSuccessModal").modal("show");
                    }, 1000);

                    setTimeout(function () {
                      location.reload();
                    }, 3000);
                  },
                });
                $("#selected").html("");
              });
            });
          },
          error: function (jqXHR, textStatus, errorThrown) {
            console.log("status code: " + jqXHR.status);
            console.log("errorThrown: " + errorThrown);
            console.log("jqXHR.responseText: " + jqXHR.responseText);
          },
        });
      });
    }
  });

  // Personnel search modal

  $("#search").on("click", function () {
    $('a[data-toggle="tab"]').on("shown.bs.tab", function (e) {
      // here is the new selected tab id
      let selectedTab = e.target.id;
    });

    let searchId = $(".tab-content .active").attr("id");

    // Search modal for personnel
    if (searchId === "personnel") {
      $.ajax({
        //2
        type: "POST",
        url: "libs/php/getAllDepartments.php",
        dataType: "json",

        success: function (result) {
          $(".deptSelectList").html("");

          $(".deptSelectList").append(
            "<option selected disabled>" + "Select department" + "</option>"
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
        error: function (jqXHR, textStatus, errorThrown) {
          console.log("status code: " + jqXHR.status);
          console.log("errorThrown: " + errorThrown);
          console.log("jqXHR.responseText: " + jqXHR.responseText);
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
            '<option selected disabled value="">' +
              "Select location" +
              "</option>"
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
        error: function (jqXHR, textStatus, errorThrown) {
          console.log("status code: " + jqXHR.status);
          console.log("errorThrown: " + errorThrown);
          console.log("jqXHR.responseText: " + jqXHR.responseText);
        },
      });

      setTimeout(function () {
        $("#searchPersonnelModal").modal("show");
      }, 1000);

      $("#searchPersonnelForm").submit(function (event) {
        event.preventDefault();

        $("#searchPersonnelModal").modal("hide");

        if (
          $("#searchFirstName").val() === "" &&
          $("#searchLastName").val() === "" &&
          $("#searchJobTitle").val() === "" &&
          $("#searchEmail").val() === ""
        ) {
          $("#searchPersonnelErrorMessage").html("");
          $("#searchPersonnelErrorMessage").append(
            "Please also type in another field."
          );
          setTimeout(function () {
            $("#searchPersonnelErrorModal").modal("show");
          }, 1000);
        } else {
          setTimeout(function () {
            $("#searchPersonnelConfirmModal").modal("show");
          }, 1000);
        }
      });

      $("#searchPersonnelConfirmForm").submit(function (event) {
        event.preventDefault();

        $("#searchPersonnelConfirmModal").modal("hide");

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
            //console.log(result);

            $("#searchPersonnelModal").modal("hide");
            $("#searchResultsData").html("");

            // Search results modal

            if (result.data.length > 0) {
              let searchResultsMarkup;

              $.each(result.data, function (index) {
                searchResultsMarkup =
                  '<div class="row">' +
                  '<div class="col-sm-3"></div>' +
                  '<div class="col-sm-2">' +
                  `<div id="searchSquare${index}" class="square"></div>` +
                  "</div>" +
                  '<div class="col-sm-4 namePosition">' +
                  `<a id="searchNameLink${index}" class="nameLink" data-bs-toggle="modal" data-bs-target="#editEmployeeModal">${result.data[index].lastName}` +
                  " " +
                  `${result.data[index].firstName}</a>`;
                "</div>" + "</div>";

                $("#searchResultsData").append(searchResultsMarkup);

                setTimeout(function () {
                  $("#searchPersonnelResultsModal").modal("show");
                }, 1000);

                //Edit employee modal
                $(`#searchNameLink${index}`).on("click", function () {

                  $("#searchPersonnelResultsModal").modal("hide");

                  $("#editFirstName").val(result.data[index].firstName);
                  $("#editLastName").html(result.data[index].lastName);
                  $("#editJobTitle").val(result.data[index].jobTitle);
                  $("#editEmail").val(result.data[index].email);

                  // Get department id
                  let deptID;
                  let locID;

                  $.ajax({
                    //2
                    type: "POST",
                    url: "libs/php/getDepartmentID.php",
                    dataType: "json",
                    data: {
                      employeeDept: result.data[index].department,
                    },

                    success: function (resultDeptID) {
                      //console.log(resultDeptID);

                      deptID = resultDeptID.data[index].id;

                      // Display the employee's department in the department dropdown
                      $.ajax({
                        //2
                        type: "POST",
                        url: "libs/php/getAllDepartments.php",
                        dataType: "json",

                        success: function (resultDept) {
                          $(".deptEditSelectList").html("");

                          $.each(resultDept.data, function (index) {
                            $("#editEmployeeDept").val(deptID);

                            $(".deptEditSelectList").append(
                              $("<option>", {
                                value: resultDept.data[index].id,
                                text: resultDept.data[index].name,
                              })
                            );
                          });
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                          console.log("status code: " + jqXHR.status);
                          console.log("errorThrown: " + errorThrown);
                          console.log(
                            "jqXHR.responseText: " + jqXHR.responseText
                          );
                        },
                      });

                      $(".deptEditSelectList").on("change", function () {
                        let departID = $(this).val();
                        if (departID) {
                          // Find the location id from the department id
                          $.ajax({
                            //2
                            type: "POST",
                            url: "libs/php/getLocationID.php",
                            dataType: "json",
                            data: {
                              employeeDeptID: departID,
                            },

                            success: function (resultLocID) {
                              locID = resultLocID.data[index].locationID;

                              // Use location id to set location dropdown
                              $.ajax({
                                //2
                                type: "POST",
                                url: "libs/php/getAllLocations.php",
                                dataType: "json",

                                success: function (resultLoc) {
                                  $(".locEditSelectList").html("");

                                  $.each(resultLoc.data, function (index) {
                                    $("#editEmployeeLoc").val(locID);

                                    $(".locEditSelectList").append(
                                      $("<option>", {
                                        value: resultLoc.data[index].id,
                                        text: resultLoc.data[index].name,
                                      })
                                    );
                                  });
                                },
                                error: function (
                                  jqXHR,
                                  textStatus,
                                  errorThrown
                                ) {
                                  console.log("status code: " + jqXHR.status);
                                  console.log("errorThrown: " + errorThrown);
                                  console.log(
                                    "jqXHR.responseText: " + jqXHR.responseText
                                  );
                                },
                              });
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                              console.log("status code: " + jqXHR.status);
                              console.log("errorThrown: " + errorThrown);
                              console.log(
                                "jqXHR.responseText: " + jqXHR.responseText
                              );
                            },
                          });
                        }
                      });
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                      console.log("status code: " + jqXHR.status);
                      console.log("errorThrown: " + errorThrown);
                      console.log("jqXHR.responseText: " + jqXHR.responseText);
                    },
                  });

                  setTimeout(function () {
                    $("#editEmployeeModal").modal("show");
                  }, 1000);

                  $("#editEmployeeForm").submit(function (event) {
                    event.preventDefault();

                    $("#editEmployeeModal").modal("hide");

                    setTimeout(function () {
                      $("#editEmployeeConfirmModal").modal("show");
                    }, 1000);
                  });

                  $("#editEmployeeConfirmForm").submit(function (event) {
                    event.preventDefault();

                    $("#editEmployeeConfirmModal").modal("hide");

                    let firstName = $("#editFirstName").val();

                    if (firstName !== "") {
                      firstName =
                        firstName[0].toUpperCase() +
                        firstName.substring(1, firstName.length);
                    }

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
                        id: result.data[index].id,
                        firstName: firstName,
                        lastName: $("#editLastName").html(),
                        jobTitle: jobTitle,
                        email: $("#editEmail").val(),
                        dept: $("#editEmployeeDept").val(),
                      },

                      success: function (resultEmp) {
                        //console.log(result);
                        $("#editEmployeeSuccessMessage").html("");
                        $("#editEmployeeSuccessMessage").append(resultEmp);

                        setTimeout(function () {
                          $("#editEmployeeSuccessModal").modal("show");
                        }, 1000);

                        // To stop form resubmission
                        if (window.history.replaceState) {
                          window.history.replaceState(
                            null,
                            null,
                            window.location.href
                          );
                        }

                        setTimeout(function () {
                          location.reload();
                        }, 3000);
                      },
                      error: function (jqXHR, textStatus, errorThrown) {
                        console.log("status code: " + jqXHR.status);
                        console.log("errorThrown: " + errorThrown);
                        console.log(
                          "jqXHR.responseText: " + jqXHR.responseText
                        );
                      },
                    });
                  });

                  // Delete employee

                  $("#deleteEmployeeConfirmForm").submit(function (event) {
                    event.preventDefault();

                    $("#deleteEmployeeConfirmModal").modal("hide");

                    $.ajax({
                      //2
                      type: "POST",
                      url: "libs/php/deleteEmployee.php",
                      dataType: "text",
                      data: {
                        id: result.data[index].id,
                      },

                      success: function (resultDelete) {
                        //3

                        $("#deleteEmployeeSuccessMessage").html("");
                        $("#deleteEmployeeSuccessMessage").append(resultDelete);
                        //console.log(result);

                        setTimeout(function () {
                          $("#deleteEmployeeSuccessModal").modal("show");
                        }, 1000);

                        // To stop form resubmission
                        if (window.history.replaceState) {
                          window.history.replaceState(
                            null,
                            null,
                            window.location.href
                          );
                        }

                        setTimeout(function () {
                          location.reload();
                        }, 3000);
                      },
                      error: function (jqXHR, textStatus, errorThrown) {
                        console.log("status code: " + jqXHR.status);
                        console.log("errorThrown: " + errorThrown);
                        console.log(
                          "jqXHR.responseText: " + jqXHR.responseText
                        );
                      },
                    });
                  });
                });
              });
            } else {
              let searchNoMatchMarkup = 
              '<div id="noMatch">No matches</div>';

              $("#searchResultsData").append(searchNoMatchMarkup);
                
              setTimeout(function () {
                $("#searchPersonnelResultsModal").modal("show");
              }, 1000);
            }
          },
          error: function (jqXHR, textStatus, errorThrown) {
            console.log("status code: " + jqXHR.status);
            console.log("errorThrown: " + errorThrown);
            console.log("jqXHR.responseText: " + jqXHR.responseText);
          },
        });
      });
    }
  });
}); //1
