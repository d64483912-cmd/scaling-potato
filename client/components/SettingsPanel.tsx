'use client';

import { useState, useEffect } from 'react';
import { useSettings } from '@/contexts/SettingsContext';

export default function SettingsPanel() {
  const {
    isMenuOpen,
    closeMenu,
    theme,
    setTheme,
    fontSize,
    setFontSize,
    openRouterApiKey,
    setOpenRouterApiKey,
    validateApiKey,
    selectedModel,
    setSelectedModel,
    availableModels,
  } = useSettings();

  const [apiKeyInput, setApiKeyInput] = useState(openRouterApiKey);
  const [apiKeyError, setApiKeyError] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);

  useEffect(() => {
    setApiKeyInput(openRouterApiKey);
  }, [openRouterApiKey]);

  const handleApiKeyChange = (value: string) => {
    setApiKeyInput(value);
    setApiKeyError('');
  };

  const handleApiKeySave = () => {
    if (!apiKeyInput.trim()) {
      setOpenRouterApiKey('');
      setApiKeyError('');
      return;
    }

    if (validateApiKey(apiKeyInput)) {
      setOpenRouterApiKey(apiKeyInput);
      setApiKeyError('');
    } else {
      setApiKeyError('Invalid API key format. Should start with "sk-or-" and be at least 20 characters.');
    }
  };

  const handleApiKeyBlur = () => {
    handleApiKeySave();
  };

  return (
    <>
      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={closeMenu}
        />
      )}

      {/* Sliding Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-96 bg-background border-l border-border z-40 transform transition-transform duration-300 ease-in-out overflow-y-auto ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-border">
            <h2 className="text-2xl font-bold text-foreground">Settings</h2>
            <button
              onClick={closeMenu}
              className="p-2 rounded-lg hover:bg-background-secondary transition-colors"
              aria-label="Close menu"
            >
              <svg
                className="w-6 h-6 text-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Font Size */}
          <div className="space-y-3">
            <label className="block text-foreground font-semibold">Font Size</label>
            <div className="flex space-x-2">
              {(['small', 'medium', 'large'] as const).map((size) => (
                <button
                  key={size}
                  onClick={() => setFontSize(size)}
                  className={`flex-1 py-2 px-4 rounded-lg border transition-all duration-200 ${
                    fontSize === size
                      ? 'bg-accent text-foreground border-accent'
                      : 'bg-background-secondary text-foreground-secondary border-border hover:border-accent'
                  }`}
                >
                  <span className={size === 'small' ? 'text-sm' : size === 'large' ? 'text-lg' : ''}>
                    {size.charAt(0).toUpperCase() + size.slice(1)}
                  </span>
                </button>
              ))}
            </div>
            <p className="text-xs text-foreground-tertiary">
              Adjust the font size for better readability
            </p>
          </div>

          {/* Theme */}
          <div className="space-y-3">
            <label className="block text-foreground font-semibold">Theme Variant</label>
            <div className="space-y-2">
              {(['dark', 'darker', 'darkest'] as const).map((themeVariant) => (
                <button
                  key={themeVariant}
                  onClick={() => setTheme(themeVariant)}
                  className={`w-full py-3 px-4 rounded-lg border transition-all duration-200 flex items-center justify-between ${
                    theme === themeVariant
                      ? 'bg-accent text-foreground border-accent'
                      : 'bg-background-secondary text-foreground-secondary border-border hover:border-accent'
                  }`}
                >
                  <span>{themeVariant.charAt(0).toUpperCase() + themeVariant.slice(1)}</span>
                  <div
                    className={`w-6 h-6 rounded border ${
                      themeVariant === 'dark'
                        ? 'bg-[#0a0a0a]'
                        : themeVariant === 'darker'
                        ? 'bg-[#050505]'
                        : 'bg-[#000000]'
                    }`}
                  />
                </button>
              ))}
            </div>
            <p className="text-xs text-foreground-tertiary">
              Choose your preferred darkness level
            </p>
          </div>

          {/* OpenRouter API Key */}
          <div className="space-y-3">
            <label className="block text-foreground font-semibold">OpenRouter API Key</label>
            <div className="space-y-2">
              <div className="relative">
                <input
                  type={showApiKey ? 'text' : 'password'}
                  value={apiKeyInput}
                  onChange={(e) => handleApiKeyChange(e.target.value)}
                  onBlur={handleApiKeyBlur}
                  placeholder="sk-or-..."
                  className={`w-full px-4 py-3 bg-background-secondary border rounded-lg text-foreground placeholder-foreground-tertiary focus:outline-none focus:ring-2 transition-all ${
                    apiKeyError
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-border focus:ring-accent'
                  }`}
                />
                <button
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground-tertiary hover:text-foreground"
                  type="button"
                >
                  {showApiKey ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {apiKeyError && (
                <p className="text-sm text-red-400">{apiKeyError}</p>
              )}
              {openRouterApiKey && !apiKeyError && (
                <p className="text-sm text-green-400">✓ API key saved</p>
              )}
            </div>
            <p className="text-xs text-foreground-tertiary">
              Get your free API key from{' '}
              <a
                href="https://openrouter.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent-hover underline"
              >
                openrouter.ai
              </a>
            </p>
          </div>

          {/* Model Selection */}
          <div className="space-y-3">
            <label className="block text-foreground font-semibold">AI Model</label>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="w-full px-4 py-3 bg-background-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23a3a3a3'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 0.75rem center',
                backgroundSize: '1.5rem',
                paddingRight: '2.5rem',
              }}
            >
              {availableModels.map((model) => (
                <option key={model.id} value={model.id}>
                  {model.name} ({model.provider})
                  {model.id.includes(':free') ? ' - Free' : ''}
                </option>
              ))}
            </select>
            <p className="text-xs text-foreground-tertiary">
              Free models are marked and don't require credits
            </p>
          </div>

          {/* Info Section */}
          <div className="pt-4 border-t border-border space-y-2">
            <p className="text-sm text-foreground-secondary">
              <strong>Note:</strong> Settings are saved locally in your browser.
            </p>
            <p className="text-sm text-foreground-tertiary">
              Your API key is stored securely and never sent to our servers.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
