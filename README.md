# portfolio

Development Notes:
*.module.css - These files are used for styling components locally
index.css is the only global styling file. Styles found in this file are shared across components

earth/ folder - contains the models relevant to make the earth like earth city lights model, marker model, cloud model, etc.

MarkerContext/ folder - contains the context for sharing callback functions down 2 levels of components. App.tsx -> EarthScene.tsx -> BaseModel.tsx

