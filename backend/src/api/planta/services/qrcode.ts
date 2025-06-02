const QRCode = require('qrcode');

module.exports = {
  async generateQRCode(url) {
    try {
      // Gera o QR Code em PNG base64
      const pngBase64 = await QRCode.toDataURL(url, { type: 'image/png' });
      // Retorna o conteúdo base64 (string que começa com 'data:image/png;base64,...')
      return pngBase64;
    } catch (error) {
      strapi.log.error('Erro ao gerar QR Code:', error);
      throw error;
    }
  }
};
