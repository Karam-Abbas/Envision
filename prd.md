# Product Requirements Document (PRD)
## AI Video Generator Chatbot Interface

---

## 1. Project Overview

### 1.1 Purpose
Build a beautiful, minimal chatbot-style web application that enables users to generate videos from text prompts by selecting characters, defining scenes, and editing generated scripts.

### 1.2 Tech Stack
- **Frontend Framework**: React with TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **HTTP Client**: Axios
- **State Management**: React hooks (useState, useContext as needed)
- **Design Philosophy**: Minimal, clean UI - no shadows, no gradients, flat design

### 1.3 Architecture Notes
- **Frontend only** - No custom backend needed
- Consume existing API endpoints directly from React frontend
- All state management handled in-memory with React hooks
- No server-side rendering or Next.js backend required

---

## 2. User Flow

### 2.1 High-Level Journey
1. User enters short base prompt
2. User views and selects character(s) from cards
3. User specifies number of scenes
4. System generates detailed scene scripts
5. User reviews and edits scenes
6. Ready for video generation (future scope)

---

## 3. Detailed Feature Specifications

### 3.1 Screen 1: Prompt Entry
**Purpose**: Capture initial video concept from user

**UI Components**:
- Chat-style interface with centered input area
- Large text input field (multiline textarea)
- Placeholder text: "Describe the video you want to create..."
- Primary CTA button: "Continue" or "Next"
- Character count indicator (optional)

**Behavior**:
- Input validation: minimum 10 characters required
- Store prompt in state for later use
- Transition to character selection on submit

**Design Notes**:
- Center-aligned layout
- Minimal spacing, clean typography
- Use shadcn `Textarea` and `Button` components

---

### 3.2 Screen 2: Character Selection

**Purpose**: Allow users to browse and select characters for their video

#### 3.2.1 API Integration
**Endpoint**: `GET /api/get-all-characters/`

**Response Structure**:
```typescript
Array<{
  name: string;
  trigger_word: string;
  image: string; // base64 encoded
}>
```

**Implementation**:
- Use axios.get() to fetch characters
- Use useEffect hook to fetch on component mount
- Handle loading, error, and success states with useState

**Example Code Pattern**:
```typescript
const [characters, setCharacters] = useState<Character[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

useEffect(() => {
  const fetchCharacters = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/get-all-characters/');
      setCharacters(response.data);
    } catch (err) {
      setError('Failed to load characters');
    } finally {
      setLoading(false);
    }
  };
  fetchCharacters();
}, []);
```

#### 3.2.2 UI Components

**Character Cards Grid**:
- Responsive grid layout (3-4 columns on desktop, 1-2 on mobile)
- Each card displays:
  - Character image (base64 decoded)
  - Character name
  - Selection checkbox or toggle state
- Selected state: border highlight or checkmark overlay
- Multi-select enabled (users can select multiple characters)

**Scene Count Selector**:
- Label: "Number of scenes"
- Input: Number input or slider component
- Range: 1-10 scenes (adjust as needed)
- Default value: 3

**Navigation**:
- "Back" button (returns to prompt entry)
- "Generate Scenes" CTA button (disabled until at least 1 character selected)

#### 3.2.3 Selection Flow
For each character selected:
1. Make POST request to selection endpoint using axios
2. Store confirmation response
3. Visual feedback on successful selection

**Selection API Endpoint**: `POST /api/select-character/`

**Request**:
```typescript
{
  trigger_word: string;
}
```

**Response**:
```typescript
{
  status: "success";
  message: string;
  data: {
    character: {
      name: string;
      trigger_word: string;
      image: string; // base64
    }
  }
}
```

**Implementation Notes**:
- Use axios.post() for character selection
- Handle multiple selections sequentially or with Promise.all()
- Show toast notifications for success/error
- Track selected characters in local state

**Example Code Pattern**:
```typescript
const handleSelectCharacter = async (triggerWord: string) => {
  try {
    const response = await axios.post('/api/select-character/', {
      trigger_word: triggerWord
    });
    // Update selected characters in state
    setSelectedCharacters(prev => [...prev, response.data.data.character]);
    // Show success toast
  } catch (err) {
    // Show error toast
  }
};
```

---

### 3.3 Screen 3: Scene Generation & Display

#### 3.3.1 Scene Generation API
**Endpoint**: `POST /api/generate-scenes/`

