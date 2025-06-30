import pathfinderImg from '../../assets/projects/pathfinder.png';
import port from '../../assets/projects/port.png';
import carousel from '../../assets/projects/carousel.png';

import Project from './Project';

export default function ProjectSection() {

	const projects = [
		{
			name: 'Pathfinder Visualizer',
			description: 'A visualizer for pathfinding algorithms. It allows users to see how different algorithms work in real-time by visualizing the pathfinding process on a grid. Users can interact with the grid to set start and end points, as well as obstacles.',
			githubLink: 'github.com/agedfinewine/pathfinder-visualizer',
			demoLink: '',
			tags: ['Web Design', 'Full Stack', 'CRUD', 'Algorithms'],
			img: pathfinderImg,
      showDemo: false,

		},
		{
			name: 'Image Carousel',
			description: 'A small project I built because I wanted to use a circular doubly linked list. Very small project.',
			githubLink: 'github.com/agedfinewine/portfolio',
			demoLink: '',
			tags: ['Web Design', 'Data Structures'],
			img: carousel
		},
		{
			name: 'Portfolio Website',
			description: 'This is the website you are currently on! Built using TypeScript React, Tailwind CSS, and Vite.',
			githubLink: 'github.com/agedfinewine/portfolio',
			demoLink: '',
			tags: ['Web Design', 'Frontend'],
			img: port
		}
	];
	
	return (
		<section className={`mb-35 mt-0 mx-auto boundingBox`}>
			<div className={`columns-2 gap-x-15 projectSection`}>
        {/* previously gap-x-8 */}
				{projects.map((project, index) => (
					<Project
						key={index}
						name={project.name}
						description={project.description}
						githubLink={project.githubLink}
						tags={project.tags}
						demo={project.demoLink}
						img={project.img}
            showDemo={project.showDemo}
					/>
				))}
			</div>
		</section>
	);
}
