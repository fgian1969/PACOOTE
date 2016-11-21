var tabellaDeliveries;
/// DOM Ready =============================================================
$(document).ready(function() {
    $("#navbar ul li").removeClass("active");
    $("#myprofile").addClass("active");
     
    
    parametri = JSON.stringify({
		key: $("#userkey").val()
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
    });
});


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
    ritorno?$('#AlertSaveMyProfile').hide():$('#AlertSaveMyProfile').show(); 
	return ritorno;
}


$('#Save').click(function(event){
        event.preventDefault();
        if (validate())
        {
		
        parametri = JSON.stringify({
			id: $("#userkey").val(),
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
            console.log("ciao")
                $(location).attr('href', '/')
        });
        }
	});