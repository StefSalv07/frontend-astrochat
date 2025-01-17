import { useSelector } from 'react-redux';
import {selectCurrentTheme} from "../features/theme/themeSlice"

export default function ThemeProvider({ children }) {
  const theme = useSelector(selectCurrentTheme);
  return (
    <div className={theme}>
      <div className='bg-white dark:text-gray-200 dark:bg-[rgb(16,23,42)] min-h-screen'>
        {children}
      </div>
    </div>
  );
}