**Request**:
```typescript
{
  num_scenes: number;
  prompt: string; // The original short prompt from Screen 1
}
```

**Response**:
```typescript
{
  status: string;
  message: string;
  data: {
    project_title: string;
    original_prompt: string;
    trigger_word: string;
    character_exists: boolean;
    character_name: string;
    total_scenes: number;
    scenes: Array<{
      scene_number: number;
      scene_title: string;
      script: string;
      story_context: string;
      trigger_word: string;
    }>
  }
}
```

**Implementation**:
- Use axios.post() to generate scenes
- Show loading state during generation
- Store project_id from response (if provided in actual API)
- Store entire project data in state

**Example Code Pattern**:
```typescript
const handleGenerateScenes = async () => {
  try {
    setGenerating(true);
    const response = await axios.post('/api/generate-scenes/', {
      num_scenes: numScenes,
      prompt: userPrompt
    });
    setProject(response.data.data);
    setCurrentStep('scenes');
  } catch (err) {
    // Show error toast
  } finally {
    setGenerating(false);
  }
};
```

#### 3.3.2 Scene Display UI

**Layout**:
- Vertical list/feed of scene cards
- Sticky header showing project title
- Option to regenerate all scenes (optional)

**Scene Card Components** (for each scene):
```
┌─────────────────────────────────────┐
│ Scene X: [Scene Title]              │
│                                     │
│ Story Context:                      │
│ [story_context text]                │
│                                     │
│ Script:                             │
│ [script text]                       │
│                                     │
│ Trigger Word: [trigger_word]        │
│                                     │
│ [Edit Button] [Delete Button]       │
└─────────────────────────────────────┘
```

**Use Components**:
- shadcn `Card`, `CardHeader`, `CardContent`, `CardFooter`
- shadcn `Button` for edit/delete actions
- Typography components for text hierarchy

---

### 3.4 Screen 4: Scene Editing

**Trigger**: User clicks "Edit" button on any scene card

**UI Behavior**:
- Inline editing OR modal dialog (recommend inline for better UX)
- Show current script in read-only format
- Input textarea for edit instructions
- Label: "What would you like to change?"
- Placeholder: "Make the dialogue more dramatic..."

**Edit API Endpoint**: `POST /api/edit-scene/`

**Request**:
```typescript
{
  project_id: string;
  scene_number: number;
  edit_instructions: string;
}
```

**Response**: (Assume returns updated scene)
```typescript
{
  status: string;
  message: string;
  data: {
    scene: {
      scene_number: number;
      scene_title: string;
      script: string;
      story_context: string;
      trigger_word: string;
    }
  }
}
```

**Implementation**:
- Use axios.post() to send edit instructions
- Update scene in local state after successful edit
- Handle loading state during edit

**Example Code Pattern**:
```typescript
const handleEditScene = async (sceneNumber: number, instructions: string) => {
  try {
    setEditingScene(sceneNumber);
    const response = await axios.post('/api/edit-scene/', {
      project_id: projectId,
      scene_number: sceneNumber,
      edit_instructions: instructions
    });
    
    // Update the scene in state
    setProject(prev => ({
      ...prev,
      scenes: prev.scenes.map(scene => 
        scene.scene_number === sceneNumber 
          ? response.data.data.scene 
          : scene
      )
    }));
    
    // Close edit dialog and show success
  } catch (err) {
    // Show error toast
  } finally {
    setEditingScene(null);
  }
};
```

**UI Components**:
- shadcn `Dialog` or inline form
- shadcn `Textarea` for instructions
- "Cancel" and "Apply Edit" buttons
- Loading spinner during edit processing
- Toast notification on success/error

**Post-Edit Behavior**:
- Update scene in local state
- Close edit interface
- Show success message
- Reflect changes immediately in scene card

---

## 4. Component Architecture

### 4.1 Suggested Component Hierarchy
```
App
├── PromptEntry
│   ├── ChatContainer
│   ├── PromptInput (Textarea)
│   └── ContinueButton
│
├── CharacterSelection
│   ├── CharacterGrid
│   │   └── CharacterCard (multiple)
│   │       ├── CharacterImage
│   │       ├── CharacterName
│   │       └── SelectCheckbox
│   ├── SceneCountSelector
│   └── NavigationButtons
│
├── SceneGeneration
│   ├── LoadingState
│   └── (transitions to SceneDisplay)
│
└── SceneDisplay
    ├── ProjectHeader
    ├── SceneList
    │   └── SceneCard (multiple)
    │       ├── SceneHeader
    │       ├── SceneContent
    │       ├── SceneMetadata
    │       └── SceneActions
    │           ├── EditButton
    │           └── DeleteButton
    └── SceneEditDialog
        ├── EditInstructions (Textarea)
        └── ActionButtons
```

