/// DOM Ready =============================================================
$(document).ready(function() {
    $("#navbar ul li").removeClass("active");
    $("#mydeliveries").addClass("active");
    
    
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