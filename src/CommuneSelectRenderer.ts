import { Commune } from "./Commune.ts";
import { DepartementSelectRenderer } from "./DepartementSelectRenderer.ts";

export class CommuneSelectRenderer {

    readonly apiCommunesFrance: string = "https://geo.api.gouv.fr/communes";
    private _communes: Commune[] = [];
    private _currentCommune: Commune = new Commune("", "", "", "", "", "", [], 0);
    private _communesDepartement: Commune[] = [];
    private _departementSelectRenderer: DepartementSelectRenderer = new DepartementSelectRenderer();

    constructor(departementSelectRenderer: DepartementSelectRenderer) {
        this._departementSelectRenderer = departementSelectRenderer;
    }

    public get communes() {
        return this._communes;
    }

    public set communes(communes: Commune[]) {
        this._communes = communes;
    }

    public get currentCommune() {
        return this._currentCommune;
    }

    public set currentCommune(currentCommune: Commune) {
        this._currentCommune = currentCommune;
    }

    public get communesDepartement() {
        return this._communesDepartement;
    }

    public set communesDepartement(communesDepartement: Commune[]) {
        this._communesDepartement = communesDepartement;
    }

    public get departementSelectRenderer() {
        return this._departementSelectRenderer;
    }

    public set departementSelectRenderer(departementSelectRenderer: DepartementSelectRenderer) {
        this._departementSelectRenderer = departementSelectRenderer;
    }

    private addCommune(commune: Commune) {
        this._communes.push(commune);
    }

    private async getResponseCommunes() {
        try {
            const response = await fetch(this.apiCommunesFrance);
            return await response.json();
        } catch (error) {
            console.error('Error fetching data:', error);
            return null;
        }
    }

    public async setCommunes() {
        let listCommunes = [];
        try {
            listCommunes = await this.getResponseCommunes();
            if (listCommunes.length > 0) {
                listCommunes.forEach((commune: Commune) => {
                    this.addCommune(new Commune(commune.nom, commune.code, commune.codeDepartement, commune.siren,
                        commune.codeEpci, commune.codeRegion, commune.codesPostaux, commune.population
                    ))
                });
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            listCommunes = [];
        }
    }

    private createOption(commune: Commune): HTMLOptionElement {
        const optionContainer = document.createElement("option");
        optionContainer.appendChild(document.createTextNode(`${commune.codesPostaux[0]} ${commune.nom}`));
        optionContainer.value = commune.codesPostaux[0];
        return optionContainer;
    }

    public setCurrentCommune(codeCommune: string) {
        this._communes.filter((commune) => {
            if (commune.code === codeCommune) {
                this._currentCommune = commune;
            }
        });
    }

    private createSelect() {
        this.communesDepartement = this.communes.filter((commune) => commune.codeDepartement === this.departementSelectRenderer.currentDepartement.code);
        this.communesDepartement.sort((communeA, communeB) => communeA.codesPostaux[0].localeCompare(communeB.codesPostaux[0]));

        const communesContainer = document.getElementById("communes");
        while (communesContainer?.firstElementChild) {
            communesContainer.removeChild(communesContainer?.firstElementChild);
        }
        this.communesDepartement.forEach(commune => {
            communesContainer?.appendChild(this.createOption(commune));
        });
    }

    public render() {
        this.createSelect();

        document.getElementById("departements")?.addEventListener("change", (event) => {
            this.departementSelectRenderer.setCurrentDepartement(event.target?.value);
            this.setCurrentCommune(this.communesDepartement[0].code);
            this.createSelect();
        });
    }
}