---

## 5. State Management

### 5.1 Global State (Context or Props)
```typescript
{
  prompt: string;
  selectedCharacters: Array<Character>;
  numScenes: number;
  projectId: string;
  project: Project | null;
  currentStep: 'prompt' | 'characters' | 'scenes';
}
```

### 5.2 State Management Pattern
Use React Context + useReducer for complex state, or simple useState props drilling for simpler implementation:

**Option 1: Context API (Recommended for this app)**
```typescript
interface AppState {
  prompt: string;
  selectedCharacters: Character[];
  numScenes: number;
  project: Project | null;
  currentStep: 'prompt' | 'characters' | 'scenes';
}

const AppContext = createContext<{
  state: AppState;
  updatePrompt: (prompt: string) => void;
  addCharacter: (character: Character) => void;
  setNumScenes: (num: number) => void;
  setProject: (project: Project) => void;
  setCurrentStep: (step: string) => void;
} | null>(null);
```

**Option 2: Props Drilling (Simpler)**
Pass state and setState functions down through props to child components.

---

## 6. API Integration Details

### 6.1 Axios Configuration
```typescript
// src/api/axiosConfig.ts
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds
});

// Request interceptor (optional - for auth tokens, etc.)
axiosInstance.interceptors.request.use(
  (config) => {
    // Add auth token if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor (optional - for global error handling)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Global error handling
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
```

### 6.2 API Service Functions

Create a dedicated API service file:

```typescript
// src/api/videoService.ts
import axiosInstance from './axiosConfig';

export const videoApi = {
  // Fetch all characters
  getAllCharacters: async () => {
    const response = await axiosInstance.get('/api/get-all-characters/');
    return response.data;
  },

  // Select a character
  selectCharacter: async (triggerWord: string) => {
    const response = await axiosInstance.post('/api/select-character/', {
      trigger_word: triggerWord
    });
    return response.data;
  },

  // Generate scenes
  generateScenes: async (numScenes: number, prompt: string) => {
    const response = await axiosInstance.post('/api/generate-scenes/', {
      num_scenes: numScenes,
      prompt: prompt
    });
    return response.data;
  },

  // Edit scene
  editScene: async (projectId: string, sceneNumber: number, editInstructions: string) => {
    const response = await axiosInstance.post('/api/edit-scene/', {
      project_id: projectId,
      scene_number: sceneNumber,
      edit_instructions: editInstructions
    });
    return response.data;
  }
};
```

### 6.3 Usage in Components

```typescript
// In a component
import { videoApi } from '@/api/videoService';

const MyComponent = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await videoApi.getAllCharacters();
      setData(result);
    } catch (err) {
      setError(err.message);
      // Show error toast
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ... rest of component
};
```

---

## 7. Design Specifications

### 7.1 Design Principles
- **Minimal**: No shadows, no gradients, flat design
- **Clean**: Ample whitespace, clear hierarchy
- **Focused**: One primary action per screen
- **Responsive**: Mobile-first approach

### 7.2 Color Palette (using shadcn defaults)
- Background: `bg-background`
- Foreground: `text-foreground`
- Primary: `bg-primary` / `text-primary-foreground`
- Secondary: `bg-secondary` / `text-secondary-foreground`
- Accent: `bg-accent` / `text-accent-foreground`
- Borders: `border-border`

### 7.3 Typography
- Headings: Font sans, bold weights
- Body: Font sans, normal weight
- Code/Technical: Font mono (for trigger words)

### 7.4 Spacing
- Use Tailwind spacing scale consistently
- Container max-width: `max-w-4xl` for main content
- Card padding: `p-6`
- Section gaps: `gap-6` or `gap-8`

---

## 8. Error Handling

### 8.1 API Error States
- Network errors: Show retry button with toast notification
- 400 errors: Display validation message from API
- 500 errors: Generic error message + support contact
- Timeout: Show timeout message with retry option

