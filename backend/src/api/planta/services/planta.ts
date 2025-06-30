/**
 * planta service
 */

import { factories } from '@strapi/strapi';
import QRCode from 'qrcode';
import FormData from 'form-data';
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path'; // Import the 'path' module

export default factories.createCoreService('api::planta.planta', ({ strapi }) => ({
  async generateQRCode(slug: string) {
    const plantas = await strapi.entityService.findMany('api::planta.planta', {
      filters: { slug },
      populate: '*',
    });

    if (!plantas.length) throw new Error('Planta não encontrada');
    
    const planta = plantas[0];

    // --- "LAZY DELETION" LOGIC ---
    try {
      const uploadPath = path.resolve(process.cwd(), 'public', 'uploads');
      const filesInDir = await fs.promises.readdir(uploadPath);
      const prefixToDelete = `qrcode_planta_${planta.id}_`;

      console.log(`Searching for files with prefix: ${prefixToDelete}`);

      const filesToDelete = filesInDir.filter(file => file.startsWith(prefixToDelete));
      const deletionPromises = filesToDelete.map(file => {
        const filePath = path.join(uploadPath, file);
        console.log(`Deleting old QR code file: ${filePath}`);
        return fs.promises.unlink(filePath);
      });

      await Promise.all(deletionPromises);
    } catch (error) {
      console.error("Could not perform QR code cleanup:", error.message);
    }

    const url = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/planta/${planta.slug}`;

    // Gera QR code base64 PNG
    const qrCodeBase64 = await QRCode.toDataURL(url, { type: 'image/png' });
    const base64Data = qrCodeBase64.replace(/^data:image\/png;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');

    // Salva arquivo temporário
    const tempFilePath = `/tmp/qrcode_planta_${planta.id}.png`;
    await fs.promises.writeFile(tempFilePath, buffer);

    try {
      // Prepara FormData para upload
      const form = new FormData();
      form.append('files', fs.createReadStream(tempFilePath));
      form.append('ref', 'api::planta.planta');
      form.append('refId', planta.id.toString());
      form.append('field', 'qrcode');

      // Envia para o endpoint REST do Strapi upload
      const res = await fetch(`${process.env.STRAPI_ADMIN_URL || 'http://localhost:1337'}/api/upload`, {
        method: 'POST',
        body: form,
        headers: form.getHeaders ? form.getHeaders() : {},
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Upload falhou: ${errorText}`);
      }

      const uploadResponse = await res.json();

      if (!uploadResponse || uploadResponse.length === 0) {
        throw new Error('Resposta inválida do upload');
      }

      return uploadResponse[0].url; // URL da imagem do QR code
    } finally {
      // Limpa arquivo temporário
      await fs.promises.unlink(tempFilePath).catch(() => {});
    }
  },
}));
