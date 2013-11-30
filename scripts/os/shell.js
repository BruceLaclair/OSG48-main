/* ------------
   Shell.js
   
   The OS Shell - The "command line interface" (CLI) for the console.
   ------------ */

// TODO: Write a base class / prototype for system services and let Shell inherit from it.

function Shell() {
    // Properties
    this.promptStr   = ">";
    this.commandList = [];
    this.curses      = "[fuvg],[cvff],[shpx],[phag],[pbpxfhpxre],[zbgureshpxre],[gvgf], [ybir]";
    this.apologies   = "[sorry], [gomenen], [gomen], [gomenasai]";
    // Methods
    this.init        = shellInit;
    this.putPrompt   = shellPutPrompt;
    this.handleInput = shellHandleInput;
    this.execute     = shellExecute;
}

function shellInit() {
    var sc = null;
    //
    // Load the command list.

    // ver
    sc = new ShellCommand();
    sc.command = "ver";
    sc.description = "- I will tell you what version you are running.";
    sc.function = shellVer;
    this.commandList[this.commandList.length] = sc;
	
	// date
	sc = new ShellCommand();
	sc.command = "date";
	sc.description = "- I will show you what time it is...though to be honest you could look at the task bar...";
	sc.function = shellDate;
	this.commandList[this.commandList.length]=sc;
	
	// whereami
	sc = new ShellCommand();
	sc.command = "whereami";
	sc.description = "- I will tell(or attempt to) tell you where you are.";
	sc.function = shellWhereami;
	this.commandList[this.commandList.length]=sc;
	
	// status <string>
	sc = new ShellCommand();
	sc.command = "status"
	sc.description = "- Type this if you want me to change the status bar for you"
	sc.function = shellStatus;
	this.commandList[this.commandList.length] = sc;
	
	// load
	sc = new ShellCommand();
	sc.command = "load"
	sc.description = "- Type this and I will load the program into memory for you :)"
	sc.function = shellLoad;
	this.commandList[this.commandList.length] = sc;
	
	// gao
	sc = new ShellCommand();
	sc.command = "gao"
	sc.description = "- I am a dinosaur"
	sc.function = shellGao;
	this.commandList[this.commandList.length] = sc;
	
	// nihaha
	sc = new ShellCommand();
	sc.command = "nihaha"
	sc.description = "- Shhh it's a secret"
	sc.function = shellNihaha;
	this.commandList[this.commandList.length] = sc;
	
    // help
    sc = new ShellCommand();
    sc.command = "help";
    sc.description = "- If you type this command I will help you...or try";
    sc.function = shellHelp;
    this.commandList[this.commandList.length] = sc;
    
	// run <int>
	sc = new ShellCommand();
	sc.command = "run";
	sc.description = "- If you type this command I will start executing the program at the specified pid";
	sc.function = shellRun;
	this.commandList[this.commandList.length] = sc;

	// runall
	sc = new ShellCommand();
	sc.command = "runall";
	sc.description = "- runs all da programs in memory"
	sc.function = shellRunAll;
	this.commandList[this.commandList.length] = sc;
	
	// quantum <int>
	sc = new ShellCommand();
	sc.command = "quantum";
	sc.description = "- Sets the quantum make sure you know what this word means before you use it";
	sc.function = shellQuantum;
	this.commandList[this.commandList.length] = sc;
	
	
	// setschedule [rr, fcfs, priority]
	sc = new ShellCommand();
	sc.command = "setschedule";
	sc.description = "- Tells me which scheduling algorithm you would like me to use.";
	sc.function = shellScheduler;
	this.commandList[this.commandList.length] = sc;
	
    // shutdown
    sc = new ShellCommand();
    sc.command = "shutdown";
    sc.description = "- Shuts down the virtual OS but leaves the underlying hardware simulation running";
    sc.function = shellShutdown;
    this.commandList[this.commandList.length] = sc;

    // cls
    sc = new ShellCommand();
    sc.command = "cls";
    sc.description = "- I will Clear the screen and reset the cursor position for you.";
    sc.function = shellCls;
    this.commandList[this.commandList.length] = sc;

    // man <topic>
    sc = new ShellCommand();
    sc.command = "man";
    sc.description = "<topic> - I will Display the MANual page for <topic>.";
    sc.function = shellMan;
    this.commandList[this.commandList.length] = sc;
    
    // trace <on | off>
    sc = new ShellCommand();
    sc.command = "trace";
    sc.description = "<on | off> - Turns the OS trace on or off.";
    sc.function = shellTrace;
    this.commandList[this.commandList.length] = sc;
	
	// breakme
	sc = new ShellCommand();
	sc.command = "breakme";
	sc.description = "- Use this at your own peril, does not bsod, I pwomise";
	sc.function = shellBreak;
	this.commandList[this.commandList.length] = sc;
	
	// format
	sc = new ShellCommand();
	sc.command = "format";
	sc.description = "- Using this will set up the hard drive so that you can create files.";
	sc.function = shellFormat;
	this.commandList[this.commandList.length] = sc;
	
	// create <String>
	sc = new ShellCommand();
	sc.command = "create";
	sc.description = "- Use this and I will create a new file for you";
	sc.function = shellCreate;
	this.commandList[this.commandList.length] = sc;
	
	// read <String>
	sc = new ShellCommand();
	sc.command = "read";
	sc.description = "- If you type this I will read the file to you... can't seem to read it yourself.";
	sc.function = shellRead;
	this.commandList[this.commandList.length] = sc;
	
	// write <String> <String>
	sc = new ShellCommand();
	sc.command = "write";
	sc.description = "- I will write to the file that you specify with what you specify in quotes";
	sc.function = shellWrite;
	this.commandList[this.commandList.length] = sc;
	
	// delete <String>
	sc = new ShellCommand();
	sc.command = "delete";
	sc.description = "- I will make sure that you never see that filthy dirty file again.";
	sc.function = shellDelete;
	this.commandList[this.commandList.length] = sc;
	
	// ls
	sc = new ShellCommand();
	sc.command = "ls"
	sc.description = "- Type this and I will list all of the files that are currently created."
	sc.function = shellList;
	this.commandList[this.commandList.length] = sc;

	
    // rot13 <string>
    sc = new ShellCommand();
    sc.command = "rot13";
    sc.description = "<string> - Does rot13 obfuscation on <string>.";
    sc.function = shellRot13;
    this.commandList[this.commandList.length] = sc;

    // prompt <string>
    sc = new ShellCommand();
    sc.command = "prompt";
    sc.description = "<string> - Sets the prompt.";
    sc.function = shellPrompt;
    this.commandList[this.commandList.length] = sc;

    // processes - list the running processes and their IDs
	sc = new ShellCommand();
    sc.command = "processes";
    sc.description = "- displays a list of all running processes";
    sc.function = shellProcesses;
    this.commandList[this.commandList.length] = sc;
	
    // kill <id> - kills the specified process id.
	sc = new ShellCommand();
    sc.command = "kill";
    sc.description = "- if you type this command I will slaughter the given PID, with joy and happiness";
    sc.function = shellKill;
    this.commandList[this.commandList.length] = sc;

    //
    // Display the initial prompt.
    this.putPrompt();
}

