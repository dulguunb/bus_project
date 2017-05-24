
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
		for(var i=0;i<busroutetobusstop.length;i++)
		{
			if(busroutetobusstop[i].busstop_id == this.origin)
			{
				for(var j=0;j<busroutetobusstop.length;j++)
				{
					if(busroutetobusstop[j].busstop_id == this.destination)
						console.log(busroutetobusstop[j].busroute_id);
				}
			}
		}
	}
}
function inputs()
{
	var input = new inputStack();
	input.push_back(2);
	input.push_back(3);
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