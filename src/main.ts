import { DepartementSelectRenderer } from './DepartementSelectRenderer.ts'
import { CommuneSelectRenderer } from './CommuneSelectRenderer.ts'

const departementSelectRenderer = new DepartementSelectRenderer();
await departementSelectRenderer.setDepartements();
departementSelectRenderer.render();

const communeSelectRenderer = new CommuneSelectRenderer(departementSelectRenderer);
await communeSelectRenderer.setCommunes()
communeSelectRenderer.render();