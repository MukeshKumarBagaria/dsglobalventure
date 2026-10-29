import type { StaticImageData } from "next/image";

import heroRefineryBlueHour from "@/assets/images/hero-refinery-blue-hour.jpg";
import refineryBlueDusk from "@/assets/images/refinery-blue-dusk.jpg";
import plantNightGold from "@/assets/images/plant-night-gold.jpg";
import refineryNightMoon from "@/assets/images/refinery-night-moon.jpg";
import storageTanksSky from "@/assets/images/storage-tanks-sky.jpg";
import stainlessTanksMono from "@/assets/images/stainless-tanks-mono.jpg";
import tankFarmAerial from "@/assets/images/tank-farm-aerial.jpg";
import tankerTrucks from "@/assets/images/tanker-trucks.jpg";
import tankerTruckDepot from "@/assets/images/tanker-truck-depot.jpg";
import blueChemicalDrums from "@/assets/images/blue-chemical-drums.jpg";
import chemicalSacksPallets from "@/assets/images/chemical-sacks-pallets.jpg";
import tankerShipAerial from "@/assets/images/tanker-ship-aerial.jpg";
import containerShipTeal from "@/assets/images/container-ship-teal.jpg";
import portContainerShip from "@/assets/images/port-container-ship.jpg";
import containerTerminal from "@/assets/images/container-terminal.jpg";
import warehouseForklift from "@/assets/images/warehouse-forklift.jpg";
import handshakeDocuments from "@/assets/images/handshake-documents.jpg";
import stainlessProcessPlant from "@/assets/images/stainless-process-plant.jpg";
import stainlessPipework from "@/assets/images/stainless-pipework.jpg";
import stainlessVessel from "@/assets/images/stainless-vessel.jpg";
import plywoodLayers from "@/assets/images/plywood-layers.jpg";
import woodVeneer from "@/assets/images/wood-veneer.jpg";
import paintTubs from "@/assets/images/paint-tubs.jpg";
import petrochemicalPlant from "@/assets/images/petrochemical-plant.jpg";
import industrialComplex from "@/assets/images/industrial-complex.jpg";
import pharmaProduction from "@/assets/images/pharma-production.jpg";
import polymerPellets from "@/assets/images/polymer-pellets.jpg";
import constructionSiteDusk from "@/assets/images/construction-site-dusk.jpg";
import textileMill from "@/assets/images/textile-mill.jpg";

export type SiteImage = { src: StaticImageData; alt: string };

/** Keep only what next/image needs — drops the base64 blur preview from every page payload. */
const lean = (img: StaticImageData): StaticImageData => ({ src: img.src, width: img.width, height: img.height });

/** Image registry — alt texts follow docs/01-WEBSITE-CONTENT.md §11. */
export const images = {
  heroRefinery: { src: lean(heroRefineryBlueHour), alt: "Chemical processing plant and storage tank at blue hour" },
  refineryDusk: { src: lean(refineryBlueDusk), alt: "Industrial chemical plant illuminated at dusk" },
  plantNight: { src: lean(plantNightGold), alt: "Chemical manufacturing plant lit up at night" },
  refineryMoon: { src: lean(refineryNightMoon), alt: "Process plant at night under a full moon" },
  storageTanks: { src: lean(storageTanksSky), alt: "Large industrial storage tanks against a blue sky" },
  stainlessTanks: { src: lean(stainlessTanksMono), alt: "Stainless steel chemical storage tanks" },
  tankFarm: { src: lean(tankFarmAerial), alt: "Aerial view of a tank farm at sunrise" },
  tankerTrucks: { src: lean(tankerTrucks), alt: "Stainless steel road tankers for bulk liquid transport" },
  tankerDepot: { src: lean(tankerTruckDepot), alt: "Bulk tanker truck at a loading depot" },
  drums: { src: lean(blueChemicalDrums), alt: "Stacked blue industrial chemical drums" },
  sacks: { src: lean(chemicalSacksPallets), alt: "Palletised sacks of solid chemical product" },
  tankerShip: { src: lean(tankerShipAerial), alt: "Aerial view of a chemical tanker vessel at sea" },
  containerShip: { src: lean(containerShipTeal), alt: "Container ship sailing through teal waters" },
  port: { src: lean(portContainerShip), alt: "Container ship arriving at an industrial port" },
  terminal: { src: lean(containerTerminal), alt: "Container terminal with cranes and stacked containers" },
  warehouse: { src: lean(warehouseForklift), alt: "Warehouse with forklift and palletised goods" },
  handshake: { src: lean(handshakeDocuments), alt: "Business handshake over signed documents" },
  processPlant: { src: lean(stainlessProcessPlant), alt: "Stainless steel process equipment and pipework" },
  pipework: { src: lean(stainlessPipework), alt: "Stainless steel pipework in a processing facility" },
  vessel: { src: lean(stainlessVessel), alt: "Stainless steel process vessel" },
  plywood: { src: lean(plywoodLayers), alt: "Stacked plywood sheets showing veneer layers" },
  veneer: { src: lean(woodVeneer), alt: "Curved wood veneer sheets" },
  paint: { src: lean(paintTubs), alt: "Open tubs of coloured industrial paint" },
  petrochemPlant: { src: lean(petrochemicalPlant), alt: "Chemical manufacturing plant with distillation columns" },
  complex: { src: lean(industrialComplex), alt: "Large industrial complex with pipes and tanks" },
  pharma: { src: lean(pharmaProduction), alt: "Pharmaceutical production staff in a clean manufacturing area" },
  pellets: { src: lean(polymerPellets), alt: "Close-up of polymer pellets" },
  construction: { src: lean(constructionSiteDusk), alt: "Construction site with cranes at dusk" },
  textile: { src: lean(textileMill), alt: "Rows of spinning machines in a textile mill" },
} satisfies Record<string, SiteImage>;

export type ImageKey = keyof typeof images;
