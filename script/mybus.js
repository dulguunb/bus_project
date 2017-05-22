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
}
function inputs()
{
	
}

function inputStack()
{
	this.inputter=[];
	this.push_back = function(newInput)
	{
		if(inputter.length<2){
		inputter.push(newInput);
		}
		if(inputter.length == 2)
		{
			if(finishFirst())
			{
				finishInput();
			}
			else
			{
				startOver();
			}
		}
		if(inputter.length > 3)
		{
			startOver();
		}
	};
	this.finishInput = function()
	{
		var myNewBusstop = new mybusstop();
		myNewBusstop.setOrigin(inputter[0]);
		myNewBusstop.setDestination(inputter[1]);
		return myNewBusStop;
	};
	this.startOver = function()
	{
		inputter.shift();
	};
	this.stateChange=function()
	{

	};
	this.finishFirst = function(answer)
	{
		return answer;
	}
}