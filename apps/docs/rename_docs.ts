import * as fs from 'fs';
import * as path from 'path';

const slugMap: Record<string, string> = {
    // Directories
    'headless': 'headless-mimari',
    'deploying': 'yayinlama',
    'guides': 'rehberler',
    'integrations': 'entegrasyonlar',
    'search': 'arama',
    'components': 'bilesenler',
    'utils': 'araclar',
    'source-api': 'kaynak-api',
    'layouts': 'duzenler',

    // Files
    'comparisons': 'karsilastirmalar',
    'static': 'statik',
    'analytics': 'analitik',
    'social-media': 'sosyal-medya',
    'content': 'icerik',
    'internationalization': 'coklu-dil',
    'page-conventions': 'sayfa-kurallari',
    'page-tree': 'sayfa-agaci',
    'content-collections': 'icerik-koleksiyonlari',
    'headings': 'basliklar',
    'install': 'kurulum',
    'rehype-code': 'rehype-kod',
    'remark-image': 'remark-gorsel',
    'remark-mdx-files': "remark-mdx-dosyalari",
    'structure': 'yapi',
    'plugins': 'eklentiler',
    'source': 'kaynak',
    'get-toc': 'icindekileri-al',
    'git-last-edit': 'son-duzenleme',
    'negotiation': 'uyusma',
    'component-library': 'bilesen-kutuphanesi',
    'theme': 'tema',
    'versioning': 'versiyonlama',
    'navigation': 'navigasyon',
    'marketing': 'pazarlama'
};

const contentDir = path.join(process.cwd(), 'content/docs');

// Create a mapping of old full paths (relative to docs) to new full paths
// Example: '/docs/headless/components' -> '/docs/headless-mimari/bilesenler'
const linkReplacements: { old: string; new: string }[] = [];

function translateName(name: string): string {
    const ext = path.extname(name);
    const base = path.basename(name, ext);

    if (slugMap[base]) {
        return slugMap[base] + ext;
    }
    return name;
}

// 1. Bottom-up renaming of files and folders
function renameRecursive(currentPath: string, relativePath: string) {
    const stats = fs.statSync(currentPath);

    if (stats.isDirectory()) {
        const children = fs.readdirSync(currentPath);
        for (const child of children) {
            renameRecursive(path.join(currentPath, child), `${relativePath}/${child}`);
        }
    }

    const baseName = path.basename(currentPath);
    const newBaseName = translateName(baseName);

    if (newBaseName !== baseName && baseName !== 'docs') {
        const parentDir = path.dirname(currentPath);
        const newPath = path.join(parentDir, newBaseName);

        // Calculate old vs new for links
        let oldLinkPath = relativePath.replace(/\.mdx$/, '');
        let newLinkPath = oldLinkPath.split('/').map(segment => translateName(segment).replace(/\.mdx$/, '')).join('/');

        // Only add link replacement if it's a file or folder that changed
        linkReplacements.push({
            old: oldLinkPath.startsWith('/') ? oldLinkPath : '/' + oldLinkPath,
            new: newLinkPath.startsWith('/') ? newLinkPath : '/' + newLinkPath
        });

        console.log(`Renaming ${currentPath} to ${newPath}`);
        fs.renameSync(currentPath, newPath);
    }
}

console.log('--- RENAMING FILES & FOLDERS ---');
renameRecursive(contentDir, "");

// Sort link replacements by length descending to replace the most specific (longest) paths first
linkReplacements.sort((a, b) => b.old.length - a.old.length);
console.log('--- LINK REPLACEMENTS ---', linkReplacements);

// 2. Search and replace inside .mdx and meta.json
function replaceInFiles(dir: string) {
    const children = fs.readdirSync(dir);
    for (const child of children) {
        const fullPath = path.join(dir, child);
        if (fs.statSync(fullPath).isDirectory()) {
            replaceInFiles(fullPath);
        } else if (fullPath.endsWith('.mdx') || fullPath.endsWith('meta.json')) {
            let content = fs.readFileSync(fullPath, 'utf-8');
            let modified = false;

            // Also replace meta.json "pages" arrays
            if (fullPath.endsWith('meta.json')) {
                for (const [oldName, newName] of Object.entries(slugMap)) {
                    if (content.includes(`"${oldName}"`)) {
                        content = content.replace(new RegExp(`"${oldName}"`, 'g'), `"${newName}"`);
                        modified = true;
                    }
                }
            }

            // Replace Markdown links like (/docs/headless/components) -> (/docs/headless-mimari/bilesenler)
            // and absolute URL links inside text
            for (const { old, new: newLink } of linkReplacements) {
                // Look for exact matches avoiding partial words. E.g `/docs/headless` but not `/docs/headless-ui`
                const regex1 = new RegExp(`href="(/docs${old}(#[\\w-]+)?)"`, 'g');
                const regex2 = new RegExp(`\\]\\(/docs${old}(#[\\w-]+)?\\)`, 'g');
                const regex3 = new RegExp(`href='/docs${old}(#[\\w-]+)?'`, 'g');

                if (regex1.test(content) || regex2.test(content) || regex3.test(content)) {
                    content = content.replace(regex1, `href="/docs${newLink}$2"`);
                    content = content.replace(regex2, `](/docs${newLink}$1)`);
                    content = content.replace(regex3, `href='/docs${newLink}$1'`);
                    modified = true;
                }
            }

            if (modified) {
                console.log(`Updated links in ${fullPath}`);
                fs.writeFileSync(fullPath, content, 'utf-8');
            }
        }
    }
}

console.log('--- UPDATING FILES ---');
replaceInFiles(contentDir);
