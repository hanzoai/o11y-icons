import React, { useMemo, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

// Load all generated icon components directly (no barrel file needed). Exclude index.
// Vite provides import.meta.glob at build time.
const iconModules = (
  import.meta as unknown as { glob: (p: string, o?: { eager?: boolean }) => Record<string, unknown> }
).glob('../src/*.tsx', { eager: true }) as Record<
  string,
  { default: React.ComponentType<{ size?: string | number; color?: string }> }
>;

function getIconEntries(): [string, React.ComponentType<{ size?: string | number; color?: string }>][] {
  const entries: [string, React.ComponentType<{ size?: string | number; color?: string }>][] = [];
  for (const [path, mod] of Object.entries(iconModules)) {
    if (!mod?.default) continue;
    const name = path.replace(/^.*\/([^/]+)\.tsx$/, '$1');
    if (name === 'index') continue;
    entries.push([name, mod.default]);
  }
  return entries.sort(([a], [b]) => a.localeCompare(b));
}

const meta: Meta = {
  title: 'Icons / Gallery',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'All icons from the library. Use the search to filter by name.',
      },
    },
  },
};

export default meta;

type Story = StoryObj;

function normalizeIconName(name: string): string {
  return name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

type Theme = 'light' | 'dark';

function getThemeStyles(theme: Theme) {
  const isDark = theme === 'dark';
  return {
    page: {
      fontFamily: "'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif",
      background: isDark
        ? 'linear-gradient(180deg, #0f1114 0%, #1a1d21 100%)'
        : 'linear-gradient(180deg, #f8f9fb 0%, #f0f2f5 100%)',
      minHeight: '100vh',
      padding: '32px 24px 48px',
      color: isDark ? '#e5e7eb' : '#1a1d21',
    },
    title: {
      fontSize: 22,
      fontWeight: 600,
      color: isDark ? '#f3f4f6' : '#1a1d21',
      margin: 0,
      letterSpacing: '-0.02em',
    },
    subtitle: {
      fontSize: 14,
      color: isDark ? '#9ca3af' : '#5c6370',
      margin: '6px 0 0',
      lineHeight: 1.45,
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      flexWrap: 'wrap' as const,
      marginBottom: 24,
      padding: '16px 20px',
      background: isDark ? '#1f2328' : '#fff',
      borderRadius: 12,
      boxShadow: isDark ? '0 1px 3px rgba(0,0,0,0.3)' : '0 1px 3px rgba(0,0,0,0.06)',
      border: isDark ? '1px solid #2d3238' : '1px solid transparent',
    },
    search: {
      flex: '1 1 260px',
      minWidth: 0,
      padding: '10px 14px 10px 36px',
      fontSize: 14,
      border: isDark ? '1px solid #374151' : '1px solid #e2e5e9',
      borderRadius: 8,
      background: isDark ? '#111318' : '#fafbfc',
      color: isDark ? '#e5e7eb' : '#1a1d21',
      outline: 'none',
      transition: 'border-color 0.15s, box-shadow 0.15s',
    },
    searchFocus: {
      borderColor: '#3b82f6',
      boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.2)',
    },
    sizeLabel: {
      fontSize: 13,
      fontWeight: 500,
      color: isDark ? '#d1d5db' : '#374151',
    },
    sizeSelect: {
      padding: '8px 12px',
      fontSize: 13,
      border: isDark ? '1px solid #374151' : '1px solid #e2e5e9',
      borderRadius: 8,
      background: isDark ? '#111318' : '#fff',
      color: isDark ? '#e5e7eb' : '#1a1d21',
      cursor: 'pointer',
    },
    count: {
      fontSize: 13,
      color: isDark ? '#9ca3af' : '#6b7280',
      marginLeft: 'auto',
    },
    countNum: {
      fontWeight: 600,
      color: isDark ? '#d1d5db' : '#374151',
    },
    card: {
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      padding: '20px 12px 16px',
      background: isDark ? '#1f2328' : '#fff',
      borderRadius: 12,
      boxShadow: isDark ? '0 1px 3px rgba(0,0,0,0.3)' : '0 1px 3px rgba(0,0,0,0.06)',
      border: isDark ? '1px solid #2d3238' : '1px solid rgba(0,0,0,0.04)',
      transition: 'box-shadow 0.2s, transform 0.15s',
      cursor: 'default',
    },
    cardHoverShadow: isDark ? '0 4px 12px rgba(0,0,0,0.4)' : '0 4px 12px rgba(0,0,0,0.08)',
    cardDefaultShadow: isDark ? '0 1px 3px rgba(0,0,0,0.3)' : '0 1px 3px rgba(0,0,0,0.06)',
    iconCell: {
      width: 56,
      height: 56,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 12,
      color: isDark ? '#FFFFFF' : '#2A2E37',
      flexShrink: 0,
    },
    iconName: {
      fontSize: 11,
      color: isDark ? '#9ca3af' : '#4b5563',
      textAlign: 'center' as const,
      wordBreak: 'break-word' as const,
      lineHeight: 1.35,
      fontFamily: "'SF Mono', 'Monaco', 'Inconsolata', monospace",
    },
    emptyState: {
      textAlign: 'center' as const,
      padding: '48px 24px',
      background: isDark ? '#1f2328' : '#fff',
      borderRadius: 12,
      boxShadow: isDark ? '0 1px 3px rgba(0,0,0,0.3)' : '0 1px 3px rgba(0,0,0,0.06)',
    },
    emptyTitle: {
      fontSize: 16,
      fontWeight: 500,
      color: isDark ? '#d1d5db' : '#374151',
      margin: '0 0 8px',
    },
    emptyText: {
      fontSize: 14,
      color: isDark ? '#9ca3af' : '#6b7280',
      margin: 0,
      lineHeight: 1.5,
    },
    noIconsTitle: {
      fontSize: 18,
      fontWeight: 600,
      color: isDark ? '#f3f4f6' : '#1a1d21',
      margin: '0 0 12px',
    },
    noIconsText: {
      fontSize: 14,
      color: isDark ? '#9ca3af' : '#5c6370',
      margin: 0,
      lineHeight: 1.6,
    },
    code: {
      padding: '2px 6px',
      background: isDark ? '#374151' : '#e5e7eb',
      borderRadius: 4,
      fontSize: 13,
      fontFamily: "'SF Mono', Monaco, monospace",
      color: isDark ? '#e5e7eb' : '#1a1d21',
    },
    themeToggle: {
      display: 'flex',
      border: isDark ? '1px solid #374151' : '1px solid #e2e5e9',
      borderRadius: 8,
      overflow: 'hidden' as const,
    },
    themeButton: (active: boolean) => ({
      padding: '8px 12px',
      fontSize: 13,
      border: 'none',
      background: active ? (isDark ? '#374151' : '#e5e7eb') : 'transparent',
      color: active ? (isDark ? '#fff' : '#1a1d21') : isDark ? '#9ca3af' : '#6b7280',
      cursor: 'pointer',
      fontWeight: active ? 600 : 400,
    }),
  };
}

