const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../../src/components/QuizSimulator.tsx');
let code = fs.readFileSync(filePath, 'utf8');

// 1. Update imports
const oldImport = `  AlertTriangle,
  Scale,
  Type
} from 'lucide-react';`;

const newImport = `  AlertTriangle,
  Scale,
  Type,
  Swords,
  Lock,
  Plus,
  Check,
  XCircle
} from 'lucide-react';`;

if (code.includes('AlertTriangle,\n  Scale,\n  Type\n} from \'lucide-react\';')) {
  code = code.replace('AlertTriangle,\n  Scale,\n  Type\n} from \'lucide-react\';', newImport);
} else if (code.includes('AlertTriangle,\r\n  Scale,\r\n  Type\r\n} from \'lucide-react\';')) {
  code = code.replace('AlertTriangle,\r\n  Scale,\r\n  Type\r\n} from \'lucide-react\';', newImport);
} else {
  console.log('Lucide import pattern not matched directly, replacing by regex...');
  code = code.replace(/Type\s*\n\}\s*from\s*'lucide-react';/, `Type,\n  Swords,\n  Lock,\n  Plus,\n  Check,\n  XCircle\n} from 'lucide-react';`);
}

// 2. Add state for zen flashcard saved and body scroll lock
if (!code.includes('zenFlashcardSaved')) {
  code = code.replace(
    'const [isZenMode, setIsZenMode] = useState(false);',
    `const [isZenMode, setIsZenMode] = useState(false);
  const [zenFlashcardSaved, setZenFlashcardSaved] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (isZenMode) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isZenMode]);`
  );
}

// Reset zenFlashcardSaved in handleNext
code = code.replace(
  'setSelectedOptionId(null);',
  'setSelectedOptionId(null);\n    setZenFlashcardSaved(false);'
);

fs.writeFileSync(filePath, code, 'utf8');
console.log('Step 1 applied successfully!');
