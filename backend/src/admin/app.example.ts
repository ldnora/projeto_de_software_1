// import type { StrapiApp } from '@strapi/strapi/admin';

// export default {
//   config: {
//     locales: [
//       // 'ar',
//       // 'fr',
//       // 'cs',
//       // 'de',
//       // 'dk',
//       // 'es',
//       // 'he',
//       // 'id',
//       // 'it',
//       // 'ja',
//       // 'ko',
//       // 'ms',
//       // 'nl',
//       // 'no',
//       // 'pl',
//       // 'pt-BR',
//       // 'pt',
//       // 'ru',
//       // 'sk',
//       // 'sv',
//       // 'th',
//       // 'tr',
//       // 'uk',
//       // 'vi',
//       // 'zh-Hans',
//       // 'zh',
//     ],
//   },
//   bootstrap(app: StrapiApp) {
//     console.log(app);
//   },
// };


import type { StrapiApp } from "@strapi/strapi/admin";

const DEFAULT_LAYOUTS: Record<string, any> = {
  "api::home.home": {
    edit: [[{ name: "zona_dinamica", size: 12 }]],
    list: ["zona_dinamica"],
  },
  "api::about-us.about-us": {
    edit: [[{ name: "zona_dinamica", size: 12 }]],
    list: ["zona_dinamica"],
  },
  "api::regras.regras": {
    edit: [[{ name: "zona_dinamica", size: 12 }]],
    list: ["zona_dinamica"],
  },
  "api::plantas.plantas": {
    edit: [
      [
        { name: "titulo", size: 6 },
        { name: "slug", size: 6 },
      ],
      [{ name: "imagem", size: 12 }],
      [{ name: "descricao", size: 12 }],
    ],
    list: ["titulo", "slug"],
  },
  "api::planta.planta": {
    edit: [
      [
        { name: "nome_cientifico", size: 6 },
        { name: "nome_popular", size: 6 },
      ],
      [
        { name: "familia", size: 6 },
        { name: "habitat", size: 6 },
      ],
      [{ name: "descricao", size: 12 }],
    ],
    list: ["nome_popular", "nome_cientifico"],
  },
};

export default {
  config: {},
  bootstrap(app: StrapiApp) {
    app.registerHook(
      "content-manager.beforeBuildLayouts",
      ({ layouts, contentType }) => {
        const uid = contentType.uid;
        const custom = DEFAULT_LAYOUTS[uid];
        if ((!layouts || !layouts.edit || !layouts.list) && custom) {
          return { layouts: custom };
        }
        return {};
      }
    );
  },
};
