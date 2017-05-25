
function busInfo()
{
	this.busstop = [];
	this.busroute_id = [];
	this.busrouteName = [];
	this.from_nmus = [];
	this.to_nmus = [];
}
function mybusstop()
{
	this.origin;
	this.destination;
	this.setOrigin = function(neworigin)
	{
		this.origin = neworigin;
	};
	this.setDestination = function(newDestination)
	{
		this.destination = newDestination;
	};
	this.findOrigin = function()
	{
		var busrouteObject=[];
		
		for(var i=0;i<busroutetobusstop.length;i++)
		{
			if(this.origin == busroutetobusstop[i].busstop_id)
			{
				busrouteObject.push(busroutetobusstop[i]);
			}
		}
		return busrouteObject;
	}

	this.findDestination = function()
	{
		var busrouteObject=[];
		for(var i=0;i<busroutetobusstop.length;i++)
		{
			if(this.destination == busroutetobusstop[i].busstop_id)
			{
				busrouteObject.push(busroutetobusstop[i]);
			}
		}
		return busrouteObject;
	}

	this.findRoute = function()
	{
		var myBusInfoOrigin = new busInfo();
		var myBusInfoDestination = new busInfo();

		
		for(var i=0;this.findOrigin().length;i++)
		{

		}

		for(var i=0;i<busroutetobusstop.length;i++)
		{
			if(busroutetobusstop[i].busstop_id == this.origin)
			{
				myBusInfoOrigin.busroute_id.push(busroutetobusstop[i].busroute_id);
			}
		}
		var result = [];
		for(var i=0;i<busroutetobusstop.length;i++)
		{
			if(busroutetobusstop[i].busstop_id==this.destination)
			{
				myBusInfoDestination.busroute_id.push(busroutetobusstop[i].busroute_id);
			}	
		}
		for(var i=0;i<myBusInfoOrigin.busroute_id.length;i++)
		{
			for(var j=0;j<myBusInfoDestination.busroute_id.length;j++)
			{
				if(myBusInfoOrigin.busroute_id[i] == myBusInfoDestination.busroute_id[j])
				{
					result.push(myBusInfoDestination.busroute_id[i]);
				}
			}
		}

		return this.findBusRouteInfo(result);
		 
	}
	this.findBusRouteInfo = function(busroute_id)
	{
		var busroute_info = [];
		for(var j=0;j<busroute_id.length;j++)
		{
		for(var i=0;i<busroutename.length;i++)
		{
			
				if(busroute_id[j]==busroutename[i].busroute_id){
					document.getElementById("map").innerHTML += ((busroutename[i].from_nmus));
					busroute_info.push(busroutename[i]);
				}
			}
		}
	return busroute_info;
	}
	
}
function inputs()
{
	var input = new inputStack();
	input.push_back(538);
	input.push_back(202);
	/*
	11100010
	11100020
	11100030
	11100370
	11100010
	11200010
	11200020
	*/
	var busstop = input.createBusStop();
	var a = busstop.findRoute();
	console.log(busstop.findOrigin());
	console.log(a);

}
window.onload = inputs();
function inputStack()
{
	this.inputter=[];
	this.push_back = function(newInput)
	{
		if(this.inputter.length<2){
		this.inputter.push(newInput);
		}
		if(this.inputter.length > 3)
		{
			startOver();
		}
	};
	this.createBusStop = function()
	{
		var myNewBusstop = new mybusstop();
		myNewBusstop.setOrigin(this.inputter[0]);
		myNewBusstop.setDestination(this.inputter[1]);
		return myNewBusstop;
	};
	this.startOver = function()
	{
		this.inputter.shift();
	};
	this.stateChange=function()
	{

	};
	this.finishFirst = function(answer)
	{
		return answer;
	}

}