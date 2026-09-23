"use client";

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, QrCode as QrCodeIcon } from 'lucide-react';
import Image from 'next/image';
import { PresentationVideo } from '../components/PresentationVideo';
import QRCode from 'react-qr-code';

// Tipos
type Slide = {
  id: number;
  title: string;
  component: React.ReactNode;
};

// Componente para Placeholder de Video
const VideoPlaceholder = ({ title, filename }: { title: string, filename: string }) => (
  <div className="w-full h-full flex flex-col items-center justify-center bg-black/40 border border-[#3F3F46] rounded-xl relative overflow-hidden group">
    <div className="absolute inset-0 bg-gradient-to-br from-[#7C3AED]/20 to-transparent opacity-50"></div>
    <div className="z-10 text-center p-8">
      <div className="w-16 h-16 bg-[#27272A] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#7C3AED]/50">
        <div className="w-0 h-0 border-t-8 border-b-8 border-l-[14px] border-t-transparent border-b-transparent border-l-[#8B5CF6] ml-1"></div>
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">Sube tu video como:</p>
      <code className="bg-[#171717] px-3 py-1 rounded text-[#8B5CF6] mt-2 inline-block font-mono text-sm border border-[#3F3F46]">
        /public/videos/{filename}
      </code>
    </div>
  </div>
);

// Componente para Placeholder de Imagen
const ImagePlaceholder = ({ title, filename }: { title: string, filename: string }) => (
  <div className="w-full h-full min-h-[200px] flex flex-col items-center justify-center bg-black/20 border-2 border-dashed border-[#3F3F46] rounded-xl relative overflow-hidden">
    <div className="z-10 text-center p-4">
      <div className="w-12 h-12 bg-[#27272A] rounded-lg flex items-center justify-center mx-auto mb-3 border border-[#7C3AED]/30">
        <svg className="w-6 h-6 text-[#8B5CF6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-300 mb-1">{title}</h3>
      <code className="text-xs text-[#8B5CF6] bg-[#171717] px-2 py-1 rounded">/public/fotos/{filename}</code>
    </div>
  </div>
);

