import Tool from './Tool';

type Skill = {
	name: string;
	image: string;
};

function CreateSkillsList( images: Record<string, string> ) {
  const skills: Skill[] = Object.keys(images).map((path) => {
    let name = path.split('/').pop()?.replace('.svg', '') || '';
    if (name === 'Cs') name = 'C#';
    return {
      name,
      image: images[path],
    };
  });
  return skills;
}

export default function Skills() {
	const languageImages: Record<string, string> = import.meta.glob('../../assets/skills/languages/*.svg', { eager: true, query: '?url', 'import': 'default' });
	const fullstackImages: Record<string, string> = import.meta.glob('../../assets/skills/fullstack/*.svg', { eager: true, query: '?url', 'import': 'default' });
	const toolImages: Record<string, string> = import.meta.glob('../../assets/skills/tools/*.svg', { eager: true, query: '?url', 'import': 'default' });

  const programmingLanguages: Skill[] = CreateSkillsList(languageImages);
  const fullstack: Skill[] = CreateSkillsList(fullstackImages);
  const tools: Skill[] = CreateSkillsList(toolImages);

	return (
		<section className={`my-0 mx-auto boundingBox`}>
			<h2>Skills</h2>
			<div>
				{/* Temporary use this style because I can't think of another way to do this */}
				<div className={`flex flex-col items-center mb-15`}>
					<h3 className={`text-white font-[Inter] font-normal text-xl text-center`}>Programming Languages</h3>
					<ul className={`flex gap-4 flex-wrap justify-center`}>
						{programmingLanguages.map((langauge) => (
							<li key={langauge.name}>
								<Tool name={langauge.name} image={langauge.image} />
							</li>
						))}
					</ul>
				</div>
				<div className={`flex flex-col items-center mb-15`}>
					<h3 className={`text-white font-[Inter] font-normal text-xl text-center`}>Fullstack Libraries/Frameworks</h3>
					<ul className={`flex gap-4 flex-wrap justify-center`}>
						{fullstack.map((fullstack) => (
							<li key={fullstack.name}>
								<Tool name={fullstack.name} image={fullstack.image} />
							</li>
						))}
					</ul>
				</div>
				<div className={`flex flex-col items-center mb-15`}>
					<h3 className={`text-white font-[Inter] font-normal text-xl text-center`}>Tools</h3>
					<ul className={`flex gap-4 flex-wrap justify-center`}>
						{tools.map((tool) => (
							<li key={tool.name}>
								<Tool name={tool.name} image={tool.image} />
							</li>
						))}
					</ul>
				</div>
			</div>
		</section>
	);
}