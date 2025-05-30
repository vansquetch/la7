export interface Comercio {
  id: number;
  name: string;
  ubicacion: string;
  description?: string;
  image: string;
  whatsapp?: string;
  instagram?: string;
  slug?: string;
  categorias?: string[];
}
