var tabellaPlans;
$(document).ready(function() {
    $("#navbar ul li").removeClass("active");
    $("#plans").addClass("active");

$('#addPlan').click(function(){
		$("#modalPlan").data("key",0);
		$("#name").val('');
		$("#description").val('');
        $("#price").val('');
        $("#descount").val('0%');
        $("#nritems").val('0');
		$("#modalPlan").modal("toggle");
	});

$('#delPlan').click(function(event){
	event.preventDefault();
	var key=$("#modalChoice").data("key");
	parametri = JSON.stringify({
		key: key
	});
	$.ajax({
		url: '/rest/plans/delPlan',
		type: 'POST',
		async: true,
		data: parametri,
		contentType: 'application/json; charset=utf-8',
		datatype: 'json',
	}).done(function () {
		tabellaPlans.ajax.reload();
		tabellaPlans.draw();
		$("#modalChoice").modal("toggle");

	});
	
});

$('#Save').click(function(event){
        event.preventDefault();
        if (validate())
        {
		
        parametri = JSON.stringify({
			id: $("#modalPlan").data("key"),
            name: $("#name").val(),
            description: $("#description").val(),
            price: $("#price").val(),
            descount: $("#descount").val(),
			nritems: $("#nritems").val()
        });
        $.ajax({
            url: '/rest/plans/savePlan',
            type: 'POST',
            async: true,
            data: parametri,
            contentType: 'application/json; charset=utf-8',
            datatype: 'json',
        }).done(function () {
           
			tabellaPlans.ajax.reload();
			tabellaPlans.draw();
             $("#modalPlan").modal("toggle");
        });
        }
	});


	LoadPlans();
});



	
	


// Functions =============================================================

function validate()
{
	var ritorno=true;
	ritorno &= check($("#name"), "all", 2);
	ritorno &= check($("#description"), "all", 2);
	ritorno &= check($("#price"), "double", 4);
    //ritorno &= check($("#address2"), "all", 8);
    ritorno &= check($("#descount"), "all", 2);
	ritorno &= check($("#nritems"), "numeric", 1);
    ritorno?$('#AlertAddPlan').hide():$('#AlertAddPlan').show(); 
	return ritorno;
}


function elimina(key)
{
	$("#modalChoice").data("key",key);
	$("#modalChoice").modal("toggle");
}

function edita(key)
{
	$("#modalPlan").data("key",key);
	parametri = JSON.stringify({
		key: $("#modalPlan").data("key")
	});
	$.ajax({
		url: '/rest/plans/getPlan',
		type: 'POST',
		async: true,
		data: parametri,
		contentType: 'application/json; charset=utf-8',
		datatype: 'json'
	}).done(function (data) {
		$("#name").val(data.name);
		$("#description").val(data.description);
		$("#price").val(data.price);
        $("#descount").val(data.descount);
        $("#nritems").val(data.nritems);
		$("#modalPlan").modal("toggle");
		//tabellaCarriers.draw(true);
		
	});
	
}




function LoadPlans() {
    var urltoredirect = '/rest/plans';
    var dtData = [];
    tabellaPlans = $('#ListPlans').DataTable(
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
						{"title":"Name","data": "name","sWidth": "30%", "sClass": "center", "bSortable": false }, //Progressivo
                        {"title":"Description","data": "description","sWidth": "30%", "sClass": "center", "bSortable": false }, //Codice
						{"title":"Price","data": "price","sWidth": "10%", "sClass": "center", "bSortable": false }, //Nome Completo
                        {"title":"Descount","data": "descount","sWidth": "10%", "sClass": "center", "bSortable": false }, //Nome Completo
						{"title":"# Items","data": "nritems","sWidth": "10%", "sClass": "center", "bSortable": false }, //Operatore
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




function toggle(id,value, evento) {
    evento.preventDefault();
    parametri = JSON.stringify({
		id: id,
        value:value
	});
    //console.log(id);
    $.ajax({
        url: '/rest/plans/enableDisablePlan',
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
                tabellaPlans.ajax.reload();
		        tabellaPlans.draw();
            }
        },   //end Success
    });
};