function shellPutPrompt()
{
    _StdIn.putText(this.promptStr);
}

function shellHandleInput(buffer)
{
    krnTrace("Shell Command~" + buffer);
    // 
    // Parse the input...
    //
    var userCommand = new UserCommand();
    userCommand = shellParseInput(buffer);
    // ... and assign the command and args to local variables.
    var cmd = userCommand.command;
    var args = userCommand.args;
    //
    // Determine the command and execute it.
    //
    // JavaScript may not support associative arrays in all browsers so we have to
    // iterate over the command list in attempt to find a match.  TODO: Is there a better way? Probably.
    var index = 0;
    var found = false;
    while (!found && index < this.commandList.length)
    {
        if (this.commandList[index].command === cmd)
        {
            found = true;
            var fn = this.commandList[index].function;
        }
        else
        {
            ++index;
        }
    }
    if (found)
    {
        this.execute(fn, args);
    }
    else
    {
        // It's not found, so check for curses and apologies before declaring the command invalid.
        if (this.curses.indexOf("[" + rot13(cmd) + "]") >= 0)      // Check for curses.
        {
            this.execute(shellCurse);
        }
        else if (this.apologies.indexOf("[" + cmd + "]") >= 0)      // Check for apologies.
        {
            this.execute(shellApology);
        }
        else    // It's just a bad command.
        {
            this.execute(shellInvalidCommand);
        }
    }
}

