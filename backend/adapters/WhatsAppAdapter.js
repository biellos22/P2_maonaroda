class WhatsAppAdapter {
  static adapt(userObject) {
    const cleanPhone = userObject.telefone.replace(/\D/g, '');
    const mensagem = encodeURIComponent(`Olá ${userObject.nome}, encontrei seu serviço no app Mão na Roda!`);

    return {
      ...userObject.toObject(),
      whatsappUrl: `https://wa.me/55${cleanPhone}?text=${mensagem}`
    };
  }
}

module.exports = WhatsAppAdapter;