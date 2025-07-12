import React, { useEffect, useState } from 'react';
import SelectedImage from './rightPanel/SelectedImage';
import AllImages from './rightPanel/AllImages';
import TrimResult from './rightPanel/TrimResult';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

interface RightPanelProps {
    selectedImage: { path: string, content: string } | null;
    allImages: { path: string, content: string }[];
    crop: { top: number; left: number; right: number; bottom: number };
}

const RightPanel: React.FC<RightPanelProps> = ({ selectedImage, allImages, crop }) => {
    // 全ての画像をトリミング
    const [croppedData, setCroppedData] = useState<Array<{ path: string; url: string | null }>>([]);

    useEffect(() => {
        const imageFiles = allImages.filter(file => file.content.startsWith('data:image'));

        if (imageFiles.length === 0) {
            setCroppedData([]);
            return;
        }

        const cropPromises = imageFiles.map(file => {
            return new Promise<{ path: string; url: string | null }>(resolve => {
                const img = new window.Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    if (!ctx) return resolve({ path: file.path, url: null });
                    const w = img.width;
                    const h = img.height;
                    const left = Math.min(crop.left, w - crop.right);
                    const top = Math.min(crop.top, h - crop.bottom);
                    const right = Math.max(0, w - crop.right);
                    const bottom = Math.max(0, h - crop.bottom);
                    const cropW = Math.max(1, right - left);
                    const cropH = Math.max(1, bottom - top);
                    canvas.width = cropW;
                    canvas.height = cropH;
                    ctx.drawImage(img, left, top, cropW, cropH, 0, 0, cropW, cropH);
                    resolve({ path: file.path, url: canvas.toDataURL() });
                };
                img.onerror = () => resolve({ path: file.path, url: null });
                img.src = file.content;
            });
        });

        Promise.all(cropPromises).then(setCroppedData);
    }, [allImages, crop]);

    const handleDownloadZip = async () => {
        const zip = new JSZip();
        const imagesToZip = croppedData.filter(item => item.url !== null);

        if (imagesToZip.length === 0) {
            alert('ダウンロードするトリミング済み画像がありません。');
            return;
        }

        imagesToZip.forEach(item => {
            // item.url is like "data:image/png;base64,iVBORw0KGgo..."
            // We need to extract the base64 part.
            const base64Data = item.url!.split(',')[1];
            // Use the original path for the file name in the zip.
            // jszip will create folders if the path contains them.
            zip.file(item.path, base64Data, { base64: true });
        });

        const content = await zip.generateAsync({ type: 'blob' });
        saveAs(content, 'cropped-images.zip');
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 20 }}>
            <SelectedImage selectedImage={selectedImage} />
            <AllImages images={allImages} />
            <TrimResult croppedUrls={croppedData.map(d => d.url)} />
            {croppedData.length > 0 && <button onClick={handleDownloadZip}>トリミング画像をZIPでダウンロード</button>}
        </div>
    );
};

export default RightPanel;