function shellParseInput(buffer)
{
    var retVal = new UserCommand();

    // 1. Remove leading and trailing spaces.
    buffer = trim(buffer);

    // 2. Lower-case it.  Well we would if we wanted to lowercase everything see 4.2
    //buffer = buffer.toLowerCase();

    // 3. Separate on spaces so we can determine the command and command-line args, if any.
    var tempList = buffer.split(" ");

    // 4. Take the first (zeroth) element and use that as the command.
    var cmd = tempList.shift();  // Yes, you can do that to an array in JavaScript.  See the Queue class.
    // 4.1 Remove any left-over spaces.
    cmd = trim(cmd);
    // 4.2 Record it in the return value.  Because we do not want to lowercase EVERYTHING that is typed we only care about the command
	//     I moved the toLowerCase to the command
    retVal.command = cmd.toLowerCase();

    // 5. Now create the args array from what's left.
    for (var i in tempList)
    {
        var arg = trim(tempList[i]);
        if (arg != "")
        {
            retVal.args[retVal.args.length] = tempList[i];
        }
    }
    return retVal;
}

function shellExecute(fn, args)
{
	if (!_TsundereMode){
		document.getElementById('natsu-chan').innerHTML="<label> Natsu-Chan<br><img src=\"images/Natsu-ChanStart.jpg\" alt = \"Natsu-chan\"></label>"
	}
	else
	{
		document.getElementById('natsu-chan').innerHTML="<label> Natsu-Chan<br><img src=\"images/Natsu-ChanAngry.jpg\" alt = \"Natsu-chan\"></label>"
	}
    // We just got a command, so advance the line...
    _StdIn.advanceLine();
    // ... call the command function passing in the args...
    fn(args);
    // Check to see if we need to advance the line again
    if (_StdIn.CurrentXPosition > 0)
    {
        _StdIn.advanceLine();
    }
    // ... and finally write the prompt again.
    this.putPrompt();
}


//
// The rest of these functions ARE NOT part of the Shell "class" (prototype, more accurately), 
// as they are not denoted in the constructor.  The idea is that you cannot execute them from
// elsewhere as shell.xxx .  In a better world, and a more perfect JavaScript, we'd be
// able to make then private.  (Actually, we can. have a look at Crockford's stuff and Resig's JavaScript Ninja cook.)
//

//
// An "interior" or "private" class (prototype) used only inside Shell() (we hope).
//
function ShellCommand()     
{
    // Properties
    this.command = "";
    this.description = "";
    this.function = "";
}

//
// Another "interior" or "private" class (prototype) used only inside Shell() (we hope).
//
function UserCommand()
{
    // Properties
    this.command = "";
    this.args = [];
}


//
// Shell Command Functions.  Again, not part of Shell() class per se', just called from there.
//
function shellInvalidCommand()
{
    _StdIn.putText("Invalid Command. ");
    if (_TsundereMode)
    {
        _StdIn.putText("But you're too stupid to know that huh?");
    }
    else
    {
	document.getElementById('natsu-chan').innerHTML="<label> Natsu-Chan<br><img src=\"images/Natsu-ChanConfused.jpg\" alt = \"Natsu-chan\"></label>"
        _StdIn.putText("butt..umm...I am happy to help you if you type help");
    }
}

function shellCurse()
{
	document.getElementById('natsu-chan').innerHTML="<label> Natsu-Chan<br><img src=\"images/Natsu-ChanAngry.jpg\" alt = \"Natsu-chan\"></label>"
    _StdIn.putText("Meanie, see if I ever talk to you again");
    _StdIn.advanceLine();
    _StdIn.putText("Bakemono");
    _TsundereMode = true;
}

