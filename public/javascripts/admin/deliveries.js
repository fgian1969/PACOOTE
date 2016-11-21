var tabellaDeliveries;
/// DOM Ready =============================================================
$(document).ready(function() {
    $("#navbar ul li").removeClass("active");
    $("#deliveries").addClass("active");
	//$('#mydatepicker').datepicker('setCulture', 'it');
	//$('#contDateStart').datepicker({ "format": "dd/mm/yyyy", "weekStart": 1, "autoclose": true, "language": "it" });
   //Carico la lista degli operatori
        $.ajax({
            url: '/rest/operator/getOperatorsList',
            type: 'POST',
            async: true,
            //data: parametri,
            contentType: 'application/json; charset=utf-8',
            datatype: 'json',
        }).done(function (data) {
			$.each(data,function(key, value) 
			{
    			$('#operatorcode').append('<option value=' + value.id + '>' + value.code + '</option>');
			});
			LoadDeliveries();
        });
   
   //Console.log("CIAO");
   
   
   $('#addDelivery').click(function(){
	   //Nascondo l'alert
	   ClearError('#modalSend');
		$("#modalSend").data("key",0);
		$("#progDelivery").val('');
		$("#code").val('');
		now = new Date().toString("dd/MM/yyyy");
		$("#datacons").val(now);
    	$("#operatorcode").val('');
		$("#destinatario").val('');
		$("#email").val('');
		$("#cellulare").val('');
		$("#address").val('');
		$("#city").val('');
		$("#stato").val('');
		$("#Note").val('');
		$("#latitude").val('');
		$("#longitude").val('');
		$("#actualstate").val(0);
		
		$("#modalSend").modal("toggle");
		/*
		parametri = JSON.stringify({
            key: "3224"
        });
        $.ajax({
            url: '/rest/delivery/getDeliveryListByCode',
            type: 'POST',
            async: true,
            data: parametri,
            contentType: 'application/json; charset=utf-8',
            datatype: 'json',
        }).done(function () {
			//tabellaDeliveries.ajax.reload();
			//tabellaDeliveries.draw();
            //$("#modalChoice").modal("toggle");

        });*/
	});
	
	$('#delDelivery').click(function(event){
		event.preventDefault();
		var key=$("#modalChoice").data("key");
		parametri = JSON.stringify({
            key: key
        });
        $.ajax({
            url: '/rest/delivery/delDelivery',
            type: 'POST',
            async: true,
            data: parametri,
            contentType: 'application/json; charset=utf-8',
            datatype: 'json',
        }).done(function () {
			tabellaDeliveries.ajax.reload();
			tabellaDeliveries.draw();
            $("#modalChoice").modal("toggle");

        });
		
	});
	
	
	
	
	
	$('#Save').click(function(event){
		event.preventDefault();
		if (validate())
		{
        parametri = JSON.stringify({
			id: $("#modalSend").data("key"),
			progr:$("#progDelivery").val(),
            code: $("#code").val(),
            datacons: $("#datacons").val(),
			operatorkey:$("#operatorcode").val(),
			operatorcode:$("#operatorcode option:selected").text(),
			destinatario: $("#destinatario").val(),
			email:$("#email").val(),
			cell: $("#cellulare").val(),
			address: $("#address").val(),
			city: $("#city").val(),
			province:$("#province").val(),
			state: $("#stato").val(),
			note:$("#Note").val(),
			lat: $("#latitude").val(),
			long: $("#longitude").val(),
			actualstate:$("#actualstate").val()
        });
		
		
        $.ajax({
            url: '/rest/delivery/saveDelivery',
            type: 'POST',
            async: true,
            data: parametri,
            contentType: 'application/json; charset=utf-8',
            datatype: 'json',
        }).done(function() {
            $("#modalSend").modal("toggle");
			tabellaDeliveries.ajax.reload();
			tabellaDeliveries.draw();
        });
		
		}
	});
	 
});


