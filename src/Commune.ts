export class Commune {

    private _nom: string;
    private _code: string;
    private _codeDepartement: string;
    private _siren: string;
    private _codeEpci: string;
    private _codeRegion: string;
    private _codesPostaux: string[];
    private _population: number;

    constructor(nom: string, code: string, codeDepartement: string, siren: string,
        codeEpci: string, codeRegion: string, codesPostaux: string[], population: number) {
        this._nom = nom;
        this._code = code;
        this._codeDepartement = codeDepartement;
        this._siren = siren;
        this._codeEpci = codeEpci;
        this._codeRegion = codeRegion;
        this._codesPostaux = codesPostaux;
        this._population = population;
    }

    public get nom() {
        return this._nom;
    }

    public get code() {
        return this._code;
    }

    public get codeDepartement() {
        return this._codeDepartement;
    }

    public get siren() {
        return this._siren;
    }

    public get codeEpci() {
        return this._codeEpci;
    }

    public get codeRegion() {
        return this._codeRegion;
    }

    public get codesPostaux() {
        return this._codesPostaux;
    }

    public get population() {
        return this._population;
    }

    public set nom(nom: string) {
        this._nom = nom;
    }

    public set code(code: string) {
        this._code = code;
    }

    public set codeDepartement(codeDepartement: string) {
        this._codeDepartement = codeDepartement;
    }

    public set siren(siren: string) {
        this._siren = siren;
    }

    public set codeEpci(codeEpci: string) {
        this._codeEpci = codeEpci;
    }

    public set codeRegion(codeRegion: string) {
        this._codeRegion = codeRegion;
    }

    public set codesPostaux(codesPostaux: string[]) {
        this._codesPostaux = codesPostaux;
    }

    public set population(population: number) {
        this._population = population;
    }
}