$(document).ready(function() {
    $("#navbar ul li").removeClass("active");
    $("#Home").addClass("active");
    
    var ctx = document.getElementById("myChart");
    var ctx2 = document.getElementById("myChart2");
    var ctx3 = document.getElementById("myChart3");
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

var myChart = new Chart(ctx2, {
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

var data2 = {
    labels: ["January", "February", "March",],
    
    datasets: [
        {
            label: "Incoming",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            
            data: [65, 59, 80, 81, 56, 55, 40]
           
        },
        {
            label: 'Outcoming',
            fill:false,
            data: [65, 59, 80, 81, 56, 55, 40]
        }
    ]
};

var myLineChart = new Chart(ctx3, {
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









});