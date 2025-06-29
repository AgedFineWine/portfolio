import githubIcon from '../assets/github_white_icon.svg';

export default function NavBar() {
	return (
		<>
		{/* <div className={styles.backgroundBlur}></div>
		<nav className={`${styles.nav} boundingBox`}>
			<div className="branding">
				<span className={styles.signature}>EH</span>
			</div>
			<ul className={styles.navigationLinks}>
				<li><a href="">Home</a></li>
				<li><a href="">Projects</a></li>
				<li><a href="">Experience</a></li>
				<li><a href="">Skills</a></li>
				<li><a href="">Contact</a></li>
			</ul>
			<div className="socialLinks">
				<div className={styles.githubIconContainer}>
					<a href="github.com/agedfinewine" className={styles.githubLink} target="_blank" rel="noopener">
						<img src={githubIcon} alt="GitHub Icon" />
					</a>
				</div>
			</div>
		</nav> */}
		<div className={`fixed h-[85px] top-0 w-[100vw] bg-black/50 backdrop-blur-[3px] z-[999]
      mask-[image:linear-gradient(to_top,rgba(0,0,0,0)_0%,rgba(0,0,0,0.7)_20%,rgba(0,0,0,1)_40%,rgba(0,0,0,1)_60%,rgba(0,0,0,1)_100%)]
      pointer-events-none
      `}></div>
		<nav className="w-full mx-auto mt-5 mb-0 flex justify-between items-center text-white fixed z-1000 pointer-events-auto boundingBox ">
			<div className="font-viga text-3xl text-white font-bold tracking-wider">
				EH
			</div>
			<ul className="max-w-[526px] flex justify-between items-start">
				<li><a className="px-6 text-white no-underline" href="">Home</a></li>
				<li><a className="px-6 text-white no-underline" href="">Projects</a></li>
				{/* <li><a className="px-6 text-white no-underline" href="">Experience</a></li> */}
				<li><a className="px-6 text-white no-underline" href="">Skills</a></li>
				<li><a className="px-6 text-white no-underline" href="">Contact</a></li>
			</ul>
			<div>
				<div className="w-[25px] h-[25px]">
					<a href="https://github.com/agedfinewine" className="w-full h-full block" target="_blank" rel="noopener">
						<img src={githubIcon} alt="GitHub Icon" className="w-full h-full object-contain" />
					</a>
				</div>
			</div>
		</nav>
		</>
	);
}
