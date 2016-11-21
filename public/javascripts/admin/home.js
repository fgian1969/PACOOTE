$(document).ready(function() {
    $("#navbar ul li").removeClass("active");
    $("#Home").addClass("active");
    console.log("Admin home");
    var ctx = document.getElementById("myChart");
    var ctx2 = document.getElementById("myChart2");
    var ctx3 = document.getElementById("myChart3");
    var ctx4 = document.getElementById("myChart4");
   var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul","Aug","Sep","OCt","Nov","Dec"],
        datasets: [{
            label: '# of delivery',
            data: [12, 19, 21, 34, 22, 33,44,33,44,55,66,77],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)', //re
                'rgba(54, 162, 235, 0.2)', //blue
                'rgba(255, 206, 86, 0.2)', //yellow
                'rgba(75, 192, 192, 0.2)', //green
                'rgba(153, 102, 255, 0.2)',//purple
                'rgba(255, 159, 64, 0.2)',  //orange
                'rgba(255, 99, 132, 0.2)', //re
                'rgba(54, 162, 235, 0.2)', //blue
                'rgba(255, 206, 86, 0.2)', //yellow
                'rgba(75, 192, 192, 0.2)', //green
                'rgba(153, 102, 255, 0.2)',//purple
                'rgba(255, 159, 64, 0.2)'  //orange
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});

var data2 = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
        {
            label: "My First dataset",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 120, 56, 55, 40],
        }
    ]
};

var myLineChart = new Chart(ctx2, {
    type: 'line',
    data: data2,
     options: {
        scales: {
            xAxes: [{
                type: 'linear',
                position: 'bottom'
            }]
        }
    }
});



var data3 = {
    labels: [
        "UPS",
        "Fedex",
        "Bartolini"
    ],
    datasets: [
        {
            data: [300, 50, 100],
            backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56"
            ],
            hoverBackgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56"
            ]
        }]
};

// For a pie chart
var myPieChart = new Chart(ctx3,{
    type: 'pie',
    data: data3,
    options: {
        label: "#delivery for carrier"
    }
});


var myChart = new Chart(ctx4, {
    type: 'bar',
    data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul","Aug","Sep","OCt","Nov","Dec"],
        datasets: [{
            label: '# of order by month',
            data: [12, 19, 21, 34, 22, 33,44,33,44,55,66,77],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)', //re
                'rgba(54, 162, 235, 0.2)', //blue
                'rgba(255, 206, 86, 0.2)', //yellow
                'rgba(75, 192, 192, 0.2)', //green
                'rgba(153, 102, 255, 0.2)',//purple
                'rgba(255, 159, 64, 0.2)',  //orange
                'rgba(255, 99, 132, 0.2)', //re
                'rgba(54, 162, 235, 0.2)', //blue
                'rgba(255, 206, 86, 0.2)', //yellow
                'rgba(75, 192, 192, 0.2)', //green
                'rgba(153, 102, 255, 0.2)',//purple
                'rgba(255, 159, 64, 0.2)'  //orange
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});


});