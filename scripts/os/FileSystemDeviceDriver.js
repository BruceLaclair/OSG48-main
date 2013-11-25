/* ----------------------------------
	FileSystemDeviceDriver.js
   
	Requires deviceDriver.js
   
	The File System Device Driver.
   ---------------------------------- */
   
FileSystemDeviceDriver.prototype = new DeviceDriver;  // "Inherit" from prototype DeviceDriver in deviceDriver.js.
   
function FileSystemDeviceDriver()                     // Add or override specific attributes and method pointers.
{
    // "subclass"-specific attributes.
    // Override the base method pointers.
    this.driverEntry = krnFileDriverEntry;
    this.isr = krnFileOperations;
    // "Constructor" code.
}

function krnFileDriverEntry()
{
    // Initialization routine for this, the kernel-mode File System Device Driver.
	//Just to be safe making sure Local Storage is enabled.
	if(typeof(Storage)!=="undefined")
  {
	this.status = "loaded";
  }
	else
  {
	this.status = "Sorry could not Start Hard Drive, Storage not enabled.";
  }
	
}

function krnFileOperations(params)
{
	//Because it's all being held in the same driver I decided to use one IRQ,
	//and just pass in a parameter that included which operation it wanted on the disk.
	var operation = params;
	
	switch(operation)
	{
		case 0:
			format();
			break;
		case 1: 
			create(params);
			break
		case 2:
			write(params);
			break;
		case 3:
			read(params);
			break;
		case 4:
			deleteFile(params);
			break;
		case 5:
			listFiles();
			break;
		default:
			krnTrapError("How did you manage that?");
			break;		
	}
}

function format()
{
	for(i = 0; i < _NumTracks; i++)
	{
		for(j = 0; j < _NumSectors; j++)
		{
			for(k = 0; k < _NumBlocks; k++)
			{
				var TSB = i.toString() + j.toString() + k.toString();
				localStorage[TSB] = "0AKB-------------------------------------------------------------ね";
			}
		}
	}
	localStorage[_MBR] = "I am the Master Bootね";
	_StdIn.putText("All done, but...d..don't get used to it...it's not like I did it because I wanted to...");
	_StdIn.advanceLine();
	_StdIn.putText(_OsShell.promptStr);
}

function create(params)
{
	emptyDir = findMetaData();
	if(!emptyDir)
	{
		_StdIn.putText("Srry I iz to full to create anything else nao");
		_StdIn.advanceLine();
		_StdIn.putText(_OsShell.promptStr);
	}
	else
	{
		if(!findAvailableData())
		{
			if (!_TsundereMode)
			{
				_StdIn.putText("Although there was room to create the file, you can't actually do anything with it so...I am not going to create it");
			}
			else
			{
				_StdIn.putText("No thanks to your piss poor memory management, the data is full, so even if I created this file, you couldn't do anything with it baka.");
			}
		}
		localStorage[emptyDir] = "1" + findAvailableData() + _FileName + "ね";
		localStorage[findAvailableData()] = "1AKB" + localStorage[findAvailableData()].substring(4);
		_StdIn.putText("Kay that wasn't so bad I created the file " + _FileName + " for you");
		_StdIn.advanceLine();
		_StdIn.putText(_OsShell.promptStr);
	
	}
	_FileName = "";
}

function write(params)
{
	var locale = findFileName(_FileName);
	var i = 0;
	if(locale)
	{
		var NeededBlocks = Math.floor(_ToBeWritten.length/_WritableChar) + 1;
		while(NeededBlocks > 0)
		{
			needsToBeWritten = _ToBeWritten.substring(i*_WritableChar,i*_WritableChar + _WritableChar+1);
			localStorage[locale] = "1AKB";
			if(NeededBlocks === 1)
			{
				localStorage[locale] = "1AKB" + needsToBeWritten + "ね";
				_StdIn.putText("I...well I wrote it...bu...bu..but...I am not doing it because you told me too");
				_StdIn.advanceLine();
				_StdIn.putText(_OsShell.promptStr);
				NeededBlocks--;
				_ToBeWritten = "";
			}
			else
			{
				if(findAvailableData())
				{
					localStorage[locale] = "1" + findAvailableData() + needsToBeWritten;
					locale = findAvailableData();
					NeededBlocks--;
				}
				else
				{
					_StdIn.putText("Srry it couldn't all fit so I wrote what I could");
					NeededBlocks = 0;
				}
			}
			i++;
		}

	}
	else
	{
		if (!_TsundereMode)
			{
				_StdIn.putText("I can't find it, try to create it first?  If that doesn't work try again later.");
				_StdIn.advanceLine();
				_StdIn.putText(_OsShell.promptStr);
				_ToBeWritten = "";
			}
			else
			{
				_StdIn.putText("So, the thing, yea that thing you are looking for? It doesn't exist so please stop looking for it >.>");
				_StdIn.advanceLine();
				_StdIn.putText(_OsShell.promptStr);
				_ToBeWritten = "";
			}
	}
}

