
'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Dynamically import translation files
const resources = {
  en: {
    translation: {
      "profile": {
        "breadcrumb": "Edit Profile",
        "title": "Account Settings",
        "description": "Manage your profile details and security settings.",
        "generalInfoTab": "General Information",
        "gameSettingsTab": "Game Settings",
        "username": "Username",
        "fullName": "Full Name",
        "role": "Role",
        "memberSince": "Member since",
        "preferredLanguage": "Preferred Language",
        "timezone": "Timezone",
        "phone": "Phone",
        "security": {
          "title": "Security",
          "twoFactor": {
            "label": "Two-factor authentication",
            "description": "Secure your account with an extra verification step."
          }
        },
        "changePassword": {
          "title": "Change Password",
          "oldPassword": "Old Password",
          "newPassword": "New Password",
          "confirmPassword": "Confirm Password"
        },
        "saveChanges": "Save Changes",
        "saving": "Saving..."
      },
      "languages": {
        "en": "English",
        "es": "Spanish"
      }
    }
  },
  es: {
    translation: {
      "profile": {
        "breadcrumb": "Editar Perfil",
        "title": "Configuración de la cuenta",
        "description": "Gestiona los detalles de tu perfil y la configuración de seguridad.",
        "generalInfoTab": "Información General",
        "gameSettingsTab": "Configuración del juego",
        "username": "Nombre de usuario",
        "fullName": "Nombre Completo",
        "role": "Rol",
        "memberSince": "Miembro desde",
        "preferredLanguage": "Idioma preferido",
        "timezone": "Zona horaria",
        "phone": "Teléfono",
        "security": {
          "title": "Seguridad",
          "twoFactor": {
            "label": "Autenticación de dos factores",
            "description": "Asegura tu cuenta con un paso de verificación adicional."
          }
        },
        "changePassword": {
          "title": "Cambiar contraseña",
          "oldPassword": "Contraseña anterior",
          "newPassword": "Contraseña nueva",
          "confirmPassword": "Confirmar contraseña"
        },
        "saveChanges": "Guardar Cambios",
        "saving": "Guardando..."
      },
      "languages": {
        "en": "Inglés",
        "es": "Español"
      }
    }
  }
};


i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false, // React already does escaping
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