function shellApology()
{
   if (_TsundereMode) {
	document.getElementById('natsu-chan').innerHTML="<label> Natsu-Chan<br><img src=\"images/Natsu-ChanStart.jpg\" alt = \"Natsu-chan\"></label>"
      _StdIn.putText("Well...sense you said sorry, I guess I can forgive you this once.");
      _TsundereMode = false;
   } else {
      _StdIn.putText("For what?  Should I be worried? Did you do something wrong again?");
   }
}

function shellVer(args)
{
    _StdIn.putText(APP_NAME + " version " + APP_VERSION);    
}

function shellDate(args)
{
	var d = new Date();
	_StdIn.putText(d.toDateString() + " " + d.toTimeString().replace(/.*(\d{2}:\d{2})(:\d{2}).*/, "$1"));
}

function shellWhereami(args)
{
	_StdIn.putText("That is a very peculiar question, one that I ask myself while laying in bed every night");
}

function shellGao(args)
{
	if (!_TsundereMode){
		document.getElementById('natsu-chan').innerHTML="<label> Natsu-Chan<br><img src=\"images/Natsu-ChanBlush.jpg\" alt = \"Natsu-chan\"></label>"
		_StdIn.putText("Ni ha ha");
	}
	else
	{
		_StdIn.putText("Don't rawr at me you insolent dog");
	}
}

function shellNihaha(args)
{
	if(!_TsundereMode)
	{
		document.getElementById('natsu-chan').innerHTML="<label> Natsu-Chan<br><img src=\"images/Natsu-ChanHappy.jpg\" alt = \"Natsu-chan\"></label>"
		_StdIn.putText("GAOOOOOOOOO");
	}
	else
	{
		_StdIn.putText("What are you laughing at baka-inu");
	}
}

function shellLoad(args)
{

	var priority = 100;
	if (args.length === 1)
    { 
		priority = args[0];
	}
	var programInput = document.getElementById("taProgramInput").value;
	//checks for the existence of any characters that isn't hex and return true if it is.
	var hexValidator =  /[g-z]/gi;
	if(!hexValidator.test(programInput))
	{
		document.getElementById('natsu-chan').innerHTML="<label> Natsu-Chan<br><img src=\"images/Natsu-ChanHappy.jpg\" alt = \"Natsu-chan\"></label>"
		if(_NumPrograms > 3)
		{
			_StdIn.putText("Swrry but my mammaries aren't that large...I meant memories");
			document.getElementById('natsu-chan').innerHTML="<label> Natsu-Chan<br><img src=\"images/Natsu-ChanBlush.jpg\" alt = \"Natsu-chan\"></label>"
		}
		else
		{
		//Checks where to start adding the program to memory.
			if(_NumPrograms === 0)
			{
				var i = _BlockOne;
				_PCB1 = new PCB;
				_PCB1.init(_NumPrograms, priority);
				document.getElementById("RL1").innerHTML=_PCB1.toString();
				_ResidentList.push(_PCB1.toString());
			}
			else if(_NumPrograms === 1)
			{
				var i = _BlockTwo;
				_PCB2 = new PCB;
				_PCB2.init(_NumPrograms, priority);
				document.getElementById("RL2").innerHTML=_PCB2.toString();
				_ResidentList.push(_PCB2.toString());
			}
			else if(_NumPrograms === 2)
			{
				var i = _BlockThree;
				_PCB3 = new PCB;
				_PCB3.init(_NumPrograms, priority);
				document.getElementById("RL3").innerHTML=_PCB3.toString();
				_ResidentList.push(_PCB3.toString());
			}
			else if(_NumPrograms === 3)
			{
				var i = -1;
				_PCB4 = new PCB;
				_PCB4.init(_NumPrograms, priority);
				document.getElementById("RL4").innerHTML=_PCB4.toString();
				_ResidentList.push(_PCB4.toString());
				_NumPrograms = 0;
			}
			//Go through the program being entered and add it to memory, the real memory.
			var toBeEntered = programInput.split(" ");
			var j = 0;
			if(i !== -1)
			{
				while (j < toBeEntered.length)
				{
					_Memory.memory[i] = toBeEntered[j];
					document.getElementById(i).innerHTML=_Memory.memory[i];
					j++;
					i++;
				}
				_StdIn.putText("I assigned it PID: " + _NumPrograms++ + ", but...it's not like I did it for you or anything...");
			}
			else
			{
				if(!_DidFormat)
				{
					_ToBePrinted = false;
					shellFormat();
					_StdIn.putText("The Disk wasn't formatted so I did that for you");
					_StdIn.advanceLine();
				}
				_StdIn.putText("There wasn't enough room in memory so I wrote it to the disk, I hope you're happy");
				_StdIn.advanceLine();
				_FileName = "~SwapFile";
				_KernelInterruptQueue.enqueue( new Interrupt(FILE_SYSTEM_IRQ, 1) );
				while (j < _BlockSize)
				{
					if(toBeEntered[j])
					{
						_ToBeWritten += toBeEntered[j] + " ";
						j++;
					}
					else
					{
						_ToBeWritten += "00 ";
						j++;
					}
				}
				_FileName = "~SwapFile";
				_KernelInterruptQueue.enqueue( new Interrupt(FILE_SYSTEM_IRQ, 2) );
			}
			document.getElementById('natsu-chan').innerHTML="<label> Natsu-Chan<br><img src=\"images/Natsu-ChanBlush.jpg\" alt = \"Natsu-chan\"></label>"
		}
	}
	else
	{
	document.getElementById('natsu-chan').innerHTML="<label> Natsu-Chan<br><img src=\"images/Natsu-ChanAngry.jpg\" alt = \"Natsu-chan\"></label>"
		_StdIn.putText("baka why are you so bad at this game");
	}
}

