var tabellaOrders;
// DOM Ready =============================================================
$(document).ready(function() {
    $("#navbar ul li").removeClass("active");
    $("#orders").addClass("active");
    
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
			})
            $.ajax({
                url: '/rest/plans/getPlanList',
                type: 'POST',
                async: true,
                //data: parametri,
                contentType: 'application/json; charset=utf-8',
                datatype: 'json',
            }).done(function (datax) {
			    $.each(datax,function(keys, values) 
			    {
    			    $('#plansList').append('<option value=' + values.id + '>' + values.name + '</option>');
			    });
			    LoadOrders();
            })
        });
        
     
	
	$('#addOrder').click(function(){
        
		$("#modalOrder").data("key",0);
		$("#carrier").val(0);
        $("#plans").val(0);
        $("#qty").val(0);
        $("#qty").val("0");
        $("#total").val("0,00");
        $("paymentmode").val(0);
		$("#modalOrder").modal("toggle");
		
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
	
	$('#delOrder').click(function(event){
		event.preventDefault();
		var key=$("#modalChoice").data("key");
		parametri = JSON.stringify({
            key: key
        });
        $.ajax({
            url: '/rest/orders/delOrder',
            type: 'POST',
            async: true,
            data: parametri,
            contentType: 'application/json; charset=utf-8',
            datatype: 'json',
        }).done(function () {
			tabellaOrders.ajax.reload();
			tabellaOrders.draw();
            $("#modalChoice").modal("toggle");

        });
		
	});
	
	
	$('#Save').click(function(event){
        event.preventDefault();
        if (validate())
        {
		
        parametri = JSON.stringify({
			id: $("#modalOrder").data("key"),
            carrier: $("#carrier").val(),
            plan: $("#plansList").val(),
            qty: $("#qty").val(),
			total: $("#total").val(),
            payment:$("#paymentmode").val()
        });
        $.ajax({
            url: '/rest/orders/saveOrder',
            type: 'POST',
            async: true,
            data: parametri,
            contentType: 'application/json; charset=utf-8',
            datatype: 'json',
        }).done(function () {
           
			tabellaOrders.ajax.reload();
			tabellaOrders.draw();
             $("#modalOrder").modal("toggle");
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
    ritorno &= check($("#qty"), "numeric", 1);
	ritorno &= check($("#carrier"), "combo", 1);
    ritorno &= check($("#planList"), "combo", 1);
    ritorno &= check($("#qty"), "numeric", 1);
    ritorno &= check($("#total"), "double", 4);
    ritorno &= check($("#paymentmode"), "combo", 1);
    
	//console.log($("stato").val());
	
	
    ritorno?$('#AlertAddOrder').hide():$('#AlertAddOrder').show(); 
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
		url: '/rest/order/getOrder',
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



function toggle(id,value, evento) {
    evento.preventDefault();
    parametri = JSON.stringify({
		id: id,
        value:value
	});
    //console.log(id);
    $.ajax({
        url: '/rest/order/enableDisableOrder',
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
                tabellaOrders.ajax.reload();
		        tabellaOrders.draw();
            }
        },   //end Success
    });
};


// Fill table with data

function LoadOrders() {
    var urltoredirect = '/rest/orders';
    var dtData = [];
     
     /*doctype:'ORDERDOCS',
			carrier:code.carrier,
			plan:code.plan,
			qty:Number(code.qty),
			orderdate:new Date(),
			buydate:new Date(),
			total:Number(code.total.replace(',','.')),
			paymentmode:code.payment,
			paydate:new Date(),
			payed:1,
			visible:1,
			enabled:1
              */
    tabellaOrders = $('#ListOrders').DataTable(
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
                        {"title":"Customer","data": "carrier","sWidth": "10%", "sClass": "center", "bSortable": false }, //Codice
                        {"title":"Prodotto","data": "plan","sWidth": "10%", "sClass": "center", "bSortable": false }, //Codice
						{"title":"Data acquisto","data": "orderdate","sWidth": "15%", "sClass": "center", "bSortable": false}, //Carrier
                        {"title":"Pagamento","data": "paymentmode","mRender": function (data, type, full) {
                                switch (data) {
                                    case '0':
										return 'BONIFICO';
                                    case '1':
                                        return 'CARTA DI CREDITO';
                                    case '2':
                                        return 'PAYPAL';
                                }
                            }, "sWidth": "10%", "sClass": "center", "bSortable": false
						},
                        
                        {"title":"Q.ta","data": "qty","sWidth": "5%", "sClass": "center", "bSortable": false }, //Nome Completo
                        {"title":"Totale in €","data": "total","sWidth": "10%", "sClass": "center", "bSortable": false}, //Carrier
                        {"title":"Pagato","data": "payed","mRender": function (data, type, full) {
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

