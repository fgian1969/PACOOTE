var tabellaCarriers;



// DOM Ready =============================================================
$(document).ready(function() {
    $("#navbar ul li").removeClass("active");
    $("#carriers").addClass("active");
    
  
   
    
    
    LoadCarriers(); 
    
    
	
	$('#addCarrier').click(function(){
        
		$("#modalSend").data("key",0);
		$("#firstname").val('');
		$("#surname").val('');
    	$("#address1").val('');
	    $("#address2").val('');
        $("#city").val('');
        $("#company").val('');
        $("#province").val('');
		$("#country").val('');
        $("#email").val('');
        $("#piva").val('');
        $("#codfisc").val('');
        $("#mobile").val('');
        $("#userlevel").val('');
        $("#userpassword").val('');
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
            url: '/operatorlist/setActLocation',
            type: 'POST',
            async: true,
            data: parametri,
            contentType: 'application/json; charset=utf-8',
            datatype: 'json',
        }).done(function () {
			//tabellaCarriers.ajax.reload();
			//tabellaCarriers.draw();
            //$("#modalChoice").modal("toggle");
            //console.log()
        });
        */
	});
	
	$('#delCarrier').click(function(event){
		event.preventDefault();
		var key=$("#modalChoice").data("key");
		parametri = JSON.stringify({
            key: key
        });
        $.ajax({
            url: '/rest/carrier/delCarrier',
            type: 'POST',
            async: true,
            data: parametri,
            contentType: 'application/json; charset=utf-8',
            datatype: 'json',
        }).done(function () {
			tabellaCarriers.ajax.reload();
			tabellaCarriers.draw();
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
            address1: $("#address1").val(),
            address2: $("#address2").val(),
			company: $("#company").val(),
            city:$("#city").val(),
            province: $("#province").val(),
            country: $("#country").val(),
            mobile: $("#mobile").val(),
            email: $("#email").val(),
            piva: $("#piva").val(),
            codfisc: $("#codfisc").val(),
            userlevel:$("#userlevel").val(),
            userpassword:$("#userpassword").val()
        });
        $.ajax({
            url: '/rest/carrier/saveCarrier',
            type: 'POST',
            async: true,
            data: parametri,
            contentType: 'application/json; charset=utf-8',
            datatype: 'json',
        }).done(function () {
           
			tabellaCarriers.ajax.reload();
			tabellaCarriers.draw();
             $("#modalSend").modal("toggle");
			//tabellaCarriers.fnReloadAjax();
			//console.log(tabellaCarriers);
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
	ritorno &= check($("#firstname"), "all", 2);
	ritorno &= check($("#surname"), "all", 2);
	ritorno &= check($("#address1"), "all", 8);
    //ritorno &= check($("#address2"), "all", 8);
    ritorno &= check($("#company"), "all", 2);
	ritorno &= check($("#city"), "all", 3);
	ritorno &= check($("#province"), "all", 2);
    //ritorno &= check($("#state"), "combo", 1);
    //ritorno &= check($("#datacons"), "date",);
	ritorno &= check($("#mobile"), "phone", 3);
    ritorno &= check($("#email"), "email", 3);
    ritorno &= check($("#piva"), "all", 11);
    ritorno &= check($("#codfisc"), "all", 16);
    ritorno &= check($("#userpassword"), "all", 8);
	
	
	if ($("#country").val()=="")
	{
		ritorno &= false;
		$("#country").closest('div').addClass("has-error");
	}
	else
	{
		ritorno &= true;
		$("#country").closest('div').removeClass("has-error");
	}
    if ($("#userlevel").val()=="")
	{
		ritorno &= false;
		$("#userlevel").closest('div').addClass("has-error");
	}
	else
	{
		ritorno &= true;
		$("#userlevel").closest('div').removeClass("has-error");
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
		url: '/rest/carrier/getCarrier',
		type: 'POST',
		async: true,
		data: parametri,
		contentType: 'application/json; charset=utf-8',
		datatype: 'json'
	}).done(function (data) {
		$("#firstname").val(data.firstname);
		$("#surname").val(data.surname);
		$("#address1").val(data.address1);
        $("#address2").val(data.address2);
        $("#company").val(data.company);
        $("#city").val(data.city);
        $("#province").val(data.province);
        $("#country").val(data.country);
        $("#mobile").val(data.mobile);
        $("#email").val(data.email);
        $("#piva").val(data.piva);
        $("#codfisc").val(data.codfisc);
        $("#userlevel").val(data.userlevel);
        $("#userpassword").val(data.userpassword);
		$("#modalSend").modal("toggle");
		//tabellaCarriers.draw(true);
		
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
        url: '/rest/carrier/enableDisableCarrier',
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
                tabellaCarriers.ajax.reload();
		        tabellaCarriers.draw();
            }
        },   //end Success
    });
};


// Fill table with data

function LoadCarriers() {
    var urltoredirect = '/rest/carriers';
    var dtData = [];
    tabellaCarriers = $('#ListCarriers').DataTable(
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
                        {"title":"Carrier","data": "company","sWidth": "20%", "sClass": "center", "bSortable": false }, //Carrier
                        {"title":"Web Service KEY","data": "key","sWidth": "50%", "sClass": "center", "bSortable": false }, //Web Service Key
                        {"title":"Balance","data": "balance","sWidth": "10%", "sClass": "center", "bSortable": false }, //Web Service Key

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
	
    tabellaCarriers.ajax.reload();
	tabellaCarriers.draw();
	
}