/* FOR BAR CHART DSAHBOARD  */
var data = [
    {
        "categorie": "29-jan", 
        "values": [
            {
                "value": 170, 
                "rate": "Leads"
            }, 
            {
                "value": 100, 
                "rate": "Audited"
            }
        ]
    }, 
    {
        "categorie": "28-jan", 
        "values": [
            {
                "value": 140, 
                "rate": "Leads"
            }, 
            {
                "value": 90, 
                "rate": "Audited"
            }
        ]
    },
    {
        "categorie": "27-jan", 
        "values": [
            {
                "value": 160, 
                "rate": "Leads"
            }, 
            {
                "value": 50, 
                "rate": "Audited"
            }
        ]
    },
    {
        "categorie": "26-jan", 
        "values": [
            {
                "value": 190, 
                "rate": "Leads"
            }, 
            {
                "value": 150, 
                "rate": "Audited"
            }
        ]
    },
    {
        "categorie": "25-jan", 
        "values": [
            {
                "value": 100, 
                "rate": "Leads"
            }, 
            {
                "value": 80, 
                "rate": "Audited"
            }
        ]
    },{
        "categorie": "24-jan", 
        "values": [
            {
                "value": 100, 
                "rate": "Leads"
            }, 
            {
                "value": 70, 
                "rate": "Audited"
            }
        ]
    },{
        "categorie": "23-jan", 
        "values": [
            {
                "value": 100, 
                "rate": "Leads"
            }, 
            {
                "value": 50, 
                "rate": "Audited"
            }
        ]
    },
    
];


var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = $("#a_sum").width() - margin.left - margin.right,
    height = $("#a_sum").height() - margin.top - margin.bottom;

