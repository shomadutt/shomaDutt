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
  // Populate the select
  $.ajax({
    type: "POST",
    url: "libs/php/names.php",
    dataType: "json",

    success: function (resultName) {
      //console.log(JSON.stringify(resultName));

      $("#selectCountry").html("");

      $.each(resultName.data, function (index) {
        $("#selectCountry").append(
          $("<option>", {
            value: resultName.data[index].code,
            text: resultName.data[index].name,
          })
        );
      });
    },
  });

  let map = L.map("map");

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  let userLat;
  let userLng;

  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
      userLat = position.coords.latitude;
      userLng = position.coords.longitude;

      $.ajax({
        url: "libs/php/openCage.php",
        type: "POST",
        dataType: "json",
        data: {
          q: String(userLat) + "," + String(userLng),
        },

        success: function (resultCage) {
          //console.log(JSON.stringify(resultCage));

          if (resultCage.status.name == "ok") {
            $("#selectCountry")
              .val(
                resultCage.data.results[0].components.country_code.toUpperCase()
              )
              .trigger("change");
          }
        },
      });
    });
  }

  $("#selectCountry").change(function () {
    $.ajax({
      type: "POST",
      url: "libs/php/borders.php",
      dataType: "json",

      success: function (resultBorder) {
        //console.log(JSON.stringify(resultBorder));

        $.each(resultBorder.data, function (index) {
          if ($("#selectCountry").val() === resultBorder.data[index].code) {
            let countryStyle = {
              color: "#ff9966",
              weight: 3,
              opacity: 0.9,
              fillOpacity: 0.5,
            };

            let geojsonLayer = L.geoJSON(resultBorder.data[index].border, {
              style: countryStyle,
            }).addTo(map);

            map.fitBounds(geojsonLayer.getBounds());
          }
        });
      },
    });

    // Country information modal
    $.ajax({
      url: "libs/php/countryInfo.php",
      type: "POST",
      dataType: "json",
      data: {
        countryCode: $("#selectCountry").val(),
      },

      success: function (result) {
        //console.log(JSON.stringify(result));

        if (result.status.name == "ok") {
          $("#infoHeading").empty();
          $("#infoHeading").append($("#selectCountry option:selected").text());

          $("#txtCapital").html(result.data[0].capital);
          $("#txtContinent").html(result.data[0].continent);
          $("#txtContinentName").html(result.data[0].continentName);
          $("#txtCountryName").html(result.data[0].countryName);

          // Country flag
          $.ajax({
            url: "libs/php/countryFlag.php",
            type: "POST",
            dataType: "json",
            data: {
              countryCode: $("#selectCountry").val(),
            },

            success: function (result) {
              //console.log(JSON.stringify(result));

              if (result.status.name == "ok") {
                $("#txtFlag").html(
                  `<img class="flag" src=${result["data"].flag} />`
                );
              }
            },
          });

          $("#txtCurrencyCode").html(result.data[0].currencyCode);

          // Income information
          $.ajax({
            url: "libs/php/incomeInfo.php",
            type: "POST",
            dataType: "json",
            data: {
              countryCode: $("#selectCountry").val(),
            },

            success: function (result) {
              //console.log(JSON.stringify(result));

              if (result.status.name == "ok") {
                let income = result.data[1][0].incomeLevel.value;
                $("#txtIncome").html(income);
              }
            },
          });

          if (result.data[0].population < 1000000) {
            $("#txtPopulation").html(
              parseInt(result.data[0].population / 1000) + " " + "thousand"
            );
          } else {
            $("#txtPopulation").html(
              parseInt(result.data[0].population / 1000000) + " " + "million"
            );
          }
        }
      },
    });

    // Exchange rate modal
    $.ajax({
      url: "libs/php/countryInfo.php",
      type: "POST",
      dataType: "json",
      data: {
        countryCode: $("#selectCountry").val(),
      },

      success: function (resultCountry) {
        //console.log(JSON.stringify(result));

        if (resultCountry.status.name == "ok") {
          $.ajax({
            url: "libs/php/rateInfo.php",
            type: "POST",
            dataType: "json",
            data: {
              currencyCode: resultCountry.data[0].currencyCode,
            },

            success: function (resultRate) {
              //console.log(JSON.stringify(resultRate));

              if (resultRate.status.name == "ok") {
                $("#rateHeading").empty();
                $("#rateHeading").append(
                  "Exchange Rates of" +
                    " " +
                    $("#selectCountry option:selected").text()
                );

                $("#txtUSD").html(resultRate.data.conversion_rates.USD);
                $("#txtEUR").html(resultRate.data.conversion_rates.EUR);
                $("#txtYEN").html(resultRate.data.conversion_rates.JPY);
                $("#txtGBP").html(resultRate.data.conversion_rates.GBP);
                $("#txtAUD").html(resultRate.data.conversion_rates.AUD);
                $("#txtCAD").html(resultRate.data.conversion_rates.CAD);
                $("#txtCHF").html(resultRate.data.conversion_rates.CHF);
                $("#txtCNY").html(resultRate.data.conversion_rates.CNY);
                $("#txtSEK").html(resultRate.data.conversion_rates.SEK);
                $("#txtNZD").html(resultRate.data.conversion_rates.NZD);
              }
            },
          });
        }
      },
    });

    // University modal

    let multipleWordedCountry = $("#selectCountry option:selected")
      .text()
      .replace(" ", "%20");

    $.ajax({
      url: "libs/php/uniInfo.php",
      type: "POST",
      dataType: "json",
      data: {
        country: multipleWordedCountry,
      },

      success: function (result) {
        //console.log(JSON.stringify(result));

        console.log(result);

        $("#uniHeading").empty();
        $("#uniHeading").append(
          "Universities in" + " " + $("#selectCountry option:selected").text()
        );

        $("#uniTable").html("");

        $.each(result.data, function (index) {
          let uniMarkup =
            "<tr><td>" +
            result.data[index].name +
            "</td><td>" +
            `<a id="website" href="${result.data[index].web_pages[0]}">${result.data[index].web_pages[0]}</a>` +
            "</td></tr>";

          $("#uniTable").append(uniMarkup);
        });
      },
    });

    // Weather modal
    $.ajax({
      url: "libs/php/countryInfo.php",
      type: "POST",
      dataType: "json",
      data: {
        countryCode: $("#selectCountry").val(),
      },

      success: function (resultCountry) {
        //console.log(JSON.stringify(resultCountry));

        $.ajax({
          url: "libs/php/openCage.php",
          type: "POST",
          dataType: "json",
          data: {
            q: resultCountry.data[0].capital,
          },

          success: function (resultCage) {
            //console.log(JSON.stringify(resultCage));

            if (resultCage.status.name == "ok") {
              $.ajax({
                url: "libs/php/weatherForecast.php",
                type: "POST",
                dataType: "json",
                data: {
                  lat: resultCage.data.results[0].geometry.lat,
                  lon: resultCage.data.results[0].geometry.lng,
                },

                success: function (resultWeatherForecast) {
                  //console.log(JSON.stringify(resultWeatherForecast));

                  if (resultWeatherForecast.status.name == "ok") {
                    $("#location").html(resultCountry.data[0].capital);

                    $("#maxTempToday").html(
                      parseInt(
                        resultWeatherForecast.data.daily[0].temp.max - 273.15
                      ) + "°"
                    );

                    $("#minTempToday").html(
                      parseInt(
                        resultWeatherForecast.data.daily[0].temp.min - 273.15
                      ) + "°"
                    );

                    let str =
                      resultWeatherForecast.data.daily[0].weather[0]
                        .description;
                    str =
                      str.substring(0, 1).toUpperCase() +
                      str.substring(1, str.length);
                    $("#descriptionToday").html(str);

                    let iconURL;

                    iconURL =
                      "http://openweathermap.org/img/wn/" +
                      resultWeatherForecast.data.daily[0].weather[0].icon +
                      "@2x.png";

                    $("#iconToday").html("<img src='" + iconURL + "'>");

                    let today = new Date();
                    let day1 = new Date(today);
                    day1.setDate(day1.getDate() + 1);

                    let nth = function (d) {
                      if (d > 3 && d < 21) return "th";
                      switch (d % 10) {
                        case 1:
                          return "st";
                        case 2:
                          return "nd";
                        case 3:
                          return "rd";
                        default:
                          return "th";
                      }
                    };

                    let day = day1.getDay();

                    let days = {
                      0: "Sunday",
                      1: "Monday",
                      2: "Tuesday",
                      3: "Wednesday",
                      4: "Thursday",
                      5: "Friday",
                      6: "Saturday",
                    };

                    for (let y in days) {
                      if (y == day) {
                        $("#dateDay1").html(
                          days[y].substring(0, 3) +
                            " " +
                            day1.getDate() +
                            nth(day1.getDate())
                        );
                      }
                    }

                    $("#maxTempDay1").html(
                      parseInt(
                        resultWeatherForecast.data.daily[1].temp.max - 273.15
                      ) + "°"
                    );

                    $("#minTempDay1").html(
                      parseInt(
                        resultWeatherForecast.data.daily[1].temp.min - 273.15
                      ) + "°"
                    );

                    iconURL =
                      "http://openweathermap.org/img/wn/" +
                      resultWeatherForecast.data.daily[1].weather[0].icon +
                      "@2x.png";

                    $("#iconDay1").html("<img src='" + iconURL + "'>");

                    let day2 = new Date(today);
                    day2.setDate(day2.getDate() + 2);

                    day = day2.getDay();

                    for (let y in days) {
                      if (y == day) {
                        $("#dateDay2").html(
                          days[y].substring(0, 3) +
                            " " +
                            day2.getDate() +
                            nth(day2.getDate())
                        );
                      }
                    }

                    $("#maxTempDay2").html(
                      parseInt(
                        resultWeatherForecast.data.daily[2].temp.max - 273.15
                      ) + "°"
                    );

                    $("#minTempDay2").html(
                      parseInt(
                        resultWeatherForecast.data.daily[2].temp.min - 273.15
                      ) + "°"
                    );

                    iconURL =
                      "http://openweathermap.org/img/wn/" +
                      resultWeatherForecast.data.daily[2].weather[0].icon +
                      "@2x.png";

                    $("#iconDay2").html("<img src='" + iconURL + "'>");

                    let day3 = new Date(today);
                    day3.setDate(day3.getDate() + 3);

                    day = day3.getDay();

                    for (let y in days) {
                      if (y == day) {
                        $("#dateDay3").html(
                          days[y].substring(0, 3) +
                            " " +
                            day3.getDate() +
                            nth(day3.getDate())
                        );
                      }
                    }

                    $("#maxTempDay3").html(
                      parseInt(
                        resultWeatherForecast.data.daily[3].temp.max - 273.15
                      ) + "°"
                    );

                    $("#minTempDay3").html(
                      parseInt(
                        resultWeatherForecast.data.daily[3].temp.min - 273.15
                      ) + "°"
                    );

                    iconURL =
                      "http://openweathermap.org/img/wn/" +
                      resultWeatherForecast.data.daily[3].weather[0].icon +
                      "@2x.png";

                    $("#iconDay3").html("<img src='" + iconURL + "'>");

                    let day4 = new Date(today);
                    day4.setDate(day4.getDate() + 4);

                    day = day4.getDay();

                    for (let y in days) {
                      if (y == day) {
                        $("#dateDay4").html(
                          days[y].substring(0, 3) +
                            " " +
                            day4.getDate() +
                            nth(day4.getDate())
                        );
                      }
                    }

                    $("#maxTempDay4").html(
                      parseInt(
                        resultWeatherForecast.data.daily[4].temp.max - 273.15
                      ) + "°"
                    );

                    $("#minTempDay4").html(
                      parseInt(
                        resultWeatherForecast.data.daily[4].temp.min - 273.15
                      ) + "°"
                    );

                    iconURL =
                      "http://openweathermap.org/img/wn/" +
                      resultWeatherForecast.data.daily[4].weather[0].icon +
                      "@2x.png";

                    $("#iconDay4").html("<img src='" + iconURL + "'>");
                  }
                },
              });
            }
          },
        });
      },
    });

    //Holiday modal
    $.ajax({
      url: "libs/php/holidayInfo.php",
      type: "POST",
      dataType: "json",
      data: {
        year: 2021,
        countryCode: $("#selectCountry").val(),
      },

      success: function (result) {
        //console.log(JSON.stringify(result));

        $("#holidayHeading").empty();
        $("#holidayHeading").append(
          "Holidays in" + " " + $("#selectCountry option:selected").text()
        );

        $("#holidayTable").html("");

        $.each(result, function (index) {
          let date = result[index].date;

          let months = {
            "01": "January",
            "02": "February",
            "03": "March",
            "04": "April",
            "05": "May",
            "06": "June",
            "07": "July",
            "08": "August",
            "09": "September",
            10: "October",
            11: "November",
            12: "December",
          };

          let month = date.slice(5, 7);

          for (let x in months) {
            if (x === month) {
              date =
                date.slice(8, 10) + " " + months[x] + " " + date.slice(0, 4);
            }
          }

          let holidayMarkup =
            "<tr><td>" +
            date +
            "</td><td>" +
            result[index].localName +
            "</td></tr>";

          $("#holidayTable").append(holidayMarkup);
        });
      },
    });

    // Earthquake modal

    $.ajax({
      url: "libs/php/countryInfo.php",
      type: "POST",
      dataType: "json",
      data: {
        countryCode: $("#selectCountry").val(),
      },

      success: function (resultCountry) {
        //console.log(JSON.stringify(resultCountry));

        $.ajax({
          url: "libs/php/earthquakeInfo.php",
          type: "POST",
          dataType: "json",
          data: {
            north: resultCountry.data[0].north,
            south: resultCountry.data[0].south,
            east: resultCountry.data[0].east,
            west: resultCountry.data[0].west,
          },

          success: function (result) {
            $("#earthquakeHeading").empty();
            $("#earthquakeHeading").append(
              "Earthquakes (magnitude) in" +
                " " +
                $("#selectCountry option:selected").text()
            );

            $("#earthquakeTable").html("");

            $.each(result.data.earthquakes, function (index) {
              let date = result.data.earthquakes[index].datetime;

              let months = {
                "01": "January",
                "02": "February",
                "03": "March",
                "04": "April",
                "05": "May",
                "06": "June",
                "07": "July",
                "08": "August",
                "09": "September",
                10: "October",
                11: "November",
                12: "December",
              };

              let month = date.slice(5, 7);

              for (let x in months) {
                if (x === month) {
                  date =
                    date.slice(8, 10) +
                    " " +
                    months[x] +
                    " " +
                    date.slice(0, 4);
                }
              }

              let earthquakeMarkup =
                "<tr><td>" +
                date +
                "</td><td>" +
                result.data.earthquakes[index].magnitude +
                "</td></tr>";

              $("#earthquakeTable").append(earthquakeMarkup);
            });
          },
        });
      },
    });

    // Coronavirus modal
    $.ajax({
      url: "libs/php/coronaInfo.php",
      type: "POST",
      dataType: "json",
      data: {
        countryCode: $("#selectCountry").val(),
      },

      success: function (result) {
        //console.log(JSON.stringify(result));

        if (result.status.name == "ok") {
          $("#coronaHeading").empty();
          $("#coronaHeading").append(
            "Coronavirus Statistics of" +
              " " +
              $("#selectCountry option:selected").text()
          );

          let date = result.data.data.updated_at.slice(0, 10);

          let months = {
            "01": "January",
            "02": "February",
            "03": "March",
            "04": "April",
            "05": "May",
            "06": "June",
            "07": "July",
            "08": "August",
            "09": "September",
            10: "October",
            11: "November",
            12: "December",
          };

          let month = date.slice(5, 7);

          for (let x in months) {
            if (x === month) {
              date =
                date.slice(8, 10) + " " + months[x] + " " + date.slice(0, 4);
              $("#txtUpdatedOn").html(date);
            }
          }

          $("#txtDeathsToday").html(
            result.data.data.today.deaths
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          );
          $("#txtDeaths").html(
            result.data.data.latest_data.deaths
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          );
          $("#txtRecovered").html(
            result.data.data.latest_data.recovered
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          );
          $("#txtCritical").html(
            result.data.data.latest_data.critical
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          );

          $("#txtDeathRate").html(
            result.data.data.latest_data.calculated.death_rate
              .toString()
              .slice(0, 4)
          );
          $("#txtRecovRate").html(
            result.data.data.latest_data.calculated.recovery_rate
              .toString()
              .slice(0, 5)
          );
          $("#txtPerMil").html(
            result["data"].data.latest_data.calculated
              .cases_per_million_population
          );
        }
      },
    });

    // Cities cluster markers
    $.ajax({
      url: "libs/php/cityInfo.php",
      type: "POST",
      dataType: "json",
      data: {
        countryCode: $("#selectCountry").val(),
      },

      success: function (result) {
        let cityMarker = L.ExtraMarkers.icon({
          icon: "fa-map-marker",
          iconColor: "#a8cd9c",
          markerColor: "#00b386",
          svg: true,
          shape: "circle",
          prefix: "fa",
        });

        let markers = L.markerClusterGroup();

        $.each(result.cities, function (index) {
          markers.addLayer(
            L.marker(
              new L.LatLng(
                result.cities[index].latitude,
                result.cities[index].longitude
              ),
              { icon: cityMarker }
            ).bindPopup(result.cities[index].name)
          );
        });

        map.addLayer(markers);
      },
    });
  });

  // Country stats easy button
  L.easyButton("fa-landmark", function (btn, map) {
    $("#infoModal").modal("show");
  }).addTo(map);

  // Exchange rate easy button
  L.easyButton("fa-dice-d20", function (btn, map) {
    $("#rateModal").modal("show");
  }).addTo(map);

  // University easy button
  L.easyButton("fa-graduation-cap", function (btn, map) {
    $("#uniModal").modal("show");
  }).addTo(map);

  // Weather easy button
  L.easyButton("fa-cloud-moon-rain", function (btn, map) {
    $("#weatherModal").modal("show");
  }).addTo(map);

  // Hoilday easy button
  L.easyButton("fa-candy-cane", function (btn, map) {
    $("#holidayModal").modal("show");
  }).addTo(map);

  // Earthquake easy button
  L.easyButton("fa-exclamation-triangle", function (btn, map) {
    $("#earthquakeModal").modal("show");
  }).addTo(map);

  // Coronavirus easy button
  L.easyButton("fa-head-side-mask", function (btn, map) {
    $("#coronaModal").modal("show");
  }).addTo(map);
});
