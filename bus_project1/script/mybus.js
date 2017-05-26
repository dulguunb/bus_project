
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
	this.myBusRoute = [];
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


		return this.findBusRouteInfo(result);
		 
	}
	this.findBusRouteInfo = function(result)
	{
		var busroute_info = [];
		for(var j=0;j<result.length;j++)
		{
		for(var i=0;i<busroutename.length;i++)
		{
				if(result[j].busroute_id==busroutename[i].busroute_id){
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
		this.inputter.push(newInput);
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