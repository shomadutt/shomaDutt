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
          $("#countryDataHeading").empty();
          $("#countryDataHeading").append(
            $("#selectCountry option:selected").text() + " " + "Data"
          );

          $("#txtCapital").html(result.data[0].capital);
          $("#txtContinent").html(result.data[0].continent);
          $("#txtContinentName").html(result.data[0].continentName);
          $("#txtCountryName").html(result.data[0].countryName);
          $("#txtCurrencyCode").html(result.data[0].currencyCode);
          $("#txtLanguages").html(result.data[0].languages);
          $("#txtNorth").html(result.data[0].north);
          $("#txtEast").html(result.data[0].east);
          $("#txtSouth").html(result.data[0].south);
          $("#txtWest").html(result.data[0].west);
          $("#txtPopulation").html(result.data[0].population);
        }
      },
    });

    // Country income information modal
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
          $("#countryIncomeHeading").empty();
          $("#countryIncomeHeading").append(
            $("#selectCountry option:selected").text() + " " + "Income"
          );

          let income = result.data[1][0].incomeLevel.value;
          $("#txtIncome").html(income);
        }
      },
    });

    // Country flag modal
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
          $("#countryFlagHeading").empty();
          $("#countryFlagHeading").append(
            $("#selectCountry option:selected").text() + " " + "Flag"
          );

          $("#txtFlag").html(`<img class="flag" src=${result["data"].flag} />`);
        }
      },
    });

    // Country currency exchange rate information modal
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
                $("#countryRateHeading").empty();
                $("#countryRateHeading").append(
                  $("#selectCountry option:selected").text() +
                    " " +
                    "Exchange Rates"
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

    // Country holiday information modal
    $.ajax({
      url: "libs/php/holidayInfo.php",
      type: "POST",
      dataType: "json",
      data: {
        countryCode: $("#selectCountry").val(),
      },

      success: function (result) {
        //console.log(JSON.stringify(result));

        if (result.status.name == "ok") {
          $("#countryHolidayHeading").empty();
          $("#countryHolidayHeading").append(
            "First 10 Holidays of" +
              " " +
              $("#selectCountry option:selected").text()
          );

          $("#date0").html(
            result.data.response.holidays[0].date.iso.slice(0, 10)
          );
          $("#name0").html(result.data.response.holidays[0].name);
          $("#date1").html(
            result.data.response.holidays[1].date.iso.slice(0, 10)
          );
          $("#name1").html(result.data.response.holidays[1].name);
          $("#date2").html(
            result.data.response.holidays[2].date.iso.slice(0, 10)
          );
          $("#name2").html(result.data.response.holidays[2].name);
          $("#date3").html(
            result.data.response.holidays[3].date.iso.slice(0, 10)
          );
          $("#name3").html(result.data.response.holidays[3].name);
          $("#date4").html(
            result.data.response.holidays[4].date.iso.slice(0, 10)
          );
          $("#name4").html(result.data.response.holidays[4].name);
          $("#date5").html(
            result.data.response.holidays[5].date.iso.slice(0, 10)
          );
          $("#name5").html(result.data.response.holidays[5].name);
          $("#date6").html(
            result.data.response.holidays[6].date.iso.slice(0, 10)
          );
          $("#name6").html(result.data.response.holidays[6].name);
          $("#date7").html(
            result.data.response.holidays[7].date.iso.slice(0, 10)
          );
          $("#name7").html(result.data.response.holidays[7].name);
          $("#date8").html(
            result.data.response.holidays[8].date.iso.slice(0, 10)
          );
          $("#name8").html(result.data.response.holidays[8].name);
          $("#date9").html(
            result.data.response.holidays[9].date.iso.slice(0, 10)
          );
          $("#name9").html(result.data.response.holidays[9].name);
        }
      },
    });

    // Country city weather information modal
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
            url: "libs/php/weatherInfo.php",
            type: "POST",
            dataType: "json",
            data: {
              q: resultCountry.data[0].capital,
            },

            success: function (resultWeather) {
              //console.log(JSON.stringify(resultWeather));

              if (resultWeather.status.name == "ok") {
                $("#countryWeatherHeading").empty();
                $("#countryWeatherHeading").append(
                  $("#selectCountry option:selected").text() +
                    " " +
                    "Capital Weather"
                );

                let lengthOfWord = resultWeather.data.weather[0].description;
                let firstLetter = lengthOfWord[0].toUpperCase();
                let restOfWord = lengthOfWord.substring(
                  1,
                  lengthOfWord.length 
                );

                $("#txtDescription").html(firstLetter + restOfWord);

                $("#txtFeelsLike").html(resultWeather.data.main.feels_like);
                $("#txtHumidity").html(resultWeather.data.main.humidity);
                $("#txtPressure").html(resultWeather.data.main.pressure);
                $("#txtTemp").html(resultWeather.data.main.temp);
                $("#txtTempMax").html(resultWeather.data.main.temp_max);
                $("#txtTempMin").html(resultWeather.data.main.temp_min);
                $("#txtWindDeg").html(resultWeather.data.wind.deg);
                $("#txtWindSpeed").html(resultWeather.data.wind.speed);
              }
            },
          });
        }
      },
    });

    // Country coronavirus information modal
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
          $("#countryCoronaHeading").empty();
          $("#countryCoronaHeading").append(
            $("#selectCountry option:selected").text() +
              " " +
              "Coronavirus Data"
          );

          $("#txtUpdatedOn").html(result.data.data.updated_at.slice(0, 10));
          $("#txtDeathsToday").html(result.data.data.today.deaths);
          $("#txtConfirmedToday").html(result.data.data.today.confirmed);
          $("#txtDeaths").html(result.data.data.latest_data.deaths);
          $("#txtConfirmedDeaths").html(result.data.data.latest_data.confirmed);
          $("#txtRecovered").html(result.data.data.latest_data.recovered);
          $("#txtCritical").html(result.data.data.latest_data.critical);
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

    // Country cities cluster markers
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
          iconColor: "#00b386",
          markerColor: "#00b386",
          svg: true,
          shape: "circle",
          prefix: "fa",
        });

        $.each(result.cities, function (index) {
          let markers = L.markerClusterGroup();
          markers.addLayer(
            L.marker(
              new L.LatLng(
                result.cities[index].latitude,
                result.cities[index].longitude
              ),
              { icon: cityMarker }
            )
          );
          map.addLayer(markers);
        });
      },
    });
  });

  // Country stats easy button
  L.easyButton("fa-landmark", function (btn, map) {
    $("#countryInfoModal").modal("show");
  }).addTo(map);

  // Country income easy button
  L.easyButton("fa-coins", function (btn, map) {
    $("#countryIncomeModal").modal("show");
  }).addTo(map);

  // Country flag easy button
  L.easyButton("fa-flag", function (btn, map) {
    $("#countryFlagModal").modal("show");
  }).addTo(map);

  // Country exchange rate easy button
  L.easyButton("fa-dice-d20", function (btn, map) {
    $("#countryRateModal").modal("show");
  }).addTo(map);

  // Country holiday easy button
  L.easyButton("fa-candy-cane", function (btn, map) {
    $("#countryHolidayModal").modal("show");
  }).addTo(map);

  // Country city weather easy button
  L.easyButton("fa-cloud-moon-rain", function (btn, map) {
    $("#countryWeatherModal").modal("show");
  }).addTo(map);

  // Country coronavirus easy button
  L.easyButton("fa-head-side-mask", function (btn, map) {
    $("#countryCoronaModal").modal("show");
  }).addTo(map);
});
