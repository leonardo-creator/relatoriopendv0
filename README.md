# 📸 Gerenciador de Metadados de Imagem

<div align="center">
  
[![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4+-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

*Uma aplicação moderna e poderosa para gerenciar metadados de imagens com localização GPS*

[🚀 Demo](#demo) • [📥 Instalação](#instalação) • [🔧 Funcionalidades](#funcionalidades) • [📖 Documentação](#documentação)

![App Preview](./relat_light-main/img%20site.png)

</div>

## 🌟 Visão Geral

O **Gerenciador de Metadados de Imagem** é uma aplicação web avançada construída com Next.js que permite extrair, visualizar e gerenciar metadados de imagens com foco especial em dados de localização GPS. Perfeito para profissionais que trabalham com georeferenciamento, mapeamento e documentação visual.

### ✨ Por que usar?

- **🎯 Interface Intuitiva**: Design moderno e responsivo com tema claro/escuro
- **🗺️ Processamento GPS**: Extração automática de coordenadas GPS das imagens
- **📊 Múltiplos Formatos**: Exportação para Excel, PDF, JSON, KML e Word
- **⚡ Performance**: Carregamento rápido e processamento eficiente
- **🔄 Gestão de Status**: Sistema completo de acompanhamento de tarefas
- **📱 Responsivo**: Funciona perfeitamente em desktop, tablet e mobile

## 🔧 Funcionalidades

### 📸 Processamento de Imagens
- ✅ **Extração automática de metadados EXIF**
- ✅ **Leitura de coordenadas GPS (Latitude/Longitude)**
- ✅ **Conversão para coordenadas UTM**
- ✅ **Geração de thumbnails otimizados**
- ✅ **Suporte a múltiplos formatos** (JPEG, PNG, TIFF, etc.)

### 🗂️ Gerenciamento de Dados
- ✅ **Sistema de status** (Pendente, Concluído, Atrasado)
- ✅ **Edição inline de descrições**
- ✅ **Datas de previsão automáticas**
- ✅ **Backup e restauração em JSON**
- ✅ **Remoção individual de imagens**

### 📤 Exportação Avançada
- 📊 **Excel** - Planilhas detalhadas com formatação
- 📄 **PDF** - Relatórios profissionais com imagens
- 🗃️ **JSON** - Backup completo dos dados
- 🗺️ **KML** - Visualização no Google Earth
- 📝 **Word** - Documentos editáveis

### 🎨 Interface e UX
- 🌙 **Modo escuro/claro** com alternância automática
- 📱 **Design responsivo** para todos os dispositivos
- ⚡ **Loading states** e feedback visual
- 🔍 **Preview de imagens** em alta qualidade
- 📋 **Toasts informativos** para ações do usuário

## 🚀 Instalação

### Pré-requisitos
- Node.js 18+ 
- npm, yarn ou pnpm

### 📥 Clone o repositório
```bash
git clone https://github.com/seu-usuario/relatoriopendv0.git
cd relatoriopendv0
```

### 📦 Instale as dependências
```bash
npm install
# ou
yarn install
# ou
pnpm install
```

### 🔧 Configure o ambiente
```bash
# Crie um arquivo .env.local (se necessário)
cp .env.example .env.local
```

### 🚀 Execute o projeto
```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

Acesse [http://localhost:3000](http://localhost:3000) para ver a aplicação!

## 📖 Como Usar

### 1. 📤 Upload de Imagens
- Clique em **"Carregar Imagens"** ou arraste e solte arquivos
- As imagens são processadas automaticamente
- Metadados GPS são extraídos quando disponíveis

### 2. ✏️ Editar Informações
- Clique no ícone de edição para modificar descrições
- Ajuste datas de previsão conforme necessário
- Altere status entre Pendente, Concluído ou Atrasado

### 3. 📊 Exportar Dados
- Use os botões de exportação no topo da lista
- Escolha entre Excel, PDF, JSON, KML ou Word
- Arquivos são baixados automaticamente

### 4. 💾 Backup e Restauração
- Exporte JSON para backup completo
- Importe JSON para restaurar sessões anteriores

## 🛠️ Tecnologias Utilizadas

### Frontend
- **Next.js 15.2.4** - Framework React de produção
- **React 19** - Biblioteca de interface de usuário
- **TypeScript** - Tipagem estática para JavaScript
- **Tailwind CSS** - Framework CSS utilitário

### UI/UX
- **Radix UI** - Componentes acessíveis e customizáveis
- **Lucide React** - Ícones modernos e elegantes
- **next-themes** - Gerenciamento de temas claro/escuro
- **Sonner** - Sistema de notificações

### Processamento
- **EXIF.js** - Extração de metadados de imagem
- **date-fns** - Manipulação de datas
- **Class Variance Authority** - Gerenciamento de estilos

### Ferramentas de Desenvolvimento
- **ESLint** - Linting e qualidade de código
- **PostCSS** - Processamento de CSS
- **TypeScript Config** - Configuração TypeScript otimizada

## 📁 Estrutura do Projeto

```
relatoriopendv0/
├── 📂 app/                    # App Router do Next.js
│   ├── layout.tsx            # Layout raiz da aplicação
│   ├── page.tsx              # Página principal
│   └── globals.css           # Estilos globais
├── 📂 components/            # Componentes React
│   ├── image-metadata-manager.tsx  # Componente principal
│   ├── header.tsx            # Cabeçalho da aplicação
│   ├── intro-section.tsx     # Seção de introdução
│   ├── metadata-card.tsx     # Card de metadados
│   ├── theme-provider.tsx    # Provedor de temas
│   └── 📂 ui/               # Componentes de UI reutilizáveis
├── 📂 lib/                   # Utilitários e lógica de negócio
│   ├── image-processor.ts    # Processamento de imagens
│   ├── coordinates.ts        # Conversões de coordenadas
│   ├── date-utils.ts         # Utilitários de data
│   └── 📂 export/           # Módulos de exportação
│       ├── excel.ts          # Exportação Excel
│       ├── pdf.ts            # Exportação PDF
│       ├── json.ts           # Exportação JSON
│       ├── kml.ts            # Exportação KML
│       └── word.ts           # Exportação Word
├── 📂 types/                 # Definições TypeScript
│   └── image-metadata.ts     # Interface de metadados
└── 📂 public/               # Arquivos estáticos
```

## 🔍 Funcionalidades Detalhadas

### 🗺️ Processamento GPS
- **Extração EXIF**: Leitura automática de dados GPS das imagens
- **Conversão DMS→DD**: Converte coordenadas DMS para Decimal
- **Cálculo UTM**: Geração de coordenadas UTM para o Brasil
- **Validação**: Verificação de integridade dos dados GPS

### 📊 Exportação Excel
```typescript
// Exemplo de dados exportados
{
  "Nome": "IMG_001.jpg",
  "Status": "Pendente",
  "Descrição": "Ponto de monitoramento",
  "Latitude": -23.5505,
  "Longitude": -46.6333,
  "UTM": "23K 333394.123 7395452.456",
  "Data": "24/05/2025 14:30:00",
  "Previsão": "27/05/2025"
}
```

### 🗺️ Exportação KML
- **Google Earth Ready**: Arquivos prontos para Google Earth
- **Status Colors**: Cores diferentes por status (Verde=Concluído, Amarelo=Pendente, Vermelho=Atrasado)
- **Rich Descriptions**: Descrições completas com imagens
- **Coordenadas Precisas**: Posicionamento exato no mapa

### 📱 Responsividade
- **Mobile First**: Design otimizado para dispositivos móveis
- **Breakpoints**: sm, md, lg, xl para diferentes tamanhos
- **Touch Friendly**: Botões e controles adequados para touch
- **Performance**: Carregamento otimizado em conexões lentas

## 📱 Mobile vs Desktop

### 📱 Versão Mobile
- **Limitação de exportação**: Apenas formato JSON disponível
- **Vantagem**: Processamento direto no celular onde as fotos foram tiradas
- **Uso recomendado**: Captura e processamento inicial no campo
- **Máximo recomendado**: 50 fotos por vez para melhor performance

### 💻 Versão Desktop  
- **Exportação completa**: PDF, Word, Excel, KML e JSON
- **Maior poder de processamento**: Pode lidar com mais imagens simultaneamente
- **Recursos avançados**: Relatórios visuais com mapas e gráficos
- **Workflow recomendado**: Importar JSON do mobile para gerar relatórios finais

### 🔄 Workflow Mobile → Desktop
1. **No celular**: Carregue fotos e exporte em JSON
2. **Transfira** o arquivo JSON para o desktop (WhatsApp, email, nuvem)
3. **No desktop**: Importe o JSON e exporte em qualquer formato

## 🤝 Contribuindo

Contribuições são muito bem-vindas! Para contribuir:

1. 🍴 **Fork** o projeto
2. 🌿 **Crie** uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. 💾 **Commit** suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. 📤 **Push** para a branch (`git push origin feature/AmazingFeature`)
5. 🔄 **Abra** um Pull Request

### 📋 Guidelines
- Siga as convenções de código existentes
- Adicione testes quando necessário
- Atualize a documentação
- Use commit messages descritivos

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Leonardo Juvencio**
- 🌐 GitHub: [@leonardo-juvencio](https://github.com/leonardo-juvencio)
- 📧 Email: leonardo.juvencio@email.com
- 💼 LinkedIn: [leonardo-juvencio](https://linkedin.com/in/leonardo-juvencio)

---

## 🙏 Agradecimentos

- **Next.js Team** - Framework incrível
- **Radix UI** - Componentes acessíveis
- **Tailwind CSS** - CSS utility-first
- **EXIF.js** - Biblioteca de metadados
- **Comunidade Open Source** - Inspiração e suporte

---

<div align="center">

**⭐ Se este projeto foi útil para você, considere dar uma estrela!**

Made with ❤️ by [Leonardo Juvencio](https://github.com/leonardo-juvencio)

</div>
