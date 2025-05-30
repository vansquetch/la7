import CreatorIcon from "~/components/icons/CreatorIcon.vue";
import NewsIcon from "~/components/icons/NewsIcon.vue";
import PlatformIcon from "~/components/icons/PlatformIcon.vue";
import RadioIcon from "~/components/icons/RadioIcon.vue";
import SocialIcon from "~/components/icons/SocialIcon.vue";
import StoreIcon from "~/components/icons/StoreIcon.vue";

export const useServices = () => {
  const services = [
    {
      id: "magazine",
      title: "Magazine Digital",
      description:
        "Centro informativo con 2000+ periódicos y flyers, publicidad impresa integrada",
      icon: markRaw(NewsIcon),
      gradient: "from-blue-500 to-blue-600",
      features: ["2000+ Periódicos", "2000+ Flyers", "Publicidad Impresa"],
    },
    {
      id: "radio",
      title: "Radio FEDEMEDELLIN",
      description:
        "Emisora online 24/7 con espacios publicitarios y contenido de entretenimiento",
      icon: markRaw(RadioIcon),
      gradient: "from-purple-500 to-purple-600",
      features: ["Emisora 24/7", "Espacios Publicitarios", "Arte & Cultura"],
    },
    {
      id: "comercio",
      title: "Directorio Comercial",
      description:
        "Plataforma de comercio con ofertas, descuentos y sistema de fidelización",
      icon: markRaw(StoreIcon),
      gradient: "from-green-500 to-green-600",
      features: [
        "Ofertas & Descuentos",
        "Sistema de Fidelización",
        "Promociones",
      ],
    },
    {
      id: "plataforma",
      title: "Ecosistema Web",
      description:
        "Plataforma integral que conecta todos los servicios en un solo lugar",
      icon: markRaw(PlatformIcon),
      gradient: "from-orange-500 to-red-600",
      features: ["Ecosistema Web", "Integración Total", "Panel de Control"],
    },
    {
      id: "social",
      title: "Redes Sociales",
      description:
        "Gestión integral de Facebook, Instagram, TikTok y publicación automatizada",
      icon: markRaw(SocialIcon),
      gradient: "from-pink-500 to-pink-600",
      features: ["Facebook", "Instagram", "TikTok", "Publicación Automática"],
    },
    {
      id: "creadores",
      title: "Para Creadores",
      description:
        "Herramientas para generadores de contenido y exposición a nuevos públicos",
      icon: markRaw(CreatorIcon),
      gradient: "from-indigo-500 to-indigo-600",
      features: ["Generadores de Contenido", "Exposición", "Nuevos Públicos"],
    },
  ];

  const getServiceById = (id: string) => {
    return services.find((service) => service.id === id);
  };

  return {
    services: readonly(services),
    getServiceById,
  };
};
