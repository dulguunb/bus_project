
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
	this.originInfo=[];
	this.destinationInfo = [];
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
				this.originInfo.push(busroutetobusstop[i]);
			}
		}
	}

	this.findDestination = function()
	{
		var busrouteObject=[];
		for(var i=0;i<busroutetobusstop.length;i++)
		{
			if(this.destination == busroutetobusstop[i].busstop_id)
			{
				this.destinationInfo.push(busroutetobusstop[i]);
			}
		}
	}

	this.findRoute = function()
	{
		this.findOrigin();
	    this.findDestination();
		var result = [];
		for(var i=0;i<this.originInfo.length;i++)
		{
			for(var j=0;j<this.destinationInfo.length;j++)
			{
				if(this.originInfo[i].busroute_id == this.destinationInfo[j].busroute_id)
				{
					result.push(this.destinationInfo[j]);
				}
			}
		}
		
		return result;
		 
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
	console.log(busstop.findRoute());
//	console.log(busstop.findOrigin());

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