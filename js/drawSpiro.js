var headerCode 

$('.basic-link').on('click', function (){
	$('.basic').show();
	$('.advanced').hide();
	//$('.lock').hide();
	//$('.unlock').hide();
	$('.advanced').attr("disabled", "true");
	$('.advanced + ul').hide();
	$('.basic + ul').show();
});
$('.advanced-link').on('click', function (){
	$('.basic').hide();
	$('.advanced').show();
	//$('.lock').show();
	//$('.unlock').hide();
	$('.advanced').attr("disabled", "true");
	$('.parsley-required').hide();
	$('.advanced + ul').show();
	$('.basic + ul').hide();
});
$('#Resolution').on('change', function(){
    $('#Resolution-val').val($('#Resolution').val());       
});

$('#Ring-gear').on('change', function(){
    $('#Ring-gear-val').val($('#Ring-gear').val()); 
	$('#Rolling-gear').attr('max', $('#Ring-gear').val()- 1);	
});

$('#Rolling-gear').on('change', function(){
	$('#Rolling-gear').attr('max', $('#Ring-gear').val()- 1);
    $('#Rolling-gear-val').val($('#Rolling-gear').val());  
	//$('#Offset').attr('max', $('#Rolling-gear').val()- 1);
});

$('#Offset').on('change', function(){
    $('#Offset-val').val($('#Offset').val());         
});

$('#Revs').on('change', function(){
    $('#Revs-val').val($('#Revs').val());         
});
$('#draw').click(function() {
	

    var worksheetCanvas = $('#worksheet-canvas');
    var context = worksheetCanvas.get(0).getContext("2d");
	context.clearRect(0, 0, 600, 600);
	
	var screenoffsetX = 300
	var screenoffsetY = 300
	var twopi = 6.28318530717959
	var iterCount = 0
	var maxValue = 0
    var radius	
	
    var segnum = parseFloat($('#Resolution').val());//Val(Form1.txtResolution.Text)
   // $('#Resolution-val').text(segnum);	
	var segment = twopi / segnum

	var Ring = parseFloat($('#Ring-gear').val()); //Val(Form1.txtRing.Text) 
    //$('#Ring-gear-val').text(Ring);  
	var Rolling = parseFloat($('#Rolling-gear').val()); //Val(Form1.txtRolling.Text) 
    //$('#Rolling-gear-val').text(Rolling);	
	var Offset = (Rolling / 100) * parseFloat($('#Offset').val()); //Val(Form1.txtOffset.Text) 
	//$('#Offset-val').text(Offset);	
	var Revs = parseFloat($('#Revs').val()); //Val(Form1.txtRevs.Text)
	//$('#Revs-val').text(Revs);
	//var scalefactor = parseFloat($('#hole-diameter').val()); //(Form1.txtZoom.Text) / 100

	var inside  
	
    if ($('#radioInside').prop('checked')) {
		inside = 1		
        radius = Ring - Rolling
		}
		else
		{
        radius = Ring + Rolling
        inside = -1
		}

	headerCode = [ 
		"' File created by ShopBot-O-Graph v1.00",
        "' Copyright 2016 Bill Young and ShopBot Tools ",
        "'",
        "' Pattern is centered at 0,0",
        //"' and is " + txtSize.Text; " in diameter"
        "'",
        "' Ring gear radius... " + Ring,
        "' rolling gear radius... " + Rolling,
        "' offset %... " + Offset,
        "' # of revolutions... " + Revs,
        "' # of line segments per revolution... " + segnum,
        "'",
		"MZ, .25",
        "SO,1,1",
		"PAUSE 2",
		"'"
		];

	var count
	var XCoord 
	var YCoord 
	var prevx
    var prevy	
	for (count = 0; count < Revs; count = (count + segment)) { 
		
        XCoord = (radius * Math.cos(count)) + ((inside) * ((Rolling + Offset) * Math.cos(((radius / Rolling) * count))))
        YCoord = 0 - ((radius * Math.sin(count)) - (Rolling + Offset) * Math.sin(((radius / Rolling) * count)))
	
		
        if (Math.abs(XCoord) > maxValue) {
			maxValue = XCoord
		}
			console.log(iterCount);		
        if (iterCount == 0) {
            prevx = XCoord
            prevy = YCoord
            iterCount = 1
			
			headerCode.push(
				"M2," + prevx + "," + prevy,
				"MZ, -0.1" 
				)
			}
		else{
 
			var c = document.getElementById("worksheet-canvas");
			var ctx= c.getContext("2d");

			
			ctx.beginPath();
			ctx.moveTo(prevx + screenoffsetX, prevy + screenoffsetY);
			ctx.lineTo(XCoord + screenoffsetX, YCoord + screenoffsetY);
			context.strokeStyle = "rgb(180,180,180)";
			ctx.stroke();
			prevx = XCoord;
			prevy = YCoord;
			headerCode.push(
			"M2," + prevx + "," + prevy
			)

			}

        };
	});
 $('#submit').on('click', function (){
	 headerCode.push(
	 "MZ, -0.1"
	 )
	 var ShopBotCode = headerCode.join('\n');
				fabmoDashboard.submitJob(ShopBotCode, {filename : 'sbograph.sbp'}
										
             );	
	});	 
 