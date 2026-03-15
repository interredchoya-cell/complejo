/**
 * App.jsx — Complejo Giovanni SaaS Platform
 * Multi-tenant routing: /:negocioId/*
 * FASE 7: Internal Apps by Role
 */
import React from 'react';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';

// Context
import { AuthProvider } from './context/AuthContext';
import { ConfigProvider } from './core/services/ConfigContext';

// Layouts
import ClientLayout from './layouts/ClientLayout';
import AdminLayout from './layouts/AdminLayout';
import AppLayout from './layouts/AppLayout';

// Guards
import AdminGuard from './components/AdminGuard';
import RoleGuard from './core/guards/RoleGuard';

// Core guards
import ModuleGuard from './core/guards/ModuleGuard';

// SuperAdmin Module
import { 
    SuperAdminAuthProvider, 
    SuperAdminLayout, 
    SuperAdminGuard 
} from './modules/superadmin';

// Pages (directly imported for stability)
import Home from './modules/core/pages/Home';
import LoginPage from './modules/admin/pages/LoginPage';
import Dashboard from './modules/admin/pages/Dashboard';
import PantallasPage from './modules/admin/pages/PantallasPage';
import AnalyticsPage from './modules/admin/pages/AnalyticsPage';
import PagosPage from './modules/admin/pages/PagosPage';
import MissingPage from './components/MissingPage';

// AI Analytics (FASE 12)
import AIAnalyticsDashboard from './modules/analytics_ai/pages/AIAnalyticsDashboard';

// Internal Apps (FASE 7)
import BarDashboard from './modules/bar/pages/BarDashboard';
import CocinaApp from './apps/cocina/pages/CocinaApp';
import ClienteApp from './apps/cliente/pages/ClienteApp';
import EmpleadoApp from './apps/empleado/pages/EmpleadoApp';

// TV Apps (FASE 8)
import TVLayout from './apps/tv/layouts/TVLayout';
import TVTurnos from './apps/tv/pages/TVTurnos';
import TVBar from './apps/tv/pages/TVBar';
import TVPromos from './apps/tv/pages/TVPromos';
import TVRanking from './apps/tv/pages/TVRanking';

// PWA App (FASE 10 / 13)
import PWALayout from './apps/pwa/layouts/PWALayout';
import ClientHome from './modules/client_app/pages/ClientHome';
import ClientReservations from './modules/client_app/pages/ClientReservations';
import ClientFieldDetail from './modules/client_app/pages/ClientFieldDetail';
import ClientProfile from './modules/client_app/pages/ClientProfile';
import ReservationSuccess from './modules/client_app/pages/ReservationSuccess';

// Bar Module (FASE 7 - Refined)
import { CartProvider } from './modules/bar/hooks/useCart.jsx';
import BarMenu from './modules/bar/pages/BarMenu';
import CartPage from './modules/bar/pages/CartPage';
import OrderConfirmation from './modules/bar/pages/OrderConfirmation';
import KitchenBarScreen from './modules/bar/pages/KitchenBarScreen';
import KitchenOrderHistory from './modules/bar/pages/KitchenOrderHistory';

// Employee App (FASE 14)
import ReceptionDashboard from './modules/employee_app/pages/ReceptionDashboard';
import EmployeeBarDashboard from './modules/employee_app/pages/BarDashboard';
import KitchenDashboard from './modules/employee_app/pages/KitchenDashboard';
import EmployeeProfile from './modules/employee_app/pages/EmployeeProfile';

// Tournaments (FASE 15)
import TournamentsDashboard from './modules/tournaments/pages/TournamentsDashboard';
import TournamentDetail from './modules/tournaments/pages/TournamentDetail';
import RegisterTeam from './modules/tournaments/pages/RegisterTeam';
import ClientTournaments from './modules/tournaments/pages/ClientTournaments';

// Access Control (FASE 16)
import AccessDashboard from './modules/access_control/pages/AccessDashboard';
import QRCheckInPage from './modules/access_control/pages/QRCheckInPage';

// Smart Center Module (FASE 18)
import SmartCenterDashboard from './modules/smart_center/pages/SmartCenterDashboard';
import DevicesManager from './modules/smart_center/pages/DevicesManager';

// Finance Module (FASE 19)
import FinanceDashboard from './modules/finance/pages/FinanceDashboard';
import ExpensesManager from './modules/finance/pages/ExpensesManager';
import InvoicesManager from './modules/finance/pages/InvoicesManager';

// Empleados Module
import { EmpleadosDashboard, ListaEmpleados, EmpleadoDetalle } from './modules/empleados';

// Inventario Module
import { InventarioDashboard, InventarioBar, InventarioCocina, InventarioAlmacen } from './modules/inventario';

// Caja Module
import { CajaDashboard, CajaMovimientos, CajaHistorial } from './modules/caja';