function shellRun(args)
{
	 if (args.length === 1)
    { 
		if(args[0] === "0")
		{
			_CPU.PC = _BlockOne;
			_CPU.Scheduler(_PCB1);
			document.getElementById("PC").innerHTML=_CPU.PC;
			if(_NumTimesRan === 0)
			{
				document.getElementById("RQ1").innerHTML=_PCB1.toString();
				_NumTimesRan++;
			}
			else if(_NumTimesRan === 1)
			{
				document.getElementById("RQ2").innerHTML=_PCB1.toString();
				_NumTimesRan++;
			}
			else if(_NumTimesRan === 2)
			{
				document.getElementById("RQ3").innerHTML=_PCB1.toString();
				_NumTimesRan = 0;
			}
			_CPU.isExecuting = true;
		}
		else if(args[0] === "1")
		{
			_CPU.PC = _BlockTwo;
			_CPU.Scheduler(_PCB2);
			document.getElementById("PC").innerHTML=_CPU.PC;
			if(_NumTimesRan === 0)
			{
				document.getElementById("RQ1").innerHTML=_PCB2.toString();
				_NumTimesRan++;
			}
			else if(_NumTimesRan === 1)
			{
				document.getElementById("RQ2").innerHTML=_PCB2.toString();
				_NumTimesRan++;
			}
			else if(_NumTimesRan === 2)
			{
				document.getElementById("RQ3").innerHTML=_PCB2.toString();
				_NumTimesRan = 0;
			}
			_CPU.isExecuting = true;
		}
		else if(args[0] === "2")
		{
				_CPU.pc = _BlockThree;
				_CPU.Scheduler(_PCB3);
				document.getElementById("PC").innerHTML=_CPU.PC;
			if(_NumTimesRan === 0)
			{
				document.getElementById("RQ1").innerHTML=_PCB3.toString();
				_NumTimesRan++;
			}
			else if(_NumTimesRan === 1)
			{
				document.getElementById("RQ2").innerHTML=_PCB3.toString();
				_NumTimesRan++;
			}
			else if(this.numTimesRan === 2)
			{
				document.getElementById("RQ3").innerHTML=_PCB3.toString();
				_NumTimesRan = 0;
			}
				_CPU.isExecuting = true;
		}
		else
		{
			if (!_TsundereMode)
			{
			_StdIn.putText("Ummmmm me thinks you mistyped something...maybe ... the pid?");
			}
			else
			{
				_StdIn.putText("Must I tell you that your an idiot, or can you figure out your stupidity yourself?");
			}
		}
	}
	else
	{
		if (!_TsundereMode)
		{
		_StdIn.putText("Ummmmm me thinks you forgots something...maybe ... the pid?");
		}
		else
		{
			_StdIn.putText("Must I tell you that your an idiot, or can you figure out your stupidity yourself?");
		}
	}
}

