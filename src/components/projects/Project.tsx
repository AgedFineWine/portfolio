import type { ProjectProps } from './ProjectType';

export default function Project({ description, name, tags, githubLink, demoLink, img, showDemo = true }: ProjectProps) {
  return (
    <div className={`break-inside-avoid mb-16`}>
      <div className={`w-full mb-5`}>
        <img
          className={`rounded-lg border-4 border-dark-grey outline-1 outline-grey-rim w-full`}
          src={img}
          alt={description + ' Thumbnail'}
        />
      </div>
      <h3 className={`text-white font-semibold font-inter text-xl mb-5`}>
        {name}
      </h3>
      <p className={`text-muted-grey font-inter font-normal text-base mb-5`}>
        {description}
      </p>
      {
        (tags ?? {length: 0}).length > 0 && (
          <div className={`flex gap-x-2 mb-5 flex-wrap`}>
            {
              tags?.map((tag, index) => (
                <div
                  key={index}
                  className={`bg-[oklch(20.5%_0_0)] rounded-md py-[6px] px-4 border-1 border-[rgb(43_43_43)]`}>
                  <span className={`text-[var(--primary-font-color)] text-sm font-medium font-[Inter_'sans-serif']`}>
                    {tag}
                  </span>
                </div>
              ))
            }
          </div>)
				}
      <div className={`flex gap-x-5`}>
        <a href={githubLink} className={`text-white font-inter font-normal text-base`} target="_blank" rel="noopener">View on GitHub &gt;</a>
        {showDemo && <a href={demoLink} className={`text-white font-inter font-normal text-base`} target="_blank" rel="noopener">Live demo &gt;</a>}
      </div>
    </div>
  )

}

