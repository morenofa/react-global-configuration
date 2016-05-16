import path from 'path';

export default function clear() {
    if (require && require.cache) {
        delete require.cache[ path.join(__dirname, 'configuration.js') ];
        delete require.cache[ path.join(__dirname, 'index.js') ];
    } else {
        console.warn('react-global-configuration - require.cache not available for clearing');
    }
}