function edita(key)
	{
		$("#modalSend").data("key",key);
		parametri = JSON.stringify({
			key: $("#modalSend").data("key")
		});
		$.ajax({
			url: '/rest/delivery/getDelivery',
			type: 'POST',
			async: true,
			data: parametri,
			contentType: 'application/json; charset=utf-8',
			datatype: 'json'
		}).done(function (data) {
			/*
			 jsonData={"code":rants[0].code,
				   	  "datacons":rants[0].datacons,
					  "destinatario":rants[0].destinatario,
					  "email":rants[0].email,
					  "cell":rants[0].cell,
					  "address":rants[0].address,
					  "city":rants[0].city,
					  "province":rants[0].province,
					  "state":rants[0].state,
					  "lat":rants[0].lat,
					  "long":rants[0].long
					  };*/
			$("#progDelivery").val(data.progr);		  
			$("#code").val(data.code);
			$("#datacons").val(data.datacons);
			$("#operatorcode").val(data.operatorkey);
			$("#destinatario").val(data.destinatario);
			$("#email").val(data.email);
			$("#cellulare").val(data.cell);
			$("#address").val(data.address);
			$("#city").val(data.city);
			$("#province").val(data.province);
			$("#stato").val(data.state);
			$("#latitude").val(data.lat);
			$("#longitude").val(data.long);
			$("#actualstate").val(data.actualstate);
			$("#Note").val(data.note);
			$("#modalSend").modal("toggle");
		});
	
	}



function validate()
{
	var ritorno=true;
	ritorno &= check($("#progDelivery"), "numeric", 1);
	ritorno &= check($("#operatorcode"), "combo", 0);
	ritorno &= check($("#code"), "all", 3);
	ritorno &= check($("#datacons"), "date", 10);
	ritorno &= check($("#destinatario"), "all", 3);
	ritorno &= check($("#email"), "email", 3);
	ritorno &= check($("#cellulare"), "phone", 3);
	ritorno &= check($("#address"), "all", 3);
	ritorno &= check($("#city"), "all", 3);
	ritorno &= check($("#province"), "all", 2);
	//console.log($("stato").val());
	if ($("#stato").val()=="")
	{
		ritorno &= false;
		$("#stato").closest('div').addClass("has-error");
	}
	else
	{
		ritorno &= true;
		$("#stato").closest('div').removeClass("has-error");
	}
	ritorno &= check($("#latitude"), "latitude", 3);
	ritorno &= check($("#longitude"), "longitude", 3);
	
    ritorno?$('#AlertAddDelivery').hide():$('#AlertAddDelivery').show(); 
	return ritorno;
}

// Functions =============================================================

function elimina(key)
{
	$("#modalChoice").data("key",key);
	$("#modalChoice").modal("toggle");
}

// Fill table with data

function LoadDeliveries() {
    var urltoredirect = '/rest/delivery';
    var dtData = [];
    tabellaDeliveries = $('#ListDeliveries').DataTable(
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
        "aaSorting": [[0, 'Progr']],
        "aoColumns": [
			
						{"title":"Op.","data": "id","sWidth": "10%","mRender":function(data,type,full){
							stringa = "<a id=tr-" + data + " style='text-decoration:none' href='#' onclick='edita(\"" + data + "\");' title='Edita'><i class='fa fa-pencil fw' style='font-size:22px'>&nbsp;</i></a>";
							stringa += "<a style='text-decoration:none' href='#' onclick='elimina(\"" + data + "\");' title='Elimina'><i class='fa fa-trash fw' style='font-size:22px'>&nbsp;</i></a>";
							return stringa;
						}}, //Codice
						{"title":"# Progr.","data": "progr","sWidth": "5%", "sClass": "center", "bSortable": false }, //Progressivo
                        {"title":"Codice Consegna","data": "code","sWidth": "20%", "sClass": "center", "bSortable": false }, //Codice
						{"title":"Data Consegna","data": "datacons","sWidth": "20%", "sClass": "center", "bSortable": false }, //Nome Completo
                        {"title":"Destinatario","data": "destinatario","sWidth": "20%", "sClass": "center", "bSortable": false }, //Nome Completo
						{"title":"Operator","data": "operatorcode","sWidth": "5%", "sClass": "center", "bSortable": false }, //Operatore
	   				    {"title":"Stato","data": "stato","sWidth": "20%", "sClass": "center", "bSortable": false ,"mRender": //Stato
							function (data, type, full) {
                                switch (data) {
                                    case 0:
										return 'IN ATTESA';
                                    case 1:
                                        return 'CONSEGNATA';
									case 2:
                                        return 'RIMANDATA';
									case 3:
									    return 'IN CONSEGNA';	
                                }
                            }, 
						}, //Carrier
                       
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