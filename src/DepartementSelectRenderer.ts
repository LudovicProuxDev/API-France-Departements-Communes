import { Departement } from "./Departement.ts";

export class DepartementSelectRenderer {

    readonly apiDepartementsFrance: string = "https://geo.api.gouv.fr/departements";
    private _departements: Departement[] = [];
    private _currentDepartement: Departement = new Departement("", "", "");

    constructor() { }

    public get departements() {
        return this._departements;
    }

    public set departements(departements: Departement[]) {
        this._departements = departements;
    }

    public get currentDepartement() {
        return this._currentDepartement;
    }

    public set currentDepartement(currentDepartement: Departement) {
        this._currentDepartement = currentDepartement;
    }

    private addDepartement(departement: Departement) {
        this._departements.push(departement);
    }

    private async getResponseDepartements() {
        try {
            const response = await fetch(this.apiDepartementsFrance);
            return await response.json();
        } catch (error) {
            console.error('Error fetching data:', error);
            return null;
        }
    }

    public async setDepartements() {
        let listDepartements = [];
        try {
            listDepartements = await this.getResponseDepartements();
            if (listDepartements.length > 0) {
                listDepartements.forEach((departement: Departement) => {
                    this.addDepartement(new Departement(departement.nom, departement.code, departement.codeRegion))
                });
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            listDepartements = [];
        }
    }

    private createOption(departement: Departement): HTMLOptionElement {
        const optionContainer = document.createElement("option");
        optionContainer.appendChild(document.createTextNode(`${departement.code} - ${departement.nom}`));
        optionContainer.value = departement.code;
        return optionContainer;
    }

    public setCurrentDepartement(codeDepartement: string) {
        this._departements.filter((departement) => {
            if (departement.code === codeDepartement) {
                this.currentDepartement = departement;
            }
        });
    }

    public render() {
        this.setCurrentDepartement(this.departements[0].code);
        const departementsContainer = document.getElementById("departements");
        this.departements.forEach(departement => {
            departementsContainer?.appendChild(this.createOption(departement));
        });
    }
}