function shellRunAll(args)
{
	_CPU.PC = _BlockOne;
	_CPU.Scheduler(_PCB1);
	_CPU.isExecuting = true;
	document.getElementById("PC").innerHTML=_CPU.PC;
	document.getElementById("RQ1").innerHTML=_PCB1.toString();
	if(_PCB2 != null)
	{
		_CPU.Scheduler(_PCB2);
		document.getElementById("RQ2").innerHTML=_PCB2.toString();
	}
	if(_PCB3 != null)
	{
		_CPU.Scheduler(_PCB3);
		document.getElementById("RQ3").innerHTML=_PCB3.toString();
	}
	if(_PCB4 != null)
	{
		_CPU.Scheduler(_PCB4);
		document.getElementById("RQ4").innerHTML=_PCB4.toString();
	}
};

function shellStatus(args)
{
	var status = "";
	if (args.length > 0)
	{
		var i = 0;
		while (i < args.length)
		{
			status = status + args[i] + " ";
			i = i + 1;
		}
	}
	document.getElementById('pstatusUpdate').innerHTML=status;
}

function shellQuantum(args)
{
	if (args.length > 0)
	{
		if(_CpuSchedule === "fcfs" || _CpuSchedule === "priority")
		{
			_QuantumBackUp = args[0];
		}
		else
		{
			_Quantum = args[0];
			_QuantumBackUp = _Quantum;
		}
	}
	else
	{
		if (!_TsundereMode)
			{
			_StdIn.putText("What did you want me to set it to again?");
			}
		else
			{
				_StdIn.putText("I told you not to touch this if you didn't know what it means, what am I supposed to set it to.");
			}
	}
}


function shellHelp(args)
{
    _StdIn.putText("Commands:");
    for (var i in _OsShell.commandList)
    {
        _StdIn.advanceLine();
        _StdIn.putText("  " + _OsShell.commandList[i].command + " " + _OsShell.commandList[i].description);
    }    
}

function shellShutdown(args)
{
     _StdIn.putText("Shutting down...");
     // Call Kernel shutdown routine.
    krnShutdown();   
    // TODO: Stop the final prompt from being displayed.  If possible.  Not a high priority.  (Damn OCD!)
}

function shellCls(args)
{
    _StdIn.clearScreen();
    _StdIn.resetXY();
}

function shellMan(args)
{
    if (args.length > 0)
    {
        var topic = args[0];
        switch (topic)
        {
            case "help": 
                _StdIn.putText("Help displays a list of (hopefully) valid commands.");
                break;
            default:
                _StdIn.putText("No manual entry for " + args[0] + ".");
        }        
    }
    else
    {
        _StdIn.putText("Usage: man <topic>  Please supply a topic.");
    }
}

function shellTrace(args)
{
    if (args.length > 0)
    {
        var setting = args[0];
        switch (setting)
        {
            case "on": 
                if (_Trace && _TsundereMode)
                {
                    _StdIn.putText("Trace is already on, bakemono.");
                }
                else
                {
                    _Trace = true;
                    _StdIn.putText("Trace ON");
                }
                
                break;
            case "off": 
                _Trace = false;
                _StdIn.putText("Trace OFF");                
                break;                
            default:
                _StdIn.putText("Invalid argument.  Usage: trace <on | off>.");
        }        
    }
    else
    {
        _StdIn.putText("Usage: trace <on | off>");
    }
}

function shellBreak(args)
{
	krnTrapError("I told you not too type that");
}

function shellRot13(args)
{
    if (args.length > 0)
    {
        _StdIn.putText(args[0] + " = '" + rot13(args[0]) +"'");     // Requires Utils.js for rot13() function.
    }
    else
    {
        _StdIn.putText("Usage: rot13 <string>  Please supply a string.");
    }
}

function shellPrompt(args)
{
    if (args.length > 0)
    {
        _OsShell.promptStr = args[0];
    }
    else
    {
        _StdIn.putText("Usage: prompt <string>  Please supply a string.");
    }
}

