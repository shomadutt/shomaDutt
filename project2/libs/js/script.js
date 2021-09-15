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

  // Edit employee submit event handler
  $("#editEmployeeSubmit").on("click", function (event) {
    event.preventDefault();
    $("#editEmployeeModal").modal("hide");

    if ($("#editFirstName").val() === "" || $("#editEmail").val() === "") {
      $("#editEmployeeErrorMessage").html("");
      $("#editEmployeeErrorMessage").append("Please fill all fields.");

      $("#editEmployeeErrorModal").modal("show");
    } else {
      $("#editEmployeeConfirmModal").modal("show");
    }
  });

  // Edit employee confirm event handler
  $("#editEmployeeConfirmSubmit").on("click", function (event) {
    event.preventDefault();

    $("#editEmployeeConfirmModal").modal("hide");

    let firstName = $("#editFirstName").val();

    if (firstName !== "") {
      firstName =
        firstName[0].toUpperCase() + firstName.substring(1, firstName.length);
    }

    let jobTitle = $("#editJobTitle").val();

    if (jobTitle !== "") {
      jobTitle =
        jobTitle[0].toUpperCase() + jobTitle.substring(1, jobTitle.length);
    }

    $.ajax({
      url: "libs/php/editEmployee.php",
      method: "post",
      dataType: "text",
      data: {
        id: $(this).data("employee-id"),
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

        $("#editEmployeeSuccessModal").modal("show");

        // To stop form resubmission
        if (window.history.replaceState) {
          window.history.replaceState(null, null, window.location.href);
        }

        $("#editEmployeeSuccessModal").on("hidden.bs.modal", function () {
          location.reload();
        });
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log("status code: " + jqXHR.status);
        console.log("errorThrown: " + errorThrown);
        console.log("jqXHR.responseText: " + jqXHR.responseText);
      },
    });
  });

  // Delete employee event handler
  $("#deleteEmployee").on("click", function () {
    $("#editEmployeeModal").modal("hide");

    $("#deleteEmployeeConfirmModal").modal("show");
  });

  // Delete employee confirm event handler
  $("#deleteEmployeeConfirmSubmit").on("click", function (event) {
    event.preventDefault();

    $("#deleteEmployeeConfirmModal").modal("hide");

    $.ajax({
      type: "POST",
      url: "libs/php/deleteEmployee.php",
      dataType: "text",
      data: {
        id: $(this).data("employee-id"),
      },

      success: function (resultDelete) {
        $("#deleteEmployeeSuccessMessage").html("");
        $("#deleteEmployeeSuccessMessage").append(resultDelete);

        $("#deleteEmployeeSuccessModal").modal("show");

        // To stop form resubmission
        if (window.history.replaceState) {
          window.history.replaceState(null, null, window.location.href);
        }

        $("#deleteEmployeeSuccessModal").on("hidden.bs.modal", function () {
          location.reload();
        });
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log("status code: " + jqXHR.status);
        console.log("errorThrown: " + errorThrown);
        console.log("jqXHR.responseText: " + jqXHR.responseText);
      },
    });
  });

  // Edit department submit event handler
  $("#editDepartmentSubmit").on("click", function (event) {
    event.preventDefault();

    console.log($("#editDeptLoc").val());

    $("#editDepartmentModal").modal("hide");

    if ($("#editDeptLoc").val() === null) {
      $("#editDeptLoc").val($(this).data("location-id"));
    }

    $("#editDepartmentConfirmModal").modal("show");
  });

  // Edit department confirmation event handler
  $("#editDepartmentConfirmSubmit").on("click", function (event) {
    event.preventDefault();

    $("#editDepartmentConfirmModal").modal("hide");

    let departmentName = $("#editDepartment").val();

    if (departmentName !== "") {
      departmentName =
        departmentName[0].toUpperCase() +
        departmentName.substring(1, departmentName.length);
    }

    let loc = $("#editDeptLoc").val();

    console.log(loc);

    $.ajax({
      url: "libs/php/editDepartment.php",
      method: "post",
      dataType: "text",
      data: {
        id: $(this).data("department-id"),
        dept: departmentName,
        loc: loc,
      },

      success: function (result) {
        $("#editDepartmentSuccessMessage").html("");
        $("#editDepartmentSuccessMessage").append(result);

        $("#editDepartmentSuccessModal").modal("show");

        // To stop form resubmission
        if (window.history.replaceState) {
          window.history.replaceState(null, null, window.location.href);
        }

        $("#editDepartmentSuccessModal").on("hidden.bs.modal", function () {
          location.reload();
        });
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log("status code: " + jqXHR.status);
        console.log("errorThrown: " + errorThrown);
        console.log("jqXHR.responseText: " + jqXHR.responseText);
      },
    });
  });

  // Delete department event handler
  $("#deleteDepartment").on("click", function () {
    $("#editDepartmentModal").modal("hide");

    $("#deleteDepartmentConfirmModal").modal("show");
  });

  // Delete department confirmation event handler
  $("#deleteDepartmentConfirmSubmit").on("click", function (event) {
    event.preventDefault();

    $("#deleteDepartmentConfirmModal").modal("hide");

    $.ajax({
      type: "POST",
      url: "libs/php/deleteDepartment.php",
      dataType: "text",
      data: {
        deleteDept: $(this).data("department-id"),
      },

      success: function (resultDeleteDept) {
        $("#deleteDepartmentSuccessMessage").html("");
        $("#deleteDepartmentSuccessMessage").append(resultDeleteDept);
        //console.log(result);

        $("#deleteDepartmentSuccessModal").modal("show");

        // To stop form resubmission
        if (window.history.replaceState) {
          window.history.replaceState(null, null, window.location.href);
        }

        $("#deleteDepartmentSuccessModal").on("hidden.bs.modal", function () {
          location.reload();
        });
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log("status code: " + jqXHR.status);
        console.log("errorThrown: " + errorThrown);
        console.log("jqXHR.responseText: " + jqXHR.responseText);
      },
    });
  });

  // Edit location submit event handler
  $("#editLocationSubmit").on("click", function (event) {
    event.preventDefault();

    $("#editLocationModal").modal("hide");

    if ($("#editLoc").val() === "") {
      $("#editLocationErrorMessage").html("");
      $("#editLocationErrorMessage").append("Please fill all fields.");

      $("#editLocationErrorModal").modal("show");
    } else {
      $("#editLocationConfirmModal").modal("show");
    }
  });

  // Edit location confirmation event handler
  $("#editLocationConfirmSubmit").on("click", function (event) {
    event.preventDefault();

    $("#editLocationConfirmModal").modal("hide");

    let locName = $("#editLoc").val();

    if (locName !== "") {
      locName = locName[0].toUpperCase() + locName.substring(1, locName.length);
    }

    $.ajax({
      url: "libs/php/editLocation.php",
      method: "post",
      dataType: "text",
      data: {
        id: $(this).data("location-id"),
        locName: locName,
      },

      success: function (result) {
        console.log(result);
        $("#editLocationSuccessMessage").html("");
        $("#editLocationSuccessMessage").append(result);

        $("#editLocationSuccessModal").modal("show");

        // To stop form resubmission
        if (window.history.replaceState) {
          window.history.replaceState(null, null, window.location.href);
        }

        $("#editLocationSuccessModal").on("hidden.bs.modal", function () {
          location.reload();
        });
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log("status code: " + jqXHR.status);
        console.log("errorThrown: " + errorThrown);
        console.log("jqXHR.responseText: " + jqXHR.responseText);
      },
    });
  });

  // Delete location event handler
  $("#deleteLocation").on("click", function () {
    $("#editLocationModal").modal("hide");

    $("#deleteLocationConfirmModal").modal("show");
  });

  // Delete location confirmation event handler
  $("#deleteLocationConfirmSubmit").on("click", function (event) {
    event.preventDefault();

    $("#deleteLocationConfirmModal").modal("hide");

    $.ajax({
      type: "POST",
      url: "libs/php/deleteLocation.php",
      dataType: "text",
      data: {
        deleteLoc: $(this).data("location-id"),
      },

      success: function (resultDeleteLoc) {
        $("#deleteLocationSuccessMessage").html("");
        $("#deleteLocationSuccessMessage").append(resultDeleteLoc);
        //console.log(result);

        $("#deleteLocationSuccessModal").modal("show");

        // To stop form resubmission
        if (window.history.replaceState) {
          window.history.replaceState(null, null, window.location.href);
        }

        $("#deleteLocationSuccessModal").on("hidden.bs.modal", function () {
          location.reload();
        });
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log("status code: " + jqXHR.status);
        console.log("errorThrown: " + errorThrown);
        console.log("jqXHR.responseText: " + jqXHR.responseText);
      },
    });
  });

  // Delete personnel submit event handler
  $("#deletePersonnelSubmit").on("click", function (event) {
    event.preventDefault();

    $("#deletePersonnelModal").modal("hide");

    if ($("input:checked").length < 1) {
      $("#deletePersonnelErrorMessage").html("");
      $("#deletePersonnelErrorMessage").append("Please mark checkboxes.");

      $("#deletePersonnelErrorModal").modal("show");
    } else {
      $("#deletePersonnelConfirmModal").modal("show");
    }
  });

  // Delete personnel confirmation event handler
  $("#deletePersonnelConfirmSubmit").on("click", function (event) {
    event.preventDefault();

    $("#deletePersonnelConfirmModal").modal("hide");

    let checkList = [];

    $("input:checked").each(function () {
      checkList.push($(this).val());
    });

    //console.log(checkList);

    $.ajax({
      type: "POST",
      url: "libs/php/deletePersonnelCheckList.php",
      dataType: "text",
      data: {
        checkList: checkList,
      },

      success: function (result) {
        //console.log(result);
        $("#deletePersonnelSuccessMessage").html("");
        $("#deletePersonnelSuccessMessage").append(result);

        $("#deletePersonnelSuccessModal").modal("show");

        $("#deletePersonnelSuccessModal").on("hidden.bs.modal", function () {
          location.reload();
        });
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log("status code: " + jqXHR.status);
        console.log("errorThrown: " + errorThrown);
        console.log("jqXHR.responseText: " + jqXHR.responseText);
      },
    });
    $("#selected").html("");
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

  let plusMarkup = '<i class="fas fa-plus"></i>';
  $("#plus").append(plusMarkup);

  let deleteMarkup = '<i class="fas fa-trash-alt"></i>';
  $("#delete").append(deleteMarkup);

  let searchMarkup = '<i class="fas fa-search"></i>';
  $("#search").append(searchMarkup);

  // Populate the directory with employees

  $("#personnel-tab").on("click", function () {
    $("#delete").show();
    $("#search").show();
    $("#directorySpace").show();

    // Search bar for personnel
    $("#searchBar").keyup(function () {
      let query = "";
      query = $(this).val();

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
                `<div id="circle" class="circle">${result.data[index].firstName[0]}${result.data[index].lastName[0]}</div>` +
                "</div>" +
                '<div class="col-sm-4 namePosition">' +
                `<a id="searchLinkEmployee${result.data[index].id}" class="nameLink hoverOver" data-employee-id="${result.data[index].id}" data-bs-toggle="modal" data-bs-target="#editEmployeeModal">${result.data[index].firstName}` +
                " " +
                `${result.data[index].lastName}` +
                "</a></div>" +
                "</div>";

              $("#directoryData").append(searchEmployeeMarkup);

              //Edit employee modal for search bar
              $(`#searchLinkEmployee${result.data[index].id}`).on(
                "click",
                function () {
                  // Capturing the custom attribute data in the edit employee confirm button to be used in the edit employee confirm event handler
                  $("#editEmployeeConfirmSubmit").data(
                    "employee-id",
                    $(this).data("employee-id")
                  );

                  // Capturing the custom attribute data in the delete confirm button to be used in the delete employee confirm event handler
                  $("#deleteEmployeeConfirmSubmit").data(
                    "employee-id",
                    $(this).data("employee-id")
                  );

                  $("#editFirstName").val(result.data[index].firstName);
                  $("#editLastName").html(result.data[index].lastName);
                  $("#editJobTitle").val(result.data[index].jobTitle);
                  $("#editEmail").val(result.data[index].email);

                  // Get department id
                  let deptID;
                  let locID;

                  $.ajax({
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

                  $("#editEmployeeModal").modal("show");
                }
              );
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
              `<div class="col-sm-1 alignmentRight" id="letterIndex">${alphabetArray[alphabetIndex]}</div>` +
              "</div>";

            $("#directoryData").append(letterMarkup);

            $.each(result.data, function (index) {
              let lastNameUpper = result.data[index].lastName[0].toUpperCase();

              if (lastNameUpper === alphabetArray[alphabetIndex]) {
                employeeMarkup =
                  '<div class="row">' +
                  '<div class="col-sm-1"></div>' +
                  '<div class="col-sm-1">' +
                  `<div id="circle" class="circle">${result.data[index].firstName[0]}${result.data[index].lastName[0]}</div>` +
                  "</div>" +
                  '<div class="col-sm-2 namePosition">' +
                  `<a class="nameLink${result.data[index].id} nameLink hoverOver" data-employee-id="${result.data[index].id}" data-bs-toggle="modal" data-bs-target="#editEmployeeModal">${result.data[index].firstName}` +
                  " " +
                  `${result.data[index].lastName}` +
                  " " +
                  "</a></div>" +
                  '<div class="col-sm-2 namePosition d-none d-md-block">' +
                  `<a class="nameLink${result.data[index].id} nameLink hoverOver" data-employee-id="${result.data[index].id}" data-bs-toggle="modal" data-bs-target="#editEmployeeModal">${result.data[index].jobTitle}` +
                  "</a></div>" +
                  '<div class="col-sm-3 namePosition d-none d-md-block">' +
                  `<a class="nameLink${result.data[index].id} nameLink hoverOver" data-employee-id="${result.data[index].id}" data-bs-toggle="modal" data-bs-target="#editEmployeeModal">${result.data[index].email}` +
                  "</a></div>" +
                  '<div class="col-sm-3 namePosition nameFont d-none d-md-block">' +
                  `<a class="nameLink${result.data[index].id} nameLink hoverOver" data-employee-id="${result.data[index].id}" data-bs-toggle="modal" data-bs-target="#editEmployeeModal">${result.data[index].department}` +
                  "</a></div>" +
                  "</div>";

                $("#directoryData").append(employeeMarkup);

                //Edit employee modal
                $(`.nameLink${result.data[index].id}`).on("click", function () {
                  // Capturing the custom attribute data in the confirm button to be used in the edit employee confirm event handler
                  $("#editEmployeeConfirmSubmit").data(
                    "employee-id",
                    $(this).data("employee-id")
                  );

                  // Capturing the custom attribute data in the delete confirm button to be used in the delete employee confirm event handler
                  $("#deleteEmployeeConfirmSubmit").data(
                    "employee-id",
                    $(this).data("employee-id")
                  );

                  $("#editFirstName").val(result.data[index].firstName);
                  $("#editLastName").html(result.data[index].lastName);
                  $("#editJobTitle").val(result.data[index].jobTitle);
                  $("#editEmail").val(result.data[index].email);

                  // Get department id
                  let deptID;
                  let locID;

                  $.ajax({
                    type: "POST",
                    url: "libs/php/getDepartmentID.php",
                    dataType: "json",
                    data: {
                      employeeDept: result.data[index].department,
                    },

                    success: function (resultDeptID) {
                      //console.log(resultDeptID);

                      deptID = resultDeptID.data[0].id;

                      // Display the employee's department in the department dropdown
                      $.ajax({
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

                  $("#editEmployeeModal").modal("show");
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

  //Populate the directory with departments
  $("#department-tab").on("click", function () {
    $("#delete").hide();
    $("#search").hide();
    $("#directorySpace").show();

    // Search bar for department
    $("#searchBar").keyup(function () {
      let query = "";
      query = $(this).val();

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
                '<div class="col-sm-4"></div>' +
                '<div class="col-sm-1">' +
                `<div id="deptCircle" class="circle">${result.data[index].name[0]}</div>` +
                "</div>" +
                '<div class="col-sm-4 namePosition">' +
                `<a id="searchLinkDept${result.data[index].id}" class="nameLink hoverOver" data-department-id="${result.data[index].id}" data-bs-toggle="modal" data-bs-target="#editDepartmentModal">${result.data[index].name}` +
                "</a></div>" +
                "</div>";

              $("#directoryData").append(searchDepartmentMarkup);

              //Edit department modal for search bar
              $(`#searchLinkDept${result.data[index].id}`).on(
                "click",
                function () {
                  // Capturing the custom attribute data in the confirm button to be used in the edit department confirm event handler
                  $("#editDepartmentConfirmSubmit").data(
                    "department-id",
                    $(this).data("department-id")
                  );

                  // Capturing the custom attribute data in the delete confirm button to be used in the delete department confirm event handler
                  $("#deleteDepartmentConfirmSubmit").data(
                    "department-id",
                    $(this).data("department-id")
                  );

                  $.ajax({
                    type: "POST",
                    url: "libs/php/getAllLocations.php",
                    dataType: "json",

                    success: function (result) {
                      $(".deptEditLocSelectList").html("");

                      $(".deptEditLocSelectList").append(
                        "<option selected disabled>" +
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

                  $("#editDepartmentModal").modal("show");
                }
              );
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
              `<div class="col-sm-3 alignmentRight" id="horizontal${alphabetIndex}">${alphabetArray[alphabetIndex]}</div>` +
              "</div>";

            $("#directoryData").append(deptLetterMarkup);

            $.each(result.data, function (index) {
              let deptNameUpper = result.data[index].name[0].toUpperCase();

              if (deptNameUpper === alphabetArray[alphabetIndex]) {
                let deptMarkup =
                  `<div class="row" id="directoryDept${index}" >` +
                  '<div class="col-sm-3"></div>' +
                  '<div class="col-sm-1">' +
                  `<div id="deptCircle" class="circle">${result.data[index].name[0]}</div>` +
                  "</div>" +
                  '<div class="col-sm-3 namePosition">' +
                  `<a class="deptLink${result.data[index].id} nameLink hoverOver" data-department-id="${result.data[index].id}" data-bs-toggle="modal" data-bs-target="#editDepartmentModal">${result.data[index].name}` +
                  "</a></div>";

                $("#directoryData").append(deptMarkup);

                let empLoc = result.data[index].locationID;

                $("#editDeptLoc").on("change", function () {
                  empLoc = $("#editDeptLoc").val();
                });

                $.ajax({
                  url: "libs/php/getLocationName.php",
                  method: "POST",
                  dataType: "json",
                  data: {
                    employeeLocationID: empLoc,
                  },
                  success: function (resultEmployeeLocName) {
                    //console.log(resultEmployeeLocName);

                    let endMarkup =
                      '<div class="col-sm-4 namePosition">' +
                      `<a class="deptLink${result.data[index].id} nameLink hoverOver d-none d-md-block" data-department-id="${result.data[index].id}" data-location-id="${result.data[index].locationID}" data-location-name="${resultEmployeeLocName.data[0].name}"data-bs-toggle="modal" data-bs-target="#editDepartmentModal">${resultEmployeeLocName.data[0].name}` +
                      "</a></div>";

                    // Appending the location markup by row id related to index after tha ajax call
                    $(`#directoryDept${index}`).append(endMarkup);
                  },
                  error: function (jqXHR, textStatus, errorThrown) {
                    console.log("status code: " + jqXHR.status);
                    console.log("errorThrown: " + errorThrown);
                    console.log("jqXHR.responseText: " + jqXHR.responseText);
                  },
                });
              }

              //Edit department modal

              // Not able to access link within inner ajax call without $(document)
              $(document).on(
                "click",
                `.deptLink${result.data[index].id}`,
                function () {
                  // Capturing the department custom attribute data in the confirm button to be used in the edit department confirm event handler
                  $("#editDepartmentConfirmSubmit").data(
                    "department-id",
                    $(this).data("department-id")
                  );

                  // Capturing the department custom attribute data in the delete confirm button to be used in the delete department confirm event handler
                  $("#deleteDepartmentConfirmSubmit").data(
                    "department-id",
                    $(this).data("department-id")
                  );

                  //Capturing the location custom attribute data in the confirm button to be used in the edit department submit event handler
                  $("#editDepartmentSubmit").data(
                    "location-id",
                    $(this).data("location-id")
                  );

                  $.ajax({
                    type: "POST",
                    url: "libs/php/getAllLocations.php",
                    dataType: "json",

                    success: function (result) {
                      $(".deptEditLocSelectList").html("");

                      $(".deptEditLocSelectList").append(
                        "<option selected disabled>" +
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

                  $("#editDepartmentModal").modal("show");
                }
              );
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

  // Populate the directory with locations
  $("#location-tab").on("click", function () {
    $("#delete").hide();
    $("#search").hide();
    $("#directorySpace").show();

    // Search bar for location
    $("#searchBar").keyup(function () {
      let query = "";
      query = $(this).val();

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
                '<div class="col-sm-4"></div>' +
                '<div class="col-sm-1">' +
                `<div id="locCircle" class="circle">${result.data[index].name[0]}</div>` +
                "</div>" +
                '<div class="col-sm-4 namePosition">' +
                `<a id="searchLocLink${result.data[index].id}" class="nameLink hoverOver" data-location-id="${result.data[index].id}" data-bs-toggle="modal" data-bs-target="#editLocationModal">${result.data[index].name}` +
                "</a></div>" +
                "</div>";

              $("#directoryData").append(searchLocationMarkup);

              $("#editLoc").val(result.data[index].name);

              //Edit location modal for search bar
              $(`#searchLocLink${result.data[index].id}`).on(
                "click",
                function () {
                  // Capturing the custom attribute data in the confirm button to be used in the edit location confirm event handler
                  $("#editLocationConfirmSubmit").data(
                    "location-id",
                    $(this).data("location-id")
                  );

                  // Capturing the custom attribute data in the delete confirm button to be used in the delete location confirm event handler
                  $("#deleteLocationConfirmSubmit").data(
                    "location-id",
                    $(this).data("location-id")
                  );

                  $("#editLocationModal").modal("show");
                }
              );
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
              `<div class="col-sm-4 alignmentRight" id="horizontal${alphabetIndex}">${alphabetArray[alphabetIndex]}</div>` +
              "</div>";

            $("#directoryData").append(locLetterMarkup);

            $.each(result.data, function (index) {
              let locNameUpper = result.data[index].name[0].toUpperCase();

              if (locNameUpper === alphabetArray[alphabetIndex]) {
                let locMarkup =
                  '<div class="row" >' +
                  '<div class="col-sm-4"></div>' +
                  '<div class="col-sm-1">' +
                  `<div id="locCircle" class="circle">${result.data[index].name[0]}</div>` +
                  "</div>" +
                  '<div class="col-sm-4 namePosition">' +
                  `<a id="locLink${result.data[index].id}" class="nameLink hoverOver" data-location-id="${result.data[index].id}" data-bs-toggle="modal" data-bs-target="#editLocationModal">${result.data[index].name}` +
                  "</a></div>" +
                  "</div>";

                $("#directoryData").append(locMarkup);

                //Edit location modal
                $(`#locLink${result.data[index].id}`).on("click", function () {
                  // Capturing the custom attribute data in the confirm button to be used in the edit location confirm event handler
                  $("#editLocationConfirmSubmit").data(
                    "location-id",
                    $(this).data("location-id")
                  );

                  // Capturing the custom attribute data in the delete confirm button to be used in the delete location confirm event handler
                  $("#deleteLocationConfirmSubmit").data(
                    "location-id",
                    $(this).data("location-id")
                  );

                  $("#editLoc").val(result.data[index].name);

                  $("#editLocationModal").modal("show");
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

  //Create modal for personnel

  $("#plus").on("click", function () {
    $('a[data-toggle="tab"]').on("shown.bs.tab", function (e) {
      // New selected tab id
      let selectedTabId = e.target.id;
    });

    let id = $(".tab-content .active").attr("id");

    if (id === "personnel") {
      $("#createPersonnelReset").on("click", function () {
        $("#createFirstName").val("");
        $("#createLastName").val("");
        $("#createJobTitle").val("");
        $("#createEmail").val("");

        $("#createPersonnelDept").val("Select department");

        $("#createPersonnelLoc").val("Select location");
      });

      $.ajax({
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
        type: "POST",
        url: "libs/php/getAllLocations.php",
        dataType: "json",

        success: function (result) {
          $(".locSelectList").html("");

          $(".locSelectList").append(
            "<option selected disabled>" + "Select location" + "</option>"
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

      $("#createPersonnelModal").modal("show");

      $("#createPersonnelSubmit").on("click", function (event) {
        event.preventDefault();

        $("#createPersonnelModal").modal("hide");

        let email = $("#createEmail").val();
        let emailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (
          $("#createFirstName").val() === "" ||
          $("#createLastName").val() === "" ||
          $("#createEmail").val() === "" ||
          $("#createPersonnelDept").val() === ""
        ) {
          $("#createPersonnelErrorMessage").html("");
          $("#createPersonnelErrorMessage").append("Please fill all fields.");

          $("#createPersonnelErrorModal").modal("show");
        } else if (!email.match(emailformat)) {
          $("#createPersonnelErrorMessage").html("");
          $("#createPersonnelErrorMessage").append(
            "Please enter a valid email address."
          );
          $("#createPersonnelErrorModal").modal("show");
        } else {
          $("#createPersonnelConfirmModal").modal("show");
        }
      });

      $("#createPersonnelConfirmSubmit").on("click", function (event) {
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

            $("#createPersonnelSuccessModal").modal("show");

            // To stop form resubmission
            if (window.history.replaceState) {
              window.history.replaceState(null, null, window.location.href);
            }

            $("#createPersonnelSuccessModal").on(
              "hidden.bs.modal",
              function () {
                location.reload();
              }
            );
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
      $("#createDeptReset").on("click", function () {
        $("#createDeptName").val("");
        $("#createDeptLoc").val("Select location");
      });

      $.ajax({
        type: "POST",
        url: "libs/php/getAllLocations.php",
        dataType: "json",

        success: function (result) {
          $(".locSelectList").html("");

          $(".locSelectList").append(
            "<option selected disabled>" + "Select location" + "</option>"
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

      $("#createDepartmentModal").modal("show");

      $("#createDepartmentSubmit").on("click", function (event) {
        event.preventDefault();

        $("#createDepartmentModal").modal("hide");

        if ($("#createDeptName").val() === "") {
          $("#createDepartmentErrorMessage").html("");
          $("#createDepartmentErrorMessage").append(
            "Please enter a department name."
          );

          $("#createDepartmentErrorModal").modal("show");
        } else {
          $("#createDepartmentConfirmModal").modal("show");
        }
      });

      $("#createDepartmentConfirmSubmit").on("click", function (event) {
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

            $("#createDepartmentSuccessModal").modal("show");

            // To stop form resubmission
            if (window.history.replaceState) {
              window.history.replaceState(null, null, window.location.href);
            }

            $("#createDepartmentSuccessModal").on(
              "hidden.bs.modal",
              function () {
                location.reload();
              }
            );
          },
          error: function (jqXHR, textStatus, errorThrown) {
            console.log("status code: " + jqXHR.status);
            console.log("errorThrown: " + errorThrown);
            console.log("jqXHR.responseText: " + jqXHR.responseText);
          },
        });
      });
      // Create modal for location
    } else if (id === "location") {
      $("#createLocReset").on("click", function () {
        $("#createLocName").val("");
      });

      $("#createLocationModal").modal("show");

      $("#createLocationSubmit").on("click", function (event) {
        event.preventDefault();

        $("#createLocationModal").modal("hide");

        if ($("#createLocName").val() === "") {
          $("#createLocationErrorMessage").html("");
          $("#createLocationErrorMessage").append(
            "Please enter a location name."
          );

          $("#createLocationErrorModal").modal("show");
        } else {
          $("#createLocationConfirmModal").modal("show");
        }
      });

      $("#createLocationConfirmSubmit").on("click", function (event) {
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

            $("#createLocationSuccessModal").modal("show");

            // To stop form resubmission
            if (window.history.replaceState) {
              window.history.replaceState(null, null, window.location.href);
            }

            $("#createLocationSuccessModal").on("hidden.bs.modal", function () {
              location.reload();
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

  // Delete modal for personnel
  $("#delete").on("click", function () {
    $('a[data-toggle="tab"]').on("shown.bs.tab", function (e) {
      // New selected tab id
      let selectedTabId = e.target.id;
    });

    let id = $(".tab-content .active").attr("id");

    if (id === "personnel") {
      $.ajax({
        type: "POST",
        url: "libs/php/getAllPersonnel.php",
        dataType: "json",

        success: function (result) {
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
                  let deletePersonnelMarkup =
                    '<div class="row">' +
                    '<div class="col-sm-2"></div>' +
                    '<div class="col-sm-2">' +
                    `<div id="deleteCircle" class="circle">${result.data[index].firstName[0]}${result.data[index].lastName[0]}</div>` +
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

          $("#deletePersonnelModal").modal("show");
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log("status code: " + jqXHR.status);
          console.log("errorThrown: " + errorThrown);
          console.log("jqXHR.responseText: " + jqXHR.responseText);
        },
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
                let deletePersonnelSearchMarkup =
                  '<div class="row">' +
                  '<div class="col-sm-2"></div>' +
                  '<div class="col-sm-2">' +
                  `<div id="deleteSearchCircle" class="circle">${result.data[index].firstName[0]}${result.data[index].lastName[0]}</div>` +
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

                $("#deletePersonnelModal").modal("show");
              } else {
                window.localStorage.setItem("focus_on", "#deleteSearchBar");
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
    }
  });

  // Personnel search modal

  $("#search").on("click", function () {
    $('a[data-toggle="tab"]').on("shown.bs.tab", function (e) {
      // New selected tab id
      let selectedTab = e.target.id;
    });

    let searchId = $(".tab-content .active").attr("id");

    // Search modal for personnel
    if (searchId === "personnel") {
      $("#searchPersonnelReset").on("click", function () {
        $("#searchFirstName").val("");
        $("#searchLastName").val("");
        $("#searchJobTitle").val("");
        $("#searchEmail").val("");
        $("#searchDept").val("Select department");
        $("#searchLoc").val("Select location");
      });

      $.ajax({
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
        type: "POST",
        url: "libs/php/getAllLocations.php",
        dataType: "json",

        success: function (result) {
          $(".locSelectList").html("");

          $(".locSelectList").append(
            "<option selected disabled>" + "Select location" + "</option>"
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

      $("#searchPersonnelModal").modal("show");

      $("#searchPersonnelSubmit").on("click", function (event) {
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

          $("#searchPersonnelErrorModal").modal("show");
        } else {
          $("#searchPersonnelConfirmModal").modal("show");
        }
      });

      $("#searchPersonnelConfirmSubmit").on("click", function (event) {
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
                  `<div id="searchCircle" class="circle">${result.data[index].firstName[0]}${result.data[index].lastName[0]}</div>` +
                  "</div>" +
                  '<div class="col-sm-4 namePosition">' +
                  `<a id="searchNameLink${result.data[index].id}" class="nameLink" data-employee-id="${result.data[index].id}" data-bs-toggle="modal" data-bs-target="#editEmployeeModal">${result.data[index].lastName}` +
                  " " +
                  `${result.data[index].firstName}` +
                  "</a></div>" +
                  "</div>";

                $("#searchResultsData").append(searchResultsMarkup);

                $("#searchPersonnelResultsModal").modal("show");

                //Edit employee modal
                $(`#searchNameLink${result.data[index].id}`).on(
                  "click",
                  function () {
                    // Capturing the custom attribute data in the confirm button to be used in the edit employee confirm event handler
                    $("#editEmployeeConfirmSubmit").data(
                      "employee-id",
                      $(this).data("employee-id")
                    );

                    // Capturing the custom attribute data in the delete confirm button to be used in the delete employee confirm event handler
                    $("#deleteEmployeeConfirmSubmit").data(
                      "employee-id",
                      $(this).data("employee-id")
                    );

                    $("#searchPersonnelResultsModal").modal("hide");

                    $("#editFirstName").val(result.data[index].firstName);
                    $("#editLastName").html(result.data[index].lastName);
                    $("#editJobTitle").val(result.data[index].jobTitle);
                    $("#editEmail").val(result.data[index].email);

                    // Get department id
                    let deptID;
                    let locID;

                    $.ajax({
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
                                      "jqXHR.responseText: " +
                                        jqXHR.responseText
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
                        console.log(
                          "jqXHR.responseText: " + jqXHR.responseText
                        );
                      },
                    });

                    $("#editEmployeeModal").modal("show");
                  }
                );
              });
            } else {
              let searchNoMatchMarkup = '<div id="noMatch">No matches</div>';

              $("#searchResultsData").append(searchNoMatchMarkup);

              $("#searchPersonnelResultsModal").modal("show");
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
});