function read(params)
{
	var locale = findFileName(_FileName);
	var i = 0;
	var toBeRead = "";
	var atTheEnd = false;
	if(locale)
	{
		while(!atTheEnd)
		if(localStorage[locale].indexOf("ね") !== -1)
		{
			toBeRead += localStorage[locale].substring(4, localStorage[locale].indexOf("ね"));
			for(i = 0; i < toBeRead.length; i++)
			{
				_StdIn.putText(toBeRead[i]);
			}
			_StdIn.advanceLine();
			_StdIn.putText(_OsShell.promptStr);
			atTheEnd = true;
		}
		else
		{
			toBeRead += localStorage[locale].substring(4);
			locale = localStorage[locale].substring(1,4);
		}
	}
	else
	{
		if (!_TsundereMode)
			{
				_StdIn.putText("I can't find it, try to create it first?  If that doesn't work try again later.");
				_StdIn.advanceLine();
				_StdIn.putText(_OsShell.promptStr);
			}
			else
			{
				_StdIn.putText("So, the thing, yea that thing you are looking for? It doesn't exist so please stop looking for it >.>");
				_StdIn.advanceLine();
				_StdIn.putText(_OsShell.promptStr);
			}
	}	
}

function deleteFile(params)
{
	var locale = findFileName(_FileName);
	var i = 0;
	var atTheEnd = false;
	if(locale)
	{
		while(!atTheEnd)
		if(localStorage[locale].indexOf("ね") !== -1)
		{
			localStorage[locale] = "0AKB" + localStorage[locale].substring(4);
			localStorage[findFile(_FileName)] = "0AKB" + localStorage[findFile(_FileName)].substring(4);
			_StdIn.putText("I removed it, just like you wanted.  I did a good job right?");
			_FileName = "";
			_ToBeWritten = "";
			atTheEnd = true;
		}
		else
		{
			locale2 = locale;
			locale = localStorage[locale].substring(1,4);
			localStorage[locale2] = "0AKB" + localStorage[locale].substring(4);
		}
	}
	else
	{
		if (!_TsundereMode)
			{
				_StdIn.putText("I can't find it, try to create it first?  If that doesn't work try again later.");
				_StdIn.advanceLine();
				_StdIn.putText(_OsShell.promptStr);
			}
			else
			{
				_StdIn.putText("So, the thing, yea that thing you are looking for? It doesn't exist so please stop looking for it >.>");
				_StdIn.advanceLine();
				_StdIn.putText(_OsShell.promptStr);
			}
	}	
}

function findAvailableData()
{
//the function searches through memory to find the first available data block and returns it.
//Also returns false if nothing is open.
	for(i = 1; i < _NumTracks; i++)
	{
		for(j = 0; j < _NumSectors; j++)
		{
			for(k = 0; k < _NumBlocks; k++)
			{
				var TSB = i.toString() + j.toString() + k.toString();
				if(localStorage[TSB][0] === "0")
				{
					return TSB;
				}
			}
		}
	}
	return false;
}

function findMetaData()
{
//the function searches through the Meta data to find the first available meta data block and returns it.
//Also returns false if nothing is open.
	i = 0;
	for(j = 0; j < _NumSectors; j++)
	{
		for(k = 0; k < _NumBlocks; k++)
		{
			var TSB = i.toString() + j.toString() + k.toString();
			if(localStorage[TSB][0] === "0")
			{
				return TSB;
			}
		}
	}
	return false;
}

function findFileName(_FileName)
{
//the function searches through the file system to find the file name and returns where it's data starts.
//Also returns false if nothing is open.
	i = 0;
	for(j = 0; j < _NumSectors; j++)
	{
		for(k = 0; k < _NumBlocks; k++)
		{
			var TSB = i.toString() + j.toString() + k.toString();
			if(localStorage[TSB][0] === "1")
			{
				var tempFileName = localStorage[TSB].substring(4, localStorage[TSB].indexOf("ね"));
				if(tempFileName === _FileName)
				{
					return localStorage[TSB].substring(1,4);
				}
			}
		}
	}
	return false;
}

function findFile(_FileName)
{
//the function searches through memory to find the file and returns it's TSB.
//Also returns false if nothing is open.
	i = 0;
	for(j = 0; j < _NumSectors; j++)
	{
		for(k = 0; k < _NumBlocks; k++)
		{
			var TSB = i.toString() + j.toString() + k.toString();
			if(localStorage[TSB][0] === "1")
			{
				var tempFileName = localStorage[TSB].substring(4, localStorage[TSB].indexOf("ね"));
				if(tempFileName === _FileName)
				{
					return TSB;
				}
			}
		}
	}
	return false;
}

function listFiles()
{
	//This function will produce and create the list of files on disk
	i = 0;
	var toBeReturned = "";
	for(j = 0; j < _NumSectors; j++)
	{
		for(k = 0; k < _NumBlocks; k++)
		{
			var TSB = i.toString() + j.toString() + k.toString();
			if(localStorage[TSB][0] === "1")
			{
					_StdIn.putText(localStorage[TSB].substring(4));
					_StdIn.advanceLine();
			}
		}
	}
	_StdIn.advanceLine();
	_StdIn.putPrompt();
}