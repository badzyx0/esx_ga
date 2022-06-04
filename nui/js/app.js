$(window).ready(function () {
  window.addEventListener("message", function (event) {
    let data = event.data;

    if (data.showMenu) {
      $("#container").fadeIn();
      $("#container").data("spawnpoint", data.spawnPoint);
      $("#menu").fadeIn();

      $("#vehicle-list").html(getVehicles(data.locales, data.vehiclesList));

      // Locales
      $(".vehicle-header").html($(".vehicle-header").html().replace("Model", data.locales.veh_model));
      $(".vehicle-header").html($(".vehicle-header").html().replace("Plate", data.locales.veh_plate));
      $(".vehicle-header").html($(".vehicle-header").html().replace("Action", data.locales.veh_action));

    } else if (data.hideAll) {
      $("#container").fadeOut();
    }
  });

  $("#container").hide();

  $(".close").click(function (event) {
    $("#container").hide();
    $.post('https://esx_garage/escape', '{}');
  });

  document.onkeyup = function (data) {
		if (data.which == 27) {
			$.post('https://esx_garage/escape', '{}');
		}
	};

  function getVehicles(locale, vehicle) {
    let html = "";
    let vehicleData = JSON.parse(vehicle);

    for (let i = 0; i < vehicleData.length; i++) {
      html += "<div class='vehicle-listing'>";
      html += vehicleData[i].model;
      html += "<div>" + vehicleData[i].plate + "</div>";
      html += "<button class='vehicle-action unstyled-button' data-vehprops='"+ JSON.stringify(vehicleData[i].props) +"'>" + locale.action + "</button>";
      html += "</div>";
    }

    return html;
  }

  $(document).on('click', 'button.vehicle-action',function(event) {
    let spawnPoint = $('#container').data("spawnpoint");
    let vehicleProps = $(this).data("vehprops");
    
    $.post('https://esx_garage/spawnVehicle', JSON.stringify({
      vehicleProps: vehicleProps,
      spawnPoint: spawnPoint
    }));
 });
});
