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
  location: {
    lat: number;
    lng: number;
    address?: string;
  };
  distance?: number;
  liked?: boolean;
  is_liked_by_user?: boolean; // Nuevo campo de la vista
  suscripcion_value: number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ComercioEdit extends Omit<Comercio, "id"> {}
