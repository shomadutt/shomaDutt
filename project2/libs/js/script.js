$(window).on("load", function () {
  // Prevents Ajax requests from being cached in the browser
  $.ajaxSetup({ cache: false });

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

    if (
      $("#editFirstName").val() === "" ||
      $("#editLastName").val() === "" ||
      $("#editEmail").val() === ""
    ) {
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

    let lastName = $("#editLastName").val();

    if (lastName !== "") {
      lastName =
        lastName[0].toUpperCase() + lastName.substring(1, lastName.length);
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
        id: $(this).data("edit-id"),
        firstName: firstName,
        lastName: lastName,
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

  // Delete employee confirm event handler

  $("#deleteEmployeeConfirmSubmit").on("click", function (event) {
    event.preventDefault();

    $("#deleteEmployeeConfirmModal").modal("hide");

    $.ajax({
      type: "POST",
      url: "libs/php/deleteEmployee.php",
      dataType: "text",
      data: {
        id: $(this).data("delete-id"),
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

    $("#editDepartmentModal").modal("hide");

    if ($("#editDepartment").val() === "") {
      $("#editDepartmentErrorMessage").html("");
      $("#editDepartmentErrorMessage").append("Please enter a department.");

      $("#editDepartmentErrorModal").modal("show");
    } else if ($("#editDeptLoc").val() === null) {
      $("#editDeptLoc").val($(this).data("location-id"));
    } else {
      $("#editDepartmentConfirmModal").modal("show");
    }
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

    $.ajax({
      url: "libs/php/editDepartment.php",
      method: "post",
      dataType: "text",
      data: {
        id: $(this).data("deptedit-id"),
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

  // Delete department confirm submit event handler

  $("#deleteDepartmentConfirmSubmit").on("click", function (event) {
    event.preventDefault();

    $("#deleteDepartmentConfirmModal").modal("hide");

    $.ajax({
      type: "POST",
      url: "libs/php/deleteDeptAllowed.php",
      dataType: "text",
      data: {
        deleteDeptAllowed: $(this).data("deptdelete-id"),
      },

      success: function (resultAllowed) {
        $("#deleteDepartmentSuccessMessage").html("");
        $("#deleteDepartmentSuccessMessage").append(resultAllowed);

        $("#deleteDepartmentSuccessModal").modal("show");

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
      $("#editLocationErrorMessage").append("Please enter a location.");

      $("#editLocationErrorModal").modal("show");
    } else if ($("#editLoc").val() === null) {
      $("#editLoc").val($(this).data("locedit-id"));
    } else {
      $("#editLocationConfirmModal").modal("show");
    }
  });

  // Edit Location confirmation event handler
  $("#editLocationConfirmSubmit").on("click", function (event) {
    event.preventDefault();

    $("#editLocationConfirmModal").modal("hide");

    let locationName = $("#editLoc").val();

    if (locationName !== "") {
      locationName =
        locationName[0].toUpperCase() +
        locationName.substring(1, locationName.length);
    }

    $.ajax({
      url: "libs/php/editLocation.php",
      method: "post",
      dataType: "text",
      data: {
        id: $(this).data("locedit-id"),
        locName: locationName,
      },

      success: function (result) {
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

  // Delete Location confirm submit event handler

  $("#deleteLocationConfirmSubmit").on("click", function (event) {
    event.preventDefault();

    $("#deleteLocationConfirmModal").modal("hide");

    $.ajax({
      type: "POST",
      url: "libs/php/deleteLocAllowed.php",
      dataType: "text",
      data: {
        deleteLocAllowed: $(this).data("locdelete-id"),
      },

      success: function (resultLocAllowed) {
        $("#deleteLocationSuccessMessage").html("");
        $("#deleteLocationSuccessMessage").append(resultLocAllowed);

        $("#deleteLocationSuccessModal").modal("show");

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
                `<div id="circle" class="circle">${result.data[index].lastName[0]}${result.data[index].firstName[0]}</div>` +
                "</div>" +
                '<div class="col-sm-2 namePosition">' +
                `${result.data[index].lastName}` +
                ", " +
                `${result.data[index].firstName}` +
                "</div>" +
                '<div class="col-sm-1">' +
                `<button type="button" class="text-white directoryButton editDeleteButton searchEmployeeEdit" id="searchEmployeeEdit${result.data[index].id}" data-edit-id="${result.data[index].id}" data-bs-toggle="modal" data-bs-target="#editEmployeeModal">Edit</button>` +
                "</div>" +
                '<div class="col-sm-1">' +
                `<button type="button" class="text-white directoryButton editDeleteButton searchEmployeeDelete" id="searchEmployeeDelete${result.data[index].id}" data-delete-id="${result.data[index].id}" data-bs-toggle="modal" data-bs-target="#deleteEmployeeConfirmModal">Delete</button>` +
                "</div>" +
                "</div>";

              $("#directoryData").append(searchEmployeeMarkup);

              // Delete employee modal for search bar
              $(`#searchEmployeeDelete${result.data[index].id}`).on(
                "click",
                function () {
                  // Capturing the custom attribute data in the delete confirm button to be used in the delete employee confirm event handler
                  $("#deleteEmployeeConfirmSubmit").data(
                    "delete-id",
                    $(this).data("delete-id")
                  );

                  $("#deleteEmployeeConfirmModal").show();
                }
              );

              //Edit employee modal for search bar
              $(`#searchEmployeeEdit${result.data[index].id}`).on(
                "click",
                function () {
                  // Capturing the custom attribute data in the confirm button to be used in the edit employee confirm event handler
                  $("#editEmployeeConfirmSubmit").data(
                    "edit-id",
                    $(this).data("edit-id")
                  );

                  $("#editFirstName").val(result.data[index].firstName);
                  $("#editLastName").val(result.data[index].lastName);
                  $("#editJobTitle").val(result.data[index].jobTitle);
                  $("#editEmail").val(result.data[index].email);

                  // Get department id
                  let deptID;

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
          $.each(result.data, function (index) {
            let lastNameUpper = result.data[index].lastName[0].toUpperCase();

            if (lastNameUpper === alphabetArray[alphabetIndex]) {
              employeeMarkup =
                '<div class="row">' +
                `<div id="employCircle" class="circle">${result.data[index].lastName[0]}${result.data[index].firstName[0]}</div>` +
                '<div class="col-sm-2 namePosition">' +
                `${result.data[index].lastName}` +
                ", " +
                `${result.data[index].firstName}` +
                " " +
                "</div>" +
                '<div class="col-sm-2 namePosition d-none d-md-block">' +
                `${result.data[index].jobTitle}` +
                "</div>" +
                '<div class="col-sm-3 namePosition d-none d-md-block">' +
                `${result.data[index].email}` +
                "</div>" +
                '<div class="col-sm-2 namePosition d-none d-md-block">' +
                `${result.data[index].department}` +
                "</div>" +
                '<div class="col-sm-1">' +
                `<button type="button" class="text-white directoryButton editDeleteButton employeeEdit" id="employeeEdit${result.data[index].id}" data-edit-id="${result.data[index].id}" data-bs-toggle="modal" data-bs-target="#editEmployeeModal">Edit</button>` +
                "</div>" +
                '<div class="col-sm-1">' +
                `<button type="button" class="text-white directoryButton editDeleteButton employeeDelete" id="employeeDelete${result.data[index].id}" data-delete-id="${result.data[index].id}" data-bs-toggle="modal" data-bs-target="#deleteEmployeeConfirmModal">Delete</button>` +
                "</div>" +
                "</div>";

              $("#directoryData").append(employeeMarkup);

              // Delete employee modal
              $(`#employeeDelete${result.data[index].id}`).on(
                "click",
                function () {
                  // Capturing the custom attribute data in the delete confirm button to be used in the delete employee confirm event handler
                  $("#deleteEmployeeConfirmSubmit").data(
                    "delete-id",
                    $(this).data("delete-id")
                  );

                  $("#deleteEmployeeConfirmModal").show();
                }
              );

              //Edit employee modal
              $(`#employeeEdit${result.data[index].id}`).on(
                "click",
                function () {
                  // Capturing the custom attribute data in the confirm button to be used in the edit employee confirm event handler
                  $("#editEmployeeConfirmSubmit").data(
                    "edit-id",
                    $(this).data("edit-id")
                  );

                  $("#editFirstName").val(result.data[index].firstName);
                  $("#editLastName").val(result.data[index].lastName);
                  $("#editJobTitle").val(result.data[index].jobTitle);
                  $("#editEmail").val(result.data[index].email);

                  // Get department id
                  let deptID;

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
  });

  //Populate the directory with departments
  $("#department-tab").on("click", function () {
    $("#search").hide();

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
                '<div class="col-sm-2 namePosition">' +
                `${result.data[index].name}` +
                "</div>" +
                '<div class="col-sm-1">' +
                `<button type="button" class="text-white directoryButton editDeleteButton searchDeptEdit" id="searchDeptEdit${result.data[index].id}" data-deptedit-id="${result.data[index].id}" data-location-id="${result.data[index].locationID}" data-bs-toggle="modal" data-bs-target="#editDepartmentModal">Edit</button>` +
                "</div>" +
                '<div class="col-sm-1">' +
                `<button type="button" class="text-white directoryButton editDeleteButton searchDeptDelete" id="searchDeptDelete${result.data[index].id}" data-deptdelete-id="${result.data[index].id}">Delete</button>` +
                "</div>" +
                "</div>";

              $("#directoryData").append(searchDepartmentMarkup);

              //Edit department modal for search bar
              $(`#searchDeptEdit${result.data[index].id}`).on(
                "click",
                function () {
                  $("#editDepartment").val(result.data[index].name);

                  $.ajax({
                    type: "POST",
                    url: "libs/php/getAllLocations.php",
                    dataType: "json",

                    success: function (resultDep) {
                      $(".deptEditLocSelectList").html("");

                      $(".deptEditLocSelectList").append(
                        "<option selected disabled>" +
                          "Select location" +
                          "</option>"
                      );

                      $.each(resultDep.data, function (indexDep) {
                        $("#editDeptLoc").val(result.data[index].locationID);

                        $(".deptEditLocSelectList").append(
                          $("<option>", {
                            value: resultDep.data[indexDep].id,
                            text: resultDep.data[indexDep].name,
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

                  // Capturing the department custom attribute data in the confirm button to be used in the edit department confirm event handler
                  $("#editDepartmentConfirmSubmit").data(
                    "deptedit-id",
                    $(this).data("deptedit-id")
                  );

                  //Capturing the location custom attribute data in the confirm button to be used in the edit department submit event handler
                  $("#editDepartmentSubmit").data(
                    "location-id",
                    $(this).data("location-id")
                  );

                  $("#editDepartmentModal").modal("show");
                }
              );

              //Delete department
              $(`#searchDeptDelete${result.data[index].id}`).on(
                "click",
                function () {
                  // Capturing the department custom attribute data in the delete confirm button to be used in the delete department confirm event handler
                  $("#deleteDepartmentConfirmSubmit").data(
                    "deptdelete-id",
                    $(this).data("deptdelete-id")
                  );

                  $.ajax({
                    type: "POST",
                    url: "libs/php/deleteDeptNotAllowed.php",
                    dataType: "text",
                    data: {
                      deleteDeptNot: result.data[index].id,
                    },

                    success: function (resultNotAllowed) {
                      //console.log(resultNotAllowed);

                      if (resultNotAllowed) {
                        $("#deleteDepartmentErrorMessage").html("");
                        $("#deleteDepartmentErrorMessage").append(
                          resultNotAllowed
                        );

                        $("#deleteDepartmentErrorModal").modal("show");
                      } else {
                        $("#deleteDepartmentConfirmModal").modal("show");
                      }
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                      console.log("status code: " + jqXHR.status);
                      console.log("errorThrown: " + errorThrown);
                      console.log("jqXHR.responseText: " + jqXHR.responseText);
                    },
                  });
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
          $.each(result.data, function (index) {
            let deptNameUpper = result.data[index].name[0].toUpperCase();

            if (deptNameUpper === alphabetArray[alphabetIndex]) {
              let deptMarkup =
                `<div class="row" id="directoryDept${index}" >` +
                '<div class="col-sm-3"></div>' +
                `<div id="deptCircle" class="circle">${result.data[index].name[0]}</div>` +
                '<div class="col-sm-2 namePosition">' +
                `${result.data[index].name}` +
                "</div>";

              $("#directoryData").append(deptMarkup);

              let empLoc = result.data[index].locationID;

              $.ajax({
                url: "libs/php/getLocationName.php",
                method: "POST",
                dataType: "json",
                data: {
                  employeeLocationID: $("#editDeptLoc").val() || empLoc,
                },
                success: function (resultEmployeeLocName) {
                  //console.log(resultEmployeeLocName);

                  let endMarkup =
                    `<div class="col-sm-2 namePosition" data-location-id="${result.data[index].locationID}">` +
                    `${resultEmployeeLocName.data[0].name}` +
                    "</div>" +
                    '<div class="col-sm-1">' +
                    `<button type="button" class="text-white directoryButton editDeleteButton deptEdit" id="deptEdit${result.data[index].id}" data-deptedit-id="${result.data[index].id}" data-location-id="${result.data[index].locationID}" data-bs-toggle="modal" data-bs-target="#editDepartmentModal">Edit</button>` +
                    "</div>" +
                    '<div class="col-sm-1">' +
                    `<button type="button" class="text-white directoryButton editDeleteButton deptDelete" id="deptDelete${result.data[index].id}" data-deptdelete-id="${result.data[index].id}">Delete</button>` +
                    "</div>" +
                    "</div>";

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

            // Not able to access link within inner ajax call without $(document)

            //Edit department modal

            $(document).on(
              "click",
              `#deptEdit${result.data[index].id}`,
              function () {
                $("#editDepartment").val(result.data[index].name);

                $.ajax({
                  type: "POST",
                  url: "libs/php/getAllLocations.php",
                  dataType: "json",

                  success: function (resultDep) {
                    $(".deptEditLocSelectList").html("");

                    $(".deptEditLocSelectList").append(
                      "<option selected disabled>" +
                        "Select location" +
                        "</option>"
                    );

                    $.each(resultDep.data, function (indexDep) {
                      $("#editDeptLoc").val(result.data[index].locationID);

                      $(".deptEditLocSelectList").append(
                        $("<option>", {
                          value: resultDep.data[indexDep].id,
                          text: resultDep.data[indexDep].name,
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

                // Capturing the department custom attribute data in the confirm button to be used in the edit department confirm event handler
                $("#editDepartmentConfirmSubmit").data(
                  "deptedit-id",
                  $(this).data("deptedit-id")
                );

                //Capturing the location custom attribute data in the confirm button to be used in the edit department submit event handler
                $("#editDepartmentSubmit").data(
                  "location-id",
                  $(this).data("location-id")
                );

                $("#editDepartmentModal").modal("show");
              }
            );

            //Delete department
            $(document).on(
              "click",
              `#deptDelete${result.data[index].id}`,
              function () {
                // Capturing the department custom attribute data in the delete confirm button to be used in the delete department confirm event handler
                $("#deleteDepartmentConfirmSubmit").data(
                  "deptdelete-id",
                  $(this).data("deptdelete-id")
                );

                $.ajax({
                  type: "POST",
                  url: "libs/php/deleteDeptNotAllowed.php",
                  dataType: "text",
                  data: {
                    deleteDeptNot: result.data[index].id,
                  },

                  success: function (resultNotAllowed) {
                    //console.log(resultNotAllowed);

                    if (resultNotAllowed) {
                      $("#deleteDepartmentErrorMessage").html("");
                      $("#deleteDepartmentErrorMessage").append(
                        resultNotAllowed
                      );

                      $("#deleteDepartmentErrorModal").modal("show");
                    } else {
                      $("#deleteDepartmentConfirmModal").modal("show");
                    }
                  },
                  error: function (jqXHR, textStatus, errorThrown) {
                    console.log("status code: " + jqXHR.status);
                    console.log("errorThrown: " + errorThrown);
                    console.log("jqXHR.responseText: " + jqXHR.responseText);
                  },
                });
              }
            );
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

  // Populate the directory with locations
  $("#location-tab").on("click", function () {
    $("#search").hide();

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
                '<div class="col-sm-1 namePosition">' +
                `${result.data[index].name}` +
                "</div>" +
                '<div class="col-sm-1">' +
                `<button type="button" class="text-white directoryButton editDeleteButton searchLocEdit" id="searchLocEdit${result.data[index].id}" data-locedit-id="${result.data[index].id}" data-bs-toggle="modal" data-bs-target="#editLocationModal">Edit</button>` +
                "</div>" +
                '<div class="col-sm-1">' +
                `<button type="button" class="text-white directoryButton editDeleteButton searchLocDelete" id="searchLocDelete${result.data[index].id}" data-locdelete-id="${result.data[index].id}">Delete</button>` +
                "</div>" +
                "</div>";

              $("#directoryData").append(searchLocationMarkup);

              $("#editLoc").val(result.data[index].name);

              //Edit location modal for search bar
              $(`#searchLocEdit${result.data[index].id}`).on(
                "click",
                function () {
                  $("#editLoc").val(result.data[index].name);

                  // Capturing the location custom attribute data in the confirm button to be used in the edit location confirm event handler
                  $("#editLocationConfirmSubmit").data(
                    "locedit-id",
                    $(this).data("locedit-id")
                  );

                  $("#editLocationModal").modal("show");
                }
              );

              //Delete location modal for search bar
              $(`#searchLocDelete${result.data[index].id}`).on(
                "click",
                function () {
                  // Capturing the location custom attribute data in the delete confirm button to be used in the delete location confirm event handler
                  $("#deleteLocationConfirmSubmit").data(
                    "locdelete-id",
                    $(this).data("locdelete-id")
                  );

                  $.ajax({
                    type: "POST",
                    url: "libs/php/deleteLocNotAllowed.php",
                    dataType: "text",
                    data: {
                      deleteLocNot: result.data[index].id,
                    },

                    success: function (resultLocNotAllowed) {
                      //console.log(resultLocNotAllowed);

                      if (resultLocNotAllowed) {
                        $("#deleteLocationErrorMessage").html("");
                        $("#deleteLocationErrorMessage").append(
                          resultLocNotAllowed
                        );

                        $("#deleteLocationErrorModal").modal("show");
                      } else {
                        $("#deleteLocationConfirmModal").modal("show");
                      }
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                      console.log("status code: " + jqXHR.status);
                      console.log("errorThrown: " + errorThrown);
                      console.log("jqXHR.responseText: " + jqXHR.responseText);
                    },
                  });
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
          $.each(result.data, function (index) {
            let locNameUpper = result.data[index].name[0].toUpperCase();

            if (locNameUpper === alphabetArray[alphabetIndex]) {
              let locMarkup =
                '<div class="row" >' +
                '<div class="col-sm-4"></div>' +
                `<div id="locCircle" class="circle">${result.data[index].name[0]}</div>` +
                '<div class="col-sm-2 namePosition">' +
                `${result.data[index].name}` +
                "</div>" +
                '<div class="col-sm-1">' +
                `<button type="button" class="text-white directoryButton editDeleteButton locEdit" id="locEdit${result.data[index].id}" data-locedit-id="${result.data[index].id}" data-bs-toggle="modal" data-bs-target="#editLocationModal">Edit</button>` +
                "</div>" +
                '<div class="col-sm-1">' +
                `<button type="button" class="text-white directoryButton editDeleteButton locDelete" id="locDelete${result.data[index].id}" data-locdelete-id="${result.data[index].id}">Delete</button>` +
                "</div>" +
                "</div>";

              $("#directoryData").append(locMarkup);

              //Edit location modal
              $(`#locEdit${result.data[index].id}`).on("click", function () {
                $("#editLoc").val(result.data[index].name);

                // Capturing the location custom attribute data in the confirm button to be used in the edit location confirm event handler
                $("#editLocationConfirmSubmit").data(
                  "locedit-id",
                  $(this).data("locedit-id")
                );

                $("#editLocationModal").modal("show");
              });

              //Delete location modal
              $(`#locDelete${result.data[index].id}`).on("click", function () {
                // Capturing the location custom attribute data in the delete confirm button to be used in the delete location confirm event handler
                $("#deleteLocationConfirmSubmit").data(
                  "locdelete-id",
                  $(this).data("locdelete-id")
                );

                $.ajax({
                  type: "POST",
                  url: "libs/php/deleteLocNotAllowed.php",
                  dataType: "text",
                  data: {
                    deleteLocNot: result.data[index].id,
                  },

                  success: function (resultLocNotAllowed) {
                    //console.log(resultLocNotAllowed);

                    if (resultLocNotAllowed) {
                      $("#deleteLocationErrorMessage").html("");
                      $("#deleteLocationErrorMessage").append(
                        resultLocNotAllowed
                      );

                      $("#deleteLocationErrorModal").modal("show");
                    } else {
                      $("#deleteLocationConfirmModal").modal("show");
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

      $("#createPersonnelModal").modal("show");

      $("#createPersonnelSubmit").on("click", function (event) {
        event.preventDefault();

        $("#createPersonnelModal").modal("hide");

        $("#createPersonnelConfirmModal").modal("show");
        
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

          $("#createDepartmentConfirmModal").modal("show");
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

          $("#createLocationConfirmModal").modal("show");
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


  // Personnel search modal

  $("#search").on("click", function () {
    $('a[data-toggle="tab"]').on("shown.bs.tab", function (e) {
      // New selected tab id
      let selectedTab = e.target.id;
    });

    let searchId = $(".tab-content .active").attr("id");

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
                  '<div class="col-sm-1"></div>' +
                  '<div class="col-sm-2">' +
                  `<div id="searchCircle" class="circle">${result.data[index].firstName[0]}${result.data[index].lastName[0]}</div>` +
                  "</div>" +
                  '<div class="col-sm-4 namePosition">' +
                  `${result.data[index].firstName}` +
                  " " +
                  `${result.data[index].lastName}` +
                  "</div>" +
                  '<div class="col-sm-2">' +
                  `<button type="button" class="text-white directoryButton editDeleteButton searchPersEdit" id="searchPersEdit${result.data[index].id}" data-edit-id="${result.data[index].id}" data-bs-toggle="modal" data-bs-target="#editEmployeeModal">Edit</button>` +
                  "</div>" +
                  '<div class="col-sm-1">' +
                  `<button type="button" class="text-white directoryButton editDeleteButton searchPersDelete" id="searchPersDelete${result.data[index].id}" data-delete-id="${result.data[index].id}" data-bs-toggle="modal" data-bs-target="#deleteEmployeeConfirmModal">Delete</button>` +
                  "</div>" +
                  "</div>";

                $("#searchResultsData").append(searchResultsMarkup);

                $("#searchPersonnelResultsModal").modal("show");

                // Delete employee modal for search button
                $(`#searchPersDelete${result.data[index].id}`).on(
                  "click",
                  function () {
                    $("#searchPersonnelResultsModal").modal("hide");

                    // Capturing the custom attribute data in the delete confirm button to be used in the delete employee confirm event handler
                    $("#deleteEmployeeConfirmSubmit").data(
                      "delete-id",
                      $(this).data("delete-id")
                    );

                    $("#deleteEmployeeConfirmModal").show();
                  }
                );

                //Edit employee modal for search bar
                $(`#searchPersEdit${result.data[index].id}`).on(
                  "click",
                  function () {
                    // Capturing the custom attribute data in the confirm button to be used in the edit employee confirm event handler
                    $("#editEmployeeConfirmSubmit").data(
                      "edit-id",
                      $(this).data("edit-id")
                    );

                    $("#searchPersonnelResultsModal").modal("hide");

                    $("#editFirstName").val(result.data[index].firstName);
                    $("#editLastName").val(result.data[index].lastName);
                    $("#editJobTitle").val(result.data[index].jobTitle);
                    $("#editEmail").val(result.data[index].email);

                    // Get department id
                    let deptID;

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
