import JournalView from './components/text-editor/JournalView';
import UserAuthenticationForm from './components/authentication/UserAuthenticationForm';
import { useTheme } from './contexts/ThemeContext';

function App() {
    const { isDarkMode } = useTheme();
    return (
        <main>
            {/* <UserAuthenticationForm /> */}
            <JournalView />
        </main>
    );
}

export default App;
