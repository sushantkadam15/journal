import JournalView from './components/journal/JournalView';
import UserAuthenticationForm from './components/UserAuthenticationForm';
import { useTheme } from './contexts/ThemeContext';

function App() {
    const { isDarkMode } = useTheme();
    return (
        <main>
            <UserAuthenticationForm />
            {/* <JournalView /> */}
        </main>
    );
}

export default App;
