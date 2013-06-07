//Parry Cadwallader
//github.com/parryc
(function (root){
	function colorscale(){
		return {
			data: [],
			options: {output: 'rgb'},
			init: function(data){
				var tempData = [];
				//Check if tinycolor is being used
				if(window.tinycolor) {
					data.forEach(function(v,i){
						tempData.push({value: v.value, color: tinycolor(v.color).toRgb()});
					});
					data = tempData;
				} else {
					//Check to make sure that there's a transparency value
					data.forEach(function(v,i){
						if(!v.a)
							data[i].color.a = 1;
					});
				}
				this.data = data;
			},
			interp: function(c1,c2,per){
				var r = c1.r + (per*(c2.r-c1.r)),
					g = c1.g + (per*(c2.g-c1.g)),
					b = c1.b + (per*(c2.b-c1.b)),
					a = c1.a + (per*(c2.a-c1.a));
				return this.output({r:r,b:b,g:g,a:a});
			},
			output: function(color){
				var output = this.options.output;
				if(!output || output === 'rgb') {
					if(color.a != 1)
						return 'rgba('+color.r+','+color.g+','+color.b+','+color.a+')';
					else
						return 'rgb('+color.r+','+color.g+','+color.b+')';
				}
				if(output === 'hex') {
					return '#'+parseInt(color.r,16)+parseInt(color.g,16)+parseInt(color.b,16);
				}
			},
			pick: function(point){
				var data = this.data,
					min = data[0].value,
					minColor = data[0].color,
					max = data[1].value,
					maxColor = data[1].color,
					windowMin, windowMax;
				//Find which two colors to interpolate between
				for(var i = 0; i < data.length-1; i++){
					windowMin = data[i].value;
					windowMax = data[i+1].value;

					if(windowMin <= point <= windowMax) {
						min = data[i].value;
						minColor = data[i].color;
						max = data[i+1].value;
						maxColor = data[i+1].color;
					}
				}
				return this.interp(minColor,maxColor,((point-min)/(max-min)));
			},
			setOutput: function(output){
				this.options.output = output;
			}
		};
	}

	//export to window
	root.colorscale = colorscale();
})(this);