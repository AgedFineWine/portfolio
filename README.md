# portfolio

Development Notes:
*.module.css - These files are used for styling components locally
index.css is the only global styling file. Styles found in this file are shared across components

earth/ folder - contains the models relevant to make the earth like earth city lights model, marker model, cloud model, etc.

MarkerContext/ folder - contains the context for sharing callback functions down 2 levels of components. App.tsx -> EarthScene.tsx -> BaseModel.tsx

Problems that gave me a headache to solve:
- Earth on right not receiving pointer events
- Alignment issues with navbar
- Camera positioning, camera direction, fov (spent a day figuring out)
- Atmosphere shader not working.
- Finding the right decorations to make it more comfy on the eyes
- Migrating to Tailwind, dealing with media queries.

Need:
- gsap animations
- search lights
- react optimizations

6/17:
- Finished on landing page but not responsive/not interactive enough/ lacks in color department
6/18:
- Worked on project section/code reusuability
6/19-6/25:
- Worked on the project a little, wanted to create a more cozy theme but am not sure how to do so.
6/29
- Working on responsiveness/ MVP.