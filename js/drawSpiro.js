var headerCode
var SafeZ
draw();
$('.basic-link').on('click', function (){
	$('.basic').show();
	$('.advanced').hide();
	$('.advanced').attr("disabled", "true");
	$('.advanced + ul').hide();
	$('.basic + ul').show();
});
$('.advanced-link').on('click', function (){
	$('.basic').hide();
	$('.advanced').show();
	$('.advanced').attr("disabled", "true");
	$('.parsley-required').hide();
	$('.advanced + ul').show();
	$('.basic + ul').hide();
});
$('#Resolution').on('change', function(){
    $('#Resolution-val').val($('#Resolution').val());
     draw ();
});
$('#Resolution-val').on('change', function(){
    $('#Resolution').val($('#Resolution-val').val());
     draw ();
});


$('#Ring-gear').on('change', function(){

    $('#Ring-gear-val').val($('#Ring-gear').val());
	if ($('#radioInside').prop('checked')) {
		$('#Rolling-gear').attr('max', $('#Ring-gear').val()- 1);
		$('#Rolling-gear-val').val($('#Rolling-gear').val());
		};
         draw ();
});

$('#Ring-gear-val').on('change', function(){
    $('#Ring-gear').val($('#Ring-gear-val').val());
	if ($('#radioInside').prop('checked')) {
		$('#Rolling-gear').attr('max', $('#Ring-gear').val()- 1);
		$('#Rolling-gear-val').val($('#Rolling-gear').val());
		};
         draw ();
});


$('#Rolling-gear').on('change', function(){
	if ($('#radioInside').prop('checked')) {
		$('#Rolling-gear').attr('max', $('#Ring-gear').val()- 1);
		};
    $('#Rolling-gear-val').val($('#Rolling-gear').val());
     draw ();

});
$('#Rolling-gear-val').on('change', function(){
	if ($('#radioInside').prop('checked')) {
		$('#Rolling-gear').attr('max', $('#Ring-gear').val()- 1);
		};
    $('#Rolling-gear').val($('#Rolling-gear-val').val());
     draw ();

});


$('#Offset').on('change', function(){
    $('#Offset-val').val($('#Offset').val());
     draw ();
});
$('#Offset-val').on('change', function(){
    $('#Offset').val($('#Offset-val').val());
     draw ();
});

$('#Revs').on('change', function(){
    $('#Revs-val').val($('#Revs').val());
     draw ();
});
$('#Revs-val').on('change', function(){
    $('#Revs').val($('#Revs-val').val());
     draw ();
});

$('.exit-modal, .modal-container').on('click', function() {
  $('.modal, .modal-container').fadeOut('fast');
  $('.settings').show();
});

$('#ringHelp, .help-q, .help-i').on('click', function(){
    $('.modal p').html('<img src="images/ring.jpg">');
    	 $('.modal, .modal-container').fadeIn();
			 $('.modal-content img').css({'height': '400'});
      // $('.settings').hide();
});
$('#rollingHelp, .help-i').on('click', function(){
    $('.modal-content p').html('<img src="images/rolling.jpg">');
    	 $('.modal, .modal-container').fadeIn();
			 $('.modal-content img').css({'height': '400'});
      // $('.settings').hide();
});
$('#offsetHelp, .help-i').on('click', function(){
    $('.modal-content p').html('<img src="images/offset.jpg">');
    	 $('.modal, .modal-container').fadeIn();
			 $('.modal-content img').css({'height': '400'});
      // $('.settings').hide();
});

$('#revsHelp, .help-i').on('click', function(){
    $('.modal-content p').html('The number of complete revolutions, inside or outside the rolling gear. ');
    	 $('.modal, .modal-container').fadeIn();
			 $('.modal-content img').css({'height': '400'});
      // $('.settings').hide();
});
$('#resHelp, .help-i').on('click', function(){
    $('.modal-content p').html('The number of points recorded during each revolution. Try a very small number to see some interesting patterns');
    	 $('.modal, .modal-container').fadeIn();
			 $('.modal-content img').css({'height': '400'});
      // $('.settings').hide();
});

$('#cutSizeHelp, .help-i').on('click', function(){
    $('.modal-content p').html('The nominal size you want the cutting to be. Note that this will vary depending on the depth of cut and the shape of the pattern. ');
    	 $('.modal, .modal-container').fadeIn();
			 $('.modal-content img').css({'height': '400'});
      // $('.settings').hide();
});

$('#outsideHelp').on('click', function(){
    $('.modal-content p').html('<img src="images/outside.jpg">');
    	 $('.modal, .modal-container').fadeIn();
			 $('.modal-content img').css({'height': '400'});
      // $('.settings').hide();
});

$('#insideHelp').on('click', function(){
    $('.modal-content p').html('<img src="images/inside.jpg">');
    	 $('.modal, .modal-container').fadeIn();
			 $('.modal-content img').css({'height': '400'});
      // $('.settings').hide();
});


$('#radioInside').on('change', function(){
	if ($('#radioInside').prop('checked')) {
		$('#Rolling-gear').attr('max', $('#Ring-gear').val()- 1);
		}
        else {
           $('#Rolling-gear').attr('max', 150);
        }
	$('#Rolling-gear-val').val($('#Rolling-gear').val());
    draw ();
});

