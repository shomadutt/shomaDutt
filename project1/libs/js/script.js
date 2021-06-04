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

  // Create a map with the user's location
  if ("geolocation" in navigator) {
    //2

    navigator.geolocation.getCurrentPosition(function (position) {
      //3

      let userLat;
      let userLng;

      if (
        position.coords.latitude !== null &&
        position.coords.longitude !== null
      ) {
        userLat = position.coords.latitude;
        userLng = position.coords.longitude;
      } else {
        // Default UK coordinates
        userLat = 51.509865;
        userLng = -0.118092;
      }

      // console.log(userLat);
      // console.log(userLng);

      let map = L.map("map").setView([userLat, userLng], 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Add an icon for the user location

      let globeIcon = L.icon({
        iconUrl: "https://shomadutt.com/project1/libs/Leaflet/images/globe.png",
        shadowUrl:
          "https://shomadutt.com/project1/libs/Leaflet/images/globeShadow.png",

        iconSize: [60, 95], // size of the icon
        shadowSize: [50, 64], // size of the shadow
        iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62], // the same for the shadow
        popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
      });

      let userMarker = L.marker([userLat, userLng], { icon: globeIcon }).addTo(
        map
      );

      // Add the user's border

      let geojsonLayer;

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
                    // 10
                    if (
                      resultCountry.data[i].properties.iso_a2 ===
                      resultCage[
                        "data"
                      ].results[0].components.country_code.toUpperCase()
                    ) {
                      geojsonLayer = L.geoJson(resultCountry.data[i].geometry);

                      geojsonLayer.addTo(map);
                    }
                  } // 10
                } //9
              }, //8
            }); //7
          } //6
        }, //5
      }); //4

      // Create the fa-globe easy button

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
                    // 10
                    if (
                      resultCountry.data[i].properties.iso_a2 ===
                      resultCage[
                        "data"
                      ].results[0].components.country_code.toUpperCase()
                    ) {
                      function addEasyPopup() {
                        //10

                        let userCountryPopup = L.popup()
                          .setLatLng([userLat, userLng])
                          .setContent(
                            "House number:" +
                              " " +
                              resultCage["data"].results[0].components
                                .house_number +
                              "<br>" +
                              "Post code:" +
                              " " +
                              resultCage["data"].results[0].components
                                .postcode +
                              "<br>" +
                              "Road:" +
                              " " +
                              resultCage["data"].results[0].components.road +
                              "<br>" +
                              "State:" +
                              " " +
                              resultCage["data"].results[0].components.state +
                              "<br>" +
                              "State code:" +
                              " " +
                              resultCage["data"].results[0].components
                                .state_code +
                              "<br>" +
                              "State district:" +
                              " " +
                              resultCage["data"].results[0].components
                                .state_district +
                              "<br>" +
                              "Suburb:" +
                              " " +
                              resultCage["data"].results[0].components.suburb +
                              "<br>" +
                              "Capital:" +
                              " " +
                              resultCage["data"].results[0].components.city +
                              "<br>" +
                              "City district:" +
                              " " +
                              resultCage["data"].results[0].components
                                .city_district +
                              "<br>" +
                              "Continent:" +
                              " " +
                              resultCage["data"].results[0].components
                                .continent +
                              "<br>" +
                              "Country:" +
                              " " +
                              resultCage["data"].results[0].components.country +
                              "<br>" +
                              "Country code:" +
                              " " +
                              resultCage["data"].results[0].components
                                .country_code
                          );

                        let selectButton;

                        L.easyButton("fa-globe", function (btn, map) {
                          map.removeLayer(geojsonLayer);

                          geojsonLayer = L.geoJson(
                            resultCountry.data[i].geometry
                          );

                          geojsonLayer.addTo(map);

                          map.fitBounds(geojsonLayer.getBounds());

                          selectButton = btn;
                          selectButton.button.style.backgroundColor = "#007bff";
                          userCountryPopup
                            .setLatLng([userLat, userLng])
                            .openOn(map);
                        }).addTo(map);
                      } //10
                      addEasyPopup();
                    }
                  }
                } //9
              }, //8
            }); //7
          } //6
        }, //5
      }); //4

      // User address

      $("#userAddress").click(function () {
        $.ajax({
          url: "libs/php/getOpenCage.php",
          type: "POST",
          dataType: "json",
          data: {
            q: String(userLat) + "," + String(userLng),
          },
          success: function (resultCage) {
            //console.log(JSON.stringify(result));

            if (resultCage.status.name == "ok") {
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
                        map.removeLayer(geojsonLayer);

                        geojsonLayer = L.geoJson(
                          resultCountry.data[i].geometry
                        );

                        geojsonLayer.addTo(map);

                        map.fitBounds(geojsonLayer.getBounds());

                        let userAddressPopup = L.popup()
                          .setLatLng([userLat, userLng])
                          .setContent(
                            "House number:" +
                              " " +
                              resultCage["data"].results[0].components
                                .house_number +
                              "<br>" +
                              "Post code:" +
                              " " +
                              resultCage["data"].results[0].components
                                .postcode +
                              "<br>" +
                              "Road:" +
                              " " +
                              resultCage["data"].results[0].components.road +
                              "<br>" +
                              "State:" +
                              " " +
                              resultCage["data"].results[0].components.state +
                              "<br>" +
                              "State code:" +
                              " " +
                              resultCage["data"].results[0].components
                                .state_code +
                              "<br>" +
                              "State district:" +
                              " " +
                              resultCage["data"].results[0].components
                                .state_district +
                              "<br>" +
                              "Suburb:" +
                              " " +
                              resultCage["data"].results[0].components.suburb +
                              "<br>" +
                              "Capital:" +
                              " " +
                              resultCage["data"].results[0].components.city +
                              "<br>" +
                              "City district:" +
                              " " +
                              resultCage["data"].results[0].components
                                .city_district +
                              "<br>" +
                              "Continent:" +
                              " " +
                              resultCage["data"].results[0].components
                                .continent +
                              "<br>" +
                              "Country:" +
                              " " +
                              resultCage["data"].results[0].components.country +
                              "<br>" +
                              "Country code:" +
                              " " +
                              resultCage["data"].results[0].components
                                .country_code
                          )
                          .openOn(map);
                      }
                    }
                  }
                },
              });
            }
          },
          error: function (jqXHR, textStatus, errorThrown) {
            // your error code
          },
        });
      });

      // User weather

      $("#userWeather").click(function () {
        $.ajax({
          url: "libs/php/getOpenCage.php",
          type: "POST",
          dataType: "json",
          data: {
            q: String(userLat) + "," + String(userLng),
          },
          success: function (resultCage) {
            //console.log(JSON.stringify(result));

            if (resultCage.status.name == "ok") {
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
                        map.removeLayer(geojsonLayer);

                        geojsonLayer = L.geoJson(
                          resultCountry.data[i].geometry
                        );

                        geojsonLayer.addTo(map);

                        map.fitBounds(geojsonLayer.getBounds());

                        $.ajax({
                          url: "libs/php/getOpenWeather.php",
                          type: "POST",
                          dataType: "json",
                          data: {
                            lon: userLng,
                            lat: userLat,
                          },
                          success: function (result) {
                            //console.log(JSON.stringify(result));

                            if (result.status.name == "ok") {
                              let userWeatherPopup = L.popup()
                                .setLatLng([userLat, userLng])
                                .setContent(
                                  "Weather description:" +
                                    " " +
                                    result["data"].weather[0].description +
                                    "<br>" +
                                    "Temperature:" +
                                    " " +
                                    result["data"].main.temp +
                                    "<br>" +
                                    "Feels like:" +
                                    " " +
                                    result["data"].main.feels_like +
                                    "<br>" +
                                    "Minimum temperature:" +
                                    " " +
                                    result["data"].main.temp_min +
                                    "<br>" +
                                    "Maximum temperature:" +
                                    " " +
                                    result["data"].main.temp_max +
                                    "<br>" +
                                    "Pressure:" +
                                    " " +
                                    result["data"].main.pressure +
                                    "<br>" +
                                    "Humidity:" +
                                    " " +
                                    result["data"].main.humidity +
                                    "<br>" +
                                    "Visibility:" +
                                    " " +
                                    result["data"].visibility +
                                    "<br>" +
                                    "Wind speed:" +
                                    " " +
                                    result["data"].wind.speed +
                                    "<br>" +
                                    "Wind temperature:" +
                                    " " +
                                    result["data"].wind.deg +
                                    "<br>" +
                                    "Clouds:" +
                                    " " +
                                    result["data"].clouds.all +
                                    "<br>" +
                                    "Sunrise:" +
                                    " " +
                                    result["data"].sys.sunrise +
                                    "<br>" +
                                    "Sunset:" +
                                    " " +
                                    result["data"].sys.sunset +
                                    "<br>" +
                                    "Timezone:" +
                                    " " +
                                    result["data"].timezone
                                )
                                .openOn(map);
                            }
                          },
                          error: function (jqXHR, textStatus, errorThrown) {
                            // your error code
                          },
                        });
                      }
                    }
                  }
                },
              });
            }
          },
          error: function (jqXHR, textStatus, errorThrown) {
            // your error code
          },
        });
      });

      // User wiki links

      $("#userWiki").click(function () {
        $.ajax({
          url: "libs/php/getOpenCage.php",
          type: "POST",
          dataType: "json",
          data: {
            q: String(userLat) + "," + String(userLng),
          },
          success: function (resultCage) {
            //console.log(JSON.stringify(result));

            if (resultCage.status.name == "ok") {
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
                        map.removeLayer(geojsonLayer);

                        geojsonLayer = L.geoJson(
                          resultCountry.data[i].geometry
                        );

                        geojsonLayer.addTo(map);

                        map.fitBounds(geojsonLayer.getBounds());

                        $.ajax({
                          url: "libs/php/getGeonamesWiki.php",
                          type: "POST",
                          dataType: "json",
                          data: {
                            lat: userLat,
                            lng: userLng,
                          },
                          success: function (result) {
                            //console.log(JSON.stringify(result));

                            if (result.status.name == "ok") {
                              let userWikiPopup = L.popup()
                                .setLatLng([userLat, userLng])
                                .setContent(
                                  "Wikipedia summary:" +
                                    " " +
                                    result["data"][0].summary +
                                    "<br>" +
                                    "Wikipedia URL:" +
                                    " " +
                                    result["data"][0].wikipediaUrl +
                                    "<br>" +
                                    "Distance:" +
                                    " " +
                                    result["data"][0].distance
                                )
                                .openOn(map);
                            }
                          },
                          error: function (jqXHR, textStatus, errorThrown) {
                            // your error code
                          },
                        });
                      }
                    }
                  }
                },
              });
            }
          },
          error: function (jqXHR, textStatus, errorThrown) {
            // your error code
          },
        });
      });

      // User country

      $("#userCountryInfo").click(function () {
        $.ajax({
          url: "libs/php/getOpenCage.php",
          type: "POST",
          dataType: "json",
          data: {
            q: String(userLat) + "," + String(userLng),
          },
          success: function (resultCage) {
            //console.log(JSON.stringify(result));

            if (resultCage.status.name == "ok") {
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
                        map.removeLayer(geojsonLayer);

                        geojsonLayer = L.geoJson(
                          resultCountry.data[i].geometry
                        );

                        geojsonLayer.addTo(map);

                        map.fitBounds(geojsonLayer.getBounds());

                        $.ajax({
                          url: "libs/php/getCountryInfo.php",
                          type: "POST",
                          dataType: "json",
                          data: {
                            countryCode:
                              resultCage["data"].results[0].components
                                .country_code,
                          },
                          success: function (result) {
                            //console.log(JSON.stringify(result));

                            if (result.status.name == "ok") {
                              let userCountryInfoPopup = L.popup()
                                .setLatLng([userLat, userLng])
                                .setContent(
                                  "Continent:" +
                                    " " +
                                    result["data"][0]["continent"] +
                                    "<br>" +
                                    "Continent Name:" +
                                    " " +
                                    result["data"][0]["continentName"] +
                                    "<br>" +
                                    "Capital:" +
                                    " " +
                                    result["data"][0]["capital"] +
                                    "<br>" +
                                    "Area in sq km:" +
                                    " " +
                                    result["data"][0]["areaInSqKm"] +
                                    "<br>" +
                                    "Population:" +
                                    " " +
                                    result["data"][0]["population"] +
                                    "<br>" +
                                    "Currency code:" +
                                    " " +
                                    result["data"][0]["currencyCode"] +
                                    "<br>" +
                                    "Languages:" +
                                    " " +
                                    result["data"][0]["languages"]
                                )
                                .openOn(map);
                            }
                          },
                          error: function (jqXHR, textStatus, errorThrown) {
                            // your error code
                          },
                        });
                      }
                    }
                  }
                },
              });
            }
          },
          error: function (jqXHR, textStatus, errorThrown) {
            // your error code
          },
        });
      });

      // User holidays

      $("#userHoliday").click(function () {
        $.ajax({
          url: "libs/php/getOpenCage.php",
          type: "POST",
          dataType: "json",
          data: {
            q: String(userLat) + "," + String(userLng),
          },
          success: function (resultCage) {
            //console.log(JSON.stringify(result));

            if (resultCage.status.name == "ok") {
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
                        map.removeLayer(geojsonLayer);

                        geojsonLayer = L.geoJson(
                          resultCountry.data[i].geometry
                        );

                        geojsonLayer.addTo(map);

                        map.fitBounds(geojsonLayer.getBounds());

                        $.ajax({
                          url: "libs/php/getHolidayInfo.php",
                          type: "POST",
                          dataType: "json",
                          data: {
                            countryCode:
                              resultCage["data"].results[0].components
                                .country_code,
                          },
                          success: function (result) {
                            //console.log(JSON.stringify(result));

                            if (result.status.name == "ok") {
                              function getInfoFrom() {
                                let holidayPopup = [];

                                for (
                                  let j = 0;
                                  j < result["data"].length;
                                  j++
                                ) {
                                  let stringLine =
                                    result["data"][j].date +
                                    " " +
                                    result["data"][j].localName;
                                  holidayPopup.push(stringLine);
                                }
                                return holidayPopup;
                              }

                              let holidayData = getInfoFrom().join(" <br>");

                              let userHolidayPopup = L.popup()
                                .setLatLng([userLat, userLng])
                                .setContent(holidayData)
                                .openOn(map);
                            }
                          },
                          error: function (jqXHR, textStatus, errorThrown) {
                            // your error code
                          },
                        });
                      }
                    }
                  }
                },
              });
            }
          },
          error: function (jqXHR, textStatus, errorThrown) {
            // your error code
          },
        });
      });

      // User income

      $("#userIncome").click(function () {
        $.ajax({
          url: "libs/php/getOpenCage.php",
          type: "POST",
          dataType: "json",
          data: {
            q: String(userLat) + "," + String(userLng),
          },
          success: function (resultCage) {
            //console.log(JSON.stringify(result));

            if (resultCage.status.name == "ok") {
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
                        map.removeLayer(geojsonLayer);

                        geojsonLayer = L.geoJson(
                          resultCountry.data[i].geometry
                        );

                        geojsonLayer.addTo(map);

                        map.fitBounds(geojsonLayer.getBounds());

                        $.ajax({
                          url: "libs/php/getIncomeInfo.php",
                          type: "POST",
                          dataType: "json",
                          data: {
                            countryCode:
                              resultCage["data"].results[0].components
                                .country_code,
                          },
                          success: function (result) {
                            //console.log(JSON.stringify(result));

                            if (result.status.name == "ok") {
                              let userIncomePopup = L.popup()
                                .setLatLng([userLat, userLng])
                                .setContent(
                                  "Income level:" +
                                    " " +
                                    result["data"][1][0].incomeLevel.value
                                )
                                .openOn(map);
                            }
                          },
                          error: function (jqXHR, textStatus, errorThrown) {
                            // your error code
                          },
                        });
                      }
                    }
                  }
                },
              });
            }
          },
          error: function (jqXHR, textStatus, errorThrown) {
            // your error code
          },
        });
      });

      // User flag

      $("#userFlag").click(function () {
        $.ajax({
          url: "libs/php/getOpenCage.php",
          type: "POST",
          dataType: "json",
          data: {
            q: String(userLat) + "," + String(userLng),
          },
          success: function (resultCage) {
            //console.log(JSON.stringify(result));

            if (resultCage.status.name == "ok") {
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
                        map.removeLayer(geojsonLayer);

                        geojsonLayer = L.geoJson(
                          resultCountry.data[i].geometry
                        );

                        geojsonLayer.addTo(map);

                        map.fitBounds(geojsonLayer.getBounds());

                        $.ajax({
                          url: "libs/php/getCountryFlag.php",
                          type: "POST",
                          dataType: "json",
                          data: {
                            countryCode:
                              resultCage[
                                "data"
                              ].results[0].components.country_code.toUpperCase(),
                          },
                          success: function (result) {
                            JSON.stringify(result);
                            //console.log(JSON.stringify(result));

                            let flag = `<img class="flag" src=${result["data"].flag} />`;

                            if (result.status.name == "ok") {
                              let userFlagPopup = L.popup()
                                .setLatLng([userLat, userLng])
                                .setContent(flag)
                                .openOn(map);
                            }
                          },
                          error: function (jqXHR, textStatus, errorThrown) {
                            // your error code
                          },
                        });
                      }
                    }
                  }
                },
              });
            }
          },
          error: function (jqXHR, textStatus, errorThrown) {
            // your error code
          },
        });
      });

      // User coronavirus

      $("#userCoronaInfo").click(function () {
        $.ajax({
          url: "libs/php/getOpenCage.php",
          type: "POST",
          dataType: "json",
          data: {
            q: String(userLat) + "," + String(userLng),
          },
          success: function (resultCage) {
            //console.log(JSON.stringify(result));

            if (resultCage.status.name == "ok") {
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
                        map.removeLayer(geojsonLayer);

                        geojsonLayer = L.geoJson(
                          resultCountry.data[i].geometry
                        );

                        geojsonLayer.addTo(map);

                        map.fitBounds(geojsonLayer.getBounds());

                        $.ajax({
                          url: "libs/php/getCoronaInfo.php",
                          type: "POST",
                          dataType: "json",
                          data: {
                            countryCode:
                              resultCage["data"].results[0].components
                                .country_code,
                          },
                          success: function (result) {
                            //console.log(JSON.stringify(result));

                            if (result.status.name == "ok") {
                              let userCoronaPopup = L.popup()
                                .setLatLng([userLat, userLng])
                                .setContent(
                                  "Updated at:" +
                                    " " +
                                    result["data"].data.updated_at +
                                    "<br>" +
                                    "Deaths today:" +
                                    " " +
                                    result["data"].data.today.deaths +
                                    "<br>" +
                                    "Deaths confirmed today:" +
                                    " " +
                                    result["data"].data.today.confirmed +
                                    "<br>" +
                                    "Latest deaths:" +
                                    " " +
                                    result["data"].data.latest_data.deaths +
                                    "<br>" +
                                    "Latest deaths confirmed:" +
                                    " " +
                                    result["data"].data.latest_data.confirmed +
                                    "<br>" +
                                    "Recovered:" +
                                    " " +
                                    result["data"].data.latest_data.recovered +
                                    "<br>" +
                                    "Critical:" +
                                    " " +
                                    result["data"].data.latest_data.critical +
                                    "<br>" +
                                    "Calculated death rate:" +
                                    " " +
                                    result["data"].data.latest_data.calculated
                                      .death_rate +
                                    "<br>" +
                                    "Calculated recovery rate:" +
                                    " " +
                                    result["data"].data.latest_data.calculated
                                      .recovery_rate +
                                    "<br>" +
                                    "Calculated cases per miliion population:" +
                                    " " +
                                    result["data"].data.latest_data.calculated
                                      .cases_per_million_population
                                )
                                .openOn(map);
                            }
                          },
                          error: function (jqXHR, textStatus, errorThrown) {
                            // your error code
                          },
                        });
                      }
                    }
                  }
                },
              });
            }
          },
          error: function (jqXHR, textStatus, errorThrown) {
            // your error code
          },
        });
      });

      // select dropdown

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
              $("#selectCountry").append(
                `<option value = "${resultCountry.data[i].properties.iso_a2}">` +
                  resultCountry.data[i].properties.name +
                  "</option>"
              );

              // Select country from dropdown and add the border and country stats information
              $("#selectCountryInfo").click(function () {
                if (
                  $("#selectCountry").val() ===
                  resultCountry.data[i].properties.iso_a2
                ) {
                  map.removeLayer(geojsonLayer);

                  map.removeLayer(userMarker);

                  geojsonLayer = L.geoJson(resultCountry.data[i].geometry);

                  geojsonLayer.addTo(map);

                  map.fitBounds(geojsonLayer.getBounds());

                  $.ajax({
                    //9
                    url: "libs/php/getCountryInfo.php",
                    type: "POST",
                    dataType: "json",
                    data: {
                      countryCode: $("#selectCountry").val(),
                    },

                    success: function (result) {
                      //10

                      JSON.stringify(result);

                      //console.log(JSON.stringify(result));

                      if (result.status.name == "ok") {
                        //11

                        let coordinates = geojsonLayer.getBounds().getCenter();

                        let selectCountryPopup = L.popup()
                          .setLatLng(coordinates)
                          .setContent(
                            "Capital:" +
                              " " +
                              result["data"][0].capital +
                              "<br>" +
                              "Continent:" +
                              " " +
                              result["data"][0].continent +
                              "<br>" +
                              "Continent name:" +
                              " " +
                              result["data"][0].continentName +
                              "<br>" +
                              "Country name:" +
                              " " +
                              result["data"][0].countryName +
                              "<br>" +
                              "Currency code:" +
                              " " +
                              result["data"][0].currencyCode +
                              "<br>" +
                              "Languages:" +
                              " " +
                              result["data"][0].languages +
                              "<br>" +
                              "North:" +
                              " " +
                              result["data"][0].north +
                              "<br>" +
                              "East:" +
                              " " +
                              result["data"][0].east +
                              "<br>" +
                              "South:" +
                              " " +
                              result["data"][0].south +
                              "<br>" +
                              "West:" +
                              " " +
                              result["data"][0].west +
                              "<br>" +
                              "Population:" +
                              " " +
                              result["data"][0].population
                          )
                          .openOn(map);

                        // Create random points within a country's borders 
                        // Have to use variable markers otherwise does not work

                        let markers = L.markerClusterGroup();

                        let bounds = geojsonLayer.getBounds();
                     
                        let lat;
                        let lng;

                        let x_max = bounds._northEast.lat;
                        let x_min = bounds._southWest.lat;
                        let y_max = bounds._northEast.lng;
                        let y_min = bounds._southWest.lng;

                        for (let j = 0; j < 10; j++) {

                          lat = x_min + Math.random() * (x_max - x_min);
                          lng = y_min + Math.random() * (y_max - y_min);

                          markers.addLayer(L.marker([lat, lng]));                          
                         
                        }

                        map.addLayer(markers);
                        
                        map.fitBounds(markers).getBounds();
        
                      } //11
                    }, //10
                  }); //9
                }
              });

              // Select country from dropdown and add the border and country holiday information
              $("#selectHolidayInfo").click(function () {
                if (
                  $("#selectCountry").val() ===
                  resultCountry.data[i].properties.iso_a2
                ) {
                  map.removeLayer(geojsonLayer);

                  map.removeLayer(userMarker);

                  geojsonLayer = L.geoJson(resultCountry.data[i].geometry);

                  geojsonLayer.addTo(map);

                  map.fitBounds(geojsonLayer.getBounds());

                  $.ajax({
                    //9
                    url: "libs/php/getHolidayInfo.php",
                    type: "POST",
                    dataType: "json",
                    data: {
                      countryCode: $("#selectCountry").val(),
                    },

                    success: function (result) {
                      //10

                      JSON.stringify(result);

                      //console.log(JSON.stringify(result));

                      if (result.status.name == "ok") {
                        //11

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

                        let holidayData = getInfoFrom().join(" <br>");

                        let coordinates = geojsonLayer.getBounds().getCenter();

                        let selectHolidayPopup = L.popup()
                          .setLatLng(coordinates)
                          .setContent(holidayData)
                          .openOn(map);
                      } //11
                    }, //10
                  }); //9
                }
              });

              // Select country from dropdown and add the border and country income information
              $("#selectIncomeInfo").click(function () {
                if (
                  $("#selectCountry").val() ===
                  resultCountry.data[i].properties.iso_a2
                ) {
                  map.removeLayer(geojsonLayer);

                  map.removeLayer(userMarker);

                  geojsonLayer = L.geoJson(resultCountry.data[i].geometry);

                  geojsonLayer.addTo(map);

                  map.fitBounds(geojsonLayer.getBounds());

                  $.ajax({
                    //9
                    url: "libs/php/getIncomeInfo.php",
                    type: "POST",
                    dataType: "json",
                    data: {
                      countryCode: $("#selectCountry").val(),
                    },

                    success: function (result) {
                      //10

                      JSON.stringify(result);

                      //console.log(JSON.stringify(result));

                      if (result.status.name == "ok") {
                        //11

                        let coordinates = geojsonLayer.getBounds().getCenter();

                        let selectIncomePopup = L.popup()
                          .setLatLng(coordinates)
                          .setContent(
                            "Income level:" +
                              " " +
                              result["data"][1][0].incomeLevel.value
                          )
                          .openOn(map);
                      } //11
                    }, //10
                  }); //9
                }
              });

              // Select country from dropdown and add the border and country flag
              $("#selectFlag").click(function () {
                if (
                  $("#selectCountry").val() ===
                  resultCountry.data[i].properties.iso_a2
                ) {
                  map.removeLayer(geojsonLayer);

                  map.removeLayer(userMarker);

                  geojsonLayer = L.geoJson(resultCountry.data[i].geometry);

                  geojsonLayer.addTo(map);

                  map.fitBounds(geojsonLayer.getBounds());

                  $.ajax({
                    //9
                    url: "libs/php/getCountryFlag.php",
                    type: "POST",
                    dataType: "json",
                    data: {
                      countryCode: $("#selectCountry").val(),
                    },

                    success: function (result) {
                      //10

                      JSON.stringify(result);

                      //console.log(JSON.stringify(result));

                      if (result.status.name == "ok") {
                        //11

                        let coordinates = geojsonLayer.getBounds().getCenter();

                        let flag = `<img class="flag" src=${result["data"].flag} />`;

                        let selectFlagPopup = L.popup()
                          .setLatLng(coordinates)
                          .setContent(flag)
                          .openOn(map);
                      } //11
                    }, //10
                  }); //9
                }
              });

              // Select country from dropdown and add the border and coronavirus information
              $("#selectCoronaInfo").click(function () {
                if (
                  $("#selectCountry").val() ===
                  resultCountry.data[i].properties.iso_a2
                ) {
                  map.removeLayer(geojsonLayer);

                  map.removeLayer(userMarker);

                  geojsonLayer = L.geoJson(resultCountry.data[i].geometry);

                  geojsonLayer.addTo(map);

                  map.fitBounds(geojsonLayer.getBounds());

                  $.ajax({
                    //9
                    url: "libs/php/getCoronaInfo.php",
                    type: "POST",
                    dataType: "json",
                    data: {
                      countryCode: $("#selectCountry").val(),
                    },

                    success: function (result) {
                      //10

                      JSON.stringify(result);

                      //console.log(JSON.stringify(result));

                      if (result.status.name == "ok") {
                        //11

                        let coordinates = geojsonLayer.getBounds().getCenter();

                        let selectCoronaPopup = L.popup()
                          .setLatLng(coordinates)
                          .setContent(
                            "Updated at:" +
                              " " +
                              result["data"].data.updated_at +
                              "<br>" +
                              "Deaths today:" +
                              " " +
                              result["data"].data.today.deaths +
                              "<br>" +
                              "Confirmed today:" +
                              " " +
                              result["data"].data.today.confirmed +
                              "<br>" +
                              "Deaths:" +
                              " " +
                              result["data"].data.latest_data.deaths +
                              "<br>" +
                              "Confirmed deaths:" +
                              " " +
                              result["data"].data.latest_data.confirmed +
                              "<br>" +
                              "Recovered:" +
                              " " +
                              result["data"].data.latest_data.recovered +
                              "<br>" +
                              "Critical:" +
                              " " +
                              result["data"].data.latest_data.critical +
                              "<br>" +
                              "Calculated death rate:" +
                              " " +
                              result["data"].data.latest_data.calculated
                                .death_rate +
                              "<br>" +
                              "Calculated recovery rate:" +
                              " " +
                              result["data"].data.latest_data.calculated
                                .death_rate +
                              "<br>" +
                              "Calculated cases per million population:" +
                              " " +
                              result["data"].data.latest_data.calculated
                                .cases_per_million_population
                          )
                          .openOn(map);
                      } //11
                    }, //10
                  }); //9
                }
              });
            }
          } //9
        }, //8
      }); //7
    }); //3
  } //2
}); //1