// SuperAdmin Pages
import SuperAdminDashboard from './modules/superadmin/pages/SuperAdminDashboard';
import NegociosPage from './modules/superadmin/pages/NegociosPage';
import PlanesPage from './modules/superadmin/pages/PlanesPage';
import ModulosPage from './modules/superadmin/pages/ModulosPage';
import SistemaPage from './modules/superadmin/pages/SistemaPage';
import StatsPage from './modules/superadmin/pages/StatsPage';
import SuscripcionesPage from './modules/superadmin/pages/SuscripcionesPage';
import SuperAdminLogin from './modules/superadmin/pages/SuperAdminLogin';

// Marketplace Module (FASE 20)
import MarketplaceHome from './modules/marketplace/pages/MarketplaceHome';
import ModuleDetail from './modules/marketplace/pages/ModuleDetail';
import InstalledModules from './modules/marketplace/pages/InstalledModules';
import ApiManagement from './modules/marketplace/pages/ApiManagement';

// Multitenant Module (FASE 17)
import SuperAdminTenants from './modules/multitenant/pages/SuperAdminTenants';
import TenantDetail from './modules/multitenant/pages/TenantDetail';
import CreateTenant from './modules/multitenant/pages/CreateTenant';

// Delivery Module (FASE 21)
import DeliveryRoutes from './modules/delivery/routes/deliveryRoutes';

// Mozos Module (FASE 22)
import MozoRoutes from './modules/mozos/routes/mozoRoutes';

// Landing page (when no negocioId is specified)
function LandingRedirect() {
    return <Navigate to="/giovanni" replace />;
}

/**
 * BusinessApp — Handles all routes under /:negocioId
 * FASE 7: Role-based internal apps
 */
function BusinessApp() {
    return (
        <ConfigProvider>
            <AuthProvider>
                <CartProvider>
                    <Routes>
                        {/* ── CLIENT AREA (public) ── */}
                        <Route element={<ClientLayout />}>
                            <Route index element={<Home />} />
                            <Route path="home" element={<Home />} />
                            <Route path="reservas" element={<ClientReservations />} />
                            <Route path="menu" element={<BarMenu />} />
                            <Route path="torneos" element={<ClientTournaments />} />
                            <Route path="jugadores" element={<MissingPage name="Ranking de Jugadores" />} />
                            <Route path="membresia" element={<MissingPage name="Membresía" />} />
                            <Route path="galeria" element={<MissingPage name="Galería" />} />
                            <Route path="perfil" element={<MissingPage name="Mi Perfil" />} />
                            
                            {/* Bar Module Routes (Requested URLs) */}
                            <Route path="carrito" element={<CartPage />} />
                            <Route path="pedido-confirmado" element={<OrderConfirmation />} />
                        </Route>

                        {/* ── ADMIN AREA (admin + encargado) ── */}
                        <Route element={<AdminGuard><AdminLayout /></AdminGuard>}>
                            <Route path="dashboard" element={<Dashboard />} />
                            <Route path="analytics" element={<AnalyticsPage />} />
                            <Route path="analytics-ai" element={<AIAnalyticsDashboard />} />
                            <Route path="torneos" element={<TournamentsDashboard />} />
                            <Route path="torneos/:tournamentId" element={<TournamentDetail />} />
                            <Route path="torneos/equipos" element={<RegisterTeam />} />
                            <Route path="accesos" element={<AccessDashboard />} />
                            <Route path="admin" element={<Dashboard />} />
                            <Route path="pantallas" element={<PantallasPage />} />
                            
                            {/* Marketplace Routes (FASE 20 - Refined) */}
                            <Route path="marketplace" element={<MarketplaceHome />} />
                            <Route path="marketplace/installed" element={<InstalledModules />} />
                            <Route path="marketplace/module/:moduleId" element={<ModuleDetail />} />
                            <Route path="marketplace/api" element={<ApiManagement />} />
                            
                            <Route path="caja" element={<CajaDashboard />} />
                            <Route path="caja/movimientos" element={<CajaMovimientos />} />
                            <Route path="caja/historial" element={<CajaHistorial />} />
                            
                            {/* Inventario Management (Admin) */}
                            <Route path="inventario">
                                <Route index element={<InventarioDashboard />} />
                                <Route path="bar" element={<InventarioBar />} />
                                <Route path="cocina" element={<InventarioCocina />} />
                                <Route path="almacen" element={<InventarioAlmacen />} />
                                <Route path="limpieza" element={<MissingPage name="Inventario Limpieza" />} />
                                <Route path="otros" element={<MissingPage name="Inventario Otros" />} />
                            </Route>
                            
                            {/* Empleados Management (Admin) */}
                            <Route path="empleados" element={<EmpleadosDashboard />} />
                            <Route path="empleados/lista" element={<ListaEmpleados />} />
                            <Route path="empleados/:empleadoId" element={<EmpleadoDetalle />} />
                            
                            <Route path="reportes" element={<MissingPage name="Reportes" />} />
                            <Route path="turnos" element={<MissingPage name="Gestión de Turnos" />} />
                            <Route path="editor-home" element={<MissingPage name="Editor de Home" />} />
                            
                            {/* Smart Center / IoT Routes */}
                            <Route path="smart-center" element={<SmartCenterDashboard />} />
                            <Route path="smart-center/devices" element={<DevicesManager />} />
                            
                            {/* Finance / Contabilidad Routes */}
                            <Route path="finanzas" element={<FinanceDashboard />} />
                            <Route path="finanzas/gastos" element={<ExpensesManager />} />
                            <Route path="finanzas/facturas" element={<InvoicesManager />} />
                        </Route>

                        {/* ── INTERNAL APPS (FASE 7 — Role-specific) ── */}
                        <Route path="bar" element={
                            <RoleGuard allowedRoles={['admin', 'encargado', 'mozo']}>
                                <BarDashboard />
                            </RoleGuard>
                        } />

                        <Route path="cocina" element={
                            <RoleGuard allowedRoles={['admin', 'encargado', 'cocina']}>
                                <CocinaApp />
                            </RoleGuard>
                        } />

                        <Route path="empleado" element={
                            <RoleGuard allowedRoles={['admin', 'encargado', 'empleado']}>
                                <EmpleadoApp />
                            </RoleGuard>
                        } />

                        {/* ── TV / MONITORES (FASE 8) ── */}
                        <Route path="pantalla" element={<TVLayout />}>
                            <Route path="turnos" element={<TVTurnos />} />
                            <Route path="bar" element={<KitchenBarScreen />} />
                            <Route path="bar/historial" element={<KitchenOrderHistory />} />
                            <Route path="promos" element={<TVPromos />} />
                            <Route path="ranking" element={<TVRanking />} />
                        </Route>

                        {/* ── MOBILE PWA (FASE 10 / 13) ── */}
                        <Route path="app/mozos/*" element={<MozoRoutes />} />
                        <Route path="app" element={<PWALayout />}>
                            <Route index element={<ClientHome />} />
                            <Route path="reservar/:fieldId" element={<ClientFieldDetail />} />
                            <Route path="reserva-confirmada" element={<ReservationSuccess />} />
                            <Route path="reservas" element={<ClientReservations />} />
                            <Route path="menu" element={<BarMenu />} />
                            <Route path="bar" element={<Navigate to="menu" replace />} />
                            <Route path="carrito" element={<CartPage />} />
                            <Route path="pedido-confirmado" element={<OrderConfirmation />} />
                            <Route path="torneos" element={<ClientTournaments />} />
                            <Route path="perfil" element={<ClientProfile />} />
                            
                            {/* Delivery App Routes */}
                            <Route path="delivery/*" element={<DeliveryRoutes />} />
                        </Route>

                        {/* ── EMPLOYEE INTERNAL (FASE 14) ── */}
                        <Route path="staff">
                            <Route index element={<ReceptionDashboard />} />
                            <Route path="dashboard" element={<ReceptionDashboard />} />
                            <Route path="recepcion" element={<ReceptionDashboard />} />
                            <Route path="bar" element={<EmployeeBarDashboard />} />
                            <Route path="cocina" element={<KitchenDashboard />} />
                            <Route path="checkin" element={<QRCheckInPage />} />
                            <Route path="perfil" element={<EmployeeProfile />} />
                        </Route>

                        {/* ── NO LAYOUT (login) ── */}
                        <Route path="login" element={<LoginPage />} />

                        {/* Fallback within business context */}
                        <Route path="*" element={<Navigate to="" replace />} />
                    </Routes>
                </CartProvider>
            </AuthProvider>
        </ConfigProvider>
    );
}