$('#radioOutside').on('change', function(){
	if ($('#radioInside').prop('checked')) {
		$('#Rolling-gear').attr('max', $('#Ring-gear').val()- 1);
		}
        else {

           $('#Rolling-gear').attr('max', 150);
        }

	$('#Rolling-gear-val').val($('#Rolling-gear').val());
    draw ();
});

 function draw () {



	var previewWindow = 600 //hard coded at the moment..needs to be fixed

  var worksheetCanvas = $('#worksheet-canvas');
	var SpiroPrev = worksheetCanvas.get(0).getContext("2d");


//********** RESIZE CANVAS **********//
// small < 768
// medium 768 - 1022
// lg > 1023
	function resizeCanvas(){
		if (window.innerWidth > 1022) {
			// large screen, canvas 2/3
			// var width = window.innerWidth*(2/3);
			var width = window.innerWidth/2;
		} else if (window.innerWidth > 767 && window.innerWidth < 1023) {
			// medium screen, canvas 1/2 screen
			var width = window.innerWidth/2;
		} else if (window.innerWidth < 768) {
			// small screen
			var width = window.innerWidth;
		}

		console.log('width'+ width);
		var ratio = worksheetCanvas.height()/worksheetCanvas.width();

		var height = width;
		console.log('height'+ height);
			worksheetCanvas.width(width)
			worksheetCanvas.height(height)
	}

	window.addEventListener('load', resizeCanvas, false);
	window.addEventListener('resize', resizeCanvas, false);


	SpiroPrev.clearRect(0, 0, previewWindow, previewWindow);	// clear the preview before every redraw

	var screenoffsetX = previewWindow / 2
	var screenoffsetY = previewWindow / 2

	var HasRun = 0
	var MaxValue = 0 //not currently used
    var GearOffset
	var inside

    var Resolution = parseInt($('#Resolution').val());
	var SegmentLength = (Math.PI * 2) / Resolution
	var Ring = parseInt($('#Ring-gear').val());
	var Rolling = parseInt($('#Rolling-gear').val());
	var Offset = (Rolling / 100) * parseFloat($('#Offset').val());
	var Revs = parseFloat($('#Revs').val());
	var CutSize = parseFloat($('#Size').val());
	var CutDepth = parseFloat($('#CutDepth').val());
    var CutSpeed = parseFloat($('#CutSpeed').val());

	SafeZ = parseFloat($('#SafeZ').val());

    if ($('#radioInside').prop('checked')) {
		inside = 1
        GearOffset = Ring - Rolling
		}
		else
		{
        GearOffset = Ring + Rolling
        inside = -1
		}

	var CutScaleFactor = CutSize / ((GearOffset + Rolling + Offset)*2);
	var PrevScaleFactor = previewWindow / ((GearOffset + Rolling + Offset)*2);


	headerCode = [
		"' File created by ShopBot-O-Graph v1.00",
        "' Copyright 2016 Bill Young and ShopBot Tools ",
        "'",
        "' Pattern is centered at 0,0",
        "' and is " + CutSize + " in diameter",
        "'",
        "' Ring gear radius... " + Ring,
        "' Rolling gear radius... " + Rolling,
        "' Offset %... " + Offset,
        "' # of revolutions... " + Revs,
        "' # of line segments per revolution... " + Resolution,
        "'",
		"MZ," + SafeZ,
		"MS," + CutSpeed,
        "SO,1,1",
		"PAUSE 2",
		"'"
		];

	var count
	var XCoord
	var YCoord
	var PreviousX
    var PreviousY
	for (count = 0; count < Revs; count = (count + SegmentLength)) {

        XCoord = (GearOffset * Math.cos(count)) + ((inside) * ((Rolling + Offset) * Math.cos(((GearOffset / Rolling) * count))))
        YCoord = 0 - ((GearOffset * Math.sin(count)) - (Rolling + Offset) * Math.sin(((GearOffset / Rolling) * count)))

/*		Find extremes...not used anywhere so far
        if (Math.abs(XCoord) > MaxValue) {
			MaxValue = XCoord
		}
*/
        if (HasRun == 0) {
            PreviousX = XCoord
            PreviousY = YCoord
            HasRun = 1

			headerCode.push(
				"M2," + (PreviousX * CutScaleFactor).toFixed(3) + "," + (PreviousY + CutScaleFactor).toFixed(3),
				"MZ," + CutDepth
				)
			}
		else{

			SpiroPrev.beginPath();
			SpiroPrev.moveTo((PreviousX * PrevScaleFactor) + screenoffsetX, (PreviousY * PrevScaleFactor) + screenoffsetY);
			SpiroPrev.lineTo((XCoord * PrevScaleFactor) + screenoffsetX, (YCoord *PrevScaleFactor) + screenoffsetY);
			SpiroPrev.strokeStyle = "rgb(180,180,180)";
			SpiroPrev.stroke();
			PreviousX = XCoord;
			PreviousY = YCoord;
			headerCode.push(
			"M2," + (PreviousX * CutScaleFactor).toFixed(3) + "," + (PreviousY * CutScaleFactor).toFixed(3)
			)

			}

        };
	};
 $('#submit').on('click', function (){
	 headerCode.push(
	 "MZ," + SafeZ
	 )
	 var ShopBotCode = headerCode.join('\n');
	 fabmo.submitJob({
            file: ShopBotCode,
            filename : 'sbograph.sbp',
            name : 'ShopBot-O-Graph',
            description : 'Cut a Spirograph pattern'
        });
//	 var ShopBotCode = headerCode.join('\n');
//				fabmoDashboard.submitJob(ShopBotCode, {filename : 'sbograph.sbp'}
//             );
	});
