import { Question } from '../types';
import { CEBRASPE_QUESTIONS } from './cebraspeQuestions';
import { FGV_QUESTIONS } from './fgvQuestions';
import { FCC_QUESTIONS } from './fccQuestions';
import { VUNESP_QUESTIONS } from './vunespQuestions';
import { CESGRANRIO_QUESTIONS } from './cesgranrioQuestions';

export {
  CEBRASPE_QUESTIONS,
  FGV_QUESTIONS,
  FCC_QUESTIONS,
  VUNESP_QUESTIONS,
  CESGRANRIO_QUESTIONS,
};

export const ALL_OFFICIAL_QUESTIONS: Question[] = [
  ...CEBRASPE_QUESTIONS,
  ...FGV_QUESTIONS,
  ...FCC_QUESTIONS,
  ...VUNESP_QUESTIONS,
  ...CESGRANRIO_QUESTIONS,
];

export const TOTAL_QUESTIONS_COUNT = ALL_OFFICIAL_QUESTIONS.length;

export const BANCA_QUESTION_COUNTS = {
  Cebraspe: CEBRASPE_QUESTIONS.length,
  FGV: FGV_QUESTIONS.length,
  FCC: FCC_QUESTIONS.length,
  Vunesp: VUNESP_QUESTIONS.length,
  Cesgranrio: CESGRANRIO_QUESTIONS.length,
  Total: TOTAL_QUESTIONS_COUNT,
};
