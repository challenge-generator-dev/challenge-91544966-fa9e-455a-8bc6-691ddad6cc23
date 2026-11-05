import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAccessibility } from '@shared/hooks/useAccessibility';

export interface NavItem {
  label: string;
  path: string;
  icon?: React.ReactNode;
  children?: NavItem[];
  ariaLabel?: string;
}

interface MainNavProps {
  items: NavItem[];
  userName?: string;
  onLogout?: () => void;
}

export const MainNav: React.FC<MainNavProps> = ({
  items,
  userName,
  onLogout,
}) => {
  const [expandedMenus, setExpandedMenus] = useState<Set<string>>(new Set());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const { announceToScreenReader, preferences } = useAccessibility();
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const toggleMenu = (menuId: string) => {
    setExpandedMenus((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(menuId)) {
        newSet.delete(menuId);
        announceToScreenReader(`Menú ${menuId} cerrado`);
      } else {
        newSet.add(menuId);
        announceToScreenReader(`Menú ${menuId} abierto`);
      }
      return newSet;
    });
  };

  const handleKeyDown = (
    e: React.KeyboardEvent,
    item: NavItem,
    index: number,
    parentId?: string
  ) => {
    const menuItems = parentId
      ? items.find((i) => i.path === parentId)?.children || []
      : items;
    const totalItems = menuItems.length;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        const nextIndex = (index + 1) % totalItems;
        const nextItem = document.getElementById(`nav-item-${menuItems[nextIndex]?.path}`);
        nextItem?.focus();
        break;
      case 'ArrowUp':
        e.preventDefault();
        const prevIndex = (index - 1 + totalItems) % totalItems;
        const prevItem = document.getElementById(`nav-item-${menuItems[prevIndex]?.path}`);
        prevItem?.focus();
        break;
      case 'Escape':
        if (parentId) {
          setExpandedMenus((prev) => {
            const newSet = new Set(prev);
            newSet.delete(parentId);
            return newSet;
          });
          triggerRef.current?.focus();
          announceToScreenReader('Menú cerrado');
        }
        break;
      case 'Enter':
      case ' ':
        if (item.children && item.children.length > 0) {
          e.preventDefault();
          toggleMenu(item.path);
        }
        break;
    }
  };

  const handleMobileToggle = () => {
    setMobileMenuOpen((prev) => {
      const newState = !prev;
      if (newState) {
        announceToScreenReader('Menú móvil abierto');
      } else {
        announceToScreenReader('Menú móvil cerrado');
      }
      return newState;
    });
  };

  const handleDropdownToggle = (itemPath: string) => {
    setActiveDropdown((prev) => {
      const newState = prev === itemPath ? null : itemPath;
      if (newState) {
        announceToScreenReader(`Submenú de ${items.find((i) => i.path === itemPath)?.label} abierto`);
      } else {
        announceToScreenReader('Submenú cerrado');
      }
      return newState;
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setExpandedMenus(new Set());
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setExpandedMenus(new Set());
    setActiveDropdown(null);
  }, [location.pathname]);

  const isActive = (path: string): boolean => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const renderNavItem = (item: NavItem, index: number, parentId?: string): React.ReactNode => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedMenus.has(item.path);
    const isCurrentDropdownActive = activeDropdown === item.path;

    return (
      <li
        key={item.path}
        className={`nav-item ${hasChildren ? 'has-children' : ''} ${isActive(item.path) ? 'active' : ''}`}
        role="none"
      >
        {hasChildren ? (
          <>
            <button
              id={`nav-item-${item.path}`}
              className="nav-link nav-dropdown-trigger"
              aria-haspopup="true"
              aria-expanded={isExpanded}
              aria-controls={`nav-dropdown-${item.path}`}
              aria-label={item.ariaLabel || `${item.label}, tiene submenú`}
              onClick={() => toggleMenu(item.path)}
              onKeyDown={(e) => handleKeyDown(e, item, index, parentId)}
            >
              {item.icon && <span className="nav-icon" aria-hidden="true">{item.icon}</span>}
              <span className="nav-label">{item.label}</span>
              <span
                className={`dropdown-arrow ${isExpanded ? 'expanded' : ''}`}
                aria-hidden="true"
              >
                ▼
              </span>
            </button>
            <ul
              id={`nav-dropdown-${item.path}`}
              className={`nav-dropdown ${isExpanded ? 'expanded' : ''}`}
              role="menu"
              aria-label={`Submenú de ${item.label}`}
              hidden={!isExpanded}
            >
              {item.children?.map((child, childIndex) => (
                <li key={child.path} role="none">
                  <Link
                    id={`nav-item-${child.path}`}
                    to={child.path}
                    className={`nav-dropdown-link ${isActive(child.path) ? 'active' : ''}`}
                    role="menuitem"
                    aria-current={isActive(child.path) ? 'page' : undefined}
                    aria-label={child.ariaLabel || child.label}
                    tabIndex={isExpanded ? 0 : -1}
                    onKeyDown={(e) => {
                      if (e.key === 'Escape') {
                        toggleMenu(item.path);
                        triggerRef.current?.focus();
                      }
                    }}
                  >
                    {child.icon && <span className="nav-icon" aria-hidden="true">{child.icon}</span>}
                    <span>{child.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <Link
            id={`nav-item-${item.path}`}
            to={item.path}
            className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
            role="menuitem"
            aria-current={isActive(item.path) ? 'page' : undefined}
            aria-label={item.ariaLabel || item.label}
            onKeyDown={(e) => handleKeyDown(e, item, index, parentId)}
          >
            {item.icon && <span className="nav-icon" aria-hidden="true">{item.icon}</span>}
            <span className="nav-label">{item.label}</span>
          </Link>
        )}
      </li>
    );
  };

  return (
    <nav
      className="main-nav"
      role="navigation"
      aria-label="Navegación principal"
      ref={menuRef}
    >
      <div className="nav-container">
        <div className="nav-brand">
          <Link
            to="/"
            className="brand-link"
            aria-label="BankingApp - Ir a página principal"
          >
            <span className="brand-icon" aria-hidden="true">🏦</span>
            <span className="brand-text">BankingApp</span>
          </Link>
        </div>

        <button
          className="mobile-menu-toggle"
          onClick={handleMobileToggle}
          aria-expanded={mobileMenuOpen}
          aria-controls="main-nav-menu"
          aria-label={mobileMenuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
        >
          <span className="hamburger-icon" aria-hidden="true">
            <span className={`hamburger-line ${mobileMenuOpen ? 'open' : ''}`}></span>
            <span className={`hamburger-line ${mobileMenuOpen ? 'open' : ''}`}></span>
            <span className={`hamburger-line ${mobileMenuOpen ? 'open' : ''}`}></span>
          </span>
        </button>

        <ul
          id="main-nav-menu"
          className={`nav-menu ${mobileMenuOpen ? 'mobile-open' : ''}`}
          role="menubar"
          aria-label="Menú principal"
        >
          {items.map((item, index) => renderNavItem(item, index))}
        </ul>

        {userName && (
          <div className="nav-user-section" role="group" aria-label="Sección de usuario">
            <div className="user-menu-container">
              <button
                className="user-menu-trigger"
                aria-haspopup="true"
                aria-expanded={!!activeDropdown}
                aria-controls="user-dropdown-menu"
                onClick={() => handleDropdownToggle('user')}
                aria-label={`Usuario: ${userName}, opciones de cuenta`}
              >
                <span className="user-avatar" aria-hidden="true">
                  {userName.charAt(0).toUpperCase()}
                </span>
                <span className="user-name">{userName}</span>
                <span
                  className={`dropdown-arrow ${activeDropdown === 'user' ? 'expanded' : ''}`}
                  aria-hidden="true"
                >
                  ▼
                </span>
              </button>
              <ul
                id="user-dropdown-menu"
                className={`user-dropdown ${activeDropdown === 'user' ? 'active' : ''}`}
                role="menu"
                aria-label="Opciones de cuenta de usuario"
                hidden={activeDropdown !== 'user'}
              >
                <li role="none">
                  <button
                    className="user-dropdown-item"
                    role="menuitem"
                    aria-label="Ver perfil de usuario"
                  >
                    <span aria-hidden="true">👤</span>
                    <span>Mi Perfil</span>
                  </button>
                </li>
                <li role="none">
                  <button
                    className="user-dropdown-item"
                    role="menuitem"
                    aria-label="Configuración de accesibilidad"
                  >
                    <span aria-hidden="true">♿</span>
                    <span>Accesibilidad</span>
                  </button>
                </li>
                <li role="none">
                  <button
                    className="user-dropdown-item"
                    role="menuitem"
                    onClick={onLogout}
                    aria-label="Cerrar sesión"
                  >
                    <span aria-hidden="true">🚪</span>
                    <span>Cerrar Sesión</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      <div
        className="nav-breadcrumb"
        role="navigation"
        aria-label="Ruta de navegación"
      >
        <ol className="breadcrumb-list">
          <li className="breadcrumb-item">
            <Link to="/" aria-label="Inicio">
              <span aria-hidden="true">🏠</span>
              <span className="sr-only">Inicio</span>
            </Link>
          </li>
          {location.pathname !== '/' && (
            <li className="breadcrumb-item" aria-current="page">
              <span className="breadcrumb-separator" aria-hidden="true">/</span>
              <span>{location.pathname.split('/').pop() || 'Página'}</span>
            </li>
          )}
        </ol>
      </div>
    </nav>
  );
};