### 8.2 Error Handling Pattern
```typescript
try {
  const response = await videoApi.someEndpoint();
  // Success handling
} catch (error) {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      // Server responded with error status
      const status = error.response.status;
      const message = error.response.data?.message || 'Something went wrong';
      
      if (status === 400) {
        // Validation error
        showToast('error', message);
      } else if (status === 500) {
        // Server error
        showToast('error', 'Server error. Please try again later.');
      }
    } else if (error.request) {
      // Request made but no response
      showToast('error', 'Network error. Please check your connection.');
    }
  } else {
    // Non-Axios error
    showToast('error', 'An unexpected error occurred.');
  }
}
```

### 8.3 User Feedback
- Use shadcn `Toast` component for notifications
- Success: Green toast, auto-dismiss after 3s
- Error: Red toast, manual dismiss or longer timeout
- Loading: Inline spinners, skeleton loaders

---

## 9. Validation Rules

### 9.1 Prompt Entry
- Minimum length: 10 characters
- Maximum length: 500 characters
- No empty submissions
- Trim whitespace before validation

### 9.2 Character Selection
- Minimum: 1 character required
- Maximum: 5 characters (optional limit)
- Show validation message if trying to proceed without selection

### 9.3 Scene Count
- Minimum: 1 scene
- Maximum: 10 scenes
- Default: 3 scenes
- Must be integer

### 9.4 Edit Instructions
- Minimum: 5 characters
- Maximum: 300 characters
- No empty submissions

---

## 10. Development Checklist

### Phase 1: Setup
- [ ] Initialize React app with TypeScript
- [ ] Install dependencies: axios, shadcn/ui, Tailwind
- [ ] Configure Tailwind and shadcn
- [ ] Set up axios instance with base configuration
- [ ] Create API service file structure
- [ ] Install required shadcn components
- [ ] Set up environment variables for API base URL

### Phase 2: API Service Layer
- [ ] Create axiosConfig.ts with base setup
- [ ] Create videoService.ts with all API functions
- [ ] Add request/response interceptors
- [ ] Test API endpoints with mock calls
- [ ] Implement error handling utilities

### Phase 3: Screen 1 - Prompt Entry
- [ ] Create PromptEntry component
- [ ] Implement textarea with validation
- [ ] Add character counter
- [ ] Create navigation to next screen
- [ ] Test responsive layout
- [ ] Add error states

### Phase 4: Screen 2 - Character Selection
- [ ] Create Character interface type
- [ ] Build CharacterCard component
- [ ] Implement character fetching with axios
- [ ] Add loading skeleton while fetching
- [ ] Implement grid layout
- [ ] Add multi-select functionality
- [ ] Create character selection API calls
- [ ] Implement scene count selector
- [ ] Add error states and retry logic
- [ ] Test image rendering (base64)
- [ ] Handle empty state (no characters)

### Phase 5: Screen 3 - Scene Generation
- [ ] Create scene generation API call
- [ ] Build loading state UI with spinner
- [ ] Implement scene data storage in state
- [ ] Create SceneCard component
- [ ] Build scene list layout
- [ ] Add project header with title
- [ ] Test with various scene counts
- [ ] Handle API errors gracefully

### Phase 6: Screen 4 - Scene Editing
- [ ] Create SceneEditDialog component
- [ ] Implement edit scene API call
- [ ] Add edit instructions textarea
- [ ] Handle scene updates in state
- [ ] Add success/error feedback with toasts
- [ ] Implement optimistic updates (optional)
- [ ] Test edit flow end-to-end
- [ ] Handle concurrent edits

### Phase 7: State Management
- [ ] Set up Context API (if using)
- [ ] Create state management hooks
- [ ] Implement state persistence across screens
- [ ] Test state flow through entire app
- [ ] Handle edge cases (back navigation, refresh)

### Phase 8: Polish
- [ ] Add smooth transitions between screens
- [ ] Implement back navigation
- [ ] Add empty states for all screens
- [ ] Optimize base64 images (lazy loading)
- [ ] Add accessibility attributes (ARIA labels)
- [ ] Test keyboard navigation
- [ ] Mobile responsiveness check
- [ ] Cross-browser testing
- [ ] Add loading states for all async operations
- [ ] Implement toast notifications consistently
- [ ] Add confirmation dialogs where needed

### Phase 9: Testing & Optimization
- [ ] Test all API error scenarios
- [ ] Test with slow network (throttling)
- [ ] Test with various prompt lengths
- [ ] Test with maximum character selections
- [ ] Test with maximum scene count
- [ ] Performance audit (React DevTools)
- [ ] Accessibility audit (Lighthouse)
- [ ] Bundle size check

