define([
	"dojo/_base/declare", "esri/tasks/query", "esri/tasks/QueryTask", "esri/layers/FeatureLayer", "esri/dijit/Search", "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol","esri/symbols/SimpleMarkerSymbol", "esri/graphic", "dojo/_base/Color"
],
function ( declare, Query, QueryTask,FeatureLayer, Search, SimpleLineSymbol, SimpleFillSymbol, SimpleMarkerSymbol, Graphic, Color) {
        "use strict";

        return declare(null, {
			eventListeners: function(t){
				t.obj.waterRiseVal = 1
				t.obj.wetlandVal = 'Age_Ras';
				t.obj.viewResultsTracker = 'final'

				$('#' + t.id + 'viewRankingText').on('click', function(v){
					let text = v.currentTarget.textContent;
					if(text == 'View Ranking Thresholds'){
						$('.risk-rankingThresholdText').slideDown();
						$(v.currentTarget).html('Hide Ranking Thresholds')
						$(v.currentTarget).css('color', 'rgb(140, 33, 48)')
					}else{
						$('.risk-rankingThresholdText').slideUp();
						$(v.currentTarget).html('View Ranking Thresholds');
						$(v.currentTarget).css('color', '#2f6384');
					}
				})
				// main rad buttons click
				$('.risk-resultsRadBtns input').on('click', function(evt){
					t.obj.visibleLayers = []
					$.each($('.risk-wetlandsSuitWrapper input'), function(i,v){
						$(v).attr('disabled', true);
					})
					if(evt.currentTarget.value == 'final'){
						let layer;
						if(t.obj.waterRiseVal == 1){
							layer = 15
						}else if(t.obj.waterRiseVal == 2){
							layer = 16
						}else if(t.obj.waterRiseVal == 3){
							layer = 17
						}else if(t.obj.waterRiseVal == 4){
							layer = 18
						}
						t.obj.visibleLayers.push(layer)
						t.obj.viewResultsTracker = 'final'
						$('.risk-waterRiseWrapper').slideDown()
					}else if(evt.currentTarget.value == 'combExp'){
						let layer;
						if(t.obj.waterRiseVal == 1){
							layer = 11
						}else if(t.obj.waterRiseVal == 2){
							layer = 12
						}else if(t.obj.waterRiseVal == 3){
							layer = 13
						}else if(t.obj.waterRiseVal == 4){
							layer = 14
						}
						t.obj.visibleLayers.push(layer)
						t.obj.viewResultsTracker = 'combExp'
						$('.risk-waterRiseWrapper').slideDown()
					}else if(evt.currentTarget.value == 'combVul'){
						t.obj.visibleLayers.push(10)
						t.obj.viewResultsTracker = 'combVul'
						$('.risk-waterRiseWrapper').slideUp()
					}else if(evt.currentTarget.value == 'individual'){
						$.each($('.risk-wetlandsSuitWrapper input'), function(i,v){
							$(v).attr('disabled', false);
						})
						let layerVal;
						if(t.obj.wetlandVal == 'coastalFlood'){
							if (t.obj.waterRiseVal ==1 ) {
								layerVal = 6
							}else if(t.obj.waterRiseVal == 2){
								layerVal = 7
							}else if(t.obj.waterRiseVal == 3){
								layerVal = 8
							}else if(t.obj.waterRiseVal == 4){
								layerVal = 9
							}
							t.obj.visibleLayers.push(layerVal)
							$('.risk-waterRiseWrapper').slideDown()
						}else{
							t.obj.visibleLayers.push(t.layersNameArray.indexOf(t.obj.wetlandVal))
							$('.risk-waterRiseWrapper').slideUp()
						}
						t.obj.viewResultsTracker = 'individual'
					}
					t.dynamicLayer.setVisibleLayers(t.obj.visibleLayers);
				})

				// on individual radio button click
				$('.risk-wetlandsSuitWrapper input').on('click', function(evt){
					t.obj.visibleLayers = []
					t.obj.wetlandVal = evt.currentTarget.value;
					if(t.obj.wetlandVal == 'coastalFlood'){
						// display the layer based on the water rise slider
						let layerVal;
						if (t.obj.waterRiseVal ==1 ) {
							layerVal = 6
						}else if(t.obj.waterRiseVal == 2){
							layerVal = 7
						}else if(t.obj.waterRiseVal == 3){
							layerVal = 8
						}else if(t.obj.waterRiseVal == 4){
							layerVal = 9
						}
						t.obj.visibleLayers.push(layerVal)
						// slide up slider bar
						$('.risk-waterRiseWrapper').slideDown()
					}else{
						// display layer based on the value passed
						t.obj.visibleLayers.push(t.layersNameArray.indexOf(t.obj.wetlandVal))
						// slide up slider bar
						$('.risk-waterRiseWrapper').slideUp()
					}
					t.dynamicLayer.setVisibleLayers(t.obj.visibleLayers);
				})
				// on water rise slide
				$("#" + t.id + "sldr").on('slide', function(v, ui){
					t.obj.waterRiseVal = ui.value
					t.obj.visibleLayers = []
					if(t.obj.viewResultsTracker == 'final'){
						let layer;
						if(t.obj.waterRiseVal == 1){
							layer = 15
						}else if(t.obj.waterRiseVal == 2){
							layer = 16
						}else if(t.obj.waterRiseVal == 3){
							layer = 17
						}else if(t.obj.waterRiseVal == 4){
							layer = 18
						}
						t.obj.visibleLayers.push(layer)
					}else if(t.obj.viewResultsTracker == 'individual' && t.obj.wetlandVal  =='coastalFlood'){
						let layerVal;
						if (t.obj.waterRiseVal ==1 ) {
							layerVal = 6
						}else if(t.obj.waterRiseVal == 2){
							layerVal = 7
						}else if(t.obj.waterRiseVal == 3){
							layerVal = 8
						}else if(t.obj.waterRiseVal == 4){
							layerVal = 9
						}
						t.obj.visibleLayers.push(layerVal)
					}else if(t.obj.viewResultsTracker == 'combExp'){
						let layerVal;
						if (t.obj.waterRiseVal ==1 ) {
							layerVal = 11
						}else if(t.obj.waterRiseVal == 2){
							layerVal = 12
						}else if(t.obj.waterRiseVal == 3){
							layerVal = 13
						}else if(t.obj.waterRiseVal == 4){
							layerVal = 14
						}
						t.obj.visibleLayers.push(layerVal)
					}
					t.dynamicLayer.setVisibleLayers(t.obj.visibleLayers);
				})

				// $('#' + t.id + 'viewChangeText').on('click', function(v){
				// 	let text = v.currentTarget.textContent;
				// 	if(text == 'View Change Scenarios'){
				// 		$('.risk-floodText').slideDown();
				// 		$(v.currentTarget).html('Hide Change Scenarios')
				// 		$(v.currentTarget).css('color', 'rgb(140, 33, 48)')
				// 	}else{
				// 		$('.risk-floodText').slideUp();
				// 		$(v.currentTarget).html('View Change Scenarios');
				// 		$(v.currentTarget).css('color', '#2f6384');
				// 	}
				// })

			},
			
			commaSeparateNumber: function(val){
				while (/(\d+)(\d{3})/.test(val.toString())){
					val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
				}
				return val;
			},
			abbreviateNumber: function(num) {
			    if (num >= 1000000000) {
			        return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
			     }
			     if (num >= 1000000) {
			        return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
			     }
			     if (num >= 1000) {
			        return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
			     }
			     return num;
			}
        });
    }
);
