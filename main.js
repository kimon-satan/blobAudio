var synth;
var isUnlocked = false;
var relfunc;

window.addEventListener('touchstart', function() {

	if(!isUnlocked){
		unlock();
	}

}, false);

$(document).ready(function(){

// Start off by initializing a new context.




	canvas = $('#canvas')[0];
    canvas.setAttribute('width', window.innerWidth);
    canvas.setAttribute('height', window.innerHeight);
    var ctxt = canvas.getContext('2d');
    ctxt.fillStyle = "black";
    ctxt.fillRect(0,0,canvas.width, canvas.height);


	//synth.loadWaveTable(wavetable);

	canvas.addEventListener("touchstart", function (e) {

		onset();

	});

	canvas.addEventListener("mousedown", function (e) {
		
		onset();

	});

});


function onset(){

	if(!synth)
	{	
		synth = new NoiseSynth();
		synth.play();
	}

	clearInterval(relfunc);

	//synth.setDelayAmount(0.5);
	//synth.setDelayTime(1.5);
	
	synth.ramp(0.5, 500);

	relfunc = setTimeout(function(){

		synth.release(1000);
		synth = null;

	}, 4000);

}

//IOS workaround

function unlock() {
			
	console.log("unlocking")

	// create empty buffer and play it
	var buffer = context.createBuffer(1, 1, 22050);
	var source = context.createBufferSource();
	source.buffer = buffer;
	source.connect(context.destination);
	source.noteOn(0);

	// by checking the play state after some time, we know if we're really unlocked
	setTimeout(function() {
		if((source.playbackState === source.PLAYING_STATE || source.playbackState === source.FINISHED_STATE)) {
			isUnlocked = true;
		}
	}, 0);

}