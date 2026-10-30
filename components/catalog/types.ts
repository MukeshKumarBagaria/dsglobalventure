import type { DocType } from "@/content/catalog";

/** Serializable shapes passed from the server page to the client catalogue controller. */
export type ViewerDoc = {
  id: string;
  type: DocType;
  label: string;
  url: string;
  preview: string;
  file: string;
  pages: number;
  sizeKB: number;
  productSlug: string;
};

export type ViewerProduct = {
  slug: string;
  name: string;
  cas: string;
};
