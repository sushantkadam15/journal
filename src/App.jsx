import TextEditor from './components/TextEditor/TextEditor';
import UserAuthenticationForm from './components/UserAuthenticationForm';
import { useState } from 'react';

// Initial Data
const INITIAL_DATA = {
    time: new Date().getTime(),
    blocks: [
        {
            type: 'header',
            data: {
                text: 'This is my awesome editor!',
                level: 1
            }
        }
    ]
};

function App() {
    const [data, setData] = useState(INITIAL_DATA);
    return (
        <section>
            <TextEditor
                data={data}
                onChange={setData}
                editorblock="editorjs-container"
            />
            {/* <UserAuthenticationForm /> */}
        </section>
    );
}

export default App;
