# Colorscale

Making some craaazy colorscales for all your colorful needs. (Note: this has no visual component)

## What it does
Makes an easy interpolator for multi-point linear color scales.  For example, if you have a weather scale, you might have it go from 
purple to white from -40 degrees to 0, and then from white to blue for 0+ to 50.  This will help you figure out which color 7 degrees should be. 

## Install

There are two flavors: raw or with [bgrins' TinyColor](http://bgrins.github.io/TinyColor/)
Raw is simply ```colorscale.js```, throw in ```tinycolor.js``` if you want to have all of its many conversions available done.


## How to use
Create ```create(colors, name)``` a color scale with a set of points and associated color and a name for the scale. The ```colors``` array is an array of objects containing ```value```, the number to associate with the color, and ```color```, a color object. Examples below.

*(with TinyColor)*
````
colorscale.create([
	{value: 0, color: "rgb(0,0,255)"},
	{value: 10, color: "rgba(0,255,0,.5)"}
], "example1");
````
*(without TinyColor)*
````
colorscale.create([
	{value: 0, color: {r:0,g:0,b:0}},
	{value: 10, color: {r:0,g:255,b:0,a:.5}}
], "example2");
````

After that it's a simple as ```colorscale.NAME.pick(NUMBER)``` and it will return a string with the interpolated color, e.g. ```colorscale.example1.pick(5)```

## Options

* ```setOutput```: with TinyColor: rgb,hex,hsl,hsv.  Without: just rgb is accepted.

## License

[MIT](http://parryc.mit-license.org/)
