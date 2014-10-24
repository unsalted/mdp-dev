// A large portion of this code is straight from the polymaps streets example: 
// https://github.com/simplegeo/polymaps/tree/master/examples/streets


var po = org.polymaps;

var color = pv.Scale.linear()
    .domain(0, 50, 70, 100)
    .range("#F00", "#930", "#FC0", "#3B0");

var map = po.map()
    .container(document.getElementById("map").appendChild(po.svg("svg")))
    .center({lat: 34.065695, lon: -118.35307})
    .zoom(16)
    .zoomRange([12, 20])
    .add(po.interact());


// From Paul Kaplans Gist
// https://gist.github.com/paulkaplan/5184275
 
    
function KtoRGB(kelvin){
 
    var temp = kelvin / 100;
 
    var red, green, blue;
 
    if( temp <= 66 ){ 
 
        red = 255; 
        
        green = temp;
        green = 99.4708025861 * Math.log(green) - 161.1195681661;
 
        
        if( temp <= 19){
 
            blue = 0;
 
        } else {
 
            blue = temp-10;
            blue = 138.5177312231 * Math.log(blue) - 305.0447927307;
 
        }
 
    } else {
 
        red = temp - 60;
        red = 329.698727446 * Math.pow(red, -0.1332047592);
        
        green = temp - 60;
        green = 288.1221695283 * Math.pow(green, -0.0755148492 );
 
        blue = 255;
 
    }
 
 
    return {
        r : clamp(red,   0, 255),
        g : clamp(green, 0, 255),
        b : clamp(blue,  0, 255)
    }
 
}
 
 
function clamp( x, min, max ) {
 
    if(x<min){ return min; }
    if(x>max){ return max; }
 
    return Math.round(x);   //added to get whole values
 
}

map.add(po.image()
    .url(po.url("http://{S}tile.cloudmade.com"  // need to change to a different map channel.
    + "/1a1b06b230af4efdbb989ea99e9841af" // http://cloudmade.com/register
    + "/999/256/{Z}/{X}/{Y}.png")
    .hosts(["a.", "b.", "c.", ""])));

map.add(po.geoJson()
    .url("./data/GPSLOG106.geo.json") // converted from xml using: http://mapbox.github.io/togeojson/
    .id("dot")
    .zoom(16)
    .tile(false)
  .on("load", po.stylist()
    .attr("fill", function(d) { return (
            "rgb("+
            KtoRGB(d.properties.color_temp).r+","+
            KtoRGB(d.properties.color_temp).g+","+
            KtoRGB(d.properties.color_temp).b+")"
        )
    })
    .attr("r", function(d) { return .9})
    .title(function(d) { return d.properties.time + ": " + d.properties.color_temp + " Kelvin"; }))
  );

map.add(po.compass()
    .pan("none"));
