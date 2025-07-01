import { useState } from 'react';
import githubIcon from '../assets/github_white_icon.svg';

export default function NavBar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const closeMenu = () => {
		setIsMenuOpen(false);
	};

	return (
		<>
		<div className={`fixed h-[85px] op-0 w-[100vw] bg-black/50 backdrop-blur-[3px] z-[999]
      mask-[image:linear-gradient(to_top,rgba(0,0,0,0)_0%,rgba(0,0,0,0.7)_20%,rgba(0,0,0,1)_40%,rgba(0,0,0,1)_60%,rgba(0,0,0,1)_100%)]
      pointer-events-none`}></div>
		<nav className="w-full mx-auto mt-5 mb-0 flex justify-between items-center text-white fixed z-1000 pointer-events-auto boundingBox">
			<div className="font-viga text-3xl text-white font-bold tracking-wider">
				EH
			</div>
			
			{/* Desktop Navigation */}
			<ul className="max-w-[526px] justify-between items-start hidden md:flex">
				<li><a className="px-6 text-white no-underline hover:text-gray-300 transition-colors duration-200" href="#home" onClick={closeMenu}>Home</a></li>
				<li><a className="px-6 text-white no-underline hover:text-gray-300 transition-colors duration-200" href="#projectSection" onClick={closeMenu}>Projects</a></li>
				{/* <li><a className="px-6 text-white no-underline" href="">Experience</a></li> */}
				<li><a className="px-6 text-white no-underline hover:text-gray-300 transition-colors duration-200" href="#skills" onClick={closeMenu}>Skills</a></li>
				<li><a className="px-6 text-white no-underline hover:text-gray-300 transition-colors duration-200" href="#contact" onClick={closeMenu}>Contact</a></li>
			</ul>

			{/* Mobile Hamburger Menu Button */}
			<div className="flex items-center ">
        <div className="">
          <div className="w-[25px] h-[25px]">
            <a href="https://github.com/agedfinewine" className="w-full h-full block" target="_blank" rel="noopener">
              <img src={githubIcon} alt="GitHub Icon" className="w-full h-full object-contain" />
            </a>
          </div>
        </div>
				<button
					onClick={toggleMenu}
					className="md:hidden ml-4 flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none z-[1001]"
					aria-label="Toggle menu"
				>
					<span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
					<span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
					<span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
				</button>
			</div>
		</nav>

		{/* Full Screen Mobile Menu */}
		<div className={`fixed inset-0 bg-black z-[990] transition duration-500 ease-in-out md:hidden ${isMenuOpen ? 'translate-y-0 pointer-events-auto opacity-100' : '-translate-y-full pointer-events-none opacity-0'}`}>

				{/* Navigation Links */}
				<div className="flex flex-col h-full justify-center boundingBox">
					<ul className="space-y-18">
						<li>
							<a 
								className="text-white text-4xl font-light no-underline hover:text-gray-300 transition-colors duration-200 block py-4" 
								href="#home" 
								onClick={closeMenu}>
                Home
              </a>
              <hr className="bg-gradient-to-l from-[#fff] to-[#fab300] h-1" />
						</li>
						<li>
							<a 
								className="text-white text-4xl font-light no-underline hover:text-gray-300 transition-colors duration-200 block py-4" 
								href="#projectSection" 
								onClick={closeMenu}>
								Projects
							</a>
              <hr className="bg-gradient-to-l from-[#fff] to-[#fab300] h-1" />
						</li>
						<li>
							<a 
								className="text-white text-4xl font-light no-underline hover:text-gray-300 transition-colors duration-200 block py-4" 
								href="#skills" 
								onClick={closeMenu}
							>
								Skills
							</a>
              <hr className="bg-gradient-to-l from-[#fff] to-[#fab300] h-1" />
						</li>
						<li>
							<a 
								className="text-white text-4xl font-light no-underline hover:text-gray-300 transition-colors duration-200 block py-4" 
								href="#contact" 
								onClick={closeMenu}
							>
								Contact
							</a>
              <hr className="bg-gradient-to-l from-[#fff] to-[#fab300] h-1" />
						</li>
					</ul>
				</div>
		</div>
		</>
	);
}