---

## 11. Future Enhancements (Out of Scope for V1)
- Scene reordering (drag & drop)
- Duplicate scene functionality
- Export scenes as PDF/JSON
- Save draft functionality (would need backend)
- Video preview/generation trigger
- Collaboration features
- Scene templates
- Advanced editing (regenerate specific parts)
- Undo/redo functionality
- Real-time collaboration

---

## 12. Success Metrics
- User completes full flow (prompt → scenes) in < 2 minutes
- < 5% error rate on API calls
- 90%+ mobile usability score
- Zero accessibility violations (WCAG AA)
- Fast initial load time (< 3s)

---

## 13. Technical Constraints
- **No backend development needed** - consume existing APIs only
- **No localStorage/sessionStorage** - use React state only
- All data in-memory during session (lost on refresh)
- Base64 images must be optimized for performance
- Maximum bundle size: < 500KB (before images)
- API endpoints must be CORS-enabled
- No server-side rendering

---

## Appendix A: shadcn Components Required

Install these components from shadcn/ui:
```bash
npx shadcn-ui@latest add button card input textarea dialog toast checkbox label separator skeleton
```

Component list:
- `button` - All CTAs and actions
- `card` - Character cards, scene cards
- `input` - Scene count input
- `textarea` - Prompt input, edit instructions
- `dialog` - Scene edit modal
- `toast` - Success/error notifications
- `checkbox` - Character selection (optional)
- `label` - Form labels
- `separator` - Visual dividers
- `skeleton` - Loading states

---

## Appendix B: TypeScript Interfaces

```typescript
// src/types/index.ts

export interface Character {
  name: string;
  trigger_word: string;
  image: string; // base64
}

export interface Scene {
  scene_number: number;
  scene_title: string;
  script: string;
  story_context: string;
  trigger_word: string;
}

export interface Project {
  project_title: string;
  original_prompt: string;
  trigger_word: string;
  character_exists: boolean;
  character_name: string;
  total_scenes: number;
  scenes: Scene[];
}

export interface AppState {
  currentStep: 'prompt' | 'characters' | 'scenes';
  prompt: string;
  selectedCharacters: Character[];
  numScenes: number;
  projectId: string | null;
  project: Project | null;
}

// API Response types
export interface ApiResponse<T> {
  status: string;
  message: string;
  data: T;
}

export interface SelectCharacterResponse {
  character: Character;
}

export interface GenerateScenesResponse {
  project_title: string;
  original_prompt: string;
  trigger_word: string;
  character_exists: boolean;
  character_name: string;
  total_scenes: number;
  scenes: Scene[];
}

export interface EditSceneResponse {
  scene: Scene;
}
```

---

## Appendix C: Dependencies to Install

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "axios": "^1.6.0",
    "lucide-react": "^0.263.1"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@types/node": "^20.0.0",
    "typescript": "^5.0.0",
    "tailwindcss": "^3.3.0",
    "autoprefixer": "^10.4.14",
    "postcss": "^8.4.24"
  }
}
```

Install commands:
```bash
npm install axios
npm install lucide-react
npx shadcn-ui@latest init
npx shadcn-ui@latest add button card input textarea dialog toast checkbox label separator skeleton
```

---

## Appendix D: Environment Variables

Create `.env` file:
```bash
REACT_APP_API_BASE_URL=https://your-api-domain.com
```

Or if API is on same domain:
```bash
REACT_APP_API_BASE_URL=
```

Access in code:
```typescript
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '';
```

---

## Appendix E: Folder Structure

```
src/
├── api/
│   ├── axiosConfig.ts       # Axios instance setup
│   └── videoService.ts      # API service functions
├── components/
│   ├── ui/                  # shadcn components
│   ├── PromptEntry.tsx
│   ├── CharacterSelection.tsx
│   ├── CharacterCard.tsx
│   ├── SceneGeneration.tsx
│   ├── SceneDisplay.tsx
│   ├── SceneCard.tsx
│   └── SceneEditDialog.tsx
├── context/
│   └── AppContext.tsx       # Global state (if using Context)
├── hooks/
│   └── useToast.ts          # Custom hooks
├── types/
│   └── index.ts             # TypeScript interfaces
├── utils/
│   └── validators.ts        # Validation functions
├── App.tsx
├── main.tsx
└── index.css
```

---

**End of PRD**

Include the name Envision for header branding of the web app.