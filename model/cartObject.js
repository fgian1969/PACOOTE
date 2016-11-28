var cartObject = function (data) {  
    this.data = data;
}


cartObject.prototype.ipso = {}

cartObject.checkCart=function(req,callback){
	var qta=0;
	if (req.cookies.Pacoote)
	{
		ipso=req.cookies.Pacoote;
		for (var prop in ipso) {
			qta+=ipso[prop].qtaTot;
		}
		var cartobj={ipso};
		callback(null,cartobj)
	}
	else
	{
		console.log("Ciao");
		return callback(false);
	}
};






module.exports = cartObject;









