Energy.ResultView = Ember.View.extend({
    templateName: 'result',
    classNames: ['wrapper'],
    graphColor: '#105A70',
    yAxisHeader: 'Consumption in thousands',
    didInsertElement: function() {
        this.setInitialData();
    },
    /*
        setinitialData() sets the data required to draw the graph.
    */
    setInitialData: function() {
        var consumptionData = this.get('controller.consumptionData'),
            length = consumptionData.length,
            toolTip = [],
            graphData = [],
            xaxisTicks = [],
            value, i;
        for(i = 0; i < length; i = i + 1) {
            value = consumptionData[i];
            graphData.push([i, value]);
            if(i === 0) {
                toolTip.push('Your Consumption: ' + value);
                xaxisTicks.push([i, 'Your Consumption']);
            } else {
                toolTip.push('Average Consumption: ' + value);
                xaxisTicks.push([i, 'Average Consumption']);
            }
        }
        this.setProperties({
            'xaxisTicks': xaxisTicks,
            'graphData': graphData,
            'toolTip': toolTip
        });
    },
    /*
        drawChart() is called when we set the data.
        In this function we set all parameters of flot to draw graph and to show tooltip.
    */
    drawChart: function() {
        var plot = $.plot(this.$('.chart'), [{data: this.get('graphData')}],
         {
            series: {
                bars: {
                    show: true,
                    barWidth: 0.3,
                    align: "center",
                    fillColor: this.get('graphColor')
                },
                lines: {
                    show: false,
                    fill: false,
                }
            },
            grid: {
            	show:true,
                hoverable: true,
                clickable: true,
                markings: function (axes) {
				   	var ymin = axes.yaxis.min,
				    	xmin = axes.xaxis.min;
				    return [{
				        color: 'black',
				        lineWidth: 0.8,
				        yaxis: {
				            from: ymin,
				            to: ymin
				        }
				    }, {
				        color: 'black',
				        lineWidth: 0.8,
				        xaxis: {
				            from: xmin,
				            to: xmin
				        }
				    }];
				},
                borderWidth: 0,
                mouseActiveRadius: 5
            },
            colors: [this.get('graphColor')],
            xaxis: {
                min: -1,
                max: 2,
                ticks: this.get('xaxisTicks'),
                tickWidth: null,
                tickLength:null,
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 14,
                axisLabelFontFamily: 'Arial',
                axisLabelPadding: 10
            },
            yaxis: {
            	min:0,
                axisLabel: this.get('yAxisHeader'),
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 14,
                axisLabelFontFamily: 'Arial',
                axisLabelPadding: 10
            },
            contextView: this
        });
		console.log();
        function showBarTooltip(x, y, contents, color) {
                $('<div id="tooltip">' + contents + '</div>').css({
                    position: 'absolute',
                    display: 'none',
                    top: y - 25,
                    left: x,
                    border: '1px solid ' + color,
                    padding: '4px',
                    'font-size': '12px',
                    'border-radius': '2px',
                    'background-color': '#fff',
                    'font-family': 'Arial, Helvetica, Tahoma, sans-serif',
                    opacity: 1,
                    'z-index': 16
                }).appendTo("body").fadeIn(0);

            }
            this.$('.chart').on("plothover", {
                self: this
            }, function(event, pos, item) {
                var self = event.data.self;
                var previousPoint;
                var previousLabel;
                self.$("#x").text(pos.x.toFixed(2));
                self.$("#y").text(pos.y.toFixed(2));
                if (item) {
                    if ((previousPoint !== item.dataIndex) || (previousLabel !== item.series.label)) {
                        previousPoint = item.dataIndex;
                        previousLabel = item.series.label;
                        $("#tooltip").remove();
                        showBarTooltip(pos.pageX, pos.pageY, self.get('toolTip')[item.dataIndex], self.get('graphColor'));
                    }
                } else {
                    $("#tooltip").remove();
                    previousPoint = null;
                }
            });
    }.observes('graphData')
});
