var tabellaCustomers;
var tabellaDevices;



// DOM Ready =============================================================
$(document).ready(function() {

    $("#navbar ul li").removeClass("active");
    $("#customers").addClass("active");
	
	
	 
    LoadCustomers(); 
    
    
	
	$('#addCustomer').click(function(){
		$("#modalSend").data("key",0);
		$("#firstname").val('');
		$("#surname").val('');
        $("#phone").val('');
        $("#password").val('');
        $("#confpassword").val('');
		$("#modalSend").modal("toggle");
	});
	
	$('#addNotification').click(function(){
		parametri = JSON.stringify({
			
            message: "Test invio Remote Notification!"
        });
		
        $.ajax({
            url: '/rest/customer/APNSend',
            type: 'POST',
            async: true,
            data: parametri,
            contentType: 'application/json; charset=utf-8',
            datatype: 'json',
        }).done(function () {
			
        });
        
	});
	
	$('#addSms').click(function(){
		parametri = JSON.stringify({
			user: 'fgian@usa.net',
			password:'elena2000',
			api:'3524736',
            message: 'Test invio SMS con Clickatell!',
			phone:['+393246941203']
        });
        $.ajax({
            url: '/rest/customer/SMSSend',
            type: 'POST',
            async: true,
            data: parametri,
            contentType: 'application/json; charset=utf-8',
            datatype: 'json',
        }).done(function () {
			
        });
        
	});
	
	
	
	$('#delCustomer').click(function(event){
		event.preventDefault();
		var key=$("#modalChoice").data("key");
		parametri = JSON.stringify({
            key: key
        });
        $.ajax({
            url: '/rest/customer/delCustomer',
            type: 'POST',
            async: true,
            data: parametri,
            contentType: 'application/json; charset=utf-8',
            datatype: 'json',
        }).done(function () {
			tabellaCustomers.ajax.reload();
			tabellaCustomers.draw();
            $("#modalChoice").modal("toggle");

        });
		
	});
	
	
	$('#Save').click(function(event){
        event.preventDefault();
        if (validate())
        {
		
        parametri = JSON.stringify({
			id: $("#modalSend").data("key"),
            firstname: $("#firstname").val(),
            surname: $("#surname").val(),
            email: $("#email").val(),
            phone: $("#phone").val(),
			password: $("#password").val(),
        });
        $.ajax({
            url: '/rest/customer/saveCustomer',
            type: 'POST',
            async: true,
            data: parametri,
            contentType: 'application/json; charset=utf-8',
            datatype: 'json',
        }).done(function () {
           
			tabellaCustomers.ajax.reload();
			tabellaCustomers.draw();
            $("#modalSend").modal("toggle");

        });
        }
	});
	
	
});

// Functions =============================================================

function validate()
{
	var ritorno=true;
	ritorno &= check($("#firstname"), "all", 2);
	ritorno &= check($("#surname"), "all", 2);
	ritorno &= check($("#phone"), "phone", 1);
    //ritorno &= check($("#address2"), "all", 8);
    ritorno &= check($("#email"), "all", 2);
	ritorno &= check($("#password"), "all", 8);
	ritorno &= check($("#confpassword"), "all", 8);
	if (ritorno)
    {
        if ( $("#password").val() != $("#confpassword").val())
        {
            ritorno &= false;
            $("#password").closest('div').addClass("has-error");
            $("#confpassword").closest('div').addClass("has-error");
        }
        else
        {
            $("#password").closest('div').removeClass("has-error");
            $("#confpassword").closest('div').removeClass("has-error");
        }
    }
    ritorno?$('#AlertAddCarrier').hide():$('#AlertAddCarrier').show(); 
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
		url: '/rest/customer/getCustomer',
		type: 'POST',
		async: true,
		data: parametri,
		contentType: 'application/json; charset=utf-8',
		datatype: 'json'
	}).done(function (data) {
		$("#firstname").val(data.firstname);
		$("#surname").val(data.surname);
        $("#email").val(data.email);
		$("#phone").val(data.phone);
        $("#password").val(data.password);
        $("#confpassword").val(data.password);
        if (tabellaDevices)
        {
            tabellaDevices.destroy();
        }
		LoadDevices();
		//tabellaCustomers.draw(true);
		
	});
	
}


