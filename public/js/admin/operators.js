var tabellaOperators;

// DOM Ready =============================================================
$(document).ready(function() {
    $("#navbar ul li").removeClass("active");
    $("#operators").addClass("active");
    $.ajax({
            url: '/rest/carrier/getCarrierList',
            type: 'POST',
            async: true,
            //data: parametri,
            contentType: 'application/json; charset=utf-8',
            datatype: 'json',
        }).done(function (data) {
			$.each(data,function(key, value) 
			{
    			$('#carrier').append('<option value=' + value.id + '>' + value.company + '</option>');
			});
			LoadOperators();
        });
     
	
	$('#addOperator').click(function(){
        
		$("#modalSend").data("key",0);
		$("#operatorcode").val('');
		$("#operatorpass").val('');
    	$("#operatorpass2").val('');
	    $("#operatorfullname").val('');
		$("#carrier").val(0);
		$("#modalSend").modal("toggle");
		
        /*
        var key='16ae74f7-5607-49a0-9776-48d2b144219e-3224';
        var lat=45.4644223;
        var long=9.1902513;
		parametri = JSON.stringify({
            key: key,
            latitude:lat,
            longitude:long
        });
        $.ajax({
            url: '/rest/operator/setActLocation',
            type: 'POST',
            async: true,
            data: parametri,
            contentType: 'application/json; charset=utf-8',
            datatype: 'json',
        }).done(function () {
			//tabellaOperators.ajax.reload();
			//tabellaOperators.draw();
            //$("#modalChoice").modal("toggle");
            //console.log()
        });
        */
	});
	
	$('#delOperator').click(function(event){
		event.preventDefault();
		var key=$("#modalChoice").data("key");
		parametri = JSON.stringify({
            key: key
        });
        $.ajax({
            url: '/rest/operator/delOperator',
            type: 'POST',
            async: true,
            data: parametri,
            contentType: 'application/json; charset=utf-8',
            datatype: 'json',
        }).done(function () {
			tabellaOperators.ajax.reload();
			tabellaOperators.draw();
            $("#modalChoice").modal("toggle");

        });
		
	});
	
	
	$('#Save').click(function(event){
        event.preventDefault();
        if (validate())
        {
		
        parametri = JSON.stringify({
			id: $("#modalSend").data("key"),
            code: $("#operatorcode").val(),
            fullname: $("#operatorfullname").val(),
			carrier: $("#carrier").val(),
            pass:$("#operatorpass").val()
        });
        $.ajax({
            url: '/rest/operator/saveOperator',
            type: 'POST',
            async: true,
            data: parametri,
            contentType: 'application/json; charset=utf-8',
            datatype: 'json',
        }).done(function () {
           
			tabellaOperators.ajax.reload();
			tabellaOperators.draw();
             $("#modalSend").modal("toggle");
			//tabellaOperators.fnReloadAjax();
			//console.log(tabellaOperators);
			//LoadOperators();
			//alert("pino");
        });
        }
	});
	
	
});

// Functions =============================================================

function validate()
{
	var ritorno=true;
	ritorno &= check($("#operatorcode"), "all", 8);
	ritorno &= check($("#operatorpass"), "all", 8);
	ritorno &= check($("#operatorpass2"), "all", 8);
    ritorno &= check($("#operatorfullname"), "all", 8);
	ritorno &= check($("#carrier"), "combo", 1);
	//console.log($("stato").val());
	if ($("#operatorpass").val()!=$("#operatorpass2").val()) 
	{
		ritorno &= false;
		$("#operatorpass").closest('div').addClass("has-error");
        $("#operatorpass2").closest('div').addClass("has-error");
	}
	else
	{
        var passcode1=check($("#operatorpass"), "all", 8);
        var passcode2=check($("#operatorpass2"), "all", 8);
        if (passcode1 && passcode2)
        {
		ritorno &= true;
		$("#operatorpass").closest('div').removeClass("has-error");
        $("#operatorpass2").closest('div').removeClass("has-error");
        }
	}
	
	
    ritorno?$('#AlertAddOperator').hide():$('#AlertAddOperator').show(); 
	return ritorno;
}


function elimina(key)
{
	$("#modalChoice").data("key",key);
	$("#modalChoice").modal("toggle");
}

function edita(key)
{
	$("#modalSend").data("key",key);
	parametri = JSON.stringify({
		key: $("#modalSend").data("key")
	});
	$.ajax({
		url: '/rest/operator/getOperator',
		type: 'POST',
		async: true,
		data: parametri,
		contentType: 'application/json; charset=utf-8',
		datatype: 'json'
	}).done(function (data) {
		$("#operatorcode").val(data.code);
		$("#operatorpass").val(data.pass);
		$("#operatorpass2").val(data.pass);
        $("#operatorfullname").val(data.fullname);
		$("#carrier").val(data.carrier);
       
		$("#modalSend").modal("toggle");
		//tabellaOperators.draw(true);
		
	});
	
}

function getGeo(id,evento)
{
    evento.preventDefault();
    parametri = JSON.stringify({
		id: id
	});
    //console.log(id);
    $.ajax({
        url: '/rest/operator/getActLocation',
		type: 'POST',
		async: true,
		data: parametri,
		contentType: 'application/json; charset=utf-8',
		datatype: 'json'
           
        }).done(function (datax) {
            $("#geoBody").empty();
            if ((datax.latitude==0) && (datax.longitude==0))
            {
                var stringa='<h1 style="text-align:center">Operatore fuori linea!</h1>';
            }
            else
            {
                $("#geoBody").empty();
		         var location=datax.latitude.toString()+","+datax.longitude.toString();
                //    console.log(location);
                var stringa='<iframe width="100%" height="450" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?f=q&amp;source=s_q&amp;hl=it&amp;geocode=&amp;q=';
                stringa+=location;
                stringa+='&amp;aq=&amp;sll=37.427025,-122.072182&amp;sspn=0.135231,0.318432&amp;ie=UTF8&//amp;t=m&amp;z=14&amp;ll=';
                stringa+=location;
                stringa+='&amp;output=embed"></iframe>';
                stringa+='<br /><small><a id="googlemap" href="#" style="color:#0000FF;text-align:left">Visualizzazione ingrandita della mappa</a></small>';
                
            }
            $("#geoBody").append(stringa);
            $("#modalGeo").modal("toggle");
	    });   //end Success
}