export default function Presentation() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Definición de las diapositivas
  const slides: Slide[] = [
    {
      id: 0,
      title: "Portada",
      component: (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-7xl font-bold tracking-tight mb-4">
              <span className="text-white">Back</span>
              <span className="text-[#8B5CF6]">room</span>
            </h1>
            <p className="text-2xl text-gray-400 font-light mb-2">
              Plataforma Web de Gestión Documental y Flujos de Trabajo
            </p>
            <div className="inline-block border border-[#8B5CF6]/50 bg-[#8B5CF6]/10 text-[#8B5CF6] px-3 py-1 rounded-full text-sm font-medium tracking-wide">
              v9.2.0
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-16 pt-16 border-t border-[#3F3F46] w-64 mx-auto"
          >
            <p className="text-sm text-gray-500 uppercase tracking-widest mb-2">Presentadores</p>
            <p className="text-lg text-gray-200">Santiago & Cristian</p>
          </motion.div>
        </div>
      )
    },
    // FASE 2: CONTEXTO
    {
      id: 1,
      title: "Contexto y Objetivo",
      component: (
        <div className="flex flex-col h-full py-8 px-12 lg:px-20 overflow-y-auto">
          <h2 className="text-5xl font-bold mb-6 border-l-8 border-[#8B5CF6] pl-6 text-white shrink-0">1. Contexto y Objetivo</h2>
          <div className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            
            {/* Columna Izquierda: Problema y Contexto */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="depth-2 p-8 lg:p-10 rounded-3xl flex flex-col justify-between">
              <div>
                <h3 className="text-[#8B5CF6] text-3xl font-bold mb-4">El Problema de la Gestión Documental</h3>
                <p className="text-gray-300 text-xl leading-relaxed mb-6">
                  Las instituciones enfrentan una desorganización crítica al manejar altos volúmenes de oficios mediante métodos tradicionales (papel, emails o carpetas locales sin seguridad). Esto genera pérdida de información vital, cuellos de botella en las aprobaciones, falta de trazabilidad y graves riesgos de acceso no autorizado.
                </p>
                <div className="bg-[#171717] p-5 rounded-2xl border border-red-500/30">
                  <p className="text-red-400 text-xl font-medium">Consecuencia diaria: ¿Quién tiene el documento pendiente? ¿Esta es la versión final? ¿Quién y cuándo autorizó este cambio?</p>
                </div>
              </div>
              
              <div className="mt-6 flex items-center justify-between bg-black/40 p-4 rounded-2xl border border-[#3F3F46]">
                <div className="flex items-center gap-6">
                  <div className="bg-white p-3 rounded-xl shadow-lg">
                    <QRCode value="https://backroomcontext.vercel.app/" size={140} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white">Escanea el QR</h4>
                    <p className="text-base text-gray-400">Para ver todo el detalle técnico en la web</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Columna Derecha: Solución, Objetivo y Stakeholders */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="flex flex-col gap-6">
              <div className="depth-2 p-8 lg:p-10 rounded-3xl bg-[#7C3AED]/10 border-[#8B5CF6]/30 flex-grow">
                <h3 className="text-[#8B5CF6] text-3xl font-bold mb-4">La Solución: Backroom</h3>
                <p className="text-gray-200 text-xl leading-relaxed">
                  Backroom es una plataforma web integral tipo SaaS diseñada para erradicar el caos. Centraliza los archivos en una jerarquía estructurada de "Salas", ofreciendo un motor de flujos de trabajo automatizados, firmas de documentos integradas y una matriz de permisos granulares que garantiza eficiencia y seguridad total.
                </p>
              </div>

              <div className="depth-2 p-8 rounded-3xl">
                <h3 className="text-white text-2xl font-bold mb-4">Público Objetivo (Stakeholders)</h3>
                <ul className="space-y-3 text-gray-300 text-xl list-disc pl-6">
                  <li><strong>Empresas e Instituciones:</strong> Alto volumen de flujo documental.</li>
                  <li><strong>Administradores:</strong> Gestión del personal, accesos y seguridad.</li>
                  <li><strong>Usuarios finales:</strong> Empleados que redactan, revisan y aprueban.</li>
                </ul>
              </div>
            </motion.div>

          </div>
        </div>
      )
    },
    {
      id: 2,
      title: "Objetivos y Valor",
      component: (
        <div className="flex flex-col h-full py-8 px-12 lg:px-20 overflow-y-auto">
          <h2 className="text-5xl font-bold mb-6 border-l-8 border-[#8B5CF6] pl-6 text-white shrink-0">Objetivos y Valor</h2>
          <div className="flex-grow flex items-center justify-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#171717] p-10 rounded-3xl border border-[#3f3f46] flex flex-col justify-center shadow-xl">
                <h3 className="text-[#8B5CF6] text-3xl font-bold mb-6">Objetivo General</h3>
                <p className="text-gray-300 text-xl leading-relaxed">Centralizar, asegurar y agilizar el ciclo de vida de los documentos institucionales mediante un sistema web moderno. Buscamos eliminar la dependencia de archivos físicos y correos electrónicos dispersos, garantizando un control de acceso granular y flujos de aprobación totalmente transparentes.</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-[#171717] p-10 rounded-3xl border border-[#3f3f46] shadow-xl">
                <h3 className="text-green-400 text-3xl font-bold mb-8">Métricas e Indicadores (KPIs)</h3>
                <ul className="text-gray-300 text-xl space-y-6">
                  <li className="flex items-start gap-4"><span className="w-3 h-3 mt-2 rounded-full bg-green-400 shrink-0 shadow-[0_0_10px_rgba(74,222,128,0.8)]"></span> <p><strong>Reducción de Tiempo:</strong> De días a minutos en la localización, revisión y aprobación de oficios urgentes.</p></li>
                  <li className="flex items-start gap-4"><span className="w-3 h-3 mt-2 rounded-full bg-green-400 shrink-0 shadow-[0_0_10px_rgba(74,222,128,0.8)]"></span> <p><strong>Ahorro Operativo:</strong> 90% menos uso de papel, insumos de impresión y espacio físico de almacenamiento.</p></li>
                  <li className="flex items-start gap-4"><span className="w-3 h-3 mt-2 rounded-full bg-green-400 shrink-0 shadow-[0_0_10px_rgba(74,222,128,0.8)]"></span> <p><strong>Trazabilidad Absoluta:</strong> 100% de las acciones de los usuarios quedan registradas en el historial inmutable.</p></li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: "Impacto y Alcance",
      component: (
        <div className="flex flex-col h-full py-8 px-12 lg:px-20 overflow-y-auto">
          <h2 className="text-5xl font-bold mb-6 border-l-8 border-[#8B5CF6] pl-6 text-white shrink-0">2. Impacto y Alcance</h2>
          <div className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            
            {/* Columna Izquierda: Beneficios */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="depth-2 p-8 rounded-3xl flex flex-col justify-center border-l-4 border-l-[#8B5CF6]">
              <div className="space-y-8">
                <div>
                  <h3 className="text-white text-2xl font-bold mb-3 flex items-center gap-3">
                    <span className="bg-[#8B5CF6] text-white w-8 h-8 flex items-center justify-center rounded-lg text-lg">1</span> 
                    Reducción de Costos Operativos
                  </h3>
                  <p className="text-gray-300 text-lg leading-relaxed ml-11">
                    Eliminación casi total de gastos en papel, impresiones, mensajería y almacenamiento físico.
                  </p>
                </div>
                <div>
                  <h3 className="text-white text-2xl font-bold mb-3 flex items-center gap-3">
                    <span className="bg-[#8B5CF6] text-white w-8 h-8 flex items-center justify-center rounded-lg text-lg">2</span> 
                    Aumento Exponencial de Productividad
                  </h3>
                  <p className="text-gray-300 text-lg leading-relaxed ml-11">
                    Automatización de las aprobaciones, notificaciones in-app y recuperación instantánea de archivos, ahorrando cientos de horas laborables al mes.
                  </p>
                </div>
                <div>
                  <h3 className="text-white text-2xl font-bold mb-3 flex items-center gap-3">
                    <span className="bg-[#8B5CF6] text-white w-8 h-8 flex items-center justify-center rounded-lg text-lg">3</span> 
                    Seguridad y Rentabilidad (Modelo SaaS)
                  </h3>
                  <p className="text-gray-300 text-lg leading-relaxed ml-11">
                    Trazabilidad total para auditorías. Se comercializa mediante licencias por volumen, permitiendo monetización automatizada.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Columna Derecha: Alcance */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex flex-col gap-4">
              <div className="depth-2 p-6 rounded-3xl border-l-8 border-green-500/70 bg-[#171717] flex-grow">
                <h3 className="text-green-400 text-2xl font-bold mb-4">Completado en el Alcance</h3>
                <ul className="text-gray-300 text-lg space-y-2 list-disc pl-5">
                  <li>Autenticación segura (Email y OAuth2 Google/GitHub).</li>
                  <li>Gestión de Organizaciones, roles fijos y cuentas Demo.</li>
                  <li>Jerarquía de Salas y Subsalas (Límite actual de 3 niveles).</li>
                  <li>Almacenamiento de múltiples formatos (.docx, .mp4, etc).</li>
                  <li>Motor completo de Flujos de Trabajo (Aprobaciones).</li>
                  <li>Firmas de documentos integradas.</li>
                  <li>Matriz de permisos granulares por cada sala.</li>
                  <li>Facturación y suscripciones (Integración con Stripe).</li>
                  <li>Panel de Auditoría e Historial de actividad.</li>
                </ul>
              </div>

              <div className="depth-2 p-6 rounded-3xl border-l-8 border-red-500/70 bg-[#171717]">
                <h3 className="text-red-400 text-2xl font-bold mb-4">Fuera del Alcance (Fases futuras)</h3>
                <ul className="text-gray-400 text-lg space-y-2 list-disc pl-5">
                  <li>Registro con proceso de pago complejo (checkout de 3 pasos).</li>
                  <li>Creación de roles administrativos personalizados a medida.</li>
                  <li>Soporte multi-organización simultáneo para un solo usuario.</li>
                  <li>Integraciones con sistemas contables (ERPs) externos.</li>
                  <li>Aplicaciones móviles nativas (iOS/Android).</li>
                </ul>
              </div>
            </motion.div>

          </div>
        </div>
      )
    },
    {
      id: 4,
      title: "Arquitectura y Decisiones Técnicas",
      component: (
        <div className="flex flex-col h-full py-8 px-12 lg:px-20">
          <h2 className="text-5xl font-bold mb-6 border-l-8 border-[#8B5CF6] pl-6 text-white">Arquitectura y Decisiones Principales</h2>
          <div className="flex-grow flex flex-col justify-center items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
              {/* Frontend */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-[#171717] border border-[#3f3f46] p-8 rounded-3xl flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-[#27272a] rounded-2xl flex items-center justify-center mb-4 text-[#8B5CF6]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Frontend Reactivo</h3>
                <p className="text-gray-400 text-sm mb-2"><strong>Decisión:</strong> Next.js (App Router), React y Tailwind CSS.</p>
                <p className="text-gray-500 text-xs">Separación de Server y Client components para mejorar rendimiento (SSR) y SEO.</p>
              </motion.div>

              {/* Backend / DB */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-[#171717] border border-[#3f3f46] p-8 rounded-3xl flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-[#27272a] rounded-2xl flex items-center justify-center mb-4 text-[#10B981]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">BaaS & PostgreSQL</h3>
                <p className="text-gray-400 text-sm mb-2"><strong>Decisión:</strong> Supabase como backend-as-a-service.</p>
                <p className="text-gray-500 text-xs">Manejo de modelos relacionales, almacenamiento en Buckets S3 y autenticación nativa.</p>
              </motion.div>

              {/* Seguridad */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-[#171717] border border-[#3f3f46] p-8 rounded-3xl flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-[#27272a] rounded-2xl flex items-center justify-center mb-4 text-[#F59E0B]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Seguridad en Capas</h3>
                <p className="text-gray-400 text-sm mb-2"><strong>Decisión:</strong> JWT + Row Level Security (RLS).</p>
                <p className="text-gray-500 text-xs">Middleware en Next.js para rutas, y RLS en Postgres para asegurar que los usuarios solo vean sus datos.</p>
              </motion.div>

              {/* CI/CD */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-[#171717] border border-[#3f3f46] p-8 rounded-3xl flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-[#27272a] rounded-2xl flex items-center justify-center mb-4 text-[#EC4899]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Integración Continua</h3>
                <p className="text-gray-400 text-sm mb-2"><strong>Decisión:</strong> GitHub Actions y Vercel.</p>
                <p className="text-gray-500 text-xs">Protección de rama main. Despliegues inmutables automáticos con rollback garantizado.</p>
              </motion.div>
            </div>
          </div>
        </div>
      )
    },
      // FASE INTERMEDIA: USUARIOS Y MODELOS DE DATOS
      {
        id: 5,
        title: "Usuarios y Procesos",
        component: (
          <div className="flex flex-col h-full py-8 px-12 lg:px-20 overflow-y-auto">
            <h2 className="text-5xl font-bold mb-6 border-l-8 border-[#8B5CF6] pl-6 text-white shrink-0">Usuarios y Roles</h2>
            <div className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="depth-2 p-8 lg:p-10 rounded-3xl flex flex-col justify-center">
                <h3 className="text-[#8B5CF6] text-3xl font-bold mb-6">Matriz de Roles</h3>
                <ul className="space-y-5 text-gray-300 text-lg">
                  <li><strong className="text-white text-xl">Propietario (Owner):</strong> Control total de la organización, facturación y suscripciones.</li>
                  <li><strong className="text-white text-xl">Administrador:</strong> Gestión de salas, asignación de permisos e invitaciones de equipo.</li>
                  <li><strong className="text-white text-xl">Miembro:</strong> Acceso restringido a salas asignadas y participación en flujos.</li>
                  <li><strong className="text-white text-xl">Superadmin:</strong> Gestión global de la plataforma SaaS Backroom.</li>
                  <li><strong className="text-white text-xl">Demo:</strong> Usuario sin organización que prueba la plataforma bajo límites estrictos.</li>
                </ul>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="depth-2 p-8 lg:p-10 rounded-3xl bg-[#7C3AED]/10 border-[#8B5CF6]/30 flex flex-col justify-center">
                <h3 className="text-[#8B5CF6] text-3xl font-bold mb-6">Procesos Críticos</h3>
                <div className="space-y-6">
                  <div className="bg-[#171717] p-5 rounded-2xl border border-[#3F3F46]">
                    <h4 className="text-xl font-bold text-white mb-2">Motor de Aprobaciones</h4>
                    <p className="text-gray-300 text-base">Calcula turnos (lineales o paralelos) mediante ordenamiento topológico (algoritmo de Kahn). Bloquea la interacción hasta que sea el turno exacto del usuario.</p>
                  </div>
                  <div className="bg-[#171717] p-5 rounded-2xl border border-[#3F3F46]">
                    <h4 className="text-xl font-bold text-white mb-2">Firma Digital Criptográfica (PKI)</h4>
                    <p className="text-gray-300 text-base">Firma matemática del PDF usando el certificado `.p12` de la organización. Utiliza la contraseña de inicio de sesión como factor de validación local.</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )
      },
      {
        id: 6,
        title: "Modelo de Datos e Integridad",
        component: (
          <div className="flex flex-col h-full py-8 px-12 lg:px-20 overflow-y-auto">
            <h2 className="text-5xl font-bold mb-6 border-l-8 border-green-500 pl-6 text-white shrink-0">Modelo de Datos e Integridad</h2>
            <div className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="depth-2 p-8 rounded-3xl flex flex-col justify-center border-l-4 border-l-green-500/70">
                <h3 className="text-white text-3xl font-bold mb-6">Modelos Principales</h3>
                <ul className="space-y-5 text-gray-300 text-lg">
                  <li><strong className="text-green-400">usuarios / auth:</strong> Identidad (Email, Google, GitHub) unificada bajo perfiles.</li>
                  <li><strong className="text-green-400">organizations / backrooms:</strong> Estructura central del Multitenant (aislamiento de inquilinos).</li>
                  <li><strong className="text-green-400">salas / recursos:</strong> Árbol jerárquico recursivo de almacenamiento y archivos.</li>
                  <li><strong className="text-green-400">document_workflows:</strong> Tablas relacionales que mapean grafos (nodos y aristas) para el flujo de trabajo.</li>
                </ul>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="depth-2 p-8 rounded-3xl bg-[#171717] flex flex-col justify-center border-l-4 border-l-green-500/70">
                <h3 className="text-green-400 text-3xl font-bold mb-6">Reglas Estrictas de Integridad</h3>
                <ul className="space-y-5 text-gray-300 text-lg">
                  <li><strong className="text-white">Row Level Security (RLS):</strong> Políticas en PostgreSQL. El tenant A jamás puede consultar la base de datos del tenant B a nivel de motor SQL.</li>
                  <li><strong className="text-white">Borrado en Cascada (Cascade Delete):</strong> Relaciones foráneas. Borrar una organización purga de inmediato sus salas, documentos, firmas y flujos para evitar datos huérfanos.</li>
                  <li><strong className="text-white">Storage Privado:</strong> Los buckets en Supabase ignoran accesos públicos. Exigen token de sesión activo y membresía validada en la organización propietaria.</li>
                </ul>
              </motion.div>
            </div>
          </div>
        )
      },

    {
      id: 7,
      title: "Seguridad y Controles Aplicados",
      component: (
        <div className="flex flex-col h-full py-8 px-12 lg:px-20 overflow-y-auto">
          <h2 className="text-5xl font-bold mb-8 border-l-8 border-[#8B5CF6] pl-6 text-white shrink-0">Seguridad y Control de Amenazas</h2>
          
          <div className="flex-grow flex items-center justify-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl">
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-red-900/10 border border-red-500/30 p-10 rounded-3xl flex flex-col justify-between shadow-xl">
                <div>
                  <h3 className="text-red-400 text-3xl font-bold mb-6 flex items-center gap-3">
                    <span className="text-3xl">⚠️</span> Amenaza: Acceso a Datos de Terceros
                  </h3>
                  <p className="text-gray-300 text-xl mb-8 leading-relaxed">Existe el riesgo latente de que un usuario malintencionado intente manipular la URL o la API para interceptar y leer documentos confidenciales de otras organizaciones o salas a las que no pertenece.</p>
                </div>
                <div className="bg-[#171717] p-6 rounded-2xl border border-[#3f3f46]">
                  <h4 className="text-green-400 font-bold text-xl mb-3 flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg> Control: RLS (PostgreSQL)</h4>
                  <p className="text-gray-400 text-base leading-relaxed">Implementamos Row Level Security (RLS) directamente a nivel de base de datos. Incluso si la capa de la API fuera vulnerada, la base de datos rechaza automáticamente cualquier consulta si el UUID del token JWT no coincide exactamente con el propietario del registro.</p>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="bg-red-900/10 border border-red-500/30 p-10 rounded-3xl flex flex-col justify-between shadow-xl">
                <div>
                  <h3 className="text-red-400 text-3xl font-bold mb-6 flex items-center gap-3">
                    <span className="text-3xl">⚠️</span> Amenaza: Escalada de Privilegios
                  </h3>
                  <p className="text-gray-300 text-xl mb-8 leading-relaxed">Usuarios no autenticados o con roles básicos podrían intentar forzar su acceso a rutas protegidas (como el Dashboard de administración) para ejecutar acciones destructivas.</p>
                </div>
                <div className="bg-[#171717] p-6 rounded-2xl border border-[#3f3f46]">
                  <h4 className="text-green-400 font-bold text-xl mb-3 flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg> Control: Edge Middleware</h4>
                  <p className="text-gray-400 text-base leading-relaxed">Validación estricta de cookies HTTP-Only y tokens JWT en el Edge (antes de que la petición llegue al servidor principal). Esto permite un bloqueo y redirección instantáneos, previniendo fugas de información en la interfaz.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      )
    },
    // FASE 3: VIDEOS DE LA APP
    {
      id: 8,
      title: "Landing Page",
      component: (
        <div className="flex flex-col h-full p-8 lg:p-12">
          <h2 className="text-4xl font-bold mb-8 text-gray-200 border-l-8 border-[#8B5CF6] pl-6">Demostración: Landing Page</h2>
          <div className="flex-grow rounded-2xl overflow-hidden shadow-2xl shadow-[#7C3AED]/10">
            <PresentationVideo videos={["landingGrabacion.mp4"]} loop />
          </div>
        </div>
      )
    },
    {
      id: 9,
      title: "Autenticación",
      component: (
        <div className="flex flex-col h-full p-8 lg:p-12">
          <h2 className="text-4xl font-bold mb-8 text-gray-200 border-l-8 border-[#8B5CF6] pl-6">Demostración: Autenticación</h2>
          <div className="flex-grow rounded-2xl overflow-hidden shadow-2xl shadow-[#7C3AED]/10">
            <PresentationVideo videos={["GrabacionLogin.mp4", "createCountGrabacion.mp4", "GrabacionRecovery.mp4"]} loop />
          </div>
        </div>
      )
    },
    {
      id: 10,
      title: "Dashboard",
      component: (
        <div className="flex flex-col h-full p-8 lg:p-12">
          <h2 className="text-4xl font-bold mb-8 text-gray-200 border-l-8 border-[#8B5CF6] pl-6">Demostración: Primer Vistazo</h2>
          <div className="flex-grow rounded-2xl overflow-hidden shadow-2xl shadow-[#7C3AED]/10">
            <PresentationVideo videos={["GrabacionSoloDashboardVistaInicial.mp4"]} loop />
          </div>
        </div>
      )
    },
    {
      id: 11,
      title: "Gestión Documental",
      component: (
        <div className="flex flex-col h-full p-8 lg:p-12">
          <h2 className="text-4xl font-bold mb-8 text-gray-200 border-l-8 border-[#8B5CF6] pl-6">Demostración: Gestión Documental</h2>
          <div className="flex-grow rounded-2xl overflow-hidden shadow-2xl shadow-[#7C3AED]/10">
            <PresentationVideo videos={["grabacion_jerarquia_allmacenamiento_historial.mp4"]} loop />
          </div>
        </div>
      )
    },
    {
      id: 12,
      title: "Estructura Interna",
      component: (
        <div className="flex flex-col h-full p-8 lg:p-12">
          <h2 className="text-4xl font-bold mb-8 text-gray-200 border-l-8 border-[#8B5CF6] pl-6">Demostración: Estructura Interna</h2>
          <div className="flex-grow rounded-2xl overflow-hidden shadow-2xl shadow-[#7C3AED]/10">
            <PresentationVideo videos={["grabacionBackroomSubsalasMapaSubirPermisos.mp4"]} loop />
          </div>
        </div>
      )
    },
    {
      id: 13,
      title: "Flujo Completo",
      component: (
        <div className="flex flex-col h-full p-8 lg:p-12">
          <h2 className="text-4xl font-bold mb-8 text-gray-200 border-l-8 border-[#8B5CF6] pl-6">Demostración: Flujo de Trabajo Completo</h2>
          <div className="flex-grow rounded-2xl overflow-hidden shadow-2xl shadow-[#7C3AED]/10">
            <PresentationVideo videos={["GrabacionFlujoNormal.mp4"]} loop />
          </div>
        </div>
      )
    },
    {
      id: 14,
      title: "Resultados y Cierre",
      component: (
        <div className="flex flex-col h-full py-8 px-12 lg:px-20 overflow-y-auto">
          <h2 className="text-5xl font-bold mb-8 border-l-8 border-[#8B5CF6] pl-6 text-white shrink-0">Resultados, Limitaciones y Futuro</h2>
          
          <div className="flex-grow flex items-center justify-center">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full max-w-7xl">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#171717] p-10 rounded-3xl border border-[#3f3f46] shadow-xl">
                <h3 className="text-[#10B981] text-3xl font-bold mb-6">Éxitos e Indicadores</h3>
                <ul className="text-gray-300 text-lg space-y-6">
                  <li className="flex items-start gap-4"><span className="w-2 h-2 mt-2.5 rounded-full bg-[#10B981] shrink-0"></span> <p><strong>Despliegue Ininterrumpido:</strong> Pipeline CI/CD estable mediante GitHub Actions con cero caídas en producción.</p></li>
                  <li className="flex items-start gap-4"><span className="w-2 h-2 mt-2.5 rounded-full bg-[#10B981] shrink-0"></span> <p><strong>Seguridad Comprobada:</strong> Flujos de aprobación y autenticación verificados con roles estrictos.</p></li>
                  <li className="flex items-start gap-4"><span className="w-2 h-2 mt-2.5 rounded-full bg-[#10B981] shrink-0"></span> <p><strong>UX Optimizada:</strong> Carga de documentos e interfaz fluida gracias al procesamiento en el Edge.</p></li>
                </ul>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-[#171717] p-10 rounded-3xl border border-[#3f3f46] shadow-xl">
                <h3 className="text-[#F59E0B] text-3xl font-bold mb-6">Deuda Técnica</h3>
                <ul className="text-gray-300 text-lg space-y-6">
                  <li className="flex items-start gap-4"><span className="w-2 h-2 mt-2.5 rounded-full bg-[#F59E0B] shrink-0"></span> <p><strong>Pruebas E2E Limitadas:</strong> La cobertura de test automatizados actuales es baja; se planea integrar Cypress para flujos completos.</p></li>
                  <li className="flex items-start gap-4"><span className="w-2 h-2 mt-2.5 rounded-full bg-[#F59E0B] shrink-0"></span> <p><strong>Refactorización:</strong> Falta desacoplar el código de algunos componentes monolíticos del Dashboard principal para mejorar su mantenibilidad.</p></li>
                </ul>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-[#171717] p-10 rounded-3xl border border-[#3f3f46] shadow-xl">
                <h3 className="text-[#8B5CF6] text-3xl font-bold mb-6">Trabajo Futuro</h3>
                <ul className="text-gray-300 text-lg space-y-6">
                  <li className="flex items-start gap-4"><span className="w-2 h-2 mt-2.5 rounded-full bg-[#8B5CF6] shrink-0"></span> <p><strong>Arquitectura Multi-Tenant:</strong> Escalar la base de datos para que múltiples organizaciones independientes compartan la infraestructura del sistema de forma segura.</p></li>
                  <li className="flex items-start gap-4"><span className="w-2 h-2 mt-2.5 rounded-full bg-[#8B5CF6] shrink-0"></span> <p><strong>Firma Electrónica Real:</strong> Conexión con APIs de autoridades certificadoras oficiales para otorgar validez legal a los documentos firmados.</p></li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 15,
      title: "Cierre / Landing Page",
      component: (
        <div className="w-full h-full relative flex items-center justify-center">
          <div className="absolute inset-0 z-0">
            <PresentationVideo videos={["scene-1.mp4", "scene-2.mp4", "scene-3.mp4"]} loop={false} />
          </div>
        </div>
      )
    }
  ];

  const nextSlide = useCallback(() => {
    if (currentSlide < slides.length - 1) setCurrentSlide(prev => prev + 1);
  }, [currentSlide, slides.length]);

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) setCurrentSlide(prev => prev - 1);
  }, [currentSlide]);

  // Manejo de teclas
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  return (
    <main className="h-screen w-screen bg-[#171717] text-[#FAFAFA] flex flex-col overflow-hidden selection:bg-[#7C3AED] selection:text-white relative">
      
      {/* Contenedor Principal de la Diapositiva */}
      <div className="flex-grow relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            {slides[currentSlide].component}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controles y Progreso */}
      <div className="h-16 border-t border-[#3F3F46] flex items-center justify-between px-6 bg-[#171717] z-50">
        <div className="text-sm text-gray-500 font-mono">
          Backroom_SENA_v1
        </div>
        
        {/* Barra de progreso visual */}
        <div className="flex space-x-2">
          {slides.map((s, i) => (
            <div 
              key={s.id} 
              className={`h-1.5 rounded-full transition-all duration-300 ${i === currentSlide ? 'w-8 bg-[#8B5CF6]' : 'w-2 bg-[#3F3F46]'}`}
            />
          ))}
        </div>

        <div className="flex items-center space-x-4 text-sm text-gray-400">
          <span className="mr-4">{currentSlide + 1} / {slides.length}</span>
          <button 
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="p-2 hover:bg-[#27272A] rounded-full transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className="p-2 hover:bg-[#27272A] rounded-full transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </main>
  );
}