const styles = {
  container: { maxWidth: 1200, margin: '0 auto' as const },
  header: { marginBottom: 28 },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
    gap: 20,
  },
  noIconsBox: { padding: 32, maxWidth: 520, margin: '0 auto' as const, textAlign: 'center' as const },
};

export const Gallery: Story = {
  parameters: {
    chromatic: { disable: true },
  },
  render: function IconsGallery() {
    const [search, setSearch] = useState('');
    type IconSizePreset = 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs' | 'custom';
    const [sizePreset, setSizePreset] = useState<IconSizePreset>('lg');
    const [customPxInput, setCustomPxInput] = useState('24');
    const [searchFocused, setSearchFocused] = useState(false);
    const [theme, setTheme] = useState<Theme>('light');
    const [copiedName, setCopiedName] = useState<string | null>(null);

    const themeStyles = useMemo(() => getThemeStyles(theme), [theme]);
    const customPx = Math.min(128, Math.max(8, Number(customPxInput) || 16));
    const iconColor = theme === 'dark' ? '#FFFFFF' : '#2A2E37';

    const copySnippet = (componentName: string) => {
      const sizeProp =
        sizePreset === 'custom'
          ? `size={${customPx}}`
          : `size="${sizePreset}"`;
      const snippet = `<${componentName} ${sizeProp} color="${iconColor}" />`;
      void navigator.clipboard.writeText(snippet).then(() => {
        setCopiedName(componentName);
        setTimeout(() => setCopiedName(null), 1500);
      });
    };
    const iconSize: string | number =
      sizePreset === 'custom' ? customPx : sizePreset;

    const iconEntries = useMemo(() => getIconEntries(), []);

    const filtered = useMemo(() => {
      if (!search.trim()) return iconEntries;
      const q = search.toLowerCase().trim();
      return iconEntries.filter(
        ([name]) =>
          name.toLowerCase().includes(q) ||
          normalizeIconName(name).includes(q)
      );
    }, [iconEntries, search]);

    const cellSize = 56;

    if (iconEntries.length === 0) {
      return (
        <div style={themeStyles.page}>
          <div style={styles.container}>
            <div style={styles.noIconsBox}>
              <h1 style={themeStyles.noIconsTitle}>No icons generated yet</h1>
              <p style={themeStyles.noIconsText}>
                Run <code style={themeStyles.code}>pnpm run svgr</code> (or{' '}
                <code style={themeStyles.code}>pnpm run storybook</code>) to generate
                icon components from <code style={themeStyles.code}>assets/*.svg</code>{' '}
                into <code style={themeStyles.code}>src/</code>.
              </p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div style={themeStyles.page}>
        <style>{`
          .gallery-icon-cell svg path,
          .gallery-icon-cell svg circle,
          .gallery-icon-cell svg line {
            stroke: currentColor !important;
          }
          .gallery-icon-cell svg path[fill],
          .gallery-icon-cell svg circle[fill] {
            fill: currentColor !important;
          }
        `}</style>
        <div style={styles.container}>
          <header style={styles.header}>
            <h1 style={themeStyles.title}>Icon gallery</h1>
            <p style={themeStyles.subtitle}>
              Browse and search all {iconEntries.length} icons. Filter by name
              and adjust size below.
            </p>
          </header>

          <div style={themeStyles.toolbar}>
            <input
              type="search"
              placeholder="Search by name (e.g. arrow, user, star)…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              aria-label="Search icons"
              style={{
                ...themeStyles.search,
                ...(searchFocused ? themeStyles.searchFocus : {}),
              }}
            />
            <div style={themeStyles.themeToggle} role="group" aria-label="Theme">
              <button
                type="button"
                onClick={() => setTheme('light')}
                style={themeStyles.themeButton(theme === 'light')}
              >
                Light
              </button>
              <button
                type="button"
                onClick={() => setTheme('dark')}
                style={themeStyles.themeButton(theme === 'dark')}
              >
                Dark
              </button>
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={themeStyles.sizeLabel}>Size</span>
              <select
                value={sizePreset}
                onChange={(e) =>
                  setSizePreset(e.target.value as IconSizePreset)
                }
                aria-label="Icon size"
                style={themeStyles.sizeSelect}
              >
                <option value="xs">XS (16px)</option>
                <option value="sm">SM (18px)</option>
                <option value="md">MD (20px)</option>
                <option value="lg">LG (22px)</option>
                <option value="xl">XL (24px)</option>
                <option value="xxl">XXL (28px)</option>
                <option value="custom">Custom</option>
              </select>
              {sizePreset === 'custom' && (
                <input
                  type="number"
                  min={8}
                  max={128}
                  value={customPxInput}
                  onChange={(e) => setCustomPxInput(e.target.value)}
                  onBlur={() => {
                    const n = Number(customPxInput);
                    if (!Number.isFinite(n) || n < 8 || n > 128) {
                      setCustomPxInput(String(Math.min(128, Math.max(8, n || 16))));
                    }
                  }}
                  aria-label="Custom size (px)"
                  style={{
                    ...themeStyles.sizeSelect,
                    width: 72,
                  }}
                />
              )}
              {sizePreset === 'custom' && (
                <span style={{ fontSize: 13, color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}>px</span>
              )}
            </label>
            <span style={themeStyles.count}>
              <span style={themeStyles.countNum}>{filtered.length}</span>
              {' / '}
              {iconEntries.length} icons
            </span>
          </div>

          {filtered.length === 0 ? (
            <div style={themeStyles.emptyState}>
              <p style={themeStyles.emptyTitle}>No matches</p>
              <p style={themeStyles.emptyText}>
                No icons match &quot;{search}&quot;. Try a different term.
              </p>
            </div>
          ) : (
            <div style={styles.grid}>
              {filtered.map(([name, Icon]) => (
                <div
                  key={name}
                  role="button"
                  tabIndex={0}
                  onClick={() => copySnippet(name)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      copySnippet(name);
                    }
                  }}
                  style={{
                    ...themeStyles.card,
                    cursor: 'pointer',
                  }}
                  aria-label={`Copy ${name} component`}
                  title="Click to copy component"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = themeStyles.cardHoverShadow;
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = themeStyles.cardDefaultShadow;
                    e.currentTarget.style.transform = 'none';
                  }}
                >
                  <div
                    className="gallery-icon-cell"
                    style={{
                      ...themeStyles.iconCell,
                      width: cellSize,
                      height: cellSize,
                      color: iconColor,
                    }}
                  >
                    <Icon size={iconSize} color={iconColor} />
                  </div>
                  <span style={themeStyles.iconName}>
                    {copiedName === name ? 'Copied!' : name}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  },
};
