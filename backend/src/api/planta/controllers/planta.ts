/**
 * planta controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::planta.planta', ({ strapi }) => ({
  async generateQRCode(ctx) {
    const { slug } = ctx.params;

    console.log('Generating QR Code for slug:', slug);
    if (!slug) {
      return ctx.badRequest('Slug is required');
    }
    try {
      const qrcodeUrl = await strapi.service('api::planta.planta').generateQRCode(slug);
      ctx.send({
        message: 'QR Code gerado com sucesso',
        qrcode_url: qrcodeUrl,
      });
    } catch (error: any) {
      ctx.status = error.status || 404;
      ctx.send({
        error: error.message || 'Erro ao gerar QR Code',
      });
    }
  },
}));