function shellFormat(args)
{
	_DidFormat = true;
	_KernelInterruptQueue.enqueue( new Interrupt(FILE_SYSTEM_IRQ, 0) );  
	if(_ToBePrinted)
	{
		_StdIn.putText("All done, but...d..don't get used to it...it's not like I did it because I wanted to...");
		_StdIn.advanceLine();
	}
	else
	{
		_ToBePrinted = true;
	}
}

function shellCreate(args)
{
	if(_DidFormat)
	{
		if (args.length === 0)
		{
			if (!_TsundereMode)
				{
					_StdIn.putText("you know...I would be happy too...just tell me what you want me to name it");
				}
			else
				{
					_StdIn.putText("To think...Someone could actually fall in love with someone like you.");
				}
		}
		var tempName = args[0];
		var nameValidator =  /\W/gi;
		if(tempName.length < 8 && !nameValidator.test(tempName))
		{
			_FileName = "";
			_FileName = tempName.toLowerCase().trim();
			_KernelInterruptQueue.enqueue( new Interrupt(FILE_SYSTEM_IRQ, 1) );  
			_StdIn.putText("Kay that wasn't so bad I created the file " + _FileName + " for you");
			_StdIn.advanceLine();
		}
		else
		{
			if (!_TsundereMode)
				{
					_StdIn.putText("Please only include letters in the file name and make sure it is less then 8 characters");
				}
			else
				{
					_StdIn.putText("You are the reason we have to take such limits No more then 8 regular characters");
				}
		}
	}
	else
		{
			if (!_TsundereMode)
			{
				_StdIn.putText("Please format first");
			}
			else
			{
				_StdIn.putText("Eww you sick freak, your not even going to format and clean the disk first?");
			}
		}
}

function shellWrite(args)
{
	if(_DidFormat)
	{
		if (args.length <= 1)
		{
			if (!_TsundereMode)
				{
					_StdIn.putText("you know...I would be happy to...just tell me what file you want me to write");
				}
			else
				{
					_StdIn.putText("To think...Someone could actually fall in love with someone like you.");
				}
		}
		else
		{
			var tempName = args[0];
			var nameValidator =  /\W/gi;
			_ToBeWritten = "";
			for(i = 1; i < args.length; i++)
			{
				_ToBeWritten += args[i] + " ";
			}
			if(tempName.length < 8 && !nameValidator.test(tempName))
			{
				_FileName = tempName.toLowerCase().trim();
				_KernelInterruptQueue.enqueue( new Interrupt(FILE_SYSTEM_IRQ, 2) ); 
				_StdIn.putText("I...well I am writing it now but don't get the wrong idea...");
				_StdIn.advanceLine();				
			}
			else
			{
				if (!_TsundereMode)
					{
						_StdIn.putText("Please only include letters in the file name and make sure it is less then 8 characters");
					}
				else
					{
						_StdIn.putText("You are the reason we have to take such limits No more then 8 regular characters");
					}
			}
		}
	}
	else
	{
		if (!_TsundereMode)
		{
			_StdIn.putText("Please format first");
		}
		else
		{
			_StdIn.putText("Eww you sick freak, your not even going to format and clean the disk first?");
		}
	}
}

function shellRead(args)
{
	if(_DidFormat)
	{
		var tempName = args[0];
		var nameValidator =  /\W/gi;
		if(tempName.length < 8 && !nameValidator.test(tempName))
		{
			_FileName = tempName.toLowerCase().trim();
			_KernelInterruptQueue.enqueue( new Interrupt(FILE_SYSTEM_IRQ, 3) ); 
			for(i = 0; i < _ToBeRead.length; i++)
			{
				_StdIn.putText(_ToBeRead[i]);
			}
		}
		else
		{
			if (!_TsundereMode)
				{
					_StdIn.putText("Please only include letters in the file name and make sure it is less then 8 characters");
				}
			else
				{
					_StdIn.putText("You are the reason we have to take such limits No more then 8 regular characters");
				}
		}
	}
	else
		{
			if (!_TsundereMode)
			{
				_StdIn.putText("Please format first");
			}
			else
			{
				_StdIn.putText("Eww you sick freak, your not even going to format and clean the disk first?");
			}
		}
}

