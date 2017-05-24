
function busInfo()
{
	this.busstop = [];
	this.busroute = [];
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
	this.findRoute = function()
	{
		var myBusInfoOrigin = new busInfo();
		var myBusInfoDestination = new busInfo();
		for(var i=0;i<busroutetobusstop.length;i++)
		{
			if(busroutetobusstop[i].busstop_id == this.origin)
			{
				myBusInfoOrigin.busroute.push(busroutetobusstop[i].busroute_id);
			}
		}
		var result = [];
		for(var i=0;i<busroutetobusstop.length;i++)
		{
			if(busroutetobusstop[i].busstop_id==this.destination)
			{
				myBusInfoDestination.busroute.push(busroutetobusstop[i].busroute_id);
			}	
		}
		for(var i=0;i<myBusInfoOrigin.busroute.length;i++)
		{
			for(var j=0;j<myBusInfoDestination.busroute.length;j++)
			{
				if(myBusInfoOrigin.busroute[i] == myBusInfoDestination.busroute[j])
				{
					result.push(myBusInfoDestination.busroute[i]);
				}
			}
		}
		
		return result;

	}
}
function inputs()
{
	var input = new inputStack();
	input.push_back(279);
	input.push_back(281);
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
	busstop.findRoute();

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