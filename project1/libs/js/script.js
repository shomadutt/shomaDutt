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

  // Create the text "Select a country" in the dropdown
  $("#selectCountry").append("<option>" + " Select a country " + "</option>");
  //6

  if ("geolocation" in navigator) {
    //2

    navigator.geolocation.getCurrentPosition(function (position) {
      //3

      let userLat = position.coords.latitude;
      let userLng = position.coords.longitude;

      // console.log(userLat);
      // console.log(userLng);

      let map = L.map("map").setView([userLat, userLng], 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // // Add an icon for the user location

      let greenIcon = L.icon({
        iconUrl: "https://shomadutt.com/project1/libs/Leaflet/images/globe.png",
        shadowUrl:
          "https://shomadutt.com/project1/libs/Leaflet/images/shadow.png",

        iconSize: [60, 95], // size of the icon
        shadowSize: [50, 64], // size of the shadow
        iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62], // the same for the shadow
        popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
      });

      L.marker([userLat, userLng], { icon: greenIcon }).addTo(map);

      
      // Get iso code of user from Opencage
      $.ajax({
        //4
        url: "libs/php/getOpenCage.php",
        type: "POST",
        dataType: "json",
        data: {
          q: String(userLat) + "," + String(userLng),
        },
        success: function (resultCage) {
          //5
          //console.log(JSON.stringify(result));

          if (resultCage.status.name == "ok") {
            //6
            //console.log(resultCage["data"].results[0].components.country_code);

            // Add the border for the user's country
            $.ajax({
              //7

              url: "libs/php/getCountryBorders.php",
              type: "POST",
              dataType: "json",
              data: "{}",

              success: function (resultCountry) {
                //8

                JSON.stringify(resultCountry);

                //console.log(JSON.stringify(result));

                if (resultCountry.status.name == "ok") {
                  //9
                  for (let i = 0; i < resultCountry.data.length; i++) {
                    //
                    if (
                      resultCountry.data[i].properties.iso_a2 ===
                      resultCage[
                        "data"
                      ].results[0].components.country_code.toUpperCase()
                    ) {
                      L.geoJSON(
                        resultCountry.data[i].geometry
                      ).addTo(map);

                    }
                    //}

                    $("#selectCountry").append(
                      `<option value = "${resultCountry.data[i].properties.iso_a2}">` +
                        resultCountry.data[i].properties.name +
                        "</option>"
                    );

                    // Select country from dropdown and add the border and holiday information
                    $("#selectHolidayInfo").click(function () {

                      map.removeLayer(L.geoJSON(
                        resultCountry.data[i].geometry
                      ));
                      
                      if (
                        $("#selectCountry").val() ===
                        resultCountry.data[i].properties.iso_a2
                      ) {
                        L.geoJSON(resultCountry.data[i].geometry).addTo(map);
                        
                      }
                    });
                  }
                } //9
              }, //8
            }); //7
          } //6
        }, //5
      }); //4
    }); //3
  } //2
}); //1

// // Select dropdown

// // Create the text "Select a country" in the dropdown
// $("#selectCountry").append("<option>" + " Select a country " + "</option>");

// // Fill the dropdown with countries
// $.ajax({
//   // 4
//   url: "libs/php/getCountryBorders.php",
//   type: "POST",
//   dataType: "json",
//   data: "{}",

//   success: function (result) {
//     //5

//     JSON.stringify(result);

//     //console.log(JSON.stringify(result));

//     if (result.status.name == "ok") {
//       //6
//       for (let i = 0; i < result.data.length; i++) {
//         //7

//         $("#selectCountry").append(
//           `<option value = "${result.data[i].properties.iso_a2}">` +
//             result.data[i].properties.name +
//             "</option>"
//         );
//       }
//     }
//   },
// }); //4

// Select country from dropdown and add the border and holiday information

// $("#selectHolidayInfo").click(function () {
//   //8

//   $.ajax({
//     // 4
//     url: "libs/php/getCountryBorders.php",
//     type: "POST",
//     dataType: "json",
//     data: "{}",

//     success: function (result) {
//       //5

//       JSON.stringify(result);

//       //console.log(JSON.stringify(result));

//       if (result.status.name == "ok") {
//         //6
//         for (let i = 0; i < result.data.length; i++) {
//           //7
//           if( $("#selectCountry").val() === result.data[i].properties.iso_a2) {
//             L.geoJSON(resultCountry.data[i].geometry).clearLayers(map);
//             L.geoJSON(result.data[i].geometry).addTo(map);
//             //console.log(L.geoJSON(result.data[i]));
//             //console.log(L.geoJSON(result.data[i]));

//           }

//           // console.log(result.data[i].geometry);
//         }
//       }
//     },
//   });
// });

//         // $.ajax({
//         //   //9
//         //   url: "libs/php/getHolidayInfo.php",
//         //   type: "POST",
//         //   dataType: "json",
//         //   data: {
//         //     countryCode: $("#selectCountry").val()
//         //   },

//         //   success: function (result) {
//         //     //10

//         //     JSON.stringify(result);

//         //     //console.log(JSON.stringify(result));

//         //     if (result.status.name == "ok") {
//         //       //11

//         //       function getInfoFrom() {
//         //         let holidayPopup = [];

//         //         for (let j = 0; j < result["data"].length; j++) {
//         //           let stringLine =
//         //             result["data"][j].date + " " + result["data"][j].localName;

//         //           holidayPopup.push(stringLine);
//         //         }
//         //         return holidayPopup;
//         //       }

//         //       let holidayData = getInfoFrom().join(" <br>");

//         //       let selectHolidayPopup = L.popup()
//         //         .setLatLng([currentBorderLat, currentBorderLng])
//         //         .setContent(holidayData)
//         //         .openOn(map);
//         //     } //11
//         //   }, //10
//         // }); //9
//       });
//     }); //3

//     // error: function (jqXHR, textStatus, errorThrown) {
//     //   // your error code
//     // }
//   } else {
//      //2 provide default value like UK

//     console.log("Browser does not support geolocation!");
//   }
// }); //1
