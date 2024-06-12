export class Departement {

    private _nom: string;
    private _code: string;
    private _codeRegion: string;


    constructor(nom: string, code: string, codeRegion: string) {
        this._nom = nom;
        this._code = code;
        this._codeRegion = codeRegion;
    }

    public get nom() {
        return this._nom;
    }

    public get code() {
        return this._code;
    }

    public get codeRegion() {
        return this._codeRegion;
    }

    public set nom(nom: string) {
        this._nom = nom;
    }

    public set code(code: string) {
        this._code = code;
    }

    public set codeRegion(codeRegion: string) {
        this._codeRegion = codeRegion;
    }


}