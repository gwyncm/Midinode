var easymidi = require('easymidi');

var inputs = easymidi.getInputs();
var outputs = easymidi.getOutputs();

console.log("Inputs ",inputs)
console.log("Outputs ",outputs)

var input = new easymidi.Input('Scarlett 2i4 USB');
input.on('noteon', function (msg) {
    console.log("Got ",msg)
});

var output = new easymidi.Output('Scarlett 2i4 USB');
var notes = [ 47,48,49,50,51,52,53,54 ]
var next = 0
var counter = 0

function sensTest() {
    var rn = Math.random()
    //console.log('Got ',data.state.presence,' Counter ',counter); 
    console.log('Got ',rn,' Counter ',counter); 
    //if (data.state.presence) counter=20; 
    if (rn>.5) counter=20; 
    if (counter>0)  counter--; 
    if (counter) sendNext() 
    if (counter == 18) {
            output.send('noteon', {
            note:55, 
            velocity: 127,
            channel: 1
            });
        }
    if (counter == 2) {
            console.log("Counter ",counter," send off")
            output.send('noteon', {
            note:55, 
            velocity: 127,
            channel: 1
            });
        }
}

function sendNext() {

output.send('noteon', {
  note: notes[next],
  velocity: 127,
  channel: 1
  });
next += 1
if (next > 7 ) next = 0
}

setInterval(() => { console.log("Read next ",next); sensTest() },5000)
