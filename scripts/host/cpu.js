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
		this.QuantumTicks = 1;
    
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
			var op = _Memory.memory[this.PC];
			switch(op)
			{
			//switch on op codes to determine what todo, if all else fails increment the PC and move on
				case "A9":
				{
					this.Acc = parseInt(_Memory.memory[++this.PC], 16);
					document.getElementById('ACC').innerHTML=this.Acc;
					_PCB.ACCVal = this.Acc;
					_PCB.PCLoc = this.PC;
					break;
				}
				case "AD":
				{
					var locale = _Memory.memory[++this.PC];
					this.Acc = _Memory.memory[_PCB.checkLimit(_Memory.convert(locale))];
					document.getElementById('ACC').innerHTML=this.Acc;
					_PCB.ACCVal = this.Acc;
					_PCB.PCLoc = this.PC;
					break;
				}
				case "8D":
				{
					var locale = _Memory.memory[++this.PC];
					_Memory.memory[_PCB.checkLimit(_Memory.convert(locale))] = this.Acc.toString(16);
					document.getElementById(_PCB.checkLimit(_Memory.convert(locale))).innerHTML=this.Acc.toString(16).toUpperCase();
					_PCB.PCLoc = this.PC;
					break;
				}
				case "6D":
				{
					var adder = _Memory.memory[++this.PC];
					this.Acc = this.Acc + parseInt(_Memory.memory[_PCB.checkLimit(_Memory.convert(adder))], 16);
					document.getElementById("ACC").innerHTML=this.Acc;
					_PCB.ACCVal = this.Acc;
					_PCB.PCLoc = this.PC;
					break;
				}
				case "A2":
				{
					this.Xreg = parseInt(_Memory.memory[++this.PC],16);
					document.getElementById("X").innerHTML=this.Xreg.toString(16);
					_PCB.XVal = this.Xreg;
					_PCB.PCLoc = this.PC;
					break;
				}
				case "AE":
				{
					var locale = _Memory.memory[++this.PC];
					this.Xreg = parseInt(_Memory.memory[_PCB.checkLimit(_Memory.convert(locale))], 16);
					document.getElementById("X").innerHTML=this.Xreg.toString(16);
					_PCB.XVal = this.Xreg;
					_PCB.PCLoc = this.PC;
					break;
				}
				case "A0":
				{
					this.Yreg = parseInt(_Memory.memory[++this.PC],16);
					document.getElementById("Y").innerHTML=this.Yreg.toString(16);
					_PCB.YVal = this.Yreg;
					_PCB.PCLoc = this.PC;
					break;
				}
				case "AC":
				{
					var locale = _Memory.memory[++this.PC];
					this.Yreg = parseInt(_Memory.memory[_PCB.checkLimit(_Memory.convert(locale))], 16);
					document.getElementById("Y").innerHTML=this.Yreg.toString(16);
					_PCB.YVal = this.Yreg;
					_PCB.PCLoc = this.PC;
					break;
				}
				case "EA":
				{
					break;
				}
				case "00":
				{
					if(_Memory.memory[this.PC + 1] === "00")
					{
						this.isExecuting = false;
					}
					break;
				}
				case "EC":
				{
					var locale = _Memory.memory[++this.PC];
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
					_PCB.PCLoc = this.PC;
					break;
				}
				case "D0":
				{
					if(this.Zflag > 0)
					{
						var offset = _Memory.memory[++this.PC];
						offset = parseInt(offset,16);
						this.PC = ((this.PC + offset) % 256);
					}
					else
					{
						this.PC++;
					}
					_PCB.PCLoc = this.PC;
					break;
				}
				case "EE":
				{
					var index = _PCB.checkLimit(_Memory.convert(_Memory.memory[++this.PC]))
					incrementor = parseInt(_Memory.memory[index],16);
					incrementor++;
					_Memory.memory[index] = incrementor.toString(16);
					document.getElementById(index).innerHTML = incrementor.toString(16);
					_PCB.PCLoc = this.PC;
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
						while(_Memory.memory[this.Yreg] != "00")
						{
							_Console.putText(String.fromCharCode(parseInt(_Memory.memory[this.Yreg], 16)));
							this.Yreg++;
						}
						_Console.putText(" ");
					}
					_PCB.PCLoc = this.PC;
					break;
				}
				default:
				{
					this.PC++;
					document.getElementById('PC').innerHTML=this.PC;
					_PCB.PCLoc = this.PC;
				}
			}
			this.PC++;
			_PCB.PCLoc = this.PC;
			document.getElementById('PC').innerHTML=this.PC;
		}
    };
	
	this.CPUScheduler = function()
	{
		if(this.QuantumTicks > _Quantum)
		{
			_KernelInterruptQueue.enqueue( new Interrupt(CONTEXTSWITCH_IRQ, 0) );
		}
		this.QuantumTicks++;
	}
	
	this.ContextSwitch = function()
	{
		var temp = _PCB;
		_PCB = _ReadyQueue.dequeue();
		if(_PCB === temp)
		{
			_ReadyQueue.enqueue(temp);
			this.QuantumTicks = 0;
		}
		else
		{
			_ReadyQueue.enqueue(temp);
			document.getElementById('RQ1').innerHTML=_PCB.toString();
			document.getElementById('RQ2').innerHTML=temp.toString();
			this.QuantumTicks = 0;
		}
		this.PC = _PCB.PCLoc;
	}
}
