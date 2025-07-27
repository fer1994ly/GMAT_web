# Alfonso GMAT - Sitio Web Profesional

Sitio web profesional de Alfonso Rodríguez Mayo para preparación de GMAT, EA, IESE y ESADE.

## 🚀 Características

- **Modular**: Código JavaScript organizado en módulos reutilizables
- **SEO Optimizado**: Meta tags, Open Graph, y estructura semántica
- **Responsive**: Diseño adaptativo para todos los dispositivos
- **Performance**: Optimizado con Vite para carga rápida
- **Carrito de Compras**: Funcionalidad completa de e-commerce
- **Formulario de Contacto**: Integrado con API serverless

## 🛠️ Tecnologías

- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Backend**: Vercel Serverless Functions
- **Email**: Nodemailer
- **Pagos**: Stripe

## 📁 Estructura del Proyecto

```
alfonso_web/
├── src/
│   ├── main.js              # Archivo principal
│   ├── modules/
│   │   ├── cart.js          # Módulo del carrito
│   │   ├── mobile-menu.js   # Módulo del menú móvil
│   │   ├── contact.js       # Módulo de contacto
│   │   └── animations.js    # Módulo de animaciones
│   └── styles/              # Estilos CSS
├── api/                     # Funciones serverless
│   ├── contact.js
│   ├── create-checkout-session.js
│   └── webhook.js
├── public/                  # Assets estáticos
├── index.html              # Página principal
├── success.html            # Página de éxito
├── cancel.html             # Página de cancelación
├── package.json
├── vite.config.js          # Configuración Vite
└── vercel.json             # Configuración Vercel
```

## 🚀 Instalación y Desarrollo

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Instalación
```bash
# Clonar el repositorio
git clone [url-del-repositorio]
cd alfonso_web

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

### Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo (puerto 3000)
npm run build        # Build para producción
npm run preview      # Preview del build
npm run deploy       # Deploy a Vercel
```

## 📦 Módulos JavaScript

### CartModule (`src/modules/cart.js`)
- Gestión del carrito de compras
- Persistencia en sessionStorage
- Integración con Stripe
- Notificaciones

### MobileMenuModule (`src/modules/mobile-menu.js`)
- Menú hamburguesa responsive
- Navegación suave
- Eventos táctiles

### ContactModule (`src/modules/contact.js`)
- Formulario de contacto
- Validación de campos
- Envío de emails

### AnimationModule (`src/modules/animations.js`)
- Lazy loading de imágenes
- Animaciones de scroll
- CSS animations

## 🔧 Configuración

### Variables de Entorno
Crear archivo `.env` basado en `env.example`:

```env
GMAIL_USER=tu-email@gmail.com
GMAIL_APP_PASSWORD=tu-app-password
ALFONSO_EMAIL=alfonso@gmat-expert.com
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### Vercel
El proyecto está configurado para deploy automático en Vercel con:
- Serverless functions para APIs
- Headers de seguridad
- Cache optimizado
- CDN global

## 🎯 SEO

El sitio está optimizado para SEO con:
- Meta tags completos
- Open Graph para redes sociales
- Estructura semántica HTML5
- URLs amigables
- Performance optimizada

## 🚀 Deploy

### Vercel (Recomendado)
```bash
npm run deploy
```

### Manual
```bash
npm run build
# Subir contenido de /dist a tu hosting
```

## 📱 Funcionalidades

### Carrito de Compras
- Añadir/eliminar cursos
- Modificar cantidades
- Cálculo automático de totales
- Integración con Stripe Checkout

### Formulario de Contacto
- Validación en tiempo real
- Envío de emails automático
- Confirmación al usuario
- Notificaciones de estado

### Navegación
- Menú responsive
- Scroll suave
- Navegación por teclado
- Accesibilidad mejorada

## 🔒 Seguridad

- Headers de seguridad configurados
- Validación de formularios
- Sanitización de datos
- HTTPS obligatorio en producción

## 📈 Performance

- Lazy loading de imágenes
- CSS y JS minificados
- Assets optimizados
- Cache headers configurados

## 🤝 Contribución

1. Fork el proyecto
2. Crear rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia ISC.

## 📞 Contacto

Alfonso Rodríguez Mayo - alfonso@gmat-expert.com

---

**Desarrollado con ❤️ para la preparación profesional de GMAT** 