class CPU_AI {

    private _cpu:Player;

    constructor(cpu:Player) {
        this._cpu = cpu;
    }

    get cpu() {
        return this._cpu;
    }
    
    done():boolean {
        console.log('CPU moved');
        return true;
    }
}