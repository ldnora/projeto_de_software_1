/**
 * planta service
 */

import { factories } from '@strapi/strapi';
import QRCode from 'qrcode';

export default factories.createCoreService('api::planta.planta', ({ strapi }) => ({
  async generateQRCode(slug: string) {
    const plantas = await strapi.entityService.findMany('api::planta.planta', {
      filters: { slug },
      populate: '*',
    });

    // Garantir que plantas é array e tem elementos
    if (!Array.isArray(plantas) || plantas.length === 0) {
      throw new Error('Planta não encontrada');
    }

    const planta = plantas[0];

    console.log('Planta encontrada:', planta);
    console.log('Slug recebido:', slug);

    if (!planta) {
      throw new Error('Planta não encontrada');
    }

    if (!planta.slug || typeof planta.slug !== 'string') {
      throw new Error('Slug inválido na planta');
    }

    const url = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/planta/${planta.slug}`;

    const qrCodeBase64 = await QRCode.toDataURL(url, { type: 'image/png' });
    console.log('QR Code base64 length:', qrCodeBase64.length);

    const base64Data = qrCodeBase64.replace(/^data:image\/png;base64,/, '');
    console.log('Base64 data snippet:', base64Data.slice(0, 30));

    const buffer = Buffer.from(base64Data, 'base64');
    console.log('Buffer length:', buffer.length);

    const file = {
      //path: 'qrcodes',
      name: `qrcode_planta_${planta.id}.png`,
      type: 'image/png',
      buffer,
    };

    const uploadedFiles = await strapi.plugin('upload').service('upload').upload({
      data: {},
      files: file,
    });

    if (!uploadedFiles || uploadedFiles.length === 0) {
      throw new Error('Erro ao fazer upload do QR code');
    }
    console.log('Uploaded files:', uploadedFiles);

    //@ts-ignore
    await strapi.entityService.update('api::planta.planta', planta.id, {
      //@ts-ignore
      data: { qrcode: uploadedFiles[0].id },
    });

    return uploadedFiles[0].url;
  },
}));
