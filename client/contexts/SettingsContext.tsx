'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type ThemeVariant = 'dark' | 'darker' | 'darkest';
export type FontSize = 'small' | 'medium' | 'large';

interface SettingsContextType {
  // Theme
  theme: ThemeVariant;
  setTheme: (theme: ThemeVariant) => void;
  
  // Font Size
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
  
  // OpenRouter Settings
  openRouterApiKey: string;
  setOpenRouterApiKey: (key: string) => void;
  validateApiKey: (key: string) => boolean;
  
  // Model Selection
  selectedModel: string;
  setSelectedModel: (model: string) => void;
  availableModels: { id: string; name: string; provider: string }[];
  
  // Menu State
  isMenuOpen: boolean;
  toggleMenu: () => void;
  closeMenu: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

const AVAILABLE_MODELS = [
  { id: 'google/gemini-2.0-flash-exp:free', name: 'Gemini 2.0 Flash', provider: 'Google' },
  { id: 'meta-llama/llama-3.2-3b-instruct:free', name: 'Llama 3.2 3B', provider: 'Meta' },
  { id: 'qwen/qwen-2-7b-instruct:free', name: 'Qwen 2 7B', provider: 'Qwen' },
  { id: 'google/gemini-pro', name: 'Gemini Pro', provider: 'Google' },
  { id: 'anthropic/claude-3-haiku', name: 'Claude 3 Haiku', provider: 'Anthropic' },
  { id: 'openai/gpt-3.5-turbo', name: 'GPT-3.5 Turbo', provider: 'OpenAI' },
];

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState<ThemeVariant>('dark');
  const [fontSize, setFontSizeState] = useState<FontSize>('medium');
  const [openRouterApiKey, setOpenRouterApiKeyState] = useState('');
  const [selectedModel, setSelectedModelState] = useState(AVAILABLE_MODELS[0].id);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Load settings from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as ThemeVariant;
      const savedFontSize = localStorage.getItem('fontSize') as FontSize;
      const savedApiKey = localStorage.getItem('openRouterApiKey');
      const savedModel = localStorage.getItem('selectedModel');

      if (savedTheme) setThemeState(savedTheme);
      if (savedFontSize) setFontSizeState(savedFontSize);
      if (savedApiKey) setOpenRouterApiKeyState(savedApiKey);
      if (savedModel) setSelectedModelState(savedModel);
    }
  }, []);

  const setTheme = (newTheme: ThemeVariant) => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const setFontSize = (newSize: FontSize) => {
    setFontSizeState(newSize);
    localStorage.setItem('fontSize', newSize);
    document.documentElement.setAttribute('data-font-size', newSize);
  };

  const setOpenRouterApiKey = (key: string) => {
    setOpenRouterApiKeyState(key);
    if (key) {
      localStorage.setItem('openRouterApiKey', key);
    } else {
      localStorage.removeItem('openRouterApiKey');
    }
  };

  const validateApiKey = (key: string): boolean => {
    // OpenRouter API keys typically start with 'sk-or-'
    if (!key || key.trim() === '') return false;
    if (!key.startsWith('sk-or-') && !key.startsWith('sk-')) return false;
    if (key.length < 20) return false;
    return true;
  };

  const setSelectedModel = (model: string) => {
    setSelectedModelState(model);
    localStorage.setItem('selectedModel', model);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <SettingsContext.Provider
      value={{
        theme,
        setTheme,
        fontSize,
        setFontSize,
        openRouterApiKey,
        setOpenRouterApiKey,
        validateApiKey,
        selectedModel,
        setSelectedModel,
        availableModels: AVAILABLE_MODELS,
        isMenuOpen,
        toggleMenu,
        closeMenu,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
