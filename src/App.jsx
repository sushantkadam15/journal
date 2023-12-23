import JournalViewer from './components/text-editor/JournalViewer';
import AuthenticationForm from './components/authentication/AuthenticationForm';
import { useTheme } from './contexts/ThemeContext';
import NavDrawer from './components/navigation/NavDrawer';

function App() {
    const { isDarkMode } = useTheme();
    return (
        <main>
            {/* <AuthenticationForm /> */}
            {/* <JournalViewer /> */}
            <NavDrawer />
        </main>
    );
}

export default App;