var x0 = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var x1 = d3.scale.ordinal();

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x0)
    .tickSize(0)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var color = d3.scale.ordinal()
    .range(["#26c6da","#1e88e5", "#ffb22b", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

var svg = d3.select('#a_sum').append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//d3.json(url, function(error, data) {
    //console.log(data);

  var categoriesNames = data.map(function(d) { return d.categorie; });
  var rateNames = data[0].values.map(function(d) { return d.rate; });

  x0.domain(categoriesNames);
  x1.domain(rateNames).rangeRoundBands([0, x0.rangeBand()]);
  y.domain([0, d3.max(data, function(categorie) { return d3.max(categorie.values, function(d) { return d.value; }); })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .style('opacity','0')
      .call(yAxis);
  //.append("text")
  //    .attr("transform", "rotate(-90)")
  //    .attr("y", 6)
  //    .attr("dy", ".71em")
   //   .style("text-anchor", "end");
      //.style('font-weight','bold');
      //.text("Value");

  svg.select('.y').transition().duration(500).delay(1300).style('opacity','1');

  var slice = svg.selectAll(".slice")
      .data(data)
      .enter().append("g")
      .attr("class", "g")
      .attr("transform",function(d) { return "translate(" + x0(d.categorie) + ",0)"; });

  slice.selectAll("rect")
      .data(function(d) { return d.values; })
  .enter().append("rect")
      .attr("width", x1.rangeBand())
      .attr("x", function(d) { return x1(d.rate); })
      .style("fill", function(d) { return color(d.rate) })
      .attr("y", function(d) { return y(0); })
      .attr("height", function(d) { return height - y(0); })
      .on("mouseover", function(d) {
          d3.select(this).style("fill", d3.rgb(color(d.rate)).darker(2));
      })
      .on("mouseout", function(d) {
          d3.select(this).style("fill", color(d.rate));
      });

  slice.selectAll("rect")
      .transition()
      .delay(function (d) {return Math.random()*1000;})
      .duration(1000)
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) { return height - y(d.value); });

  //Legend
 /* var legend = svg.selectAll(".legend")
      .data(data[0].values.map(function(d) { return d.rate; }).reverse())
  .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d,i) { return "translate(0," + i * 20 + ")"; })
      .style("opacity","0");

  legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", function(d) { return color(d); }); 

  legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) {return d; });

  legend.transition().duration(500).delay(function(d,i){ return 1300 + 100 * i; }).style("opacity","1");*/

//});
/* END BAR CHART DSAHBOARD  */

/*Transitional pie CHART DSAHBOARD  */
/// d3 actionsssss		
var sdata=[{"Type":"Approved","total":555},{"Type":"Non-Approved","total":365},{"Type":"Pending","total":81}];
var ddata=[{"Type":"Genuine","total":500},{"Type":"Non-Genuine","total":188}];
var tdata=[{"Type":"Fatal","total":345},{"Type":"qulaity","total":890}];

var width = $("#t_bar").width(),
    height = $("#t_bar").width(),
    radius = Math.min(width, height) / 2;


var arc = d3.svg.arc()
    .outerRadius(radius - 10)
    .innerRadius(radius - 70);

var pie = d3.layout.pie()
    .sort(null)
    .value(function (d) {
    return d.total;
});

var color = d3.scale.ordinal()
    .range(["#26c6da","#1e88e5", "#ffb22b", "#26c6da", "#1e88e5", "#26c6da", "#1e88e5"]);

var svg = d3.select("#s_bar").append("svg")
    .attr("width", '100%')
    .attr("height", '100%')
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    
var svg1 = d3.select("#d_bar").append("svg")
.attr("width", '100%')
.attr("height", '100%')
.append("g")
.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var svg2 = d3.select("#t_bar").append("svg")
.attr("width", '100%')
.attr("height", '100%')
.append("g")
.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var g = svg.selectAll(".arc")
        .data(pie(sdata))
        .enter().append("g")
        .attr("class", "arc").on('mouseover', function() {
            var current = this;  
            var others = svg.selectAll(".arc").filter(function(el) {
                return this != current
            });
            others.selectAll("path").style('opacity', 0.3);
        })
        .on('mouseout', function() {
            var current = this;
            d3.select(this)
                .style('opacity', 1);
            var others = svg.selectAll(".arc").filter(function(el) {
                return this != current
            });
            others.selectAll("path").style('opacity', 1);
        });;
    var g1 = svg1.selectAll(".arc")
        .data(pie(ddata))
        .enter().append("g")
        .attr("class", "arc")
        .on('mouseover', function() {
                var current = this;  
                var others = svg1.selectAll(".arc").filter(function(el) {
                    return this != current
                });
                others.selectAll("path").style('opacity', 0.3);
            })
            .on('mouseout', function() {
                var current = this;
                d3.select(this)
                    .style('opacity', 1);
                var others = svg1.selectAll(".arc").filter(function(el) {
                    return this != current
                });
                others.selectAll("path").style('opacity', 1);
            });
    var g2 = svg2.selectAll(".arc")
        .data(pie(tdata))
        .enter().append("g")
        .attr("class", "arc").on('mouseover', function() {
            var current = this;  
            var others = svg2.selectAll(".arc").filter(function(el) {
                return this != current
            });
            others.selectAll("path").style('opacity', 0.3);
        })
        .on('mouseout', function() {
            var current = this;
            d3.select(this)
                .style('opacity', 1);
            var others = svg2.selectAll(".arc").filter(function(el) {
                return this != current
            });
            others.selectAll("path").style('opacity', 1);
        });;

    g.append("path")
        .attr("d", arc)
        .style("fill", function (d) {
        return color(d.data.Type);
    });
    g.append("svg:text")
    .attr("transform", function(d){
        d.innerRadius = 100; /* Distance of label to the center*/
        d.outerRadius = height/2;
        return "translate(" + arc.centroid(d) + ")";}
    )
    .attr("text-anchor", "middle")
    .text( function(d, i) {return d.data.total;})
;
    /*g.append("text")
        .attr("transform", function (d) {
        return "translate(" + arc.centroid(d) + ")";
    })
        .attr("dy", ".35em")
        .style("text-anchor", "middle");
    */
    g1.append("path")
        .attr("d", arc)
        .style("fill", function (d) {
        return color(d.data.Type);
    });
    g1.append("svg:text")
    .attr("transform", function(d){
        d.innerRadius = 100; /* Distance of label to the center*/
        d.outerRadius = height/2;
        return "translate(" + arc.centroid(d) + ")";}
    )
    .attr("text-anchor", "middle")
    .text( function(d, i) {return d.data.total;})
    g2.append("path")
        .attr("d", arc)
        .style("fill", function (d) {
        return color(d.data.Type);
    });
    g2.append("svg:text")
    .attr("transform", function(d){
        d.innerRadius = 100; /* Distance of label to the center*/
        d.outerRadius = height/2;
        return "translate(" + arc.centroid(d) + ")";}
    )
    .attr("text-anchor", "middle")
    .text( function(d, i) {return d.data.total;})
        //.text(function (d) {
        //return d.data.Type;
        //});
/* END Transitional pie CHART DSAHBOARD  */