function toggle(id,value, evento) {
    evento.preventDefault();
    parametri = JSON.stringify({
		id: id,
        value:value
	});
    //console.log(id);
    $.ajax({
        url: '/rest/operator/enableDisableOperator',
		type: 'POST',
		async: true,
		data: parametri,
		contentType: 'application/json; charset=utf-8',
		datatype: 'json',
        success: function (data) {
            if (!data) {
                $('#loading').hide();
                $("#dialog-error").modal('toggle');
            }
            else {
                tabellaOperators.ajax.reload();
		        tabellaOperators.draw();
            }
        },   //end Success
    });
};


// Fill table with data

function LoadOperators() {
    var urltoredirect = '/rest/operator';
    var dtData = [];
    tabellaOperators = $('#ListOperators').DataTable(
    {
        "sDom": '<"toolbar"p><"fixed_height"t>',
		"responsive": false,
        "draw": true,
        "bDestroy": true,
        "bAutoWidth": true,
        "bProcessing": false,
        "bDeferRender": true,
		"retrieve": true,
		//"sServerMethod": "GET",
        "aaSorting": [[0, 'Desc']],
        "aoColumns": [
			
						{"title":"Op.","data": "id","sWidth": "10%", "sClass": "center", "bSortable": false,"mRender":function(data,type,full){
							stringa = "<a id=tr-" + data + " style='text-decoration:none' href='#' onclick='edita(\"" + data + "\");' title='Edita'><i class='fa fa-pencil fw' style='font-size:22px'>&nbsp;</i></a>";
							stringa += "<a style='text-decoration:none' href='#' onclick='elimina(\"" + data + "\");' title='Elimina'><i class='fa fa-trash fw' style='font-size:22px'>&nbsp;</i></a>";
							return stringa;
						}}, //Codice
                        {"title":"Codice Operatore","data": "code","sWidth": "20%", "sClass": "center", "bSortable": false }, //Codice
                        {"title":"Nome Completo","data": "fullname","sWidth": "20%", "sClass": "center", "bSortable": false }, //Nome Completo
						{"title":"Carrier","data": "carrier","sWidth": "20%", "sClass": "center", "bSortable": false}, //Carrier
                        {"title":"Geo","data": "enabled","mRender": function (data, type, full) {
                                
										return '<a href="#" onclick="getGeo(' + '\''+full.id+'\''+',event);"><i class="arancio btn-icon fa fa-map-marker fa-lg" style="font-size:22px;cursor:pointer"></i></a>';
                           
                            }, "sWidth": "10%", "sClass": "center", "bSortable": false
						},
                        {"title":"Abilitazione","data": "enabled","mRender": function (data, type, full) {
                                switch (data) {
                                    case 0:
                                        //var pippo='\''+full.id+'\'';
										return '<a href="#" onclick="toggle(' + '\''+full.id+'\'' + ',1,event);"><i class="rosso btn-icon fa fa-thumbs-down fa-lg" style="font-size:22px;cursor:pointer"></i></a>';
                                    case 1:
                                    //var pippo='\''+full.id+'\'';
                                        return '<a href="#" onclick="toggle(' + '\''+full.id+'\'' + ',0,event);"><i class="verde btn-icon fa fa-thumbs-up fa-lg" style="font-size:22px;cursor:pointer"></i></a>';
                                }
                            }, "sWidth": "10%", "sClass": "center", "bSortable": false
						}
        ],
        "oLanguage": {
            "sProcessing": "Caricamento...",
            "sLengthMenu": "_MENU_ elementi",
            "sZeroRecords": "La ricerca non ha portato alcun risultato.",
            "sInfo": "Pag. _START_/_END_ di _TOTAL_",
            "sInfoEmpty": "0/0 di 0",
            "sInfoFiltered": "(_MAX_)",
            "sInfoPostFix": "",
            "sSearch": "Cerca:",
            "sUrl": "",
            "oPaginate": {
                "sFirst": "<<",
                "sPrevious": "<",
                "sNext": ">",
                "sLast": ">>"
            }
        },
        "ajax":
		{
			"type" : "GET",
            "url" : urltoredirect,
            "dataSrc": function ( json ) {
                //Make your callback here.
                
                return json.aaData;
                }       
         },
        'aaData': dtData,
        "bJQueryUI": false,
        "bSort": true,
        "bInfo": true,
        //"bServerSide": true,
        //"sAjaxSource": urltoredirect,
        "bScrollCollapse": false,
		/*
		"drawCallback": function( settings ) {
            $('<li><a onclick="refresh_tab()" class="fa fa-refresh"></a></li>').prependTo('div.dataTables_paginate ul.pagination');
			 console.log("RIDISEGNA");
        },*/
		"fnServerParams": function (aoData) {
				      //  aoData.push({ "name": "id", "value": $('#idCestello').val() });

				    }
    });
}


function refresh_tab(){
	
    tabellaOperators.ajax.reload();
	tabellaOperators.draw();
	
}