/**
 * SuperAdminApp — Handles the SaaS master panel.
 * Independent from business IDs.
 */
function SuperAdminApp() {
    return (
        <SuperAdminAuthProvider>
            <Routes>
                <Route path="login" element={<SuperAdminLogin />} />
                <Route element={<SuperAdminGuard><SuperAdminLayout /></SuperAdminGuard>}>
                    <Route index element={<SuperAdminDashboard />} />
                    <Route path="negocios" element={<NegociosPage />} />
                    <Route path="planes" element={<PlanesPage />} />
                    <Route path="modulos" element={<ModulosPage />} />
                    <Route path="sistema" element={<SistemaPage />} />
                    <Route path="stats" element={<StatsPage />} />
                    <Route path="suscripciones" element={<SuscripcionesPage />} />
                    
                    {/* Multitenant / SaaS Routes */}
                    <Route path="complejos" element={<SuperAdminTenants />} />
                    <Route path="complejo/:id" element={<TenantDetail />} />
                    <Route path="crear-complejo" element={<CreateTenant />} />
                </Route>
                <Route path="*" element={<Navigate to="" replace />} />
            </Routes>
        </SuperAdminAuthProvider>
    );
}

export default function App() {
    return (
        <Routes>
            {/* Root → redirect to default business */}
            <Route path="/" element={<LandingRedirect />} />

            {/* SuperAdmin Panel */}
            <Route path="/superadmin/*" element={<SuperAdminApp />} />

            {/* Multi-tenant: all business routes live under /:negocioId/* */}
            <Route path="/:negocioId/*" element={<BusinessApp />} />

            {/* Global fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}
