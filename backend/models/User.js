const mongoose = require('mongoose');

const bairrosDeMarica = [
  'Centro', 'Flamengo', 'Mumbuca', 'Itapeba', 'Parque Nanci', 'Ponta Grossa', 
  'São José do Imbassaí', 'Araçatiba', 'Jacaroá', 'Barra de Maricá', 'Zacarias', 
  'Restinga de Maricá', 'Retiro', 'Camburi', 'Pindobas', 'Caxito', 'Ubatiba', 
  'Pilar', 'Lagarto', 'Silvado', 'Condado de Maricá', 'Marquês de Maricá', 'Inoã', 
  'Ponta Negra', 'Itaipuaçu', 'Jardim Atlântico', 'Bambuí', 'Cordeirinho', 
  'Jardim Guaratiba', 'Caju', 'Manoel Ribeiro', 'Espraiado', 'Vale da Figueira', 'Bananal'
];

const categoriasDeServico = [
  'Eletricista', 'Encanador', 'Pintor', 'Pedreiro', 'Gesseiro', 'Marceneiro', 'Serralheiro',
  'Vidraceiro', 'Técnico em ar-condicionado', 'Técnico em eletrônicos / eletrodomésticos',
  'Diarista', 'Faxineira', 'Limpeza pós-obra', 'Limpeza de estofados', 'Jardinagem', 'Piscineiro',
  'Cuidador de idosos', 'Pet sitter', 'Dog walker', 'Serviços de pet shop domiciliar',
  'Manicure/pedicure', 'Maquiadora', 'Designer de sobrancelhas', 'Depiladora', 'Esteticista',
  'Massagista', 'Personal stylist', 'Professor particular', 'Aulas de música', 'Aulas de inglês / idiomas',
  'Aulas de informática', 'Reforço para ENEM ou concursos', 'Treinador pessoal / personal trainer',
  'Mecânico', 'Lavador de carros a domicílio', 'Motorista particular', 'Reboque / guincho',
  'Transporte escolar', 'Motoboy / entregador', 'Contador', 'Designer gráfico', 'Web designer',
  'Fotógrafo', 'Filmagem de eventos', 'Técnico em TI / manutenção de computadores',
  'Digitador / assistente virtual', 'Garçom / copeiro', 'Barman', 'Buffet', 'Decorador de festas',
  'DJ', 'Animador infantil', 'Locação de brinquedos', 'Engenheiro civil', 'Mestre de obras',
  'Topógrafo', 'Corretor de imóveis', 'Costureira', 'Personal organizer', 'Montador de móveis',
  'Instalador de TV/Internet', 'Serviços gerais (faz-tudo)'
];

const UserSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  tipo: { type: String, required: true, enum: ['cliente', 'prestador'] },
  telefone: { type: String, required: true },
  cidade: { type: String, required: true, default: 'Maricá' },
  bairro: { type: String, required: true, enum: bairrosDeMarica },
  categoria: { type: String, enum: categoriasDeServico },
  descricao: { type: String, maxlength: 500 },
}, { timestamps: true });

// Índice para otimizar a busca de prestadores
UserSchema.index({ tipo: 1, categoria: 1, bairro: 1 });

module.exports = mongoose.model('User', UserSchema);