function shellDelete(args)
{
	if(_DidFormat)
	{
		var tempName = args[0];
		var nameValidator =  /\W/gi;
		if(tempName.length < 8 && !nameValidator.test(tempName))
		{
			_FileName = tempName.toLowerCase().trim();
			_KernelInterruptQueue.enqueue( new Interrupt(FILE_SYSTEM_IRQ, 4) ); 
			_StdIn.putText("I am removing it right now, just like you wanted.  I am doing good right?");
			_StdIn.advanceLine();
		}
		else
		{
			if (!_TsundereMode)
				{
					_StdIn.putText("Please only include letters in the file name and make sure it is less then 8 characters");
				}
			else
				{
					_StdIn.putText("You are the reason we have to take such limits No more then 8 regular characters");
				}
		}
	}
	else
		{
			if (!_TsundereMode)
			{
				_StdIn.putText("Please format first");
			}
			else
			{
				_StdIn.putText("Eww you sick freak, your not even going to format and clean the disk first?");
			}
		}
}

function shellList(args)
{
	if(_DidFormat)
	{
		_KernelInterruptQueue.enqueue( new Interrupt(FILE_SYSTEM_IRQ, 5) );
	}
	else
	{
		if (!_TsundereMode)
		{
			_StdIn.putText("Please format first");
		}
		else
		{
			_StdIn.putText("Eww you sick freak, your not even going to format and clean the disk first?");
		}
	}
}

function shellProcesses(args)
{
	if(!_CPU.isExecuting)
	{
		if (!_TsundereMode)
			{
				_StdIn.putText("There is nothing currently running");
			}
		else
			{
				_StdIn.putText("...Words cannot describe...your stupidity...Please never talk to me again.");
			}
	}
	else
	{
		if(!_PCB1.isDone)
		{
			_StdIn.putText(_PCB1.toString());
			_StdIn.advanceLine();
		}
		if(!_PCB2.isDone)
		{
			_StdIn.putText(_PCB2.toString());
			_StdIn.advanceLine();
		}
		if(!_PCB3.isDone)
		{
			_StdIn.putText(_PCB3.toString());
			_StdIn.advanceLine();
		}
	}
}

function shellKill(args)
{

	if(!_CPU.isExecuting)
	{
		if (!_TsundereMode)
			{
				_StdIn.putText("There is nothing currently running");
			}
		else
			{
				_StdIn.putText("...Words cannot describe...your stupidity...Please never talk to me again.");
			}
	}
	else if (args.length > 0)
	{
		if(args[0] === "0")
		{
			_PCB1.isDone = true;
		}
		else if(args[0] === "1")
		{
			_PCB2.isDone = true;
		}
		else if(args[0] === "2")
		{
			_PCB3.isDone = true;
		}
		else
		{
			if (!_TsundereMode)
			{
			_StdIn.putText("Sorry I can't kill what doesn't exist.");
			}
		else
			{
				_StdIn.putText("Stupidity like yours does not belong in this world, please die.");
			}
		}
	}
	else
	{
		if (!_TsundereMode)
			{
			_StdIn.putText("What did you want me to kill?");
			}
		else
			{
				_StdIn.putText("Kill what?  I guess you really do have a death wish...well if you insist.");
			}
	}
}

function shellScheduler(args)
{
	if (args.length > 0)
    {
        if(args[0].toLowerCase() === "fcfs" && _CpuSchedule !== "fcfs")
		{
			_QuantumBackup = _Quantum;
			_Quantum = 1000000;
			_StdIn.putText("Sooo I set it to First Come First Serve have fun");
		}
		else if(args[0].toLowerCase() === "rr" && _CpuSchedule !== "rr")
		{
			_Quantum = _QuantumBackup;
			_StdIn.putText("Sooo I set it to Round Robin have fun");
		}
		else if(args[0].toLowerCase() === "priority" && _CpuSchedule !== "priority")
		{
			_QuantumBackup = _Quantum;
			_Quantum = 1000000;
			_StdIn.putText("Sooo I set it to priority have fun");
		}
    }
    else
    {
        if (!_TsundereMode)
		{
			_StdIn.putText("Well what method do you want me to use?");
		}
		else
			{
				_StdIn.putText("Do we really have to go over this again? Honestly I figured you would learn by now");
			}
    }
}
