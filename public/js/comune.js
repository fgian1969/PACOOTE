
function GetDateIT(data)
{
    //data=new Date();
    console.log(data);
    var gg, mm, aaaa;
    gg = n(data.getDate()) + "/";
    mm = n(data.getMonth() + 1) + "/";
    aaaa = data.getFullYear();
    return gg+mm+aaaa;
}
function GetDateITExt(data)
{
    var gg, mm, aaaa;
    gg = n(data.getDate()) + "/";
    mm = n(data.getMonth() + 1) + "/";
    aaaa = data.getFullYear();
    Hh = data.getHours() + ":";
  Mm = data.getMinutes() + ":";
  Ss = data.getSeconds();
  return gg+mm+aaaa+ " " +Hh+ Mm+ Ss;
}


function n(n){
    return n > 9 ? "" + n: "0" + n;
}

function ClearError($target) {
    var theModal = "#" + $($target).attr("id");
    //var $this = "#" + this;
    $(theModal + ' input[type=checkbox]').prop('checked', false);

    $(theModal + ' input[type="text"], textarea').val('');
    $(theModal + ' input[type="email"]').val('');
    //Pulisco gli alert
    $(theModal + ' .alert-danger').hide();
    //Elimino le classi di errore dagli input box
    $(theModal + ' div').removeClass("has-error");
    //Conto se esistono elementi select se si pulisco il valore
    $(theModal + " select").each(function () {
        $(this).val(null);
    });
    $(theModal + " .select2-container").each(function () {
        $(this).select2('data', null);
    });
    //Se esistono dei feedback nei textbox devo eliminarli e devo eliminare anche i popover
    //$(theModal).find('.form-control-hasfeedback').removeClass('posfeedback negfeedback fa fa-exclamation-triangle form-control-hasfeedback');
    //$(theModal).find('.popover').hide();
}

function decimale(event) {
   
    // var chr = getChar(event || window.event);
    //var regex = /[0-9]|\,\-/;   //con la virgola
    var regex = /^-?[0-9]\d*(\,\d+)?$/;   //con la virgola
    //var regex = /[0-9]/; //solo numeri
    var evt = event || window.event;
    var chr = String.fromCharCode(evt.charCode);
    //console.log(evt.charCode);
    if (evt.keyCode == 9 || evt.keyCode == 46 || evt.keyCode == 8 || evt.keyCode == 39 || evt.keyCode == 37 || evt.charCode == 44 || evt.charCode == 45) { return true; }
    if (!regex.test(chr) && chr !== null) { return false; };
    //console.log(id);
}

function numero(event) {
    // var chr = getChar(event || window.event);
    //var regex = /[0-9]|\,/;   //con la virgola
    var regex = /[0-9]/; //solo numeri
    var evt = event || window.event;
    var chr = String.fromCharCode(evt.charCode);
    if (evt.keyCode == 9 || evt.keyCode == 46 || evt.keyCode == 8 || evt.keyCode == 39 || evt.keyCode == 37) { return true; }
    if (!regex.test(chr) && chr !== null) { return false; };
    //console.log(id);
}

function dateinput(event){
	var regex =/^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;
	var evt = event || window.event;
    var chr = String.fromCharCode(evt.charCode);
    //console.log(evt.charCode);
    if (evt.keyCode == 9 || evt.keyCode == 46 || evt.keyCode == 8 || evt.keyCode == 39 || evt.keyCode == 37 || evt.charCode == 44 || evt.charCode == 45) { return true; }
    if (!regex.test(chr) && chr !== null) { return false; };
}


function ValidaDate(data)
{
	var regex =/^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;
	return regex.test(data);
}

