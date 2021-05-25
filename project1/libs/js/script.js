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

  // User location on the map

  // if ("geolocation" in navigator) {
    //   //2

    
      // Select dropdown

      // Create the text "Select a country" in the dropdown
      $("#selectCountry").append(
        "<option>" + " Select a country " + "</option>"
      );

      // Fill the dropdown with countries
      $.ajax({
        // 3      
        url: "libs/php/getCountryBorders.php",
        type: "POST",
        dataType: "json",
        data: "{}",

        success: function (result) {
          //4

          JSON.stringify(result);

          //console.log(JSON.stringify(result));

          if (result.status.name == "ok") {
            //5
            for (let i = 0; i < result.data.length; i++) {
              //6

              $("#selectCountry").append(
                `<option value = "${result.data[i].properties.iso_a2}">` +
                  result.data[i].properties.name +
                  "</option>"
              );

              // Use countryBorders.geo.json to set the borders of the countries

              //L.geoJSON(result.data[i]).addTo(map);

              let currentBorderLat =
                result.data[i].geometry.coordinates[0][0][0][0];
              let currentBorderLng =
                result.data[i].geometry.coordinates[0][0][0][1];

                console.log(currentBorderLat);
                console.log(currentBorderLng);
              
                // Select dropdown and holiday information
                $("#selectHolidayInfo").click(function () {
                  //7

                  let map = L.map("map").setView(
                    [currentBorderLat, currentBorderLng],
                    13
                  );
    
                  L.tileLayer(
                    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                    {
                      attribution:
                        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                    }
                  ).addTo(map);
    
                 
    

                  // Add an icon for the user location

                  // var greenIcon = L.icon({
                  //   iconUrl:
                  //     "https://shomadutt.com/project1/libs/Leaflet/images/globe.png",
                  //   shadowUrl:
                  //     "https://shomadutt.com/project1/libs/Leaflet/images/shadow.png",

                  //   iconSize: [60, 95], // size of the icon
                  //   shadowSize: [50, 64], // size of the shadow
                  //   iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
                  //   shadowAnchor: [4, 62], // the same for the shadow
                  //   popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
                  // });

                  // L.marker([currentBorderLat, currentBorderLng], {
                  //   icon: greenIcon,
                  // }).addTo(map);

                  $.ajax({
                    //8
                    url: "libs/php/getHolidayInfo.php",
                    type: "POST",
                    dataType: "json",
                    data: {
                      countryCode: $("#selectCountry").val(),
                    },

                    success: function (result) {
                      //9

                      JSON.stringify(result);

                      //console.log(JSON.stringify(result));

                      if (result.status.name == "ok") {
                        //10

                        function getInfoFrom() {
                          let holidayPopup = [];

                          for (let j = 0; j < result["data"].length; j++) {
                            let stringLine =
                              result["data"][j].date +
                              " " +
                              result["data"][j].localName;
                            holidayPopup.push(stringLine);
                          }
                          return holidayPopup;
                        }

                        var holidayData = getInfoFrom().join(" <br>");

                        let selectHolidayPopup = L.popup()
                          .setLatLng([currentBorderLat, currentBorderLng])
                          .setContent(holidayData)
                          .openOn(map);
                      } //10
                    }, //9

                  }); //8
                  }); //7
                  } //6
                  }//5          
        } //4
      }); //3

              

    //   error: function (jqXHR, textStatus, errorThrown) {
    //     // your error code
    //   }
  // } else {
  //   //   //2

  //   console.log("Browser does not support geolocation!");
  // }
}); //1
