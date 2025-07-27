# Alfonso GMAT - Website Profesional

Sitio web profesional para Alfonso Rodríguez Mayo, profesor experto en GMAT, EA y pruebas de acceso universitario con más de 15 años de experiencia.

## 🚀 Características

### Frontend
- **Diseño Responsivo**: Optimizado para móvil, tablet y escritorio
- **SEO Optimizado**: Meta tags completos, estructura semántica, Open Graph
- **Interactividad**: Carrito de compras con session storage
- **Animaciones**: Transiciones suaves y efectos visuales
- **Accesibilidad**: Navegación por teclado, contraste adecuado

### Backend (Vercel Serverless Functions)
- **Formulario de Contacto**: Envío de emails con Nodemailer
- **Pasarela de Pago**: Integración completa con Stripe
- **Webhooks**: Procesamiento automático de pagos
- **Notificaciones**: Emails automáticos de confirmación

### Funcionalidades Principales
- ✅ Puntuación GMAT 785 destacada
- ✅ Experiencia internacional (UC Berkeley, ESADE, Londres, EE.UU.)
- ✅ Cursos: GMAT Focus, Executive Assessment, IESE & ESADE
- ✅ Clases particulares personalizadas
- ✅ Consultoría de admisiones
- ✅ Sistema de pagos seguro
- ✅ Formulario de contacto funcional
- ✅ Testimonios de estudiantes
- ✅ Información de autónomo y facturación

## 🛠️ Tecnologías Utilizadas

- **Frontend**: HTML5, CSS3 (Tailwind CSS), JavaScript Vanilla
- **Backend**: Node.js, Vercel Serverless Functions
- **Email**: Nodemailer con Gmail SMTP
- **Pagos**: Stripe Checkout
- **Deployment**: Vercel
- **Imágenes**: Unsplash (open source)

## 📁 Estructura del Proyecto

```
alfonso-gmat-website/
├── index.html              # Página principal
├── success.html            # Página de pago exitoso
├── cancel.html             # Página de pago cancelado
├── js/
│   └── main.js             # JavaScript principal
├── api/
│   ├── contact.js          # API para formulario de contacto
│   ├── create-checkout-session.js  # API para Stripe
│   └── webhook.js          # Webhook de Stripe
├── package.json            # Dependencias
├── tailwind.config.js      # Configuración de Tailwind
├── postcss.config.js       # Configuración de PostCSS
├── vercel.json             # Configuración de Vercel
├── env.example             # Variables de entorno (template)
└── README.md               # Este archivo
```

## 🚀 Instalación y Configuración

### 1. Clonar el repositorio
```bash
git clone <repository-url>
cd alfonso-gmat-website
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
```bash
cp env.example .env.local
```

Editar `.env.local` con tus credenciales:
```env
# Gmail Configuration
GMAIL_USER=tu-email@gmail.com
GMAIL_APP_PASSWORD=

# Alfonso's Email
ALFONSO_EMAIL=alfonso@gmat-expert.com

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_tu_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_tu_webhook_secret
```

### 4. Configurar Gmail
1. Activar autenticación de 2 factores en tu cuenta Gmail
2. Generar una contraseña de aplicación
3. Usar esa contraseña en `GMAIL_APP_PASSWORD`

### 5. Configurar Stripe
1. Crear cuenta en [Stripe](https://stripe.com)
2. Obtener las claves de API desde el dashboard
3. Configurar webhook en Stripe Dashboard:
   - URL: `https://tu-dominio.vercel.app/api/webhook`
   - Eventos: `checkout.session.completed`, `payment_intent.succeeded`, `payment_intent.payment_failed`

## 🚀 Deployment en Vercel

### 1. Instalar Vercel CLI
```bash
npm i -g vercel
```

### 2. Login en Vercel
```bash
vercel login
```

### 3. Deploy
```bash
vercel
```

### 4. Configurar variables de entorno en Vercel
```bash
vercel env add GMAIL_USER
vercel env add GMAIL_APP_PASSWORD
vercel env add ALFONSO_EMAIL
vercel env add STRIPE_SECRET_KEY
vercel env add STRIPE_WEBHOOK_SECRET
```

## 📧 Configuración de Email

El sistema envía emails automáticos para:
- Confirmación de formulario de contacto
- Confirmación de pago exitoso
- Notificación a Alfonso de nuevos contactos/pagos
- Notificación de pagos fallidos

### Estructura de emails:
1. **Contacto**: Email a Alfonso + confirmación al usuario
2. **Pago exitoso**: Confirmación al cliente + notificación a Alfonso
3. **Pago fallido**: Notificación a Alfonso

## 💳 Configuración de Pagos

### Productos configurados:
- **GMAT Focus**: €150
- **Executive Assessment**: €180
- **IESE & ESADE**: €200

### Flujo de pago:
1. Usuario añade cursos al carrito
2. Procede al checkout con Stripe
3. Pago procesado
4. Webhook recibe confirmación
5. Emails automáticos enviados
6. Alfonso notificado para coordinar clases

## 🎨 Personalización

### Colores principales:
- Primary: Blue (#3b82f6)
- Secondary: Gray (#64748b)
- Success: Green (#10b981)
- Warning: Yellow (#f59e0b)
- Error: Red (#ef4444)

### Fuentes:
- Inter (Google Fonts)
- Georgia (serif)

## 📱 Responsive Design

El sitio está optimizado para:
- **Móvil**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

## 🔍 SEO

### Meta tags implementados:
- Title optimizado con palabras clave
- Description atractiva
- Open Graph para redes sociales
- Twitter Cards
- Canonical URL
- Keywords relevantes

### Estructura semántica:
- Header, nav, main, section, article, footer
- H1-H6 jerarquía correcta
- Alt text en imágenes
- Schema markup (opcional)

## 🚀 Optimización de Rendimiento

- Lazy loading de imágenes
- Minificación de CSS/JS
- CDN de Tailwind CSS
- Optimización de imágenes
- Caching de recursos estáticos

## 🔒 Seguridad

- Variables de entorno para credenciales
- Validación de formularios
- Sanitización de datos
- HTTPS obligatorio
- Headers de seguridad

## 📊 Analytics (Opcional)

Para añadir Google Analytics:
1. Crear cuenta en Google Analytics
2. Añadir el código de tracking en el `<head>` de `index.html`

## 🐛 Troubleshooting

### Problemas comunes:

1. **Emails no se envían**:
   - Verificar credenciales de Gmail
   - Comprobar contraseña de aplicación
   - Revisar logs de Vercel

2. **Pagos no procesan**:
   - Verificar claves de Stripe
   - Comprobar webhook URL
   - Revisar logs de Stripe Dashboard

3. **Sitio no carga**:
   - Verificar deployment en Vercel
   - Comprobar variables de entorno
   - Revisar logs de build

## 📞 Soporte

Para soporte técnico o preguntas:
- Email: alfonso@gmat-expert.com
- Documentación: Este README
- Issues: GitHub repository

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo LICENSE para más detalles.

---

**Desarrollado con ❤️ para Alfonso Rodríguez Mayo** 