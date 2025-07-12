
import { useRef, useState, useEffect } from 'react';
import './App.css';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';


function App() {
    const [leftWidth, setLeftWidth] = useState(300); // 初期幅(px)
    const dragging = useRef(false);
    const [selectedImage, setSelectedImage] = useState<{ path: string, content: string } | null>(null);
    const [fileContents, setFileContents] = useState<{ path: string, content: string }[]>([]);
    // LeftPanelのinput変更時の処理
    const handleLeftPanelChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        // ファイル内容をクライアント側でロード
        const readFiles = Array.from(files).map(file => {
            return new Promise<{ path: string, content: string }>((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => {
                    resolve({ path: file.webkitRelativePath || file.name, content: reader.result as string });
                };
                reader.onerror = () => reject(reader.error);
                if (file.type.startsWith('image/')) {
                    reader.readAsDataURL(file);
                } else {
                    reader.readAsText(file);
                }
            });
        });
        try {
            const results = await Promise.all(readFiles);
            setFileContents(results);
        } catch (err) {
            alert('ファイルの読み込みに失敗しました');
        }
    };
    const [crop, setCrop] = useState(() => {
        const saved = localStorage.getItem('matometetrim-crop');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                if (
                    typeof parsed.top === 'number' &&
                    typeof parsed.left === 'number' &&
                    typeof parsed.right === 'number' &&
                    typeof parsed.bottom === 'number'
                ) {
                    return parsed;
                }
            } catch { }
        }
        return { top: 0, left: 0, right: 0, bottom: 0 };
    });

    // crop値の変更時にlocalStorageへ保存
    useEffect(() => {
        localStorage.setItem('matometetrim-crop', JSON.stringify(crop));
    }, [crop]);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        dragging.current = true;
        document.body.style.cursor = 'col-resize';
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!dragging.current) return;
            setLeftWidth(Math.max(100, e.clientX));
        };
        const handleMouseUp = () => {
            dragging.current = false;
            document.body.style.cursor = '';
        };
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    return (
        <div id="App" style={{ display: 'flex', height: '100vh', userSelect: dragging.current ? 'none' : 'auto', position: 'relative' }}>
            <div
                style={{
                    width: leftWidth,
                    minWidth: 100,
                    maxWidth: '80vw',
                    borderRight: '1px solid #ccc',
                    padding: '16px',
                    boxSizing: 'border-box',
                    transition: dragging.current ? 'none' : 'width 0.2s',
                }}
            >
                <LeftPanel
                    onImagesChange={setSelectedImage}
                    crop={crop}
                    setCrop={setCrop}
                    fileContents={fileContents}
                    setFileContents={setFileContents}
                    onChange={handleLeftPanelChange}
                />
            </div>
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: leftWidth - 2, // 2px分重ねる
                    width: 4,
                    cursor: 'col-resize',
                    background: dragging.current ? '#aaa' : '#eee',
                    zIndex: 10,
                }}
                onMouseDown={handleMouseDown}
            />
            <div style={{ flex: 1, padding: '16px', boxSizing: 'border-box', marginLeft: 4 }}>
                <RightPanel selectedImage={selectedImage} allImages={fileContents} crop={crop} />
            </div>
        </div>
    );
}

export default App
