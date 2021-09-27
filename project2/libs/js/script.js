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

  // Create a user id
  const uniqueId = () => {
    const dateString = Date.now().toString(36);
    const randomness = Math.random().toString(36).substr(2);
    return dateString + randomness;
  };

  let empUserID;
  let deptUserID;
  let deptLocUserID;
  let locUserID;

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
        id: empUserID,
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
      $("#editDeptLoc").val(deptLocUserID);
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
        id: deptUserID,
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
      $("#editLoc").val(locUserID);
    } else {
      $("#editLocationConfirmModal").modal("show");
    }
  });

  // Edit location confirmation event handler
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
        id: locUserID,
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
      $("#directoryData").html("");

      let queryEmp = "";
      queryEmp = $(this).val();

      $.ajax({
        url: "libs/php/searchBarEmployee.php",
        method: "POST",
        dataType: "json",
        data: {
          query: queryEmp,
        },
        success: function (result) {
          //console.log(result);

          $("#directoryData").html("");

          $.each(result.data, function (index) {
            if (queryEmp != "") {
              let searchEmployeeMarkup =
                '<table class="table table-borderless" id="searchEmpTable">' +
                "<tbody>" +
                "<tr>" +
                '<td id="searchEmpCircleCol">' +
                `<div id="searchEmpCircle" class="circle">${result.data[index].lastName[0]}${result.data[index].firstName[0]}</div>` +
                "</td>" +
                '<td id="searchEmpNameCol">' +
                '<div id="searchEmpName" class="namePosition">' +
                `${result.data[index].lastName}` +
                ", " +
                `${result.data[index].firstName}` +
                " " +
                "</div>" +
                "</td>" +
                '<td id="searchEmpEditCol">' +
                '<div id="searchEmpEditMove">' +
                `<button type="button" class="text-white directoryButton editDeleteButton searchEmployeeEdit" id="searchEmployeeEdit${result.data[index].id}" data-bs-toggle="modal" data-bs-target="#editEmployeeModal">Edit</button>` +
                "</div>" +
                "</td>" +
                '<td id="searchEmpDeleteCol">' +
                '<div id="searchEmpDeleteMove">' +
                `<button type="button" class="text-white directoryButton editDeleteButton searchEmployeeDelete" id="searchEmployeeDelete${result.data[index].id}" data-delete-id="${result.data[index].id}" data-bs-toggle="modal" data-bs-target="#deleteEmployeeConfirmModal">Delete</button>` +
                "</div>" +
                "</td>" +
                "</tr>" +
                "</tbody>" +
                "</table>";

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
                  // Create a user id
                  const searchEmployeeUserID = uniqueId();

                  // Retrieve current database values

                  $.ajax({
                    type: "POST",
                    url: "libs/php/getAllEmployeeUserID.php",
                    dataType: "json",
                    data: {
                      employeeUserID: searchEmployeeUserID,
                    },

                    success: function (resultSearchEmpUserID) {
                      //console.log(resultSearchEmpUserID);

                      $.each(
                        resultSearchEmpUserID.data,
                        function (indexEmpSearchUserID) {
                          if (
                            result.data[index].id ===
                            resultSearchEmpUserID.data[indexEmpSearchUserID].id
                          ) {
                            $("#editFirstName").val(
                              resultSearchEmpUserID.data[indexEmpSearchUserID]
                                .firstName
                            );
                            $("#editLastName").val(
                              resultSearchEmpUserID.data[indexEmpSearchUserID]
                                .lastName
                            );
                            $("#editJobTitle").val(
                              resultSearchEmpUserID.data[indexEmpSearchUserID]
                                .jobTitle
                            );
                            $("#editEmail").val(
                              resultSearchEmpUserID.data[indexEmpSearchUserID]
                                .email
                            );

                            empUserID =
                              resultSearchEmpUserID.data[indexEmpSearchUserID]
                                .id;

                            // Get department id
                            let deptID;

                            $.ajax({
                              type: "POST",
                              url: "libs/php/getDepartmentID.php",
                              dataType: "json",
                              data: {
                                employeeDept:
                                  resultSearchEmpUserID.data[
                                    indexEmpSearchUserID
                                  ].department,
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
                                      $(".deptEditSelectList").append(
                                        $("<option>", {
                                          value: resultDept.data[index].id,
                                          text: resultDept.data[index].name,
                                        })
                                      );

                                      $("#editEmployeeDept").val(deptID);
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
                        }
                      );
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
                '<table class="table table-borderless" id="empTable">' +
                "<tbody>" +
                "<tr>" +
                '<td id="empCircleCol">' +
                `<div id="empCircle" class="circle">${result.data[index].lastName[0]}${result.data[index].firstName[0]}</div>` +
                "</td>" +
                '<td id="empNameCol">' +
                '<div class="namePosition" id="empName">' +
                `${result.data[index].lastName}` +
                ", " +
                `${result.data[index].firstName}` +
                " " +
                "</div>" +
                "</td>" +
                '<td id="empJobCol">' +
                '<div id="empJob" class="namePosition d-none d-md-block">' +
                `${result.data[index].jobTitle}` +
                "</div>" +
                "</td>" +
                '<td id="empEmailCol">' +
                '<div id="empEmail" class="namePosition d-none d-lg-block" id="emailMove">' +
                `${result.data[index].email}` +
                "</div>" +
                "</td>" +
                '<td id="empDeptCol">' +
                '<div id="empDept" class="namePosition d-none d-md-block">' +
                `${result.data[index].department}` +
                "</div>" +
                "</td>" +
                '<td id="empEditCol">' +
                '<div id="empEditMove">' +
                `<button type="button" class="text-white directoryButton editDeleteButton employeeEdit" id="employeeEdit${result.data[index].id}" data-bs-toggle="modal" data-bs-target="#editEmployeeModal">Edit</button>` +
                "</div>" +
                "</td>" +
                '<td id="empDeleteCol">' +
                '<div id="empDeleteMove">' +
                `<button type="button" class="text-white directoryButton editDeleteButton employeeDelete" id="employeeDelete${result.data[index].id}" data-delete-id="${result.data[index].id}" data-bs-toggle="modal" data-bs-target="#deleteEmployeeConfirmModal">Delete</button>` +
                "</div>" +
                "</td>" +
                "</tr>" +
                "</tbody>" +
                "</table>";

              $("#directoryData").append(employeeMarkup);

              // Delete employee modal
              $(`#employeeDelete${result.data[index].id}`).on(
                "click",
                function () {
                  //Capturing the custom attribute data in the delete confirm button to be used in the delete employee confirm event handler
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
                  // Create a user id
                  const employeeUserID = uniqueId();

                  // Retrieve current database values

                  $.ajax({
                    type: "POST",
                    url: "libs/php/getAllEmployeeUserID.php",
                    dataType: "json",
                    data: {
                      employeeUserID: employeeUserID,
                    },

                    success: function (resultEmpUserID) {
                      //console.log(resultEmpUserID);

                      $.each(resultEmpUserID.data, function (indexEmpUserID) {
                        if (
                          result.data[index].id ===
                          resultEmpUserID.data[indexEmpUserID].id
                        ) {
                          $("#editFirstName").val(
                            resultEmpUserID.data[indexEmpUserID].firstName
                          );
                          $("#editLastName").val(
                            resultEmpUserID.data[indexEmpUserID].lastName
                          );
                          $("#editJobTitle").val(
                            resultEmpUserID.data[indexEmpUserID].jobTitle
                          );
                          $("#editEmail").val(
                            resultEmpUserID.data[indexEmpUserID].email
                          );

                          empUserID = resultEmpUserID.data[indexEmpUserID].id;

                          // Get department id
                          let deptID;

                          $.ajax({
                            type: "POST",
                            url: "libs/php/getDepartmentID.php",
                            dataType: "json",
                            data: {
                              employeeDept:
                                resultEmpUserID.data[indexEmpUserID].department,
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
                                    $(".deptEditSelectList").append(
                                      $("<option>", {
                                        value: resultDept.data[index].id,
                                        text: resultDept.data[index].name,
                                      })
                                    );

                                    $("#editEmployeeDept").val(deptID);
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
      $("#directoryData").html("");

      let queryDept = "";
      queryDept = $(this).val();

      $.ajax({
        url: "libs/php/searchBarDept.php",
        method: "POST",
        dataType: "json",
        data: {
          query: queryDept,
        },
        success: function (result) {
          //console.log(result);

          $("#directoryData").html("");

          $.each(result.data, function (index) {
            if (queryDept != "") {
              let searchDepartmentMarkup =
                '<table class="table table-borderless" id="searchDeptTable">' +
                "<tbody>" +
                "<tr>" +
                '<td id="searchDeptCircleCol">' +
                `<div id="searchDeptCircle" class="circle">${result.data[index].name[0]}</div>` +
                "</td>" +
                '<td id="searchDeptNameCol">' +
                '<div id="searchDeptName" class="namePosition">' +
                `${result.data[index].name}` +
                "</div>" +
                "</td>" +
                '<td id="searchDeptEditCol">' +
                '<div id="searchDeptEditMove">' +
                `<button type="button" class="text-white directoryButton editDeleteButton searchDeptEdit" id="searchDeptEdit${result.data[index].id}" data-bs-toggle="modal" data-bs-target="#editDepartmentModal">Edit</button>` +
                "</div>" +
                "</td>" +
                '<td id="searchDeptDeleteCol">' +
                '<div id="searchDeptDeleteMove">' +
                `<button type="button" class="text-white directoryButton editDeleteButton searchDeptDelete" id="searchDeptDelete${result.data[index].id}" data-deptdelete-id="${result.data[index].id}">Delete</button>` +
                "</div>" +
                "</td>" +
                "</tr>" +
                "</tbody>" +
                "</table>";

              $("#directoryData").append(searchDepartmentMarkup);

              //Edit department modal for search bar
              $(`#searchDeptEdit${result.data[index].id}`).on(
                "click",
                function () {
                  // Create a user id
                  const searchDepartmentUserID = uniqueId();

                  // Retrieve current database values

                  $.ajax({
                    type: "POST",
                    url: "libs/php/getAllDepartmentUserID.php",
                    dataType: "json",
                    data: {
                      departmentUserID: searchDepartmentUserID,
                    },

                    success: function (resultSearchDeptUserID) {
                      // console.log(resultSearchDeptUserID);

                      $.each(
                        resultSearchDeptUserID.data,
                        function (indexDepSearchUserID) {
                          if (
                            result.data[index].id ===
                            resultSearchDeptUserID.data[indexDepSearchUserID].id
                          ) {
                            $("#editDepartment").val(
                              resultSearchDeptUserID.data[indexDepSearchUserID]
                                .name
                            );

                            deptUserID =
                              resultSearchDeptUserID.data[indexDepSearchUserID]
                                .id;
                            deptLocUserID =
                              resultSearchDeptUserID.data[indexDepSearchUserID]
                                .locationID;

                            $.ajax({
                              type: "POST",
                              url: "libs/php/getAllLocations.php",
                              dataType: "json",

                              success: function (resultDep) {
                                //console.log(resultDep);

                                $(".deptEditLocSelectList").html("");

                                $.each(resultDep.data, function (indexDep) {
                                  $(".deptEditLocSelectList").append(
                                    $("<option>", {
                                      value: resultDep.data[indexDep].id,
                                      text: resultDep.data[indexDep].name,
                                    })
                                  );

                                  $("#editDeptLoc").val(
                                    resultSearchDeptUserID.data[
                                      indexDepSearchUserID
                                    ].locationID
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
                          }
                        }
                      );
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                      console.log("status code: " + jqXHR.status);
                      console.log("errorThrown: " + errorThrown);
                      console.log("jqXHR.responseText: " + jqXHR.responseText);
                    },
                  });

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
                '<table class="table table-borderless" id="deptTable">' +
                "<tbody>" +
                `<tr id="directoryDept${index}">` +
                '<td id="deptCircleCol">' +
                `<div id="deptCircle" class="circle">${result.data[index].name[0]}</div>` +
                "</td>" +
                '<td id="deptNameCol">' +
                `<div id="deptName" class="namePosition">` +
                `${result.data[index].name}` +
                "</div>" +
                "</td>";

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
                    '<td id="deptLocNameCol">' +
                    `<div id="deptLocName" class="namePosition d-none d-md-block">` +
                    `${resultEmployeeLocName.data[0].name}` +
                    "</div>" +
                    "</td>" +
                    '<td id="deptEditCol">' +
                    '<div id="deptEditMove">' +
                    `<button type="button" class="text-white directoryButton editDeleteButton deptEdit" id="deptEdit${result.data[index].id}" data-bs-toggle="modal" data-bs-target="#editDepartmentModal">Edit</button>` +
                    "</div>" +
                    "</td>" +
                    '<td id="deptDeleteCol">' +
                    '<div id="deptDeleteMove">' +
                    `<button type="button" class="text-white directoryButton editDeleteButton deptDelete" id="deptDelete${result.data[index].id}" data-deptdelete-id="${result.data[index].id}">Delete</button>` +
                    "</div>" +
                    "</td>" +
                    "</tr>" +
                    "</tbody>" +
                    "</table>";

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
                // Create a user id
                const departmentUserID = uniqueId();

                // Retrieve current database values

                $.ajax({
                  type: "POST",
                  url: "libs/php/getAllDepartmentUserID.php",
                  dataType: "json",
                  data: {
                    departmentUserID: departmentUserID,
                  },

                  success: function (resultDeptUserID) {
                    // console.log(resultDeptUserID);

                    $.each(resultDeptUserID.data, function (indexDepUserID) {
                      if (
                        result.data[index].id ===
                        resultDeptUserID.data[indexDepUserID].id
                      ) {
                        $("#editDepartment").val(
                          resultDeptUserID.data[indexDepUserID].name
                        );

                        deptUserID = resultDeptUserID.data[indexDepUserID].id;
                        deptLocUserID =
                          resultDeptUserID.data[indexDepUserID].locationID;

                        $.ajax({
                          type: "POST",
                          url: "libs/php/getAllLocations.php",
                          dataType: "json",

                          success: function (resultDep) {
                            //console.log(resultDep);

                            $(".deptEditLocSelectList").html("");

                            $.each(resultDep.data, function (indexDep) {
                              $(".deptEditLocSelectList").append(
                                $("<option>", {
                                  value: resultDep.data[indexDep].id,
                                  text: resultDep.data[indexDep].name,
                                })
                              );

                              $("#editDeptLoc").val(
                                resultDeptUserID.data[indexDepUserID].locationID
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
                      }
                    });
                  },
                  error: function (jqXHR, textStatus, errorThrown) {
                    console.log("status code: " + jqXHR.status);
                    console.log("errorThrown: " + errorThrown);
                    console.log("jqXHR.responseText: " + jqXHR.responseText);
                  },
                });

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

    $("#directoryData").html("");

    // Search bar for location
    $("#searchBar").keyup(function () {
      let queryLoc = "";
      queryLoc = $(this).val();

      $.ajax({
        url: "libs/php/searchBarLoc.php",
        method: "POST",
        dataType: "json",
        data: {
          query: queryLoc,
        },
        success: function (result) {
          //console.log(result);

          $("#directoryData").html("");

          $.each(result.data, function (index) {
            if (queryLoc != "") {
              let searchLocationMarkup =
                '<table class="table table-borderless" id="searchLocTable">' +
                "<tbody>" +
                "<tr>" +
                '<td id="searchLocCircleCol">' +
                `<div id="searchLocCircle" class="circle">${result.data[index].name[0]}</div>` +
                "</td>" +
                '<td id="searchLocNameCol">' +
                '<div id="searchLocName" class="namePosition">' +
                `${result.data[index].name}` +
                "</div>" +
                "</td>" +
                '<td id="searchLocEditCol">' +
                '<div id="searchLocEditMove">' +
                `<button type="button" class="text-white directoryButton editDeleteButton searchLocEdit" id="searchLocEdit${result.data[index].id}" data-bs-toggle="modal" data-bs-target="#editLocationModal">Edit</button>` +
                "</div>" +
                "</td>" +
                '<td id="searchLocDeleteCol">' +
                '<div id="searchLocDeleteMove">' +
                `<button type="button" class="text-white directoryButton editDeleteButton searchLocDelete" id="searchLocDelete${result.data[index].id}">Delete</button>` +
                "</div>" +
                "</td>" +
                "</tr>" +
                "</tbody>" +
                "</table>";

              $("#directoryData").append(searchLocationMarkup);

              $("#editLoc").val(result.data[index].name);

              //Edit location modal for search bar
              $(`#searchLocEdit${result.data[index].id}`).on(
                "click",
                function () {
                  // Create a user id
                  const searchLocUserID = uniqueId();

                  // Retrieve current database values

                  $.ajax({
                    type: "POST",
                    url: "libs/php/getAllLocationUserID.php",
                    dataType: "json",
                    data: {
                      locationUserID: searchLocUserID,
                    },

                    success: function (resultSearchLocUserID) {
                      //console.log(resultSearchLocUserID);

                      $.each(
                        resultSearchLocUserID.data,
                        function (indexLocSearchUserID) {
                          if (
                            result.data[index].id ===
                            resultSearchLocUserID.data[indexLocSearchUserID].id
                          ) {
                            $("#editLoc").val(
                              resultSearchLocUserID.data[indexLocSearchUserID]
                                .name
                            );

                            locUserID =
                              resultSearchLocUserID.data[indexLocSearchUserID]
                                .id;
                          }
                        }
                      );
                    },

                    error: function (jqXHR, textStatus, errorThrown) {
                      console.log("status code: " + jqXHR.status);
                      console.log("errorThrown: " + errorThrown);
                      console.log("jqXHR.responseText: " + jqXHR.responseText);
                    },
                  });

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
                '<table class="table table-borderless" id="locTable">' +
                "<tbody>" +
                "<tr>" +
                '<td id="locCircleCol">' +
                `<div id="locCircle" class="circle">${result.data[index].name[0]}</div>` +
                "</td>" +
                '<td id="locNameCol">' +
                '<div id="locName" class="namePosition">' +
                `${result.data[index].name}` +
                "</div>" +
                "</td>" +
                '<td id="locEditCol">' +
                '<div id="locEditMove">' +
                `<button type="button" class="text-white directoryButton editDeleteButton locEdit" id="locEdit${result.data[index].id}" data-locedit-id="${result.data[index].id}" data-bs-toggle="modal" data-bs-target="#editLocationModal">Edit</button>` +
                "</div>" +
                "</td>" +
                '<td id="locDeleteCol">' +
                '<div id="locDeleteMove">' +
                `<button type="button" class="text-white directoryButton editDeleteButton locDelete" id="locDelete${result.data[index].id}" data-locdelete-id="${result.data[index].id}">Delete</button>` +
                "</div>" +
                "</td>" +
                "</tr>" +
                "</tbody>" +
                "</table>";

              $("#directoryData").append(locMarkup);

              //Edit location modal
              $(`#locEdit${result.data[index].id}`).on("click", function () {
                // Create a user id
                const locationUserID = uniqueId();

                // Retrieve current database values

                $.ajax({
                  type: "POST",
                  url: "libs/php/getAllLocationUserID.php",
                  dataType: "json",
                  data: {
                    locationUserID: locationUserID,
                  },

                  success: function (resultLocUserID) {
                    //console.log(resultLocUserID);

                    $.each(resultLocUserID.data, function (indexLocUserID) {
                      if (
                        result.data[index].id ===
                        resultLocUserID.data[indexLocUserID].id
                      ) {
                        $("#editLoc").val(
                          resultLocUserID.data[indexLocUserID].name
                        );

                        locUserID = resultLocUserID.data[indexLocUserID].id;
                      }
                    });
                  },

                  error: function (jqXHR, textStatus, errorThrown) {
                    console.log("status code: " + jqXHR.status);
                    console.log("errorThrown: " + errorThrown);
                    console.log("jqXHR.responseText: " + jqXHR.responseText);
                  },
                });

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
          $("#searchPersonnelErrorMessage").append("Please type in a field.");

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
                  `<button type="button" class="text-white directoryButton editDeleteButton searchPersEdit" id="searchPersEdit${result.data[index].id}" data-bs-toggle="modal" data-bs-target="#editEmployeeModal">Edit</button>` +
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

                //Edit employee modal 
                $(`#searchPersEdit${result.data[index].id}`).on(
                  "click",
                  function () {
                    $("#searchPersonnelResultsModal").modal("hide");

                    // Create a user id
                    const personnelUserID = uniqueId();

                    // Retrieve current database values

                    $.ajax({
                      type: "POST",
                      url: "libs/php/getAllEmployeeUserID.php",
                      dataType: "json",
                      data: {
                        employeeUserID: personnelUserID,
                      },

                      success: function (resultPersonnelUserID) {
                        //console.log(resultPersonnelUserID);

                        $.each(resultPersonnelUserID.data, function (indexPersonnelUserID) {
                          if (
                            result.data[index].id ===
                            resultPersonnelUserID.data[indexPersonnelUserID].id
                          ) {
                            $("#editFirstName").val(
                              resultPersonnelUserID.data[indexPersonnelUserID].firstName
                            );
                            $("#editLastName").val(resultPersonnelUserID.data[indexPersonnelUserID].lastName);
                            $("#editJobTitle").val(resultPersonnelUserID.data[indexPersonnelUserID].jobTitle);
                            $("#editEmail").val(resultPersonnelUserID.data[indexPersonnelUserID].email);

                            empUserID = resultPersonnelUserID.data[indexPersonnelUserID].id;

                            // Get department id
                            let deptID;

                            $.ajax({
                              type: "POST",
                              url: "libs/php/getDepartmentID.php",
                              dataType: "json",
                              data: {
                                employeeDept: resultPersonnelUserID.data[indexPersonnelUserID].department,
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
