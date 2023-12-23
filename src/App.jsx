import JournalViewer from './components/text-editor/JournalViewer';
import AuthenticationForm from './components/authentication/AuthenticationForm';
import { useTheme } from './contexts/ThemeContext';

function App() {
    const { isDarkMode } = useTheme();
    return (
        <main>
            {/* <AuthenticationForm /> */}
            <JournalViewer />
        </main>
    );
}

export default App;
