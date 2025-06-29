type SectionHeaderProps = {
	singleWord: string;
	shortTextBefore?: string;
	shortTextAfter?: string;
	border?: string;
	centered?: boolean;

	emphasis?: string;
}

// Centered means that the subheader is not centered
export default function SectionHeader({ singleWord, shortTextBefore, shortTextAfter, centered, emphasis }: SectionHeaderProps) {
	if (centered) return (
		<div className="boundingBox mx-auto text-center my-14">
			<span className="block text-[var(--primary-header-color)] text-center mb-1 mx-auto text-lg">
        {singleWord}
      </span>
			<div className="relative w-fit mx-auto">
				<h2 className="text-white font-inter text-[2.2rem] font-medium leading-normal text-shadow-[rgba(255,255,255,0.082)_0px_4px_8px,rgba(255,255,255,0.293)_0px_8px_30px]">
					{shortTextBefore}
					{<span
          className="bg-gradient-to-r from-[#fff] to-[#fab300] bg-clip-text text-transparent
          font-[OldStandardTT] font-bold text-[2.3rem] italic tracking-wide">
						{emphasis}
					</span>}
					{shortTextAfter}
				</h2>
			</div>
		</div>
	);

  /**
   * If not centered, then we customize it differently.
   */
	return (
		<div className={`mx-auto my-0 text-center w-full`}>
			<span className={`block text-[var(--primary-header-color)] text-center mx-auto mb-1 text-lg`}>
        {singleWord}
      </span>
			<div className={`relative w-fit mx-auto`}>
				<h2 className={`text-white font-inter text-[2.2rem] font-medium leading-normal text-shadow-[rgba(255,255,255,0.082)_0px_4px_8px,rgba(255,255,255,0.293)_0px_8px_30px]`}>
					{shortTextBefore}
					{<span className={`bg-gradient-to-r from-[#fff] to-[#fab300] bg-clip-text text-transparent
          font-[OldStandardTT] font-bold text-[2.3rem] italic tracking-wide`}>{emphasis}</span>}
					{shortTextAfter}
				</h2>
			</div>
		</div>
	);
}