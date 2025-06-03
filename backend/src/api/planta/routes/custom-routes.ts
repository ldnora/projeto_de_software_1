// src/api/planta/routes/custom-routes.ts

export default {
  routes: [
    {
      method: 'POST',
      path: '/plantas/:slug/generate-qrcode',
      handler: 'planta.generateQRCode',
      config: {
        auth: false, // defina como true se quiser proteger a rota
      },
    },
  ],
};
