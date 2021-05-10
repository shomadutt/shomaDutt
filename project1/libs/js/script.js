$(window).on('load', function () {
	if ($('#preloader').length) {
			$('#preloader').delay(100).fadeOut('slow', function () {
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
      let userLong = position.coords.longitude;

      // console.log(userLat);
      // console.log(userLong);

      let map = L.map("map").setView([userLat, userLong], 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      L.marker([userLat, userLong])
        .addTo(map)
        .bindPopup("This is your location.")
        .openPopup();

      // From https://www.geodatasource.com/developers/javascript
      // Use Haversine function to find the distance between 2 points

      // Select country
      $("#selName").append("<option>" + " Select a country " + "</option>");

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
              //7
              $("#selName").append(
                "<option>" +
                  result.data[i].properties.name +
                  " " +
                  result.data[i].properties.iso_a3 +
                  "</option>"
              );

              // Use countryBorders.geo.json to set the borders of the countries

              L.geoJSON(result.data[i]).addTo(map);

              let borderCoordinates = result.data[i].geometry.coordinates;

              // Create an object with the border and country code
              let countryAndBorder = {
                countryCode: result.data[i].properties.iso_a3,
                border: result.data[i].geometry.coordinates,
              };

              //console.log(countryAndBorder);

              console.log(countryAndBorder.countryCode);

              

              function nestedLoop(obj) {
                const res = {};
                function recurse(obj, current) {
                  for (const key in obj) {
                    let value = obj[key];
                    if (value != undefined) {
                      if (value && typeof value === "Array") {
                        recurse(value, key);
                      } else {
                        // Do your stuff here to var value
                        res[key] = value;
                        console.log(value);
                      }
                    }
                  }
                }
                recurse(obj);
                return res;
              }
  
              nestedLoop(borderCoordinates);



              // function haversineDistance(
              //   lat1,
              //   long1,
              //   lat2,
              //   long2,
              //   unit
              // ) {
              //   let radLat1 = (Math.PI * lat1) / 180;
              //   let radLat2 = (Math.PI * lat2) / 180;

              //   let theta = long1 - long2;
              //   let radTheta = (Math.PI * theta) / 180;

              //   let dist =
              //     Math.sin(radLat1) * Math.sin(radLat2) +
              //     Math.cos(radLat1) *
              //       Math.cos(radLat2) *
              //       Math.cos(radTheta);

              //   if (dist > 1) {
              //     dist = 1;
              //   }

              //   dist = Math.acos(dist);
              //   dist = (dist * 180) / Math.PI;
              //   dist = dist * 60 * 1.1515;

              //   if (unit == "K") {
              //     dist = dist * 1.609344;
              //   } // K is kilometres
              //   if (unit == "N") {
              //     dist = dist * 0.8684;
              //   } // N is nautical miles
              //   return dist;
              // }

              // // for (let j = 0; j < value[0].length; j++) {
              // //   let countryBordersLat = value[0][j][0];
              // //   let countryBordersLong = value[0][j][1];
              // //   // console.log(countryBordersLat);
              // // console.log(countryBordersLong);

              // let distance = haversineDistance(
              //   userLat,
              //   userLong,
              //   countryBordersLat,
              //   countryBordersLong,
              //   "K"
              // );

              // //console.log(distance);

              // // Create an array for the distances
              // let distancesArray = [];

              // // Create an object with the distance and other properties to be retrieved
              // let distanceObjectArray = [];

              // let distanceObject = {
              //   distance: distance,
              //   country: result.data[i].properties.iso_a3,
              // };

              // distanceObjectArray.push(distanceObject);

              // distancesArray.push(distance);

              // //console.log(distancesArray);

              // //console.log(distanceObjectArray);

              // let closest = Math.min.apply(Math, distancesArray);

              // //console.log(closest);

              // for (let j = 0; j < distanceObjectArray.length; j++) {
              //   if (distanceObjectArray[j].distance === closest) {
              //     //console.log(distanceObjectArray[j].country);
              //   }
              // }
            } //7
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
