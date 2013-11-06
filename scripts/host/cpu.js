/* ------------  
   CPU.js

   Requires global.js.
   
   Routines for the host CPU simulation, NOT for the OS itself.  
   In this manner, it's A LITTLE BIT like a hypervisor,
   in that the Document environment inside a browser is the "bare metal" (so to speak) for which we write code
   that hosts our client OS. But that analogy only goes so far, and the lines are blurred, because we are using
   JavaScript in both the host and client environments.

   This code references page numbers in the text book: 
   Operating System Concepts 8th edition by Silberschatz, Galvin, and Gagne.  ISBN 978-0-470-12872-5
   ------------ */

function Cpu() {
		this.PC    = 0;
        this.Acc   = 0;
        this.Xreg  = 0;
        this.Yreg  = 0;
        this.Zflag = 0;      
        this.isExecuting = false;  
		this.QuantumTicks = _Quantum;
		this.tickSenseValidOpCode = 0;
    
    this.init = function() {
		this.PC    = 0;     // Program Counter
		document.getElementById('PC').innerHTML=this.PC;
		this.Acc   = 0;     // Accumulator
		document.getElementById('ACC').innerHTML=this.Acc;
		this.Xreg  = 0;     // X register
		document.getElementById('X').innerHTML=this.Xreg;
		this.Yreg  = 0;     // Y register
		document.getElementById('Y').innerHTML=this.Yreg;
		this.Zflag = 0;     // Z-ero flag (Think of it as "isZero".)
		document.getElementById('Z').innerHTML=this.Zflag;
		this.isExecuting = false;
		_PCB = new PCB;
		_PCB.init(0);
    };
    
    this.cycle = function() {
        krnTrace("CPU cycle");
        // Do the real work here. Be sure to set this.isExecuting appropriately.
		if(this.isExecuting)
		{
			this.CPUScheduler();
			var op = _Memory.memory[this.PC + _PCB.base];
			switch(op)
			{
			//switch on op codes to determine what todo, if all else fails increment the PC and move on
				case "A9":
				{
					this.Acc = parseInt(_Memory.memory[++this.PC + _PCB.base], 16);
					document.getElementById('ACC').innerHTML=this.Acc;
					this.tickSenseValidOpCode = 0;
					break;
				}
				case "AD":
				{
					var locale = _Memory.memory[++this.PC + _PCB.base];
					this.Acc = _Memory.memory[_PCB.checkLimit(_Memory.convert(locale))];
					document.getElementById('ACC').innerHTML=this.Acc;
					this.tickSenseValidOpCode = 0;
					break;
				}
				case "8D":
				{
					var locale = _Memory.memory[++this.PC + _PCB.base];
					_Memory.memory[_PCB.checkLimit(_Memory.convert(locale))] = this.Acc.toString(16);
					document.getElementById(_PCB.checkLimit(_Memory.convert(locale))).innerHTML=this.Acc.toString(16).toUpperCase();
					this.tickSenseValidOpCode = 0;
					break;
				}
				case "6D":
				{
					var adder = _Memory.memory[++this.PC + _PCB.base];
					this.Acc = this.Acc + parseInt(_Memory.memory[_PCB.checkLimit(_Memory.convert(adder))], 16);
					document.getElementById("ACC").innerHTML=this.Acc;
					this.tickSenseValidOpCode = 0;
					break;
				}
				case "A2":
				{
					this.Xreg = parseInt(_Memory.memory[++this.PC + _PCB.base],16);
					document.getElementById("X").innerHTML=this.Xreg.toString(16);
					this.tickSenseValidOpCode = 0;
					break;
				}
				case "AE":
				{
					var locale = _Memory.memory[++this.PC + _PCB.base];
					this.Xreg = parseInt(_Memory.memory[_PCB.checkLimit(_Memory.convert(locale))], 16);
					document.getElementById("X").innerHTML=this.Xreg.toString(16);
					this.tickSenseValidOpCode = 0;
					break;
				}
				case "A0":
				{
					this.Yreg = parseInt(_Memory.memory[++this.PC + _PCB.base],16);
					document.getElementById("Y").innerHTML=this.Yreg.toString(16);
					this.tickSenseValidOpCode = 0;
					break;
				}
				case "AC":
				{
					var locale = _Memory.memory[++this.PC + _PCB.base];
					this.Yreg = parseInt(_Memory.memory[_PCB.checkLimit(_Memory.convert(locale))], 16);
					document.getElementById("Y").innerHTML=this.Yreg.toString(16);
					this.tickSenseValidOpCode = 0;
					break;
				}
				case "EA":
				{
					this.tickSenseValidOpCode = 0;
					break;
				}
				case "00":
				{
					if((_Memory.memory[(this.PC + _PCB.base) + 1] === "00") && (_Memory.memory[(this.PC + _PCB.base) + 2] === "00") && (_Memory.memory[(this.PC + _PCB.base) + 3] === "00"))
					{
						if(_ReadyQueue.isEmpty())
						{
							_PCB.isDone = true;
							_PCB.ACCVal = 0;
							_PCB.XRegVal = 0;
							_PCB.YRegVal = 0;
							_PCB.ZFlagVal = 0;
							this.Acc   = 0;
							this.Xreg  = 0;
							this.Yreg  = 0;
							this.Zflag = 0;
							this.isExecuting = false;
						}
						else
						{
							_PCB.isDone = true;
							_PCB.ACCVal = 0;
							_PCB.XRegVal = 0;
							_PCB.YRegVal = 0;
							_PCB.ZFlagVal = 0;
							this.Acc   = 0;
							this.Xreg  = 0;
							this.Yreg  = 0;
							this.Zflag = 0;
							_KernelInterruptQueue.enqueue( new Interrupt(CONTEXTSWITCH_IRQ, 0) );
						}
					}
					this.tickSenseValidOpCode = 0;
					break;
				}
				case "EC":
				{
					var locale = _Memory.memory[++this.PC + _PCB.base];
					if(this.Xreg != _Memory.memory[_PCB.checkLimit(_Memory.convert(locale))])
					{
						this.Zflag = 1;
						_PCB.ZFlagVal = 1;
						document.getElementById("Z").innerHTML = this.Zflag;
					}
					else
					{
						this.Zflag = 0;
						_PCB.ZFlagVal = 0;
						document.getElementById("Z").innerHTML = this.Zflag;
					}
					this.tickSenseValidOpCode = 0;
					break;
				}
				case "D0":
				{
					if(this.Zflag > 0)
					{
						var offset = _Memory.memory[++this.PC + _PCB.base];
						offset = parseInt(offset,16);
						this.PC = ((this.PC + _PCB.base + offset) % (_BlockSize + 1));
					}
					else
					{
						this.PC++;
					}
					this.tickSenseValidOpCode = 0;
					break;
				}
				case "EE":
				{
					var index = _PCB.checkLimit(_Memory.convert(_Memory.memory[++this.PC + _PCB.base]))
					incrementor = parseInt(_Memory.memory[index],16);
					incrementor++;
					_Memory.memory[index] = incrementor.toString(16);
					document.getElementById(index).innerHTML = incrementor.toString(16);
					this.tickSenseValidOpCode = 0;
					break;
				}
				case "FF":
				{
					if(this.Xreg === 1)
					{
						 _Console.putText(this.Yreg.toString(16));
						 _Console.putText(" ");
					}
					else if(this.Xreg === 2)
					{
						var tempY = this.Yreg;
						_PCB.YRegVal = this.Yreg;
						while(_Memory.memory[tempY] != "00")
						{
							_Console.putText(String.fromCharCode(parseInt(_Memory.memory[tempY], 16)));
							tempY++;
						}
						_Console.putText(" ");
					}
					this.tickSenseValidOpCode = 0;
					break;
				}
				default:
				{
					if(this.tickSenseValidOpCode === 3)
					{
						if(!_Memory.memory[(this.PC + _PCB.base)] === "00")
						{
							_KernelInterruptQueue.enqueue( new Interrupt(INVALID_OPCODE_IRQ, 0) );
						}
					}
					else
					{
						this.PC++;
						document.getElementById('PC').innerHTML=this.PC;
						this.tickSenseValidOpCode++;
					}
				}
			}
			this.PC++;
			document.getElementById('PC').innerHTML=this.PC + _PCB.base;
		}
    };
	
	this.CPUScheduler = function()
	{
		if(this.QuantumTicks >= _Quantum)
		{
			_KernelInterruptQueue.enqueue( new Interrupt(CONTEXTSWITCH_IRQ, 0) );
		}
		this.QuantumTicks++;
	};
	
	this.Scheduler = function(program)
	{
		_ReadyQueue.enqueue(program);
		if(!this.isExecuting)
		{
			_PCB = _ReadyQueue.dequeue();
		}
	};
	
	this.ContextSwitch = function()
	{
		var temp = _PCB;
		_PCB.PCLoc = this.PC;
		_PCB.ACCVal = this.Acc;
		_PCB.XRegVal = this.Xreg;
		_PCB.YRegVal = this.Yreg;
		_PCB.ZFlagVal = this.Zflag;
		
		if(!_PCB.isDone)
		{ 
			_ReadyQueue.enqueue(temp);
		}
		
		if(_ReadyQueue.isEmpty())
		{
			this.isExecuting = false;
			this.PC    = 0;
			this.Acc   = 0;
			this.Xreg  = 0;
			this.Yreg  = 0;
			this.Zflag = 0;
		}
		
		_PCB = _ReadyQueue.dequeue();
		if(_ReadyQueue.getSize() === 2)
		{
			document.getElementById('RQ3').innerHTML=temp.toString();
			var tempPCB2 = document.getElementById('RQ3').textContent;
			var tempPCB1 = document.getElementById('RQ2').textContent;
			document.getElementById('RQ2').innerHTML=tempPCB2;
			document.getElementById('RQ1').innerHTML=tempPCB1;
			document.getElementById('RQ3').innerHTML="さよおなら";
		}
		else if (_ReadyQueue.getSize() === 1)
		{
			document.getElementById('RQ2').innerHTML=temp.toString();
			var tempPCB1 = document.getElementById('RQ2').textContent;
			document.getElementById('RQ1').innerHTML=tempPCB1;
			document.getElementById('RQ2').innerHTML="さよおなら";
			document.getElementById('RQ3').innerHTML="さよおなら";
		}
		else if(_ReadyQueue.getSize() === 0)
		{
			document.getElementById('RQ1').innerHTML="さよおなら";
			document.getElementById('RQ2').innerHTML="さよおなら";
			document.getElementById('RQ3').innerHTML="さよおなら";
		}
		this.PC    = _PCB.PCLoc;
		this.Acc   = _PCB.ACCVal;
		this.Xreg  = _PCB.XRegVal;
		this.Yreg  = _PCB.YRegVal;
		this.Zflag = _PCB.ZFlagVal;
		document.getElementById('PC').innerHTML=this.PC + _PCB.base;
		document.getElementById('ACC').innerHTML=this.Acc;
		document.getElementById('X').innerHTML=this.Xreg.toString(16);
		document.getElementById('Y').innerHTML=this.Yreg.toString(16);
		document.getElementById('Z').innerHTML=this.Zflag;
		this.QuantumTicks = 0;		
	};
	
	this.InvalidOpCode = function()
	{
			_PCB.isDone = true;
			if (!_TsundereMode)
			{
				_StdIn.putText("Me thinks you typed something wrong at " + (this.PC + _PCB.base));						
			}
			else
			{
				_StdIn.putText("God, who taught you how to program? A コワラ？ because you are terrible at it " + (this.PC + _PCB.base));
			}
	};
}