function LoadDevices(devices) {
    
    var dtData = [];
    tabellaDevices=$('#ListDevices').DataTable(
    {
        "sDom": '<"toolbar"p><"fixed_height"t>',
		"responsive": false,
        "draw": true,
        "bDestroy": true,
        "bAutoWidth": false,
        "bProcessing": false,
        "bDeferRender": true,
		"retrieve": true,
		//"sServerMethod": "GET",
        "aaSorting": [[0, 'Desc']],
        "aoColumns": [
			
						{"title":"Op.","data": "id","sWidth": "10%", "sClass": "center", "bSortable": false,"mRender":function(data,type,full){
                            stringa = "<a style='text-decoration:none' href='#' onclick='elimina(\"" + data + "\");' title='Elimina'><i class='fa fa-trash fw' style='font-size:22px'>&nbsp;</i></a>";
							return stringa;
						}}, //Codice
                        {"title":"APN Token","data": "apntoken","sWidth": "70%", "sClass": "center", "bSortable": false }, //Carrier
                        {"title":"Device Type","data": "deviceType","mRender": function (data, type, full) {
                                switch (data) {
                                    case 1:
                                        //var pippo='\''+full.id+'\'';
										return 'IPHONE';
                                    case 2:
                                    //var pippo='\''+full.id+'\'';
                                        return 'ANDROID';
                                    case 3:
                                    //var pippo='\''+full.id+'\'';
                                        return 'WINDOWS';
                                    default:
                                        return 'N/A';
                                }
                            }, "sWidth": "10%", "sClass": "center", "bSortable": false
						},
                        {"title":"Code Verified","data": "codeverified","mRender": function (data, type, full) {
                                switch (data) {
                                    case false:
                                        //var pippo='\''+full.id+'\'';
										return '<a href="#"><i class="rosso btn-icon fa fa-thumbs-down fa-lg" style="font-size:22px"></i></a>';
                                    case true:
                                    //var pippo='\''+full.id+'\'';
                                        return '<a href="#"><i class="verde btn-icon fa fa-thumbs-up fa-lg" style="font-size:22px"></i></a>';
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
       
        'aaData': devices,
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

		},
        "fnInitComplete": function (oSettings, json) {
                    $("#modalSend").modal("toggle");
        }
        
    });
}


// Fill table with data

function LoadCustomers() {
    var urltoredirect = '/rest/customers';
    var dtData = [];
    tabellaCustomers = $('#ListCustomers').DataTable(
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
                        {"title":"E-mail","data": "email","sWidth": "30%", "sClass": "center", "bSortable": false }, //Carrier
                        {"title":"Contact Info","data": "info","sWidth": "30%", "sClass": "center", "bSortable": false }, //Web Service Key
                        {"title":"Phone","data": "phone","sWidth": "10%", "sClass": "center", "bSortable": false }, //Web Service Key
                        {"title":"# Devices","data": "devices","sWidth": "10%", "sClass": "center", "bSortable": false }, //Web Service Key
                        {"title":"Email Verified","data": "emailverified","mRender": function (data, type, full) {
                                switch (data) {
                                    case false:
                                        //var pippo='\''+full.id+'\'';
										return '<a href="#"><i class="rosso btn-icon fa fa-thumbs-down fa-lg" style="font-size:22px"></i></a>';
                                    case true:
                                    //var pippo='\''+full.id+'\'';
                                        return '<a href="#"><i class="verde btn-icon fa fa-thumbs-up fa-lg" style="font-size:22px"></i></a>';
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


function remoteNotification(token){
		parametri = JSON.stringify({
			token:token,
            message: "Test invio Remote Notification!"
        });
		
        $.ajax({
            url: '/rest/customer/APNSend',
            type: 'POST',
            async: true,
            data: parametri,
            contentType: 'application/json; charset=utf-8',
            datatype: 'json',
        }).done(function () {
			
        });
        
	};
function sendSMS(phone)
{
	parametri = JSON.stringify({
			user: 'fgian@usa.net',
			password:'elena2000',
			api:'3524736',
            message: 'Test invio SMS con Clickatell!',
			phone:[phone]
        });
        $.ajax({
            url: '/rest/customer/SMSSend',
            type: 'POST',
            async: true,
            data: parametri,
            contentType: 'application/json; charset=utf-8',
            datatype: 'json',
        }).done(function () {
			
        });
}

function refresh_tab(){
	
    tabellaCustomers.ajax.reload();
	tabellaCustomers.draw();
	
}