function check(o, tipo, lungo) {
    if (tipo == 'checkbox') {
        if (!o.is(':checked')) {
            o.parent().closest('div').addClass("has-error");
            return false;
        }
        else {
            o.parent().closest('div').removeClass("has-error");
            return true;
        }
    }
    else if(tipo == 'combo') {
        if (o.val()=='') {
            o.parent().closest('div').addClass("has-error");
            return false;
        }
        else {
            o.parent().closest('div').removeClass("has-error");
            return true;
        }
    }
    else {
        if (o.val().length < lungo) {
            o.parent().closest('div').addClass("has-error");
            return false;
        }
        else {
            var myRegExp;
            switch (tipo) {
                case 'date':
                    if (ValidaDate(o.val()))
                    {
                        o.parent().closest('div').removeClass("has-error");
                        return true;
                    }
                    else
                    {
                        o.parent().closest('div').addClass("has-error");
                        return false;
                    }
                case 'codfisc':
                    if (ControllaCF(o.val())) {
                        o.parent().closest('div').removeClass("has-error");
                        return true;
                    }
                    else {
                        o.parent().closest('div').addClass("has-error");
                        return false;
                    }
                case 'piva':
                    if (ControllaPIVA(o.val())) {
                        o.parent().closest('div').removeClass("has-error");
                        return true;
                    }
                    else {
                        o.parent().closest('div').addClass("has-error");
                        return false;
                    }
                case 'all':
                    o.parent().closest('div').removeClass("has-error");
                    return true;
                case 'iban':
                    myRegExp=/^IT\d{2}[ ][a-zA-Z]\d{3}[ ]\d{4}[ ]\d{4}[ ]\d{4}[ ]\d{4}[ ]\d{3}|IT\d{2}[a-zA-Z]\d{22}$/;
                case 'double':
                   // myRegExp = /^\d+-\,?\d*$/;
                    myRegExp = /^-?[0-9]\d*(\,\d+)?$/;
                    //myRegExp = /^(\-)d+\,?d*$/;
                    break;
                case 'passwd':
                    myRegExp = /^.*(?=.{4,8})(?=.*\d)(?=.*[A-Z]).*$/;
                    break;
                case 'time':
                    myRegExp = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
                    break;
                case 'numeric':
                    myRegExp = /^\d+$/;
                    break;
                case 'email':
                    myRegExp = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
                    break;
                case 'phone':
                    //myRegExp = /^([+]39)?((38[{0,9}])|(34[{0-9}])|(36[{0-9}])|(33[{0-9}])|(32[{0,9}]))([\d]{7})$/;
                    myRegExp = /^3\d{9}$/;
                    break;
				case 'longitude':
                    //myRegExp = /^([+]39)?((38[{0,9}])|(34[{0-9}])|(36[{0-9}])|(33[{0-9}])|(32[{0,9}]))([\d]{7})$/;
                    myRegExp = /^(-?(?:1[0-7]|[1-9])?\d(?:\.\d{1,8})?|180(?:\.0{1,8})?)$/;
                    break;
				case 'latitude':
                    //myRegExp = /^([+]39)?((38[{0,9}])|(34[{0-9}])|(36[{0-9}])|(33[{0-9}])|(32[{0,9}]))([\d]{7})$/;
                    myRegExp = /^(-?[1-8]?\d(?:\.\d{1,8})?|90(?:\.0{1,8})?)$/;
                    break;
            }
            if ((myRegExp.test(o.val()))) {
                o.parent().closest('div').removeClass("has-error");
                return true;
            }
            else {
                var valore = o.val();
                o.parent().closest('div').addClass("has-error");
                switch (tipo) {
                    case 'date':
                        o.val('Carattere invalido nella sequenza!');
                        break;
                    case 'all':
                        o.val('Carattere invalido nella sequenza!');
                        break;
                    case 'iban':
                        o.val('IBAN formalmente invalido!');
                        break;
                    case 'time':
                        o.val('Orario non valido (HH:MM)!');
                        break;
                    case 'combo':
                        o.val('Select a choice');
                        break;
                    case 'numeric':
                        o.val('Ammessi solo valori numerici!');
                        break;
                    case 'double':
                        return false;
                        //o.val('Ammessi solo valori numerici!');
                    case 'passwd':
                        return false;
                    case 'email':
                        // o.val('Email invalida!');
                        return false;
                    case 'phone':
                        o.val('Numero di telefono invalido!');
                        break;
					case 'longitude':
                        // o.val('Email invalida!');
                        return false;
					case 'latitude':
                        // o.val('Email invalida!');
                        return false;
                }
                setTimeout(function () {
                    o.val(valore);
                }, 2000);
                if (tipo != 'date') o.focus();
                return false;
            }
        }
    }

}