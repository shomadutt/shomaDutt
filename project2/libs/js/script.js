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

    $("#editEmployeeConfirmModal").modal("show");
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

    console.log($("a").attr("data-employee-id"));

    $.ajax({
      url: "libs/php/editEmployee.php",
      method: "post",
      dataType: "text",
      data: {
        id: $("a").attr("data-employee-id"),
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

        // location.reload();
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
      //2
      type: "POST",
      url: "libs/php/deleteEmployee.php",
      dataType: "text",
      data: {
        id: $("a").attr("data-employee-id"),
      },

      success: function (resultDelete) {
        //3

        $("#deleteEmployeeSuccessMessage").html("");
        $("#deleteEmployeeSuccessMessage").append(resultDelete);
        //console.log(result);

        $("#deleteEmployeeSuccessModal").modal("show");

        // To stop form resubmission
        if (window.history.replaceState) {
          window.history.replaceState(null, null, window.location.href);
        }

        location.reload();
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

    let locName = $("#editDeptLoc").val();

    $.ajax({
      url: "libs/php/editDepartment.php",
      method: "post",
      dataType: "text",
      data: {
        id: $("a").attr("data-department-id"),
        dept: departmentName,
        loc: locName,
      },

      success: function (result) {
        console.log(result);
        $("#editDepartmentSuccessMessage").html("");
        $("#editDepartmentSuccessMessage").append(result);

        $("#editDepartmentSuccessModal").modal("show");

        // To stop form resubmission
        if (window.history.replaceState) {
          window.history.replaceState(null, null, window.location.href);
        }

        location.reload();
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
      //2
      type: "POST",
      url: "libs/php/deleteDepartment.php",
      dataType: "text",
      data: {
        deleteDept: $("a").attr("data-department-id"),
      },

      success: function (resultDeleteDept) {
        //3

        $("#deleteDepartmentSuccessMessage").html("");
        $("#deleteDepartmentSuccessMessage").append(resultDeleteDept);
        //console.log(result);

        $("#deleteDepartmentSuccessModal").modal("show");

        // To stop form resubmission
        if (window.history.replaceState) {
          window.history.replaceState(null, null, window.location.href);
        }

        location.reload();
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

    $("#editLocationConfirmModal").modal("show");
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
        id: $("a").attr("data-location-id"),
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

        location.reload();
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
      //2
      type: "POST",
      url: "libs/php/deleteLocation.php",
      dataType: "text",
      data: {
        deleteLoc: $("a").attr("data-location-id"),
      },

      success: function (resultDeleteLoc) {
        //3

        $("#deleteLocationSuccessMessage").html("");
        $("#deleteLocationSuccessMessage").append(resultDeleteLoc);
        //console.log(result);

        $("#deleteLocationSuccessModal").modal("show");

        // To stop form resubmission
        if (window.history.replaceState) {
          window.history.replaceState(null, null, window.location.href);
        }

        location.reload();
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

    $("#deletePersonnelConfirmModal").modal("show");
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
      //2
      type: "POST",
      url: "libs/php/deletePersonnelCheckList.php",
      dataType: "text",
      data: {
        checkList: checkList,
      },

      success: function (result) {
        //3

        //console.log(result);
        $("#deletePersonnelSuccessMessage").html("");
        $("#deletePersonnelSuccessMessage").append(result);

        $("#deletePersonnelSuccessModal").modal("show");

        location.reload();
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

  // Populate the directory with employees

  $("#personnel-tab").on("click", function () {
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
                '<div class="col-sm-8"></div>' +
                '<div class="col-sm-1">' +
                `<div id="circle" class="circle">${result.data[index].firstName[0]}${result.data[index].lastName[0]}</div>` +
                "</div>" +
                '<div class="col-sm-3 namePosition">' +
                `<a id="searchLinkEmployee${result.data[index].id}" class="nameLink hoverOver" data-employee-id="${result.data[index].id}" data-bs-toggle="modal" data-bs-target="#editEmployeeModal">${result.data[index].firstName}` +
                " " +
                `${result.data[index].lastName}</a>` +
                "</div>" +
                "</div>";

              $("#directoryData").append(searchEmployeeMarkup);

              //Edit employee modal for search bar
              $(`#searchLinkEmployee${result.data[index].id}`).on(
                "click",
                function () {
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
              `<div class="col-sm-8 alignmentRight" id="letterIndex">${alphabetArray[alphabetIndex]}</div>` +
              "</div>";

            let letter = $("#directoryData").append(letterMarkup);

            $.each(result.data, function (index) {
              let lastNameUpper = result.data[index].lastName[0].toUpperCase();

              if (lastNameUpper === alphabetArray[alphabetIndex]) {
                employeeMarkup =
                  '<div class="row">' +
                  '<div class="col-sm-8"></div>' +
                  '<div class="col-sm-1">' +
                  `<div id="circle" class="circle">${result.data[index].firstName[0]}${result.data[index].lastName[0]}</div>` +
                  "</div>" +
                  '<div class="col-sm-3 namePosition">' +
                  `<a id="nameLink${result.data[index].id}" class="nameLink hoverOver" data-employee-id="${result.data[index].id}" data-bs-toggle="modal" data-bs-target="#editEmployeeModal">${result.data[index].firstName}` +
                  " " +
                  `${result.data[index].lastName}</a>` +
                  "</div>" +
                  "</div>";

                letter.append(employeeMarkup);

                //Edit employee modal
                $(`#nameLink${result.data[index].id}`).on("click", function () {
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
                '<div class="col-sm-8"></div>' +
                '<div class="col-sm-1">' +
                `<div id="deptCircle" class="circle">${result.data[index].name[0]}</div>` +
                "</div>" +
                '<div class="col-sm-3 namePosition">' +
                `<a id="searchLinkDept${result.data[index].id}" class="nameLink hoverOver" data-department-id="${result.data[index].id}" data-bs-toggle="modal" data-bs-target="#editDepartmentModal">${result.data[index].name}` +
                "</div>" +
                "</div>";

              $("#directoryData").append(searchDepartmentMarkup);

              //Edit department modal for search bar
              $(`#searchLinkDept${result.data[index].id}`).on(
                "click",
                function () {
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
              `<div class="col-sm-8 alignmentRight" id="horizontal${alphabetIndex}">${alphabetArray[alphabetIndex]}</div>` +
              "</div>";

            let deptLetter = $("#directoryData").append(deptLetterMarkup);

            $.each(result.data, function (index) {
              let deptNameUpper = result.data[index].name[0].toUpperCase();

              if (deptNameUpper === alphabetArray[alphabetIndex]) {
                let deptMarkup =
                  '<div class="row" >' +
                  '<div class="col-sm-8"></div>' +
                  '<div class="col-sm-1">' +
                  `<div id="deptCircle" class="circle">${result.data[index].name[0]}</div>` +
                  "</div>" +
                  '<div class="col-sm-3 namePosition">' +
                  `<a id="deptLink${result.data[index].id}" class="nameLink hoverOver" data-department-id="${result.data[index].id}" data-bs-toggle="modal" data-bs-target="#editDepartmentModal">${result.data[index].name}` +
                  "</div>" +
                  "</div>";

                deptLetter.append(deptMarkup);

                //Edit department modal
                $(`#deptLink${result.data[index].id}`).on("click", function () {
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

                  $("#editDepartmentModal").modal("show");
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
                '<div class="col-sm-8"></div>' +
                '<div class="col-sm-1">' +
                `<div id="locCircle" class="circle">${result.data[index].name[0]}</div>` +
                "</div>" +
                '<div class="col-sm-3 namePosition">' +
                `<a id="searchLocLink${result.data[index].id}" class="nameLink hoverOver" data-location-id="${result.data[index].id}" data-bs-toggle="modal" data-bs-target="#editLocationModal">${result.data[index].name}` +
                "</div>" +
                "</div>";

              $("#directoryData").append(searchLocationMarkup);

              $("#editLoc").val(result.data[index].name);

              //Edit location modal for search bar
              $(`#searchLinkLoc${result.data[index].id}`).on(
                "click",
                function () {
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
              `<div class="col-sm-8 alignmentRight" id="horizontal${alphabetIndex}">${alphabetArray[alphabetIndex]}</div>` +
              "</div>";

            let locLetter = $("#directoryData").append(locLetterMarkup);

            $.each(result.data, function (index) {
              let locNameUpper = result.data[index].name[0].toUpperCase();

              if (locNameUpper === alphabetArray[alphabetIndex]) {
                let locMarkup =
                  '<div class="row" >' +
                  '<div class="col-sm-8"></div>' +
                  '<div class="col-sm-1">' +
                  `<div id="locCircle" class="circle">${result.data[index].name[0]}</div>` +
                  "</div>" +
                  '<div class="col-sm-3 namePosition">' +
                  `<a id="locLink${result.data[index].id}" class="nameLink hoverOver" data-location-id="${result.data[index].id}" data-bs-toggle="modal" data-bs-target="#editLocationModal">${result.data[index].name}` +
                  "</div>" +
                  "</div>";

                locLetter.append(locMarkup);

                //Edit location modal
                $(`#locLink${result.data[index].id}`).on("click", function () {
                  $("#editLoc").val(result.data[index].name);

                  $("#editLocationModal").modal("show");
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

      $("#createPersonnelModal").modal("show");

      $("#createPersonnelSubmit").on("click", function (event) {
        event.preventDefault();

        $("#createPersonnelModal").modal("hide");

        if ($("#createFirstName").val() === null) {
          $("#createPersonnelErrorMessage").html("");
          $("#createPersonnelErrorMessage").append(
            "Please enter a first name."
          );
          $("#createPersonnelErrorModal").modal("show");
        } else {
          $("#createPersonnelConfirmModal").modal("show");
        }

         

          if ($("#createLastName").val() === "") {
            $("#createPersonnelErrorMessage").html("");
            $("#createPersonnelErrorMessage").append(
              "Please enter a last name."
            );
  
          $("#createPersonnelErrorModal").modal("show");

        } else {
          $("#createPersonnelConfirmModal").modal("show");
        }

          if ($("#createEmail").val() === "") {
            $("#createPersonnelErrorMessage").html("");
            $("#createPersonnelErrorMessage").append(
              "Please enter an email address."
            );
  
          $("#createPersonnelErrorModal").modal("show");

        } else {
          $("#createPersonnelConfirmModal").modal("show");
        }



        // if($("#createFirstName").val() === "") {
        //   alert("Please enter a first name");
        //   return false;
        // }
        
        // if($("#createLastName").val() === "") {
        //   alert("Please enter a last name");
        //   return false;
        // }

        // if($("#createEmail").val() === "") {
        //   alert("Please enter an email address");
        //   return false;
        // }


        if ($("#createPersonnelDept").val() === null) {
          $("#createPersonnelErrorMessage").html("");
          $("#createPersonnelErrorMessage").append(
            "Please select a department."
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

            location.reload();
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

            location.reload();
          },
          error: function (jqXHR, textStatus, errorThrown) {
            console.log("status code: " + jqXHR.status);
            console.log("errorThrown: " + errorThrown);
            console.log("jqXHR.responseText: " + jqXHR.responseText);
          },
        });
      });
    } else if (id === "location") {
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

            location.reload();
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
                //6
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
                  `<a id="searchNameLink${result.data[index].id}" class="nameLink" data-employee-id="result.data[index].id" data-bs-toggle="modal" data-bs-target="#editEmployeeModal">${result.data[index].lastName}` +
                  " " +
                  `${result.data[index].firstName}</a>`;
                "</div>" + "</div>";


                $("#searchResultsData").append(searchResultsMarkup);

                $("#searchPersonnelResultsModal").modal("show");


                //Edit employee modal
                $(`#searchNameLink${result.data[index].id}`).on("click", function () {

                  console.log($(`#searchNameLink${result.data[index].id}`));

                  console.log($("a").attr("data-employee-id"));

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

                  $("#editEmployeeModal").modal("show");

                });
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
}); //1
