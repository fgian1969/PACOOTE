var cartObject = function () {  
    this.data = {
     "books":[{
       "title":"Un tappeto di boschi selvaggi",
       "img":"/images/boschi.jpg",
       "code": "code1",
       "desc":output1,
       "price": "14.72",
       "qta":0
     },
     {
       "title":"The Boss",
       "img":"/images/boss.jpg",
       "code": "code2",
       "desc":output1,
       "price": "24.32",
       "qta":0
     },
     {
       "title":"Lo spazio fra le nuvole",
       "img":"/images/camilla.jpg",
       "code": "code3",
       "desc":output1,
       "price": "12.28",
       "qta":0
     },
     {
       "title":"Carlo Ancelotti",
       "img":"/images/celotti.jpg",
       "code": "code4",
       "desc":output1,
       "price": "34.22",
       "qta":0
     },
     {
       "title":"Free States of Jones",
       "img":"/images/jones.jpg",
       "code": "code5",
       "desc":output1,
       "price": "22.12",
       "qta":0
     },
     {
       "title":"Lacrime",
       "img":"/images/lacrime.jpg",
       "code": "code6",
       "desc":output1,
       "price": "11.13",
       "qta":0
     },
     {
       "title":"Nannini",
       "img":"/images/nannini.jpg",
       "code": "code7",
       "desc":output1,
       "price": "23.43",
       "qta":0
     },
     {
       "title":"Una pecora nera al potere",
       "img":"/images/pecora.jpg",
       "code": "code8",
       "desc":output1,
       "price": "44.12",
       "qta":0
     }],
     "qtaTot":
     {
       "qta":0
     }
};
}


cartObject.prototype.data = {}

cartObject.checkCart=function(req,callback){
	var qta=0;
	if (req.cookies.Pacoote)
	{
		ipso=req.cookies.Pacoote;
		for (var prop in ipso.data.books) {
			qta+=ipso.data.books[prop].qta;
		}
		//console.log(qta);
		ipso.data.qtaTot.qta=qta;
		//console.log(ipso.data.qtaTot.qta);
		callback(null,ipso)
	}
	else
	{
		console.log("Ciao");
		return callback(false);
	}
};






module.exports = cartObject;









