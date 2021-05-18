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

  // User location on map

  if ("geolocation" in navigator) {
    //2

    navigator.geolocation.getCurrentPosition(function (position) {
      //3

      let userLat = position.coords.latitude;
      let userLng = position.coords.longitude;

      // console.log(userLat);
      // console.log(userLong);

      let map = L.map("map").setView([userLat, userLng], 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      L.marker([userLat, userLng])
        .addTo(map)
        .bindPopup("This is your location.")
        .openPopup();

      // Set up the countries and iso codes in the Select dropdown
      $("#selName").append("<option>" + " Select a country " + "</option>");
      $("#selIsoCode2").append(
        "<option>" + " Select a country ISO2 code " + "</option>"
      );

      $.ajax({
        //4
        url: "libs/php/getCountryBorders.php",
        type: "POST",
        dataType: "json",
        data: "{}",

        success: function (result) {
          //5

          JSON.stringify(result);

          //console.log(JSON.stringify(result));

          if (result.status.name == "ok") {
            //6
            for (let i = 0; i < result.data.length; i++) {

                // $('#selName').append(
                
                //   "<option>" +
                //   result.data[i].properties.iso_a2 
                //   + "</option>"
 
                //   );


                  $("#selName").append(
                    "<option value = { name: result.data[i].properties.name, isoCode2: result.data[i].properties.iso_a2 }>" +
                      result.data[i].properties.name 
                      +
                      " " +
                      result.data[i].properties.iso_a2 +
                      "</option>"
                  );

              
              // Use countryBorders.geo.json to set the borders of the countries

              L.geoJSON(result.data[i]).addTo(map);
            } //7

            // The country and iso code are chosen from the Select dropdown and the Run button is clicked
            $("#btnRun").click(function () {
              //8

              $.ajax({
                //9
                url: "libs/php/getOpenCage.php",
                type: "POST",
                dataType: "json",
                data: {
                  q: $('#selName').val()
                },

                success: function (result) {
                  //10

                  JSON.stringify(result);

                  //console.log(JSON.stringify(result));

                  if (result.status.name == "ok") {
                    //11

                    console.log(result["data"].results[0].components);
                  } //11
                }, //10
              }); //9
            }); //8
          } //6
        }, //5
      }); //4
    }); //3

    // error: function (jqXHR, textStatus, errorThrown) {
    //   // your error code
    // }
  } else {
    //2

    console.log("Browser does not support geolocation!");
  }
}); //1
