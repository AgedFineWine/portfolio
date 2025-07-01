export default function Introduction() {
	return (

		<header className={`relative w-[40%] text-white z-10`}>
			<h1 className={`text-white font-[Inter] font-normal text-5xl mt-auto mb-5 mx-auto pointer-events-auto`}>
				Hi,
        <span
          className={`font-[OldStandardTT] font-semibold italic bg-clip-text text-transparent`}
          style={{
            background: 'linear-gradient(96deg, #FFF 33.72%, #FAB300 91.18%)',
            backgroundClip: 'text'
          }}
        >
          &nbsp;Evan&nbsp;
        </span>
        here.
			</h1>
			<p className={`mb-5 pointer-events-auto introductoryTextUtil`}>
				I'm a Computer Science student at RIT
				I love creating projects that are both fun and meaningful, whether it's tackling complex technical
				challenges or creating stunning graphics. I document my journey building
				projects, so I encourage you to read them!
			</p>
			<ul className={`flex gap-x-6 pointer-events-auto viewLinksUtil`}>
				<li><a href="#aboutWork">&gt; Take a look</a></li>
				{/* <li><a href="">&gt; View resume</a></li> */}
			</ul>
		</header>
	);
}