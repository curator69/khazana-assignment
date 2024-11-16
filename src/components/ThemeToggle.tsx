import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <button
      onClick={toggleDarkMode}
      className="fixed top-4 right-4 p-3 rounded-lg bg-gray-200 dark:bg-gray-700 z-50 shadow-lg hover:scale-110 transition-transform"
    >
      {isDarkMode ? "🌞" : "🌙"}
    </button>
  );
}
